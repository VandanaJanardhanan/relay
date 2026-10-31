import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { campaignService } from '../services/campaignService';
import { taskService } from '../services/taskService';
import { authService } from '../services/authService';
import { resetLocalDemoData } from '../services/storageService';
import { isTaskUnassigned } from '../utils/taskUtils';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';

const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const { success, error, info } = useToast();

  const [campaigns, setCampaigns] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Subscribe to real-time streams
  useEffect(() => {
    setLoading(true);

    const unsubCampaigns = campaignService.subscribe((data) => {
      setCampaigns(data || []);
      setLoading(false);
    });

    const unsubTasks = taskService.subscribe((data) => {
      setTasks(data || []);
      setLoading(false);
    });

    // Load available volunteers
    const vols = authService.getVolunteers();
    setVolunteers(vols);

    return () => {
      if (typeof unsubCampaigns === 'function') unsubCampaigns();
      if (typeof unsubTasks === 'function') unsubTasks();
    };
  }, []);

  // Update volunteer list when tasks or auth changes
  useEffect(() => {
    const vols = authService.getVolunteers();
    setVolunteers(vols);
  }, [currentUser, tasks]);

  // DERIVED DATA AND METRICS
  const organizerCampaigns = useMemo(() => {
    if (!currentUser) return [];
    if (currentUser.role === 'organizer') {
      return campaigns.filter((c) => c.organizerId === currentUser.uid || true); // organizer can manage campaigns
    }
    return campaigns;
  }, [campaigns, currentUser]);

  // Critical Centralized Unassigned Detection (Section 10)
  const unassignedTasks = useMemo(() => {
    return tasks.filter((task) => isTaskUnassigned(task));
  }, [tasks]);

  const unassignedCount = unassignedTasks.length;

  const completedTasks = useMemo(() => {
    return tasks.filter((t) => t.status === 'Completed');
  }, [tasks]);

  const inProgressTasks = useMemo(() => {
    return tasks.filter((t) => t.status === 'In Progress');
  }, [tasks]);

  const pendingTasks = useMemo(() => {
    return tasks.filter((t) => t.status === 'Pending');
  }, [tasks]);

  // Tasks assigned to current logged-in volunteer
  const myTasks = useMemo(() => {
    if (!currentUser || currentUser.role !== 'volunteer') return [];
    return tasks.filter((t) => t.assignedVolunteerId === currentUser.uid);
  }, [tasks, currentUser]);

  // Available tasks for volunteers to claim (unassigned)
  const availableTasks = unassignedTasks;

  // Volunteer stats map (tasks per volunteer)
  const volunteerStats = useMemo(() => {
    return volunteers.map((vol) => {
      const volTasks = tasks.filter((t) => t.assignedVolunteerId === vol.uid);
      const volCompleted = volTasks.filter((t) => t.status === 'Completed').length;
      const volInProgress = volTasks.filter((t) => t.status === 'In Progress').length;
      const volCampaignIds = [...new Set(volTasks.map((t) => t.campaignId))];

      return {
        ...vol,
        assignedCount: volTasks.length,
        completedCount: volCompleted,
        inProgressCount: volInProgress,
        campaignsCount: volCampaignIds.length,
        tasks: volTasks,
      };
    });
  }, [volunteers, tasks]);

  // Campaign enriched with calculated statistics
  const campaignsWithStats = useMemo(() => {
    return campaigns.map((campaign) => {
      const campaignTasks = tasks.filter((t) => t.campaignId === campaign.id);
      const total = campaignTasks.length;
      const completed = campaignTasks.filter((t) => t.status === 'Completed').length;
      const inProgress = campaignTasks.filter((t) => t.status === 'In Progress').length;
      const pending = campaignTasks.filter((t) => t.status === 'Pending').length;
      const unassigned = campaignTasks.filter((t) => isTaskUnassigned(t)).length;
      const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

      return {
        ...campaign,
        totalTasks: total,
        completedTasks: completed,
        inProgressTasks: inProgress,
        pendingTasks: pending,
        unassignedTasks: unassigned,
        completionPercentage: percentage,
      };
    });
  }, [campaigns, tasks]);

  // ACTIONS
  const createCampaign = async (campaignData) => {
    try {
      const newCampaign = await campaignService.createCampaign(campaignData, currentUser);
      success('Campaign created successfully.');
      return newCampaign;
    } catch (err) {
      error(err.message || 'Failed to create campaign.');
      throw err;
    }
  };

  const updateCampaign = async (campaignId, updates) => {
    try {
      await campaignService.updateCampaign(campaignId, updates);
      success('Campaign updated successfully.');
    } catch (err) {
      error(err.message || 'Failed to update campaign.');
      throw err;
    }
  };

  const deleteCampaign = async (campaignId) => {
    try {
      await campaignService.deleteCampaign(campaignId);
      success('Campaign and its associated tasks deleted.');
    } catch (err) {
      error(err.message || 'Failed to delete campaign.');
      throw err;
    }
  };

  const createTask = async (taskData) => {
    try {
      const newTask = await taskService.createTask(taskData, currentUser);
      if (isTaskUnassigned(newTask)) {
        info('Task created as unassigned — will highlight on your dashboard.');
      } else {
        success('Task created successfully with assigned volunteer.');
      }
      return newTask;
    } catch (err) {
      error(err.message || 'Failed to create task.');
      throw err;
    }
  };

  const updateTask = async (taskId, updates) => {
    try {
      await taskService.updateTask(taskId, updates);
      success('Task updated successfully.');
    } catch (err) {
      error(err.message || 'Failed to update task.');
      throw err;
    }
  };

  const assignVolunteer = async (taskId, volunteer) => {
    try {
      await taskService.assignVolunteer(taskId, volunteer);
      success(`Volunteer ${volunteer ? volunteer.fullName : 'unassigned'} successfully assigned.`);
    } catch (err) {
      error(err.message || 'Failed to assign volunteer.');
      throw err;
    }
  };

  // Volunteer claims task
  const claimTask = async (taskId) => {
    try {
      if (!currentUser || currentUser.role !== 'volunteer') {
        throw new Error('Only registered volunteers can take tasks.');
      }
      await taskService.claimTask(taskId, currentUser);
      success("You've successfully taken responsibility for this task!");
    } catch (err) {
      error(err.message || 'Unable to claim task.');
      throw err;
    }
  };

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      await taskService.updateStatus(taskId, newStatus);
      if (newStatus === 'Completed') {
        success('Task marked as completed! Great job.');
      } else {
        success(`Task progress updated to ${newStatus}.`);
      }
    } catch (err) {
      error(err.message || 'Failed to update task status.');
      throw err;
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await taskService.deleteTask(taskId);
      success('Task deleted successfully.');
    } catch (err) {
      error(err.message || 'Failed to delete task.');
      throw err;
    }
  };

  const resetData = () => {
    resetLocalDemoData();
    info('Demo data reset to initial hackathon showcase state.');
  };

  const value = {
    campaigns: campaignsWithStats,
    tasks,
    volunteers,
    volunteerStats,
    loading,
    // Metrics
    totalCampaigns: campaigns.length,
    totalTasks: tasks.length,
    completedTasksCount: completedTasks.length,
    inProgressTasksCount: inProgressTasks.length,
    pendingTasksCount: pendingTasks.length,
    unassignedTasks,
    unassignedCount,
    myTasks,
    availableTasks,
    // Actions
    createCampaign,
    updateCampaign,
    deleteCampaign,
    createTask,
    updateTask,
    assignVolunteer,
    claimTask,
    updateTaskStatus,
    deleteTask,
    resetData,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};


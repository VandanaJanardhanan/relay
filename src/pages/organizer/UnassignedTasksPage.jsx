import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { DashboardLayout } from '../../components/common/DashboardLayout';
import { TaskCard } from '../../components/tasks/TaskCard';
import { AssignVolunteerModal } from '../../components/modals/AssignVolunteerModal';
import { EmptyState } from '../../components/common/EmptyState';
import { CreateTaskModal } from '../../components/modals/CreateTaskModal';
import { 
  AlertTriangle, 
  CheckCircle, 
  Search, 
  Filter, 
  Plus, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const UnassignedTasksPage = () => {
  const { unassignedTasks, unassignedCount, campaigns, deleteTask } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [campaignFilter, setCampaignFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [assigningTask, setAssigningTask] = useState(null);
  const [createTaskOpen, setCreateTaskOpen] = useState(false);

  const filteredTasks = unassignedTasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (task.campaignTitle && task.campaignTitle.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCampaign = campaignFilter === 'All' || task.campaignId === campaignFilter;
    const matchesPriority = priorityFilter === 'All' || task.priority === priorityFilter;

    return matchesSearch && matchesCampaign && matchesPriority;
  });

  return (
    <DashboardLayout title="Unassigned Responsibilities">
      <div className="space-y-6">
        {/* Banner with Differentiator explanation */}
        <div className="bg-gradient-to-r from-amber-50 via-amber-100/40 to-white p-6 sm:p-8 rounded-2xl border-2 border-amber-300 ring-1 ring-amber-200/50 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-200/80 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
                RELAY Core Differentiator
              </div>
              <h2 className="text-2xl font-extrabold text-amber-950 tracking-tight">
                Unassigned Tasks ({unassignedCount})
              </h2>
              <p className="text-xs sm:text-sm text-amber-900/90 mt-1 max-w-2xl leading-relaxed">
                Find responsibilities that still need someone to take ownership. RELAY automatically detects these tasks without requiring manual follow-ups so no initiative fails from missing help.
              </p>
            </div>

            <button
              onClick={() => setCreateTaskOpen(true)}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-[#172B4D] hover:bg-[#233d6b] transition-all shadow-xs shrink-0"
            >
              <Plus className="w-4 h-4 text-[#16A6A1]" />
              Add Task Without Volunteer
            </button>
          </div>
        </div>

        {/* Filter controls */}
        <div className="bg-white p-4 rounded-2xl border border-[#E6EAF0] flex flex-wrap items-center justify-between gap-3">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search unassigned tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-[#E6EAF0] focus:ring-1 focus:ring-[#16A6A1] focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={campaignFilter}
              onChange={(e) => setCampaignFilter(e.target.value)}
              className="px-3 py-2 text-xs rounded-xl border border-[#E6EAF0] bg-white font-medium focus:ring-1 focus:ring-[#16A6A1]"
            >
              <option value="All">All Campaigns</option>
              {campaigns.map((c) => (
                <option key={c.id} value={c.id}>{c.title}</option>
              ))}
            </select>

            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-3 py-2 text-xs rounded-xl border border-[#E6EAF0] bg-white font-medium focus:ring-1 focus:ring-[#16A6A1]"
            >
              <option value="All">All Priorities</option>
              <option value="High">High Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="Low">Low Priority</option>
            </select>
          </div>
        </div>

        {/* Tasks List */}
        {filteredTasks.length === 0 ? (
          <EmptyState
            type="noUnassigned"
            title="You're all caught up!"
            description="Every task currently has someone assigned. There are no unassigned gaps in your campaigns."
            actionLabel="View All Tasks"
            actionTo="/organizer/tasks"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onAssign={(t) => setAssigningTask(t)}
                onDelete={(id) => deleteTask(id)}
                showCampaign={true}
              />
            ))}
          </div>
        )}
      </div>

      {/* Assign Volunteer Modal */}
      <AssignVolunteerModal
        task={assigningTask}
        isOpen={Boolean(assigningTask)}
        onClose={() => setAssigningTask(null)}
      />

      {/* Create Task Modal */}
      <CreateTaskModal
        isOpen={createTaskOpen}
        onClose={() => setCreateTaskOpen(false)}
      />
    </DashboardLayout>
  );
};


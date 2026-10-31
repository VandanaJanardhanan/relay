import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { DashboardLayout } from '../../components/common/DashboardLayout';
import { StatCard } from '../../components/common/StatCard';
import { TaskCard } from '../../components/tasks/TaskCard';
import { CampaignCard } from '../../components/campaigns/CampaignCard';
import { AssignVolunteerModal } from '../../components/modals/AssignVolunteerModal';
import { CreateTaskModal } from '../../components/modals/CreateTaskModal';
import { EmptyState } from '../../components/common/EmptyState';
import { Link } from 'react-router-dom';
import { 
  FolderKanban, 
  CheckSquare, 
  CheckCircle2, 
  AlertTriangle, 
  Plus, 
  ArrowRight, 
  Sparkles, 
  Search,
  Filter,
  CheckCircle
} from 'lucide-react';

export const OrganizerDashboard = () => {
  const { currentUser } = useAuth();
  const { 
    campaigns, 
    tasks, 
    totalCampaigns, 
    totalTasks, 
    completedTasksCount, 
    inProgressTasksCount, 
    pendingTasksCount, 
    unassignedTasks, 
    unassignedCount,
    deleteTask 
  } = useData();

  const [assigningTask, setAssigningTask] = useState(null);
  const [createTaskModalOpen, setCreateTaskModalOpen] = useState(false);
  const [campaignSearch, setCampaignSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Filtered campaigns for overview
  const filteredCampaigns = campaigns.filter((c) => {
    const matchesSearch = c.title.toLowerCase().includes(campaignSearch.toLowerCase()) ||
                          c.location.toLowerCase().includes(campaignSearch.toLowerCase());
    const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const completionRate = totalTasks > 0 ? Math.round((completedTasksCount / totalTasks) * 100) : 0;

  return (
    <DashboardLayout title="Organizer Overview">
      <div className="space-y-8">
        {/* ========================================================= */}
        {/* WELCOME SECTION                                           */}
        {/* ========================================================= */}
        <div className="bg-white rounded-2xl border border-[#E6EAF0] p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-50 text-[#16A6A1] text-xs font-bold uppercase tracking-wider mb-2 border border-teal-200">
              <Sparkles className="w-3.5 h-3.5" />
              Campaign Coordinator
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172B4D] tracking-tight">
              Welcome back, {currentUser?.fullName || 'Organizer'}!
            </h2>
            <p className="text-xs sm:text-sm text-[#6B778C] mt-1">
              Here's what's happening across your community campaigns today.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
            <button
              onClick={() => setCreateTaskModalOpen(true)}
              className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs text-[#172B4D] bg-slate-100 hover:bg-slate-200 transition-colors border border-slate-200"
            >
              <Plus className="w-4 h-4 text-[#16A6A1]" />
              Add Task
            </button>

            <Link
              to="/organizer/campaigns/new"
              className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-[#16A6A1] hover:bg-[#11817d] transition-all shadow-xs"
            >
              <Plus className="w-4 h-4" />
              Create Campaign
            </Link>
          </div>
        </div>

        {/* ========================================================= */}
        {/* DASHBOARD STATISTICS (4 EQUAL CARDS)                      */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <StatCard
            label="Total Campaigns"
            value={totalCampaigns}
            icon={FolderKanban}
            description="Active & upcoming initiatives"
            accent="default"
            linkTo="/organizer/campaigns"
          />

          <StatCard
            label="Total Tasks"
            value={totalTasks}
            icon={CheckSquare}
            description="Across all community drives"
            accent="primary"
            linkTo="/organizer/tasks"
          />

          <StatCard
            label="Completed Tasks"
            value={completedTasksCount}
            icon={CheckCircle2}
            description={`${completionRate}% overall completion rate`}
            accent="success"
            linkTo="/organizer/tasks?status=Completed"
          />

          {/* Core differentiator warning card */}
          <StatCard
            label="Unassigned Tasks"
            value={unassignedCount}
            icon={AlertTriangle}
            description={
              unassignedCount > 0
                ? "Missing volunteers — needs immediate attention!"
                : "All responsibilities currently assigned"
            }
            accent={unassignedCount > 0 ? "warning" : "default"}
            badgeText={unassignedCount > 0 ? `${unassignedCount} Action needed` : null}
            linkTo="/organizer/unassigned"
          />
        </div>

        {/* ========================================================= */}
        {/* CRITICAL SECTION: TASKS THAT NEED ATTENTION               */}
        {/* THE MAIN DIFFERENTIATOR OF RELAY (SECTION 07 & 10)         */}
        {/* ========================================================= */}
        <div className="bg-white rounded-2xl border-2 border-amber-300 p-6 sm:p-8 shadow-sm ring-1 ring-amber-200/50">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-amber-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping"></span>
                <h3 className="text-lg font-bold text-amber-950 tracking-tight flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                  Tasks That Need Attention
                </h3>
              </div>
              <p className="text-xs text-amber-900 mt-1">
                These tasks don't have anyone assigned yet. Find a volunteer before they are overlooked.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-100 text-amber-900 border border-amber-300">
                {unassignedCount} {unassignedCount === 1 ? 'task needs a volunteer' : 'tasks need volunteers'}
              </span>
              {unassignedCount > 0 && (
                <Link
                  to="/organizer/unassigned"
                  className="text-xs font-bold text-[#16A6A1] hover:underline flex items-center gap-1"
                >
                  View all unassigned →
                </Link>
              )}
            </div>
          </div>

          {/* Unassigned Tasks Grid */}
          <div className="mt-6">
            {unassignedCount === 0 ? (
              <div className="py-8 text-center bg-emerald-50/50 rounded-xl border border-emerald-200">
                <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
                <h4 className="text-sm font-bold text-emerald-950">
                  Great work! All campaign tasks currently have volunteers assigned.
                </h4>
                <p className="text-xs text-emerald-800 mt-0.5">
                  No missing responsibilities detected at this time.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {unassignedTasks.map((task) => (
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
        </div>

        {/* ========================================================= */}
        {/* TASK PROGRESS BREAKDOWN                                    */}
        {/* ========================================================= */}
        <div className="bg-white rounded-2xl border border-[#E6EAF0] p-6 sm:p-8 shadow-xs">
          <h3 className="text-base font-bold text-[#172B4D] mb-1">
            Overall Task Progress
          </h3>
          <p className="text-xs text-[#6B778C] mb-6">
            Live execution status across all ongoing community initiatives
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-2">
                <span>Pending Tasks</span>
                <span>{pendingTasksCount} tasks</span>
              </div>
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-slate-500 rounded-full"
                  style={{ width: `${totalTasks > 0 ? (pendingTasksCount / totalTasks) * 100 : 0}%` }}
                />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-teal-50/60 border border-teal-200">
              <div className="flex items-center justify-between text-xs font-semibold text-teal-900 mb-2">
                <span>In Progress</span>
                <span>{inProgressTasksCount} tasks</span>
              </div>
              <div className="w-full h-2 bg-teal-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#16A6A1] rounded-full"
                  style={{ width: `${totalTasks > 0 ? (inProgressTasksCount / totalTasks) * 100 : 0}%` }}
                />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200">
              <div className="flex items-center justify-between text-xs font-semibold text-emerald-900 mb-2">
                <span>Completed</span>
                <span>{completedTasksCount} tasks</span>
              </div>
              <div className="w-full h-2 bg-emerald-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#36B37E] rounded-full"
                  style={{ width: `${totalTasks > 0 ? (completedTasksCount / totalTasks) * 100 : 0}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* CAMPAIGN OVERVIEW                                         */}
        {/* ========================================================= */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-xl font-bold text-[#172B4D]">
                My Campaigns
              </h3>
              <p className="text-xs text-[#6B778C]">
                Active, upcoming, and completed community drives
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search campaigns..."
                  value={campaignSearch}
                  onChange={(e) => setCampaignSearch(e.target.value)}
                  className="pl-8 pr-3 py-1.5 text-xs rounded-xl border border-[#E6EAF0] focus:ring-1 focus:ring-[#16A6A1] focus:outline-none"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="py-1.5 px-3 text-xs rounded-xl border border-[#E6EAF0] bg-white font-medium focus:ring-1 focus:ring-[#16A6A1]"
              >
                <option value="All">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Upcoming">Upcoming</option>
                <option value="Completed">Completed</option>
              </select>

              <Link
                to="/organizer/campaigns"
                className="px-3 py-1.5 rounded-xl text-xs font-bold text-[#16A6A1] hover:bg-teal-50 border border-teal-200 transition-colors"
              >
                View All
              </Link>
            </div>
          </div>

          {filteredCampaigns.length === 0 ? (
            <EmptyState
              type="noCampaigns"
              actionLabel="Create Campaign"
              actionTo="/organizer/campaigns/new"
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCampaigns.slice(0, 6).map((campaign) => (
                <CampaignCard key={campaign.id} campaign={campaign} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Assign Volunteer Modal */}
      <AssignVolunteerModal
        task={assigningTask}
        isOpen={Boolean(assigningTask)}
        onClose={() => setAssigningTask(null)}
      />

      {/* Create Task Modal */}
      <CreateTaskModal
        isOpen={createTaskModalOpen}
        onClose={() => setCreateTaskModalOpen(false)}
      />
    </DashboardLayout>
  );
};


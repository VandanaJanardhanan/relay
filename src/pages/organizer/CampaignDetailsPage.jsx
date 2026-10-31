import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { DashboardLayout } from '../../components/common/DashboardLayout';
import { TaskCard } from '../../components/tasks/TaskCard';
import { CategoryBadge } from '../../components/common/StatusBadge';
import { AssignVolunteerModal } from '../../components/modals/AssignVolunteerModal';
import { CreateTaskModal } from '../../components/modals/CreateTaskModal';
import { ConfirmDialog } from '../../components/modals/ConfirmDialog';
import { EmptyState } from '../../components/common/EmptyState';
import { isTaskUnassigned } from '../../utils/taskUtils';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Plus, 
  Trash2, 
  Edit3, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  PlayCircle 
} from 'lucide-react';

export const CampaignDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { 
    campaigns, 
    tasks, 
    deleteCampaign, 
    deleteTask,
    updateCampaign 
  } = useData();

  const [assigningTask, setAssigningTask] = useState(null);
  const [createTaskOpen, setCreateTaskOpen] = useState(false);
  const [confirmDeleteCampaign, setConfirmDeleteCampaign] = useState(false);
  const [confirmDeleteTask, setConfirmDeleteTask] = useState(null);
  const [statusFilter, setStatusFilter] = useState('All');

  const campaign = campaigns.find((c) => c.id === id);

  if (!campaign) {
    return (
      <DashboardLayout title="Campaign Not Found">
        <EmptyState
          type="noCampaigns"
          title="Campaign Not Found"
          description="The campaign you requested does not exist or may have been deleted."
          actionLabel="Return to Campaigns"
          actionTo="/organizer/campaigns"
        />
      </DashboardLayout>
    );
  }

  // Tasks for this campaign
  const campaignTasks = tasks.filter((t) => t.campaignId === campaign.id);
  const unassignedCampaignTasks = campaignTasks.filter(isTaskUnassigned);

  const filteredTasks = campaignTasks.filter((t) => {
    if (statusFilter === 'Unassigned') return isTaskUnassigned(t);
    if (statusFilter === 'Assigned') return !isTaskUnassigned(t);
    if (statusFilter !== 'All') return t.status === statusFilter;
    return true;
  });

  const handleDeleteCampaign = async () => {
    try {
      await deleteCampaign(campaign.id);
      navigate('/organizer/campaigns');
    } catch (err) {
      console.error(err);
    }
  };

  const completionPct = campaign.completionPercentage || 0;

  return (
    <DashboardLayout title="Campaign Details">
      <div className="space-y-6">
        {/* Back navigation */}
        <Link
          to="/organizer/campaigns"
          className="inline-flex items-center gap-2 text-xs font-bold text-[#16A6A1] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Campaigns
        </Link>

        {/* Campaign Header Card */}
        <div className="bg-white rounded-2xl border border-[#E6EAF0] p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-slate-100">
            <div className="space-y-3 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <CategoryBadge category={campaign.category} />
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full border bg-emerald-50 text-emerald-700 border-emerald-200">
                  {campaign.status}
                </span>
                <span className="text-xs text-slate-400">
                  ID: {campaign.id}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172B4D] tracking-tight">
                {campaign.title}
              </h2>

              <p className="text-xs sm:text-sm text-[#6B778C] leading-relaxed">
                {campaign.description}
              </p>

              <div className="flex flex-wrap items-center gap-5 pt-1 text-xs text-[#6B778C]">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#16A6A1]" />
                  <span className="font-medium text-[#172B4D]">{campaign.location}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span>{campaign.startDate} — {campaign.endDate}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap lg:flex-col items-center gap-2.5 shrink-0">
              <button
                onClick={() => setCreateTaskOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-[#16A6A1] hover:bg-[#11817d] transition-all shadow-xs"
              >
                <Plus className="w-4 h-4" />
                Add Campaign Task
              </button>

              <button
                onClick={() => setConfirmDeleteCampaign(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs text-rose-600 bg-rose-50 hover:bg-rose-100 transition-colors border border-rose-200"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Delete Campaign
              </button>
            </div>
          </div>

          {/* Campaign Statistics Row */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 pt-6">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[11px] font-medium text-slate-500">Total Tasks</span>
              <p className="text-xl font-black text-[#172B4D] mt-0.5">{campaignTasks.length}</p>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100">
              <span className="text-[11px] font-medium text-emerald-800">Completed</span>
              <p className="text-xl font-black text-emerald-700 mt-0.5">
                {campaignTasks.filter((t) => t.status === 'Completed').length}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-teal-50 border border-teal-100">
              <span className="text-[11px] font-medium text-teal-800">In Progress</span>
              <p className="text-xl font-black text-teal-700 mt-0.5">
                {campaignTasks.filter((t) => t.status === 'In Progress').length}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[11px] font-medium text-slate-500">Pending</span>
              <p className="text-xl font-black text-slate-700 mt-0.5">
                {campaignTasks.filter((t) => t.status === 'Pending').length}
              </p>
            </div>

            {/* Differentiator KPI */}
            <div className={`p-3 rounded-xl border ${
              unassignedCampaignTasks.length > 0 
                ? 'bg-amber-50 border-amber-300 ring-1 ring-amber-200' 
                : 'bg-slate-50 border-slate-100'
            }`}>
              <span className="text-[11px] font-bold text-amber-900 flex items-center gap-1">
                {unassignedCampaignTasks.length > 0 && <AlertTriangle className="w-3 h-3 text-amber-600 inline" />}
                Unassigned
              </span>
              <p className="text-xl font-black text-amber-900 mt-0.5">
                {unassignedCampaignTasks.length}
              </p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-6 pt-5 border-t border-slate-100">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-bold text-[#172B4D]">
                Campaign Completion: {completionPct}%
              </span>
              <span className="text-[#6B778C]">
                {campaignTasks.filter((t) => t.status === 'Completed').length} of {campaignTasks.length} tasks completed
              </span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#16A6A1] rounded-full transition-all duration-500"
                style={{ width: `${completionPct}%` }}
              />
            </div>
          </div>
        </div>

        {/* Task Management Section */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold text-[#172B4D]">
                Campaign Responsibilities ({campaignTasks.length})
              </h3>
              <p className="text-xs text-[#6B778C]">
                Track volunteer deliverables and address unassigned gaps
              </p>
            </div>

            {/* Task Filters */}
            <div className="flex flex-wrap items-center gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-1.5 text-xs rounded-xl border border-[#E6EAF0] bg-white font-medium focus:ring-1 focus:ring-[#16A6A1]"
              >
                <option value="All">All Tasks</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Unassigned">⚠️ Unassigned Tasks</option>
                <option value="Assigned">Assigned Tasks</option>
              </select>

              <button
                onClick={() => setCreateTaskOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-[#16A6A1] hover:bg-[#11817d] transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Task
              </button>
            </div>
          </div>

          {filteredTasks.length === 0 ? (
            <EmptyState
              type={statusFilter === 'Unassigned' ? 'noUnassigned' : 'noTasks'}
              actionLabel="Add First Task"
              onAction={() => setCreateTaskOpen(true)}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onAssign={(t) => setAssigningTask(t)}
                  onDelete={(id) => setConfirmDeleteTask(id)}
                  showCampaign={false}
                />
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

      {/* Create Task Modal prefilled with this campaign */}
      <CreateTaskModal
        defaultCampaignId={campaign.id}
        isOpen={createTaskOpen}
        onClose={() => setCreateTaskOpen(false)}
      />

      {/* Delete Campaign Confirmation */}
      <ConfirmDialog
        isOpen={confirmDeleteCampaign}
        title="Delete Campaign?"
        message={`Are you sure you want to permanently delete "${campaign.title}"? All associated tasks will also be removed.`}
        confirmLabel="Yes, Delete Campaign"
        type="danger"
        onConfirm={handleDeleteCampaign}
        onCancel={() => setConfirmDeleteCampaign(false)}
      />

      {/* Delete Task Confirmation */}
      <ConfirmDialog
        isOpen={Boolean(confirmDeleteTask)}
        title="Delete Task?"
        message="Are you sure you want to remove this task? This action cannot be undone."
        confirmLabel="Delete Task"
        type="danger"
        onConfirm={async () => {
          if (confirmDeleteTask) {
            await deleteTask(confirmDeleteTask);
            setConfirmDeleteTask(null);
          }
        }}
        onCancel={() => setConfirmDeleteTask(null)}
      />
    </DashboardLayout>
  );
};


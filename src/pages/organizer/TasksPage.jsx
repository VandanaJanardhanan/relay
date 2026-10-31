import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { DashboardLayout } from '../../components/common/DashboardLayout';
import { TaskCard } from '../../components/tasks/TaskCard';
import { AssignVolunteerModal } from '../../components/modals/AssignVolunteerModal';
import { CreateTaskModal } from '../../components/modals/CreateTaskModal';
import { ConfirmDialog } from '../../components/modals/ConfirmDialog';
import { EmptyState } from '../../components/common/EmptyState';
import { isTaskUnassigned } from '../../utils/taskUtils';
import { 
  Plus, 
  Search, 
  Filter, 
  ArrowUpDown, 
  AlertTriangle, 
  CheckSquare 
} from 'lucide-react';

export const TasksPage = () => {
  const { tasks, deleteTask, unassignedCount } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterState, setFilterState] = useState('All'); // All, Pending, In Progress, Completed, Unassigned, Assigned
  const [sortBy, setSortBy] = useState('dueDate'); // dueDate, priority, title, status
  const [assigningTask, setAssigningTask] = useState(null);
  const [createTaskOpen, setCreateTaskOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    const unassigned = isTaskUnassigned(task);
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (task.campaignTitle && task.campaignTitle.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (task.assignedVolunteerName && task.assignedVolunteerName.toLowerCase().includes(searchTerm.toLowerCase()));

    let matchesFilter = true;
    if (filterState === 'Unassigned') matchesFilter = unassigned;
    else if (filterState === 'Assigned') matchesFilter = !unassigned;
    else if (filterState !== 'All') matchesFilter = task.status === filterState;

    return matchesSearch && matchesFilter;
  });

  // Sort tasks
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === 'dueDate') {
      return new Date(a.dueDate) - new Date(b.dueDate);
    }
    if (sortBy === 'priority') {
      const pWeights = { High: 3, Medium: 2, Low: 1 };
      return (pWeights[b.priority] || 0) - (pWeights[a.priority] || 0);
    }
    if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    }
    if (sortBy === 'status') {
      return a.status.localeCompare(b.status);
    }
    return 0;
  });

  return (
    <DashboardLayout title="All Tasks">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#E6EAF0]">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-[#172B4D]">Task Management</h2>
              {unassignedCount > 0 && (
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3 text-amber-700" />
                  {unassignedCount} Unassigned
                </span>
              )}
            </div>
            <p className="text-xs text-[#6B778C] mt-1">
              Oversee all responsibilities, volunteer delegations, and progress stages.
            </p>
          </div>

          <button
            onClick={() => setCreateTaskOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-[#16A6A1] hover:bg-[#11817d] transition-all shadow-xs"
          >
            <Plus className="w-4 h-4" />
            Add New Task
          </button>
        </div>

        {/* Filter bar */}
        <div className="bg-white p-4 rounded-2xl border border-[#E6EAF0] flex flex-wrap items-center justify-between gap-3">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by task title, campaign, or volunteer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-[#E6EAF0] focus:ring-1 focus:ring-[#16A6A1] focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Filter */}
            <select
              value={filterState}
              onChange={(e) => setFilterState(e.target.value)}
              className="px-3 py-2 text-xs rounded-xl border border-[#E6EAF0] bg-white font-medium focus:ring-1 focus:ring-[#16A6A1]"
            >
              <option value="All">All Statuses ({tasks.length})</option>
              <option value="Unassigned">⚠️ Unassigned ({unassignedCount})</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Assigned">Assigned Tasks</option>
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 text-xs rounded-xl border border-[#E6EAF0] bg-white font-medium focus:ring-1 focus:ring-[#16A6A1]"
            >
              <option value="dueDate">Sort by: Due Date</option>
              <option value="priority">Sort by: Priority (High First)</option>
              <option value="title">Sort by: Task Title</option>
              <option value="status">Sort by: Status</option>
            </select>
          </div>
        </div>

        {/* Tasks Grid */}
        {sortedTasks.length === 0 ? (
          <EmptyState
            type={filterState === 'Unassigned' ? 'noUnassigned' : 'noTasks'}
            actionLabel={searchTerm ? 'Clear Filter' : 'Add First Task'}
            onAction={
              searchTerm
                ? () => { setSearchTerm(''); setFilterState('All'); }
                : () => setCreateTaskOpen(true)
            }
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onAssign={(t) => setAssigningTask(t)}
                onDelete={(id) => setTaskToDelete(id)}
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

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={Boolean(taskToDelete)}
        title="Delete Task?"
        message="Are you sure you want to permanently delete this task? This action cannot be undone."
        confirmLabel="Delete Task"
        type="danger"
        onConfirm={async () => {
          if (taskToDelete) {
            await deleteTask(taskToDelete);
            setTaskToDelete(null);
          }
        }}
        onCancel={() => setTaskToDelete(null)}
      />
    </DashboardLayout>
  );
};


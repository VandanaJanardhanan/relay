import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { DashboardLayout } from '../../components/common/DashboardLayout';
import { TaskCard } from '../../components/tasks/TaskCard';
import { EmptyState } from '../../components/common/EmptyState';
import { 
  ListTodo, 
  CheckCircle2, 
  Clock, 
  Search, 
  Filter, 
  HandHelping 
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const MyTasksPage = () => {
  const { myTasks } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredTasks = myTasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (task.campaignTitle && task.campaignTitle.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === 'All' || task.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const completedCount = myTasks.filter((t) => t.status === 'Completed').length;
  const inProgressCount = myTasks.filter((t) => t.status === 'In Progress').length;
  const pendingCount = myTasks.filter((t) => t.status === 'Pending').length;

  return (
    <DashboardLayout title="My Tasks">
      <div className="space-y-6">
        {/* Banner with Progress Metrics */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E6EAF0]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-[#16A6A1] text-xs font-bold uppercase tracking-wider mb-2">
                <ListTodo className="w-3.5 h-3.5" />
                My Commitments
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#172B4D]">
                My Assigned Responsibilities ({myTasks.length})
              </h2>
              <p className="text-xs sm:text-sm text-[#6B778C] mt-1">
                Keep your task progress updated so campaign organizers stay informed in real time.
              </p>
            </div>

            <Link
              to="/volunteer/available-tasks"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-[#16A6A1] hover:bg-[#11817d] transition-all shadow-xs shrink-0"
            >
              <HandHelping className="w-4 h-4" />
              Claim More Tasks
            </Link>
          </div>

          {/* KPI Mini-cards */}
          <div className="grid grid-cols-3 gap-3 pt-6 text-center">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-xs text-slate-500 font-medium">Pending</span>
              <p className="text-xl font-black text-slate-700 mt-0.5">{pendingCount}</p>
            </div>
            <div className="p-3 rounded-xl bg-teal-50 border border-teal-100">
              <span className="text-xs text-teal-800 font-medium">In Progress</span>
              <p className="text-xl font-black text-[#16A6A1] mt-0.5">{inProgressCount}</p>
            </div>
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100">
              <span className="text-xs text-emerald-800 font-medium">Completed</span>
              <p className="text-xl font-black text-[#36B37E] mt-0.5">{completedCount}</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-2xl border border-[#E6EAF0] flex flex-wrap items-center justify-between gap-3">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search my tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-[#E6EAF0] focus:ring-1 focus:ring-[#16A6A1] focus:outline-none"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl border border-[#E6EAF0] bg-white font-medium focus:ring-1 focus:ring-[#16A6A1]"
          >
            <option value="All">All Statuses ({myTasks.length})</option>
            <option value="Pending">Pending ({pendingCount})</option>
            <option value="In Progress">In Progress ({inProgressCount})</option>
            <option value="Completed">Completed ({completedCount})</option>
          </select>
        </div>

        {/* Tasks Grid */}
        {filteredTasks.length === 0 ? (
          <EmptyState
            type="noMyTasks"
            actionLabel="Explore Available Tasks"
            actionTo="/volunteer/available-tasks"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTasks.map((task) => (
              <TaskCard key={task.id} task={task} showCampaign={true} />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};


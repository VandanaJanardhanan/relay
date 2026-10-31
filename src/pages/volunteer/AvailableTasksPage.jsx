import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { DashboardLayout } from '../../components/common/DashboardLayout';
import { TaskCard } from '../../components/tasks/TaskCard';
import { EmptyState } from '../../components/common/EmptyState';
import { 
  HandHelping, 
  Search, 
  Filter, 
  Sparkles, 
  ArrowRight 
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const AvailableTasksPage = () => {
  const { availableTasks, campaigns } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [campaignFilter, setCampaignFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');

  const filteredTasks = availableTasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (task.campaignTitle && task.campaignTitle.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCampaign = campaignFilter === 'All' || task.campaignId === campaignFilter;
    const matchesPriority = priorityFilter === 'All' || task.priority === priorityFilter;

    return matchesSearch && matchesCampaign && matchesPriority;
  });

  return (
    <DashboardLayout title="Available Tasks">
      <div className="space-y-6">
        {/* Banner */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E6EAF0]">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-[#16A6A1] text-xs font-bold uppercase tracking-wider mb-2">
            <HandHelping className="w-3.5 h-3.5" />
            Volunteer Action Center
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#172B4D]">
            Available Responsibilities ({availableTasks.length})
          </h2>
          <p className="text-xs sm:text-sm text-[#6B778C] mt-1 max-w-2xl">
            These tasks have no assigned volunteer yet. Choose where you would like to help and click <strong>"Take This Task"</strong> to claim ownership.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-2xl border border-[#E6EAF0] flex flex-wrap items-center justify-between gap-3">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search available tasks..."
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

        {/* Available Tasks Grid */}
        {filteredTasks.length === 0 ? (
          <EmptyState
            type="noAvailableTasks"
            title="No available tasks matching your filter"
            description="You're either all caught up, or no tasks match your current search terms."
            actionLabel="View My Current Tasks"
            actionTo="/volunteer/my-tasks"
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


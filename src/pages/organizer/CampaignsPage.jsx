import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { DashboardLayout } from '../../components/common/DashboardLayout';
import { CampaignCard } from '../../components/campaigns/CampaignCard';
import { EmptyState } from '../../components/common/EmptyState';
import { CAMPAIGN_CATEGORIES } from '../../utils/taskUtils';
import { Link } from 'react-router-dom';
import { Plus, Search, Filter, FolderKanban } from 'lucide-react';

export const CampaignsPage = () => {
  const { campaigns } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const filtered = campaigns.filter((c) => {
    const matchesSearch = 
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
    const matchesCategory = categoryFilter === 'All' || c.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <DashboardLayout title="Campaigns Management">
      <div className="space-y-6">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#E6EAF0]">
          <div>
            <h2 className="text-xl font-bold text-[#172B4D]">Community Campaigns</h2>
            <p className="text-xs text-[#6B778C] mt-0.5">
              Organize, monitor, and coordinate your community drives in one shared workspace.
            </p>
          </div>

          <Link
            to="/organizer/campaigns/new"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-[#16A6A1] hover:bg-[#11817d] transition-all shadow-xs"
          >
            <Plus className="w-4 h-4" />
            Create Campaign
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-2xl border border-[#E6EAF0] flex flex-wrap items-center justify-between gap-3">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by title, location, or keyword..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-[#E6EAF0] focus:ring-1 focus:ring-[#16A6A1] focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 text-xs rounded-xl border border-[#E6EAF0] bg-white font-medium focus:ring-1 focus:ring-[#16A6A1]"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Completed">Completed</option>
            </select>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 text-xs rounded-xl border border-[#E6EAF0] bg-white font-medium focus:ring-1 focus:ring-[#16A6A1]"
            >
              <option value="All">All Categories</option>
              {CAMPAIGN_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Campaign List */}
        {filtered.length === 0 ? (
          <EmptyState
            type={searchTerm || statusFilter !== 'All' ? 'searchEmpty' : 'noCampaigns'}
            actionLabel={searchTerm ? 'Clear Search' : 'Create Campaign'}
            onAction={searchTerm ? () => { setSearchTerm(''); setStatusFilter('All'); setCategoryFilter('All'); } : undefined}
            actionTo={!searchTerm ? '/organizer/campaigns/new' : undefined}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};


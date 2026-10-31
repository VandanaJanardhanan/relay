import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { DashboardLayout } from '../../components/common/DashboardLayout';
import { CampaignCard } from '../../components/campaigns/CampaignCard';
import { EmptyState } from '../../components/common/EmptyState';
import { CAMPAIGN_CATEGORIES } from '../../utils/taskUtils';
import { Search, Filter, Compass } from 'lucide-react';

export const VolunteerCampaignsPage = () => {
  const { campaigns } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Filter to active and upcoming campaigns
  const activeCampaigns = campaigns.filter((c) => c.status !== 'Completed');

  const filtered = activeCampaigns.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = categoryFilter === 'All' || c.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <DashboardLayout title="Explore Campaigns">
      <div className="space-y-6">
        {/* Banner */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E6EAF0]">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-[#16A6A1] text-xs font-bold uppercase tracking-wider mb-2">
            <Compass className="w-3.5 h-3.5" />
            Community Movements
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#172B4D]">
            Explore Active Initiatives
          </h2>
          <p className="text-xs sm:text-sm text-[#6B778C] mt-1 max-w-2xl">
            Discover community initiatives looking for volunteer support. Open a campaign to see what specific tasks need assistance.
          </p>
        </div>

        {/* Filter bar */}
        <div className="bg-white p-4 rounded-2xl border border-[#E6EAF0] flex flex-wrap items-center justify-between gap-3">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search campaigns by keyword, cause, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-[#E6EAF0] focus:ring-1 focus:ring-[#16A6A1] focus:outline-none"
            />
          </div>

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

        {/* Campaigns Grid */}
        {filtered.length === 0 ? (
          <EmptyState
            type="searchEmpty"
            actionLabel="Reset Filters"
            onAction={() => { setSearchTerm(''); setCategoryFilter('All'); }}
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


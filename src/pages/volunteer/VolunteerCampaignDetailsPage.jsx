import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { DashboardLayout } from '../../components/common/DashboardLayout';
import { TaskCard } from '../../components/tasks/TaskCard';
import { CategoryBadge } from '../../components/common/StatusBadge';
import { EmptyState } from '../../components/common/EmptyState';
import { isTaskUnassigned } from '../../utils/taskUtils';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  HandHelping, 
  CheckCircle, 
  Users 
} from 'lucide-react';

export const VolunteerCampaignDetailsPage = () => {
  const { id } = useParams();
  const { campaigns, tasks } = useData();

  const campaign = campaigns.find((c) => c.id === id);

  if (!campaign) {
    return (
      <DashboardLayout title="Campaign Details">
        <EmptyState
          type="noCampaigns"
          title="Campaign Not Found"
          description="The campaign you are looking for is unavailable or has ended."
          actionLabel="Explore Campaigns"
          actionTo="/volunteer/campaigns"
        />
      </DashboardLayout>
    );
  }

  const campaignTasks = tasks.filter((t) => t.campaignId === campaign.id);
  const openTasks = campaignTasks.filter(isTaskUnassigned);
  const assignedTasks = campaignTasks.filter((t) => !isTaskUnassigned(t));

  return (
    <DashboardLayout title={campaign.title}>
      <div className="space-y-6">
        <Link
          to="/volunteer/campaigns"
          className="inline-flex items-center gap-2 text-xs font-bold text-[#16A6A1] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Campaigns
        </Link>

        {/* Campaign Info Card */}
        <div className="bg-white rounded-2xl border border-[#E6EAF0] p-6 sm:p-8 shadow-xs space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            <CategoryBadge category={campaign.category} />
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full border bg-emerald-50 text-emerald-700 border-emerald-200">
              {campaign.status}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172B4D]">
            {campaign.title}
          </h2>

          <p className="text-xs sm:text-sm text-[#6B778C] leading-relaxed max-w-3xl">
            {campaign.description}
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-[#6B778C] border-t border-slate-100">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#16A6A1]" />
              <span className="font-semibold text-[#172B4D]">{campaign.location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>{campaign.startDate} — {campaign.endDate}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-slate-400" />
              <span>Organizer: <strong>{campaign.organizerName || 'Organizer'}</strong></span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="pt-2">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-bold text-[#172B4D]">
                Campaign Progress: {campaign.completionPercentage || 0}%
              </span>
              <span className="text-[#6B778C]">
                {openTasks.length} available tasks to claim
              </span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#16A6A1] rounded-full transition-all duration-500"
                style={{ width: `${campaign.completionPercentage || 0}%` }}
              />
            </div>
          </div>
        </div>

        {/* Available Tasks to Claim Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <HandHelping className="w-5 h-5 text-[#16A6A1]" />
            <h3 className="text-lg font-bold text-[#172B4D]">
              Open Tasks You Can Claim ({openTasks.length})
            </h3>
          </div>

          {openTasks.length === 0 ? (
            <div className="bg-emerald-50/50 p-6 rounded-2xl border border-emerald-200 text-center">
              <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
              <p className="text-sm font-bold text-emerald-950">
                All tasks for this campaign currently have volunteers assigned!
              </p>
              <p className="text-xs text-emerald-800 mt-0.5">
                Check other campaigns to find more volunteer opportunities.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {openTasks.map((task) => (
                <TaskCard key={task.id} task={task} showCampaign={false} />
              ))}
            </div>
          )}
        </div>

        {/* Existing Assigned Tasks (Read-only Overview) */}
        {assignedTasks.length > 0 && (
          <div className="space-y-4 pt-4 border-t border-slate-200">
            <h3 className="text-base font-bold text-[#172B4D]">
              Other Campaign Responsibilities ({assignedTasks.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {assignedTasks.map((task) => (
                <TaskCard key={task.id} task={task} showCampaign={false} />
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};


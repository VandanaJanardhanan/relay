import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { CategoryBadge } from '../common/StatusBadge';
import { 
  MapPin, 
  Calendar, 
  CheckCircle, 
  AlertTriangle, 
  ArrowRight,
  ListTodo
} from 'lucide-react';

export const CampaignCard = ({ campaign }) => {
  const { role } = useAuth();

  const detailsPath = role === 'organizer' 
    ? `/organizer/campaigns/${campaign.id}` 
    : `/volunteer/campaigns/${campaign.id}`;

  const completionPct = campaign.completionPercentage || 0;
  const hasUnassigned = (campaign.unassignedTasks || 0) > 0;

  return (
    <div className="bg-white rounded-2xl border border-[#E6EAF0] p-5 sm:p-6 transition-all duration-200 hover:shadow-md flex flex-col justify-between">
      <div>
        {/* Top Header: Category & Status */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <CategoryBadge category={campaign.category} />
          <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${
            campaign.status === 'Active' 
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
              : campaign.status === 'Upcoming'
              ? 'bg-blue-50 text-blue-700 border-blue-200'
              : 'bg-slate-100 text-slate-700 border-slate-200'
          }`}>
            {campaign.status}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-bold text-[#172B4D] mb-1.5 hover:text-[#16A6A1] transition-colors">
          <Link to={detailsPath}>{campaign.title}</Link>
        </h3>

        {/* Description */}
        <p className="text-xs text-[#6B778C] mb-4 line-clamp-2 leading-relaxed">
          {campaign.description}
        </p>

        {/* Location & Dates */}
        <div className="space-y-1.5 mb-5 text-xs text-[#6B778C]">
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-[#16A6A1] shrink-0" />
            <span className="truncate">{campaign.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>{campaign.startDate} — {campaign.endDate}</span>
          </div>
        </div>
      </div>

      <div>
        {/* Progress Bar & Tasks breakdown */}
        <div className="pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-semibold text-[#172B4D] flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
              Progress: {completionPct}%
            </span>
            <span className="text-[#6B778C]">
              {campaign.completedTasks || 0} of {campaign.totalTasks || 0} tasks
            </span>
          </div>

          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#16A6A1] rounded-full transition-all duration-500"
              style={{ width: `${completionPct}%` }}
            />
          </div>

          {/* Differentiator indicator */}
          {hasUnassigned && role === 'organizer' && (
            <div className="mt-2.5 flex items-center gap-1.5 text-[11px] font-semibold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>{campaign.unassignedTasks} {campaign.unassignedTasks === 1 ? 'task needs' : 'tasks need'} a volunteer</span>
            </div>
          )}

          {/* Action Button */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500 flex items-center gap-1">
              <ListTodo className="w-3.5 h-3.5" />
              {campaign.totalTasks || 0} Tasks
            </span>
            <Link
              to={detailsPath}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#16A6A1] hover:text-[#11817d] transition-colors"
            >
              <span>View Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};


import React from 'react';
import { 
  CheckCircle, 
  FolderPlus, 
  Inbox, 
  Sparkles, 
  Users, 
  Search 
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const EmptyState = ({
  icon: CustomIcon,
  type = 'default',
  title,
  description,
  actionLabel,
  actionTo,
  onAction,
}) => {
  const defaults = {
    noUnassigned: {
      icon: CheckCircle,
      iconColor: 'text-emerald-500 bg-emerald-50 border-emerald-100',
      title: "Great work! You're all caught up!",
      description: 'Every single campaign task currently has an assigned volunteer. No responsibilities are missing.',
    },
    noTasks: {
      icon: Inbox,
      iconColor: 'text-teal-600 bg-teal-50 border-teal-100',
      title: 'No tasks found',
      description: 'No tasks match your current filter or have been created for this campaign yet.',
    },
    noCampaigns: {
      icon: FolderPlus,
      iconColor: 'text-indigo-600 bg-indigo-50 border-indigo-100',
      title: 'No campaigns yet',
      description: 'Create your first initiative and start turning community energy into organized action.',
    },
    noAvailableTasks: {
      icon: Sparkles,
      iconColor: 'text-amber-600 bg-amber-50 border-amber-100',
      title: "You're all caught up!",
      description: 'There are currently no unassigned tasks waiting for volunteers. Check back soon for new initiatives.',
    },
    noMyTasks: {
      icon: Users,
      iconColor: 'text-blue-600 bg-blue-50 border-blue-100',
      title: "You haven't claimed any tasks yet",
      description: 'Browse available campaign responsibilities and take ownership of a task to get started.',
    },
    searchEmpty: {
      icon: Search,
      iconColor: 'text-slate-500 bg-slate-100 border-slate-200',
      title: 'No results found',
      description: 'Try adjusting your search query or removing filters to see more results.',
    },
    default: {
      icon: Inbox,
      iconColor: 'text-slate-500 bg-slate-100 border-slate-200',
      title: 'No items to display',
      description: 'There is nothing here right now.',
    },
  };

  const current = defaults[type] || defaults.default;
  const Icon = CustomIcon || current.icon;
  const displayTitle = title || current.title;
  const displayDescription = description || current.description;

  return (
    <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-2xl bg-white border border-[#E6EAF0] shadow-xs">
      <div className={`p-4 rounded-2xl border mb-4 ${current.iconColor}`}>
        <Icon className="w-8 h-8" />
      </div>

      <h3 className="text-lg font-bold text-[#172B4D] mb-1.5">{displayTitle}</h3>
      <p className="text-sm text-[#6B778C] max-w-md mb-6 leading-relaxed">
        {displayDescription}
      </p>

      {actionLabel && actionTo && (
        <Link
          to={actionTo}
          className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl font-semibold text-sm text-white bg-[#16A6A1] hover:bg-[#11817d] transition-colors shadow-xs"
        >
          {actionLabel}
        </Link>
      )}

      {actionLabel && onAction && !actionTo && (
        <button
          onClick={onAction}
          className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl font-semibold text-sm text-white bg-[#16A6A1] hover:bg-[#11817d] transition-colors shadow-xs"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};


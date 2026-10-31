import React from 'react';
import { 
  getStatusBadgeStyle, 
  getPriorityBadgeStyle, 
  getAssignmentBadgeStyle 
} from '../../utils/taskUtils';
import { AlertTriangle, CheckCircle2, Clock, PlayCircle } from 'lucide-react';

export const StatusBadge = ({ status, size = 'sm' }) => {
  const style = getStatusBadgeStyle(status);
  
  let icon = <Clock className="w-3 h-3 mr-1" />;
  if (status === 'Completed') {
    icon = <CheckCircle2 className="w-3 h-3 mr-1" />;
  } else if (status === 'In Progress') {
    icon = <PlayCircle className="w-3 h-3 mr-1" />;
  }

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border px-2.5 py-0.5 ${
        size === 'sm' ? 'text-xs' : 'text-sm'
      } ${style}`}
    >
      {icon}
      {status}
    </span>
  );
};

export const PriorityBadge = ({ priority, size = 'sm' }) => {
  const style = getPriorityBadgeStyle(priority);
  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border px-2 py-0.5 ${
        size === 'sm' ? 'text-xs' : 'text-sm'
      } ${style}`}
    >
      {priority}
    </span>
  );
};

export const AssignmentBadge = ({ isUnassigned, volunteerName, size = 'sm' }) => {
  const style = getAssignmentBadgeStyle(isUnassigned);

  if (isUnassigned) {
    return (
      <span
        className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold text-amber-900 bg-amber-100 border-amber-300 ${
          size === 'sm' ? 'text-xs' : 'text-sm'
        }`}
      >
        <AlertTriangle className="w-3 h-3 mr-1 text-amber-700" />
        Unassigned
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-medium text-emerald-800 bg-emerald-50 border-emerald-200 ${
        size === 'sm' ? 'text-xs' : 'text-sm'
      }`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"></span>
      {volunteerName || 'Assigned'}
    </span>
  );
};

export const CategoryBadge = ({ category }) => {
  return (
    <span className="inline-flex items-center rounded-md bg-slate-100 text-slate-700 border border-slate-200/80 px-2 py-0.5 text-xs font-medium">
      {category}
    </span>
  );
};


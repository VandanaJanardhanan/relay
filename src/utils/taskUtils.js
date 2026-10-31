/**
 * Centralized Task Utilities for RELAY
 * 
 * THE MAIN DIFFERENTIATOR:
 * Automatic Unassigned Task Detection (Section 10)
 * 
 * IMPORTANT:
 * - isTaskUnassigned(task) checks the actual volunteer assignment identifier (assignedVolunteerId).
 * - A task is unassigned if assignedVolunteerId is null, undefined, or empty string.
 * - Assignment state is orthogonal to task progress (Pending, In Progress, Completed).
 */

export const isTaskUnassigned = (task) => {
  if (!task) return false;
  return (
    task.assignedVolunteerId === null ||
    task.assignedVolunteerId === undefined ||
    task.assignedVolunteerId === ''
  );
};

export const TASK_STATUSES = {
  PENDING: 'Pending',
  IN_PROGRESS: 'In Progress',
  COMPLETED: 'Completed',
};

export const TASK_PRIORITIES = {
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: 'High',
};

export const CAMPAIGN_CATEGORIES = [
  'Environment',
  'Donation',
  'Education',
  'Community Service',
  'Disaster Relief',
  'Cleanliness Drive',
  'Other',
];

export const CAMPAIGN_STATUSES = {
  UPCOMING: 'Upcoming',
  ACTIVE: 'Active',
  COMPLETED: 'Completed',
};

export const getStatusBadgeStyle = (status) => {
  switch (status) {
    case 'Completed':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    case 'In Progress':
      return 'bg-teal-50 text-teal-700 border-teal-200';
    case 'Pending':
    default:
      return 'bg-slate-100 text-slate-700 border-slate-200';
  }
};

export const getPriorityBadgeStyle = (priority) => {
  switch (priority) {
    case 'High':
      return 'bg-rose-50 text-rose-700 border-rose-200';
    case 'Medium':
      return 'bg-amber-50 text-amber-700 border-amber-200';
    case 'Low':
    default:
      return 'bg-blue-50 text-blue-700 border-blue-200';
  }
};

export const getAssignmentBadgeStyle = (isUnassigned) => {
  if (isUnassigned) {
    return 'bg-amber-100 text-amber-800 border-amber-300 font-medium';
  }
  return 'bg-emerald-50 text-emerald-700 border-emerald-200';
};


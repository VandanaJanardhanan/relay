import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { isTaskUnassigned } from '../../utils/taskUtils';
import { StatusBadge, PriorityBadge, AssignmentBadge } from '../common/StatusBadge';
import { 
  Calendar, 
  UserCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Trash2, 
  ArrowRight,
  HandHelping
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const TaskCard = ({ 
  task, 
  onAssign, 
  onDelete, 
  compact = false,
  showCampaign = true 
}) => {
  const { role, currentUser } = useAuth();
  const { claimTask, updateTaskStatus } = useData();
  const [updating, setUpdating] = useState(false);

  const unassigned = isTaskUnassigned(task);
  const isMyTask = currentUser && task.assignedVolunteerId === currentUser.uid;

  const handleClaim = async () => {
    setUpdating(true);
    try {
      await claimTask(task.id);
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.8 },
        });
      } catch (e) {}
    } catch (err) {
      console.error(err);
    } finally {
      setUpdating(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
    setUpdating(true);
    try {
      await updateTaskStatus(task.id, newStatus);
      if (newStatus === 'Completed') {
        try {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.7 },
          });
        } catch (e) {}
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div
      className={`rounded-2xl border transition-all duration-200 bg-white ${
        unassigned
          ? 'border-amber-300 ring-1 ring-amber-200/60 shadow-xs bg-[#FFFDF9]'
          : 'border-[#E6EAF0] hover:shadow-sm'
      } ${compact ? 'p-4' : 'p-5'}`}
    >
      {/* Top row: Campaign name & Badges */}
      <div className="flex items-start justify-between gap-2 mb-2.5">
        <div className="flex flex-wrap items-center gap-1.5">
          {showCampaign && task.campaignTitle && (
            <span className="text-[11px] font-bold text-[#16A6A1] uppercase tracking-wider">
              {task.campaignTitle}
            </span>
          )}
          <PriorityBadge priority={task.priority} size="sm" />
        </div>

        <div className="flex items-center gap-1.5">
          <StatusBadge status={task.status} size="sm" />
        </div>
      </div>

      {/* Task Title */}
      <h4 className="text-sm sm:text-base font-bold text-[#172B4D] mb-1.5 leading-snug">
        {task.title}
      </h4>

      {/* Description */}
      {task.description && !compact && (
        <p className="text-xs text-[#6B778C] mb-3 line-clamp-2 leading-relaxed">
          {task.description}
        </p>
      )}

      {/* Meta: Due Date & Volunteer status */}
      <div className="pt-2.5 border-t border-slate-100/80 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-1.5 text-slate-500">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <span>Due: <strong>{task.dueDate}</strong></span>
        </div>

        <div className="flex items-center gap-2">
          <AssignmentBadge
            isUnassigned={unassigned}
            volunteerName={task.assignedVolunteerName}
          />
        </div>
      </div>

      {/* Action Bar */}
      <div className="mt-3.5 pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
        {/* Organizer Controls */}
        {role === 'organizer' && (
          <>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => onAssign && onAssign(task)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  unassigned
                    ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-xs animate-pulse'
                    : 'bg-slate-100 hover:bg-slate-200 text-[#172B4D]'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" />
                {unassigned ? 'Assign Volunteer' : 'Reassign'}
              </button>

              {/* Status switcher for Organizer */}
              <select
                value={task.status}
                onChange={(e) => handleStatusChange(e.target.value)}
                disabled={updating}
                className="text-[11px] font-medium border border-slate-200 rounded-lg px-2 py-1 bg-white text-slate-700 focus:ring-1 focus:ring-[#16A6A1]"
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            {onDelete && (
              <button
                onClick={() => onDelete(task.id)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                title="Delete task"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </>
        )}

        {/* Volunteer Controls */}
        {role === 'volunteer' && (
          <div className="w-full flex items-center justify-between">
            {unassigned ? (
              <button
                onClick={handleClaim}
                disabled={updating}
                className="w-full inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-[#16A6A1] hover:bg-[#11817d] transition-all shadow-xs"
              >
                <HandHelping className="w-4 h-4" />
                {updating ? 'Claiming Responsibility...' : 'Take This Task'}
              </button>
            ) : isMyTask ? (
              <div className="w-full flex items-center justify-between gap-2">
                <span className="text-[11px] font-bold text-[#16A6A1] flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Your Responsibility
                </span>

                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] text-slate-500">Status:</span>
                  <select
                    value={task.status}
                    onChange={(e) => handleStatusChange(e.target.value)}
                    disabled={updating}
                    className="text-xs font-semibold border border-slate-300 rounded-lg px-2.5 py-1 bg-white text-slate-800 focus:ring-2 focus:ring-[#16A6A1]"
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>
            ) : (
              <div className="text-[11px] text-slate-500 italic">
                Assigned to {task.assignedVolunteerName}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};


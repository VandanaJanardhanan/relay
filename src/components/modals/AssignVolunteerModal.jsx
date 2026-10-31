import React, { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';
import { X, Search, UserCheck, UserMinus, AlertTriangle } from 'lucide-react';
import { PriorityBadge } from '../common/StatusBadge';

export const AssignVolunteerModal = ({ task, isOpen, onClose }) => {
  const { volunteerStats, assignVolunteer } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (task && task.assignedVolunteerId) {
      const match = volunteerStats.find((v) => v.uid === task.assignedVolunteerId);
      setSelectedVolunteer(match || null);
    } else {
      setSelectedVolunteer(null);
    }
    setSearchTerm('');
  }, [task, volunteerStats]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !task) return null;

  const filteredVolunteers = volunteerStats.filter((v) =>
    v.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await assignVolunteer(task.id, selectedVolunteer);
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUnassign = async () => {
    setLoading(true);
    try {
      await assignVolunteer(task.id, null);
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in">
      <div 
        className="bg-white rounded-2xl max-w-lg w-full border border-[#E6EAF0] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#E6EAF0] flex items-center justify-between bg-slate-50/50">
          <div>
            <h3 id="modal-title" className="text-base font-bold text-[#172B4D]">
              Assign Volunteer
            </h3>
            <p className="text-xs text-[#6B778C]">
              Delegate ownership of this community responsibility
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Task Info Summary */}
        <div className="p-6 border-b border-[#E6EAF0] bg-white space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#16A6A1] uppercase tracking-wider">
              {task.campaignTitle}
            </span>
            <PriorityBadge priority={task.priority} />
          </div>
          <h4 className="text-base font-bold text-[#172B4D]">
            {task.title}
          </h4>
          <p className="text-xs text-[#6B778C] line-clamp-2">
            {task.description || 'No detailed description provided.'}
          </p>
          <div className="pt-1 text-xs text-slate-500 flex items-center gap-2">
            <span>Due: <strong>{task.dueDate}</strong></span>
            {task.assignedVolunteerName ? (
              <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Currently assigned to: {task.assignedVolunteerName}
              </span>
            ) : (
              <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200 flex items-center gap-1 font-semibold">
                <AlertTriangle className="w-3 h-3 text-amber-600" />
                Currently Unassigned
              </span>
            )}
          </div>
        </div>

        {/* Volunteer Search and Selection */}
        <div className="p-6">
          <div className="relative mb-3">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search volunteers by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-[#E6EAF0] focus:outline-none focus:ring-2 focus:ring-[#16A6A1] focus:border-transparent"
            />
          </div>

          <label className="block text-xs font-semibold text-[#172B4D] mb-2">
            Choose Available Volunteer
          </label>

          <div className="max-h-52 overflow-y-auto space-y-1.5 border border-[#E6EAF0] rounded-xl p-2 bg-slate-50/30">
            {filteredVolunteers.length === 0 ? (
              <p className="text-xs text-center text-slate-400 py-6">
                No volunteers found matching "{searchTerm}"
              </p>
            ) : (
              filteredVolunteers.map((vol) => {
                const isSelected = selectedVolunteer?.uid === vol.uid;
                return (
                  <div
                    key={vol.uid}
                    onClick={() => setSelectedVolunteer(vol)}
                    className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer border transition-all ${
                      isSelected
                        ? 'bg-teal-50 border-[#16A6A1] ring-1 ring-[#16A6A1]'
                        : 'bg-white border-transparent hover:border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#172B4D] text-white flex items-center justify-center font-bold text-xs shrink-0">
                        {vol.fullName.charAt(0)}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#172B4D]">{vol.fullName}</p>
                        <p className="text-[11px] text-[#6B778C]">{vol.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-medium">
                        {vol.assignedCount || 0} active {vol.assignedCount === 1 ? 'task' : 'tasks'}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-slate-50/80 border-t border-[#E6EAF0] flex items-center justify-between gap-3">
          <div>
            {task.assignedVolunteerId && (
              <button
                type="button"
                onClick={handleUnassign}
                disabled={loading}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 py-2 px-3 rounded-lg hover:bg-rose-50 transition-colors"
              >
                <UserMinus className="w-3.5 h-3.5" />
                Leave Unassigned
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-[#172B4D] hover:bg-slate-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={loading || !selectedVolunteer}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-[#16A6A1] hover:bg-[#11817d] transition-all shadow-xs disabled:opacity-50"
            >
              <UserCheck className="w-3.5 h-3.5" />
              {loading ? 'Assigning...' : 'Confirm Assignment'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


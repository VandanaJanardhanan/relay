import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { X, Plus, AlertTriangle } from 'lucide-react';

export const CreateTaskModal = ({ defaultCampaignId, isOpen, onClose }) => {
  const { campaigns, volunteerStats, createTask } = useData();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [campaignId, setCampaignId] = useState(defaultCampaignId || campaigns[0]?.id || '');
  const [assignedVolunteerId, setAssignedVolunteerId] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState(
    new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0]
  );
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError('');

    if (!title.trim()) {
      setValidationError('Task title is required.');
      return;
    }

    if (!campaignId) {
      setValidationError('Please select a campaign for this task.');
      return;
    }

    const selectedCampaign = campaigns.find((c) => c.id === campaignId);
    let assignedVolunteerName = null;
    if (assignedVolunteerId) {
      const vol = volunteerStats.find((v) => v.uid === assignedVolunteerId);
      assignedVolunteerName = vol ? vol.fullName : null;
    }

    setLoading(true);
    try {
      await createTask({
        title,
        description,
        campaignId,
        campaignTitle: selectedCampaign ? selectedCampaign.title : 'Campaign',
        assignedVolunteerId: assignedVolunteerId || null,
        assignedVolunteerName,
        priority,
        dueDate,
        status: 'Pending',
      });
      onClose();
    } catch (err) {
      setValidationError(err.message || 'Failed to create task.');
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
        aria-labelledby="create-task-title"
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#E6EAF0] flex items-center justify-between bg-slate-50/50">
          <div>
            <h3 id="create-task-title" className="text-base font-bold text-[#172B4D]">
              Create New Task
            </h3>
            <p className="text-xs text-[#6B778C]">
              Define a community responsibility for your campaign
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
            {validationError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium">
                {validationError}
              </div>
            )}

            {/* Title */}
            <div>
              <label className="block text-xs font-bold text-[#172B4D] mb-1">
                Task Title <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Arrange Waste Collection, Recruit Volunteers..."
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E6EAF0] focus:outline-none focus:ring-2 focus:ring-[#16A6A1] focus:border-transparent"
                required
              />
            </div>

            {/* Campaign Selection */}
            <div>
              <label className="block text-xs font-bold text-[#172B4D] mb-1">
                Associated Campaign <span className="text-rose-500">*</span>
              </label>
              <select
                value={campaignId}
                onChange={(e) => setCampaignId(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E6EAF0] focus:outline-none focus:ring-2 focus:ring-[#16A6A1] focus:border-transparent bg-white"
                required
              >
                <option value="">Select a campaign...</option>
                {campaigns.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title} ({c.status})
                  </option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold text-[#172B4D] mb-1">
                Description & Instructions
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Specify requirements, locations, tools, or contacts needed for this task..."
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E6EAF0] focus:outline-none focus:ring-2 focus:ring-[#16A6A1] focus:border-transparent"
              />
            </div>

            {/* Assigned Volunteer (OPTIONAL - Core differentiator) */}
            <div className="p-3 rounded-xl bg-amber-50/40 border border-amber-200/80">
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-[#172B4D]">
                  Assigned Volunteer <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                {!assignedVolunteerId && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300">
                    <AlertTriangle className="w-3 h-3 text-amber-700" />
                    Will be flagged as Unassigned
                  </span>
                )}
              </div>
              <p className="text-[11px] text-[#6B778C] mb-2 leading-relaxed">
                Leaving this empty highlights the task under <strong>"Tasks That Need Attention"</strong> so it isn't overlooked.
              </p>
              <select
                value={assignedVolunteerId}
                onChange={(e) => setAssignedVolunteerId(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-[#E6EAF0] focus:outline-none focus:ring-2 focus:ring-[#16A6A1] bg-white"
              >
                <option value="">Leave Unassigned (Volunteer can self-claim later)</option>
                {volunteerStats.map((v) => (
                  <option key={v.uid} value={v.uid}>
                    {v.fullName} ({v.assignedCount} active tasks)
                  </option>
                ))}
              </select>
            </div>

            {/* Priority & Due Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#172B4D] mb-1">
                  Priority Level
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E6EAF0] focus:outline-none focus:ring-2 focus:ring-[#16A6A1] bg-white"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High (Critical)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#172B4D] mb-1">
                  Due Date
                </label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E6EAF0] focus:outline-none focus:ring-2 focus:ring-[#16A6A1] bg-white"
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-slate-50/80 border-t border-[#E6EAF0] flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-[#172B4D] hover:bg-slate-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-[#16A6A1] hover:bg-[#11817d] transition-all shadow-xs disabled:opacity-50"
            >
              <Plus className="w-3.5 h-3.5" />
              {loading ? 'Creating...' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


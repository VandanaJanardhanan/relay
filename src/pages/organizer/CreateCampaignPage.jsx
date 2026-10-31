import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { DashboardLayout } from '../../components/common/DashboardLayout';
import { CAMPAIGN_CATEGORIES } from '../../utils/taskUtils';
import { 
  ArrowLeft, 
  Plus, 
  Calendar, 
  MapPin, 
  FolderKanban, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';

export const CreateCampaignPage = () => {
  const { createCampaign } = useData();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Environment');
  const [location, setLocation] = useState('Yenepoya Institute of Technology');
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [endDate, setEndDate] = useState(
    new Date(Date.now() + 5 * 86400000).toISOString().split('T')[0]
  );
  const [status, setStatus] = useState('Active');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!title.trim()) {
      setErrorMsg('Campaign title is required.');
      return;
    }

    if (!description.trim()) {
      setErrorMsg('Please provide a campaign description.');
      return;
    }

    if (!location.trim()) {
      setErrorMsg('Please specify the campaign location.');
      return;
    }

    if (new Date(endDate) < new Date(startDate)) {
      setErrorMsg('End date cannot be earlier than start date.');
      return;
    }

    setLoading(true);
    try {
      const newCamp = await createCampaign({
        title,
        description,
        category,
        location,
        startDate,
        endDate,
        status,
      });
      navigate(`/organizer/campaigns/${newCamp.id}`);
    } catch (err) {
      setErrorMsg(err.message || 'Failed to create campaign.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout title="Create Campaign">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Back Link */}
        <Link
          to="/organizer/campaigns"
          className="inline-flex items-center gap-2 text-xs font-bold text-[#16A6A1] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Campaigns
        </Link>

        {/* Main Card */}
        <div className="bg-white rounded-2xl border border-[#E6EAF0] p-6 sm:p-8 shadow-xs">
          <div className="border-b border-[#E6EAF0] pb-5 mb-6">
            <h2 className="text-xl font-bold text-[#172B4D]">Create a New Campaign</h2>
            <p className="text-xs text-[#6B778C] mt-1">
              Start an initiative and bring your community together.
            </p>
          </div>

          {errorMsg && (
            <div className="mb-6 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Title */}
            <div>
              <label className="block text-xs font-bold text-[#172B4D] mb-1.5">
                Campaign Title <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Campus Clean-up Drive, Book Donation Initiative"
                className="w-full px-4 py-2.5 text-xs rounded-xl border border-[#E6EAF0] focus:ring-2 focus:ring-[#16A6A1] focus:outline-none"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold text-[#172B4D] mb-1.5">
                Campaign Description <span className="text-rose-500">*</span>
              </label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the initiative goals, purpose, required participation, and expected community outcome..."
                className="w-full px-4 py-2.5 text-xs rounded-xl border border-[#E6EAF0] focus:ring-2 focus:ring-[#16A6A1] focus:outline-none"
                required
              />
            </div>

            {/* Category and Status */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#172B4D] mb-1.5">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs rounded-xl border border-[#E6EAF0] bg-white focus:ring-2 focus:ring-[#16A6A1] focus:outline-none"
                >
                  {CAMPAIGN_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#172B4D] mb-1.5">
                  Initial Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs rounded-xl border border-[#E6EAF0] bg-white focus:ring-2 focus:ring-[#16A6A1] focus:outline-none"
                >
                  <option value="Active">Active (Open for participation)</option>
                  <option value="Upcoming">Upcoming (Planning phase)</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-xs font-bold text-[#172B4D] mb-1.5">
                Location <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Yenepoya Institute of Technology, Mangalore"
                  className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-[#E6EAF0] focus:ring-2 focus:ring-[#16A6A1] focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Start and End Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#172B4D] mb-1.5">
                  Start Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs rounded-xl border border-[#E6EAF0] bg-white focus:ring-2 focus:ring-[#16A6A1] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#172B4D] mb-1.5">
                  End Date
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs rounded-xl border border-[#E6EAF0] bg-white focus:ring-2 focus:ring-[#16A6A1] focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Submit */}
            <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
              <Link
                to="/organizer/campaigns"
                className="px-5 py-2.5 text-xs font-bold text-[#172B4D] hover:bg-slate-100 rounded-xl transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-[#16A6A1] hover:bg-[#11817d] transition-all shadow-xs disabled:opacity-50"
              >
                <Plus className="w-4 h-4" />
                {loading ? 'Creating Campaign...' : 'Create Campaign'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};


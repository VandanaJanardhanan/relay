import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { DashboardLayout } from '../../components/common/DashboardLayout';
import { StatusBadge, PriorityBadge } from '../../components/common/StatusBadge';
import { EmptyState } from '../../components/common/EmptyState';
import { 
  Users, 
  Search, 
  Mail, 
  CheckCircle2, 
  Clock, 
  FolderKanban, 
  X, 
  ExternalLink 
} from 'lucide-react';

export const VolunteersPage = () => {
  const { volunteerStats } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);

  const filteredVolunteers = volunteerStats.filter((v) =>
    v.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout title="Volunteers Directory">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#E6EAF0]">
          <div>
            <h2 className="text-xl font-bold text-[#172B4D]">Volunteer Community</h2>
            <p className="text-xs text-[#6B778C] mt-0.5">
              Monitor volunteer workloads, assigned responsibilities, and campaign participation.
            </p>
          </div>
          <div className="text-xs font-bold px-3 py-1.5 rounded-xl bg-teal-50 text-[#16A6A1] border border-teal-200">
            {volunteerStats.length} Registered Volunteers
          </div>
        </div>

        {/* Search */}
        <div className="bg-white p-4 rounded-2xl border border-[#E6EAF0]">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search volunteers by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-[#E6EAF0] focus:ring-1 focus:ring-[#16A6A1] focus:outline-none"
            />
          </div>
        </div>

        {/* Volunteers Table/Cards */}
        {filteredVolunteers.length === 0 ? (
          <EmptyState
            type="searchEmpty"
            actionLabel="Clear Search"
            onAction={() => setSearchTerm('')}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVolunteers.map((vol) => (
              <div
                key={vol.uid}
                className="bg-white rounded-2xl border border-[#E6EAF0] p-6 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-[#172B4D] text-white flex items-center justify-center font-bold text-base shrink-0 shadow-xs">
                        {vol.fullName.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-[#172B4D]">{vol.fullName}</h3>
                        <p className="text-xs text-[#6B778C] flex items-center gap-1 mt-0.5">
                          <Mail className="w-3 h-3 text-slate-400" />
                          <span className="truncate max-w-[160px]">{vol.email}</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Workload Stats */}
                  <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 text-center mb-4">
                    <div className="p-2 rounded-xl bg-slate-50">
                      <span className="text-[10px] text-slate-500 font-medium">Assigned</span>
                      <p className="text-base font-black text-[#172B4D]">{vol.assignedCount}</p>
                    </div>
                    <div className="p-2 rounded-xl bg-teal-50">
                      <span className="text-[10px] text-teal-700 font-medium">In Progress</span>
                      <p className="text-base font-black text-[#16A6A1]">{vol.inProgressCount}</p>
                    </div>
                    <div className="p-2 rounded-xl bg-emerald-50">
                      <span className="text-[10px] text-emerald-700 font-medium">Completed</span>
                      <p className="text-base font-black text-[#36B37E]">{vol.completedCount}</p>
                    </div>
                  </div>

                  <div className="text-xs text-[#6B778C] flex items-center gap-1.5 mb-2">
                    <FolderKanban className="w-3.5 h-3.5 text-[#16A6A1]" />
                    <span>Participating in <strong>{vol.campaignsCount}</strong> campaigns</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <button
                    onClick={() => setSelectedVolunteer(vol)}
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold text-[#172B4D] bg-slate-100 hover:bg-slate-200 transition-colors"
                  >
                    View Responsibilities ({vol.assignedCount})
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Volunteer Responsibilities Detail Modal */}
      {selectedVolunteer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full border border-[#E6EAF0] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-5 border-b border-[#E6EAF0] flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#172B4D] text-white flex items-center justify-center font-bold text-sm">
                  {selectedVolunteer.fullName.charAt(0)}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#172B4D]">
                    {selectedVolunteer.fullName}'s Tasks
                  </h3>
                  <p className="text-xs text-[#6B778C]">{selectedVolunteer.email}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedVolunteer(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 max-h-96 overflow-y-auto space-y-3">
              {selectedVolunteer.tasks && selectedVolunteer.tasks.length > 0 ? (
                selectedVolunteer.tasks.map((task) => (
                  <div
                    key={task.id}
                    className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/40 space-y-1.5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-bold text-[#16A6A1] uppercase">
                        {task.campaignTitle}
                      </span>
                      <StatusBadge status={task.status} size="sm" />
                    </div>
                    <h4 className="text-xs font-bold text-[#172B4D]">{task.title}</h4>
                    {task.description && (
                      <p className="text-[11px] text-[#6B778C] line-clamp-2">
                        {task.description}
                      </p>
                    )}
                    <div className="flex items-center justify-between pt-1 text-[11px] text-slate-500">
                      <span>Due: {task.dueDate}</span>
                      <PriorityBadge priority={task.priority} size="sm" />
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-center text-slate-400 py-6">
                  No active tasks assigned to this volunteer.
                </p>
              )}
            </div>

            <div className="px-6 py-4 bg-slate-50 border-t border-[#E6EAF0] flex justify-end">
              <button
                onClick={() => setSelectedVolunteer(null)}
                className="px-4 py-2 text-xs font-bold text-[#172B4D] hover:bg-slate-200 rounded-xl transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};


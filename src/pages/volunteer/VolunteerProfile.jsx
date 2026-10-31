import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { DashboardLayout } from '../../components/common/DashboardLayout';
import { 
  User, 
  Mail, 
  Building, 
  CheckCircle2, 
  Clock, 
  ListTodo, 
  HeartHandshake, 
  Award 
} from 'lucide-react';

export const VolunteerProfile = () => {
  const { currentUser } = useAuth();
  const { myTasks } = useData();

  const completed = myTasks.filter((t) => t.status === 'Completed').length;
  const inProgress = myTasks.filter((t) => t.status === 'In Progress').length;

  return (
    <DashboardLayout title="Volunteer Profile">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white rounded-2xl border border-[#E6EAF0] p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b border-slate-100 text-center sm:text-left">
            <div className="w-24 h-24 rounded-full bg-[#16A6A1] text-white flex items-center justify-center font-black text-3xl ring-4 ring-teal-50 shadow-md">
              {currentUser?.fullName?.charAt(0) || 'V'}
            </div>

            <div className="space-y-1.5 flex-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-teal-50 text-[#16A6A1] text-xs font-bold uppercase tracking-wider border border-teal-200">
                <HeartHandshake className="w-3.5 h-3.5" />
                Active Volunteer
              </div>
              <h2 className="text-2xl font-extrabold text-[#172B4D]">
                {currentUser?.fullName || 'Volunteer'}
              </h2>
              <p className="text-xs text-[#6B778C] flex items-center justify-center sm:justify-start gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                {currentUser?.email || 'volunteer@relay.org'}
              </p>
              <p className="text-xs text-slate-500 flex items-center justify-center sm:justify-start gap-1.5">
                <Building className="w-3.5 h-3.5 text-slate-400" />
                Yenepoya Institute of Technology · CODE MEET 2026
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-center">
              <ListTodo className="w-5 h-5 text-blue-600 mx-auto mb-1" />
              <span className="text-xs text-slate-500">Tasks Claimed</span>
              <p className="text-xl font-black text-[#172B4D]">{myTasks.length}</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-center">
              <Clock className="w-5 h-5 text-[#16A6A1] mx-auto mb-1" />
              <span className="text-xs text-slate-500">In Progress</span>
              <p className="text-xl font-black text-[#16A6A1]">{inProgress}</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-center">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
              <span className="text-xs text-slate-500">Delivered Completed</span>
              <p className="text-xl font-black text-[#36B37E]">{completed}</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};


import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { DashboardLayout } from '../../components/common/DashboardLayout';
import { Settings, Shield, Bell, CheckCircle2 } from 'lucide-react';

export const VolunteerSettings = () => {
  const { currentUser, isFirebaseConfigured } = useAuth();

  return (
    <DashboardLayout title="Settings">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white rounded-2xl border border-[#E6EAF0] p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
            <Settings className="w-5 h-5 text-[#16A6A1]" />
            <h3 className="text-lg font-bold text-[#172B4D]">
              Account Preferences
            </h3>
          </div>

          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div>
                <p className="font-bold text-[#172B4D]">Task Claim Notifications</p>
                <p className="text-[#6B778C]">Receive alerts when new tasks match your skill area</p>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#16A6A1] rounded cursor-pointer" />
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div>
                <p className="font-bold text-[#172B4D]">Connection State</p>
                <p className="text-[#6B778C]">Platform synchronization bridge</p>
              </div>
              <span className="font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                {isFirebaseConfigured ? 'Connected to Cloud Firestore' : 'Active Local Demo Mode'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};


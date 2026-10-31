import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { DashboardLayout } from '../../components/common/DashboardLayout';
import { ConfirmDialog } from '../../components/modals/ConfirmDialog';
import { seedFirestoreDemoData } from '../../services/storageService';
import { 
  Database, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  Cloud, 
  Server, 
  Terminal,
  Sparkles
} from 'lucide-react';

export const OrganizerSettings = () => {
  const { isFirebaseConfigured } = useAuth();
  const { resetData } = useData();
  const { success, error, info } = useToast();

  const [confirmResetOpen, setConfirmResetOpen] = useState(false);
  const [seeding, setSeeding] = useState(false);

  const handleResetData = () => {
    resetData();
    setConfirmResetOpen(false);
  };

  const handleSeedFirebase = async () => {
    setSeeding(true);
    try {
      await seedFirestoreDemoData();
      success('Live Firestore seeded successfully with standard Hackathon demo data!');
    } catch (err) {
      error(err.message || 'Failed to seed Firestore.');
    } finally {
      setSeeding(false);
    }
  };

  return (
    <DashboardLayout title="Settings & Demo Setup">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Hackathon Demonstration Controller */}
        <div className="bg-white rounded-2xl border border-[#E6EAF0] p-6 sm:p-8 shadow-xs">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-[#16A6A1]" />
            <h3 className="text-lg font-bold text-[#172B4D]">
              Judge Demonstration Controller
            </h3>
          </div>
          <p className="text-xs text-[#6B778C] mb-6 leading-relaxed">
            Use these controls before or during your CODE MEET 2026 presentation to reset the platform state back to the exact evaluation scenario.
          </p>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="text-xs font-bold text-[#172B4D]">
                  Reset Demo State (Campus Clean-up Drive)
                </h4>
                <p className="text-[11px] text-[#6B778C] mt-0.5">
                  Restores 1 campaign and 4 tasks: 3 assigned (Aisha, Rahul, Meera) and <strong>1 unassigned task ("Arrange Waste Collection")</strong>.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setConfirmResetOpen(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors shrink-0"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Sample Data
              </button>
            </div>
          </div>
        </div>

        {/* Database & Cloud Connection Status */}
        <div className="bg-white rounded-2xl border border-[#E6EAF0] p-6 sm:p-8 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-[#16A6A1]" />
              <h3 className="text-lg font-bold text-[#172B4D]">
                Database & Cloud Sync
              </h3>
            </div>

            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
              isFirebaseConfigured
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                : 'bg-teal-50 text-teal-800 border border-teal-300'
            }`}>
              <span className={`w-2 h-2 rounded-full ${isFirebaseConfigured ? 'bg-emerald-500 animate-pulse' : 'bg-teal-500'}`}></span>
              {isFirebaseConfigured ? 'Firebase Firestore Live' : 'Active: Local Demo Mode'}
            </span>
          </div>

          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-700">Storage Mode:</span>
                <span className="font-mono text-slate-900 font-bold">
                  {isFirebaseConfigured ? 'Firebase Cloud Firestore' : 'LocalStorage + Reactive Event Sync'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-700">Multi-tab Real-time Broadcast:</span>
                <span className="text-emerald-700 font-bold">Active (BroadcastChannel / onSnapshot)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-700">Concurrency Safety:</span>
                <span className="text-emerald-700 font-bold">Atomic Transaction Claim Protection</span>
              </div>
            </div>

            {!isFirebaseConfigured && (
              <div className="p-4 rounded-xl bg-teal-50/60 border border-teal-200 text-teal-950 space-y-2">
                <div className="flex items-center gap-2 font-bold text-xs text-[#16A6A1]">
                  <Cloud className="w-4 h-4" />
                  How to Connect Live Firebase
                </div>
                <p className="text-[11px] leading-relaxed text-slate-700">
                  To connect your team's live Firebase project, copy <code>.env.example</code> to <code>.env</code> in the project root and fill in your Firebase Web App configuration keys (<code>VITE_FIREBASE_API_KEY</code>, etc.). The app will automatically connect and listen to Firestore!
                </p>
              </div>
            )}

            {isFirebaseConfigured && (
              <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-emerald-950 text-xs">
                    Seed Live Firestore with Hackathon Data
                  </h4>
                  <p className="text-[11px] text-emerald-800">
                    Populates your connected Cloud Firestore collections with the standard 4-task clean-up demo.
                  </p>
                </div>
                <button
                  onClick={handleSeedFirebase}
                  disabled={seeding}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-xs"
                >
                  {seeding ? 'Seeding...' : 'Seed Firestore'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Reset Confirmation Dialog */}
      <ConfirmDialog
        isOpen={confirmResetOpen}
        title="Reset Demo Data?"
        message="This will restore all campaigns and tasks to the initial Hackathon presentation state (Campus Clean-up Drive with 1 unassigned task). Any custom tasks created will be cleared."
        confirmLabel="Yes, Reset Data"
        type="warning"
        onConfirm={handleResetData}
        onCancel={() => setConfirmResetOpen(false)}
      />
    </DashboardLayout>
  );
};


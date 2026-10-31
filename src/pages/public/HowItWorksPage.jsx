import React from 'react';
import { PublicNavbar } from '../../components/navigation/PublicNavbar';
import { PublicFooter } from '../../components/navigation/PublicFooter';
import { Link } from 'react-router-dom';
import { 
  PlusCircle, 
  Users, 
  AlertTriangle, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight,
  Shield,
  Layers,
  Sparkles
} from 'lucide-react';

export const HowItWorksPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F9FC]">
      <PublicNavbar />

      <main className="flex-1 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#16A6A1] bg-teal-50 border border-teal-200 px-3 py-1 rounded-full">
              The RELAY Coordination Engine
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#172B4D] mt-3 tracking-tight">
              How RELAY Powers Community Movements
            </h1>
            <p className="text-base text-[#6B778C] mt-4 leading-relaxed">
              When college clubs and community organizers try to run events over chat apps, chaos is inevitable. Here is how RELAY structures participation into four dependable stages.
            </p>
          </div>

          {/* 4 Steps Detailed Breakdown */}
          <div className="space-y-12 max-w-4xl mx-auto">
            {/* Step 1 */}
            <div className="bg-white rounded-2xl border border-[#E6EAF0] p-6 sm:p-8 flex flex-col md:flex-row gap-6 items-start shadow-xs">
              <div className="w-14 h-14 rounded-2xl bg-teal-50 text-[#16A6A1] border border-teal-200 flex items-center justify-center shrink-0 text-xl font-black">
                01
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <PlusCircle className="w-5 h-5 text-[#16A6A1]" />
                  <h3 className="text-lg font-bold text-[#172B4D]">
                    Create Campaign & Define Responsibilities
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#6B778C] leading-relaxed">
                  The organizer initiates a campaign (e.g., Campus Clean-up Drive, Textbook Donation) with dates, location, and clear objective. They break down the campaign into specific, manageable tasks like procuring gloves, arranging recycling logistics, or organizing refreshments.
                </p>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
                  💡 <strong>Key Advantage:</strong> The organizer doesn't need to assign someone immediately. Unassigned tasks can be created freely.
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl border border-[#E6EAF0] p-6 sm:p-8 flex flex-col md:flex-row gap-6 items-start shadow-xs">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center shrink-0 text-xl font-black">
                02
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-bold text-[#172B4D]">
                    Volunteers Browse & Claim Available Tasks
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#6B778C] leading-relaxed">
                  Volunteers log into their dashboard and see clear listings of open initiatives. They can inspect what tasks remain available and click "Take This Task" to claim direct responsibility.
                </p>
                <div className="p-3 rounded-xl bg-blue-50/50 border border-blue-200 text-xs text-blue-800">
                  🔒 <strong>Atomic Claim Protection:</strong> Built-in concurrency checks ensure two volunteers can never claim the exact same task simultaneously.
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-[#FFFDF9] rounded-2xl border-2 border-amber-300 p-6 sm:p-8 flex flex-col md:flex-row gap-6 items-start shadow-sm ring-1 ring-amber-200">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 border border-amber-300 flex items-center justify-center shrink-0 text-xl font-black">
                03
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                  <h3 className="text-lg font-bold text-amber-950">
                    Automatic Unassigned Task Detection (The Core Differentiator)
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-amber-900 leading-relaxed font-medium">
                  RELAY automatically scans all tasks in real time. Any task with no assigned volunteer identifier is immediately surfaced on the organizer's dashboard under <strong>"Tasks That Need Attention"</strong> with a prominent alert count (e.g. "1 task needs a volunteer").
                </p>
                <div className="p-3 rounded-xl bg-amber-100/70 border border-amber-300 text-xs text-amber-950 font-semibold">
                  ⚠️ <strong>Why this matters:</strong> Organizers no longer have to manually scroll through 200 WhatsApp messages to ask "Wait, who is bringing the bags tomorrow?" Missing duties are impossible to overlook.
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white rounded-2xl border border-[#E6EAF0] p-6 sm:p-8 flex flex-col md:flex-row gap-6 items-start shadow-xs">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-[#36B37E] border border-emerald-200 flex items-center justify-center shrink-0 text-xl font-black">
                04
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-[#36B37E]" />
                  <h3 className="text-lg font-bold text-[#172B4D]">
                    Real-Time Progress & Collective Celebration
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#6B778C] leading-relaxed">
                  As volunteers complete their work, they update task status from "Pending" to "In Progress" and "Completed". The overall campaign completion percentage updates live on both organizer and volunteer screens with zero manual refreshes.
                </p>
                <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200 text-xs text-emerald-800">
                  🎉 <strong>Coordinated Impact:</strong> The entire community sees momentum building towards event day!
                </div>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-[#16A6A1] hover:bg-[#11817d] transition-all shadow-md"
            >
              Start Coordinating With RELAY
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
};


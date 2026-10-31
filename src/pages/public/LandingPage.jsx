import React from 'react';
import { Link } from 'react-router-dom';
import { PublicNavbar } from '../../components/navigation/PublicNavbar';
import { PublicFooter } from '../../components/navigation/PublicFooter';
import { 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  Users, 
  FolderKanban, 
  Layers, 
  Clock, 
  Bell, 
  ShieldCheck, 
  Sparkles, 
  MessageSquareOff, 
  ListOrdered,
  Eye,
  CheckCircle,
  HelpCircle,
  TrendingUp,
  MapPin
} from 'lucide-react';

export const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F9FC]">
      <PublicNavbar />

      <main className="flex-1">
        {/* ========================================================= */}
        {/* HERO SECTION                                             */}
        {/* ========================================================= */}
        <section className="pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              {/* Left Column: Heading & CTAs */}
              <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-[#16A6A1] text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  COMMUNITY COORDINATION MADE SIMPLE
                </div>

                {/* Main Heading */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#172B4D] tracking-tight leading-[1.12]">
                  Turn Community Participation Into{' '}
                  <span className="text-[#16A6A1] underline decoration-[#36B37E]/40 decoration-wavy">
                    Coordinated Action.
                  </span>
                </h1>

                {/* Supporting Text */}
                <p className="text-base sm:text-lg text-[#6B778C] max-w-2xl leading-relaxed">
                  Bring your volunteers, campaign tasks and progress together in one place. RELAY helps communities organize responsibilities, identify missing assignments and turn good intentions into meaningful action.
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                  <Link
                    to="/register"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-[#16A6A1] hover:bg-[#11817d] transition-all shadow-md hover:shadow-lg"
                  >
                    Get Started Free
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    to="/how-it-works"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-[#172B4D] bg-white border border-[#E6EAF0] hover:bg-slate-50 transition-colors shadow-xs"
                  >
                    Explore How It Works
                  </Link>
                </div>

                {/* Supporting Statement */}
                <p className="text-xs font-semibold uppercase tracking-wider text-[#6B778C] pt-2">
                  One shared space. Clear responsibilities. Stronger movements.
                </p>
              </div>

              {/* Right Column: Realistic RELAY Dashboard Preview Mockup */}
              <div className="lg:col-span-5 relative">
                <div className="relative mx-auto max-w-md lg:max-w-none">
                  {/* Decorative background glow */}
                  <div className="absolute -inset-2 bg-gradient-to-r from-teal-500/20 to-emerald-500/20 rounded-3xl blur-2xl -z-10 transform rotate-1"></div>

                  {/* Dashboard Preview Card */}
                  <div className="bg-white rounded-2xl border border-[#E6EAF0] shadow-xl p-5 space-y-4 font-sans text-xs">
                    {/* Mockup Header */}
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-rose-400"></div>
                        <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                        <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                        <span className="ml-2 font-bold text-[#172B4D]">RELAY Live Coordination</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold text-[10px] border border-emerald-200">
                        Campus Clean-up Drive
                      </span>
                    </div>

                    {/* Mockup KPI Stats */}
                    <div className="grid grid-cols-3 gap-2">
                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                        <p className="text-[10px] text-slate-500 font-medium">Total Tasks</p>
                        <p className="text-lg font-black text-[#172B4D]">4</p>
                      </div>
                      <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100">
                        <p className="text-[10px] text-emerald-800 font-medium">Completed</p>
                        <p className="text-lg font-black text-emerald-700">1</p>
                      </div>
                      <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 ring-1 ring-amber-300">
                        <p className="text-[10px] text-amber-800 font-bold flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3 text-amber-600 inline" />
                          Unassigned
                        </p>
                        <p className="text-lg font-black text-amber-900">1</p>
                      </div>
                    </div>

                    {/* Differentiator Alert Box */}
                    <div className="p-3 rounded-xl bg-amber-50/90 border border-amber-300 shadow-xs">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold text-amber-950 text-xs">
                            1 Task Needs Attention!
                          </p>
                          <p className="text-[11px] text-amber-800 mt-0.5">
                            "Arrange Waste Collection" has no assigned volunteer.
                          </p>
                          <div className="mt-2 flex items-center justify-between">
                            <span className="text-[10px] font-bold text-amber-900 bg-amber-200/60 px-2 py-0.5 rounded">
                              High Priority
                            </span>
                            <span className="text-[10px] font-bold text-[#16A6A1] underline">
                              Assign Volunteer →
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Mockup Task List Items */}
                    <div className="space-y-2 pt-1">
                      <div className="p-2.5 rounded-xl bg-slate-50/80 border border-slate-100 flex items-center justify-between">
                        <div>
                          <p className="font-bold text-[#172B4D]">Arrange Cleaning Materials</p>
                          <p className="text-[10px] text-slate-500">Assigned: Aisha</p>
                        </div>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold text-[10px]">
                          Completed
                        </span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-slate-50/80 border border-slate-100 flex items-center justify-between">
                        <div>
                          <p className="font-bold text-[#172B4D]">Recruit Participants</p>
                          <p className="text-[10px] text-slate-500">Assigned: Rahul</p>
                        </div>
                        <span className="px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 font-semibold text-[10px]">
                          In Progress
                        </span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-[#6B778C]">
                      <span>Real-time cloud synchronization</span>
                      <span className="text-[#16A6A1] font-bold">100% Transparent</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* PROBLEM SECTION                                          */}
        {/* ========================================================= */}
        <section className="py-20 bg-white border-y border-[#E6EAF0]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 border border-rose-200 px-3 py-1 rounded-full">
                The Core Challenge
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#172B4D] mt-3 tracking-tight">
                Volunteers Are Ready. But Is the Work Organized?
              </h2>
              <p className="text-base text-[#6B778C] mt-3 leading-relaxed">
                Community initiatives often depend on scattered messages and manual follow-ups. Important responsibilities can disappear in the noise. The issue isn't enthusiasm — it's coordination.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Problem 1 */}
              <div className="p-6 rounded-2xl border border-slate-200/80 bg-[#F7F9FC] hover:border-slate-300 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center mb-4">
                  <MessageSquareOff className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-[#172B4D] mb-2">
                  Scattered Updates
                </h3>
                <p className="text-xs text-[#6B778C] leading-relaxed">
                  Important updates, equipment lists, and arrival times get buried in endless WhatsApp and Discord group conversations.
                </p>
              </div>

              {/* Problem 2 */}
              <div className="p-6 rounded-2xl border border-amber-200 bg-amber-50/30 hover:border-amber-300 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 border border-amber-300 flex items-center justify-center mb-4">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-[#172B4D] mb-2">
                  Missing Responsibilities
                </h3>
                <p className="text-xs text-[#6B778C] leading-relaxed">
                  Crucial tasks remain without anyone taking ownership, only discovered on event day when it's already too late.
                </p>
              </div>

              {/* Problem 3 */}
              <div className="p-6 rounded-2xl border border-slate-200/80 bg-[#F7F9FC] hover:border-slate-300 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-[#172B4D] mb-2">
                  Unclear Progress
                </h3>
                <p className="text-xs text-[#6B778C] leading-relaxed">
                  Organizers struggle to identify what is completed, ongoing, or pending, leading to repeated inquiries and confusion.
                </p>
              </div>

              {/* Problem 4 */}
              <div className="p-6 rounded-2xl border border-slate-200/80 bg-[#F7F9FC] hover:border-slate-300 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 border border-slate-200 flex items-center justify-center mb-4">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-[#172B4D] mb-2">
                  Manual Follow-ups
                </h3>
                <p className="text-xs text-[#6B778C] leading-relaxed">
                  Coordinating dozens of enthusiastic volunteers becomes an exhausting cycle of personal calls and spreadsheet cross-checking.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SOLUTION SECTION                                         */}
        {/* ========================================================= */}
        <section className="py-20 bg-[#F7F9FC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-wider text-[#16A6A1] bg-teal-50 border border-teal-200 px-3 py-1 rounded-full">
                The RELAY Solution
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#172B4D] mt-3 tracking-tight">
                One Platform. Everyone Connected.
              </h2>
              <p className="text-base text-[#6B778C] mt-3 leading-relaxed">
                RELAY brings campaigns, tasks, volunteers and progress into one shared workspace where every responsibility has transparent ownership.
              </p>
            </div>

            {/* Visual Connected Architecture */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
              <div className="bg-white p-5 rounded-2xl border border-[#E6EAF0] text-center shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-[#172B4D] flex items-center justify-center mx-auto mb-3 font-bold">
                  01
                </div>
                <h4 className="font-bold text-sm text-[#172B4D]">Organizers</h4>
                <p className="text-[11px] text-[#6B778C] mt-1">Create goals & delegate initiatives</p>
              </div>

              <div className="hidden md:flex justify-center text-[#16A6A1]">
                <ArrowRight className="w-6 h-6" />
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#E6EAF0] text-center shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#16A6A1] flex items-center justify-center mx-auto mb-3 font-bold">
                  02
                </div>
                <h4 className="font-bold text-sm text-[#172B4D]">Campaigns</h4>
                <p className="text-[11px] text-[#6B778C] mt-1">Clean-up drives, donations, relief</p>
              </div>

              <div className="hidden md:flex justify-center text-[#16A6A1]">
                <ArrowRight className="w-6 h-6" />
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#E6EAF0] text-center shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#36B37E] flex items-center justify-center mx-auto mb-3 font-bold">
                  03
                </div>
                <h4 className="font-bold text-sm text-[#172B4D]">Volunteers</h4>
                <p className="text-[11px] text-[#6B778C] mt-1">Claim tasks & update status live</p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* HOW IT WORKS SECTION                                     */}
        {/* ========================================================= */}
        <section id="how-it-works" className="py-20 bg-white border-y border-[#E6EAF0]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-wider text-[#16A6A1] bg-teal-50 border border-teal-200 px-3 py-1 rounded-full">
                Simple Workflow
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#172B4D] mt-3 tracking-tight">
                From Participation to Action in Four Simple Steps
              </h2>
              <p className="text-base text-[#6B778C] mt-3 leading-relaxed">
                A seamless coordination cycle designed specifically for campus clubs, student initiatives, and community organizations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Step 1 */}
              <div className="relative p-6 rounded-2xl border border-[#E6EAF0] bg-[#F7F9FC]">
                <span className="text-3xl font-black text-[#16A6A1]/40 mb-3 block">01</span>
                <h3 className="text-base font-bold text-[#172B4D] mb-2">Create a Campaign</h3>
                <p className="text-xs text-[#6B778C] leading-relaxed">
                  Organizers create an initiative and add the responsibilities that need to be completed with target due dates.
                </p>
              </div>

              {/* Step 2 */}
              <div className="relative p-6 rounded-2xl border border-[#E6EAF0] bg-[#F7F9FC]">
                <span className="text-3xl font-black text-[#16A6A1]/40 mb-3 block">02</span>
                <h3 className="text-base font-bold text-[#172B4D] mb-2">Coordinate Volunteers</h3>
                <p className="text-xs text-[#6B778C] leading-relaxed">
                  Volunteers browse available tasks across active campaigns and choose where their skills can best contribute.
                </p>
              </div>

              {/* Step 3 */}
              <div className="relative p-6 rounded-2xl border border-amber-300 bg-amber-50/40 ring-1 ring-amber-200">
                <span className="text-3xl font-black text-amber-500/60 mb-3 block">03</span>
                <h3 className="text-base font-bold text-amber-950 mb-2 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600 inline" />
                  Identify Missing Tasks
                </h3>
                <p className="text-xs text-amber-900 leading-relaxed font-medium">
                  RELAY automatically highlights tasks without assigned volunteers so organizers can address gaps before event day.
                </p>
              </div>

              {/* Step 4 */}
              <div className="relative p-6 rounded-2xl border border-[#E6EAF0] bg-[#F7F9FC]">
                <span className="text-3xl font-black text-[#36B37E]/40 mb-3 block">04</span>
                <h3 className="text-base font-bold text-[#172B4D] mb-2">Track Progress</h3>
                <p className="text-xs text-[#6B778C] leading-relaxed">
                  Everyone can see which tasks are pending, ongoing and completed in real time without endless status checks.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* THE CORE DIFFERENTIATOR SECTION                           */}
        {/* ========================================================= */}
        <section className="py-20 bg-gradient-to-b from-white via-slate-50 to-[#F7F9FC] border-b border-[#E6EAF0]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 border border-amber-300 px-3 py-1 rounded-full">
                The RELAY Differentiator
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#172B4D] mt-3 tracking-tight">
                Don't Just Track Tasks. Identify What's Missing.
              </h2>
              <p className="text-base text-[#6B778C] mt-3 leading-relaxed">
                Most platforms wait for you to search for unassigned work. RELAY proactively surfaces missing ownership so no responsibility slips through the cracks.
              </p>
            </div>

            {/* Side-by-Side Comparison */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              {/* Typical Group Chat Box */}
              <div className="p-8 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-5">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2 text-slate-500 font-bold text-sm">
                    <MessageSquareOff className="w-5 h-5 text-slate-400" />
                    <span>Typical Group Chat / Spreadsheets</span>
                  </div>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold">
                    Fragmented
                  </span>
                </div>

                <ul className="space-y-4 text-xs text-[#6B778C]">
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 mt-0.5 font-bold">✕</span>
                    <span><strong>Tasks and updates mix together:</strong> Messages scroll by in seconds; critical logistical announcements are lost.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 mt-0.5 font-bold">✕</span>
                    <span><strong>Ownership is difficult to identify:</strong> No single person knows who is actually responsible for picking up materials or arranging transport.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 mt-0.5 font-bold">✕</span>
                    <span><strong>Missing assignments are overlooked:</strong> Unassigned responsibilities stay hidden until the morning of the drive.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 mt-0.5 font-bold">✕</span>
                    <span><strong>Progress requires manual follow-up:</strong> Organizers must personally message every volunteer to check completion.</span>
                  </li>
                </ul>
              </div>

              {/* RELAY Coordinated Box */}
              <div className="p-8 rounded-2xl border-2 border-[#16A6A1] bg-teal-50/20 shadow-md space-y-5 relative">
                <div className="absolute -top-3 right-6 bg-[#16A6A1] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-xs">
                  The RELAY Standard
                </div>

                <div className="flex items-center justify-between pb-4 border-b border-teal-100">
                  <div className="flex items-center gap-2 text-[#172B4D] font-bold text-sm">
                    <Sparkles className="w-5 h-5 text-[#16A6A1]" />
                    <span>RELAY Coordinated Workspace</span>
                  </div>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-teal-100 text-[#16A6A1] font-bold">
                    Active Coordination
                  </span>
                </div>

                <ul className="space-y-4 text-xs text-[#172B4D]">
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold">✓</span>
                    <span><strong>Tasks are organized in one place:</strong> Clear categorization by campaign, due date, and urgency.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold">✓</span>
                    <span><strong>Responsibilities are visible:</strong> Volunteers have designated task ownership with single-click progress reporting.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 mt-0.5 font-bold">!</span>
                    <span><strong className="text-amber-900">Unassigned tasks automatically highlighted:</strong> The system immediately flags zero-volunteer tasks on organizer screens.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold">✓</span>
                    <span><strong>Progress is visible to everyone:</strong> Real-time completion bars and status feeds keep the whole team motivated.</span>
                  </li>
                </ul>

                <div className="pt-3 border-t border-teal-200/60 text-xs font-semibold text-[#16A6A1]">
                  "RELAY doesn't replace volunteers; it helps them work together more effectively."
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* FEATURES SECTION                                         */}
        {/* ========================================================= */}
        <section className="py-20 bg-white border-b border-[#E6EAF0]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-wider text-[#16A6A1] bg-teal-50 border border-teal-200 px-3 py-1 rounded-full">
                Platform Capabilities
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#172B4D] mt-3 tracking-tight">
                Everything Your Campaign Needs to Stay Organized
              </h2>
              <p className="text-base text-[#6B778C] mt-3 leading-relaxed">
                Purpose-built tools focusing on what truly matters for successful community mobilization.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl border border-[#E6EAF0] bg-white hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#16A6A1] flex items-center justify-center mb-4">
                  <FolderKanban className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-[#172B4D] mb-1.5">Centralized Campaign Management</h4>
                <p className="text-xs text-[#6B778C] leading-relaxed">
                  Create initiatives with target schedules, location pins, category tags, and multi-volunteer roles.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-[#E6EAF0] bg-white hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#36B37E] flex items-center justify-center mb-4">
                  <Users className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-[#172B4D] mb-1.5">Simple Volunteer Assignment</h4>
                <p className="text-xs text-[#6B778C] leading-relaxed">
                  Assign tasks to registered volunteers with workload transparency to prevent burnout.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-amber-300 bg-amber-50/20 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-amber-950 mb-1.5">Automatic Unassigned Task Detection</h4>
                <p className="text-xs text-amber-900 leading-relaxed">
                  Real-time detection engine flags tasks missing an owner before work gets forgotten.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-[#E6EAF0] bg-white hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-[#172B4D] mb-1.5">Real-Time Progress Tracking</h4>
                <p className="text-xs text-[#6B778C] leading-relaxed">
                  Dynamic completion percentage bars update instantly as volunteers toggle task status.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-[#E6EAF0] bg-white hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-[#172B4D] flex items-center justify-center mb-4">
                  <Layers className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-[#172B4D] mb-1.5">Shared Campaign Dashboard</h4>
                <p className="text-xs text-[#6B778C] leading-relaxed">
                  Clean views customized for organizers and volunteers with relevant data and zero distractions.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-[#E6EAF0] bg-white hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-[#172B4D] mb-1.5">Clear Responsibility Management</h4>
                <p className="text-xs text-[#6B778C] leading-relaxed">
                  Volunteers take pride in owned deliverables, knowing their work directly moves the campaign forward.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* FINAL CTA                                                */}
        {/* ========================================================= */}
        <section className="py-20 bg-[#172B4D] text-white text-center relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative z-10">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-[#36B37E] border border-white/20">
              Ready for Action
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              Every Movement Needs Coordination.{' '}
              <span className="text-[#16A6A1]">Start Yours With RELAY.</span>
            </h2>
            <p className="text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Bring your community together and make every responsibility visible. Experience how effortless volunteer coordination can be.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/register"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm text-[#172B4D] bg-white hover:bg-slate-100 transition-all shadow-lg"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all"
              >
                Open Demo Account
              </Link>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
};


import React from 'react';
import { PublicNavbar } from '../../components/navigation/PublicNavbar';
import { PublicFooter } from '../../components/navigation/PublicFooter';
import { 
  Users, 
  Award, 
  GraduationCap, 
  ShieldCheck, 
  HeartHandshake, 
  Lightbulb, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';

export const AboutPage = () => {
  const teamMembers = [
    {
      name: 'Vandana C',
      role: 'Team Lead & Full-Stack Architect',
      institution: 'Yenepoya Institute of Technology',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    },
    {
      name: 'Muhammed Hisham',
      role: 'System Designer & Backend Specialist',
      institution: 'Yenepoya Institute of Technology',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    },
    {
      name: 'Sidharth Ullasan',
      role: 'Frontend Engineer & UX Designer',
      institution: 'Yenepoya Institute of Technology',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    },
    {
      name: 'Mohammed Hansh',
      role: 'Product Strategist & Workflow Specialist',
      institution: 'Yenepoya Institute of Technology',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F9FC]">
      <PublicNavbar />

      <main className="flex-1 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-[#16A6A1] bg-teal-50 border border-teal-200 px-3 py-1 rounded-full">
              Team CONVERGE · CODE MEET 2026
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#172B4D] mt-3 tracking-tight">
              About RELAY & Our Mission
            </h1>
            <p className="text-base text-[#6B778C] mt-4 leading-relaxed">
              Built with purpose for Problem Statement 03 — THE MOVEMENT. Turning good community intentions into organized, measurable impact.
            </p>
          </div>

          {/* Hackathon & Problem Statement Context */}
          <div className="bg-white rounded-3xl border border-[#E6EAF0] p-8 md:p-12 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 text-[#16A6A1] border border-teal-200 flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#172B4D]">CODE MEET 2026</h3>
              <p className="text-xs text-[#6B778C] leading-relaxed">
                Hackathon initiative challenging teams to engineer high-impact technological solutions for real community obstacles.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#172B4D]">Problem Statement 03: THE MOVEMENT</h3>
              <p className="text-xs text-[#6B778C] leading-relaxed">
                Addressing the critical coordination gap where campus clubs, student volunteers, and NGOs struggle to coordinate campaigns over fragmented messaging threads.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 border border-purple-200 flex items-center justify-center">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#172B4D]">Yenepoya Institute of Technology</h3>
              <p className="text-xs text-[#6B778C] leading-relaxed">
                Proudly engineered by students representing Yenepoya Institute of Technology, Mangalore, Karnataka.
              </p>
            </div>
          </div>

          {/* The Product Philosophy */}
          <div className="bg-[#172B4D] text-white rounded-3xl p-8 md:p-12 shadow-xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#36B37E] text-xs font-bold uppercase tracking-wider">
              <Lightbulb className="w-4 h-4" />
              The Product Philosophy
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              "The actual problem is not a lack of volunteers. It is the lack of coordination between them."
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
              RELAY is not trying to solve every problem faced by community movements. It solves one vital problem: people want to help, but responsibilities and progress are often poorly coordinated. RELAY makes the next required action clearer by bringing information together, giving tasks clear ownership, making missing assignments visible, and helping organizers and volunteers work together.
            </p>
          </div>

          {/* Team Members */}
          <div className="space-y-8">
            <div className="text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-[#6B778C]">
                The Builders
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172B4D] mt-1">
                Meet Team CONVERGE
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member) => (
                <div 
                  key={member.name}
                  className="bg-white rounded-2xl border border-[#E6EAF0] p-6 text-center hover:shadow-md transition-shadow"
                >
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-20 h-20 rounded-full mx-auto mb-4 object-cover ring-4 ring-teal-50"
                  />
                  <h3 className="text-base font-bold text-[#172B4D] mb-1">
                    {member.name}
                  </h3>
                  <p className="text-xs font-semibold text-[#16A6A1] mb-2">
                    {member.role}
                  </p>
                  <p className="text-[11px] text-[#6B778C]">
                    {member.institution}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
};


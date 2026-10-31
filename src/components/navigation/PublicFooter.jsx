import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../common/Logo';
import { Shield, Sparkles, Heart } from 'lucide-react';

export const PublicFooter = () => {
  return (
    <footer className="bg-white border-t border-[#E6EAF0] pt-14 pb-10 text-[#6B778C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-100">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Logo size="md" showTagline={true} />
            <p className="text-sm leading-relaxed max-w-md text-[#6B778C]">
              RELAY is a centralized community volunteer and campaign coordination platform. We help college clubs, student volunteers, and NGOs turn good intentions into coordinated impact by making missing responsibilities instantly visible.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-md bg-teal-50 text-[#16A6A1] border border-teal-200">
                <Sparkles className="w-3.5 h-3.5 mr-1" />
                CODE MEET 2026
              </span>
              <span className="inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 text-[#172B4D] border border-slate-200">
                <Shield className="w-3.5 h-3.5 mr-1 text-[#36B37E]" />
                Problem Statement 03 — THE MOVEMENT
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#172B4D] mb-4">
              Platform
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-[#16A6A1] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="hover:text-[#16A6A1] transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#16A6A1] transition-colors">
                  About Team CONVERGE
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-[#16A6A1] transition-colors">
                  Organizer & Volunteer Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-[#16A6A1] transition-colors">
                  Join Movement (Register)
                </Link>
              </li>
            </ul>
          </div>

          {/* Team and Institution */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#172B4D] mb-4">
              Team CONVERGE
            </h4>
            <p className="text-xs font-semibold text-[#172B4D] mb-1">
              Yenepoya Institute of Technology
            </p>
            <p className="text-xs text-[#6B778C] mb-3">
              Mangalore, Karnataka
            </p>
            <div className="text-xs space-y-1 text-slate-500">
              <p>• Vandana C (Lead)</p>
              <p>• Muhammed Hisham</p>
              <p>• Sidharth Ullasan</p>
              <p>• Mohammed Hansh</p>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#6B778C] gap-4">
          <p>
            © 2026 RELAY · Team CONVERGE · Yenepoya Institute of Technology. Built for CODE MEET 2026.
          </p>
          <p className="flex items-center gap-1 font-medium text-slate-700">
            Turning Community Participation into Coordinated Action.
          </p>
        </div>
      </div>
    </footer>
  );
};


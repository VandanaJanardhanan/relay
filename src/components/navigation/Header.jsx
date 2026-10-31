import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Bell, 
  Menu, 
  User, 
  LogOut, 
  Shield, 
  Sparkles, 
  Repeat, 
  Database,
  CheckCircle2,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';

export const Header = ({ title, onMenuClick }) => {
  const { currentUser, role, logout, quickSwitch, isFirebaseConfigured } = useAuth();
  const { unassignedCount, resetData } = useData();
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const navigate = useNavigate();

  const handleRoleToggle = () => {
    if (role === 'organizer') {
      quickSwitch('volunteer');
      navigate('/volunteer/dashboard');
    } else {
      quickSwitch('organizer');
      navigate('/organizer/dashboard');
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className="h-18 bg-white border-b border-[#E6EAF0] px-4 sm:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-30">
      {/* Left: Mobile trigger & Page Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-[#172B4D] tracking-tight">
            {title}
          </h1>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Connection status badge */}
        <div 
          className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border bg-slate-50 text-slate-700 border-slate-200"
          title={isFirebaseConfigured ? "Connected to Cloud Firestore" : "Running in Local Demo Mode with state sync"}
        >
          <span className={`w-2 h-2 rounded-full ${isFirebaseConfigured ? 'bg-emerald-500 animate-pulse' : 'bg-teal-500'}`}></span>
          <span>{isFirebaseConfigured ? 'Firebase Cloud' : 'Local Demo Mode'}</span>
        </div>

        {/* Quick Judge Role Switcher (Crucial for Demo Workflow!) */}
        <button
          onClick={handleRoleToggle}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-teal-50 text-[#16A6A1] border border-teal-200 hover:bg-teal-100/80 transition-all shadow-xs"
          title="Switch role between Organizer and Volunteer for live judge demonstration"
        >
          <Repeat className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Switch to:</span>
          <span className="font-bold underline">
            {role === 'organizer' ? 'Volunteer' : 'Organizer'}
          </span>
        </button>

        {/* Quick Reset Demo button */}
        <button
          onClick={() => {
            if (window.confirm("Reset demo data to initial Campus Clean-up Drive state?")) {
              resetData();
            }
          }}
          className="hidden md:inline-flex items-center gap-1 p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors text-xs font-medium"
          title="Reset sample data for a fresh judge demonstration"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        {/* Notifications trigger */}
        <div className="relative">
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unassignedCount > 0 && role === 'organizer' && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white"></span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {notifOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-[#E6EAF0] py-2 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#172B4D]">
                  System Notifications
                </span>
                <span className="text-[11px] text-[#6B778C]">Live</span>
              </div>

              <div className="max-h-64 overflow-y-auto divide-y divide-slate-100">
                {role === 'organizer' && unassignedCount > 0 ? (
                  <div className="p-3 bg-amber-50/50 hover:bg-amber-50 transition-colors">
                    <div className="flex gap-2.5">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-semibold text-amber-900">
                          {unassignedCount} {unassignedCount === 1 ? 'task needs' : 'tasks need'} a volunteer
                        </p>
                        <p className="text-[11px] text-amber-700 mt-0.5">
                          Missing responsibilities detected. Assign volunteers before campaign day.
                        </p>
                        <Link
                          to="/organizer/unassigned"
                          onClick={() => setNotifOpen(false)}
                          className="inline-block mt-1 text-[11px] font-bold text-[#16A6A1] hover:underline"
                        >
                          View unassigned tasks →
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : null}

                <div className="p-3 hover:bg-slate-50 transition-colors">
                  <div className="flex gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-[#172B4D]">
                        RELAY Platform Ready
                      </p>
                      <p className="text-[11px] text-[#6B778C] mt-0.5">
                        Coordinated action engine active for CODE MEET 2026.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User profile avatar dropdown */}
        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-[#172B4D] text-white flex items-center justify-center font-bold text-xs ring-2 ring-slate-100">
              {currentUser?.fullName?.charAt(0) || 'U'}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-xs font-bold text-[#172B4D] leading-tight">
                {currentUser?.fullName || 'User'}
              </p>
              <p className="text-[10px] text-[#6B778C] capitalize">
                {role}
              </p>
            </div>
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-[#E6EAF0] py-2 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="px-4 py-2 border-b border-slate-100">
                <p className="text-xs font-bold text-[#172B4D]">{currentUser?.fullName}</p>
                <p className="text-[11px] text-[#6B778C] truncate">{currentUser?.email}</p>
                <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-teal-50 text-[#16A6A1]">
                  {role} Account
                </span>
              </div>

              <Link
                to={role === 'organizer' ? '/organizer/profile' : '/volunteer/profile'}
                onClick={() => setProfileOpen(false)}
                className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
              >
                <User className="w-3.5 h-3.5" />
                Profile
              </Link>

              <Link
                to={role === 'organizer' ? '/organizer/settings' : '/volunteer/settings'}
                onClick={() => setProfileOpen(false)}
                className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
              >
                <Database className="w-3.5 h-3.5" />
                Settings & Database
              </Link>

              <div className="border-t border-slate-100 my-1"></div>

              <button
                onClick={handleLogout}
                className="w-full text-left flex items-center gap-2 px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50"
              >
                <LogOut className="w-3.5 h-3.5" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};


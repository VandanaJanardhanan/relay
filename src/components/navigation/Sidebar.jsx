import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Logo } from '../common/Logo';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { 
  LayoutDashboard, 
  FolderKanban, 
  PlusCircle, 
  CheckSquare, 
  AlertTriangle, 
  Users, 
  Settings, 
  LogOut, 
  Compass, 
  ListTodo, 
  UserCircle 
} from 'lucide-react';

export const Sidebar = ({ isMobile = false, onCloseMobile }) => {
  const { currentUser, role, logout } = useAuth();
  const { unassignedCount, availableTasks, myTasks } = useData();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const organizerLinks = [
    { label: 'Overview', to: '/organizer/dashboard', icon: LayoutDashboard },
    { label: 'My Campaigns', to: '/organizer/campaigns', icon: FolderKanban },
    { label: 'Create Campaign', to: '/organizer/campaigns/new', icon: PlusCircle },
    { label: 'All Tasks', to: '/organizer/tasks', icon: CheckSquare },
    { 
      label: 'Unassigned Tasks', 
      to: '/organizer/unassigned', 
      icon: AlertTriangle, 
      badge: unassignedCount > 0 ? unassignedCount : null,
      badgeColor: 'bg-amber-100 text-amber-900 border border-amber-300 font-bold',
      isAttention: unassignedCount > 0
    },
    { label: 'Volunteers', to: '/organizer/volunteers', icon: Users },
    { label: 'Profile', to: '/organizer/profile', icon: UserCircle },
    { label: 'Settings & Demo', to: '/organizer/settings', icon: Settings },
  ];

  const volunteerLinks = [
    { label: 'Overview', to: '/volunteer/dashboard', icon: LayoutDashboard },
    { label: 'Explore Campaigns', to: '/volunteer/campaigns', icon: Compass },
    { 
      label: 'Available Tasks', 
      to: '/volunteer/available-tasks', 
      icon: AlertTriangle,
      badge: availableTasks.length > 0 ? availableTasks.length : null,
      badgeColor: 'bg-teal-50 text-teal-800 border border-teal-300 font-bold'
    },
    { 
      label: 'My Tasks', 
      to: '/volunteer/my-tasks', 
      icon: ListTodo,
      badge: myTasks.length > 0 ? myTasks.length : null,
      badgeColor: 'bg-slate-100 text-slate-700'
    },
    { label: 'My Profile', to: '/volunteer/profile', icon: UserCircle },
    { label: 'Settings', to: '/volunteer/settings', icon: Settings },
  ];

  const links = role === 'organizer' ? organizerLinks : volunteerLinks;

  return (
    <aside className="w-64 bg-white border-r border-[#E6EAF0] flex flex-col h-full select-none">
      {/* Brand */}
      <div className="h-18 px-6 flex items-center border-b border-[#E6EAF0]">
        <Logo size="md" showTagline={true} to={role === 'organizer' ? '/organizer/dashboard' : '/volunteer/dashboard'} />
      </div>

      {/* Role Indicator Banner */}
      <div className="px-6 py-3 bg-[#F7F9FC] border-b border-[#E6EAF0] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${role === 'organizer' ? 'bg-[#172B4D]' : 'bg-[#16A6A1]'}`}></span>
          <span className="text-xs font-bold uppercase tracking-wider text-[#6B778C]">
            {role === 'organizer' ? 'Organizer Mode' : 'Volunteer Mode'}
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
        {links.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={isMobile ? onCloseMobile : undefined}
            end={item.to === '/organizer/dashboard' || item.to === '/volunteer/dashboard'}
            className={({ isActive }) =>
              `flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                isActive
                  ? 'bg-teal-50/80 text-[#16A6A1] font-semibold shadow-xs'
                  : 'text-[#6B778C] hover:text-[#172B4D] hover:bg-slate-50'
              } ${item.isAttention ? 'border border-amber-200/80 bg-amber-50/30' : ''}`
            }
          >
            <div className="flex items-center gap-3">
              <item.icon className={`w-4 h-4 shrink-0 ${item.isAttention ? 'text-amber-600' : ''}`} />
              <span>{item.label}</span>
            </div>
            {item.badge !== null && item.badge !== undefined && (
              <span className={`text-xs px-2 py-0.5 rounded-full ${item.badgeColor}`}>
                {item.badge}
              </span>
            )}
          </NavLink>
        ))}
      </div>

      {/* User info and Logout Footer */}
      <div className="p-4 border-t border-[#E6EAF0] bg-slate-50/50">
        <div className="flex items-center gap-3 mb-3 px-2">
          <div className="w-9 h-9 rounded-full bg-[#172B4D] text-white flex items-center justify-center font-bold text-sm shrink-0">
            {currentUser?.fullName?.charAt(0) || 'U'}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-semibold text-[#172B4D] truncate">
              {currentUser?.fullName || 'User'}
            </p>
            <p className="text-xs text-[#6B778C] truncate">
              {currentUser?.email || ''}
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold text-rose-700 bg-rose-50/80 hover:bg-rose-100 rounded-lg transition-colors border border-rose-200"
        >
          <LogOut className="w-3.5 h-3.5" />
          Sign Out
        </button>
      </div>
    </aside>
  );
};


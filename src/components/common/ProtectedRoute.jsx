import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ShieldAlert } from 'lucide-react';

export const ProtectedRoute = ({ children, allowedRole }) => {
  const { currentUser, role, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F9FC]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-3 border-[#16A6A1] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xs font-semibold text-[#6B778C]">Verifying access...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRole && role !== allowedRole) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-[#F7F9FC]">
        <div className="bg-white rounded-2xl border border-rose-200 p-8 max-w-md w-full text-center shadow-lg">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center mx-auto mb-4">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-[#172B4D] mb-2">Access Denied</h2>
          <p className="text-xs text-[#6B778C] mb-6">
            This section is restricted to <strong>{allowedRole}s</strong>. Your current role is <strong>{role}</strong>.
          </p>
          <Navigate 
            to={role === 'organizer' ? '/organizer/dashboard' : '/volunteer/dashboard'} 
            replace 
          />
        </div>
      </div>
    );
  }

  return children;
};


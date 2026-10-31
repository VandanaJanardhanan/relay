import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { isFirebaseConfigured } from '../services/firebase';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = authService.subscribe((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, []);

  const login = async (email, password) => {
    const user = await authService.login(email, password);
    setCurrentUser(user);
    return user;
  };

  const register = async (data) => {
    const user = await authService.register(data);
    setCurrentUser(user);
    return user;
  };

  const logout = async () => {
    await authService.logout();
    setCurrentUser(null);
  };

  // Quick switch for live hackathon judge demonstrations
  const quickSwitch = (role) => {
    const user = authService.quickSwitchUser(role);
    setCurrentUser(user);
    return user;
  };

  const value = {
    currentUser,
    role: currentUser?.role || null,
    isOrganizer: currentUser?.role === 'organizer',
    isVolunteer: currentUser?.role === 'volunteer',
    loading,
    login,
    register,
    logout,
    quickSwitch,
    isFirebaseConfigured,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};


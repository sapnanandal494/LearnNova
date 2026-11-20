import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../api/api';

const defaultDemoUser = {
  id: "usr_elena_01",
  name: "Elena Vance",
  email: "elena.vance@learnnova.edu",
  role: "student",
  avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuA5O-qBknxwo4PYLNoJ8nze2vQgb2jjqsDgoNQIv2loDyg1yr-GP5SJOggO3BqBB2ud5OnTqpFxC18qEykpx-lUAgEhySRnB3t9dFkL5ASKxJyAWq-HWQJfmm9_ERrhffVGq6hDFyGtbS8SxrTdpWz05qz2xc2EgacPymmJ6JwXoXU7-pXak1Rn9MDG3lD25PpZmLsaQaCugTOnOU50Pvbvc3b5zzElYk2XYQjPJXA",
  degreeTrack: "Dual Degree Track: Artificial Intelligence & Neuroscience",
  term: "Fall 2024 • Term 2",
  academicSession: "Academic Session 2024-2025",
  streakDays: 6,
  weeklyGoalHours: 20,
  loggedHours: 15.6,
  averageScore: 91.5,
  gpa: 3.88,
  attendanceRate: 92.4,
  enrolledCourses: ["CS-402", "CS-501", "MATH-304", "NEUR-410", "ENG-210", "DS-301"]
};

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('learnnova_user');
    return saved ? JSON.parse(saved) : defaultDemoUser;
  });
  const [token, setToken] = useState(() => localStorage.getItem('learnnova_token') || 'demo_token_elena');
  const [authModal, setAuthModal] = useState({ isOpen: false, mode: 'student-login' });

  useEffect(() => {
    if (user) {
      localStorage.setItem('learnnova_user', JSON.stringify(user));
    }
  }, [user]);

  const login = async (email, password, role = 'student') => {
    try {
      const res = await authService.login({ email, password, role });
      if (res && res.success) {
        setUser(res.user);
        setToken(res.token);
        localStorage.setItem('learnnova_token', res.token);
        localStorage.setItem('learnnova_user', JSON.stringify(res.user));
        return { success: true };
      }
    } catch (err) {
      console.warn('Backend login fallback to mock demo user:', err);
      // Fallback demo user
      const demo = { ...defaultDemoUser, role: role || 'student', email: email || defaultDemoUser.email };
      setUser(demo);
      setToken('demo_token');
      localStorage.setItem('learnnova_user', JSON.stringify(demo));
      return { success: true };
    }
  };

  const register = async (userData) => {
    try {
      const res = await authService.register(userData);
      if (res && res.success) {
        setUser(res.user);
        setToken(res.token);
        localStorage.setItem('learnnova_token', res.token);
        localStorage.setItem('learnnova_user', JSON.stringify(res.user));
        return { success: true };
      }
    } catch (err) {
      console.warn('Backend register fallback:', err);
      const newUser = { ...defaultDemoUser, ...userData, id: `usr_${Date.now()}` };
      setUser(newUser);
      setToken('demo_token');
      return { success: true };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('learnnova_token');
    localStorage.removeItem('learnnova_user');
  };

  const openAuthModal = (mode = 'student-login') => {
    setAuthModal({ isOpen: true, mode });
  };

  const closeAuthModal = () => {
    setAuthModal({ isOpen: false, mode: 'student-login' });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout,
        authModal,
        openAuthModal,
        closeAuthModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

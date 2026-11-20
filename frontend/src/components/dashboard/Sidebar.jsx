import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const mainModules = [
    { name: 'Dashboard', path: '/dashboard', icon: 'grid_view' },
    { name: 'My Courses', path: '/dashboard/courses', icon: 'auto_stories' },
    { name: 'Subjects', path: '/courses', icon: 'category' },
    { name: 'Daily Lectures', path: '/dashboard/lectures', icon: 'play_lesson' },
    { name: 'Study Materials', path: '/dashboard/materials', icon: 'folder_open' },
    { name: 'Notes', path: '/dashboard/materials?view=notes', icon: 'edit_note' },
    { name: 'Assignments', path: '/dashboard/assignments', icon: 'task' },
    { name: 'Quizzes & Tests', path: '/dashboard/quizzes', icon: 'quiz' },
    { name: 'Attendance', path: '/dashboard/attendance', icon: 'fact_check' },
    { name: 'Timetable', path: '/dashboard/timetable', icon: 'calendar_month' },
    { name: 'Progress & Analytics', path: '/dashboard/analytics', icon: 'analytics' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-50 flex flex-col justify-between overflow-hidden border-r border-slate-200/80">
      
      {/* Top Branding & Nav List */}
      <div className="flex flex-col flex-1 overflow-y-auto px-4 pt-6 pb-4">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 px-2 pb-6 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary to-tertiary flex items-center justify-center text-white shadow-md">
            <span className="material-symbols-outlined text-[22px]">school</span>
          </div>
          <div className="flex flex-col">
            <span className="font-headline-sm text-headline-sm font-bold text-on-surface tracking-tight leading-none">
              LearnNova
            </span>
            <span className="font-label-sm text-[11px] text-on-surface-variant leading-none mt-1">
              Enterprise AI Learning
            </span>
          </div>
        </Link>

        {/* Section Label: Main Modules */}
        <div className="px-2 pb-2">
          <span className="font-label-sm text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Main Modules
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-1">
          {mainModules.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === '/dashboard'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-xl font-label-md text-sm transition-all ${
                  isActive
                    ? 'bg-primary-container text-on-primary font-semibold shadow-[0_2px_8px_rgba(79,70,229,0.2)]'
                    : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface font-medium'
                }`
              }
            >
              <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
              <span>{item.name}</span>
            </NavLink>
          ))}

          {/* Section Label: Intelligence & Support */}
          <div className="my-2 pt-2 px-2">
            <span className="font-label-sm text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Intelligence & Support
            </span>
          </div>

          {/* AI Study Assistant with pill */}
          <NavLink
            to="/dashboard/ai-assistant"
            className={({ isActive }) =>
              `flex items-center justify-between px-4 py-2.5 rounded-xl font-label-md text-sm transition-all ${
                isActive
                  ? 'bg-primary-container text-on-primary font-semibold shadow-md'
                  : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
              }`
            }
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[20px] text-tertiary">neurology</span>
              <span>AI Study Assistant</span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant font-label-sm text-[11px] font-bold">
              AI
            </span>
          </NavLink>

          {/* Expert Sessions */}
          <NavLink
            to="/expert-lectures"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-xl font-label-md text-sm transition-all ${
                isActive
                  ? 'bg-primary-container text-on-primary font-semibold shadow-md'
                  : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
              }`
            }
          >
            <span className="material-symbols-outlined text-[20px]">video_camera_front</span>
            <span>Expert Sessions</span>
          </NavLink>

          {/* Notifications with badge */}
          <NavLink
            to="/dashboard/notifications"
            className={({ isActive }) =>
              `flex items-center justify-between px-4 py-2.5 rounded-xl font-label-md text-sm transition-all ${
                isActive
                  ? 'bg-primary-container text-on-primary font-semibold shadow-md'
                  : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
              }`
            }
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              <span>Notifications</span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed-variant font-label-sm text-[11px] font-bold">
              3
            </span>
          </NavLink>
        </nav>
      </div>

      {/* Bottom Sticky Action Footer */}
      <div className="p-4 bg-surface-container-low border-t border-slate-200/80 flex flex-col gap-1">
        <NavLink
          to="/dashboard/settings"
          className="flex items-center gap-3 px-4 py-2 rounded-xl font-label-md text-sm text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all"
        >
          <span className="material-symbols-outlined text-[20px]">settings</span>
          <span>Settings</span>
        </NavLink>
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2 rounded-xl font-label-md text-sm text-error hover:bg-error-container hover:text-on-error-container transition-all text-left"
        >
          <span className="material-symbols-outlined text-[20px]">logout</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

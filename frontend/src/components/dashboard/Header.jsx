import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Header({ onOpenSearch }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const handleAIAsk = () => {
    navigate('/dashboard/ai-assistant');
  };

  return (
    <header className="fixed top-0 left-72 right-0 h-16 bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-6 border-b border-slate-200/80">
      
      {/* Left: Greeting & Current Term Meta */}
      <div className="flex items-center gap-4">
        <div className="flex flex-col">
          <span className="font-headline-sm text-headline-sm font-bold text-on-surface">
            Good Morning, {user?.name ? user.name.split(' ')[0] : 'Elena'}! ✨
          </span>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-[11px] font-semibold">
              {user?.term || 'Fall 2024 • Term 2'}
            </span>
            <span className="font-body-sm text-xs text-on-surface-variant hidden md:inline">
              {user?.academicSession || 'Academic Session 2024-2025'}
            </span>
          </div>
        </div>
      </div>

      {/* Right: Search, AI Ask, Notifications, Profile */}
      <div className="flex items-center gap-3 sm:gap-4">
        
        {/* Search Field with ⌘K Badge */}
        <div
          onClick={onOpenSearch}
          className="relative flex items-center cursor-pointer group"
        >
          <span className="material-symbols-outlined absolute left-3 text-[18px] text-outline">
            search
          </span>
          <input
            readOnly
            onClick={onOpenSearch}
            className="w-48 sm:w-72 h-10 pl-9 pr-12 rounded-xl bg-surface-container-low font-body-sm text-xs sm:text-sm text-on-surface placeholder:text-outline cursor-pointer group-hover:bg-surface-container transition-all"
            placeholder="Search curriculum, notes..."
            type="text"
          />
          <kbd className="hidden sm:inline-block absolute right-2.5 px-1.5 py-0.5 text-[11px] font-label-sm font-semibold text-outline rounded bg-surface-container-high border border-slate-300">
            ⌘K
          </kbd>
        </div>

        {/* AI Ask Gradient Button */}
        <button
          type="button"
          onClick={handleAIAsk}
          className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-primary to-tertiary text-on-primary font-label-md text-xs sm:text-sm font-semibold shadow-[0_2px_8px_rgba(117,49,230,0.25)] hover:opacity-95 transition-opacity"
        >
          <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
          <span className="hidden sm:inline">AI Ask</span>
        </button>

        {/* Notification Bell */}
        <div
          onClick={() => navigate('/dashboard/notifications')}
          className="relative flex items-center justify-center p-2 rounded-xl text-on-surface-variant hover:bg-surface-container hover:text-on-surface cursor-pointer transition-colors"
        >
          <span className="material-symbols-outlined text-[22px]">notifications</span>
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-error ring-2 ring-surface-container-lowest"></span>
        </div>

        {/* Profile Avatar & Dropdown */}
        <div className="relative">
          <div
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="flex items-center gap-2 pl-1 cursor-pointer group select-none"
          >
            <img
              alt="Profile"
              className="w-9 h-9 rounded-full object-cover ring-2 ring-primary-fixed shadow-sm"
              src={user?.avatar || "https://lh3.googleusercontent.com/aida-public/AB6AXuA5O-qBknxwo4PYLNoJ8nze2vQgb2jjqsDgoNQIv2loDyg1yr-GP5SJOggO3BqBB2ud5OnTqpFxC18qEykpx-lUAgEhySRnB3t9dFkL5ASKxJyAWq-HWQJfmm9_ERrhffVGq6hDFyGtbS8SxrTdpWz05qz2xc2EgacPymmJ6JwXoXU7-pXak1Rn9MDG3lD25PpZmLsaQaCugTOnOU50Pvbvc3b5zzElYk2XYQjPJXA"}
            />
            <div className="hidden xl:flex flex-col text-left leading-tight">
              <span className="font-label-md text-xs font-semibold text-on-surface group-hover:text-primary transition-colors">
                {user?.name || 'Elena Vance'}
              </span>
              <span className="font-label-sm text-[11px] text-on-surface-variant">
                {user?.role === 'teacher' ? 'Faculty Professor' : 'Computer Science Senior'}
              </span>
            </div>
            <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
              expand_more
            </span>
          </div>

          {/* Dropdown Menu */}
          {profileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-surface-container-lowest rounded-xl shadow-xl border border-slate-200 py-2 z-50 text-sm">
              <div className="px-4 py-2 border-b border-slate-100">
                <p className="text-xs font-bold text-slate-800">{user?.name || 'Elena Vance'}</p>
                <p className="text-[11px] text-slate-500 truncate">{user?.email || 'elena.vance@learnnova.edu'}</p>
                <p className="text-[10px] text-primary font-semibold mt-0.5">{user?.degreeTrack}</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setProfileDropdownOpen(false);
                  navigate('/dashboard/settings');
                }}
                className="w-full text-left px-4 py-2 text-slate-700 hover:bg-slate-50 flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">person</span>
                <span>Profile & Degree Track</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setProfileDropdownOpen(false);
                  navigate('/dashboard/analytics');
                }}
                className="w-full text-left px-4 py-2 text-slate-700 hover:bg-slate-50 flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">analytics</span>
                <span>Academic Standing</span>
              </button>
              <div className="border-t border-slate-100 my-1"></div>
              <button
                type="button"
                onClick={() => {
                  setProfileDropdownOpen(false);
                  logout();
                  navigate('/');
                }}
                className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 flex items-center gap-2 font-medium"
              >
                <span className="material-symbols-outlined text-[18px]">logout</span>
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

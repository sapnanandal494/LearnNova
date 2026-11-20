import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function DashboardSettingsPage() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || 'Elena Vance');
  const [email, setEmail] = useState(user?.email || 'elena.vance@learnnova.edu');
  const [degreeTrack, setDegreeTrack] = useState(user?.degreeTrack || 'Dual Degree Track: Artificial Intelligence & Neuroscience');
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="flex flex-col w-full gap-6 pb-16 max-w-4xl">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-1.5 text-outline font-label-sm text-xs uppercase tracking-wider mb-1">
          <span>Preferences</span>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-primary font-semibold">Student Profile & Settings</span>
        </div>
        <h1 className="font-headline-lg text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
          Account & Academic Configuration
        </h1>
        <p className="font-body-md text-xs sm:text-sm text-secondary mt-0.5">
          Manage your student credentials, notification preferences, and graduation milestone parameters.
        </p>
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <span className="material-symbols-outlined text-emerald-600 text-[20px]">check_circle</span>
          <span>Profile configuration saved and synced across LearnNova nodes!</span>
        </div>
      )}

      {/* Profile Form */}
      <div className="bg-surface-container-lowest rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        
        {/* Avatar Header */}
        <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
          <img
            src={user?.avatar || "https://lh3.googleusercontent.com/aida-public/AB6AXuA5O-qBknxwo4PYLNoJ8nze2vQgb2jjqsDgoNQIv2loDyg1yr-GP5SJOggO3BqBB2ud5OnTqpFxC18qEykpx-lUAgEhySRnB3t9dFkL5ASKxJyAWq-HWQJfmm9_ERrhffVGq6hDFyGtbS8SxrTdpWz05qz2xc2EgacPymmJ6JwXoXU7-pXak1Rn9MDG3lD25PpZmLsaQaCugTOnOU50Pvbvc3b5zzElYk2XYQjPJXA"}
            alt="Profile"
            className="w-16 h-16 rounded-2xl object-cover ring-2 ring-primary"
          />
          <div>
            <h3 className="font-headline-sm text-base font-bold text-on-surface">{name}</h3>
            <p className="text-xs text-slate-500">Student ID: #LNV-2024-9842</p>
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px] uppercase mt-1">
              Active Matriculated Scholar
            </span>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Full Legal Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Academic Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Declared Degree Track</label>
            <input
              type="text"
              value={degreeTrack}
              onChange={(e) => setDegreeTrack(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Academic Session</label>
              <input
                type="text"
                disabled
                value="Session 2024–2025 (Term 2)"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-100 text-slate-500 text-sm cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Campus Node</label>
              <input
                type="text"
                disabled
                value="LearnNova Bangalore Hub / Cloud Edge"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-100 text-slate-500 text-sm cursor-not-allowed"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-primary text-white font-bold text-xs shadow-md hover:bg-primary-container transition-all"
            >
              Save Configuration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

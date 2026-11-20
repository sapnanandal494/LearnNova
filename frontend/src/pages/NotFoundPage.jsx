import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-between p-6">
      
      {/* Top right theme toggle */}
      <div className="w-full max-w-5xl flex justify-end pt-2">
        <button
          onClick={toggleTheme}
          className="w-10 h-10 rounded-xl bg-surface-container-lowest border border-slate-200 shadow-sm flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors"
          title="Toggle Theme"
        >
          <span className="material-symbols-outlined text-[20px]">
            {darkMode ? 'light_mode' : 'dark_mode'}
          </span>
        </button>
      </div>

      {/* Main 404 Content */}
      <div className="max-w-xl text-center my-auto py-12">
        <span className="text-7xl block mb-2 select-none">🎓</span>
        <div className="text-7xl sm:text-8xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-none mb-4">
          404
        </div>
        <h1 className="font-headline-lg text-2xl sm:text-3xl font-extrabold text-on-surface mb-3">
          Oops! Page Not Found
        </h1>
        <p className="font-body-md text-sm text-slate-500 leading-relaxed max-w-md mx-auto mb-8">
          Looks like this page has gone on a study break. The page you're looking for might have been moved, renamed, or doesn't exist yet.
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-tertiary text-white font-bold text-xs sm:text-sm shadow-md hover:opacity-95 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">home</span>
            <span>Back to Homepage</span>
          </Link>
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-surface-container-lowest border border-slate-300 text-slate-700 font-bold text-xs sm:text-sm hover:bg-slate-50 transition-all shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">auto_stories</span>
            <span>Browse Courses</span>
          </Link>
        </div>

        {/* Quick Access Grid */}
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
          Or quickly navigate to:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <Link
            to="/dashboard"
            className="p-4 rounded-xl bg-surface-container-lowest border border-slate-200 shadow-sm hover:-translate-y-1 hover:border-primary transition-all text-center flex flex-col items-center gap-1.5"
          >
            <span className="text-2xl">👤</span>
            <span className="text-xs font-bold text-on-surface">Student Portal</span>
          </Link>
          <Link
            to="/courses"
            className="p-4 rounded-xl bg-surface-container-lowest border border-slate-200 shadow-sm hover:-translate-y-1 hover:border-primary transition-all text-center flex flex-col items-center gap-1.5"
          >
            <span className="text-2xl">📚</span>
            <span className="text-xs font-bold text-on-surface">Curricula</span>
          </Link>
          <Link
            to="/expert-lectures"
            className="p-4 rounded-xl bg-surface-container-lowest border border-slate-200 shadow-sm hover:-translate-y-1 hover:border-primary transition-all text-center flex flex-col items-center gap-1.5"
          >
            <span className="text-2xl">🎤</span>
            <span className="text-xs font-bold text-on-surface">Keynotes</span>
          </Link>
          <Link
            to="/study-materials"
            className="p-4 rounded-xl bg-surface-container-lowest border border-slate-200 shadow-sm hover:-translate-y-1 hover:border-primary transition-all text-center flex flex-col items-center gap-1.5"
          >
            <span className="text-2xl">📄</span>
            <span className="text-xs font-bold text-on-surface">Study Materials</span>
          </Link>
          <Link
            to="/dashboard/timetable"
            className="p-4 rounded-xl bg-surface-container-lowest border border-slate-200 shadow-sm hover:-translate-y-1 hover:border-primary transition-all text-center flex flex-col items-center gap-1.5"
          >
            <span className="text-2xl">🗓️</span>
            <span className="text-xs font-bold text-on-surface">Timetable</span>
          </Link>
          <Link
            to="/#contact-section"
            className="p-4 rounded-xl bg-surface-container-lowest border border-slate-200 shadow-sm hover:-translate-y-1 hover:border-primary transition-all text-center flex flex-col items-center gap-1.5"
          >
            <span className="text-2xl">✉️</span>
            <span className="text-xs font-bold text-on-surface">Contact Us</span>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-xs text-slate-400 py-4 border-t border-slate-200 w-full">
        © 2026 LearnNova Education Platform &nbsp;|&nbsp;{' '}
        <Link to="/" className="text-primary font-semibold hover:underline">
          Return to Homepage
        </Link>
      </footer>
    </div>
  );
}

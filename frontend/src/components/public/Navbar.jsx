import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Navbar({ onOpenSearch }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const { user, openAuthModal } = useAuth();
  const location = useLocation();

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Courses', path: '/courses' },
    { name: 'Subjects', path: '/courses?category=all' },
    { name: 'Expert Lectures', path: '/expert-lectures' },
    { name: 'Study Materials', path: '/study-materials' },
    { name: 'Timetable', path: '/dashboard/timetable' },
    { name: 'Events', path: '/expert-lectures#upcoming-grid' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* ANNOUNCEMENT BAR */}
      <div className="bg-gradient-to-r from-[#1d4ed8] via-[#7c3aed] to-[#1d4ed8] bg-[length:200%_auto] animate-marquee-grad text-white text-xs py-1.5 px-4 font-medium overflow-hidden whitespace-nowrap text-center shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2 mx-auto sm:mx-0 overflow-hidden text-ellipsis">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-300"></span>
            </span>
            <span className="font-semibold uppercase tracking-wider bg-white/20 px-1.5 py-0.5 rounded text-[10px]">Admissions 2025</span>
            <span className="text-white/95">🎓 New Semester Starting Nov 1st &nbsp;|&nbsp; Expert Lecture by Dr. Priya Sharma on AI Ethics &nbsp;|&nbsp; 📚 10,000+ Study Materials Free &nbsp;|&nbsp; 🏆 Hackathon Season 3 Open</span>
          </div>
          <div className="hidden md:flex items-center space-x-4 text-xs font-semibold text-yellow-300">
            <Link to="/expert-lectures" className="hover:underline">Claim Free Access →</Link>
          </div>
        </div>
      </div>

      {/* MAIN NAV HEADER */}
      <div className="bg-[#090d16]/95 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-[70px] flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-tertiary-container flex items-center justify-center text-white shadow-md shadow-primary/30 group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[24px]">school</span>
            </div>
            <div className="flex flex-col">
              <span className="font-headline-md text-headline-md tracking-tight font-bold text-white leading-none">
                Learn<span className="text-blue-400">Nova</span>
              </span>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium leading-none mt-1">
                Learn Today. Lead Tomorrow.
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 flex-1 justify-center">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-white/10 text-white font-semibold shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            {/* More Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-all"
              >
                <span>More</span>
                <span className="material-symbols-outlined text-[18px]">expand_more</span>
              </button>
              {moreDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl bg-[#111a36] border border-white/10 shadow-xl py-2 z-50 text-sm">
                  <Link
                    to="/expert-lectures"
                    onClick={() => setMoreDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-slate-200 hover:bg-white/10 hover:text-white"
                  >
                    <span className="material-symbols-outlined text-[18px] text-blue-400">play_circle</span>
                    <span>Live Classes</span>
                  </Link>
                  <Link
                    to="/courses"
                    onClick={() => setMoreDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-slate-200 hover:bg-white/10 hover:text-white"
                  >
                    <span className="material-symbols-outlined text-[18px] text-purple-400">campaign</span>
                    <span>Announcements</span>
                  </Link>
                  <Link
                    to="/dashboard"
                    onClick={() => setMoreDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-slate-200 hover:bg-white/10 hover:text-white"
                  >
                    <span className="material-symbols-outlined text-[18px] text-amber-400">emoji_events</span>
                    <span>Achievements</span>
                  </Link>
                  <Link
                    to="/study-materials"
                    onClick={() => setMoreDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-slate-200 hover:bg-white/10 hover:text-white"
                  >
                    <span className="material-symbols-outlined text-[18px] text-emerald-400">build</span>
                    <span>Study Tools</span>
                  </Link>
                </div>
              )}
            </div>
          </nav>

          {/* Action Tools & Login CTA */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Search Trigger */}
            <button
              type="button"
              onClick={onOpenSearch}
              className="w-9 h-9 rounded-lg flex items-center justify-center bg-white/5 text-slate-300 hover:text-white hover:bg-white/15 transition-all"
              title="Search courses & resources"
            >
              <span className="material-symbols-outlined text-[20px]">search</span>
            </button>

            {/* Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className="w-9 h-9 rounded-lg flex items-center justify-center bg-white/5 text-slate-300 hover:text-white hover:bg-white/15 transition-all"
              title="Toggle Dark/Light Mode"
            >
              <span className="material-symbols-outlined text-[20px]">
                {darkMode ? 'light_mode' : 'dark_mode'}
              </span>
            </button>

            {/* Admin Panel Button */}
            <Link
              to="/admin/login"
              className="hidden sm:inline-flex items-center gap-1 px-2.5 py-2 rounded-lg text-xs font-semibold text-red-400 border border-red-500/30 hover:bg-red-600/20 transition-all"
              title="Admin Panel"
            >
              <span className="material-symbols-outlined text-[16px]">admin_panel_settings</span>
            </Link>

            {/* Student Login Button */}
            <button
              type="button"
              onClick={() => openAuthModal('student-login')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-blue-300 border border-blue-500/40 hover:bg-blue-600/20 transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">person</span>
              <span>Student Login</span>
            </button>

            {/* Portal / Teacher Login Button */}
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md shadow-blue-600/30 hover:opacity-95 hover:-translate-y-0.5 transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">grid_view</span>
              <span>Dashboard</span>
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-10 h-10 rounded-lg flex items-center justify-center bg-white/5 text-white hover:bg-white/15 transition-all"
            >
              <span className="material-symbols-outlined text-[24px]">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE NAVIGATION DRAWER */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[106px] bg-[#090d16]/98 backdrop-blur-2xl z-40 p-6 flex flex-col gap-2 overflow-y-auto">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 rounded-xl text-base font-medium text-slate-200 hover:bg-white/10 hover:text-white transition-all flex items-center justify-between"
            >
              <span>{link.name}</span>
              <span className="material-symbols-outlined text-[20px] text-slate-500">chevron_right</span>
            </Link>
          ))}
          <div className="mt-auto pt-6 border-t border-white/10 flex flex-col gap-3">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                openAuthModal('student-login');
              }}
              className="w-full py-3 rounded-xl text-center font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/30"
            >
              Student Portal Login
            </button>
            <Link
              to="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 rounded-xl text-center font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg"
            >
              Open Student Dashboard
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

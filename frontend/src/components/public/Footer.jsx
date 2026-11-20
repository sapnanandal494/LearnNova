import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#060910] text-slate-400 pt-16 pb-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">

          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 flex flex-col items-start">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-tertiary-container flex items-center justify-center text-white shadow-md">
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
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm mb-6">
              India's premier digital academic ecosystem combining enterprise cognitive ergonomics with world-class faculty instruction and AI-augmented curriculum.
            </p>
            <div className="flex items-center space-x-3">
              <a href="#" className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-600 transition-all">
                <i className="fa-brands fa-x-twitter"></i>
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-600 transition-all">
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-red-600 transition-all">
                <i className="fa-brands fa-youtube"></i>
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-purple-600 transition-all">
                <i className="fa-brands fa-github"></i>
              </a>
            </div>
          </div>

          {/* Col 2: Academic Modules */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Curriculum</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/courses" className="hover:text-white transition-colors">Course Catalog</Link></li>
              <li><Link to="/courses?dept=cs" className="hover:text-white transition-colors">Computer Science</Link></li>
              <li><Link to="/courses?dept=ai" className="hover:text-white transition-colors">AI &amp; Data Science</Link></li>
              <li><Link to="/expert-lectures" className="hover:text-white transition-colors">Keynote Masterclasses</Link></li>
              <li><Link to="/study-materials" className="hover:text-white transition-colors">Study Material Archive</Link></li>
            </ul>
          </div>

          {/* Col 3: Student Tools */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Student Hub</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/dashboard" className="hover:text-white transition-colors">Student Dashboard</Link></li>
              <li><Link to="/dashboard/courses" className="hover:text-white transition-colors">Enrolled Courses</Link></li>
              <li><Link to="/dashboard/assignments" className="hover:text-white transition-colors">Assignments &amp; Labs</Link></li>
              <li><Link to="/dashboard/quizzes" className="hover:text-white transition-colors">Examination Center</Link></li>
              <li><Link to="/dashboard/ai-assistant" className="hover:text-white transition-colors">Ask NovaAI Copilot</Link></li>
            </ul>
          </div>

          {/* Col 4: Platform */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Platform &amp; Support</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#about" className="hover:text-white transition-colors">About LearnNova</a></li>
              <li><a href="#testimonials" className="hover:text-white transition-colors">Student Success</a></li>
              <li><a href="#admissions" className="hover:text-white transition-colors">Admissions 2025</a></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/admin/login" className="hover:text-red-400 text-slate-500 transition-colors flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px]">admin_panel_settings</span>Admin Portal
              </Link></li>
            </ul>
          </div>
        </div>

        {/* Contact Address Strip */}
        <div className="py-5 border-t border-white/5 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-500">
          <div className="flex items-start gap-2">
            <span className="material-symbols-outlined text-[16px] text-blue-400 mt-0.5 shrink-0">location_on</span>
            <span>42 Innovation Drive, Tech District<br />San Francisco, CA 94105, USA</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px] text-green-400 shrink-0">phone</span>
            <span>+1 (415) 555-0192 &nbsp;|&nbsp; +1 (415) 555-0180</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px] text-purple-400 shrink-0">email</span>
            <a href="mailto:support@learnnova.edu" className="hover:text-white transition-colors">support@learnnova.edu</a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 LearnNova Platform. Strictly designed for educational rigor and AI-native excellence.
          </div>
          <div className="flex items-center space-x-6">
            <span className="inline-flex items-center gap-1.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              All Academic Services Operational
            </span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <span className="material-symbols-outlined text-[16px]">arrow_upward</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

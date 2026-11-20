import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { dashboardService } from '../../api/api';
import { useAuth } from '../../context/AuthContext';

export default function DashboardHomePage() {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    dashboardService.getOverview()
      .then((res) => {
        if (res?.data) setData(res.data);
      })
      .catch((err) => console.warn('Could not load dashboard stats:', err))
      .finally(() => setLoading(false));
  }, []);

  const kpis = data?.kpis || {
    enrolledCoursesCount: 6,
    pendingAssignmentsCount: 3,
    attendanceRate: 92.4,
    averageTestScore: 91.5,
    streakDays: 6,
    weeklyGoalHours: 20,
    loggedHours: 15.6,
    progressPercent: 78,
  };

  const activeCourses = data?.activeCourses || [];

  return (
    <div className="flex flex-col w-full gap-6 pb-12">
      
      {/* 1. WELCOME SECTION / HERO BANNER */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary-container to-inverse-surface text-on-primary shadow-xl p-6 sm:p-8">
        {/* Ambient background luminescence accents */}
        <div className="pointer-events-none absolute -top-24 -left-20 w-96 h-96 rounded-full bg-tertiary-container/30 blur-3xl"></div>
        <div className="pointer-events-none absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-surface-tint/25 blur-3xl"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          <div className="lg:col-span-8 flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-white font-label-sm text-xs shadow-sm">
                <span className="w-2 h-2 rounded-full bg-yellow-300 animate-pulse"></span>
                Term 2 Accelerate
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 text-primary-fixed font-label-sm text-xs">
                <span className="material-symbols-outlined text-[16px]">verified</span>
                Dual Degree Track
              </span>
            </div>

            <div className="space-y-1">
              <h1 className="font-display-lg text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Welcome Back to LearnNova, {user?.name ? user.name.split(' ')[0] : 'Elena'}! ✨
              </h1>
              <p className="font-body-lg text-sm sm:text-base text-primary-fixed max-w-2xl leading-relaxed">
                You're on a 6-day learning streak. You've completed 78% of your weekly study goal. Keep pushing towards your Artificial Intelligence & Neuroscience dual certification!
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => navigate('/dashboard/courses')}
                className="group flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-primary font-semibold text-xs sm:text-sm shadow-lg hover:shadow-xl hover:bg-slate-50 transition-all transform hover:-translate-y-0.5"
              >
                <span className="material-symbols-outlined text-[20px] text-primary">play_circle</span>
                <span>Continue Learning: CS-402 Neural Architectures</span>
                <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </button>
              <button
                type="button"
                onClick={() => navigate('/dashboard/courses')}
                className="flex items-center gap-1.5 px-4 py-3 rounded-xl bg-white/15 hover:bg-white/25 backdrop-blur-md text-white font-semibold text-xs sm:text-sm transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">assignment_turned_in</span>
                <span>Review Syllabus</span>
              </button>
            </div>
          </div>

          {/* Weekly Goal Progress Circle Tracker */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <div className="w-full max-w-xs rounded-2xl bg-white/10 backdrop-blur-xl p-5 shadow-lg border border-white/15 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-primary-fixed uppercase tracking-wider">
                  Weekly Goal Progress
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-red-500/30 text-white font-semibold text-xs">
                  <span>🔥</span> {kpis.streakDays}-Day Streak
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      className="text-white/20"
                      cx="50"
                      cy="50"
                      fill="transparent"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                    />
                    <circle
                      className="text-white transition-all duration-700"
                      cx="50"
                      cy="50"
                      fill="transparent"
                      r="40"
                      stroke="currentColor"
                      strokeDasharray="251.2"
                      strokeDashoffset="55.2"
                      strokeLinecap="round"
                      strokeWidth="8"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center">
                    <span className="font-headline-md text-xl font-extrabold text-white leading-none">
                      {kpis.progressPercent}%
                    </span>
                    <span className="text-[10px] text-primary-fixed uppercase tracking-wider font-bold">Goal</span>
                  </div>
                </div>

                <div className="flex flex-col">
                  <div className="flex items-baseline gap-1">
                    <span className="font-headline-lg text-2xl font-bold text-white leading-none">
                      {kpis.loggedHours}
                    </span>
                    <span className="text-xs text-primary-fixed">/ {kpis.weeklyGoalHours} hrs</span>
                  </div>
                  <span className="text-xs text-primary-fixed mt-1">Logged this cycle</span>
                  <span className="text-xs text-white/80 mt-1 inline-flex items-center gap-1 font-semibold">
                    <span className="material-symbols-outlined text-[14px]">timelapse</span>
                    +4.4 hrs remaining
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. KEY METRIC STATISTICS CARDS (Grid of 4) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Card 1: Courses */}
        <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-slate-200/80 hover:shadow-md transition-shadow flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-label-sm text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Enrolled Courses
              </span>
              <span className="font-headline-lg text-3xl font-extrabold text-on-surface mt-1">
                {kpis.enrolledCoursesCount}
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-primary-fixed text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">auto_stories</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>22.0 ECTS Credits</span>
            <span className="text-emerald-600 font-bold">● Active Term</span>
          </div>
        </div>

        {/* Card 2: Assignments */}
        <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-slate-200/80 hover:shadow-md transition-shadow flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-label-sm text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Pending Assignments
              </span>
              <span className="font-headline-lg text-3xl font-extrabold text-on-surface mt-1">
                {kpis.pendingAssignmentsCount}
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-error-container text-error flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">pending_actions</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-red-600 font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"></span>
              1 Due Tonight
            </span>
            <Link to="/dashboard/assignments" className="text-primary font-bold hover:underline">
              Submit Lab →
            </Link>
          </div>
        </div>

        {/* Card 3: Attendance */}
        <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-slate-200/80 hover:shadow-md transition-shadow flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-label-sm text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Overall Attendance
              </span>
              <span className="font-headline-lg text-3xl font-extrabold text-on-surface mt-1">
                {kpis.attendanceRate}%
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">workspace_premium</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Minimum 75% required</span>
            <span className="text-emerald-600 font-bold">Good Standing</span>
          </div>
        </div>

        {/* Card 4: Average Score */}
        <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-slate-200/80 hover:shadow-md transition-shadow flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-label-sm text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Average Test Score
              </span>
              <span className="font-headline-lg text-3xl font-extrabold text-on-surface mt-1">
                {kpis.averageTestScore}%
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-tertiary-fixed text-tertiary flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">trending_up</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Top 5% Percentile</span>
            <span className="px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant font-bold text-[10px]">
              Grade A+ Honors
            </span>
          </div>
        </div>
      </section>

      {/* 3. TWO-COLUMN BALANCED WORKSPACE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT / MAIN WORKSPACE COLUMN (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Active Courses Module */}
          <section className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-slate-200/80">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[24px] text-primary">school</span>
                <div>
                  <h2 className="font-headline-md text-lg font-bold text-on-surface">My Active Courses</h2>
                  <p className="text-xs text-slate-500">Continue your scheduled modules & labs</p>
                </div>
              </div>
              <Link
                to="/dashboard/courses"
                className="text-xs font-bold text-primary hover:text-primary-container"
              >
                View All Courses →
              </Link>
            </div>

            <div className="space-y-4">
              {activeCourses.slice(0, 4).map((c) => (
                <div
                  key={c.code}
                  className="p-4 rounded-xl bg-surface-container-low hover:bg-surface-container transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-slate-100"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={c.thumbnail}
                      alt={c.title}
                      className="w-14 h-14 rounded-xl object-cover shrink-0 shadow-sm"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-md bg-primary-fixed text-on-primary-fixed text-[10px] font-bold">
                          {c.code}
                        </span>
                        <span className="text-xs text-slate-500 font-medium">{c.department}</span>
                      </div>
                      <h4 className="font-headline-sm text-sm font-bold text-on-surface mt-1 line-clamp-1">
                        {c.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {c.instructor} • Next: <strong className="text-slate-700 font-semibold">{c.nextLesson}</strong>
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:items-end gap-1.5 shrink-0 sm:w-48">
                    <div className="flex items-center justify-between sm:justify-end gap-2 w-full text-xs">
                      <span className="text-slate-500">{c.completedLessons}/{c.totalLessons} Lessons</span>
                      <span className="font-bold text-primary">{c.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-primary h-full rounded-full transition-all duration-500"
                        style={{ width: `${c.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Today's Lecture Timetable */}
          <section className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-slate-200/80">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[22px] text-tertiary">calendar_today</span>
                <h3 className="font-headline-md text-base font-bold text-on-surface">Today's Academic Schedule</h3>
              </div>
              <Link to="/dashboard/timetable" className="text-xs font-bold text-primary hover:underline">
                Full Week →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { time: '09:00 - 10:30 AM', title: 'Deep Learning CS-402', loc: 'Hall B / Online', badge: 'Live Now', active: true },
                { time: '11:00 - 12:30 PM', title: 'Distributed Systems CS-501', loc: 'Lab 304', badge: 'Upcoming', active: false },
                { time: '02:00 - 04:00 PM', title: 'GPU Cluster Lab', loc: 'GPU Lab 2', badge: 'Practical', active: false },
              ].map((slot, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border transition-all ${
                    slot.active
                      ? 'border-primary bg-primary/5 shadow-sm ring-1 ring-primary'
                      : 'border-slate-200 bg-surface-container-low'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-slate-500">{slot.time}</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        slot.active
                          ? 'bg-primary text-white animate-pulse'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {slot.badge}
                    </span>
                  </div>
                  <h5 className="font-headline-sm text-xs font-bold text-on-surface line-clamp-1">{slot.title}</h5>
                  <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">location_on</span>
                    <span>{slot.loc}</span>
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* AI Study Assistant Recommendation Callout Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-tertiary-container/15 via-primary-container/10 to-surface border border-tertiary/30 shadow-md">
            <div className="flex items-center justify-between mb-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant text-[11px] font-bold uppercase tracking-wider">
                <span className="material-symbols-outlined text-[14px]">smart_toy</span>
                AI Adaptive Milestone
              </span>
              <span className="text-xs font-bold text-tertiary">1.5x XP Active</span>
            </div>

            <h3 className="font-headline-sm text-base font-bold text-on-surface mb-2">
              Backpropagation & Gradient Optimization
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Based on your 75% progress in CS-402, reviewing computational graphs will boost your upcoming Quiz score by an estimated +8%.
            </p>

            <button
              type="button"
              onClick={() => navigate('/dashboard/ai-assistant')}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-primary to-tertiary text-white font-bold text-xs shadow-md shadow-purple-600/20 hover:opacity-95 transition-opacity flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
              <span>Launch AI Study Drill</span>
            </button>
          </div>

          {/* Action Queue: Upcoming Deadlines */}
          <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-slate-200/80">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-headline-sm text-sm font-bold text-on-surface uppercase tracking-wider">
                High-Stakes Deadlines
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-800 text-[10px] font-bold">
                Action Required
              </span>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-red-50/70 border border-red-200">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-red-700 uppercase">Lab 4 • CS-402</span>
                  <span className="text-xs font-bold text-red-800">Tonight, 11:59 PM</span>
                </div>
                <h5 className="text-xs font-bold text-slate-900 mt-1">PyTorch Autograd Engine</h5>
                <Link
                  to="/dashboard/assignments"
                  className="mt-2 text-xs font-semibold text-primary hover:underline inline-block"
                >
                  Submit Coursework →
                </Link>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-600 uppercase">Diagnostic • CS-402</span>
                  <span className="text-xs font-bold text-slate-700">Tomorrow</span>
                </div>
                <h5 className="text-xs font-bold text-slate-900 mt-1">Neural Network Gradient Descent</h5>
                <Link
                  to="/dashboard/quizzes"
                  className="mt-2 text-xs font-semibold text-primary hover:underline inline-block"
                >
                  Prepare Exam Drill →
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Academic Hub Links */}
          <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-slate-200/80">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              Quick Academic Tools
            </h4>
            <div className="grid grid-cols-2 gap-2">
              <Link
                to="/dashboard/materials"
                className="p-3 rounded-xl bg-surface-container-low hover:bg-slate-200/60 transition-colors text-center"
              >
                <span className="material-symbols-outlined text-primary text-[24px] block mb-1">
                  folder_open
                </span>
                <span className="text-xs font-bold text-on-surface">Notes & Docs</span>
              </Link>
              <Link
                to="/expert-lectures"
                className="p-3 rounded-xl bg-surface-container-low hover:bg-slate-200/60 transition-colors text-center"
              >
                <span className="material-symbols-outlined text-purple-600 text-[24px] block mb-1">
                  mic
                </span>
                <span className="text-xs font-bold text-on-surface">Masterclasses</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

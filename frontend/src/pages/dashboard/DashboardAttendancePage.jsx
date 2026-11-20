import React from 'react';
import { useAuth } from '../../context/AuthContext';

export default function DashboardAttendancePage() {
  const { user } = useAuth();

  const coursesAttendance = [
    { code: 'CS-402', title: 'Deep Learning & Neural Architectures', attended: 22, total: 24, percent: 91.6, status: 'Eligible' },
    { code: 'CS-501', title: 'Distributed Systems & Cloud Infrastructure', attended: 19, total: 20, percent: 95.0, status: 'Eligible' },
    { code: 'MATH-304', title: 'Advanced Algorithms & Graph Theory', attended: 20, total: 22, percent: 90.9, status: 'Eligible' },
    { code: 'NEUR-410', title: 'Computational Cognitive Science', attended: 17, total: 18, percent: 94.4, status: 'Eligible' },
    { code: 'ENG-210', title: 'Modern Compiler Design & LLVM', attended: 18, total: 20, percent: 90.0, status: 'Eligible' },
    { code: 'DS-301', title: 'Data Science & Statistical Inference', attended: 15, total: 16, percent: 93.8, status: 'Eligible' },
  ];

  return (
    <div className="flex flex-col w-full gap-6 pb-16">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-1.5 text-outline font-label-sm text-xs uppercase tracking-wider mb-1">
          <span>Academics</span>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-primary font-semibold">Attendance & Regularity</span>
        </div>
        <h1 className="font-headline-lg text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
          Attendance Ledger & Lecture Participation
        </h1>
        <p className="font-body-md text-xs sm:text-sm text-secondary mt-0.5">
          Campus policy requires a minimum of 75% attendance in each curriculum module for final examination eligibility.
        </p>
      </div>

      {/* Overview Stat Bento */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-surface-container-lowest border border-slate-200 shadow-sm">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Overall Term Attendance</span>
          <span className="font-display-lg text-3xl font-extrabold text-primary mt-1 block">92.4%</span>
          <span className="text-xs text-emerald-600 font-bold mt-1 inline-block">✓ In Excellent Standing</span>
        </div>
        <div className="p-5 rounded-2xl bg-surface-container-lowest border border-slate-200 shadow-sm">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Total Sessions Attended</span>
          <span className="font-display-lg text-3xl font-extrabold text-on-surface mt-1 block">111 / 120</span>
          <span className="text-xs text-slate-500 font-medium mt-1 inline-block">9 Absences Excused</span>
        </div>
        <div className="p-5 rounded-2xl bg-surface-container-lowest border border-slate-200 shadow-sm">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Exam Eligibility Status</span>
          <span className="font-display-lg text-3xl font-extrabold text-emerald-600 mt-1 block">100% Cleared</span>
          <span className="text-xs text-emerald-700 font-medium mt-1 inline-block">Hall ticket issuance approved</span>
        </div>
      </div>

      {/* Courses Attendance Table */}
      <div className="bg-surface-container-lowest rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-headline-sm text-sm font-bold text-on-surface uppercase tracking-wider">
            Curriculum Breakdown
          </h3>
          <span className="text-xs font-semibold text-slate-500">Academic Year 2024–2025</span>
        </div>

        <div className="divide-y divide-slate-100">
          {coursesAttendance.map((c) => (
            <div key={c.code} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-primary-fixed text-on-primary-fixed text-[10px] font-bold">
                    {c.code}
                  </span>
                  <h4 className="font-headline-sm text-sm font-bold text-on-surface">{c.title}</h4>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Attended: <strong className="text-slate-800">{c.attended}</strong> of {c.total} lectures
                </p>
              </div>

              <div className="flex items-center gap-6 shrink-0">
                <div className="w-32">
                  <div className="flex items-center justify-between text-xs font-bold mb-1">
                    <span className="text-primary">{c.percent}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-primary h-full rounded-full" style={{ width: `${c.percent}%` }}></div>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs">
                  {c.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

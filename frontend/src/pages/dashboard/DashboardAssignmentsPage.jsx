import React, { useState, useEffect } from 'react';
import { assignmentService } from '../../api/api';
import SubmitAssignmentModal from '../../components/dashboard/SubmitAssignmentModal';

export default function DashboardAssignmentsPage() {
  const [assignments, setAssignments] = useState([]);
  const [filterTab, setFilterTab] = useState('all');
  const [selectedForSubmit, setSelectedForSubmit] = useState(null);
  const [stats, setStats] = useState({
    total: 21,
    pending: 3,
    inReview: 4,
    graded: 14,
    averageGrade: '94.2%',
    onTimeRate: '98%',
  });

  const fetchAssignments = () => {
    assignmentService.getAssignments({ status: filterTab })
      .then((res) => {
        if (res?.data) {
          setAssignments(res.data);
          if (res.stats) setStats(res.stats);
        }
      })
      .catch((err) => console.warn('Could not load assignments:', err));
  };

  useEffect(() => {
    fetchAssignments();
  }, [filterTab]);

  return (
    <div className="flex flex-col w-full gap-6 pb-16">
      
      {/* 1. Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-outline font-label-sm text-xs uppercase tracking-wider mb-1">
            <span>Academics</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-primary font-semibold">Assignments & Submissions</span>
          </div>
          <h1 className="font-headline-lg text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
            Assignments, Labs & Capstone Projects
          </h1>
          <p className="font-body-md text-xs sm:text-sm text-slate-500 mt-0.5">
            Review deadlines, sync git repositories, run automated testing pipelines, and submit coursework.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setSelectedForSubmit(assignments[0] || null)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary-container text-on-primary font-semibold text-xs shadow-md hover:bg-primary transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">add_task</span>
            <span>Submit Custom Lab</span>
          </button>
        </div>
      </div>

      {/* 2. Status Metrics Bento Deck */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1: Pending Tasks */}
        <div className="bg-surface-container-lowest p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Action Queue</span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-error-container text-on-error-container text-[11px] font-bold animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-error"></span>
              1 Due Tonight!
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <div>
              <div className="font-display-lg text-3xl font-extrabold text-on-surface leading-none">
                {stats.pending}
              </div>
              <div className="text-xs text-slate-500 mt-1">Pending Assignments</div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-error-container/40 flex items-center justify-center text-error">
              <span className="material-symbols-outlined text-[22px]">timer</span>
            </div>
          </div>
        </div>

        {/* Metric 2: In Review */}
        <div className="bg-surface-container-lowest p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Under Evaluation</span>
            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[11px] font-bold">
              CI Running
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <div>
              <div className="font-display-lg text-3xl font-extrabold text-on-surface leading-none">
                {stats.inReview}
              </div>
              <div className="text-xs text-slate-500 mt-1">In Review Pipeline</div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">sync</span>
            </div>
          </div>
        </div>

        {/* Metric 3: Graded & Returned */}
        <div className="bg-surface-container-lowest p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Completed Work</span>
            <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed text-[11px] font-bold">
              Avg {stats.averageGrade}
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <div>
              <div className="font-display-lg text-3xl font-extrabold text-on-surface leading-none">
                {stats.graded}
              </div>
              <div className="text-xs text-slate-500 mt-1">Graded & Returned</div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-primary-fixed text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">verified</span>
            </div>
          </div>
        </div>

        {/* Metric 4: Punctuality */}
        <div className="bg-surface-container-lowest p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Punctuality Score</span>
            <span className="text-emerald-600 text-[11px] font-bold">+2.4% vs cohort</span>
          </div>
          <div className="flex items-baseline justify-between">
            <div>
              <div className="font-display-lg text-3xl font-extrabold text-on-surface leading-none">
                {stats.onTimeRate}
              </div>
              <div className="text-xs text-slate-500 mt-1">On-Time Turn-In Rate</div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-tertiary-fixed text-tertiary flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">schedule</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Filter Tabs Toolbar */}
      <div className="bg-surface-container-lowest p-2 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-2 overflow-x-auto">
        {[
          { label: 'All Coursework', val: 'all' },
          { label: 'Action Required / Pending', val: 'pending', count: stats.pending },
          { label: 'In Review', val: 'in_review', count: stats.inReview },
          { label: 'Completed & Graded', val: 'graded', count: stats.graded },
        ].map((t) => (
          <button
            key={t.val}
            type="button"
            onClick={() => setFilterTab(t.val)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              filterTab === t.val
                ? 'bg-primary-container text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span>{t.label}</span>
            {t.count !== undefined && (
              <span className="px-1.5 py-0.2 rounded-full bg-white/20 text-[10px]">
                {t.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* 4. Assignments Interactive Cards List */}
      <div className="space-y-4">
        {assignments.map((asg) => (
          <div
            key={asg.id}
            className="p-5 sm:p-6 rounded-2xl bg-surface-container-lowest border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-4">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                  asg.status === 'graded'
                    ? 'bg-emerald-100 text-emerald-700'
                    : asg.dueStatus?.includes('Tonight')
                    ? 'bg-red-100 text-red-700'
                    : 'bg-primary-fixed text-primary'
                }`}
              >
                <span className="material-symbols-outlined text-[26px]">
                  {asg.status === 'graded' ? 'check_circle' : asg.type === 'capstone' ? 'military_tech' : 'assignment'}
                </span>
              </div>

              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-bold text-[10px] tracking-wider uppercase">
                    {asg.courseCode}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">{asg.courseName}</span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      asg.status === 'graded'
                        ? 'bg-emerald-100 text-emerald-800'
                        : asg.status === 'in_review'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {asg.dueStatus}
                  </span>
                </div>

                <h3 className="font-headline-sm text-base font-bold text-on-surface mt-1.5">
                  {asg.title}
                </h3>
                <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
                  {asg.instructions}
                </p>

                <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1 font-mono text-[11px] text-primary">
                    <span className="material-symbols-outlined text-[16px]">terminal</span>
                    <span>{asg.gitRepo || 'Repository not synced'}</span>
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-slate-600">
                    <span className="material-symbols-outlined text-[16px] text-emerald-600">done_all</span>
                    <span>{asg.testSuiteStatus}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
              {asg.status === 'graded' ? (
                <div className="text-right">
                  <div className="text-xl font-extrabold text-emerald-600">{asg.score}%</div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase">Grade {asg.grade}</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setSelectedForSubmit(asg)}
                  className="px-5 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-xs shadow-md hover:bg-primary-container transition-all flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[18px]">publish</span>
                  <span>{asg.status === 'in_review' ? 'Resubmit Lab' : 'Submit Coursework'}</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Submission Modal */}
      <SubmitAssignmentModal
        assignment={selectedForSubmit}
        isOpen={Boolean(selectedForSubmit)}
        onClose={() => setSelectedForSubmit(null)}
        onSuccess={() => fetchAssignments()}
      />
    </div>
  );
}

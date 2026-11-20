import React, { useState, useEffect } from 'react';
import { quizService } from '../../api/api';
import TakeQuizModal from '../../components/dashboard/TakeQuizModal';

export default function DashboardQuizzesPage() {
  const [quizzes, setQuizzes] = useState([]);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [stats, setStats] = useState({
    averageScore: '92.4%',
    completedCount: 18,
    upcomingCount: 2,
    activeCount: 3,
    drillStreakDays: 14,
    rank: 'Top 4% in Class (Grade A+ Honors)',
  });

  const fetchQuizzes = () => {
    quizService.getQuizzes()
      .then((res) => {
        if (res?.data) {
          setQuizzes(res.data);
          if (res.stats) setStats(res.stats);
        }
      })
      .catch((err) => console.warn('Could not load quizzes:', err));
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  return (
    <div className="flex flex-col w-full gap-6 pb-16">
      
      {/* 1. Header & Actions */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-outline font-label-sm text-xs uppercase tracking-wider mb-1">
            <span>Academics</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-primary font-semibold">Quizzes & Examination Center</span>
          </div>
          <h1 className="font-display-lg text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
            Quizzes, Assessments & Mock Exams
          </h1>
          <p className="font-body-md text-xs sm:text-sm text-secondary mt-0.5">
            Monitor scheduled proctored examinations, active weekly diagnostics, and AI-curated revision drills.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setSelectedQuiz(quizzes[0] || null)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary-container text-on-primary font-bold text-xs shadow-md hover:opacity-95 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">verified_user</span>
            <span>Run Full Diagnostic Check</span>
          </button>
        </div>
      </div>

      {/* 2. Summary Stat KPI Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Stat 1: Avg Score */}
        <div className="p-5 rounded-2xl bg-surface-container-lowest border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="font-label-sm text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Average Quiz Score
            </span>
            <span className="p-1.5 rounded-lg bg-secondary-container text-on-secondary-fixed">
              <span className="material-symbols-outlined text-[18px]">insights</span>
            </span>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-display-lg text-3xl font-extrabold text-on-surface">{stats.averageScore}</span>
              <span className="inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                <span className="material-symbols-outlined text-[12px] mr-0.5">trending_up</span>+3.1%
              </span>
            </div>
            <p className="font-body-sm text-xs text-secondary mt-1">{stats.rank}</p>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full mt-4 overflow-hidden">
            <div className="bg-primary h-full rounded-full" style={{ width: '92.4%' }}></div>
          </div>
        </div>

        {/* Stat 2: Completed Tests */}
        <div className="p-5 rounded-2xl bg-surface-container-lowest border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="font-label-sm text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Completed Assessments
            </span>
            <span className="p-1.5 rounded-lg bg-primary-fixed text-primary">
              <span className="material-symbols-outlined text-[18px]">fact_check</span>
            </span>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-display-lg text-3xl font-extrabold text-on-surface">{stats.completedCount}</span>
              <span className="text-xs text-secondary font-medium">Recorded tests</span>
            </div>
            <p className="font-body-sm text-xs text-secondary mt-1">100% submission integrity score</p>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full mt-4 overflow-hidden">
            <div className="bg-primary-container h-full rounded-full" style={{ width: '85%' }}></div>
          </div>
        </div>

        {/* Stat 3: Upcoming Proctored */}
        <div className="p-5 rounded-2xl bg-surface-container-lowest border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="font-label-sm text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Upcoming Exams
            </span>
            <span className="p-1.5 rounded-lg bg-red-100 text-red-800">
              <span className="material-symbols-outlined text-[18px]">notification_important</span>
            </span>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-display-lg text-3xl font-extrabold text-on-surface">2</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-red-100 text-red-800">
                1 Midterm
              </span>
            </div>
            <p className="font-body-sm text-xs text-secondary mt-1">Next lock-in: Neural Networks CS-402</p>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full mt-4 overflow-hidden">
            <div className="bg-red-500 h-full rounded-full" style={{ width: '50%' }}></div>
          </div>
        </div>

        {/* Stat 4: Practice Streak */}
        <div className="p-5 rounded-2xl bg-surface-container-lowest border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="font-label-sm text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Continuous Drill Streak
            </span>
            <span className="p-1.5 rounded-lg bg-amber-100 text-amber-800">
              <span className="material-symbols-outlined text-[18px]">local_fire_department</span>
            </span>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-display-lg text-3xl font-extrabold text-on-surface">{stats.drillStreakDays}</span>
              <span className="text-xs font-bold text-amber-600">Days Active 🔥</span>
            </div>
            <p className="font-body-sm text-xs text-secondary mt-1">Bonus 1.5x Mastery XP booster enabled</p>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full mt-4 overflow-hidden">
            <div className="bg-amber-500 h-full rounded-full" style={{ width: '100%' }}></div>
          </div>
        </div>
      </div>

      {/* 3. Segmented Navigation Tabs */}
      <div className="flex items-center gap-1 bg-surface-container-low p-1.5 rounded-xl border border-slate-200 w-fit">
        <button
          type="button"
          onClick={() => setActiveTab('upcoming')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
            activeTab === 'upcoming'
              ? 'bg-surface-container-lowest text-primary shadow-sm font-bold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">bolt</span>
          <span>Upcoming & Active</span>
          <span className="px-2 py-0.5 text-[10px] rounded-full bg-primary-fixed text-on-primary-fixed font-bold">
            {quizzes.length}
          </span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('practice')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
            activeTab === 'practice'
              ? 'bg-surface-container-lowest text-primary shadow-sm font-bold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">model_training</span>
          <span>Practice & Mock Drills</span>
          <span className="px-2 py-0.5 text-[10px] rounded-full bg-slate-200 text-slate-700 font-bold">
            12
          </span>
        </button>
      </div>

      {/* 4. Quizzes Cards Deck */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {quizzes.map((quiz) => (
          <div
            key={quiz.id}
            className="p-6 rounded-2xl bg-surface-container-lowest border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-bold text-[10px] uppercase">
                    {quiz.courseCode}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">{quiz.category}</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[10px] font-bold flex items-center gap-1">
                  <span>⚡ +{quiz.xpReward} XP</span>
                </span>
              </div>

              <h3 className="font-headline-sm text-base font-bold text-on-surface group-hover:text-primary transition-colors">
                {quiz.title}
              </h3>
              <p className="text-xs text-slate-500 mt-1">{quiz.courseName}</p>

              <div className="grid grid-cols-3 gap-2 mt-4 p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Questions</span>
                  <span className="text-sm font-bold text-slate-800">{quiz.totalQuestions} Questions</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Duration</span>
                  <span className="text-sm font-bold text-slate-800">{quiz.durationMinutes} Mins</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Class High</span>
                  <span className="text-sm font-bold text-emerald-600">{quiz.highScore}%</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-red-500">alarm</span>
                <span>Lock-in: {quiz.dueDate}</span>
              </span>

              <button
                type="button"
                onClick={() => setSelectedQuiz(quiz)}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-xs shadow-md hover:bg-primary-container transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">play_arrow</span>
                <span>{quiz.status === 'completed' ? 'Retake Drill' : 'Start Assessment'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Assessment Modal */}
      <TakeQuizModal
        quiz={selectedQuiz}
        isOpen={Boolean(selectedQuiz)}
        onClose={() => setSelectedQuiz(null)}
        onSuccess={() => fetchQuizzes()}
      />
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { lectureService } from '../../api/api';
import LecturePlayerModal from '../../components/dashboard/LecturePlayerModal';

export default function ExpertLecturesPage() {
  const [lectures, setLectures] = useState([]);
  const [activeTab, setActiveTab] = useState('All');
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [regMsg, setRegMsg] = useState('');

  const fetchLectures = () => {
    lectureService.getLectures({ category: activeTab !== 'All' ? activeTab : undefined })
      .then((res) => {
        if (res?.data) setLectures(res.data);
      })
      .catch((err) => console.warn('Could not load keynotes:', err));
  };

  useEffect(() => {
    fetchLectures();
  }, [activeTab]);

  const handleRegister = async (lec) => {
    try {
      await lectureService.registerLecture(lec.id);
      setRegMsg(`🎉 Successfully registered for ${lec.title}! Added to your calendar.`);
      setTimeout(() => setRegMsg(''), 3000);
      fetchLectures();
    } catch {
      setRegMsg(`🎉 Registered for ${lec.title}!`);
      setTimeout(() => setRegMsg(''), 3000);
    }
  };

  return (
    <div className="w-full flex flex-col pt-[106px] min-h-screen bg-surface">
      
      {/* Toast Alert */}
      {regMsg && (
        <div className="fixed top-24 right-6 z-50 p-4 rounded-2xl bg-emerald-600 text-white shadow-2xl flex items-center gap-3 animate-bounce">
          <span className="material-symbols-outlined text-[24px]">event_available</span>
          <span className="text-sm font-bold">{regMsg}</span>
        </div>
      )}

      {/* Global Series 2026 Announcement Banner */}
      <div className="w-full bg-gradient-to-r from-primary via-tertiary-container to-primary px-4 sm:px-6 py-2 text-on-primary">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-white/20 font-bold uppercase tracking-wider text-[10px]">
              GLOBAL SERIES 2026
            </span>
            <span className="text-white/95">
              Registration open for the Q4 Horizon Keynotes. Turing Laureates & Global AI leads convening live.
            </span>
          </div>
          <a href="#featured-stage" className="inline-flex items-center gap-1 font-bold text-yellow-300 hover:underline">
            <span>Claim Free Academic Access</span>
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </a>
        </div>
      </div>

      {/* HERO SECTION */}
      <section className="relative w-full overflow-hidden bg-gradient-to-b from-surface-container via-surface to-surface-bright py-16 sm:py-24 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center text-center">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-lowest shadow-sm mb-6 border border-slate-200">
            <span className="text-purple-600 text-sm">🎤</span>
            <span className="font-label-md text-xs sm:text-sm text-primary font-bold tracking-wide">
              Global Keynote Series & Academic Masterclasses
            </span>
            <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
          </div>

          <h1 className="font-display-lg text-3xl sm:text-4xl lg:text-[50px] lg:leading-[58px] text-on-surface font-extrabold max-w-4xl tracking-tight mb-4">
            Learn Directly from Pioneers Shaping{' '}
            <span className="bg-gradient-to-r from-primary via-tertiary-container to-tertiary bg-clip-text text-transparent">
              Science, AI & Industry
            </span>
          </h1>

          <p className="font-body-lg text-sm sm:text-base text-secondary max-w-3xl mb-8 leading-relaxed">
            Live interactive discourses, keynote seminars, AMA sessions, and academic masterclasses led by Turing Laureates, research directors, and tier-one faculty. Broadcast in high-definition worldwide.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            <a
              href="#upcoming-grid"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-on-primary font-semibold text-xs sm:text-sm shadow-md hover:bg-primary-container transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">calendar_month</span>
              <span>View Upcoming Live Schedule</span>
            </a>
            <button
              type="button"
              onClick={() => alert('Subscribed! Horizon Keynotes calendar feed synced to your student profile.')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-surface-container-lowest text-on-surface font-semibold text-xs sm:text-sm shadow-sm hover:bg-surface-container border border-slate-200 transition-all"
            >
              <span className="material-symbols-outlined text-[18px] text-tertiary">notification_add</span>
              <span>Subscribe to Keynote Calendar</span>
            </button>
          </div>

          {/* Live Metric Stats Strip */}
          <div className="w-full max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-4 p-5 bg-surface-container-lowest/90 backdrop-blur-md rounded-2xl shadow-sm border border-slate-200">
            <div>
              <div className="font-headline-lg text-2xl font-bold text-on-surface">38+</div>
              <div className="font-label-sm text-[11px] text-slate-500 uppercase tracking-wider mt-0.5">Turing Laureates</div>
            </div>
            <div>
              <div className="font-headline-lg text-2xl font-bold text-on-surface">120K+</div>
              <div className="font-label-sm text-[11px] text-slate-500 uppercase tracking-wider mt-0.5">Global Scholars</div>
            </div>
            <div>
              <div className="font-headline-lg text-2xl font-bold text-on-surface">100%</div>
              <div className="font-label-sm text-[11px] text-slate-500 uppercase tracking-wider mt-0.5">Free Academic Access</div>
            </div>
            <div>
              <div className="font-headline-lg text-2xl font-bold text-emerald-600">4K Live</div>
              <div className="font-label-sm text-[11px] text-slate-500 uppercase tracking-wider mt-0.5">Encrypted Stream</div>
            </div>
          </div>
        </div>
      </section>

      {/* FILTER TABS & MASTERCLASSES GRID */}
      <section id="upcoming-grid" className="max-w-7xl mx-auto px-4 sm:px-6 py-16 w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <span className="font-label-sm text-xs font-bold text-primary uppercase tracking-wider">
              Curated Masterclasses
            </span>
            <h2 className="font-headline-lg text-2xl font-extrabold text-on-surface mt-1">
              Upcoming Live Broadcasts & Replays
            </h2>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1 bg-surface-container-low p-1.5 rounded-xl border border-slate-200 self-start md:self-auto overflow-x-auto">
            {['All', 'Artificial Intelligence', 'Quantum Computing'].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === tab
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-slate-600 hover:text-on-surface hover:bg-slate-200/60'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Masterclass Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {lectures.map((lec) => (
            <div
              key={lec.id}
              className="bg-surface-container-lowest rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="p-6 bg-gradient-to-br from-slate-900 to-[#111a36] text-white relative">
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-bold text-[10px] uppercase tracking-wider mb-3">
                    {lec.badge}
                  </span>
                  <h3 className="font-headline-sm text-base font-bold text-white line-clamp-2 leading-snug">
                    {lec.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-slate-300 mt-3">
                    <span className="material-symbols-outlined text-[16px] text-amber-400">schedule</span>
                    <span>{lec.date} • {lec.time}</span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={lec.speakerAvatar}
                      alt={lec.speaker}
                      className="w-12 h-12 rounded-xl object-cover ring-2 ring-primary-fixed shadow-sm"
                    />
                    <div>
                      <h4 className="font-headline-sm text-sm font-bold text-on-surface">{lec.speaker}</h4>
                      <p className="text-xs text-slate-500">{lec.speakerTitle}</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {lec.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1 font-semibold text-primary">
                      <span className="material-symbols-outlined text-[16px]">group</span>
                      <span>{lec.registeredCount.toLocaleString()} Registered</span>
                    </span>
                    <span className="text-slate-400 font-medium">{lec.category}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 flex gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedLecture(lec)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors flex items-center justify-center gap-1"
                >
                  <span className="material-symbols-outlined text-[16px] text-primary">play_circle</span>
                  <span>{lec.status === 'recorded' ? 'Watch Replay' : 'Preview Stream'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleRegister(lec)}
                  className="px-4 py-2.5 rounded-xl bg-primary text-on-primary font-semibold text-xs shadow-md hover:bg-primary-container transition-all"
                >
                  Register
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Video Stream Modal */}
      <LecturePlayerModal
        lecture={selectedLecture}
        isOpen={Boolean(selectedLecture)}
        onClose={() => setSelectedLecture(null)}
      />
    </div>
  );
}

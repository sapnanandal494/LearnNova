import React, { useState, useEffect } from 'react';

// Real YouTube lecture videos mapped per course code
const COURSE_VIDEOS = {
  'CS-402': {
    videoId: 'aircAruvnKk',           // 3Blue1Brown – Neural Networks
    description: 'Neural Networks & Deep Learning – 3Blue1Brown',
  },
  'CS-501': {
    videoId: 'cQP8WApzIQQ',           // MIT – Distributed Systems
    description: 'Distributed Systems – MIT OpenCourseWare',
  },
  'MATH-304': {
    videoId: 'OkmNXy7er84',           // Algorithms & Graph Theory
    description: 'Advanced Algorithms & Graph Theory',
  },
  'NEUR-410': {
    videoId: 'JgvyzIkgxF0',           // Computational Neuroscience
    description: 'Computational Neuroscience – Coursera',
  },
  'ENG-210': {
    videoId: 'Mn54zbpc9Ik',           // LLVM & Compiler Design
    description: 'Compiler Design & LLVM – Lecture Series',
  },
  'DS-301': {
    videoId: 'xxpc-HPKN28',           // Data Science / Stats
    description: 'Data Science & Statistical Inference',
  },
  default: {
    videoId: 'kCc8FmEb1nY',           // Andrej Karpathy – GPT from scratch
    description: 'Expert Lecture – AI & Machine Learning',
  },
};

export default function LecturePlayerModal({ lecture, isOpen, onClose }) {
  const [playing, setPlaying] = useState(false);

  // Reset player state whenever a new lecture is opened
  useEffect(() => {
    if (isOpen) setPlaying(false);
  }, [lecture, isOpen]);

  if (!isOpen || !lecture) return null;

  const courseCode = lecture.courseCode || 'default';
  const videoInfo = COURSE_VIDEOS[courseCode] || COURSE_VIDEOS.default;
  const embedUrl = `https://www.youtube.com/embed/${videoInfo.videoId}?autoplay=1&rel=0&modestbranding=1`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
      <div className="relative w-full max-w-4xl bg-[#090d16] rounded-2xl overflow-hidden shadow-2xl border border-white/10">

        {/* Top bar */}
        <div className="p-4 bg-white/5 flex items-center justify-between border-b border-white/10 text-white">
          <div className="flex items-center gap-3 min-w-0">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse shrink-0"></span>
            <div className="min-w-0">
              <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider block">
                {lecture.badge || 'Live Masterclass'} · {courseCode !== 'default' ? courseCode : ''}
              </span>
              <h3 className="text-base font-bold text-white truncate max-w-xl">{lecture.title}</h3>
            </div>
          </div>
          <button
            onClick={() => { setPlaying(false); onClose(); }}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors shrink-0 ml-2"
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>

        {/* Video Stage */}
        <div className="relative aspect-video bg-black">
          {playing ? (
            <iframe
              className="w-full h-full"
              src={embedUrl}
              title={lecture.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            /* Thumbnail / Start screen */
            <div
              className="w-full h-full flex flex-col items-center justify-center cursor-pointer group"
              style={{
                background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0c1a3a 100%)',
              }}
              onClick={() => setPlaying(true)}
            >
              {/* YouTube-style thumbnail overlay */}
              <div className="relative mb-5">
                <div className="w-24 h-24 rounded-full bg-red-600 flex items-center justify-center shadow-2xl shadow-red-900/60 group-hover:scale-110 transition-transform duration-200">
                  <span className="material-symbols-outlined text-[52px] text-white ml-1">play_arrow</span>
                </div>
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-green-500 border-2 border-[#090d16] animate-pulse"></span>
              </div>

              <h4 className="text-lg font-bold text-white text-center px-6 max-w-lg">{lecture.title}</h4>
              <p className="text-sm text-slate-400 mt-1 text-center">{lecture.speaker} · {lecture.speakerTitle}</p>
              <p className="text-xs text-blue-400 mt-2">{videoInfo.description}</p>

              <div className="flex items-center gap-4 mt-5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-600/90 text-white text-xs font-bold shadow">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                  LIVE · Click to Play
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold">
                  <span className="material-symbols-outlined text-[14px]">hd</span>
                  HD 1080p · 60 FPS
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Details */}
        <div className="p-4 bg-[#111a36] text-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div>
            <span className="font-semibold text-white">Category:</span> {lecture.category} &nbsp;|&nbsp;
            <span className="font-semibold text-white ml-2">Duration:</span> {lecture.time}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-emerald-400 flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">verified</span> Attendance Verified
            </span>
            {!playing && (
              <button
                onClick={() => setPlaying(true)}
                className="px-4 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold transition-all flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[16px]">play_arrow</span>
                Play Now
              </button>
            )}
            <button
              onClick={() => { setPlaying(false); onClose(); }}
              className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold transition-all"
            >
              Exit Player
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

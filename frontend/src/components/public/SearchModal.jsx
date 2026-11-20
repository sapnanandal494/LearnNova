import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  if (!isOpen) return null;

  const quickResults = [
    { title: 'CS-402: Deep Learning & Neural Architectures', type: 'Course', path: '/courses' },
    { title: 'CS-501: Distributed Systems & Cloud Infrastructure', type: 'Course', path: '/courses' },
    { title: 'Turing Keynote: The Frontier of Embodied AI', type: 'Masterclass', path: '/expert-lectures' },
    { title: 'Lecture Notes: Attention & FlashAttention', type: 'Study Material', path: '/study-materials' },
    { title: 'Quizzes & Diagnostics Examination Center', type: 'Exam', path: '/dashboard/quizzes' },
    { title: 'Weekly Timetable & Schedule', type: 'Routine', path: '/dashboard/timetable' },
  ];

  const filtered = query
    ? quickResults.filter((r) => r.title.toLowerCase().includes(query.toLowerCase()))
    : quickResults;

  const handleSelect = (path) => {
    onClose();
    navigate(path);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#090d16]/90 backdrop-blur-xl flex flex-col items-center pt-20 px-4">
      <div className="w-full max-w-2xl">
        <div className="flex items-center justify-between text-white mb-4">
          <span className="text-xs uppercase font-semibold tracking-wider text-slate-400">Search LearnNova Ecosystem</span>
          <button onClick={onClose} className="text-slate-400 hover:text-white flex items-center gap-1 text-sm">
            <span>ESC to close</span>
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Input */}
        <div className="relative">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-blue-400 text-[24px]">
            search
          </span>
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by topic, syllabus code (e.g. CS-402), professor, or lab..."
            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-[#1e293b] border-2 border-blue-600 text-white placeholder-slate-400 font-medium text-base focus:outline-none shadow-2xl"
          />
        </div>

        {/* Results */}
        <div className="mt-4 bg-[#1e293b] rounded-2xl border border-slate-700/80 overflow-hidden shadow-2xl">
          <div className="p-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400 border-b border-slate-700">
            Quick Suggestions
          </div>
          <div className="divide-y divide-slate-700/50 max-h-80 overflow-y-auto">
            {filtered.map((item, idx) => (
              <div
                key={idx}
                onClick={() => handleSelect(item.path)}
                className="p-3.5 hover:bg-blue-600/10 cursor-pointer flex items-center justify-between text-slate-200 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-slate-400 text-[20px]">
                    {item.type === 'Course' ? 'auto_stories' : item.type === 'Masterclass' ? 'mic' : 'description'}
                  </span>
                  <span className="text-sm font-medium">{item.title}</span>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-700 text-slate-300 font-semibold">
                  {item.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

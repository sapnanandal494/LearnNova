import React, { useState, useEffect } from 'react';
import { dashboardService } from '../../api/api';
import LecturePlayerModal from '../../components/dashboard/LecturePlayerModal';

// Parse "HH:MM - HH:MM" into minutes-since-midnight
function parseTimeRange(timeStr) {
  if (!timeStr) return null;
  const match = timeStr.match(/(\d{1,2}):(\d{2})\s*-\s*(\d{1,2}):(\d{2})/);
  if (!match) return null;
  return {
    start: parseInt(match[1]) * 60 + parseInt(match[2]),
    end:   parseInt(match[3]) * 60 + parseInt(match[4]),
  };
}

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function getNowInfo() {
  const now = new Date();
  return {
    day: DAY_NAMES[now.getDay()],
    minutes: now.getHours() * 60 + now.getMinutes(),
    timeStr: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
  };
}

function getSessionStatus(item, nowDay, nowMinutes) {
  if (item.day !== nowDay) return 'other';
  const range = parseTimeRange(item.time);
  if (!range) return 'other';
  if (nowMinutes >= range.start && nowMinutes <= range.end) return 'active';
  if (nowMinutes < range.start && range.start - nowMinutes <= 60) return 'soon'; // within 60 min
  if (nowMinutes > range.end) return 'done';
  return 'upcoming';
}

export default function DashboardTimetablePage() {
  const [timetable, setTimetable] = useState([]);
  const [nowInfo, setNowInfo] = useState(getNowInfo());
  const [activeLecture, setActiveLecture] = useState(null);

  useEffect(() => {
    dashboardService.getTimetable()
      .then((res) => { if (res?.data) setTimetable(res.data); })
      .catch((err) => console.warn('Could not load timetable:', err));
  }, []);

  // Tick every 30 seconds to keep "now" current
  useEffect(() => {
    const timer = setInterval(() => setNowInfo(getNowInfo()), 30000);
    return () => clearInterval(timer);
  }, []);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const isWeekend = nowInfo.day === 'Saturday' || nowInfo.day === 'Sunday';

  return (
    <div className="flex flex-col w-full gap-6 pb-16">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-outline font-label-sm text-xs uppercase tracking-wider mb-1">
            <span>Academics</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-primary font-semibold">Weekly Timetable</span>
          </div>
          <h1 className="font-headline-lg text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
            Academic Schedule &amp; Lectures Calendar
          </h1>
          <p className="font-body-md text-xs sm:text-sm text-secondary mt-0.5">
            Fall 2024 • Term 2 Timetable with classroom locations and online stream links.
          </p>
        </div>

        <div className="flex flex-col items-end gap-2">
          {/* Live Clock */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/20">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-xs font-bold text-primary">{nowInfo.day} · {nowInfo.timeStr}</span>
          </div>

          <button
            onClick={() => alert('Schedule exported to Google Calendar & Apple Calendar (.ics)!')}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-surface-container text-primary font-bold text-xs hover:bg-primary hover:text-white transition-all shadow-sm border border-slate-200"
          >
            <span className="material-symbols-outlined text-[18px]">calendar_add_on</span>
            <span>Sync Calendar (.ics)</span>
          </button>
        </div>
      </div>

      {/* Weekend notice */}
      {isWeekend && (
        <div className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800">
          <span className="material-symbols-outlined text-[22px]">weekend</span>
          <div>
            <p className="font-bold text-sm">It's the weekend — no classes today!</p>
            <p className="text-xs opacity-70">Your next classes resume on Monday.</p>
          </div>
        </div>
      )}

      {/* Active class banner */}
      {!isWeekend && (() => {
        const activeNow = timetable.find(
          (t) => getSessionStatus(t, nowInfo.day, nowInfo.minutes) === 'active'
        );
        const comingSoon = timetable.find(
          (t) => getSessionStatus(t, nowInfo.day, nowInfo.minutes) === 'soon'
        );
        if (activeNow) {
          return (
            <div className="flex items-center gap-4 px-5 py-4 rounded-2xl bg-green-50 border-2 border-green-400 shadow-md">
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-green-500 text-white shrink-0">
                <span className="material-symbols-outlined text-[20px]">sensors</span>
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-green-700 uppercase tracking-wider">🟢 Class in Progress Now</p>
                <p className="font-bold text-sm text-green-900 truncate">{activeNow.title}</p>
                <p className="text-xs text-green-700">{activeNow.time} · {activeNow.room} · {activeNow.instructor}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-green-500 text-white text-xs font-bold shrink-0 animate-pulse">LIVE</span>
            </div>
          );
        }
        if (comingSoon) {
          const range = parseTimeRange(comingSoon.time);
          const minsLeft = range ? range.start - nowInfo.minutes : '?';
          return (
            <div className="flex items-center gap-4 px-5 py-4 rounded-2xl bg-amber-50 border-2 border-amber-400 shadow-md">
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-400 text-white shrink-0">
                <span className="material-symbols-outlined text-[20px]">schedule</span>
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-amber-700 uppercase tracking-wider">⏳ Starting in ~{minsLeft} min</p>
                <p className="font-bold text-sm text-amber-900 truncate">{comingSoon.title}</p>
                <p className="text-xs text-amber-700">{comingSoon.time} · {comingSoon.room} · {comingSoon.instructor}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-amber-400 text-white text-xs font-bold shrink-0">SOON</span>
            </div>
          );
        }
        return null;
      })()}

      {/* Days Grid */}
      <div className="space-y-6">
        {days.map((day) => {
          const dayItems = timetable
            .filter((t) => t.day === day)
            .sort((a, b) => {
              const ra = parseTimeRange(a.time);
              const rb = parseTimeRange(b.time);
              return (ra?.start ?? 0) - (rb?.start ?? 0);
            });

          const isToday = day === nowInfo.day;

          return (
            <div
              key={day}
              className={`rounded-2xl p-5 border shadow-sm transition-all ${
                isToday
                  ? 'bg-primary/5 border-primary/30 shadow-primary/10'
                  : 'bg-surface-container-lowest border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${isToday ? 'bg-green-500 animate-pulse' : 'bg-primary'}`}></span>
                  <h3 className="font-headline-sm text-base font-bold text-on-surface">{day}</h3>
                  {isToday && (
                    <span className="ml-1 px-2 py-0.5 rounded-full bg-primary text-white text-[10px] font-bold">TODAY</span>
                  )}
                </div>
                <span className="text-xs font-semibold text-slate-500">
                  {dayItems.length} Sessions Scheduled
                </span>
              </div>

              {dayItems.length === 0 ? (
                <p className="text-xs text-slate-400 py-3 italic">Independent Study &amp; Research Day</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {dayItems.map((item) => {
                    const status = getSessionStatus(item, nowInfo.day, nowInfo.minutes);
                    const isActive = status === 'active';
                    const isSoon = status === 'soon';
                    const isDone = status === 'done';

                    return (
                      <div
                        key={item.id}
                        className={`p-4 rounded-xl border transition-all flex items-start justify-between relative overflow-hidden
                          ${isActive
                            ? 'bg-green-50 border-green-400 shadow-lg shadow-green-100 ring-2 ring-green-400'
                            : isSoon
                            ? 'bg-amber-50 border-amber-300 shadow-md'
                            : isDone
                            ? 'bg-slate-50 border-slate-200 opacity-60'
                            : 'bg-surface-container-low border-slate-200 hover:border-primary'
                          }
                        `}
                      >
                        {/* Active shimmer stripe */}
                        {isActive && (
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-500 rounded-l-xl" />
                        )}

                      <div className="pl-1 flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold
                              ${isActive ? 'bg-green-500 text-white' : 'bg-primary-fixed text-on-primary-fixed'}
                            `}>
                              {item.courseCode}
                            </span>
                            <span className={`text-xs font-bold ${isActive ? 'text-green-800' : 'text-slate-700'}`}>
                              {item.time}
                            </span>
                            {isActive && (
                              <span className="text-[10px] font-bold text-green-600 animate-pulse">● IN PROGRESS</span>
                            )}
                            {isSoon && (
                              <span className="text-[10px] font-bold text-amber-600">⏳ SOON</span>
                            )}
                            {isDone && (
                              <span className="text-[10px] font-bold text-slate-400">✓ Done</span>
                            )}
                          </div>
                          <h4 className={`font-headline-sm text-sm font-bold mt-1.5
                            ${isActive ? 'text-green-900' : 'text-on-surface'}
                          `}>
                            {item.title}
                          </h4>
                          <div className="flex items-center gap-3 mt-2 text-xs text-slate-500 flex-wrap">
                            <span className="flex items-center gap-1">
                              <span className="material-symbols-outlined text-[14px]">location_on</span>
                              <span>{item.room}</span>
                            </span>
                            <span>•</span>
                            <span>{item.instructor}</span>
                          </div>

                          {/* Join Live button — always shown */}
                          <button
                            onClick={() => setActiveLecture({
                              title: `${item.courseCode}: ${item.title}`,
                              speaker: item.instructor,
                              speakerTitle: item.room,
                              category: item.courseCode,
                              time: item.time,
                              badge: isActive ? '🔴 Live Now' : 'Class Recording',
                              courseCode: item.courseCode,
                            })}
                            className={`mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all
                              ${isActive
                                ? 'bg-green-500 text-white hover:bg-green-600 shadow-md shadow-green-200 animate-pulse'
                                : 'bg-primary/10 text-primary hover:bg-primary hover:text-white'
                              }
                            `}
                          >
                            <span className="material-symbols-outlined text-[15px]">play_circle</span>
                            {isActive ? 'Join Live Class' : 'Watch Lecture'}
                          </button>
                        </div>

                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ml-2 self-start
                          ${isActive ? 'bg-green-500 text-white animate-pulse' : 'bg-slate-200 text-slate-700'}
                        `}>
                          {isActive ? 'LIVE' : 'Lecture'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Lecture Player Modal */}
      <LecturePlayerModal
        lecture={activeLecture}
        isOpen={Boolean(activeLecture)}
        onClose={() => setActiveLecture(null)}
      />
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { courseService } from '../../api/api';
import LecturePlayerModal from '../../components/dashboard/LecturePlayerModal';

export default function DashboardCoursesPage() {
  const [courses, setCourses] = useState([]);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'syllabus'
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [activeLectureModal, setActiveLectureModal] = useState(null);
  const [auditModalOpen, setAuditModalOpen] = useState(false);

  useEffect(() => {
    courseService.getCourses()
      .then((res) => {
        if (res?.data) {
          setCourses(res.data);
          setSelectedCourse(res.data[0]);
        }
      })
      .catch((err) => console.warn('Could not load enrolled courses:', err));
  }, []);

  return (
    <div className="flex flex-col w-full gap-6 pb-16">
      
      {/* 1. Header & Controls */}
      <section className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5 text-on-surface-variant font-label-sm text-xs">
              <span className="hover:text-primary cursor-pointer">Academics</span>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="text-primary font-semibold">Enrolled Courses & Subjects</span>
            </div>
            <div className="flex items-center gap-3">
              <h1 className="font-headline-lg text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
                Active Curriculum & Modules
              </h1>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-xs font-semibold">
                6 Enrolled • 22.0 ECTS
              </span>
            </div>
          </div>

          {/* Quick Action CTAs & View Switcher */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center bg-surface-container-low p-1 rounded-xl shadow-sm border border-slate-200">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-label-sm text-xs font-semibold transition-all ${
                  viewMode === 'grid'
                    ? 'bg-surface-container-lowest text-on-surface shadow-sm text-primary'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">grid_view</span>
                <span>Card Grid</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('syllabus')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-label-sm text-xs font-semibold transition-all ${
                  viewMode === 'syllabus'
                    ? 'bg-surface-container-lowest text-on-surface shadow-sm text-primary'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">view_agenda</span>
                <span>Deep Syllabus</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => setAuditModalOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-surface-container-lowest text-on-surface font-semibold text-xs hover:bg-surface-container-high transition-all shadow-sm border border-slate-200"
            >
              <span className="material-symbols-outlined text-[18px] text-tertiary">swap_horiz</span>
              <span>Degree Audit</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {courses.map((c) => (
            <div
              key={c.code}
              className="bg-surface-container-lowest rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-44 overflow-hidden bg-slate-900">
                  <img
                    src={c.thumbnail}
                    alt={c.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-white font-bold text-[10px] tracking-wider uppercase">
                      {c.code}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-primary text-white font-semibold text-[10px]">
                      {c.credits} ECTS
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-headline-sm text-base font-bold text-on-surface line-clamp-1">
                    {c.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">{c.instructor} • {c.instructorRole}</p>
                  
                  <div className="mt-4 flex flex-col gap-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500">Progress</span>
                      <span className="font-bold text-primary">{c.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-primary to-tertiary h-full rounded-full transition-all duration-500"
                        style={{ width: `${c.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-600">
                    <span className="font-semibold text-slate-400 block text-[10px] uppercase">Upcoming Next:</span>
                    <p className="font-medium text-slate-800 truncate mt-0.5">{c.nextLesson}</p>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCourse(c);
                    setViewMode('syllabus');
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
                >
                  View Modules
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setActiveLectureModal({
                      title: `${c.code}: ${c.nextLesson}`,
                      speaker: c.instructor,
                      speakerTitle: c.instructorRole,
                      category: c.department,
                      time: 'Active Term Lecture',
                      badge: 'Live Virtual Lab',
                      courseCode: c.code,
                    })
                  }
                  className="px-4 py-2.5 rounded-xl bg-primary text-white font-semibold text-xs shadow-sm hover:bg-primary-container transition-all flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[16px]">play_arrow</span>
                  <span>Play Lab</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 3. Deep Syllabus View */}
      {viewMode === 'syllabus' && selectedCourse && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Course Selector Sidebar */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Select Enrolled Course
            </h3>
            {courses.map((c) => (
              <div
                key={c.code}
                onClick={() => setSelectedCourse(c)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  selectedCourse.code === c.code
                    ? 'border-primary bg-primary/5 shadow-sm ring-1 ring-primary'
                    : 'border-slate-200 bg-surface-container-lowest hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-primary">{c.code}</span>
                  <span className="text-xs font-semibold text-slate-500">{c.progress}%</span>
                </div>
                <h4 className="font-headline-sm text-sm font-bold text-on-surface mt-1 truncate">{c.title}</h4>
                <p className="text-xs text-slate-400 mt-0.5">{c.instructor}</p>
              </div>
            ))}
          </div>

          {/* Right Deep Syllabus Details */}
          <div className="lg:col-span-8 bg-surface-container-lowest rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed text-xs font-bold">
                    {selectedCourse.code}
                  </span>
                  <span className="text-xs text-slate-500">{selectedCourse.department}</span>
                  <span className="text-xs font-bold text-emerald-600">{selectedCourse.credits} Credits</span>
                </div>
                <h2 className="font-headline-lg text-xl sm:text-2xl font-extrabold text-on-surface mt-1">
                  {selectedCourse.title}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">Faculty Lead: {selectedCourse.instructor} • {selectedCourse.instructorRole}</p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setActiveLectureModal({
                    title: `${selectedCourse.code}: ${selectedCourse.nextLesson}`,
                    speaker: selectedCourse.instructor,
                    speakerTitle: selectedCourse.instructorRole,
                    category: selectedCourse.department,
                    time: '45 mins remaining',
                    badge: 'Interactive Lab Stream',
                    courseCode: selectedCourse.code,
                  })
                }
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-primary text-white font-bold text-xs shadow-md shadow-primary/20 hover:bg-primary-container transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">play_circle</span>
                <span>Continue Next Module</span>
              </button>
            </div>

            <div className="mt-6">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                Syllabus Modules & Computational Labs
              </h4>

              <div className="space-y-3">
                {selectedCourse.modules?.map((mod, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-slate-200 bg-surface-container-low hover:bg-surface-container transition-colors flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                          mod.isCompleted
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-primary-fixed text-primary'
                        }`}
                      >
                        {mod.isCompleted ? '✓' : idx + 1}
                      </div>
                      <div>
                        <h5 className="font-headline-sm text-sm font-bold text-on-surface">{mod.title}</h5>
                        <p className="text-xs text-slate-500">{mod.duration} • {mod.lessonsCount} lessons</p>
                      </div>
                    </div>

                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                        mod.isCompleted
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {mod.isCompleted ? 'Completed' : 'In Progress'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Degree Audit Modal */}
      {auditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-surface-container-lowest rounded-2xl p-6 sm:p-8 shadow-2xl border border-slate-200">
            <button
              onClick={() => setAuditModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
            >
              <span className="material-symbols-outlined text-[24px]">close</span>
            </button>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-tertiary-fixed text-tertiary flex items-center justify-center">
                <span className="material-symbols-outlined text-[22px]">verified</span>
              </div>
              <div>
                <h3 className="font-headline-sm text-lg font-bold text-on-surface">Degree Audit Progress</h3>
                <p className="text-xs text-slate-500">Track: AI & Neuroscience Dual Degree</p>
              </div>
            </div>

            <div className="space-y-4 my-6">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-700">Earned Credits</span>
                <span className="font-bold text-primary">88.0 / 120.0 ECTS (73%)</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-700">Cumulative GPA Standing</span>
                <span className="font-bold text-emerald-600">3.88 Honors</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-700">Graduation Projected</span>
                <span className="font-bold text-slate-800">Spring 2026</span>
              </div>
            </div>

            <button
              onClick={() => setAuditModalOpen(false)}
              className="w-full py-2.5 rounded-xl bg-primary text-white font-bold text-xs"
            >
              Close Audit
            </button>
          </div>
        </div>
      )}

      {/* Video Player Modal */}
      <LecturePlayerModal
        lecture={activeLectureModal}
        isOpen={Boolean(activeLectureModal)}
        onClose={() => setActiveLectureModal(null)}
      />
    </div>
  );
}

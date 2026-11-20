import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { courseService } from '../../api/api';

export default function CourseCatalogPage() {
  const [courses, setCourses] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedDept, setSelectedDept] = useState(searchParams.get('dept') || 'All');
  const [selectedTier, setSelectedTier] = useState('All');
  const [sortOption, setSortOption] = useState('popular');
  const [loading, setLoading] = useState(false);
  const [enrolledCourse, setEnrolledCourse] = useState(null);
  const navigate = useNavigate();

  const fetchCourses = () => {
    setLoading(true);
    const params = {};
    if (selectedDept !== 'All') params.department = selectedDept;
    if (selectedTier !== 'All') params.level = selectedTier;
    if (searchQuery) params.search = searchQuery;
    if (sortOption) params.sort = sortOption;

    courseService.getCourses(params)
      .then((res) => {
        if (res?.data) setCourses(res.data);
      })
      .catch((err) => console.warn('Could not load course catalog:', err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCourses();
  }, [selectedDept, selectedTier, sortOption]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchCourses();
  };

  const handleEnroll = async (c) => {
    try {
      await courseService.enroll(c.id || c.code);
      setEnrolledCourse(c);
      setTimeout(() => {
        setEnrolledCourse(null);
        navigate('/dashboard/courses');
      }, 1500);
    } catch {
      navigate('/dashboard/courses');
    }
  };

  const trendingTags = ['Deep Learning', 'PyTorch', 'Distributed Systems', 'Graph Algorithms', 'LLVM', 'Statistics'];

  return (
    <div className="w-full flex flex-col pt-[106px] min-h-screen bg-surface">
      
      {/* Toast Notification */}
      {enrolledCourse && (
        <div className="fixed top-24 right-6 z-50 p-4 rounded-2xl bg-emerald-600 text-white shadow-2xl flex items-center gap-3 animate-bounce">
          <span className="material-symbols-outlined text-[24px]">verified</span>
          <span className="text-sm font-bold">Enrolled in {enrolledCourse.code}: {enrolledCourse.title}!</span>
        </div>
      )}

      {/* IMMERSIVE ACADEMIC HEADER CANVAS */}
      <section className="relative overflow-hidden bg-surface-container-low px-4 sm:px-6 py-12 sm:py-16 border-b border-slate-200">
        <div className="max-w-7xl mx-auto w-full relative z-10">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-on-surface-variant font-label-md text-xs mb-3">
            <span className="hover:text-primary cursor-pointer">Academic Hub</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-primary font-semibold">Undergraduate & Graduate Curricula</span>
            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">
              Fall 2025 Syllabi
            </span>
          </div>

          <h1 className="font-display-lg text-3xl sm:text-4xl lg:text-[44px] lg:leading-[52px] font-extrabold text-on-surface tracking-tight">
            Explore 1,200+ Tier-One Academic & Industry Courses
          </h1>
          <p className="font-body-lg text-sm sm:text-base text-on-surface-variant mt-2 max-w-3xl leading-relaxed">
            Curated university curricula, AI-powered computational labs, and industry-recognized certifications taught by world-class professors and researchers.
          </p>

          {/* Integrated Search & Command Matrix */}
          <div className="mt-8 bg-surface-container-lowest p-4 rounded-2xl shadow-md border border-slate-200">
            <form onSubmit={handleSearchSubmit} className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center">
              
              <div className="relative flex-1">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-[22px]">
                  search
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by topic, syllabus code (e.g. CS-402), professor, or laboratory focus..."
                  className="w-full pl-11 pr-4 py-3 bg-surface-container-low rounded-xl text-on-surface placeholder:text-outline font-body-md text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                />
              </div>

              <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 shrink-0">
                <div className="relative min-w-[160px] w-full sm:w-auto">
                  <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="w-full appearance-none pl-3.5 pr-8 py-3 bg-surface-container-low text-on-surface font-label-md text-xs sm:text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer border border-transparent font-medium"
                  >
                    <option value="popular">Sort: Most Popular</option>
                    <option value="highest_rated">Sort: Highest Rated</option>
                    <option value="price_low">Sort: Free / Low Price</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-[18px]">
                    expand_more
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-6 py-3 bg-primary text-on-primary font-semibold text-xs sm:text-sm rounded-xl shadow-md hover:bg-primary-container transition-all"
                >
                  <span className="material-symbols-outlined text-[18px]">tune</span>
                  <span>Apply Filter</span>
                </button>
              </div>
            </form>

            {/* Trending Tracks Chips */}
            <div className="flex flex-wrap items-center gap-2 pt-3 mt-3 border-t border-slate-100">
              <span className="font-label-sm text-[11px] uppercase tracking-wider text-slate-400 font-bold">
                Trending Tracks:
              </span>
              {trendingTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => {
                    setSearchQuery(tag);
                    fetchCourses();
                  }}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-surface-container hover:bg-primary-fixed hover:text-primary text-slate-600 font-label-sm text-[11px] rounded-full transition-colors"
                >
                  <span>{tag}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CATALOG MATRIX LAYOUT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Left Facet Filters Sidebar */}
          <div className="space-y-6">
            
            {/* Department Filter */}
            <div className="bg-surface-container-lowest p-5 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="font-headline-sm text-sm font-bold text-on-surface uppercase tracking-wider mb-3">
                Academic Department
              </h3>
              <div className="space-y-1.5">
                {[
                  { label: 'All Departments', value: 'All' },
                  { label: 'AI & Data Science', value: 'AI & Data Science' },
                  { label: 'Computer Science', value: 'Computer Science' },
                  { label: 'Mathematics', value: 'Mathematics' },
                  { label: 'Engineering', value: 'Engineering' },
                ].map((dept) => (
                  <button
                    key={dept.value}
                    type="button"
                    onClick={() => setSelectedDept(dept.value)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-between ${
                      selectedDept === dept.value
                        ? 'bg-primary text-white shadow-sm'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <span>{dept.label}</span>
                    {selectedDept === dept.value && (
                      <span className="material-symbols-outlined text-[16px]">check</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Proficiency Tier */}
            <div className="bg-surface-container-lowest p-5 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="font-headline-sm text-sm font-bold text-on-surface uppercase tracking-wider mb-3">
                Proficiency Tier
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {['All', 'Beginner', 'Intermediate', 'Graduate'].map((tier) => (
                  <button
                    key={tier}
                    type="button"
                    onClick={() => setSelectedTier(tier)}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold text-center transition-all ${
                      selectedTier === tier
                        ? 'bg-primary-container text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {tier}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Degree Track Callout */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-primary/10 via-tertiary/10 to-primary/5 border border-primary/20">
              <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider mb-1">
                <span className="material-symbols-outlined text-[18px]">verified</span>
                <span>Dual Degree Track</span>
              </div>
              <h4 className="text-sm font-bold text-on-surface">AI & Neuroscience Dual Path</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Enroll in CS-402 and NEUR-410 together to qualify for automated Stanford track lab credentials.
              </p>
            </div>
          </div>

          {/* Right Courses Cards Grid */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                Showing {courses.length} Accredited Curricula
              </span>
              <span className="text-xs text-primary font-bold">Fall 2024–2025 Enrolling</span>
            </div>

            {loading ? (
              <div className="py-20 text-center text-sm text-slate-500">
                Loading academic curricula catalog...
              </div>
            ) : courses.length === 0 ? (
              <div className="py-20 text-center bg-surface-container-lowest rounded-2xl border border-slate-200">
                <span className="material-symbols-outlined text-slate-400 text-[42px] mx-auto block mb-2">
                  search_off
                </span>
                <p className="text-sm font-bold text-slate-700">No courses match your active filters.</p>
                <button
                  onClick={() => {
                    setSelectedDept('All');
                    setSelectedTier('All');
                    setSearchQuery('');
                  }}
                  className="mt-3 px-4 py-2 rounded-xl bg-primary text-white text-xs font-semibold"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {courses.map((course) => (
                  <div
                    key={course.id || course.code}
                    className="bg-surface-container-lowest rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="relative h-48 overflow-hidden bg-slate-900">
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3 flex gap-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-white font-bold text-[10px] tracking-wider uppercase">
                            {course.code}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full bg-primary text-white font-semibold text-[10px]">
                            {course.level}
                          </span>
                        </div>
                      </div>

                      <div className="p-5">
                        <h3 className="font-headline-sm text-base font-bold text-on-surface line-clamp-1 group-hover:text-primary transition-colors">
                          {course.title}
                        </h3>
                        <p className="text-xs text-slate-500 mt-1">{course.instructor} • {course.instructorRole}</p>
                        <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                          {course.description}
                        </p>

                        <div className="flex flex-wrap gap-1 mt-3">
                          {course.tags?.map((t) => (
                            <span key={t} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-medium">
                              {t}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between text-xs text-slate-500 mt-4 pt-3 border-t border-slate-100">
                          <span className="font-semibold text-amber-600">
                            ⭐ {course.rating} ({course.reviewCount})
                          </span>
                          <span>{course.credits} Credits • {course.durationHours} hrs</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-5 pt-0 flex items-center justify-between">
                      <div className="text-base font-extrabold text-primary">
                        {course.isFree ? (
                          <span className="text-emerald-600 font-bold uppercase text-xs">Free Access</span>
                        ) : (
                          `₹${course.price?.toLocaleString()}`
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => handleEnroll(course)}
                        className="px-4 py-2 rounded-xl bg-primary text-on-primary font-semibold text-xs shadow-sm hover:bg-primary-container transition-all"
                      >
                        Enroll Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

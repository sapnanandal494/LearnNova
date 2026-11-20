import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { courseService } from '../../api/api';
import { useAuth } from '../../context/AuthContext';

export default function LandingPage({ onOpenSearch }) {
  const [courses, setCourses] = useState([]);
  const [enrolledNotice, setEnrolledNotice] = useState('');
  const { openAuthModal } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    courseService.getCourses()
      .then((res) => {
        if (res?.data) setCourses(res.data);
      })
      .catch((err) => console.warn('Could not fetch landing courses:', err));
  }, []);

  const handleEnroll = async (course) => {
    try {
      await courseService.enroll(course.id || course.code);
      setEnrolledNotice(`🎉 Enrolled in ${course.code}: ${course.title}! Redirecting to dashboard...`);
      setTimeout(() => {
        navigate('/dashboard/courses');
      }, 1500);
    } catch {
      navigate('/dashboard/courses');
    }
  };

  const subjects = [
    { name: 'Computer Science', count: '420 Courses', icon: '💻', dept: 'cs' },
    { name: 'AI & Data Science', count: '280 Courses', icon: '🤖', dept: 'ai' },
    { name: 'Mathematics', count: '190 Courses', icon: '📐', dept: 'math' },
    { name: 'Cognitive Science', count: '140 Courses', icon: '🧠', dept: 'neuro' },
    { name: 'Compiler Engineering', count: '95 Courses', icon: '⚡', dept: 'eng' },
    { name: 'Applied Statistics', count: '160 Courses', icon: '📊', dept: 'stats' },
    { name: 'Cyber Security', count: '110 Courses', icon: '🛡️', dept: 'sec' },
    { name: 'Cloud & Systems', count: '135 Courses', icon: '☁️', dept: 'cloud' },
  ];

  const steps = [
    { num: '01', title: 'Curate Academic Path', desc: 'Select from 1,200+ university and industry accredited courses tailored to your graduation track.' },
    { num: '02', title: 'Learn with Top Faculty', desc: 'Engage with Turing Laureates, research directors, and real-time interactive computational labs.' },
    { num: '03', title: 'Automated CI Evaluations', desc: 'Submit coursework and capstone git repositories with instantaneous benchmark feedback.' },
    { num: '04', title: 'Accelerate Career', desc: 'Graduate with verified dual degree credentials recognized by global research and tech leaders.' },
  ];

  const testimonials = [
    { quote: "LearnNova's neural architectures curriculum enabled me to publish a research paper at NeurIPS. The automated CI code test suite is truly world class.", author: "Aarav Sharma", role: "AI Research Fellow, Stanford Track", rating: 5 },
    { quote: "The distributed systems course and Raft lab simulation gave our engineering team the exact rigor required for hyper-scale cloud deployment.", author: "Meera Patel", role: "Principal Cloud Engineer", rating: 5 },
    { quote: "Having continuous AI study synthesis alongside Turing laureate keynotes made high-stakes exam revisions effortless and deeply inspiring.", author: "Rohan Verma", role: "Computer Science Senior", rating: 5 },
  ];

  return (
    <div className="w-full flex flex-col pt-[106px]">
      
      {/* Toast Notification */}
      {enrolledNotice && (
        <div className="fixed top-24 right-6 z-50 p-4 rounded-2xl bg-emerald-600 text-white shadow-2xl flex items-center gap-3 animate-bounce">
          <span className="material-symbols-outlined text-[24px]">verified</span>
          <span className="text-sm font-bold">{enrolledNotice}</span>
        </div>
      )}

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-[#090d16] text-white py-16 lg:py-24">
        {/* Ambient Atmospheric Glows */}
        <div className="absolute -top-32 -left-20 w-96 h-96 rounded-full bg-blue-600/25 blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/2 -right-32 w-[32rem] h-[32rem] rounded-full bg-purple-600/20 blur-3xl pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Hero Copy */}
            <div className="lg:col-span-7 flex flex-col items-start space-y-6">
              
              <div className="inline-flex items-center space-x-2 bg-white/10 border border-white/15 px-3.5 py-1.5 rounded-full shadow-sm">
                <span className="text-xs font-semibold tracking-wider text-blue-300 uppercase">
                  ⭐ India's #1 Digital Learning Platform
                </span>
              </div>

              <h1 className="font-display-lg text-4xl sm:text-5xl lg:text-[56px] lg:leading-[64px] text-white tracking-tight font-extrabold">
                Your Future Begins<br />
                with <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">Learn Nova.</span>
              </h1>

              <p className="font-body-lg text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed">
                One platform for learning, teaching, academic growth, and discovering your potential. Trusted by 50,000+ students and researchers across India.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => openAuthModal('register')}
                  className="inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-primary to-tertiary-container text-white font-semibold text-sm shadow-lg shadow-primary/30 hover:opacity-95 transition-all hover:-translate-y-0.5"
                >
                  <span className="material-symbols-outlined text-[18px]">rocket_launch</span>
                  <span>Start Learning</span>
                </button>

                <Link
                  to="/courses"
                  className="inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl bg-white/10 text-white font-semibold text-sm hover:bg-white/20 transition-all border border-white/10"
                >
                  <span className="material-symbols-outlined text-[18px]">explore</span>
                  <span>Explore Courses</span>
                </Link>

                <button
                  type="button"
                  onClick={() => openAuthModal('teacher-login')}
                  className="inline-flex items-center justify-center space-x-2 px-5 py-3.5 rounded-xl text-slate-300 hover:text-white font-semibold text-sm transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">co_present</span>
                  <span>Join as Teacher</span>
                </button>
              </div>

              {/* Key Metrics Strip */}
              <div className="w-full pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 bg-white/5 p-5 rounded-2xl border border-white/10">
                <div>
                  <div className="font-headline-lg text-2xl sm:text-3xl font-extrabold text-white">50K+</div>
                  <div className="font-label-sm text-[11px] text-slate-400 uppercase tracking-wider mt-0.5">Students</div>
                </div>
                <div>
                  <div className="font-headline-lg text-2xl sm:text-3xl font-extrabold text-white">1,200+</div>
                  <div className="font-label-sm text-[11px] text-slate-400 uppercase tracking-wider mt-0.5">Courses</div>
                </div>
                <div>
                  <div className="font-headline-lg text-2xl sm:text-3xl font-extrabold text-white">500+</div>
                  <div className="font-label-sm text-[11px] text-slate-400 uppercase tracking-wider mt-0.5">Expert Teachers</div>
                </div>
                <div>
                  <div className="font-headline-lg text-2xl sm:text-3xl font-extrabold text-emerald-400">95%</div>
                  <div className="font-label-sm text-[11px] text-slate-400 uppercase tracking-wider mt-0.5">Success Rate</div>
                </div>
              </div>
            </div>

            {/* Right Glassmorphic Interactive Showcase Card */}
            <div className="lg:col-span-5 relative flex items-center justify-center py-6">
              
              {/* Floating Badge 1: Streak */}
              <div className="absolute -top-3 right-4 sm:right-10 bg-[#1e293b]/90 backdrop-blur-xl border border-white/15 rounded-2xl p-4 shadow-xl z-20 flex items-center gap-3 animate-bounce">
                <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[24px]">local_fire_department</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-orange-400">Daily Streak</span>
                  <div className="text-base font-extrabold text-white">12 Days 🔥</div>
                </div>
              </div>

              {/* Floating Badge 2: Achievement */}
              <div className="absolute -bottom-4 left-0 sm:left-4 bg-[#1e293b]/90 backdrop-blur-xl border border-white/15 rounded-2xl p-4 shadow-xl z-20 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[24px]">emoji_events</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">Achievement</span>
                  <div className="text-sm font-extrabold text-white">Quiz Champion 🏆</div>
                </div>
              </div>

              {/* Main Student Card */}
              <div className="w-full max-w-sm rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-white/15 p-6 backdrop-blur-2xl shadow-2xl text-center relative z-10">
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-3xl mb-3 shadow-lg">
                  🎓
                </div>
                <h3 className="text-lg font-bold text-white">Alex Johnson</h3>
                <p className="text-xs text-slate-400">B.Sc Computer Science</p>
                
                <div className="mt-4 p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-semibold flex items-center justify-center gap-1.5">
                  <span className="material-symbols-outlined text-emerald-400 text-[18px]">check_circle</span>
                  <span>Learning Progress: 78%</span>
                </div>

                <div className="w-full bg-white/10 h-2 rounded-full mt-3 overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full" style={{ width: '78%' }}></div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-2 text-left">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">Active Lab</span>
                    <p className="text-xs font-bold text-white mt-0.5 truncate">PyTorch Autograd</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">GPA Standing</span>
                    <p className="text-xs font-bold text-emerald-400 mt-0.5">3.88 / 4.00</p>
                  </div>
                </div>

                <Link
                  to="/dashboard"
                  className="mt-5 w-full block py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-md transition-colors"
                >
                  View Live Dashboard Preview
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TOP-RATED COURSES SECTION */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="font-label-sm text-xs font-bold text-primary uppercase tracking-wider block mb-1">
                📚 Featured Curricula
              </span>
              <h2 className="font-headline-lg text-3xl font-extrabold text-on-surface tracking-tight">
                Top-Rated Academic Courses
              </h2>
              <p className="font-body-md text-sm text-slate-500 mt-1 max-w-xl">
                Explore our most popular, peer-reviewed courses taught by world-class professors and researchers.
              </p>
            </div>
            <Link
              to="/courses"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-primary text-primary font-semibold text-xs hover:bg-primary hover:text-white transition-all self-start md:self-auto"
            >
              <span>View All 1,200+ Courses</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.slice(0, 6).map((c) => (
              <div
                key={c.id || c.code}
                className="bg-surface-container-lowest rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-44 overflow-hidden bg-slate-900">
                    <img
                      src={c.thumbnail}
                      alt={c.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white font-bold text-[10px] tracking-wider uppercase">
                        {c.code}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-primary text-white font-semibold text-[10px]">
                        {c.department}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="font-headline-sm text-base font-bold text-on-surface line-clamp-1 group-hover:text-primary transition-colors">
                      {c.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px] text-slate-400">person</span>
                      <span>{c.instructor}</span>
                    </p>

                    <div className="flex items-center gap-4 text-xs text-slate-500 mt-3 pt-3 border-t border-slate-100">
                      <span className="flex items-center gap-1 font-semibold text-amber-600">
                        ⭐ {c.rating} ({c.reviewCount})
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">group</span>
                        {c.enrolledCount}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">schedule</span>
                        {c.durationHours} hrs
                      </span>
                    </div>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-2 flex items-center justify-between">
                  <div className="text-base font-extrabold text-primary">
                    {c.isFree ? (
                      <span className="text-emerald-600 font-bold uppercase text-xs">Free Access</span>
                    ) : (
                      `₹${c.price.toLocaleString()}`
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleEnroll(c)}
                    className="px-4 py-2 rounded-xl bg-primary text-on-primary font-semibold text-xs shadow-sm hover:bg-primary-container transition-all"
                  >
                    Enroll Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPLORE SUBJECTS GRID */}
      <section className="py-16 bg-surface-container-low border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="font-label-sm text-xs font-bold text-primary uppercase tracking-wider">
              Academic Departments
            </span>
            <h2 className="font-headline-lg text-2xl sm:text-3xl font-extrabold text-on-surface mt-1">
              Browse by Academic Discipline
            </h2>
            <p className="font-body-md text-xs sm:text-sm text-slate-500 mt-1">
              Curated department tracks with dedicated computational laboratories
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {subjects.map((sub, i) => (
              <Link
                key={i}
                to={`/courses?dept=${sub.dept}`}
                className="p-5 rounded-2xl bg-surface-container-lowest border border-slate-200 shadow-sm hover:shadow-md hover:border-primary transition-all text-center group cursor-pointer"
              >
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{sub.icon}</div>
                <h4 className="font-headline-sm text-sm font-bold text-on-surface group-hover:text-primary transition-colors">
                  {sub.name}
                </h4>
                <p className="text-xs text-slate-400 mt-1">{sub.count}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* HOW LEARNNOVA WORKS */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="font-label-sm text-xs font-bold text-primary uppercase tracking-wider">
              Educational Architecture
            </span>
            <h2 className="font-headline-lg text-3xl font-extrabold text-on-surface mt-1">
              How LearnNova Accelerates Learning
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((st, i) => (
              <div key={i} className="p-6 rounded-2xl bg-surface-container-lowest border border-slate-200 shadow-sm relative">
                <span className="text-3xl font-black text-slate-200 absolute top-4 right-4">{st.num}</span>
                <div className="w-10 h-10 rounded-xl bg-primary-fixed text-primary flex items-center justify-center font-bold mb-4">
                  {i + 1}
                </div>
                <h4 className="font-headline-sm text-base font-bold text-on-surface mb-2">{st.title}</h4>
                <p className="font-body-sm text-xs text-slate-500 leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STUDENT & FACULTY TESTIMONIALS */}
      <section className="py-16 bg-[#090d16] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="font-label-sm text-xs font-bold text-blue-400 uppercase tracking-wider">
              Peer Endorsements
            </span>
            <h2 className="font-headline-lg text-3xl font-extrabold text-white mt-1">
              Trusted by 50,000+ Students & Scholars
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl flex flex-col justify-between">
                <div className="mb-4">
                  <div className="flex text-amber-400 mb-3 text-xs">
                    {'★'.repeat(t.rating)}
                  </div>
                  <p className="text-sm text-slate-300 italic leading-relaxed">"{t.quote}"</p>
                </div>
                <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center font-bold text-white text-sm">
                    {t.author.charAt(0)}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white">{t.author}</h5>
                    <p className="text-[10px] text-slate-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-headline-lg text-2xl sm:text-3xl font-extrabold mb-3">
            Stay Ahead in AI & Computer Science
          </h2>
          <p className="text-sm text-blue-100 max-w-lg mx-auto mb-6">
            Subscribe to receive weekly curated research digests, Turing keynote alerts, and new course syllabi.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert('Thank you for subscribing to the LearnNova Academic Dispatch!');
            }}
            className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
          >
            <input
              type="email"
              required
              placeholder="Enter your academic email..."
              className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/30 text-white placeholder-blue-200 text-sm focus:outline-none focus:bg-white/20"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-white text-blue-800 font-bold text-sm shadow-lg hover:bg-blue-50 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

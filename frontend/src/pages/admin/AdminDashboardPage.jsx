import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function useAdminApi(endpoint) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('adminToken');

  const refetch = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/admin/${endpoint}`, {
        headers: { 'x-admin-token': token },
      });
      setData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { refetch(); }, []);
  return { data, loading, refetch };
}

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const adminUser = JSON.parse(localStorage.getItem('adminUser') || '{}');
  const token = localStorage.getItem('adminToken');

  const { data: stats } = useAdminApi('stats');
  const { data: users, refetch: refetchUsers } = useAdminApi('users');
  const { data: courses, refetch: refetchCourses } = useAdminApi('courses');
  const { data: announcements } = useAdminApi('announcements');

  useEffect(() => {
    if (!localStorage.getItem('adminToken')) navigate('/admin/login');
  }, []);

  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  const toggleUser = async (id) => {
    await axios.patch(`/api/admin/users/${id}/toggle`, {}, { headers: { 'x-admin-token': token } });
    refetchUsers();
  };

  const deleteUser = async (id) => {
    if (!window.confirm('Delete this user permanently?')) return;
    await axios.delete(`/api/admin/users/${id}`, { headers: { 'x-admin-token': token } });
    refetchUsers();
  };

  const toggleCourse = async (id) => {
    await axios.patch(`/api/admin/courses/${id}/toggle`, {}, { headers: { 'x-admin-token': token } });
    refetchCourses();
  };

  const tabs = [
    { id: 'overview',      label: 'Overview',      icon: 'dashboard' },
    { id: 'users',         label: 'Users',          icon: 'people' },
    { id: 'courses',       label: 'Courses',        icon: 'menu_book' },
    { id: 'announcements', label: 'Announcements',  icon: 'campaign' },
    { id: 'contact',       label: 'Contact Info',   icon: 'contact_mail' },
  ];

  const statCards = stats ? [
    { label: 'Total Users',    value: stats.totalUsers,       icon: 'people',      color: 'from-blue-600 to-blue-800' },
    { label: 'Active Courses', value: stats.totalCourses,     icon: 'menu_book',   color: 'from-purple-600 to-purple-800' },
    { label: 'Assignments',    value: stats.totalAssignments, icon: 'assignment',  color: 'from-amber-600 to-amber-800' },
    { label: 'Quizzes',        value: stats.totalQuizzes,     icon: 'quiz',        color: 'from-emerald-600 to-emerald-800' },
    { label: 'Lectures',       value: stats.totalLectures,    icon: 'play_circle', color: 'from-red-600 to-red-800' },
    { label: 'Avg GPA',        value: stats.averageGPA,       icon: 'grade',       color: 'from-teal-600 to-teal-800' },
  ] : [];

  return (
    <div
      className="min-h-screen text-white"
      style={{ background: 'radial-gradient(ellipse at 20% 0%, #0f1f4a 0%, #060b18 50%)' }}
    >
      {/* Top Nav */}
      <header className="border-b border-white/10 bg-black/30 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-red-600 to-orange-500 flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">admin_panel_settings</span>
            </div>
            <div>
              <span className="font-bold text-sm">LearnNova <span className="text-red-400">Admin</span></span>
              <span className="ml-2 px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 text-[10px] font-bold">SUPERADMIN</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-slate-400 hidden sm:block">
              Logged in as <span className="text-white font-semibold">{adminUser.username}</span>
            </span>
            <Link to="/" className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors">
              <span className="material-symbols-outlined text-[16px]">open_in_new</span>
              <span className="hidden sm:inline">View Site</span>
            </Link>
            <button
              onClick={logout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white text-xs font-semibold transition-all"
            >
              <span className="material-symbols-outlined text-[16px]">logout</span>
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-1 p-1 bg-white/5 rounded-2xl border border-white/10 mb-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap flex-1 justify-center sm:flex-none ${
                activeTab === tab.id
                  ? 'bg-white/15 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-extrabold mb-1">System Overview</h2>
              <p className="text-sm text-slate-400">Real-time statistics across the LearnNova platform.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {statCards.map((card) => (
                <div key={card.label} className={`p-5 rounded-2xl bg-gradient-to-br ${card.color} shadow-lg flex flex-col gap-2`}>
                  <span className="material-symbols-outlined text-[28px] text-white/70">{card.icon}</span>
                  <span className="text-2xl font-extrabold text-white">{card.value}</span>
                  <span className="text-xs text-white/70 font-medium">{card.label}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
                <h3 className="font-bold text-base mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px] text-blue-400">security</span>
                  Admin Access Control
                </h3>
                <div className="space-y-3 text-sm">
                  {['User Management','Course Management','Content Moderation','Analytics & Reports','System Configuration'].map((item) => (
                    <div key={item} className="flex justify-between items-center py-2 border-b border-white/5">
                      <span className="text-slate-300">{item}</span>
                      <span className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 text-xs font-bold">✓ Full Access</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
                <h3 className="font-bold text-base mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px] text-amber-400">notifications_active</span>
                  Recent Activity
                </h3>
                <div className="space-y-3">
                  {[
                    { action: 'New user registered', time: '2 mins ago', icon: 'person_add', color: 'text-blue-400' },
                    { action: 'Course CS-402 updated', time: '15 mins ago', icon: 'edit', color: 'text-purple-400' },
                    { action: 'Assignment submitted', time: '1 hr ago', icon: 'assignment_turned_in', color: 'text-green-400' },
                    { action: 'Quiz completed by Elena', time: '2 hrs ago', icon: 'quiz', color: 'text-amber-400' },
                    { action: 'Lecture uploaded', time: '5 hrs ago', icon: 'upload', color: 'text-red-400' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 py-1.5">
                      <span className={`material-symbols-outlined text-[18px] ${item.color}`}>{item.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-slate-200 truncate">{item.action}</p>
                        <p className="text-xs text-slate-500">{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* USERS */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-extrabold mb-1">User Management</h2>
                <p className="text-sm text-slate-400">View, activate, deactivate, or remove platform users.</p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-all">
                <span className="material-symbols-outlined text-[16px]">person_add</span> Add User
              </button>
            </div>

            <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5">
                      {['User','Role','GPA','Courses','Status','Actions'].map((h) => (
                        <th key={h} className="text-left px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {(users || []).map((user) => (
                      <tr key={user.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full object-cover border border-white/10" />
                            <div>
                              <p className="font-semibold text-white text-sm">{user.name}</p>
                              <p className="text-xs text-slate-500">{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${user.role === 'teacher' ? 'bg-purple-500/20 text-purple-300' : 'bg-blue-500/20 text-blue-300'}`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-slate-300 font-mono text-sm">{user.gpa}</td>
                        <td className="px-5 py-4 text-slate-400 text-xs">{user.enrolledCourses?.length || 0} courses</td>
                        <td className="px-5 py-4">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${user.isActive !== false ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                            {user.isActive !== false ? '● Active' : '○ Inactive'}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => toggleUser(user.id)}
                              className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all ${user.isActive !== false ? 'bg-amber-500/20 text-amber-400 hover:bg-amber-500 hover:text-black' : 'bg-green-500/20 text-green-400 hover:bg-green-500 hover:text-black'}`}
                            >
                              {user.isActive !== false ? 'Deactivate' : 'Activate'}
                            </button>
                            <button
                              onClick={() => deleteUser(user.id)}
                              className="px-3 py-1 rounded-lg text-[11px] font-bold bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-all"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* COURSES */}
        {activeTab === 'courses' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-extrabold mb-1">Course Management</h2>
                <p className="text-sm text-slate-400">Control course visibility and manage content.</p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-bold hover:bg-purple-700 transition-all">
                <span className="material-symbols-outlined text-[16px]">add</span> Add Course
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(courses || []).map((course) => (
                <div
                  key={course.id}
                  className={`bg-white/5 rounded-2xl border p-5 transition-all ${course.isHidden ? 'border-red-500/30 opacity-60' : 'border-white/10'}`}
                >
                  <div className="flex items-start gap-3">
                    <img src={course.thumbnail} alt={course.title} className="w-14 h-14 rounded-xl object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold text-blue-400 uppercase">{course.code}</span>
                      <h4 className="font-bold text-sm text-white mt-0.5 line-clamp-1">{course.title}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">{course.instructor}</p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-slate-400">
                        <span>⭐ {course.rating}</span>
                        <span>👥 {course.enrolledCount?.toLocaleString()}</span>
                        <span>{course.credits} Credits</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${course.isHidden ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                        {course.isHidden ? 'Hidden' : 'Live'}
                      </span>
                      <button
                        onClick={() => toggleCourse(course.id)}
                        className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all ${course.isHidden ? 'bg-green-500/20 text-green-400 hover:bg-green-500 hover:text-black' : 'bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white'}`}
                      >
                        {course.isHidden ? '▲ Publish' : '▼ Hide'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ANNOUNCEMENTS */}
        {activeTab === 'announcements' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-extrabold mb-1">Announcements</h2>
                <p className="text-sm text-slate-400">Manage platform-wide announcements shown in the navbar banner.</p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-600 text-white text-xs font-bold hover:bg-amber-700 transition-all">
                <span className="material-symbols-outlined text-[16px]">add</span> New Announcement
              </button>
            </div>

            <div className="space-y-3">
              {(announcements || []).map((ann) => (
                <div
                  key={ann.id}
                  className={`flex items-center justify-between p-5 rounded-2xl border transition-all ${ann.active ? 'bg-amber-500/5 border-amber-500/30' : 'bg-white/3 border-white/10 opacity-60'}`}
                >
                  <div className="flex items-center gap-4">
                    <span className={`w-3 h-3 rounded-full shrink-0 ${ann.active ? 'bg-amber-400 animate-pulse' : 'bg-slate-600'}`}></span>
                    <div>
                      <p className="font-semibold text-sm text-white">{ann.title}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{ann.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${ann.active ? 'bg-green-500/20 text-green-400' : 'bg-slate-600/40 text-slate-500'}`}>
                      {ann.active ? 'Active' : 'Draft'}
                    </span>
                    <button className="p-1.5 rounded-lg bg-white/10 text-slate-300 hover:bg-white/20 transition-all">
                      <span className="material-symbols-outlined text-[16px]">edit</span>
                    </button>
                    <button className="p-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-all">
                      <span className="material-symbols-outlined text-[16px]">delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CONTACT INFO */}
        {activeTab === 'contact' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-extrabold mb-1">Contact & Address Information</h2>
              <p className="text-sm text-slate-400">Manage institution contact details shown on the public site.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: 'Institution Name',    value: 'LearnNova Educational Institute',                     icon: 'school' },
                { label: 'Main Campus Address', value: '42 Innovation Drive, Tech District\nSan Francisco, CA 94105, USA', icon: 'location_on' },
                { label: 'Main Phone',          value: '+1 (415) 555-0192',                                   icon: 'phone' },
                { label: 'Support Email',       value: 'support@learnnova.edu',                                icon: 'email' },
                { label: 'Admissions Email',    value: 'admissions@learnnova.edu',                             icon: 'mail' },
                { label: 'Working Hours',       value: 'Mon–Fri: 8:00 AM – 6:00 PM (PST)',                    icon: 'schedule' },
              ].map((item) => (
                <div key={item.label} className="bg-white/5 rounded-2xl border border-white/10 p-5 flex items-start gap-4">
                  <span className="material-symbols-outlined text-[22px] text-blue-400 mt-0.5 shrink-0">{item.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">{item.label}</p>
                    <p className="text-sm text-white font-medium whitespace-pre-line">{item.value}</p>
                  </div>
                  <button className="p-1.5 rounded-lg bg-white/10 text-slate-300 hover:bg-white/20 transition-all shrink-0">
                    <span className="material-symbols-outlined text-[16px]">edit</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

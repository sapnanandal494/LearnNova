import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AdminLoginPage() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await axios.post('/api/admin/login', form);
      if (res.data.success) {
        localStorage.setItem('adminToken', res.data.token);
        localStorage.setItem('adminUser', JSON.stringify(res.data.admin));
        navigate('/admin/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Check credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: 'radial-gradient(ellipse at 50% 0%, #0f1f4a 0%, #060b18 60%)' }}
    >
      {/* Background grid */}
      <div
        className="fixed inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(99,102,241,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.3) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-red-600 to-orange-500 shadow-2xl shadow-red-900/50 mb-4">
            <span className="material-symbols-outlined text-[32px] text-white">admin_panel_settings</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Learn<span className="text-red-400">Nova</span> Admin
          </h1>
          <p className="text-sm text-slate-400 mt-1">Restricted Access · Superadmin Portal</p>
        </div>

        {/* Card */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl p-8">
          <div className="flex items-center gap-2 mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/20">
            <span className="material-symbols-outlined text-[18px] text-red-400">warning</span>
            <p className="text-xs text-red-300 font-medium">Authorized personnel only. All access is logged.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Admin Username</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-[18px] text-slate-500">manage_accounts</span>
                <input
                  type="text"
                  value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                  placeholder="admin"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-red-500/60 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Admin Password</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-[18px] text-slate-500">lock</span>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••••••"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-red-500/60 transition-all"
                />
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs font-medium flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px]">error</span>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold text-sm shadow-lg shadow-red-900/40 hover:opacity-90 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  Authenticating...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px]">shield_person</span>
                  Access Admin Panel
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-white/10 text-center space-y-2">
            <p className="text-xs text-slate-500">
              Credentials: <span className="text-slate-300 font-mono">admin</span> /{' '}
              <span className="text-slate-300 font-mono">Admin@LearnNova2024</span>
            </p>
            <a
              href="/"
              className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-300 transition-colors"
            >
              <span className="material-symbols-outlined text-[14px]">arrow_back</span>
              Back to LearnNova
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

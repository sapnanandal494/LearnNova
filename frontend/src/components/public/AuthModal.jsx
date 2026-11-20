import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function AuthModal() {
  const { authModal, closeAuthModal, login, register } = useAuth();
  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(authModal.mode === 'register');
  const [role, setRole] = useState(authModal.mode.includes('teacher') ? 'teacher' : 'student');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  if (!authModal.isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');

    try {
      if (isRegister) {
        await register({ name, email, password, role });
      } else {
        await login(email, password, role);
      }
      closeAuthModal();
      navigate('/dashboard');
    } catch (err) {
      setMsg(err.message || 'Authentication error');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemoLogin = async (demoRole = 'student') => {
    setLoading(true);
    const demoEmail = demoRole === 'teacher' ? 'james.wilson@learnnova.edu' : 'elena.vance@learnnova.edu';
    await login(demoEmail, 'password123', demoRole);
    setLoading(false);
    closeAuthModal();
    navigate('/dashboard');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
      <div className="relative w-full max-w-md bg-surface-container-lowest rounded-2xl p-6 sm:p-8 shadow-2xl border border-slate-200">
        
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors p-1"
        >
          <span className="material-symbols-outlined text-[24px]">close</span>
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-tr from-primary to-tertiary flex items-center justify-center text-white shadow-md mb-3">
            <span className="material-symbols-outlined text-[28px]">
              {role === 'teacher' ? 'chalkboard' : 'school'}
            </span>
          </div>
          <h2 className="font-headline-md text-headline-md font-bold text-on-surface">
            {isRegister ? 'Join LearnNova' : `${role === 'teacher' ? 'Teacher' : 'Student'} Login`}
          </h2>
          <p className="font-body-sm text-body-sm text-slate-500 mt-1">
            Access your courses, AI study copilot, and evaluation archives
          </p>
        </div>

        {/* Role Toggle */}
        <div className="flex bg-slate-100 p-1 rounded-xl mb-5">
          <button
            type="button"
            onClick={() => setRole('student')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              role === 'student' ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            🎓 Student
          </button>
          <button
            type="button"
            onClick={() => setRole('teacher')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              role === 'teacher' ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            👨‍🏫 Faculty / Teacher
          </button>
        </div>

        {msg && (
          <div className="p-3 mb-4 rounded-lg bg-red-50 text-red-700 text-xs font-medium">
            {msg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1 uppercase tracking-wider">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Elena Vance"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1 uppercase tracking-wider">
              Academic Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={role === 'teacher' ? 'prof.wilson@learnnova.edu' : 'elena.vance@learnnova.edu'}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1 uppercase tracking-wider">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-primary-container text-white font-semibold text-sm shadow-md shadow-primary/30 hover:opacity-95 transition-all"
          >
            {loading ? 'Processing...' : isRegister ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        {/* Quick Demo Login Preset Buttons */}
        <div className="mt-5 pt-4 border-t border-slate-200">
          <p className="text-[11px] text-center uppercase tracking-wider font-semibold text-slate-400 mb-2">
            One-Click Instant Demo Login
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('student')}
              className="px-3 py-2 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-medium text-center transition-colors border border-blue-200"
            >
              ⚡ Elena Vance (Student)
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('teacher')}
              className="px-3 py-2 rounded-lg bg-purple-50 text-purple-700 hover:bg-purple-100 text-xs font-medium text-center transition-colors border border-purple-200"
            >
              ⚡ Dr. Wilson (Faculty)
            </button>
          </div>
        </div>

        {/* Switch between Login and Register */}
        <div className="text-center mt-5 text-xs text-slate-500">
          {isRegister ? (
            <span>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setIsRegister(false)}
                className="text-primary font-semibold hover:underline"
              >
                Sign In
              </button>
            </span>
          ) : (
            <span>
              Don't have an account yet?{' '}
              <button
                type="button"
                onClick={() => setIsRegister(true)}
                className="text-primary font-semibold hover:underline"
              >
                Register Now
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

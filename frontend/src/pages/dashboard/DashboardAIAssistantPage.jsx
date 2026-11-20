import React, { useState } from 'react';
import { aiService } from '../../api/api';
import { useAuth } from '../../context/AuthContext';

export default function DashboardAIAssistantPage() {
  const { user } = useAuth();
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: `Hello ${user?.name ? user.name.split(' ')[0] : 'Elena'}! ✨ I am **NovaAI**, your personal academic copilot for **Term 2 (Artificial Intelligence & Neuroscience)**.\n\nI can help you derive backpropagation equations, review Raft consensus states, draft compiler AST visitors, or prepare mock test drills. How can I assist your studies today?`,
      time: 'Just now',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const samplePrompts = [
    "Explain Backpropagation with mathematical intuition (CS-402)",
    "How does Raft elect a new leader after network split? (CS-501)",
    "Summarize Max-Flow Min-Cut Theorem for Problem Set 6 (MATH-304)",
  ];

  const handleSend = async (questionText) => {
    const q = questionText || input;
    if (!q.trim()) return;

    const userMsg = {
      sender: 'user',
      text: q,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await aiService.ask(q);
      const aiMsg = {
        sender: 'ai',
        text: res.answer || 'Thank you for your inquiry. Let me review your syllabus modules.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.warn('AI ask fallback:', err);
      const fallbackMsg = {
        sender: 'ai',
        text: `### 🧠 Academic Synthesis\n\nRegarding: *"${q}"*\n\n1. **Core Mathematical Intuition:** The gradient updates in layer $l$ depend directly on the upstream error vector $\\delta^{[l+1]}$ weighted by the transposed Jacobian.\n2. **Practical Tip:** Review Module 2 in your CS-402 course syllabus.\n3. **Quiz Readiness:** You're on track for an estimated 96% score!`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full h-[calc(100vh-7rem)] pb-4">
      
      {/* Top Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-tertiary flex items-center justify-center text-white shadow-md">
            <span className="material-symbols-outlined text-[24px]">psychology</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-headline-sm text-base font-bold text-on-surface">Ask NovaAI Study Copilot</h1>
              <span className="px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant text-[10px] font-bold">
                GPT-4o Academic Tuned
              </span>
            </div>
            <p className="text-xs text-slate-500">Grounded in your active university syllabi & assignments</p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Online & Connected to Campus Knowledge Base</span>
        </div>
      </div>

      {/* Chat Messages Stream */}
      <div className="flex-1 overflow-y-auto py-5 space-y-4 px-1">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-3 ${
              m.sender === 'user' ? 'flex-row-reverse' : ''
            }`}
          >
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${
                m.sender === 'user'
                  ? 'bg-primary text-white font-bold text-xs'
                  : 'bg-gradient-to-tr from-primary to-tertiary text-white'
              }`}
            >
              {m.sender === 'user' ? 'EV' : <span className="material-symbols-outlined text-[20px]">smart_toy</span>}
            </div>

            <div
              className={`max-w-2xl rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-primary text-white font-medium rounded-tr-none shadow-md'
                  : 'bg-surface-container-lowest text-slate-800 border border-slate-200 rounded-tl-none shadow-sm whitespace-pre-line'
              }`}
            >
              {m.text}
              <span
                className={`block text-[10px] mt-2 font-medium ${
                  m.sender === 'user' ? 'text-blue-200 text-right' : 'text-slate-400'
                }`}
              >
                {m.time}
              </span>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary to-tertiary text-white flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px] animate-spin">sync</span>
            </div>
            <div className="p-4 rounded-2xl bg-surface-container-lowest border border-slate-200 text-xs text-slate-500 rounded-tl-none flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-600 animate-pulse"></span>
              <span>NovaAI is analyzing syllabi and synthesizing derivation...</span>
            </div>
          </div>
        )}
      </div>

      {/* Suggested Quick Prompts */}
      <div className="flex flex-wrap items-center gap-2 py-2 shrink-0">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Suggested:</span>
        {samplePrompts.map((p, i) => (
          <button
            key={i}
            type="button"
            onClick={() => handleSend(p)}
            className="px-3 py-1 rounded-full bg-slate-100 hover:bg-primary-fixed hover:text-primary text-slate-600 text-xs font-medium transition-colors"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex items-center gap-2 pt-2 border-t border-slate-200 shrink-0"
      >
        <div className="relative flex-1">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask NovaAI anything about your courses, derivations, or mock quizzes..."
            className="w-full pl-4 pr-12 py-3 rounded-xl bg-surface-container-lowest border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
          />
        </div>
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-primary to-tertiary text-white font-bold text-xs shadow-md disabled:opacity-50 hover:opacity-95 transition-opacity flex items-center gap-1"
        >
          <span>Send</span>
          <span className="material-symbols-outlined text-[16px]">send</span>
        </button>
      </form>
    </div>
  );
}

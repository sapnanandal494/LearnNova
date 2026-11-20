import React, { useState } from 'react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-surface min-h-screen">

      {/* Hero */}
      <section
        className="relative py-24 px-6 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #090d16 0%, #0f1f4a 50%, #090d16 100%)' }}
      >
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold mb-4 border border-blue-500/30">
            <span className="material-symbols-outlined text-[16px]">contact_support</span>
            Get in Touch
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Contact <span className="text-blue-400">LearnNova</span>
          </h1>
          <p className="text-slate-400 text-base mt-4 max-w-xl mx-auto">
            Reach out for admissions, support, partnerships, or general inquiries. We're here to help you every step of the way.
          </p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="max-w-6xl mx-auto px-6 -mt-10 relative z-10 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              icon: 'location_on',
              label: 'Campus Address',
              value: '42 Innovation Drive, Tech District\nSan Francisco, CA 94105, USA',
              color: 'text-blue-400',
              bg: 'bg-blue-500/10 border-blue-500/20',
            },
            {
              icon: 'phone',
              label: 'Phone Numbers',
              value: '+1 (415) 555-0192\n+1 (415) 555-0180',
              color: 'text-green-400',
              bg: 'bg-green-500/10 border-green-500/20',
            },
            {
              icon: 'email',
              label: 'Email',
              value: 'support@learnnova.edu\nadmissions@learnnova.edu',
              color: 'text-purple-400',
              bg: 'bg-purple-500/10 border-purple-500/20',
            },
            {
              icon: 'schedule',
              label: 'Office Hours',
              value: 'Mon–Fri: 8:00 AM – 6:00 PM\nSat: 9:00 AM – 1:00 PM (PST)',
              color: 'text-amber-400',
              bg: 'bg-amber-500/10 border-amber-500/20',
            },
          ].map((card) => (
            <div key={card.label} className={`${card.bg} border rounded-2xl p-5 backdrop-blur-sm shadow-lg`}>
              <span className={`material-symbols-outlined text-[28px] ${card.color} mb-3 block`}>{card.icon}</span>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{card.label}</p>
              <p className="text-sm font-medium text-on-surface whitespace-pre-line leading-relaxed">{card.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Map + Form */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Google Map */}
          <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-lg relative bg-slate-100" style={{ minHeight: '400px' }}>
            <iframe
              title="LearnNova Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.835434509372!2d-122.39943908434512!3d37.78587997975717!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085807abad77c5b%3A0x9909d8bd7af8bb31!2sSalesforce%20Tower!5e0!3m2!1sen!2sus!4v1699900000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '400px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="absolute bottom-4 left-4 bg-white rounded-xl px-4 py-2.5 shadow-lg border border-slate-200">
              <p className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <span className="text-red-500">📍</span> LearnNova Main Campus
              </p>
              <p className="text-xs text-slate-500">42 Innovation Drive, SF, CA 94105</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-surface-container-lowest rounded-2xl border border-slate-200 p-8 shadow-sm">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <span className="material-symbols-outlined text-[36px] text-green-500">check_circle</span>
                </div>
                <h3 className="text-xl font-bold text-on-surface mb-2">Message Sent!</h3>
                <p className="text-sm text-secondary">
                  Thank you, <strong>{form.name}</strong>! We'll get back to you at <strong>{form.email}</strong> within 24 hours.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
                  className="mt-6 px-5 py-2.5 rounded-xl bg-primary text-white font-bold text-sm hover:opacity-90 transition-all"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-extrabold text-on-surface mb-1">Send us a Message</h3>
                <p className="text-sm text-secondary mb-6">We respond to all inquiries within 24 hours.</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1.5">Full Name</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Your full name"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-surface text-on-surface text-sm focus:outline-none focus:border-primary transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1.5">Email Address</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="you@email.com"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-surface text-on-surface text-sm focus:outline-none focus:border-primary transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">Subject</label>
                    <select
                      required
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-surface text-on-surface text-sm focus:outline-none focus:border-primary transition-all"
                    >
                      <option value="">Select a topic...</option>
                      <option>Admissions Inquiry</option>
                      <option>Technical Support</option>
                      <option>Course Information</option>
                      <option>Partnership / Collaboration</option>
                      <option>Billing & Payments</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">Message</label>
                    <textarea
                      required
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Describe your inquiry in detail..."
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-surface text-on-surface text-sm focus:outline-none focus:border-primary transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-tertiary text-white font-bold text-sm shadow-md hover:opacity-90 transition-all flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px]">send</span>
                    Send Message
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Additional Ways */}
      <section className="bg-[#090d16] py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-extrabold text-white text-center mb-10">Other Ways to Reach Us</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: 'forum',       title: 'Live Chat',       desc: 'Chat with our support team Mon–Fri, 9AM–5PM PST.',       action: 'Start Chat',         color: 'text-blue-400' },
              { icon: 'help_center', title: 'Help Center',     desc: 'Browse 500+ articles and FAQs in our knowledge base.',   action: 'Visit Help Center', color: 'text-purple-400' },
              { icon: 'groups',      title: 'Community Forum', desc: 'Connect with 50,000+ students and faculty worldwide.',   action: 'Join Community',    color: 'text-emerald-400' },
            ].map((item) => (
              <div key={item.title} className="bg-white/5 rounded-2xl border border-white/10 p-6 text-center">
                <span className={`material-symbols-outlined text-[36px] ${item.color} mb-3 block`}>{item.icon}</span>
                <h3 className="font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-400 mb-4">{item.desc}</p>
                <button className="px-4 py-2 rounded-xl bg-white/10 text-white text-xs font-semibold hover:bg-white/20 transition-all">
                  {item.action}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Address Footer Strip */}
      <div className="bg-[#060b18] py-8 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px] text-blue-400">location_on</span>
            <span>42 Innovation Drive, Tech District, San Francisco, CA 94105, USA</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="mailto:support@learnnova.edu" className="hover:text-slate-300 transition-colors">support@learnnova.edu</a>
            <span>+1 (415) 555-0192</span>
          </div>
        </div>
      </div>
    </div>
  );
}

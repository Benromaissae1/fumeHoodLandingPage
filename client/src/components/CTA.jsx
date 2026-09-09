import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { submitContact } from '../api';
import { useEffect } from 'react';

const CTA = () => {
  const [form, setForm] = useState({ name: '', email: '', company: '', phone: '', location: '', model: '', quantity: '1', timeline: '', message: '' });
  const [status, setStatus] = useState({ loading: false, success: false, error: null });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: null });
    
    try {
      const response = await submitContact(form);
      if (response.success) {
        setStatus({ loading: false, success: true, error: null });
        setForm({ name: '', email: '', message: '' });
      }
    } catch (err) {
      setStatus({ loading: false, success: false, error: err.error || 'Request failed' });
    }
  };

  useEffect(() => {
    try {
      const pre = localStorage.getItem('prefillModel');
      if (pre) {
        setForm(f => ({ ...f, model: pre }));
        localStorage.removeItem('prefillModel');
      }
    } catch (err) {
      // ignore
    }
  }, []);

  return (
    <section id="contact" className="py-40 bg-dark-900 relative overflow-hidden scroll-mt-[96px]">
      {/* Background treatment */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-sky-500/5 blur-[100px] rounded-full pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-6xl font-black text-white mb-6 leading-tight">
            Need help choosing the right <br />
            <span className="text-cyan-300">fume hood?</span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg mb-12 max-w-2xl mx-auto font-light">
            Send your lab requirements and ARIAS will recommend the right model, size, and configuration.
          </p>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5 text-left max-w-3xl mx-auto">
            <div className="space-y-3">
              <label className="text-[10px] text-gray-400 tracking-[0.25em] uppercase ml-1">Full Name</label>
              <input 
                type="text" 
                placeholder="Full Name"
                required
                value={form.name}
                onChange={e => setForm({...form, name: e.target.value})}
                className="w-full bg-[#0f1720] border border-white/10 rounded-lg px-4 py-3.5 text-white focus:outline-none focus:ring-1 focus:ring-cyan-400/50 transition-all placeholder:text-gray-600"
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] text-gray-400 tracking-[0.25em] uppercase ml-1">Business Email</label>
              <input 
                type="email" 
                placeholder="Business Email"
                required
                value={form.email}
                onChange={e => setForm({...form, email: e.target.value})}
                className="w-full bg-[#0f1720] border border-white/10 rounded-lg px-4 py-3.5 text-white focus:outline-none focus:ring-1 focus:ring-cyan-400/50 transition-all placeholder:text-gray-600"
              />
            </div>

            <div className="space-y-3">
              <label className="text-[10px] text-gray-400 tracking-[0.25em] uppercase ml-1">Company</label>
              <input 
                type="text" 
                placeholder="Company / Institution"
                value={form.company}
                onChange={e => setForm({...form, company: e.target.value})}
                className="w-full bg-[#0f1720] border border-white/10 rounded-lg px-4 py-3.5 text-white focus:outline-none focus:ring-1 focus:ring-cyan-400/50 transition-all placeholder:text-gray-600"
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] text-gray-400 tracking-[0.25em] uppercase ml-1">Phone (optional)</label>
              <input 
                type="tel" 
                placeholder="Phone number"
                value={form.phone}
                onChange={e => setForm({...form, phone: e.target.value})}
                className="w-full bg-[#0f1720] border border-white/10 rounded-lg px-4 py-3.5 text-white focus:outline-none focus:ring-1 focus:ring-cyan-400/50 transition-all placeholder:text-gray-600"
              />
            </div>

            <div className="space-y-3">
              <label className="text-[10px] text-gray-400 tracking-[0.25em] uppercase ml-1">Location</label>
              <input 
                type="text" 
                placeholder="City, Country"
                value={form.location}
                onChange={e => setForm({...form, location: e.target.value})}
                className="w-full bg-[#0f1720] border border-white/10 rounded-lg px-4 py-3.5 text-white focus:outline-none focus:ring-1 focus:ring-cyan-400/50 transition-all placeholder:text-gray-600"
              />
            </div>

            <div className="space-y-3">
              <label className="text-[10px] text-gray-400 tracking-[0.25em] uppercase ml-1">Desired Model / Width</label>
              <input 
                type="text" 
                placeholder="Model or width (e.g., 1200 mm)"
                value={form.model}
                onChange={e => setForm({...form, model: e.target.value})}
                className="w-full bg-[#0f1720] border border-white/10 rounded-lg px-4 py-3.5 text-white focus:outline-none focus:ring-1 focus:ring-cyan-400/50 transition-all placeholder:text-gray-600"
              />
            </div>

            <div className="space-y-3">
              <label className="text-[10px] text-gray-400 tracking-[0.25em] uppercase ml-1">Quantity</label>
              <input 
                type="number" 
                min="1"
                value={form.quantity}
                onChange={e => setForm({...form, quantity: e.target.value})}
                className="w-full bg-[#0f1720] border border-white/10 rounded-lg px-4 py-3.5 text-white focus:outline-none focus:ring-1 focus:ring-cyan-400/50 transition-all placeholder:text-gray-600"
              />
            </div>

            <div className="space-y-3">
              <label className="text-[10px] text-gray-400 tracking-[0.25em] uppercase ml-1">Target Timeline</label>
              <input 
                type="text" 
                placeholder="e.g., Q3 2026, Immediate"
                value={form.timeline}
                onChange={e => setForm({...form, timeline: e.target.value})}
                className="w-full bg-[#0f1720] border border-white/10 rounded-lg px-4 py-3.5 text-white focus:outline-none focus:ring-1 focus:ring-cyan-400/50 transition-all placeholder:text-gray-600"
              />
            </div>

            <div className="md:col-span-2 space-y-3">
              <label className="text-[10px] text-gray-400 tracking-[0.25em] uppercase ml-1">Project Requirements</label>
              <textarea 
                placeholder="Project Requirements (processes, special utilities, notes)"
                rows="4"
                required
                value={form.message}
                onChange={e => setForm({...form, message: e.target.value})}
                className="w-full bg-[#0f1720] border border-white/10 rounded-lg px-4 py-3.5 text-white focus:outline-none focus:ring-1 focus:ring-cyan-400/50 transition-all resize-none placeholder:text-gray-600"
              ></textarea>
            </div>

            <div className="md:col-span-2 pt-2">
              <motion.button 
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                disabled={status.loading || status.success}
                className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-4"
              >
                {status.loading ? 'Submitting...' : status.success ? 'Request Received' : 'Request a Quote'}
              </motion.button>
            </div>
          </form>

          {status.error && <p className="mt-8 text-red-500 font-bold uppercase tracking-widest text-[10px]">{status.error}</p>}
          {status.success && <p className="mt-8 text-glow-cyan font-bold uppercase tracking-widest text-[10px]">Thanks — our engineering team will review your request and contact you shortly.</p>}
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;

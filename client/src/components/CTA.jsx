import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { submitContact } from '../api';

const CTA = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
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

  return (
    <section id="contact" className="py-40 bg-dark-900 relative overflow-hidden">
      {/* Background Cinematic Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-glow-blue/5 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-7xl font-black text-white mb-8 leading-tight">
            Ready for your Next <br />
            <span className="text-glow-purple">Lab Architecture?</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl mb-16 max-w-2xl mx-auto font-light">
            Connect with our engineering team to receive a custom quote and CAD integration blueprint for the Arias system.
          </p>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-3xl mx-auto">
            <div className="space-y-3">
              <label className="text-[10px] text-gray-400 tracking-[0.3em] uppercase ml-1">Identity</label>
              <input 
                type="text" 
                placeholder="Full Name"
                required
                value={form.name}
                onChange={e => setForm({...form, name: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-1 focus:ring-glow-cyan/50 transition-all placeholder:text-gray-700"
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] text-gray-400 tracking-[0.3em] uppercase ml-1">Access Protocol</label>
              <input 
                type="email" 
                placeholder="Business Email"
                required
                value={form.email}
                onChange={e => setForm({...form, email: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-1 focus:ring-glow-cyan/50 transition-all placeholder:text-gray-700"
              />
            </div>
            <div className="md:col-span-2 space-y-3">
              <label className="text-[10px] text-gray-400 tracking-[0.3em] uppercase ml-1">Requirement Analysis</label>
              <textarea 
                placeholder="How can our engineering team assist you today?"
                rows="4"
                required
                value={form.message}
                onChange={e => setForm({...form, message: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-1 focus:ring-glow-cyan/50 transition-all resize-none placeholder:text-gray-700"
              ></textarea>
            </div>

            <div className="md:col-span-2 pt-4">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={status.loading || status.success}
                className="w-full py-5 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 text-white font-bold rounded-2xl text-lg shadow-[0_15px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_15px_40px_rgba(139,92,246,0.3)] transition-all flex items-center justify-center gap-4"
              >
                {status.loading ? 'Transmitting...' : status.success ? 'Request Received' : 'Initialize Consultation'}
              </motion.button>
            </div>
          </form>

          {status.error && <p className="mt-8 text-red-500 font-bold uppercase tracking-widest text-[10px]">{status.error}</p>}
          {status.success && <p className="mt-8 text-glow-cyan font-bold uppercase tracking-widest text-[10px]">Transmission Successful. Awaiting Engineering Callback.</p>}
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;

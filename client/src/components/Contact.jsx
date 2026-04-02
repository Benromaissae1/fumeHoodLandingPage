import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { submitContact } from '../api';

const Contact = () => {
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
      setStatus({ loading: false, success: false, error: err.error || 'Submission failed' });
    }
  };

  return (
    <section className="py-32 bg-dark-900 relative z-10 border-t border-white/5">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-panel rounded-3xl p-8 md:p-12 relative overflow-hidden"
        >
          {/* Subtle Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-glow-purple/20 blur-[80px] rounded-full pointer-events-none"></div>

          <div className="text-center mb-10 relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Request a Quote</h2>
            <p className="text-gray-400">Upgrade your laboratory environmental safety standard.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm text-gray-400 ml-1">Full Name</label>
                <input 
                  type="text" 
                  required
                  value={form.name}
                  onChange={e => setForm({...form, name: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-400 ml-1">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={form.email}
                  onChange={e => setForm({...form, email: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                  placeholder="john@research.org"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm text-gray-400 ml-1">Message</label>
              <textarea 
                rows="4"
                required
                value={form.message}
                onChange={e => setForm({...form, message: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all resize-none"
                placeholder="Tell us about your facility requirements..."
              ></textarea>
            </div>

            {status.error && (
              <p className="text-red-400 text-sm text-center">{status.error}</p>
            )}
            
            {status.success && (
              <p className="text-green-400 text-sm text-center">Thank you! Your request has been sent.</p>
            )}

            <button 
              type="submit" 
              disabled={status.loading || status.success}
              className="w-full py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 transition-all hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] disabled:opacity-50 focus:outline-none"
            >
              {status.loading ? 'Sending...' : 'Transmit Request'}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;

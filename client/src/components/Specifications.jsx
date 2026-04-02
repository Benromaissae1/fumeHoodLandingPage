import React from 'react';
import { motion } from 'framer-motion';

const specs = [
  { label: 'Airflow Capacity', value: 'Up to 2350 m³/h', sub: 'High-VolumePurge' },
  { label: 'Blower Type', value: 'Polypropylene', sub: 'Integrated System' },
  { label: 'Material', value: 'Powder-Coated Steel', sub: 'Chemical Resistant' },
  { label: 'Glass', value: '6mm Tempered', sub: 'Safety Standard' },
  { label: 'Worktop', value: '28mm Ceramic', sub: 'Heat Resistant' },
  { label: 'Control System', value: 'LCD Monitoring', sub: 'Smart Flow v2' },
  { label: 'Safety Features', value: 'Audio/Visual Alarms', sub: 'Real-time Alerts' },
  { label: 'Energy Tech', value: 'Variable Air (VAC)', sub: 'Efficiency Mode' },
];

const Specifications = () => {
  return (
    <section className="py-32 bg-dark-900 relative overflow-hidden">
      {/* Background Tech Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none overflow-hidden">
        <div className="text-[20rem] font-black absolute -top-20 -left-20 leading-none">TECH</div>
        <div className="text-[20rem] font-black absolute -bottom-20 -right-20 leading-none text-right">SPEC</div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-glow-cyan text-[10px] tracking-[0.5em] uppercase mb-4 font-bold">Engineering Excellence</h2>
            <h3 className="text-4xl md:text-6xl font-black text-white mb-6">Technical <br/> Specifications</h3>
            <p className="text-gray-400 text-lg">Real data from real engineering. Every component of Arius Lab System hoods is built to exceed global standards.</p>
          </div>
          <div className="pb-2">
            <div className="px-4 py-2 border border-white/10 rounded-full text-[10px] text-gray-500 tracking-widest uppercase">
              Revised: Sept 2026
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-white/10">
          {specs.map((spec, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-10 border-r border-b border-white/10 hover:bg-white/[0.02] transition-colors group"
            >
              <span className="text-[10px] text-gray-500 uppercase tracking-widest mb-2 block group-hover:text-glow-cyan transition-colors">{spec.label}</span>
              <div className="text-2xl font-bold text-white mb-2 leading-tight uppercase">{spec.value}</div>
              <div className="text-[10px] text-gray-600 font-mono italic uppercase tracking-tighter">{spec.sub}</div>
              
              {/* Subtle accent bar */}
              <div className="w-0 h-[1px] bg-glow-cyan mt-6 group-hover:w-full transition-all duration-500"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Specifications;

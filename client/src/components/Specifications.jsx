import React from 'react';
import { motion } from 'framer-motion';

const groupedSpecs = {
  Airflow: [
    { label: 'Airflow Capacity', value: '1,000–1,900 m³/h', sub: 'Variable face velocity control' },
    { label: 'Capture Performance', value: 'EN 14175 / ASHRAE 110', sub: 'Testable containment performance' },
  ],
  Construction: [
    { label: 'Structure', value: 'Powder-coated steel', sub: 'Durable corrosion-resistant frame' },
    { label: 'Interior', value: 'Epoxy / Phenolic', sub: 'Chemical-resistant lining and worktop options' },
  ],
  Safety: [
    { label: 'Sash', value: 'Tempered glass', sub: 'Counterbalanced, safety-rated' },
    { label: 'Alarms', value: 'Audio & visual', sub: 'Low-flow and fault alerts' },
  ],
  Options: [
    { label: 'Filtration', value: 'Activated carbon (optional)', sub: 'For certain non-acidic vapours' },
    { label: 'Utilities', value: 'Gas / Water / Power', sub: 'Factory-ready service rails' },
  ]
};

const Specifications = () => {
  return (
    <section className="py-32 bg-dark-900 relative overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none select-none">
        <div className="absolute -top-8 -left-8 text-[5rem] font-black leading-none text-white/3">TECH</div>
        <div className="absolute -bottom-8 -right-8 text-[5rem] font-black leading-none text-white/3">SPEC</div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-glow-cyan text-[10px] tracking-[0.5em] uppercase mb-4 font-bold">Technical Overview</h2>
            <h3 className="text-4xl md:text-6xl font-black text-white mb-6">Technical <br /> Specifications</h3>
            <p className="text-gray-400 text-lg">ARIAS Lab Systems are designed for dependable containment, durable construction, and consistent laboratory airflow performance.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Object.entries(groupedSpecs).map(([groupName, items], gi) => (
            <div key={groupName} className="p-6 bg-transparent border border-white/5 rounded-2xl">
              <h4 className="text-[10px] text-gray-400 uppercase tracking-widest mb-4 font-semibold">{groupName}</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {items.map((spec, index) => (
                  <motion.div key={index} initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.06 + gi * 0.04 }} viewport={{ once: true }} className="p-4 rounded-md hover:bg-white/[0.02] transition-colors">
                    <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">{spec.label}</div>
                    <div className="text-lg font-bold text-white mb-1">{spec.value}</div>
                    <div className="text-xs text-gray-400">{spec.sub}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Specifications;

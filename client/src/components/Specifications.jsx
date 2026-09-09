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
    <section className="py-16 bg-dark-900 relative overflow-hidden">
      {/* Muted background wordmark (reduced) */}
      <div className="absolute inset-0 opacity-[0.01] pointer-events-none select-none">
        <div className="absolute -top-6 -left-6 text-[3.5rem] font-black leading-none text-white/6">TECH</div>
        <div className="absolute -bottom-6 -right-6 text-[3.5rem] font-black leading-none text-white/6">SPEC</div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
          <div className="max-w-2xl">
            <h2 className="text-glow-cyan text-[10px] tracking-[0.5em] uppercase mb-2 font-bold">Technical Overview</h2>
            <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-2">Technical Specifications</h3>
            <p className="text-gray-350 text-sm text-gray-300">ARIAS Lab Systems are designed for dependable containment, durable construction, and consistent laboratory airflow performance.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(groupedSpecs).map(([groupName, items], gi) => (
            <div key={groupName} className="bg-[#061018] border border-white/12 bg-transparent">
              <div className="px-4 md:px-6 py-2 border-b border-white/12">
                <h4 className="text-[10px] text-gray-300 uppercase tracking-widest font-semibold">{groupName}</h4>
              </div>
              <div className="grid grid-rows-2">
                {items.map((spec, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 2 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.02 + gi * 0.01 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-[1fr_auto] items-start md:items-center px-4 md:px-6 py-1.5 border-b border-white/12"
                  >
                    <div className="min-w-0">
                      <div className="text-xs text-gray-300 uppercase tracking-wide font-medium">{spec.label}</div>
                      <div className="text-xs text-gray-400">{spec.sub}</div>
                    </div>
                    <div className="md:ml-6 text-left md:text-right mt-1 md:mt-0">
                      <div className="text-lg md:text-xl font-extrabold text-white leading-tight">{spec.value}</div>
                    </div>
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

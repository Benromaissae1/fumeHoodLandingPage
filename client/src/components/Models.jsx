import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const widths = ['1200 mm', '1500 mm', '1800 mm', '2100 mm'];

const flowBench = {
  '1200 mm': { closed: '160 m³/h · 94 CFM', open: '1,016 m³/h · 598 CFM', energy: '610 m³/h · 359 CFM' },
  '1500 mm': { closed: '200 m³/h · 118 CFM', open: '1,270 m³/h · 747 CFM', energy: '762 m³/h · 448 CFM' },
  '1800 mm': { closed: '240 m³/h · 141 CFM', open: '1,524 m³/h · 897 CFM', energy: '914 m³/h · 538 CFM' },
  '2100 mm': { closed: '280 m³/h · 165 CFM', open: '1,778 m³/h · 1,046 CFM', energy: '1,067 m³/h · 628 CFM' },
};

const flowWalkIn = {
  '1200 mm': { closed: '160 m³/h · 94 CFM', open: '2,178 m³/h · 1,282 CFM' },
  '1500 mm': { closed: '200 m³/h · 118 CFM', open: '2,722 m³/h · 1,602 CFM' },
  '1800 mm': { closed: '240 m³/h · 141 CFM', open: '3,267 m³/h · 1,923 CFM' },
  '2100 mm': { closed: '280 m³/h · 165 CFM', open: '3,811 m³/h · 2,243 CFM' },
};

const models = [
  { id: 'core', name: 'ARIAS Core', tier: 'Tier 1', title: 'Entry-tier containment', description: 'Entry-tier containment for educational laboratories, training centres and basic chemical applications.', features: ['Upper / lower structure', 'Frameless glazing', 'Steel airfoil'], walkIn: false },
  { id: 'vision', name: 'ARIAS Vision', tier: 'Tier 2', title: 'Enhanced visibility and finish', description: 'Everything in Core, plus a reinforced sash structure, improved airfoil and cabinet ventilation.', features: ['Full-surround aluminium frame', 'Fluorocarbon-coated airfoil', 'Exhaust fan'], walkIn: false },
  { id: 'pro', name: 'ARIAS Pro', tier: 'Tier 3', title: 'Integrated professional platform', description: 'Everything in Vision, plus an integrated monobloque structure and standard safety systems.', features: ['Integrated monobloque', 'Sash limit and anti-fall standard', 'Emergency stop standard'], walkIn: false },
  { id: 'prime', name: 'ARIAS Prime', tier: 'Tier 4', title: 'Premium laboratory configuration', description: 'Everything in Pro, plus laminated glazing, premium coatings and standard make-up air.', features: ['Laminated safety glazing', 'PTFE-coated airfoil', 'Standard make-up air'], walkIn: false },
  { id: 'chem', name: 'ARIAS Chem', tier: 'Specialised', title: 'Chemical-resistant construction', description: 'PP and PVC construction throughout, designed for aggressive acids and corrosion-sensitive applications.', features: ['PP/PVC construction', '500 mm sash limit', 'Anti-fall standard'], walkIn: false },
  { id: 'walkin', name: 'ARIAS Walk-in', tier: 'Specialised', title: 'Large-format laboratory access', description: 'General-purpose walk-in platform for bulky equipment, reactors and pilot-scale work, with linked door movement option.', features: ['Walk-in access', 'General-purpose construction', 'Linked doors optional'], walkIn: true },
  { id: 'walkinchem', name: 'ARIAS Walk-in Chem', tier: 'Specialised', title: 'Large-format PP resistance', description: 'Full-PP walk-in construction for corrosive processes and acid-resistant applications, with independent door movement option.', features: ['Full PP', 'PVC front columns', 'Independent doors optional'], walkIn: true },
];

const Models = () => {
  const [activeModel, setActiveModel] = useState(models[0]);
  const [activeWidth, setActiveWidth] = useState(widths[0]);
  const airflow = (activeModel.walkIn ? flowWalkIn : flowBench)[activeWidth];

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-glow-cyan text-[10px] tracking-[0.5em] uppercase mb-4 font-bold">Model Range</h2>
          <h3 className="text-4xl md:text-6xl font-black text-white">Configure your ARIAS unit</h3>
          <p className="mt-6 text-gray-400 text-lg max-w-2xl mx-auto">Choose the tier, then choose the working width. Available widths are 1200, 1500, 1800, and 2100 mm.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Model Selection List */}
          <div className="w-full lg:w-1/3 space-y-4">
            {models.map((model) => (
              <button
                key={model.id}
                onClick={() => setActiveModel(model)}
                className={`w-full p-8 rounded-2xl text-left transition-all duration-300 border flex justify-between items-center ${
                  activeModel.id === model.id 
                  ? 'bg-white/10 border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.05)]' 
                  : 'bg-transparent border-white/5 hover:border-white/10 opacity-50 grayscale'
                }`}
              >
                <div>
                  <div className="text-xs text-gray-500 mb-1 font-mono uppercase tracking-widest">{model.tier}</div>
                  <div className="text-2xl font-black text-white">{model.name}</div>
                </div>
              </button>
            ))}
          </div>

          {/* Model Detail Display */}
          <div className="flex-1 w-full">
            <div className="glass-panel p-12 rounded-[2.5rem] relative min-h-[450px] flex flex-col justify-center">
              <div className="absolute top-10 right-10 text-[4rem] md:text-[7rem] font-black text-white/[0.02] leading-none select-none pointer-events-none">
                {activeWidth.replace(' mm', '')}
              </div>

              <div className="relative z-10 flex flex-wrap gap-2 mb-8">
                {widths.map((width) => (
                  <button key={width} onClick={() => setActiveWidth(width)} className={`px-4 py-2 rounded-lg border text-xs font-semibold transition-colors ${activeWidth === width ? 'border-cyan-300 bg-cyan-300/10 text-cyan-100' : 'border-white/10 text-gray-400 hover:border-white/30'}`}>
                    {width}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeModel.id}-${activeWidth}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="relative z-10"
                >
                  <div className="mb-8">
                    <div className="text-[10px] text-glow-cyan tracking-widest uppercase mb-3">{activeModel.name}</div>
                    <h4 className="text-3xl md:text-5xl font-black text-white mb-4">{activeModel.title}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed max-w-2xl">{activeModel.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {activeModel.features.map((feature) => <span key={feature} className="text-xs text-gray-200 border border-white/10 rounded-full px-3 py-2">{feature}</span>)}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-white/10 pt-6">
                    <div><div className="text-[10px] text-glow-cyan tracking-widest uppercase mb-2">Dimensions</div><div className="text-lg font-bold text-white">{activeWidth} × 950 × 2350 mm</div></div>
                    <div><div className="text-[10px] text-glow-cyan tracking-widest uppercase mb-2">Airflow closed</div><div className="text-lg font-bold text-white">{airflow.closed}</div></div>
                    <div><div className="text-[10px] text-glow-cyan tracking-widest uppercase mb-2">Airflow open</div><div className="text-lg font-bold text-white">{airflow.open}</div></div>
                  </div>
                  {!activeModel.walkIn && <div className="mt-5 text-xs text-gray-400">Energy-saving airflow at 0.3 m/s: <span className="text-gray-200">{airflow.energy}</span></div>}
                  <button onClick={() => { localStorage.setItem('prefillTier', activeModel.name); localStorage.setItem('prefillWidth', activeWidth); const el = document.getElementById('contact'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }} className="mt-8 px-8 py-3 rounded-2xl bg-cyan-500 shadow-[0_12px_30px_rgba(6,182,212,0.12)] text-sm font-extrabold text-white hover:bg-cyan-400 transition-colors uppercase tracking-widest">
                    Request this model
                  </button>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Models;

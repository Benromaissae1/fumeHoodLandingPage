import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const models = [
  { id: 'AR03-120', width: '1200 mm', height: '2380 mm', depth: '850 mm', flow: '850 m³/h', weight: '220 kg' },
  { id: 'AR03-150', width: '1500 mm', height: '2380 mm', depth: '850 mm', flow: '1100 m³/h', weight: '260 kg' },
  { id: 'AR03-180', width: '1800 mm', height: '2380 mm', depth: '850 mm', flow: '1450 m³/h', weight: '310 kg' },
  { id: 'AR03-210', width: '2100 mm', height: '2380 mm', depth: '850 mm', flow: '1800 m³/h', weight: '370 kg' },
];

const Models = () => {
  const [activeModel, setActiveModel] = useState(models[1]);

  return (
    <section className="py-32 bg-dark-800/80 relative overflow-hidden backdrop-blur-md border-y border-white/5">
      <div className="container mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="text-glow-cyan text-[10px] tracking-[0.5em] uppercase mb-4 font-bold">Variations</h2>
          <h3 className="text-4xl md:text-6xl font-black text-white">Find Your Fit</h3>
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
                  <div className="text-xs text-gray-500 mb-1 font-mono uppercase tracking-widest">Model</div>
                  <div className="text-2xl font-black text-white">{model.id}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest italic group-hover:text-glow-cyan">Standard Build</div>
                </div>
              </button>
            ))}
          </div>

          {/* Model Detail Display */}
          <div className="flex-1 w-full">
            <div className="glass-panel p-12 rounded-[2.5rem] relative min-h-[450px] flex flex-col justify-center">
              <div className="absolute top-10 right-10 text-[6rem] md:text-[10rem] font-black text-white/[0.02] leading-none select-none pointer-events-none">
                {activeModel.id.split('-')[1]}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeModel.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="grid grid-cols-2 md:grid-cols-3 gap-y-12 gap-x-8 relative z-10"
                >
                  <div>
                    <div className="text-[10px] text-glow-cyan tracking-widest uppercase mb-3">Model Width</div>
                    <div className="text-4xl font-bold text-white">{activeModel.width}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-glow-cyan tracking-widest uppercase mb-3">System Height</div>
                    <div className="text-4xl font-bold text-white">{activeModel.height}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-glow-cyan tracking-widest uppercase mb-3">System Depth</div>
                    <div className="text-4xl font-bold text-white">{activeModel.depth}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-glow-cyan tracking-widest uppercase mb-3">Airflow Max</div>
                    <div className="text-4xl font-bold text-white">{activeModel.flow}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-glow-cyan tracking-widest uppercase mb-3">Total Mass</div>
                    <div className="text-4xl font-bold text-white">{activeModel.weight}</div>
                  </div>
                  <div className="flex items-end">
                    <button className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-white hover:bg-white/10 transition-colors uppercase tracking-widest">
                      PDF Data Sheet
                    </button>
                  </div>
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

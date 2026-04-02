import React from 'react';
import { motion } from 'framer-motion';

const HowItWorks = () => {
  return (
    <section className="py-32 bg-dark-900 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-24">
          
          <div className="flex-1 w-full relative">
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-glow-blue/20 blur-[100px] rounded-full"></div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="glass-panel aspect-square rounded-[3rem] p-12 relative flex flex-col justify-between"
            >
              <div className="w-full flex justify-between items-start">
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center font-black">01</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-widest text-right">Laminar Flow Analysis<br/>System active</div>
              </div>
              
              {/* Airflow Simulation */}
              <div className="flex-1 flex items-center justify-center relative">
                <div className="w-3/4 h-2/3 border-dashed border-2 border-white/5 rounded-3xl relative overflow-hidden">
                  <div className="absolute inset-0 flex flex-col justify-around py-8">
                    {[...Array(6)].map((_, i) => (
                      <motion.div 
                        key={i}
                        animate={{ x: ['-20%', '120%'] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.3, ease: "linear" }}
                        className="w-1/3 h-[1px] bg-gradient-to-r from-transparent via-glow-cyan to-transparent"
                      ></motion.div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-glow-cyan font-bold text-xl uppercase tracking-tighter">Intake Protocol</div>
                <p className="text-gray-500 text-xs">Continuous volumetric intake maintains 100 FPM at sash opening.</p>
              </div>
            </motion.div>
          </div>

          <div className="flex-1 space-y-12">
            <div>
              <h2 className="text-glow-purple text-[10px] tracking-[0.5em] uppercase mb-4 font-bold">The Science</h2>
              <h3 className="text-4xl md:text-6xl font-black text-white mb-8">How it <br/> Works</h3>
            </div>

            <div className="space-y-10">
              <div className="group">
                <div className="text-glow-cyan font-mono text-xs mb-2">/ INTAKE</div>
                <h4 className="text-xl font-bold text-white mb-2">Direct Flow Injection</h4>
                <p className="text-gray-400 text-sm leading-relaxed">Ambient air is drawn from the lab at a precise velocity, creating a protective barrier at the sash.</p>
                <div className="w-px h-0 bg-white/20 ml-2 group-hover:h-8 transition-all duration-300"></div>
              </div>
              
              <div className="group">
                <div className="text-glow-purple font-mono text-xs mb-2">/ FILTRATION</div>
                <h4 className="text-xl font-bold text-white mb-2">Molecular Scrubbing</h4>
                <p className="text-gray-400 text-sm leading-relaxed">Air enters the vortex chamber where hazardous vapors are stabilized before being moved to the exhaust plenum.</p>
                <div className="w-px h-0 bg-white/20 ml-2 group-hover:h-8 transition-all duration-300"></div>
              </div>

              <div className="group">
                <div className="text-glow-blue font-mono text-xs mb-2">/ EXHAUST</div>
                <h4 className="text-xl font-bold text-white mb-2">Secure Displacement</h4>
                <p className="text-gray-400 text-sm leading-relaxed">Purified air is safely displaced through high-velocity ducts, into the facility central exhaust system.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

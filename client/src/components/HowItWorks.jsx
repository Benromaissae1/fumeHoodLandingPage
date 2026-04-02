import React from 'react';
import { motion } from 'framer-motion';

const HowItWorks = () => {
  return (
    <section className="py-24 bg-dark-800 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 w-full"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Aerodynamics <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Perfected</span>
            </h2>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-purple-400 font-bold">1</div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">Air Intake Automation</h4>
                  <p className="text-gray-400">Sensors instantly detect sash movement, adjusting volumetric intake rates perfectly to ensure facial velocity remains uncompromised.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-blue-400 font-bold">2</div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">Vortex Flow Containment</h4>
                  <p className="text-gray-400">Specially angled interior baffles create micro-vortexes that trap heavier-than-air hazardous fumes from escaping the enclosure.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-cyan-400 font-bold">3</div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">Safe Exhaust Protocols</h4>
                  <p className="text-gray-400">Continuous laminar flow effectively purges the workspace and ducts it intelligently to the building's central exhaust.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 w-full relative"
          >
            {/* Minimalist Tech Graphic Representation */}
            <div className="aspect-[4/3] rounded-2xl glass-panel flexitems-center justify-center relative overflow-hidden bg-gradient-to-br from-[#121216] to-[#1a1a20]">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#8b5cf61a_1px,transparent_1px),linear-gradient(to_bottom,#8b5cf61a_1px,transparent_1px)] bg-[size:2rem_2rem] border border-white/5 rounded-2xl"></div>
              
              {/* Animated Lines representing Airflow */}
              <div className="absolute inset-0 flex flex-col justify-center gap-6 opacity-60">
                {[...Array(5)].map((_, i) => (
                  <motion.div 
                    key={i}
                    animate={{
                      x: ['-100%', '200%'],
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      repeat: Infinity,
                      ease: "linear",
                      delay: i * 0.5
                    }}
                    className="w-1/2 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent blur-[1px]"
                  ></motion.div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

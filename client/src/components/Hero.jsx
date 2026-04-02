import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      
      {/* Background Glow */}
      <div className="absolute inset-0 z-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-hero-glow z-0 pointer-events-none"></div>
      
      {/* Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none z-0"></div>

      <div className="container relative z-10 mx-auto px-6 text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-white/20 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6] animate-pulse"></span>
          <span className="text-sm font-medium tracking-wide text-gray-300">INTRODUCING THE FUTURE OF CONTAINMENT</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-gray-500">Next-Generation</span>
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 text-glow">Fume Hood Tech</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="max-w-2xl mx-auto text-lg md:text-xl text-gray-400 mb-12 font-light"
        >
          Unrivaled safety meets immaculate design. Precision airflow engineering and intelligent environmental monitoring inside an industrial masterpiece.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 font-semibold text-white transition-all hover:scale-105 hover:box-glow focus:outline-none">
            Get a Quote
          </button>
          <button className="px-8 py-4 rounded-xl glass-panel text-white font-medium hover:bg-white/10 transition-all border border-white/10 focus:outline-none">
            Explore Features
          </button>
        </motion.div>
        
      </div>

    </section>
  );
};

export default Hero;

import React, { useEffect, useState } from 'react';
import HeroScrollAnimation from './components/HeroScrollAnimation';
import Specifications from './components/Specifications';
import FeaturesWithImages from './components/FeaturesWithImages';
import HowItWorks from './components/HowItWorks';
import Models from './components/Models';
import CTA from './components/CTA';
import CustomCursor from './components/CustomCursor';
import { motion, useScroll, useSpring } from 'framer-motion';

function App() {
  const [isCursorActive, setIsCursorActive] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="bg-dark-900 min-h-screen text-gray-200 font-sans selection:bg-glow-purple/30 selection:text-white">
      <CustomCursor active={isCursorActive} />
      
      {/* Cinematic Top Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-glow-blue via-glow-purple to-glow-cyan origin-left z-[100]"
        style={{ scaleX }}
      />
      
      {/* Minimal Elite Navigation */}
      <nav className="fixed top-0 w-full z-[90] glass-panel border-b border-white/5 py-4">
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-glow-purple to-glow-blue flex items-center justify-center text-white text-[10px] font-bold tracking-tighter">
              AL
            </div>
            <span className="font-bold text-[10px] tracking-[0.4em] hidden sm:block text-white uppercase select-none">
              ARIAS <span className="text-gray-500 font-light italic ml-1">LAB SYSTEM</span>
            </span>
          </div>
          <div className="flex items-center gap-10 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 hidden lg:flex">
            <a href="#showcase" className="hover:text-white transition-colors">Showcase</a>
            <a href="#specs" className="hover:text-white transition-colors">Specs</a>
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#models" className="hover:text-white transition-colors">Models</a>
          </div>
          <button className="px-6 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white text-[10px] font-bold uppercase tracking-widest transition-all hover:scale-105 active:scale-95">
            Configure
          </button>
        </div>
      </nav>

      {/* Main Experience */}
      <main>
        <section id="showcase">
          <HeroScrollAnimation />
        </section>
        
        <section 
          id="specs" 
          className="custom-cursor-zone"
          onMouseEnter={() => setIsCursorActive(true)}
          onMouseLeave={() => setIsCursorActive(false)}
        >
          <Specifications />
        </section>

        <section id="features">
          <FeaturesWithImages />
        </section>
        
        <section 
          id="howitworks" 
          className="custom-cursor-zone"
          onMouseEnter={() => setIsCursorActive(true)}
          onMouseLeave={() => setIsCursorActive(false)}
        >
          <HowItWorks />
        </section>
        
        <section id="models">
          <Models />
        </section>
        
        <CTA />
      </main>

      {/* Industrial Footer */}
      <footer className="py-24 border-t border-white/5 bg-dark-900 relative z-10">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
            <div className="max-w-xs">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-5 h-5 rounded bg-glow-blue"></div>
                <span className="font-black text-[10px] tracking-[0.3em] uppercase">ARIAS LAB SYSTEM</span>
              </div>
              <p className="text-gray-500 text-sm font-light">Leading the industry in precision containment and intelligent laboratory architecture since 2012.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-24">
              <div className="space-y-4">
                <h5 className="text-[10px] font-bold text-white uppercase tracking-widest">Solutions</h5>
                <ul className="text-gray-500 text-xs space-y-3 font-light">
                  <li className="hover:text-white cursor-pointer transition-colors">Fume Hoods</li>
                  <li className="hover:text-white cursor-pointer transition-colors">VAV Controls</li>
                  <li className="hover:text-white cursor-pointer transition-colors">Safety Systems</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h5 className="text-[10px] font-bold text-white uppercase tracking-widest">Standards</h5>
                <ul className="text-gray-500 text-xs space-y-3 font-light">
                  <li className="hover:text-white cursor-pointer transition-colors">ASHRAE 110</li>
                  <li className="hover:text-white cursor-pointer transition-colors">EN 14175</li>
                  <li className="hover:text-white cursor-pointer transition-colors">ISO 9001</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h5 className="text-[10px] font-bold text-white uppercase tracking-widest">Support</h5>
                <ul className="text-gray-500 text-xs space-y-3 font-light">
                  <li className="hover:text-white cursor-pointer transition-colors">Documentation</li>
                  <li className="hover:text-white cursor-pointer transition-colors">Contact Engineering</li>
                  <li className="hover:text-white cursor-pointer transition-colors">Global Network</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between gap-4 text-[10px] text-gray-600 uppercase tracking-[0.2em]">
            <p>© {new Date().getFullYear()} ARIAS LAB SYSTEM. All rights reserved. Engineering Future.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Security</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Global Cinematic Bloom Gradient */}
      <div className="fixed bottom-0 left-0 w-full h-[50vh] bg-gradient-to-t from-glow-purple/5 to-transparent pointer-events-none z-0"></div>
    </div>
  );
}

export default App;

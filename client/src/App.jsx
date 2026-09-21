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
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="bg-dark-900 min-h-screen text-gray-200 font-sans selection:bg-glow-purple/30 selection:text-white">
      <CustomCursor />
      
      {/* Page progress bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-sky-500 via-cyan-400 to-slate-300 origin-left z-[100]"
        style={{ scaleX }}
      />
      
      {/* Minimal Elite Navigation */}
      <nav className="fixed top-0 w-full z-[90] glass-panel border-b border-white/5 py-4 bg-[#0a0f14]/80 backdrop-blur-md">
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img src="/logo.png" alt="ARIAS LABS" className="h-8 md:h-10 w-auto object-contain" />
          </div>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
            <a href="#showcase" className="px-2 py-2 hover:text-white transition-colors">Overview</a>
            <a href="#specs" className="px-2 py-2 hover:text-white transition-colors">Specs</a>
            <a href="#features" className="px-2 py-2 hover:text-white transition-colors">Safety</a>
            <a href="#howitworks" className="px-2 py-2 hover:text-white transition-colors">Airflow</a>
            <a href="#models" className="px-2 py-2 hover:text-white transition-colors">Models</a>
          </div>

          {/* Right actions: Request Quote + mobile menu button */}
          <div className="flex items-center gap-3">
            <a href="#contact" className="px-5 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white text-[10px] font-bold uppercase tracking-widest transition-all hover:scale-105 active:scale-95">
              Request Quote
            </a>

            <button
              aria-label="Menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(v => !v)}
              className="lg:hidden p-2 rounded-md bg-white/5 hover:bg-white/10 text-white"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h18M3 6h18M3 18h18" /></svg>
            </button>
          </div>
        </div>

        {/* Mobile menu panel */}
        <div className={`${menuOpen ? 'block' : 'hidden'} lg:hidden bg-[#0a0f14]/95 border-t border-white/5`}>
          <div className="px-6 py-4 pb-6 flex flex-col gap-3">
            <a onClick={() => setMenuOpen(false)} href="#showcase" className="text-white font-semibold">Overview</a>
            <a onClick={() => setMenuOpen(false)} href="#specs" className="text-white font-semibold">Specs</a>
            <a onClick={() => setMenuOpen(false)} href="#features" className="text-white font-semibold">Safety</a>
            <a onClick={() => setMenuOpen(false)} href="#howitworks" className="text-white font-semibold">Airflow</a>
            <a onClick={() => setMenuOpen(false)} href="#models" className="text-white font-semibold">Models</a>
            <a onClick={() => setMenuOpen(false)} href="#contact" className="text-white font-semibold">Quote</a>
          </div>
        </div>
      </nav>

      {/* Main Experience */}
      <main>
        <section id="showcase" className="border-b border-white/5 bg-[#0b1016] scroll-mt-[96px]">
          <HeroScrollAnimation />
        </section>
        
        <section id="specs" className="custom-cursor-zone border-t border-white/5 bg-[#0d131a] scroll-mt-[96px]">
          <Specifications />
        </section>

        <section id="features" className="border-t border-white/5 bg-[#0b1016] scroll-mt-[96px]">
          <FeaturesWithImages />
        </section>
        
        <section className="custom-cursor-zone border-t border-white/5 bg-[#101821] scroll-mt-[96px]">
          <HowItWorks />
        </section>
        
        <section id="models" className="border-t border-white/5 bg-[#0c1219] scroll-mt-[96px]">
          <Models />
        </section>
        
        <div className="border-t border-white/5 bg-[#0b1016]">
          <CTA />
        </div>
      </main>

      {/* Industrial Footer */}
      <footer className="py-24 border-t border-white/5 bg-[#090d12] relative z-10">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
            <div className="max-w-sm">
              <div className="flex items-center gap-3 mb-6">
                <img src="/logo.png" alt="ARIAS LABS" className="h-8 md:h-10 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-gray-500 text-sm font-light">Product information is presented for preliminary project discussion. Final specifications, options and commercial terms are confirmed with each quotation.</p>
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
                  <li className="hover:text-white cursor-pointer transition-colors">Project-specific quotation</li>
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
            <p>© {new Date().getFullYear()} ARIAS LABS. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="#specs" className="hover:text-white transition-colors">Product documentation</a>
              <a href="#contact" className="hover:text-white transition-colors">Contact engineering</a>
              <a href="#contact" className="hover:text-white transition-colors">Request quote</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Global bloom gradient */}
      <div className="fixed bottom-0 left-0 w-full h-[40vh] bg-gradient-to-t from-sky-500/5 via-transparent to-transparent pointer-events-none z-0"></div>
    </div>
  );
}

export default App;

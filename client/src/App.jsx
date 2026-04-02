import React from 'react';
import Hero from './components/Hero';
import FumeHoodCanvas from './components/FumeHoodCanvas';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Contact from './components/Contact';
import { motion, useScroll, useSpring } from 'framer-motion';

function App() {
  // Global scroll progress indicator for high-tech feel
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="bg-dark-900 min-h-screen text-gray-200 font-sans selection:bg-purple-500/30">
      
      {/* Global Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 origin-left z-[100]"
        style={{ scaleX }}
      />
      
      {/* Global Navigation - Minimal */}
      <nav className="fixed top-0 w-full z-50 glass-panel border-b border-white/5 py-4">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-[10px] font-bold tracking-tighter">
              AL
            </div>
            <span className="font-medium text-xs tracking-[0.25em] hidden sm:block text-white uppercase">ARIAS <span className="text-gray-500 font-light italic ml-1">LAB SYSTEM</span></span>
          </div>
          <div className="flex items-center gap-6 text-sm font-medium text-gray-400 hidden md:flex">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#tech" className="hover:text-white transition-colors">Technology</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>
          <button className="px-5 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-colors">
            Configure
          </button>
        </div>
      </nav>

      {/* Main Pages */}
      <main>
        <Hero />
        
        {/* The signature Fume Hood Canvas sequence section */}
        <section id="showcase" className="relative z-10 bg-dark-900 border-t border-white/5 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
          <FumeHoodCanvas />
        </section>

        <div id="features"><Features /></div>
        
        <div id="tech"><HowItWorks /></div>
        
        <div id="contact"><Contact /></div>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 bg-dark-900 text-center">
        <div className="container mx-auto px-6 text-gray-500 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} ARIAS LAB SYSTEM. All rights reserved.</p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Legal</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

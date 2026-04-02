import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useImagePreloader } from '../hooks/useImagePreloader';

const FRAME_COUNT = 20;
const AIRFLOW_PATHS = Array.from({ length: FRAME_COUNT }, (_, i) => {
  const frameIndex = (i + 1).toString().padStart(4, '0');
  return `/sequence/airflow/${frameIndex}.png`;
});

const HowItWorks = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const { images, loaded } = useImagePreloader(AIRFLOW_PATHS);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Map scroll progress to frame index (0-19)
  const currentFrame = useTransform(smoothProgress, [0.2, 0.8], [0, FRAME_COUNT - 1]);

  const drawFrame = (index) => {
    if (!loaded || !canvasRef.current || !images[index]) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const image = images[index];

    // Responsive canvas sizing
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const hRatio = rect.width / image.width;
    const vRatio = rect.height / image.height;
    const ratio = Math.max(hRatio, vRatio); // Cover effect
    
    const centerShift_x = (rect.width - image.width * ratio) / 2;
    const centerShift_y = (rect.height - image.height * ratio) / 2;

    ctx.clearRect(0, 0, rect.width, rect.height);
    ctx.drawImage(
      image, 
      0, 0, image.width, image.height,
      centerShift_x, centerShift_y, image.width * ratio, image.height * ratio
    );
  };

  useEffect(() => {
    const unsubscribe = currentFrame.onChange((v) => {
      drawFrame(Math.max(0, Math.min(FRAME_COUNT - 1, Math.floor(v))));
    });
    return () => unsubscribe();
  }, [currentFrame, loaded]);

  // Initial draw
  useEffect(() => {
    if (loaded) drawFrame(0);
  }, [loaded]);

  return (
    <section ref={containerRef} className="py-32 bg-dark-900 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-24">
          
          {/* Left: Animation Canvas */}
          <div className="flex-1 w-full relative group">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="relative aspect-square rounded-[2rem] overflow-hidden border border-white/10 bg-dark-800 shadow-2xl"
            >
              <canvas ref={canvasRef} className="w-full h-full block" />
              
              {/* Premium Overlays */}
              <div className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-tr from-glow-blue/10 via-transparent to-glow-purple/10"></div>
              <div className="absolute inset-0 pointer-events-none z-10 shadow-[inset_0_0_100px_rgba(0,0,0,0.6)]"></div>
              
              {/* Subtle Scanline Effect */}
              <div className="absolute inset-0 pointer-events-none z-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] opacity-20"></div>

              {/* Status Indicator */}
              <div className="absolute top-8 left-8 z-20 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-glow-cyan animate-pulse"></div>
                <span className="text-[10px] text-white/50 font-mono tracking-[0.2em] uppercase">Simulating Airflow Path</span>
              </div>
            </motion.div>
            
            {/* Background Glow */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-glow-blue/20 blur-[80px] rounded-full -z-10"></div>
          </div>

          <div className="flex-1 space-y-12">
            <div>
              <h2 className="text-glow-purple text-[10px] tracking-[0.5em] uppercase mb-4 font-bold">The Science</h2>
              <h3 className="text-4xl md:text-6xl font-black text-white mb-8">How it <br/> Works</h3>
              <p className="text-gray-400 font-light max-w-md">Our advanced aerodynamics engine handles complex chemical containment with microscopic precision.</p>
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

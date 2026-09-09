import React, { useRef, useEffect } from 'react';
import { useScroll, useTransform, motion, useSpring } from 'framer-motion';
import { useImagePreloader } from '../hooks/useImagePreloader';

const FRAME_COUNT = 70;
const HERO_PATHS = Array.from({ length: FRAME_COUNT }, (_, i) => {
  const frameIndex = (i + 1).toString().padStart(4, '0');
  return `/sequence/fumehoodimgs/${frameIndex}.png`;
});

const HeroScrollAnimation = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const { images, loaded, progress } = useImagePreloader(HERO_PATHS);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth scroll mapping — tuned for slightly faster responsiveness
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 22,
    restDelta: 0.002
  });

  // Map scroll to frame index with a nonlinear easing:
  // - First 40% of scroll progresses slowly through the first ~20% of frames
  // - Remaining scroll advances through the rest of the frames faster
  // Keep an eased feeling but shorten the slow opening so it progresses faster overall
  const initialPortion = 0.3; // first 30% of scroll (shorter slow phase)
  const initialFrames = Math.round((FRAME_COUNT - 1) * 0.2); // still reserve ~20% of frames for the gentle opening

  const currentFrame = useTransform(smoothProgress, (v) => {
    // ease function (smoothstep-like)
    const smoothEase = (t) => t * t * (3 - 2 * t);

    if (v <= initialPortion) {
      const t = v / initialPortion;
      const eased = smoothEase(t);
      return eased * initialFrames;
    }

    // remaining portion
    const t = (v - initialPortion) / (1 - initialPortion);
    const eased = smoothEase(t);
    const remainingFrames = (FRAME_COUNT - 1) - initialFrames;
    return initialFrames + eased * remainingFrames;
  });
  
  // Cinematic zoom effect: slight scale up as user scrolls
  const scale = useTransform(smoothProgress, [0, 1], [1, 1.2]);
  const opacity = useTransform(smoothProgress, [0, 0.1, 0.9, 1], [1, 1, 1, 0.5]);

  const drawFrame = (frameIndex) => {
    if (!loaded || !canvasRef.current || !images[frameIndex]) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const image = images[frameIndex];

    const pxRatio = window.devicePixelRatio || 1;
    const width = canvas.width / pxRatio;
    const height = canvas.height / pxRatio;

    const hRatio = width / image.width;
    const vRatio = height / image.height;
    const ratio = Math.min(hRatio, vRatio);
    
    const centerShift_x = (width - image.width * ratio) / 2;
    const centerShift_y = (height - image.height * ratio) / 2;

    ctx.clearRect(0, 0, width, height);
    
    ctx.drawImage(
      image,
      0, 0, image.width, image.height,
      centerShift_x, centerShift_y, image.width * ratio, image.height * ratio
    );
  };

  const handleResize = () => {
    if (canvasRef.current) {
      const pxRatio = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      canvasRef.current.width = width * pxRatio;
      canvasRef.current.height = height * pxRatio;
      canvasRef.current.style.width = width + 'px';
      canvasRef.current.style.height = height + 'px';
      
      const ctx = canvasRef.current.getContext('2d');
      ctx.setTransform(pxRatio, 0, 0, pxRatio, 0, 0);
      
      drawFrame(Math.min(Math.floor(currentFrame.get()), FRAME_COUNT - 1));
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [loaded]);

  useEffect(() => {
    const unsubscribe = currentFrame.onChange((v) => {
      drawFrame(Math.floor(v));
    });
    return () => unsubscribe();
  }, [currentFrame, loaded]);

  useEffect(() => {
    if (loaded) drawFrame(0);
  }, [loaded]);

  return (
    <div ref={containerRef} className="relative h-[250vh] w-full bg-dark-900 overflow-visible">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Subtle background treatment */}
        <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-b from-[#0a0f14]/40 via-transparent to-[#0a0f14]/70"></div>
        <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-r from-[#0a0f14]/70 via-transparent to-[#0a0f14]/70"></div>
        
        {/* Soft radial glows */}
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-sky-500/8 blur-[120px] rounded-full z-10"></div>
        <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-cyan-500/6 blur-[120px] rounded-full z-10" style={{ animationDelay: '1s' }}></div>

        {/* Loading State */}
        {!loaded && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-dark-900">
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: progress / 100 }}
              className="w-64 h-0.5 bg-glow-cyan shadow-[0_0_15px_#06b6d4] origin-left mb-6"
            />
            <p className="text-gray-500 text-[10px] tracking-[0.5em] font-mono uppercase">Loading airflow data {Math.round(progress)}%</p>
          </div>
        )}

        <motion.div style={{ scale, opacity, filter: 'brightness(1.06) contrast(1.06)' }} className="relative z-0 w-full h-full flex items-center justify-center">
          <canvas ref={canvasRef} className="object-contain" />
        </motion.div>

        {/* Hero Overlay Text */}
        <div className="absolute inset-0 z-30 pointer-events-none flex items-center px-6 md:px-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full md:max-w-[520px]"
          >
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="inline-block text-cyan-300 text-[10px] tracking-[0.45em] uppercase mb-6 font-semibold"
            >
              Laboratory Fume Extraction Systems
            </motion.span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[0.9] mb-6">
              ARIAS <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-white to-slate-400">
                Fume Hoods
              </span>
            </h1>
            <p className="w-full text-gray-400 text-base md:text-lg font-light md:max-w-[420px] mb-6 leading-relaxed break-words whitespace-normal">
              Safe, ergonomic, and adaptable fume extraction systems for modern laboratories.
            </p>

            {/* Credibility sentence */}
            <p className="w-full text-gray-300 text-sm mb-4 md:max-w-[420px] break-words whitespace-normal">Manufactured in Spain for safe, compliant laboratory ventilation.</p>
            
              <div className="flex items-center gap-6">
                <div className="flex flex-col items-start gap-4 pointer-events-auto">
                  <a href="#contact" className="inline-block">
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-7 py-3 bg-white text-slate-900 font-semibold rounded-lg transition-all pointer-events-auto shadow-[0_10px_20px_rgba(0,0,0,0.2)]"
                    >
                      Request a Quote
                    </motion.button>
                  </a>

                  {/* Proof points row - compact badges */}
                  <div className="flex flex-wrap items-center gap-3 mt-2">
                    <span className="text-[10px] text-gray-300 bg-white/3 px-3 py-1 rounded-full uppercase tracking-widest">EN 14175</span>
                    <span className="text-[10px] text-gray-300 bg-white/3 px-3 py-1 rounded-full uppercase tracking-widest">1200–2100 mm widths</span>
                    <span className="text-[10px] text-gray-300 bg-white/3 px-3 py-1 rounded-full uppercase tracking-widest">10+ years experience</span>
                  </div>
                </div>
              </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 opacity-40 flex flex-col items-center gap-4"
        >
          <div className="w-px h-20 bg-gradient-to-b from-transparent via-gray-500 to-transparent"></div>
          <span className="text-[10px] tracking-[0.3em] uppercase text-gray-400">Scroll to explore</span>
        </motion.div>

      </div>
    </div>
  );
};

export default HeroScrollAnimation;

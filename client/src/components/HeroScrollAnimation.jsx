import React, { useRef, useEffect } from 'react';
import { useScroll, useTransform, motion, useSpring } from 'framer-motion';
import { useImagePreloader } from '../hooks/useImagePreloader';

const FRAME_COUNT = 69;
const HERO_PATHS = Array.from({ length: FRAME_COUNT }, (_, i) => {
  const frameIndex = (i + 1).toString().padStart(3, '0');
  return `/sequence/fumehoodimgs/ezgif-frame-${frameIndex}.png`;
});

const HeroScrollAnimation = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const { images, loaded, progress } = useImagePreloader(HERO_PATHS);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth scroll mapping
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Map scroll to frame index
  const currentFrame = useTransform(smoothProgress, [0, 1], [0, FRAME_COUNT - 1]);
  
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
        
        {/* Cinematic Gradient Lighting Overlay */}
        <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-b from-dark-900/40 via-transparent to-dark-900/60"></div>
        <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-r from-dark-900/60 via-transparent to-dark-900/60"></div>
        
        {/* Radial Glows */}
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-glow-blue/10 blur-[150px] rounded-full z-10 animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-glow-purple/10 blur-[150px] rounded-full z-10 animate-pulse" style={{ animationDelay: '1s' }}></div>

        {/* Loading State */}
        {!loaded && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-dark-900">
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: progress / 100 }}
              className="w-64 h-0.5 bg-glow-cyan shadow-[0_0_15px_#06b6d4] origin-left mb-6"
            />
            <p className="text-gray-500 text-[10px] tracking-[0.5em] font-mono uppercase">Initializing Cinematic Core {Math.round(progress)}%</p>
          </div>
        )}

        <motion.div style={{ scale, opacity }} className="relative z-0 w-full h-full flex items-center justify-center">
          <canvas ref={canvasRef} className="object-contain" />
        </motion.div>

        {/* Hero Overlay Text */}
        <div className="absolute inset-0 z-30 pointer-events-none flex flex-col justify-center px-6 md:px-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl"
          >
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="inline-block text-glow-cyan text-[10px] tracking-[0.6em] uppercase mb-6 font-semibold"
            >
              The New Dimension of Laboratory Safety
            </motion.span>
            <h1 className="text-5xl md:text-8xl font-black text-white leading-tight mb-8">
              Next-Generation <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 via-white to-gray-500">
                Fume Hood
              </span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl font-light max-w-xl mb-12 leading-relaxed">
              Engineered for Safety, <span className="text-white font-medium">Precision</span>, and <span className="text-white font-medium">Performance</span>. 
              The cinematic standard for high-containment environments.
            </p>
            
            <div className="flex items-center gap-8">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-white text-dark-900 font-bold rounded-full transition-shadow hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] pointer-events-auto"
              >
                Experience Now
              </motion.button>
              <div className="md:flex flex-col hidden">
                <span className="text-[10px] text-gray-500 tracking-widest uppercase mb-1">Standard Compliance</span>
                <span className="text-sm text-gray-300 font-medium">ASHRAE 110-2016 Certified</span>
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

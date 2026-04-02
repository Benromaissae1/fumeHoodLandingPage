import React, { useRef, useEffect, useState } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import { useImagePreloader } from '../hooks/useImagePreloader';

const FRAME_COUNT = 69;

const FumeHoodCanvas = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const { images, loaded, progress } = useImagePreloader(FRAME_COUNT);
  
  // Track vertical scroll progress relative to the container element
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Map scroll progress (0 to 1) to frame index (0 to 68)
  const currentFrame = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);
  
  // Function to draw a specific frame
  const drawFrame = (frameIndex) => {
    if (!loaded || !canvasRef.current || !images[frameIndex]) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const image = images[frameIndex];

    // Maintain aspect ratio. Images are probably large, so we center and scale them to fit canvas.
    // Assume images are relatively standard aspect, let's setup dynamic sizing.
    const hRatio = canvas.width / image.width;
    const vRatio = canvas.height / image.height;
    const ratio = Math.min(hRatio, vRatio);
    
    const centerShift_x = (canvas.width - image.width * ratio) / 2;
    const centerShift_y = (canvas.height - image.height * ratio) / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Dark background if needed, but better to clear so gradient shows through behind the hood
    
    ctx.drawImage(
      image,
      0, 0, image.width, image.height,
      centerShift_x, centerShift_y, image.width * ratio, image.height * ratio
    );
  };

  // Initialize canvas based on window size
  const handleResize = () => {
    if (canvasRef.current) {
      // Setup canvas for high-DPI displays
      const pxRatio = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      canvasRef.current.width = width * pxRatio;
      canvasRef.current.height = height * pxRatio;
      canvasRef.current.style.width = width + 'px';
      canvasRef.current.style.height = height + 'px';
      
      // We do NOT use ctx.scale(pxRatio, pxRatio) here because our drawFrame calculates 
      // its draw boundaries using the raw unscaled physical canvas.width/.height pixels.
      // Scaling it again would doubly-scale the image causing it to flow massively offscreen.
      
      // Redraw current frame
      drawFrame(Math.min(Math.floor(currentFrame.get()), FRAME_COUNT - 1));
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial setup

    return () => window.removeEventListener('resize', handleResize);
  }, [loaded]);

  // Handle framer-motion fast updates to redraw canvas
  useEffect(() => {
    const unsubscribe = currentFrame.onChange((v) => {
      // v ranges from 0 to 68 depending on scroll
      drawFrame(Math.floor(v));
    });

    return () => unsubscribe();
  }, [currentFrame, loaded]);

  // Initial draw
  useEffect(() => {
    if (loaded) {
      drawFrame(0);
    }
  }, [loaded]);

  return (
    <div ref={containerRef} className="relative h-[200vh] w-full bg-dark-900 border-t border-white/5">
      {/* Sticky container that holds the canvas while parent scrolls */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Loading Overlay */}
        {!loaded && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-dark-900">
            <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden mb-4 relative">
              <div 
                className="absolute inset-y-0 left-0 bg-glow-blue transition-all duration-300 shadow-[0_0_10px_#3b82f6]"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-gray-400 text-sm tracking-widest font-mono">INITIALIZING SYSTEM {Math.round(progress)}%</p>
          </div>
        )}

        {/* Ambient Glow Behind the Canvas */}
        <div className="absolute inset-0 flex justify-center items-center opacity-70 pointer-events-none">
          <div className="w-[800px] h-[800px] bg-glow-purple/20 rounded-full blur-[120px]"></div>
        </div>

        <canvas 
          ref={canvasRef} 
          className="relative z-10 w-full h-full object-contain"
        />

        {/* Text overlay - now positioned to the left for better visual balance */}
        <div className="absolute inset-x-0 inset-y-0 pointer-events-none z-20 container mx-auto px-6 md:px-12 flex flex-col justify-center items-start">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-md"
          >
            <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500 mb-4 leading-tight">
              PRECISION <br /> 
              <span className="text-blue-400">CONTAINMENT</span>
            </h2>
            <div className="h-px w-24 bg-gradient-to-r from-blue-500 to-transparent mb-6"></div>
            <p className="text-gray-400 uppercase tracking-[0.2em] text-sm">
              Scroll to explore <br /> aerodynamics
            </p>
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default FumeHoodCanvas;

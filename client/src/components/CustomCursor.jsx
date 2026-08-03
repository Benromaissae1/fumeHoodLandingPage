import React, { useState, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const cursorX = useSpring(mousePosition.x, { stiffness: 500, damping: 28 });
  const cursorY = useSpring(mousePosition.y, { stiffness: 500, damping: 28 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleHover = (e) => {
      // Zone detection
      const zone = e.target.closest('.custom-cursor-zone');
      setIsActive(!!zone);

      // Element-specific hover state
      if (e.target.closest('button, a, .group')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleHover);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleHover);
    };
  }, []);

  return (
    <motion.div 
      animate={{ opacity: isActive ? 0.75 : 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 pointer-events-none z-[9999] hidden lg:block"
    >
      <motion.div
        className="fixed top-0 left-0 w-7 h-7 rounded-full border border-white/20 bg-white/5 flex items-center justify-center"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          scale: isHovering ? 1.15 : 1,
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-white"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
    </motion.div>
  );
};

export default CustomCursor;

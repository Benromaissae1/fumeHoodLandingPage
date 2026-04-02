import { useState, useEffect } from 'react';

// Generates an array of image paths for the fumehood animation
// Naming format: ezgif-frame-001.png up to ezgif-frame-069.png
const getFramePaths = (frameCount = 69) => {
  return Array.from({ length: frameCount }, (_, i) => {
    const frameIndex = (i + 1).toString().padStart(3, '0');
    // Public path for assets in Vite
    return `/sequence/fumehoodimgs/ezgif-frame-${frameIndex}.png`;
  });
};

export const useImagePreloader = (frameCount = 69) => {
  const [images, setImages] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let isCancelled = false;
    const paths = getFramePaths(frameCount);
    let loadedCount = 0;
    const imgObjects = [];

    paths.forEach((path, index) => {
      const img = new Image();
      img.src = path;
      img.onload = () => {
        if (isCancelled) return;
        loadedCount++;
        setProgress((loadedCount / frameCount) * 100);
        if (loadedCount === frameCount) {
          setLoaded(true);
          setImages(imgObjects);
        }
      };
      imgObjects[index] = img;
    });

    return () => {
      isCancelled = true;
    };
  }, [frameCount]);

  return { images, loaded, progress };
};

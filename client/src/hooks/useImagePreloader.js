import { useState, useEffect } from 'react';

/**
 * useImagePreloader hook to handle frame-by-frame image sequences
 * @param {string[]} paths - Array of image URLs to preload
 */
export const useImagePreloader = (paths) => {
  const [images, setImages] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!paths || paths.length === 0) return;

    let isCancelled = false;
    const frameCount = paths.length;
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
  }, [paths]);

  return { images, loaded, progress };
};

import { useState, useEffect, useRef } from 'react';

const useScrollVelocity = () => {
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const [scrollDirection, setScrollDirection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [waveOffset, setWaveOffset] = useState(0);
  
  const lastScrollY = useRef(0);
  const lastTimestamp = useRef(0);
  const velocityHistory = useRef([]);
  const scrollTimeout = useRef(null);
  const offsetAnimation = useRef(null);

  useEffect(() => {
    const startGentleOffset = (velocity, direction) => {
      if (offsetAnimation.current) {
        cancelAnimationFrame(offsetAnimation.current);
      }
      
      let startTime = null;
      const duration = 600;
      const maxOffset = Math.min(velocity * 20, 15) * direction; // עדין יותר
      
      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = (timestamp - startTime) / duration;
        
        if (progress < 1) {
          // Smooth easing - רך וטבעי
          const easeProgress = 1 - Math.pow(1 - progress, 3);
          const currentOffset = maxOffset * (1 - easeProgress);
          setWaveOffset(currentOffset);
          
          offsetAnimation.current = requestAnimationFrame(animate);
        } else {
          setWaveOffset(0);
        }
      };
      
      offsetAnimation.current = requestAnimationFrame(animate);
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const currentTime = performance.now();
      
      if (lastTimestamp.current === 0) {
        lastTimestamp.current = currentTime;
        lastScrollY.current = currentScrollY;
        return;
      }

      const deltaY = currentScrollY - lastScrollY.current;
      const deltaTime = currentTime - lastTimestamp.current;
      
      if (deltaTime > 0) {
        const velocity = Math.abs(deltaY / deltaTime);
        const direction = deltaY > 0 ? 1 : -1;
        
        // Update velocity history for smoothing
        velocityHistory.current.push(velocity);
        if (velocityHistory.current.length > 5) {
          velocityHistory.current.shift();
        }
        
        // Calculate smoothed velocity
        const smoothedVelocity = velocityHistory.current.reduce((a, b) => a + b, 0) / velocityHistory.current.length;
        
        setScrollVelocity(Math.min(smoothedVelocity, 2));
        setScrollDirection(direction);
        setIsScrolling(true);
        
        // Start gentle wave offset animation
        startGentleOffset(smoothedVelocity, direction);
        
        // Clear existing timeout
        if (scrollTimeout.current) {
          clearTimeout(scrollTimeout.current);
        }
        
        // Set new timeout for scroll end
        scrollTimeout.current = setTimeout(() => {
          setIsScrolling(false);
          setScrollVelocity(0);
          setScrollDirection(0);
        }, 150);
      }
      
      lastScrollY.current = currentScrollY;
      lastTimestamp.current = currentTime;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      if (offsetAnimation.current) {
        cancelAnimationFrame(offsetAnimation.current);
      }
    };
  }, []); 

  // Helper functions for components
  const getAnimationSpeed = () => {
    const baseSpeed = 1;
    const velocityMultiplier = Math.min(scrollVelocity * 2, 3);
    return baseSpeed + velocityMultiplier;
  };

  const getWaveIntensity = () => {
    const baseIntensity = 1;
    const velocityIntensity = Math.min(scrollVelocity * 1.5, 2);
    return baseIntensity + velocityIntensity;
  };

  return {
    scrollVelocity,
    scrollDirection,
    isScrolling,
    waveOffset,
    getAnimationSpeed,
    getWaveIntensity
  };
};

export default useScrollVelocity;
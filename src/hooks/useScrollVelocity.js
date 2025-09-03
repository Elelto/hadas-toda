import { useState, useEffect, useRef, useCallback } from 'react';

const useScrollVelocity = () => {
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const [scrollDirection, setScrollDirection] = useState('down');
  const [isScrolling, setIsScrolling] = useState(false);
  
  const lastScrollY = useRef(0);
  const lastTimestamp = useRef(Date.now());
  const velocityHistory = useRef([]);
  const scrollTimeout = useRef(null);
  const rafId = useRef(null);

  const smoothVelocity = useCallback((newVelocity) => {
    // Keep history of last 5 velocity measurements for smoothing
    velocityHistory.current.push(newVelocity);
    if (velocityHistory.current.length > 5) {
      velocityHistory.current.shift();
    }
    
    // Calculate average velocity for smoother animations
    const avgVelocity = velocityHistory.current.reduce((sum, v) => sum + v, 0) / velocityHistory.current.length;
    return Math.min(Math.abs(avgVelocity), 10); // Cap at 10 for performance
  }, []);

  const updateScrollVelocity = useCallback(() => {
    const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
    const currentTime = Date.now();
    
    const deltaY = currentScrollY - lastScrollY.current;
    const deltaTime = currentTime - lastTimestamp.current;
    
    if (deltaTime > 0) {
      const rawVelocity = Math.abs(deltaY) / deltaTime;
      const smoothedVelocity = smoothVelocity(rawVelocity);
      
      setScrollVelocity(smoothedVelocity);
      setScrollDirection(deltaY > 0 ? 'down' : 'up');
      setIsScrolling(true);
      
      // Clear existing timeout
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      
      // Set scrolling to false after 150ms of no scroll
      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false);
        setScrollVelocity(0);
        velocityHistory.current = [];
      }, 150);
    }
    
    lastScrollY.current = currentScrollY;
    lastTimestamp.current = currentTime;
  }, [smoothVelocity]);

  const handleScroll = useCallback(() => {
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }
    
    rafId.current = requestAnimationFrame(updateScrollVelocity);
  }, [updateScrollVelocity]);

  useEffect(() => {
    // Initialize values
    lastScrollY.current = window.pageYOffset || document.documentElement.scrollTop;
    lastTimestamp.current = Date.now();
    
    // Add passive event listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [handleScroll]);

  // Helper functions for animation calculations
  const getAnimationSpeed = useCallback(() => {
    // Base speed is 3s, gets faster with scroll velocity
    const baseSpeed = 3;
    const speedMultiplier = Math.max(0.5, 1 - (scrollVelocity * 0.1));
    return baseSpeed * speedMultiplier;
  }, [scrollVelocity]);

  const getWaveIntensity = useCallback(() => {
    // Returns intensity between 0.5 and 2 based on scroll velocity
    return Math.min(2, 0.5 + (scrollVelocity * 0.15));
  }, [scrollVelocity]);

  const getScrollOffset = useCallback(() => {
    // Returns scroll-based offset for wave phase shifting
    const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
    return (currentScrollY * 0.001) % (Math.PI * 2);
  }, []);

  return {
    scrollVelocity,
    scrollDirection,
    isScrolling,
    getAnimationSpeed,
    getWaveIntensity,
    getScrollOffset
  };
};

export default useScrollVelocity;
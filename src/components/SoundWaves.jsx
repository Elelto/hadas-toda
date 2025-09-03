import React, { useEffect, useRef, useState } from 'react';
import '../styles/sound-waves.css';
import useScrollVelocity from '../hooks/useScrollVelocity';

const SoundWaves = ({ 
  variant = 'background', 
  intensity = 'medium', 
  color = 'primary',
  effect = 'subtle',
  scrollResponsive = true,
  className = '',
  style = {}
}) => {
  const { 
    scrollVelocity, 
    scrollDirection, 
    isScrolling, 
    waveOffset,
    getAnimationSpeed, 
    getWaveIntensity
  } = useScrollVelocity();

  const svgRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (!scrollResponsive) return;

    const handleScroll = () => {
      setScrollY(window.pageYOffset);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollResponsive]);

  useEffect(() => {
    if (!scrollResponsive || !svgRef.current) return;

    const svg = svgRef.current;
    const animationSpeed = getAnimationSpeed();
    const waveIntensity = getWaveIntensity();

    // Apply dynamic CSS variables for scroll-responsive animations
    svg.style.setProperty('--scroll-velocity', scrollVelocity);
    svg.style.setProperty('--scroll-direction', scrollDirection);
    svg.style.setProperty('--animation-speed', animationSpeed);
    svg.style.setProperty('--wave-intensity', waveIntensity);
    svg.style.setProperty('--wave-offset', `${waveOffset}px`);
    svg.style.setProperty('--is-scrolling', isScrolling ? '1' : '0');

  }, [scrollResponsive, scrollVelocity, scrollDirection, isScrolling, waveOffset, getAnimationSpeed, getWaveIntensity]);

  const generateWavePath = (width, height, amplitude, frequency, phase = 0, scrollOffset = 0) => {
    const points = [];
    const step = width / 100;
    
    for (let x = 0; x <= width; x += step) {
      const normalizedX = x / width;
      const waveY = Math.sin((normalizedX * frequency + phase + scrollOffset) * Math.PI * 2) * amplitude;
      const y = height / 2 + waveY;
      points.push(`${x},${y}`);
    }
    
    return `M ${points.join(' L ')}`;
  };

  const generateSeparatorPath = (width, height, amplitude, frequency, phase = 0) => {
    const points = [];
    const step = width / 150;
    
    for (let x = 0; x <= width; x += step) {
      const normalizedX = x / width;
      const waveY = Math.sin((normalizedX * frequency + phase) * Math.PI * 2) * amplitude;
      const y = height / 2 + waveY;
      points.push(`${x},${y}`);
    }
    
    return `M ${points.join(' L ')}`;
  };

  const generateConnectorPath = (startX, startY, endX, endY, curvature = 0.3) => {
    const midX = (startX + endX) / 2;
    const midY = (startY + endY) / 2;
    const controlX = midX + (endY - startY) * curvature;
    const controlY = midY - (endX - startX) * curvature;
    
    return `M ${startX},${startY} Q ${controlX},${controlY} ${endX},${endY}`;
  };

  const renderBackgroundWaves = () => {
    const scrollOffset = scrollResponsive ? scrollY * 0.001 : 0;
    
    return (
      <svg 
        ref={svgRef}
        className={`sound-waves sound-waves--${variant} sound-waves--${intensity} sound-waves--${color} sound-waves--${effect} ${scrollResponsive ? 'sound-waves--scroll-responsive' : ''} ${className}`}
        style={style}
        data-scrolling={isScrolling}
        data-scroll-direction={scrollDirection}
        data-momentum={Math.abs(waveOffset)}
        preserveAspectRatio="none"
        viewBox="0 0 1200 400"
        width="100%"
        height="100%"
      >
        <defs>
          <linearGradient id={`waveGradient-${Date.now()}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00bcd4" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#26c6da" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#4dd0e1" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        
        {/* Background wave layers */}
        <path
          d={generateWavePath(1200, 400, 30, 2, 0, scrollOffset)}
          fill="none"
          stroke={`url(#waveGradient-${Date.now()})`}
          strokeWidth="3"
          className="wave-layer wave-layer--1"
        />
        <path
          d={generateWavePath(1200, 400, 20, 3, 0.5, scrollOffset * 0.8)}
          fill="none"
          stroke="#00bcd4"
          strokeWidth="2"
          strokeOpacity="0.7"
          className="wave-layer wave-layer--2"
        />
        <path
          d={generateWavePath(1200, 400, 15, 4, 1, scrollOffset * 0.6)}
          fill="none"
          stroke="#26c6da"
          strokeWidth="1.5"
          strokeOpacity="0.5"
          className="wave-layer wave-layer--3"
        />
      </svg>
    );
  };

  const renderSeparatorWaves = () => {
    return (
      <svg 
        ref={svgRef}
        className={`sound-waves sound-waves--${variant} sound-waves--${intensity} sound-waves--${color} sound-waves--${effect} ${scrollResponsive ? 'sound-waves--scroll-responsive' : ''} ${className}`}
        style={style}
        data-scrolling={isScrolling}
        data-scroll-direction={scrollDirection}
        data-momentum={Math.abs(waveOffset)}
        preserveAspectRatio="none"
        viewBox="0 0 1200 100"
        width="100%"
        height="100%"
      >
        <path
          d={generateSeparatorPath(1200, 100, 25, 3)}
          fill="none"
          stroke="#00bcd4"
          strokeWidth="3"
          className="separator-wave separator-wave--1"
        />
        <path
          d={generateSeparatorPath(1200, 100, 15, 4, 0.3)}
          fill="none"
          stroke="#26c6da"
          strokeWidth="2"
          className="separator-wave separator-wave--2"
        />
      </svg>
    );
  };

  const renderConnectorWaves = () => {
    return (
      <svg 
        ref={svgRef}
        className={`sound-waves sound-waves--${variant} sound-waves--${intensity} sound-waves--${color} sound-waves--${effect} ${scrollResponsive ? 'sound-waves--scroll-responsive' : ''} ${className}`}
        style={style}
        data-scrolling={isScrolling}
        data-scroll-direction={scrollDirection}
        data-momentum={Math.abs(waveOffset)}
        viewBox="0 0 300 200"
      >
        <path
          d={generateConnectorPath(50, 100, 250, 100, 0.4)}
          fill="none"
          stroke="var(--wave-stroke-color)"
          strokeWidth="2"
          className="connector-wave"
        />
      </svg>
    );
  };

  switch (variant) {
    case 'separator':
      return renderSeparatorWaves();
    case 'connector':
      return renderConnectorWaves();
    case 'background':
    default:
      return renderBackgroundWaves();
  }
};

export default SoundWaves;
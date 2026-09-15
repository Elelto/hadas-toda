import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const PARTICLE_COUNT = 1500; // Optimized for mobile performance

function ParticlesScene() {
  const pointsRef = useRef();
  
  // Track the story section element to calculate local progress
  const [storyElement, setStoryElement] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const el = document.getElementById('cinematic-story-anchor');
      if (el) {
        setStoryElement(el);
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const { viewport } = useThree();
  const isMobile = viewport.aspect < 1;
  const aspectMultiplier = Math.min(1, viewport.aspect);

  const { chaosPositions, heartPositions, colorsArray } = useMemo(() => {
    const chaos = new Float32Array(PARTICLE_COUNT * 3);
    const heart = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);

    // Premium Color Palette for the Mosaic effect
    const colorPalette = [
      new THREE.Color('#8a3b58'), // Brand Burgundy (Deep)
      new THREE.Color('#a55c7a'), // Lighter Rose
      new THREE.Color('#e0b0c0'), // Soft Pink / Rose Gold
      new THREE.Color('#61243a')  // Darker Wine
    ];

    // Chaos distribution
    const maxSpreadX = 30;
    const maxSpreadY = 30;
    
    // Heart scaling
    // Make the heart smaller on mobile so it fits perfectly and elegantly inside the frame
    const baseHeartScale = 0.12;
    const heartScale = isMobile ? baseHeartScale * 0.75 : baseHeartScale;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      
      // Assign a random color from the premium palette to this particle
      const randomColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i3] = randomColor.r;
      colors[i3 + 1] = randomColor.g;
      colors[i3 + 2] = randomColor.b;

      // Compress the X spread on narrow mobile screens so particles don't hide off-screen
      chaos[i3] = (Math.random() - 0.5) * maxSpreadX * aspectMultiplier * 1.5; 
      chaos[i3 + 1] = (Math.random() - 0.5) * maxSpreadY;
      chaos[i3 + 2] = (Math.random() - 0.5) * 30;

      // Fix for "bald spots": Use deterministic distribution so every angle is covered
      let t = (i / PARTICLE_COUNT) * Math.PI * 2;
      // Add a tiny bit of noise so it looks organic, not strictly mechanical
      t += (Math.random() - 0.5) * 0.02;

      const baseX = 16 * Math.pow(Math.sin(t), 3);
      const baseY = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
      
      // Keep it crisp and elegant: very minimal thickness and Z-depth
      const thickness = 0.03; // Only 3% thickness for a sharp, high-tech look
      const volumeScale = 1.0 - (Math.random() * thickness);
      
      heart[i3] = (baseX * heartScale * volumeScale);
      heart[i3 + 1] = (baseY * heartScale * volumeScale);
      heart[i3 + 2] = (Math.random() - 0.5) * 0.4; // Very subtle Z-depth so it doesn't look blurry/fat
    }
    return { chaosPositions: chaos, heartPositions: heart, colorsArray: colors };
  }, [viewport.aspect, isMobile, aspectMultiplier]);

  const initialPositions = useMemo(() => new Float32Array(chaosPositions), [chaosPositions]);
  const particleColors = useMemo(() => new Float32Array(colorsArray), [colorsArray]);

  // Listen for the custom event from the snap container
  const snapProgressRef = useRef(0);

  useEffect(() => {
    const handleProgress = (e) => {
      snapProgressRef.current = e.detail;
    };
    window.addEventListener('storyScrollProgress', handleProgress);
    return () => window.removeEventListener('storyScrollProgress', handleProgress);
  }, []);

  const currentParticleProgressRef = useRef(0);

  useFrame((state) => {
    if (!pointsRef.current) return;
    
    let targetParticleProgress = 0;
    let opacityTarget = 0; // Start completely invisible at the top

    // Read global scroll to fade in particles as we leave the Hero
    const globalScroll = window.scrollY;
    if (globalScroll > 50) {
      // Fade in to 0.15 over the first 500px of scroll
      opacityTarget = Math.min(0.15, (globalScroll - 50) / 500 * 0.15);
    }

    if (storyElement) {
      const rect = storyElement.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Is the container the primary thing on screen? (More than 50% of the screen height is covered by it)
      const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
      const isFocused = visibleHeight > windowHeight * 0.5;
      
      if (isFocused) {
        // Boost opacity significantly
        opacityTarget = 0.8;
        // Map the internal auto-play progress (0 to 1) directly to the heart formation
        targetParticleProgress = snapProgressRef.current; // The targetProgress emitted from AutoPlay
      } else {
        // If we are scrolling past it externally
        if (rect.top > windowHeight) {
          // Approaching from top -> keep chaos (0)
          targetParticleProgress = 0;
        } else if (rect.bottom < 0) {
          // Leaving from bottom -> HEART STAYS FORMED (1)
          targetParticleProgress = 1;
          // Keep opacity at 0.3 for the rest of the site so the heart gracefully floats behind everything
          opacityTarget = 0.3;
        } else {
          // We are transitioning in or out
          const rawProgress = (windowHeight - rect.top) / (rect.height + windowHeight);
          if (rawProgress > 0 && rawProgress < 1) {
            const opacityBoost = Math.sin(rawProgress * Math.PI);
            opacityTarget = Math.max(opacityTarget, 0.5 * opacityBoost);
            
            if (rect.top > 0) {
              targetParticleProgress = 0; // Top transition
            } else {
              targetParticleProgress = 1; // Bottom transition, keep it formed!
            }
          }
        }
      }
    }

    const positions = pointsRef.current.geometry.attributes.position.array;
    const time = state.clock.elapsedTime;

    // Smoothly interpolate opacity material
    pointsRef.current.material.opacity = THREE.MathUtils.lerp(
      pointsRef.current.material.opacity, 
      opacityTarget, 
      0.05
    );

    // Smoothly interpolate the particle progress so it never jumps/teleports
    const lerpSpeed = isMobile ? 0.08 : 0.025; // Mobile users need faster visual feedback
    currentParticleProgressRef.current = THREE.MathUtils.lerp(
      currentParticleProgressRef.current,
      targetParticleProgress,
      lerpSpeed // Determines how fast the heart physically assembles
    );
    const particleProgress = currentParticleProgressRef.current;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      let targetX = THREE.MathUtils.lerp(chaosPositions[i3], heartPositions[i3], particleProgress);
      let targetY = THREE.MathUtils.lerp(chaosPositions[i3 + 1], heartPositions[i3 + 1], particleProgress);
      let targetZ = THREE.MathUtils.lerp(chaosPositions[i3 + 2], heartPositions[i3 + 2], particleProgress);

      // Slower floating when formed, faster when chaotic
      const floatSpeed = particleProgress > 0.8 ? 0.5 : 1.5;
      const floatNoiseX = Math.sin(time * floatSpeed + i) * 0.02;
      const floatNoiseY = Math.cos(time * floatSpeed + i) * 0.02;

      targetX += floatNoiseX;
      targetY += floatNoiseY;

      positions[i3] = targetX;
      positions[i3 + 1] = targetY;
      positions[i3 + 2] = targetZ;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.rotation.y = time * 0.1;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={PARTICLE_COUNT} array={initialPositions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={PARTICLE_COUNT} array={particleColors} itemSize={3} />
      </bufferGeometry>
      <PointMaterial transparent vertexColors size={0.06} sizeAttenuation={true} depthWrite={false} opacity={0.3} />
    </points>
  );
}

export default function CinematicBackground() {
  return (
    <div 
      className="cinematic-canvas-wrapper"
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100vw', 
        height: '100vh', 
        zIndex: -1, // Sits behind everything natively
        pointerEvents: 'none'
      }}
    >
      <Canvas style={{ pointerEvents: 'none' }} camera={{ position: [0, 0, 8], fov: 45 }}>
        <fog attach="fog" args={['#ffffff', 5, 20]} />
        <ParticlesScene />
      </Canvas>
    </div>
  );
}

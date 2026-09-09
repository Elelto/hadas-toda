import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
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

  const { chaosPositions, heartPositions } = useMemo(() => {
    const chaos = new Float32Array(PARTICLE_COUNT * 3);
    const heart = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      chaos[i3] = (Math.random() - 0.5) * 30; // wider spread for full screen
      chaos[i3 + 1] = (Math.random() - 0.5) * 30;
      chaos[i3 + 2] = (Math.random() - 0.5) * 30;

      const t = Math.PI * 2 * Math.random();
      const scale = 0.12; 
      const baseX = 16 * Math.pow(Math.sin(t), 3);
      const baseY = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
      
      heart[i3] = (baseX * scale) + (Math.random() - 0.5) * 0.3;
      heart[i3 + 1] = (baseY * scale) + (Math.random() - 0.5) * 0.3;
      heart[i3 + 2] = (Math.random() - 0.5) * 1.5; 
    }
    return { chaosPositions: chaos, heartPositions: heart };
  }, []);

  const initialPositions = useMemo(() => new Float32Array(chaosPositions), [chaosPositions]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    
    let particleProgress = 0;
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
      
      const totalScrollDistance = rect.height + windowHeight;
      const currentScroll = windowHeight - rect.top;
      
      let rawProgress = currentScroll / totalScrollDistance;
      rawProgress = Math.max(0, Math.min(1, rawProgress));

      // We want the heart to form between 30% and 70% of this section
      particleProgress = Math.max(0, Math.min(1, (rawProgress - 0.3) / 0.4));
      
      // If we are approaching or inside the section, boost opacity
      if (rawProgress > 0.1 && rawProgress < 0.9) {
        // Boost opacity to 0.8 smoothly
        const opacityBoost = Math.sin((rawProgress - 0.1) / 0.8 * Math.PI); // bell curve
        opacityTarget = Math.max(opacityTarget, 0.8 * opacityBoost);
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
      </bufferGeometry>
      <PointMaterial transparent color="#FF6B6B" size={0.06} sizeAttenuation={true} depthWrite={false} opacity={0.3} />
    </points>
  );
}

export default function CinematicBackground() {
  return (
    <div 
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
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <fog attach="fog" args={['#ffffff', 5, 20]} />
        <ParticlesScene />
      </Canvas>
    </div>
  );
}

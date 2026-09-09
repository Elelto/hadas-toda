import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { motion, useScroll, useTransform } from 'framer-motion';
import '../styles/threed-story.css';

const PARTICLE_COUNT = 2500;

function ParticlesScene({ scrollYProgress }) {
  const pointsRef = useRef();

  const { chaosPositions, heartPositions } = useMemo(() => {
    const chaos = new Float32Array(PARTICLE_COUNT * 3);
    const heart = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      chaos[i3] = (Math.random() - 0.5) * 20;
      chaos[i3 + 1] = (Math.random() - 0.5) * 20;
      chaos[i3 + 2] = (Math.random() - 0.5) * 20;

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
    
    // Read the framer-motion value synchronously
    let progress = scrollYProgress.get();
    
    // Add easing so the transformation is more distinct
    // Map progress 0.2 -> 0.8 to 0 -> 1 for the particles
    let particleProgress = Math.max(0, Math.min(1, (progress - 0.2) / 0.6));

    const positions = pointsRef.current.geometry.attributes.position.array;
    const time = state.clock.elapsedTime;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      let targetX = THREE.MathUtils.lerp(chaosPositions[i3], heartPositions[i3], particleProgress);
      let targetY = THREE.MathUtils.lerp(chaosPositions[i3 + 1], heartPositions[i3 + 1], particleProgress);
      let targetZ = THREE.MathUtils.lerp(chaosPositions[i3 + 2], heartPositions[i3 + 2], particleProgress);

      const floatNoise = Math.sin(time * 0.5 + i) * 0.02;
      targetX += floatNoise;
      targetY += Math.cos(time * 0.5 + i) * 0.02;

      positions[i3] = targetX;
      positions[i3 + 1] = targetY;
      positions[i3 + 2] = targetZ;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.rotation.y = time * 0.15;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={PARTICLE_COUNT} array={initialPositions} itemSize={3} />
      </bufferGeometry>
      <PointMaterial transparent color="#FF6B6B" size={0.06} sizeAttenuation={true} depthWrite={false} opacity={0.8} />
    </points>
  );
}

export default function ThreeDStorySection() {
  const containerRef = useRef(null);
  
  // Track scroll strictly within this container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Text Animations based on scroll progress
  const opacity1 = useTransform(scrollYProgress, [0, 0.2, 0.3, 0.4], [0, 1, 1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.35, 0.5, 0.6, 0.7], [0, 1, 1, 0]);
  const opacity3 = useTransform(scrollYProgress, [0.65, 0.8, 1, 1], [0, 1, 1, 1]);

  const y1 = useTransform(scrollYProgress, [0, 0.2], [50, 0]);
  const y2 = useTransform(scrollYProgress, [0.35, 0.5], [50, 0]);
  const y3 = useTransform(scrollYProgress, [0.65, 0.8], [50, 0]);

  return (
    <section ref={containerRef} className="story-container">
      <div className="story-sticky">
        {/* The 3D Canvas Layer */}
        <div className="story-canvas-wrapper">
          <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
            <fog attach="fog" args={['#ffffff', 5, 15]} />
            <ParticlesScene scrollYProgress={scrollYProgress} />
          </Canvas>
        </div>

        {/* The Text Narrative Layer */}
        <div className="story-text-wrapper">
          <motion.div className="story-text-block" style={{ opacity: opacity1, y: y1 }}>
            <h3>קשיי דיבור ותקשורת...</h3>
            <p>עלולים ליצור חוויה יומיומית של תסכול, פיזור וניתוק מהסביבה.</p>
          </motion.div>

          <motion.div className="story-text-block" style={{ opacity: opacity2, y: y2 }}>
            <h3>באמצעות אבחון מדויק וטיפול מותאם</h3>
            <p>אנחנו אוספים את החלקים, מחזקים את השרירים ובונים מחדש את הביטחון.</p>
          </motion.div>

          <motion.div className="story-text-block final-block" style={{ opacity: opacity3, y: y3 }}>
            <h3>כדי שהקול שלך יישמע.</h3>
            <p>חזק, ברור ומלא נוכחות.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

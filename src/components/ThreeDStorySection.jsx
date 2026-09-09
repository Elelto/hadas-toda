import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import '../styles/threed-story.css';

export default function ThreeDStorySection() {
  const scrollContainerRef = useRef(null);
  
  // Track raw scroll progress
  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ["start start", "end end"]
  });

  // CRITICAL FIX: Add a physics spring to the scroll progress.
  // If the user scrolls violently fast, this "absorbs" the shock and forces 
  // the animation to play out at a smooth, elegant maximum speed.
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 20,
    restDelta: 0.001
  });

  // Communicate progress to the global CinematicBackground (for the heart)
  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (latest) => {
      window.dispatchEvent(new CustomEvent('storyScrollProgress', { detail: latest }));
    });
    return () => unsubscribe();
  }, [smoothProgress]);

  // NON-OVERLAPPING MAPPING
  // Slide 1 completely fades out at 0.3. Slide 2 only starts at 0.35.
  // This guarantees NO "blur of words" where texts render on top of each other.
  
  // Slide 1: 0.0 -> 0.3
  const opacity1 = useTransform(smoothProgress, [0, 0.1, 0.25, 0.3], [0, 1, 1, 0]);
  const y1 = useTransform(smoothProgress, [0, 0.1, 0.25, 0.3], [30, 0, 0, -30]);

  // Slide 2: 0.35 -> 0.65
  const opacity2 = useTransform(smoothProgress, [0.35, 0.45, 0.6, 0.65], [0, 1, 1, 0]);
  const y2 = useTransform(smoothProgress, [0.35, 0.45, 0.6, 0.65], [30, 0, 0, -30]);

  // Slide 3: 0.7 -> 1.0
  const opacity3 = useTransform(smoothProgress, [0.7, 0.8, 1], [0, 1, 1]);
  const y3 = useTransform(smoothProgress, [0.7, 0.8, 1], [30, 0, 0]);

  return (
    <section id="cinematic-story-anchor" className="story-fasttrack-wrapper" ref={scrollContainerRef}>
      <div className="story-sticky-container">
        
        <motion.div className="story-text-block absolute-center" style={{ opacity: opacity1, y: y1 }}>
          <h3>קשיי דיבור ותקשורת...</h3>
        </motion.div>

        <motion.div className="story-text-block absolute-center" style={{ opacity: opacity2, y: y2 }}>
          <h3>יכולים להרגיש לפעמים כמו רעש מפוזר.</h3>
          <p>רגעים שבהם המילים מתקשות לצאת, או שהקול בוגד בנו.</p>
        </motion.div>

        <motion.div className="story-text-block absolute-center" style={{ opacity: opacity3, y: y3 }}>
          <h3>אבל עם הכוונה מקצועית, הכל מתחבר.</h3>
          <p>נאסוף את השברים, ונבנה מחדש את הביטחון שלכם לדבר.</p>
        </motion.div>

      </div>
    </section>
  );
}

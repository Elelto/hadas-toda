import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import '../styles/threed-story.css';

export default function ThreeDStorySection() {
  const scrollContainerRef = useRef(null);
  
  // Track scroll progress purely within this 150vh container
  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ["start start", "end end"]
  });

  // Communicate progress to the global CinematicBackground (for the heart)
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      window.dispatchEvent(new CustomEvent('storyScrollProgress', { detail: latest }));
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Map progress (0 to 1) to opacity and position of the 3 text blocks.
  // Because the section is only 150vh, this will feel very fast and responsive.
  
  // Slide 1: 0.0 -> 0.3
  const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.25, 0.35], [0, 1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.1, 0.25, 0.35], [20, 0, 0, -20]);

  // Slide 2: 0.3 -> 0.65
  const opacity2 = useTransform(scrollYProgress, [0.3, 0.4, 0.55, 0.65], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.3, 0.4, 0.55, 0.65], [20, 0, 0, -20]);

  // Slide 3: 0.65 -> 1.0
  const opacity3 = useTransform(scrollYProgress, [0.6, 0.75, 1], [0, 1, 1]);
  const y3 = useTransform(scrollYProgress, [0.6, 0.75, 1], [20, 0, 0]);

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

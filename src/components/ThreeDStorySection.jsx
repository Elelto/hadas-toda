import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import '../styles/threed-story.css';

export default function ThreeDStorySection() {
  const scrollContainerRef = useRef(null);
  
  // Track the internal scroll of the snap container
  const { scrollYProgress } = useScroll({
    container: scrollContainerRef
  });

  // Magnetic Scroll: Snap page to center when user gets close
  useEffect(() => {
    let isSnapping = false;

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting && !isSnapping) {
        const section = document.getElementById('cinematic-story-anchor');
        if (section) {
          isSnapping = true;
          section.scrollIntoView({ behavior: 'smooth', block: 'center' });
          
          // Prevent rapid re-snapping
          setTimeout(() => {
            isSnapping = false;
          }, 1000);
        }
      }
    }, { threshold: 0.6 });

    const el = document.getElementById('cinematic-story-anchor');
    if (el) {
      observer.observe(el);
    }
    
    return () => observer.disconnect();
  }, []);

  // We need to communicate this internal progress to the global CinematicBackground.
  // The cleanest way without Context is a custom DOM event or global window variable.
  // We'll use a custom event.
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      window.dispatchEvent(new CustomEvent('storyScrollProgress', { detail: latest }));
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // We have 3 slides. 
  // Slide 0: progress 0
  // Slide 1: progress 0.5
  // Slide 2: progress 1.0

  return (
    <section id="cinematic-story-anchor" className="story-snap-wrapper">
      <div className="story-snap-container" ref={scrollContainerRef}>
        
        <div className="snap-slide">
          <motion.div 
            className="story-text-block"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h3>קשיי דיבור ותקשורת...</h3>
          </motion.div>
        </div>

        <div className="snap-slide">
          <motion.div 
            className="story-text-block"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h3>יכולים להרגיש לפעמים כמו רעש מפוזר.</h3>
            <p>רגעים שבהם המילים מתקשות לצאת, או שהקול בוגד בנו.</p>
          </motion.div>
        </div>

        <div className="snap-slide">
          <motion.div 
            className="story-text-block"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h3>אבל עם הכוונה מקצועית, הכל מתחבר.</h3>
            <p>נאסוף את השברים, ונבנה מחדש את הביטחון שלכם לדבר.</p>
          </motion.div>
        </div>

      </div>
    </section>
  );
}

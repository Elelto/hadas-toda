import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import '../styles/threed-story.css';

export default function ThreeDStorySection() {
  const scrollContainerRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  
  // Track raw scroll progress
  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ["start start", "end end"]
  });

  // Convert continuous scroll into discrete steps
  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      if (latest < 0.3) {
        setActiveStep(0);
      } else if (latest >= 0.3 && latest < 0.6) {
        setActiveStep(1);
      } else {
        setActiveStep(2);
      }
    });
  }, [scrollYProgress]);

  // Communicate discrete progress to the global CinematicBackground (for the heart)
  useEffect(() => {
    let targetProgress = 0.1;
    if (activeStep === 1) targetProgress = 0.5;
    if (activeStep === 2) targetProgress = 1.0;
    
    window.dispatchEvent(new CustomEvent('storyScrollProgress', { detail: targetProgress }));
  }, [activeStep]);

  return (
    <section id="cinematic-story-anchor" className="story-fasttrack-wrapper" ref={scrollContainerRef}>
      <div className="story-sticky-container">
        
        <motion.div 
          className="story-text-block absolute-center" 
          animate={{ opacity: activeStep === 0 ? 1 : 0, y: activeStep === 0 ? 0 : (activeStep > 0 ? -30 : 30) }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <h3>קשיי דיבור ותקשורת...</h3>
        </motion.div>

        <motion.div 
          className="story-text-block absolute-center" 
          animate={{ opacity: activeStep === 1 ? 1 : 0, y: activeStep === 1 ? 0 : (activeStep > 1 ? -30 : 30) }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <h3>יכולים להרגיש לפעמים כמו רעש מפוזר.</h3>
          <p>רגעים שבהם המילים מתקשות לצאת, או שהקול בוגד בנו.</p>
        </motion.div>

        <motion.div 
          className="story-text-block absolute-center" 
          animate={{ opacity: activeStep === 2 ? 1 : 0, y: activeStep === 2 ? 0 : 30 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <h3>אבל עם הכוונה מקצועית, הכל מתחבר.</h3>
          <p>נאסוף את השברים, ונבנה מחדש את הביטחון שלכם לדבר.</p>
        </motion.div>

      </div>
    </section>
  );
}

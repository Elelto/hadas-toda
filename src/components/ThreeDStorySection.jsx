import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import '../styles/threed-story.css';

export default function ThreeDStorySection() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const opacity1 = useTransform(scrollYProgress, [0, 0.2, 0.3, 0.4], [0, 1, 1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.35, 0.5, 0.6, 0.7], [0, 1, 1, 0]);
  const opacity3 = useTransform(scrollYProgress, [0.65, 0.8, 1, 1], [0, 1, 1, 1]);

  const y1 = useTransform(scrollYProgress, [0, 0.2], [50, 0]);
  const y2 = useTransform(scrollYProgress, [0.35, 0.5], [50, 0]);
  const y3 = useTransform(scrollYProgress, [0.65, 0.8], [50, 0]);

  return (
    <section ref={containerRef} id="cinematic-story-anchor" className="story-container">
      <div className="story-sticky">
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

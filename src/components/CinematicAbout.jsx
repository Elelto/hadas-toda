import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../styles/cinematic-about.css';

export default function CinematicAbout({ content, experienceYearsLabel }) {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "center center"]
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [50, 0]);

  return (
    <section ref={containerRef} className="cinematic-about-wrapper section-padding">
      <div className="container">
        <motion.div 
          style={{ opacity, scale, y }} 
          className="cinematic-about-glass-panel"
        >
          <div className="bb-about-wrapper reverse-layout-mobile">
            
            <div className="bb-about-content">
              <h2>{content?.title}</h2>
              <div className="header-underline align-right"></div>
              <p className="lead-text">{content?.paragraph1}</p>
              <p>{content?.paragraph2}</p>
              <p>{content?.paragraph3}</p>
              <Link to="/about" className="bb-btn btn-soft-glow btn-soft-glow-primary mt-4">
                קראו עוד על הגישה שלי
              </Link>
            </div>

            <div className="bb-about-image cinematic-about-visual-side">
              <div className="bb-about-visual">
                <div className="visual-decoration circle-bg"></div>
                
                <div className="visual-card main-card glass-card cinematic-floating-card-1">
                  <h3>
                    <span className="icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                    </span> 
                    הגישה הטיפולית
                  </h3>
                  <ul>
                    <li>יחס אישי, סבלני ורגיש</li>
                    <li>התמחות בהפרעות קול וצרידות</li>
                    <li>זמינות וגמישות בשעות</li>
                    <li>קליניקה נעימה בבני ברק</li>
                  </ul>
                </div>

                <div className="visual-card stat-card glass-card cinematic-floating-card-2">
                  <span className="number">{experienceYearsLabel}</span>
                  <span className="text">שנות ניסיון</span>
                </div>
              </div>
            </div>
            
          </div>
        </motion.div>
      </div>
    </section>
  );
}

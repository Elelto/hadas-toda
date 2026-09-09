import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../styles/cinematic-services.css';

// We pass the same config and data from Home.jsx
export default function CinematicServices({ title, subtitle, specializations, config }) {
  const targetRef = useRef(null);
  
  // Track scroll over the height of the section (e.g. 300vh)
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Transform scroll progress (0-1) to X translation
  // If there are 5 cards, we need to scroll them across the screen.
  // We move the container horizontally from 0% to a negative percentage.
  // We use standard percentages, mapping 0-1 to "0%" -> "-100% + screenWidth" 
  // For simplicity, a hardcoded range or calc() is easiest.
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section ref={targetRef} className="cinematic-services-wrapper">
      <div className="cinematic-services-sticky">
        
        <div className="cinematic-services-header">
          <h2>{title || 'תחומי המומחיות שלי'}</h2>
          <div className="header-underline"></div>
          <p>{subtitle}</p>
        </div>

        <div className="cinematic-services-viewport">
          <motion.div style={{ x }} className="cinematic-services-track">
            {specializations?.map((spec, index) => {
              const specConfig = config[spec.icon] || config['voice'];
              return (
                <div 
                  key={index} 
                  className="cinematic-service-card glass-card"
                  style={{ '--hover-color': specConfig.color }}
                >
                  <div
                    className="spec-icon"
                    style={{
                      color: specConfig.color,
                      background: specConfig.bg,
                      boxShadow: `0 4px 15px ${specConfig.color}30`
                    }}
                  >
                    {specConfig.icon}
                  </div>
                  <h3 className="spec-title">{spec.name}</h3>
                  <p className="spec-description">{spec.description}</p>
                </div>
              );
            })}
          </motion.div>
        </div>

        <div className="cinematic-services-footer">
          <Link to="/services" className="link-arrow">
            לכל הטיפולים והשירותים ←
          </Link>
        </div>

      </div>
    </section>
  );
}

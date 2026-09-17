import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../styles/cinematic-bento.css';

export default function CinematicBentoServices({ title, subtitle, specializations, config }) {
  // Framer Motion variants for stagger
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 20 }
    }
  };

  return (
    <section className="bento-services-wrapper section-padding">
      <div className="container">
        
        <div className="section-header-center" data-aos="fade-up">
          <h2>{title || 'תחומי המומחיות שלי'}</h2>
          <div className="header-underline"></div>
          <p>{subtitle}</p>
        </div>

        <motion.div 
          className="bento-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {specializations?.map((spec, index) => {
            const specConfig = config[spec.icon] || config['voice'];
            
            // Assign specific grid classes based on index to create the Bento shape
            let bentoClass = "bento-card-standard";
            if (index === 0) bentoClass = "bento-card-large"; // e.g., Voice therapy
            if (index === 3) bentoClass = "bento-card-wide";  // e.g., Language

            return (
              <motion.div 
                key={index} 
                className={`bento-card glass-card ${bentoClass}`}
                variants={itemVariants}
                style={{ '--hover-color': specConfig.color }}
              >
                <div className="bento-card-content">
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
                  <div className="bento-text">
                    <h3 className="spec-title">{spec.name}</h3>
                    <p className="spec-description">{spec.description}</p>
                  </div>
                </div>
                
                {/* Decorative background glow that activates on hover */}
                <div 
                  className="bento-glow" 
                  style={{ background: `radial-gradient(circle at bottom right, ${specConfig.color}20, transparent 70%)` }}
                ></div>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="services-cta-wrapper" data-aos="fade-up">
          <Link to="/services" className="link-arrow">
            לכל הטיפולים והשירותים ←
          </Link>
        </div>

      </div>
    </section>
  );
}

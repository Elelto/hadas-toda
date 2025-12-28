import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './SiteNotice.css';

const SiteNotice = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Show notice only on blog pages
    const isBlogPage = location.pathname.startsWith('/blog');
    
    if (!isBlogPage) {
      setIsVisible(false);
      return;
    }
    
    // Show notice after a short delay on blog pages
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [location.pathname]);

  const handleClose = () => {
    setIsClosing(true);
    
    // Hide after animation completes
    setTimeout(() => {
      setIsVisible(false);
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div className={`site-notice-overlay ${isClosing ? 'closing' : ''}`}>
      <div className={`site-notice-bubble ${isClosing ? 'closing' : ''}`}>
        <button className="site-notice-close" onClick={handleClose} aria-label="סגור הודעה">
          ×
        </button>
        
        <div className="site-notice-content">
          <div className="site-notice-icon">
            🚧
          </div>
          
          <h3 className="site-notice-title">
            אתר בבניה והרצה
          </h3>
          
          <p className="site-notice-text">
            האתר עדיין לא עבר הגהה מקצועית מלאה.
            <br />
            השימוש באתר הוא על אחריות המשתמש בלבד.
          </p>
          
          <button className="site-notice-button" onClick={handleClose}>
            הבנתי
          </button>
        </div>
      </div>
    </div>
  );
};

export default SiteNotice;

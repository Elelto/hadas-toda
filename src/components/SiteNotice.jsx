import React, { useState, useEffect } from 'react';
import './SiteNotice.css';

const SiteNotice = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Check if user has already dismissed the notice
    const hasSeenNotice = localStorage.getItem('siteNoticeShown');
    
    if (!hasSeenNotice) {
      // Show notice after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    
    // Hide after animation completes
    setTimeout(() => {
      setIsVisible(false);
      localStorage.setItem('siteNoticeShown', 'true');
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

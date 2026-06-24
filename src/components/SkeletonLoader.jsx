import React from 'react';
import '../styles/skeleton.css';

const SkeletonLoader = () => {
  return (
    <div className="home-page-v2 skeleton-page-wrapper" role="status" aria-busy="true" aria-live="polite">
      <span className="sr-only" style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', whiteSpace: 'nowrap', borderWidth: 0 }}>האתר נטען...</span>
      
      {/* Skeleton Hero Section - Exact match of Home.jsx hero */}
      <section className="bb-hero home-hero-wrapper" style={{ pointerEvents: 'none' }}>
        <div className="bb-hero-overlay"></div>
        
        {/* Placeholder for background shapes to maintain any potential stacking context */}
        <div className="hero-background-shapes"></div>

        <div className="container bb-hero-content">
          <div className="bb-hero-text">
            <div className="hero-badge-container">
              {/* Badge */}
              <span className="bb-badge skeleton-bg skeleton-text-inline" style={{ width: '180px', color: 'transparent', border: 'none' }}>&nbsp;</span>
            </div>
            
            {/* Title */}
            <h1 className="skeleton-bg skeleton-text-inline" style={{ width: '85%', color: 'transparent' }}>&nbsp;</h1>
            
            {/* Subtitle */}
            <p className="bb-subtitle skeleton-bg skeleton-text-inline" style={{ width: '70%', color: 'transparent' }}>&nbsp;</p>
            
            {/* Description lines (multi-line) */}
            <p className="bb-description">
              <span className="skeleton-bg skeleton-description-line"></span>
              <span className="skeleton-bg skeleton-description-line"></span>
              <span className="skeleton-bg skeleton-description-line short"></span>
            </p>
            
            {/* Actions */}
            <div className="bb-actions">
              <div className="bb-btn skeleton-bg" style={{ width: '220px', color: 'transparent', border: 'none', boxShadow: 'none' }}>&nbsp;</div>
            </div>
          </div>

          <div className="bb-hero-shape">
            {/* Shape override prevents image from loading and removes box-shadow, keeping the exact dimensions and border-radius morphing */}
            <div className="shape-circle skeleton-bg skeleton-shape-override"></div>
          </div>
        </div>

        <div className="wave-bottom">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
          </svg>
        </div>
      </section>

      {/* Social Proof Bar Skeleton */}
      <div className="social-proof-bar" style={{ pointerEvents: 'none' }}>
        {[1, 2, 3].map((i) => (
          <div key={i} className="social-proof-stat">
            <span className="stat-number skeleton-bg skeleton-text-inline" style={{ width: '60px', height: '40px', color: 'transparent', display: 'block', margin: '0 auto' }}>&nbsp;</span>
            <span className="stat-label skeleton-bg skeleton-text-inline" style={{ width: '100px', height: '20px', color: 'transparent', marginTop: '10px', display: 'block', margin: '10px auto 0' }}>&nbsp;</span>
          </div>
        ))}
      </div>

      {/* Services Section Skeleton */}
      <section className="bb-services section-padding" style={{ pointerEvents: 'none' }}>
        <div className="container">
          <div className="section-header-center">
            <h2 className="skeleton-bg skeleton-text-inline" style={{ width: '250px', height: '40px', color: 'transparent', margin: '0 auto' }}>&nbsp;</h2>
            <div className="header-underline skeleton-bg" style={{ background: 'transparent' }}></div>
            <p className="skeleton-bg skeleton-text-inline" style={{ width: '60%', height: '20px', color: 'transparent', margin: '0 auto' }}>&nbsp;</p>
          </div>

          <div className="bb-services-grid-specializations">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="bb-specialization-card glass-card">
                <div className="spec-icon skeleton-bg" style={{ width: '60px', height: '60px', borderRadius: '16px', margin: '0 auto 1.5rem' }}></div>
                <h3 className="spec-title skeleton-bg skeleton-text-inline" style={{ width: '120px', height: '24px', margin: '0 auto 1rem', display: 'block' }}>&nbsp;</h3>
                <p className="spec-description skeleton-bg skeleton-description-line"></p>
                <p className="spec-description skeleton-bg skeleton-description-line"></p>
                <p className="spec-description skeleton-bg skeleton-description-line short"></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section Skeleton */}
      <section className="bb-about section-padding bg-light" style={{ pointerEvents: 'none' }}>
        <div className="container">
          <div className="bb-about-wrapper reverse-layout-mobile">
            <div className="bb-about-content">
              <h2 className="skeleton-bg skeleton-text-inline" style={{ width: '300px', height: '40px', color: 'transparent' }}>&nbsp;</h2>
              <div className="header-underline align-right"></div>
              <p className="lead-text skeleton-bg skeleton-description-line" style={{ height: '24px', marginBottom: '1.5rem' }}></p>
              <p className="skeleton-bg skeleton-description-line"></p>
              <p className="skeleton-bg skeleton-description-line"></p>
              <p className="skeleton-bg skeleton-description-line short"></p>
              <div className="bb-btn skeleton-bg mt-4" style={{ width: '180px', height: '48px', border: 'none', borderRadius: '30px' }}></div>
            </div>
            <div className="bb-about-image">
              <div className="bb-about-visual">
                <div className="visual-decoration circle-bg skeleton-bg" style={{ opacity: 0.2 }}></div>
                <div className="visual-card main-card glass-card skeleton-bg" style={{ height: '350px', border: 'none' }}></div>
                <div className="visual-card stat-card glass-card skeleton-bg" style={{ width: '120px', height: '120px', border: 'none' }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Skeleton */}
      <section className="bb-testimonials section-padding" style={{ pointerEvents: 'none' }}>
        <div className="container">
          <div className="section-header-center">
            <h2 className="skeleton-bg skeleton-text-inline" style={{ width: '250px', height: '40px', color: 'transparent', margin: '0 auto' }}>&nbsp;</h2>
            <div className="header-underline skeleton-bg" style={{ background: 'transparent' }}></div>
            <p className="skeleton-bg skeleton-text-inline" style={{ width: '50%', height: '20px', color: 'transparent', margin: '0 auto' }}>&nbsp;</p>
          </div>
          
          <div className="testimonials-carousel-wrapper" style={{ display: 'flex', gap: '24px', justifyContent: 'center', overflow: 'hidden' }}>
            {[1, 2, 3].map((i) => (
              <div key={i} className="rec-image-card glass-card skeleton-bg" style={{ width: '100%', maxWidth: '400px', height: '560px', flexShrink: 0, border: 'none' }}></div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SkeletonLoader;

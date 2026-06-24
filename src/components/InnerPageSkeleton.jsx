import React from 'react';
import '../styles/skeleton.css';

const InnerPageSkeleton = () => {
  return (
    <div className="page-reveal skeleton-page-wrapper" role="status" aria-busy="true" aria-live="polite">
      <span className="sr-only" style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', whiteSpace: 'nowrap', borderWidth: 0 }}>העמוד נטען...</span>
      
      {/* Inner Page Hero/Header Skeleton */}
      <section className="about-hero" style={{ pointerEvents: 'none', minHeight: '30vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 className="skeleton-bg skeleton-text-inline" style={{ width: '300px', height: '48px', color: 'transparent', margin: '0 auto 1rem' }}>&nbsp;</h1>
          <div className="skeleton-bg skeleton-text-inline" style={{ width: '60%', height: '24px', color: 'transparent', margin: '0 auto' }}>&nbsp;</div>
        </div>
      </section>

      {/* Content Skeleton */}
      <section className="section-padding" style={{ pointerEvents: 'none' }}>
        <div className="container">
          <div className="section-header-center">
            <h2 className="skeleton-bg skeleton-text-inline" style={{ width: '250px', height: '40px', color: 'transparent', margin: '0 auto' }}>&nbsp;</h2>
            <div className="header-underline skeleton-bg" style={{ background: 'transparent' }}></div>
          </div>
          
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <p className="skeleton-bg skeleton-description-line" style={{ height: '20px', marginBottom: '1rem' }}></p>
            <p className="skeleton-bg skeleton-description-line" style={{ height: '20px', marginBottom: '1rem' }}></p>
            <p className="skeleton-bg skeleton-description-line short" style={{ height: '20px', marginBottom: '2rem' }}></p>
            
            <p className="skeleton-bg skeleton-description-line" style={{ height: '20px', marginBottom: '1rem' }}></p>
            <p className="skeleton-bg skeleton-description-line" style={{ height: '20px', marginBottom: '1rem' }}></p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InnerPageSkeleton;

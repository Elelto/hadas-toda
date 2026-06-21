import React from 'react';
import '../styles/skeleton.css';

const SkeletonLoader = () => {
  return (
    <div className="skeleton-container" role="status" aria-busy="true" aria-live="polite">
      <span className="sr-only" style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', whiteSpace: 'nowrap', borderWidth: 0 }}>האתר נטען...</span>
      <div className="skeleton-hero">
        <div className="skeleton-text">
          <div className="skeleton-line badge"></div>
          <div className="skeleton-line title"></div>
          <div className="skeleton-line subtitle"></div>
          <div className="skeleton-line desc"></div>
          <div className="skeleton-line desc"></div>
          <div className="skeleton-line desc short"></div>
          <div className="skeleton-line btn"></div>
        </div>
        <div className="skeleton-shape">
          <div className="skeleton-circle"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;

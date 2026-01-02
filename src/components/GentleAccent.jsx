import React from 'react';

const GentleAccent = ({ className = '', color = '#7ca9aa' }) => { // Using a Teal/Sage color for contrast or matches brand
    return (
        <div className={`gentle-accent ${className}`} style={{ display: 'inline-flex', alignItems: 'center', height: '100%' }}>
            <svg
                width="34"
                height="12"
                viewBox="0 0 34 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ overflow: 'visible' }}
            >
                {/* A simple, elegant "smile" or swoosh curve */}
                <path
                    d="M2 2C10 12 24 12 32 2"
                    stroke={color}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    className="accent-path"
                    opacity="0.7"
                />
            </svg>
            <style jsx>{`
          .accent-path {
             stroke-dasharray: 40;
             stroke-dashoffset: 40;
             animation: gentleDraw 1.5s ease-out forwards;
          }
          @keyframes gentleDraw {
            to {
              stroke-dashoffset: 0;
            }
          }
        `}</style>
        </div>
    );
};

export default GentleAccent;

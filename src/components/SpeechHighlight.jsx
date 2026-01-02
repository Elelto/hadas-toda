import React from 'react';

const SpeechHighlight = ({ className = '', color = '#b97ba0' }) => {
    return (
        <div className={`speech-highlight ${className}`} style={{ display: 'inline-block', position: 'relative' }}>
            <svg
                width="40"
                height="30"
                viewBox="0 0 50 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ opacity: 0.8 }}
            >
                {/* A soft speech bubble outline */}
                <path
                    d="M5,20 Q5,5 25,5 Q45,5 45,20 Q45,35 25,35 L15,40 L18,34 Q5,34 5,20 Z"
                    stroke={color}
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="speech-bubble-path"
                />
                {/* Small accent lines inside */}
                <path d="M15,20 L35,20" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.5" />
                <path d="M15,26 L28,26" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.5" />
            </svg>
            <style jsx>{`
          .speech-bubble-path {
             animation: draw 2s ease-out forwards;
             stroke-dasharray: 120;
             stroke-dashoffset: 120;
          }
          @keyframes draw {
            to {
              stroke-dashoffset: 0;
            }
          }
        `}</style>
        </div>
    );
};

export default SpeechHighlight;

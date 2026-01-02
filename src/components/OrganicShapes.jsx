import React from 'react';
import '../styles/organic-shapes.css';

const OrganicShapes = ({ variant = 'default' }) => {
    return (
        <div className={`organic-shapes-container variant-${variant}`}>
            <div className="organic-shape shape-1"></div>
            <div className="organic-shape shape-2"></div>
            <div className="organic-shape shape-3"></div>
        </div>
    );
};

export default OrganicShapes;

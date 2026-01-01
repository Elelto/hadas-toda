import React, { useState, useEffect } from 'react';
import '../styles/accessibility.css';

const AccessibilityWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [settings, setSettings] = useState({
        textSize: 0, // 0: normal, 1: large, 2: xlarge
        highContrast: false,
        highlightLinks: false,
        readableFont: false,
        stopAnimations: false
    });

    // Load settings from localStorage
    useEffect(() => {
        const savedSettings = localStorage.getItem('accessibility-settings');
        if (savedSettings) {
            setSettings(JSON.parse(savedSettings));
        }
    }, []);

    // Apply settings to body
    useEffect(() => {
        const body = document.body;

        // Text Size
        body.classList.remove('text-large', 'text-xlarge');
        if (settings.textSize === 1) body.classList.add('text-large');
        if (settings.textSize === 2) body.classList.add('text-xlarge');

        // High Contrast
        if (settings.highContrast) body.classList.add('high-contrast');
        else body.classList.remove('high-contrast');

        // Highlight Links
        if (settings.highlightLinks) body.classList.add('highlight-links');
        else body.classList.remove('highlight-links');

        // Readable Font
        if (settings.readableFont) body.classList.add('readable-font');
        else body.classList.remove('readable-font');

        // Stop Animations
        if (settings.stopAnimations) body.classList.add('stop-animations');
        else body.classList.remove('stop-animations');

        // Save to localStorage
        localStorage.setItem('accessibility-settings', JSON.stringify(settings));

    }, [settings]);

    const toggleOpen = () => setIsOpen(!isOpen);

    const updateSetting = (key, value) => {
        setSettings(prev => {
            // Toggle logic for simple boolean values
            if (value === undefined) {
                return { ...prev, [key]: !prev[key] };
            }
            return { ...prev, [key]: value };
        });
    };

    const cycleTextSize = () => {
        setSettings(prev => ({
            ...prev,
            textSize: (prev.textSize + 1) % 3
        }));
    };

    const resetSettings = () => {
        setSettings({
            textSize: 0,
            highContrast: false,
            highlightLinks: false,
            readableFont: false,
            stopAnimations: false
        });
    };

    const IconText = () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 7V4h16v3M9 20h6M12 4v16" />
        </svg>
    );

    const IconContrast = () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a10 10 0 0 1 10 10 10 10 0 0 1-10 10V2z" />
        </svg>
    );

    const IconLinks = () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
    );

    const IconFont = () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="4 7 4 4 20 4 20 7" />
            <line x1="9" y1="20" x2="15" y2="20" />
            <line x1="12" y1="4" x2="12" y2="20" />
        </svg>
    );

    const IconAnimation = () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polygon points="10 8 16 12 10 16 10 8" />
        </svg>
    );

    return (
        <div className="accessibility-widget">
            <button
                className="accessibility-toggle-btn"
                onClick={toggleOpen}
                aria-label="תפריט נגישות"
                title="נגישות"
            >
                <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
            </button>

            <div className={`accessibility-menu ${isOpen ? 'open' : ''}`}>
                <div className="accessibility-header">
                    <h3>כלי נגישות</h3>
                    <button className="close-btn" onClick={() => setIsOpen(false)}>×</button>
                </div>

                <div className="accessibility-controls">
                    <button
                        className={`control-btn ${settings.textSize > 0 ? 'active' : ''}`}
                        onClick={cycleTextSize}
                    >
                        <IconText />
                        <span>גודל טקסט ({settings.textSize === 0 ? 'רגיל' : settings.textSize === 1 ? 'גדול' : 'ענק'})</span>
                    </button>

                    <button
                        className={`control-btn ${settings.highContrast ? 'active' : ''}`}
                        onClick={() => updateSetting('highContrast')}
                    >
                        <IconContrast />
                        <span>ניגודיות</span>
                    </button>

                    <button
                        className={`control-btn ${settings.highlightLinks ? 'active' : ''}`}
                        onClick={() => updateSetting('highlightLinks')}
                    >
                        <IconLinks />
                        <span>הדגשת קישורים</span>
                    </button>

                    <button
                        className={`control-btn ${settings.readableFont ? 'active' : ''}`}
                        onClick={() => updateSetting('readableFont')}
                    >
                        <IconFont />
                        <span>גופן קריא</span>
                    </button>

                    <button
                        className={`control-btn ${settings.stopAnimations ? 'active' : ''}`}
                        onClick={() => updateSetting('stopAnimations')}
                    >
                        <IconAnimation />
                        <span>עצירת אנימציות</span>
                    </button>
                </div>

                <button className="reset-btn" onClick={resetSettings}>
                    איפוס הגדרות
                </button>
            </div>
        </div>
    );
};

export default AccessibilityWidget;

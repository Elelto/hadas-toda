import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/threed-story.css';

export default function ThreeDStorySection() {
  const containerRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsPlaying(true);
        }
      },
      { threshold: 0.5 } // Start playing when 50% visible
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => {
          if (prev < 2) return prev + 1;
          clearInterval(interval);
          return prev;
        });
      }, 3000); // 3 seconds per slide
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Communicate progress to the background
  useEffect(() => {
    if (!isPlaying) return;
    
    let targetProgress = 0;
    if (currentSlide === 0) targetProgress = 0.1;
    if (currentSlide === 1) targetProgress = 0.5;
    if (currentSlide === 2) targetProgress = 1.0;
    
    window.dispatchEvent(new CustomEvent('storyScrollProgress', { detail: targetProgress }));
  }, [currentSlide, isPlaying]);

  const slides = [
    {
      title: "קשיי דיבור ותקשורת...",
      text: ""
    },
    {
      title: "יכולים להרגיש לפעמים כמו רעש מפוזר.",
      text: "רגעים שבהם המילים מתקשות לצאת, או שהקול בוגד בנו."
    },
    {
      title: "אבל עם הכוונה מקצועית, הכל מתחבר.",
      text: "נאסוף את השברים, ונבנה מחדש את הביטחון שלכם לדבר."
    }
  ];

  return (
    <section id="cinematic-story-anchor" className="story-autoplay-wrapper" ref={containerRef}>
      <div className="story-autoplay-container">
        <AnimatePresence mode="wait">
          {isPlaying && (
            <motion.div
              key={currentSlide}
              className="story-text-block"
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <h3>{slides[currentSlide].title}</h3>
              {slides[currentSlide].text && <p>{slides[currentSlide].text}</p>}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

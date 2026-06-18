import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import { FaQuoteRight } from 'react-icons/fa';
import SEOHead from '../components/SEOHead';
import '../styles/testimonials.css';

// Recommendation images (1–10)
const REC_IMAGES = Array.from({ length: 10 }, (_, i) => i + 1);

export default function Testimonials() {
  const [lightboxImage, setLightboxImage] = useState(null);

  useEffect(() => {
    // Refresh AOS when component mounts
    const timer = setTimeout(() => {
      AOS.refresh();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxImage) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') setLightboxImage(null);
      if (e.key === 'ArrowLeft') setLightboxImage(prev => prev === 1 ? 10 : prev - 1);
      if (e.key === 'ArrowRight') setLightboxImage(prev => prev === 10 ? 1 : prev + 1);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxImage]);

  // SEO structured data for testimonials page
  // Note: Removed Review schema as testimonials are not verified reviews
  // Future: Can integrate Google Business reviews widget or link
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "המלצות - הדס תודה",
    "description": "המלצות ממטופלים על הטיפול בקלינאות התקשורת של הדס תודה - סיפורי הצלחה בטיפול בגמגום, צרידות ובעיות קול",
    "url": "https://hadas-toda.co.il/testimonials"
  };

  return (
    <div className="testimonials-page">
      <SEOHead
        title="המלצות"
        description="המלצות ממטופלים על הטיפול בקלינאות התקשורת של הדס תודה. סיפורי הצלחה בטיפול בגמגום, צרידות, בעיות קול ועיכוב שפתי."
        keywords="המלצות, ביקורות, סיפורי הצלחה, טיפול בגמגום, צרידות, הדס תודה, קלינאית תקשורת"
        canonicalUrl="/testimonials"
        structuredData={structuredData}
      />

      <div className="testimonials-hero">
        <div className="container">
          <h1 className="testimonials-title" data-aos="fade-down">הקול שלכם, הסיפור שלי</h1>
          <p className="section-subtitle" data-aos="fade-up" data-aos-delay="200">
            אין דבר מרגש יותר מלראות את השינוי בחיי המטופלים שלי. <br />
            כאן תוכלו לקרוא על החוויות האישיות וסיפורי ההצלחה מהקליניקה.
          </p>
        </div>
      </div>

      <div className="container">
        <section className="testimonials-section">

          <div className="testimonials-gallery">
            {REC_IMAGES.map((num, index) => (
              <div
                key={num}
                className="rec-image-card glass-card"
                data-aos="fade-up"
                data-aos-delay={Math.min(index * 80, 400)}
                onClick={() => setLightboxImage(num)}
                role="button"
                tabIndex={0}
                aria-label={`המלצה ${num} - לחץ להגדלה`}
                onKeyDown={(e) => e.key === 'Enter' && setLightboxImage(num)}
              >
                <div className="rec-image-wrapper">
                  <picture>
                    <source
                      srcSet={`/images/recommendation/optimized/${num}-thumb.webp`}
                      type="image/webp"
                    />
                    <img
                      src={`/images/recommendation/optimized/${num}-thumb.jpg`}
                      alt={`המלצה ממטופל ${num}`}
                      className="rec-image"
                      loading={num <= 3 ? 'eager' : 'lazy'}
                      width="400"
                      height="560"
                    />
                  </picture>
                  <div className="rec-image-overlay" aria-hidden="true">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8"/>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                      <line x1="11" y1="8" x2="11" y2="14"/>
                      <line x1="8" y1="11" x2="14" y2="11"/>
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Lightbox */}
          {lightboxImage && (
            <div
              className="rec-lightbox-overlay"
              onClick={() => setLightboxImage(null)}
              role="dialog"
              aria-modal="true"
              aria-label="תצוגת המלצה מוגדלת"
            >
              <button
                className="rec-lightbox-close"
                onClick={() => setLightboxImage(null)}
                aria-label="סגור"
              >
                ✕
              </button>

              <button
                className="rec-lightbox-nav rec-lightbox-prev"
                onClick={(e) => { e.stopPropagation(); setLightboxImage(prev => prev === 1 ? 10 : prev - 1); }}
                aria-label="הקודם"
              >
                ‹
              </button>

              <div
                className="rec-lightbox-content"
                onClick={(e) => e.stopPropagation()}
              >
                <picture>
                  <source
                    srcSet={`/images/recommendation/optimized/${lightboxImage}.webp`}
                    type="image/webp"
                  />
                  <img
                    src={`/images/recommendation/optimized/${lightboxImage}.jpg`}
                    alt={`המלצה ממטופל ${lightboxImage}`}
                    className="rec-lightbox-img"
                  />
                </picture>
                <div className="rec-lightbox-counter">{lightboxImage} / 10</div>
              </div>

              <button
                className="rec-lightbox-nav rec-lightbox-next"
                onClick={(e) => { e.stopPropagation(); setLightboxImage(prev => prev === 10 ? 1 : prev + 1); }}
                aria-label="הבא"
              >
                ›
              </button>
            </div>
          )}

          <div className="share-testimonial" data-aos="zoom-in" data-aos-delay="200">
            <div className="share-content">
              <h2 className="share-title">הסיפור שלכם חשוב לנו</h2>
              <p className="share-description">
                עזרנו לכם? נשמח מאוד לשמוע מכם! <br />
                המילים שלכם עוזרות לאחרים להגיע לטיפול הנכון עבורם.
              </p>
              <Link to="/contact" className="btn btn-primary">
                רשמו לנו המלצה
              </Link>
            </div>
            <div className="share-decoration">
              <FaQuoteRight />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

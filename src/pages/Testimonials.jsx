import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import { FaQuoteRight } from 'react-icons/fa';
import SEOHead from '../components/SEOHead';
import InnerPageSkeleton from '../components/InnerPageSkeleton';
import { loadYamlContent } from '../utils/yamlLoader';
import '../styles/testimonials.css';

// Helper to resolve dynamic image paths and their optimized versions
const getImgPaths = (imagePath) => {
  if (!imagePath) return {};
  const parts = imagePath.split('/');
  const filename = parts[parts.length - 1];
  const lastDot = filename.lastIndexOf('.');
  const name = lastDot !== -1 ? filename.substring(0, lastDot) : filename;
  
  return {
    original: imagePath,
    fullWebp: `/images/recommendation/optimized/${name}.webp`,
    fullJpg: `/images/recommendation/optimized/${name}.jpg`,
    thumbWebp: `/images/recommendation/optimized/${name}-thumb.webp`,
    thumbJpg: `/images/recommendation/optimized/${name}-thumb.jpg`
  };
};

export default function Testimonials() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [useFallback, setUseFallback] = useState({});

  useEffect(() => {
    const loadContent = async () => {
      try {
        const data = await loadYamlContent('/content/pages/testimonials.yml');
        if (data) {
          setContent(data);
        }
      } catch (err) {
        console.error('Error loading testimonials content:', err);
      } finally {
        setLoading(false);
      }
    };
    loadContent();
  }, []);

  useEffect(() => {
    // Refresh AOS when content changes or mounts
    const timer = setTimeout(() => {
      AOS.refresh();
    }, 150);
    return () => clearTimeout(timer);
  }, [content]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null || !content?.images) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowLeft') setLightboxIndex(prev => prev === 0 ? content.images.length - 1 : prev - 1);
      if (e.key === 'ArrowRight') setLightboxIndex(prev => prev === content.images.length - 1 ? 0 : prev + 1);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxIndex, content]);

  const handleImageError = (id) => {
    setUseFallback(prev => ({ ...prev, [id]: true }));
  };

  const images = (content?.images || []).filter(img => !img.hide);
  const title = content?.title || 'הקול שלכם, הסיפור שלי';
  const subtitle = content?.subtitle || 'אין דבר מרגש יותר מלראות את השינוי בחיי המטופלים שלי. כאן תוכלו לקרוא על החוויות האישיות וסיפורי ההצלחה מהקליניקה.';

  if (loading) {
    return <InnerPageSkeleton />;
  }

  // SEO structured data for testimonials page
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "המלצות - הדס תודה",
    "description": "המלצות ממטופלים על הטיפול בקלינאות התקשורת של הדס תודה - סיפורי הצלחה בטיפול בגמגום, צרידות ובעיות קול",
    "url": "https://hadas-toda.co.il/testimonials"
  };

  return (
    <div className="testimonials-page page-reveal">
      <SEOHead
        title="המלצות"
        description="המלצות ממטופלים על הטיפול בקלינאות התקשורת של הדס תודה. סיפורי הצלחה בטיפול בגמגום, צרידות, בעיות קול ועיכוב שפתי."
        keywords="המלצות, ביקורות, סיפורי הצלחה, טיפול בגמגום, צרידות, הדס תודה, קלינאית תקשורת"
        canonicalUrl="/testimonials"
        structuredData={structuredData}
      />

      <div className="testimonials-hero">
        <div className="container">
          <h1 className="testimonials-title" data-aos="fade-down">{title}</h1>
          <p className="section-subtitle" data-aos="fade-up" data-aos-delay="200">
            {subtitle}
          </p>
        </div>
      </div>

      <div className="container">
        <section className="testimonials-section">
            <div className="testimonials-gallery">
              {images.map((item, index) => {
                const paths = getImgPaths(item.image);
                const itemId = item.image || index;
                return (
                  <div
                    key={itemId}
                    className="rec-image-card glass-card"
                    data-aos="fade-up"
                    data-aos-delay={Math.min(index * 80, 400)}
                    onClick={() => setLightboxIndex(index)}
                    role="button"
                    tabIndex={0}
                    aria-label={`${item.alt || `המלצה ${index + 1}`} - לחץ להגדלה`}
                    onKeyDown={(e) => e.key === 'Enter' && setLightboxIndex(index)}
                  >
                    <div className="rec-image-wrapper">
                      {useFallback[itemId] ? (
                        <img
                          src={paths.original}
                          alt={item.alt || `המלצה ממטופל ${index + 1}`}
                          className="rec-image"
                          loading={index <= 2 ? 'eager' : 'lazy'}
                          width="400"
                          height="560"
                        />
                      ) : (
                        <picture>
                          <source
                            srcSet={paths.thumbWebp}
                            type="image/webp"
                          />
                          <img
                            src={paths.thumbJpg}
                            alt={item.alt || `המלצה ממטופל ${index + 1}`}
                            className="rec-image"
                            loading={index <= 2 ? 'eager' : 'lazy'}
                            width="400"
                            height="560"
                            onError={() => handleImageError(itemId)}
                          />
                        </picture>
                      )}
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
                );
              })}
            </div>
          {lightboxIndex !== null && images[lightboxIndex] && (() => {
            const currentItem = images[lightboxIndex];
            const paths = getImgPaths(currentItem.image);
            const itemId = currentItem.image || lightboxIndex;

            return (
              <div
                className="rec-lightbox-overlay"
                onClick={() => setLightboxIndex(null)}
                role="dialog"
                aria-modal="true"
                aria-label="תצוגת המלצה מוגדלת"
              >
                <button
                  className="rec-lightbox-close"
                  onClick={() => setLightboxIndex(null)}
                  aria-label="סגור"
                >
                  ✕
                </button>

                <button
                  className="rec-lightbox-nav rec-lightbox-prev"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex(prev => prev === 0 ? images.length - 1 : prev - 1);
                  }}
                  aria-label="הקודם"
                >
                  ‹
                </button>

                <div
                  className="rec-lightbox-content"
                  onClick={(e) => e.stopPropagation()}
                >
                  {useFallback[itemId] ? (
                    <img
                      src={paths.original}
                      alt={currentItem.alt || `המלצה ממטופל ${lightboxIndex + 1}`}
                      className="rec-lightbox-img"
                    />
                  ) : (
                    <picture>
                      <source
                        srcSet={paths.fullWebp}
                        type="image/webp"
                      />
                      <img
                        src={paths.fullJpg}
                        alt={currentItem.alt || `המלצה ממטופל ${lightboxIndex + 1}`}
                        className="rec-lightbox-img"
                        onError={() => handleImageError(itemId)}
                      />
                    </picture>
                  )}
                  <div className="rec-lightbox-counter">{lightboxIndex + 1} / {images.length}</div>
                </div>

                <button
                  className="rec-lightbox-nav rec-lightbox-next"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex(prev => prev === images.length - 1 ? 0 : prev + 1);
                  }}
                  aria-label="הבא"
                >
                  ›
                </button>
              </div>
            );
          })()}

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

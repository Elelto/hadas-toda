import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import HomeSkeleton from '../components/HomeSkeleton';
import { loadYamlContent } from '../utils/yamlLoader';
import AOS from 'aos';
import '../styles/home.css';
import '../styles/glass.css';
import AuroraBackground from '../components/AuroraBackground';

import SEOHead from '../components/SEOHead';
import StructuredData from '../components/StructuredData';
import blogPosts from '../data/blogPosts';
import { loadFirebaseCollection } from '../utils/firebaseLoader';
import { getExperienceYearsLabel, getPatientsCountLabel } from '../utils/experience';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import {
  FaMicrophoneAlt,
  FaCommentDots,
  FaStream,
  FaAppleAlt,
  FaAssistiveListeningSystems
} from 'react-icons/fa';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Specialization Configuration (Icon + Color)
const specializationConfig = {
  'voice': {
    icon: <FaMicrophoneAlt />,
    color: '#FF6B6B', // Coral Red
    bg: '#FFE5E5'
  },
  'articulation': {
    icon: <FaCommentDots />,
    color: '#4ECDC4', // Turquoise
    bg: '#E0F7FA'
  },
  'stuttering': {
    icon: <FaStream />, // Stream/Flow for fluency
    color: '#A18CD1', // Purple
    bg: '#F3E5F5'
  },
  'oral': {
    icon: <FaAppleAlt />, // Apple for eating/swallowing/oral function
    color: '#FFB74D', // Orange
    bg: '#FFF3E0'
  },
  'intelligibility': {
    icon: <FaAssistiveListeningSystems />, // Hearing/Understanding
    color: '#4DB6AC', // Teal
    bg: '#E0F2F1'
  },
  // Fallbacks
  '🎤': { icon: <FaMicrophoneAlt />, color: '#FF6B6B', bg: '#FFE5E5' },
  '🗣️': { icon: <FaCommentDots />, color: '#4ECDC4', bg: '#E0F7FA' },
  '💬': { icon: <FaStream />, color: '#A18CD1', bg: '#F3E5F5' },
  '👅': { icon: <FaAppleAlt />, color: '#FFB74D', bg: '#FFF3E0' },
  '🔊': { icon: <FaAssistiveListeningSystems />, color: '#4DB6AC', bg: '#E0F2F1' }
};

// Fallback content function
const getDefaultHomeContent = () => ({
  hero: {
    title: "הדס תודה",
    subtitle: "קלינאית תקשורת מומחית בטיפולי קול, היגוי, גמגום ותפקודי פה",
    description: "נעים להכיר, אני הדס. אני מלווה ילדים ומבוגרים במסעם לשיפור התקשורת והביטחון העצמי. בין אם מדובר באתגרי שפה והיגוי אצל ילדים, או בצרידות וקשיי קול אצל מבוגרים – אני כאן כדי להקשיב, לאבחן ולהתאים תוכנית טיפול אישית שתביא לתוצאות.",
    cta_text: "קביעת פגישת ייעוץ",
    services_text: "לגלות עוד על הטיפולים"
  },
  testimonials: {
    title: "קולות מהקליניקה",
    subtitle: "מה אומרים המטופלים שלי על הטיפול והתוצאות",
  },
  services: {
    title: " תחומי ההתמחות שלי",
    subtitle: "התחומים המקצועיים המרכזיים שבהם אני מתמחה ומספקת טיפול מקצועי",
    specializations: [
      {
        name: "טיפולי קול",
        icon: "voice",
        description: "אבחון וטיפול בהפרעות קול וצרידות. שיקום קולי למורים, מרצים וכל מי שמשתמש בקול באופן מקצועי."
      },
      {
        name: "היגוי",
        icon: "articulation",
        description: "טיפול בשיבושי היגוי והגייה. עבודה ממוקדת על צלילים ספציפיים ושיפור בהירות הדיבור."
      },
      {
        name: "גמגום",
        icon: "stuttering",
        description: "התמודדות עם גמגום והפרעות שטף דיבור באמצעות שיטות טיפוליות מוכחות ומותאמות אישית."
      },
      {
        name: "תפקודי פה",
        icon: "oral",
        description: "טיפול בתפקודי פה, דחיקת לשון, ושיפור תפקוד השרירים המעורבים בדיבור ובליעה."
      },
      {
        name: "מובנות דיבור",
        icon: "intelligibility",
        description: "שיפור מובנות הדיבור והבהרת ההגייה לאנשים שדיבורם לא מובן מספיק."
      }
    ]
  },
  about: {
    title: "נעים להכיר, אני הדס",
    paragraph1: "שמי הדס תודה, קלינאית תקשורת (M.A) עם תשוקה אמיתית לעזור לאנשים למצוא את קולם – תרתי משמע. אני מאמינה שביכולתה של תקשורת טובה לפתוח דלתות, לבנות גשרים ולהעצים כל אדם.",
    paragraph2: "הניסיון שלי כולל עבודה עם מגוון רחב של גילאים ואתגרים: טיפולי קול וצרידות, היגוי ושיבושי הגייה, גמגום ושטף דיבור, תפקודי פה ודחיקת לשון, ושיפור מובנות דיבור.",
    paragraph3: "בקליניקה שלי, כל מטופל מקבל יחס אישי ותוכנית טיפול המותאמת בדיוק עבורו. אני משלבת ידע מקצועי עדכני עם גישה יצירתית ורגישה, כדי להפוך את התהליך הטיפולי לחוויה חיובית ומקדמת."
  },
  blog_section: {
    title: "הבלוג המקצועי",
    subtitle: "מאמרים, טיפים וחידושים בתחום קלינאות התקשורת"
  }
});

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

export default function Home() {
  const [homeContent, setHomeContent] = useState(null);
  const [testimonialsContent, setTestimonialsContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [useFallback, setUseFallback] = useState({});
  const experienceYearsLabel = getExperienceYearsLabel();
  const patientsCountLabel = getPatientsCountLabel();

  const handleImageError = (id) => {
    setUseFallback(prev => ({ ...prev, [id]: true }));
  };

  const activeImages = (testimonialsContent?.images || []).filter(img => !img.hide);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null || activeImages.length === 0) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowLeft') setLightboxIndex(prev => prev === 0 ? activeImages.length - 1 : prev - 1);
      if (e.key === 'ArrowRight') setLightboxIndex(prev => prev === activeImages.length - 1 ? 0 : prev + 1);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxIndex, testimonialsContent]);

  const [posts, setPosts] = useState(blogPosts);

  // Load YAML content
  useEffect(() => {
    const loadContent = async () => {
      try {
        const content = await loadYamlContent('/content/pages/home.yml');
        if (content) {
          setHomeContent(content);
        } else {
          setHomeContent(getDefaultHomeContent());
        }
      } catch (error) {
        console.error('Error loading home content:', error);
        setHomeContent(getDefaultHomeContent());
      }

      try {
        const testContent = await loadYamlContent('/content/pages/testimonials.yml');
        if (testContent) {
          setTestimonialsContent(testContent);
        }
      } catch (error) {
        console.error('Error loading testimonials content:', error);
      }

      try {
        const firebasePosts = await loadFirebaseCollection('blog', 'date', 'desc');
        if (firebasePosts && firebasePosts.length > 0) {
          const formatted = firebasePosts.map(p => ({
            ...p,
            date: p.formattedDate || p.date
          }));
          setPosts(formatted);
        }
      } catch (error) {
        console.error('Error loading posts from Firebase in Home page:', error);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, []);

  useEffect(() => {
    // ScrollToTop component already handles scrolling on mount
    // Refresh AOS to detect new elements
    setTimeout(() => {
      AOS.refresh();
    }, 100);
  }, [homeContent]);

  if (loading) {
    return <HomeSkeleton />;
  }

  // SEO structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "הדס תודה - קלינאית תקשורת",
    "description": "קלינאית תקשורת מוסמכת המתמחה בטיפול בגמגום, שפה, דיבור וקול לילדים ומבוגרים",
    "url": "https://hadas-toda.co.il",
    "telephone": "+972-50-123-4567",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IL",
      "addressLocality": "ישראל"
    },
    "medicalSpecialty": "Speech-Language Pathology"
  };

  return (
    <>
      <StructuredData type="home" />
      <div className="home-page-v2 page-reveal">
        <SEOHead
          title="דף הבית"
          description="הדס תודה - קלינאית תקשורת מוסמכת המתמחה בטיפול בגמגום, צרידות, בעיות קול ועיכוב שפתי לילדים ומבוגרים. טיפול מקצועי ואישי."
          keywords="קלינאית תקשורת, גמגום, צרידות, בעיות קול, עיכוב שפתי, טיפול בדיבור, הדס תודה, ישראל"
          canonicalUrl="/"
          structuredData={structuredData}
        />

        {/* Hero Section */}
        <section className="bb-hero home-hero-wrapper">
          <div className="bb-hero-overlay"></div>

          {/* New Aurora Background */}
          <div className="hero-background-shapes">
            <AuroraBackground />
          </div>

          <div className="container bb-hero-content">
            <div className="bb-hero-text" data-aos="fade-up">
              <div className="hero-badge-container">
                <span className="bb-badge">קלינאית תקשורת מוסמכת</span>
              </div>
              <h1>{homeContent?.hero?.title || 'המסע לתקשורת בטוחה מתחיל כאן'}</h1>
              <p className="bb-subtitle">{homeContent?.hero?.subtitle || 'הדס תודה - קלינאית תקשורת מוסמכת M.A'}</p>
              <p className="bb-description">
                {homeContent?.hero?.description}
              </p>
              <div className="bb-actions">
                <Link to="/contact" className="bb-btn btn-soft-glow btn-soft-glow-primary">
                  {homeContent?.hero?.cta_text || 'לתיאום פגישת היכרות'}
                </Link>
              </div>
            </div>

            <div className="bb-hero-shape" data-aos="fade-left" data-aos-delay="200">
              <div className="shape-circle home-shape-bg"></div>
              <div className="shape-content">
                {/* Stats removed from here and moved to social proof bar below */}
              </div>
            </div>
          </div>

          <div className="wave-bottom">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
            </svg>
          </div>
        </section>

        {/* Social Proof Bar */}
        <div className="social-proof-bar" data-aos="fade-up" data-aos-delay="300">
          <div className="social-proof-stat">
            <span className="stat-number">{experienceYearsLabel}</span>
            <span className="stat-label">שנות ניסיון</span>
          </div>
          <div className="social-proof-stat">
            <span className="stat-number">{patientsCountLabel}</span>
            <span className="stat-label">מטופלים מרוצים</span>
          </div>
          <div className="social-proof-stat">
            <span className="stat-number">M.A</span>
            <span className="stat-label">תואר שני קליני</span>
          </div>
        </div>

        {/* Services Section */}
        <section className="bb-services section-padding">
          <div className="container">
            <div className="section-header-center">
              <h2>{homeContent?.services?.title || 'תחומי המומחיות שלי'}</h2>
              <div className="header-underline"></div>
              <p>{homeContent?.services?.subtitle}</p>
            </div>

            <div className="bb-services-grid-specializations">
              {homeContent?.services?.specializations?.map((spec, index) => {
                const config = specializationConfig[spec.icon] || specializationConfig['voice'];
                return (
                  <div
                    key={index}
                    className="bb-specialization-card glass-card"
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                    style={{
                      '--hover-color': config.color
                    }}
                  >
                    <div
                      className="spec-icon"
                      style={{
                        color: config.color,
                        background: config.bg,
                        boxShadow: `0 4px 15px ${config.color}30`
                      }}
                    >
                      {config.icon}
                    </div>
                    <h3 className="spec-title">{spec.name}</h3>
                    <p className="spec-description">{spec.description}</p>
                  </div>
                );
              })}
            </div>

            <div className="services-cta-wrapper">
              <Link to="/services" className="link-arrow">
                לכל הטיפולים והשירותים ←
              </Link>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="bb-about section-padding bg-light">
          <div className="container">
            <div className="bb-about-wrapper reverse-layout-mobile">
              <div className="bb-about-content" data-aos="fade-left">
                <h2>{homeContent?.about?.title}</h2>
                <div className="header-underline align-right"></div>
                <p className="lead-text">
                  {homeContent?.about?.paragraph1}
                </p>
                <p>{homeContent?.about?.paragraph2}</p>
                <p>{homeContent?.about?.paragraph3}</p>
                <Link to="/about" className="bb-btn btn-soft-glow btn-soft-glow-outline mt-4">
                  קראו עוד על הגישה שלי
                </Link>
              </div>
              <div className="bb-about-image" data-aos="fade-right">
                <div className="bb-about-visual">
                  <div className="visual-decoration circle-bg"></div>
                  <div className="visual-decoration dots"></div>

                  <div className="visual-card main-card glass-card">
                    <h3><span className="icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg></span> הגישה הטיפולית</h3>
                    <ul>
                      <li>
                        <span className="check-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></span>
                        יחס אישי, סבלני ורגיש לכל מטופל
                      </li>
                      <li>
                        <span className="check-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></span>
                        התמחות ייחודית בהפרעות קול וצרידות
                      </li>
                      <li>
                        <span className="check-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></span>
                        זמינות גבוהה וגמישות בשעות הטיפול
                      </li>
                      <li>
                        <span className="check-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></span>
                        קליניקה נעימה ומאובזרת בבני ברק
                      </li>
                    </ul>
                  </div>

                  <div className="visual-card stat-card glass-card">
                    <span className="number">{experienceYearsLabel}</span>
                    <span className="text">שנות ניסיון</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quote Section */}
        <section className="home-quote-modern">
          <div className="container">
            <div className="quote-box" data-aos="zoom-in">
              <div className="quote-mark">❝</div>
              <p className="quote-text">קול הוא הגשר בין הנשמה לעולם.</p>
            </div>
          </div>
        </section>

        {/* Recommendation Images Carousel */}
        <section className="bb-testimonials section-padding">
          <div className="container">
            <div className="section-header-center">
              <h2>{homeContent?.testimonials?.title}</h2>
              <div className="header-underline"></div>
              <p>{homeContent?.testimonials?.subtitle}</p>
            </div>

            <div className="testimonials-carousel-wrapper" data-aos="fade-up">
              <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                spaceBetween={24}
                slidesPerView={1}
                centeredSlides={true}
                slideToClickedSlide={true}
                loop={true}
                loopedSlides={4}
                autoplay={{
                  delay: 4500,
                  disableOnInteraction: false,
                }}
                pagination={{
                  clickable: true,
                  dynamicBullets: true,
                }}
                navigation={true}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 24,
                  },
                }}
                className="testimonials-swiper"
              >
                {activeImages?.map((item, index) => {
                  const paths = getImgPaths(item.image);
                  const itemId = item.image || index;
                  return (
                    <SwiperSlide key={itemId}>
                      <div
                        className="rec-image-card glass-card"
                        onClick={() => setLightboxIndex(index)}
                        role="button"
                        tabIndex={0}
                        aria-label={item.alt || `המלצה ${index + 1} - לחץ להגדלה`}
                        onKeyDown={(e) => e.key === 'Enter' && setLightboxIndex(index)}
                      >
                        <div className="rec-image-wrapper">
                          {useFallback[itemId] ? (
                            <img
                              src={paths.original}
                              alt={item.alt || `המלצה ממטופל ${index + 1}`}
                              className="rec-image"
                              loading="lazy"
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
                                loading="lazy"
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
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>

            <div className="center-cta mt-5">
              <Link to="/testimonials" className="link-arrow">
                לכל סיפורי ההצלחה ←
              </Link>
            </div>
          </div>
        </section>

        {/* Lightbox */}
        {lightboxIndex !== null && activeImages[lightboxIndex] && (() => {
          const currentItem = activeImages[lightboxIndex];
          const paths = getImgPaths(currentItem.image);
          const itemId = currentItem.image || lightboxIndex;
          const images = activeImages;

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


        {/* Blog Preview */}
        <section className="home-blog-modern section-padding bg-light">
          <div className="container">
            <div className="section-header-center">
              <h2>{homeContent?.blog_section?.title}</h2>
              <div className="header-underline"></div>
              <p>{homeContent?.blog_section?.subtitle}</p>
            </div>

            <div className="blog-grid-modern">
              {posts.slice(0, 3).map((post, index) => (
                <div key={post.id || post.slug} className="blog-card-modern glass-card" data-aos="fade-up" data-aos-delay={index * 100} data-aos-anchor=".home-blog-modern" data-aos-offset="0">
                  <div className="blog-card-image">
                    {post.image ? (
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="blog-image-real"
                        loading="lazy"
                        decoding="async"
                        style={{ aspectRatio: '16/9', objectFit: 'cover' }} 
                      />
                    ) : (
                      <div className={`blog-image-placeholder cat-${post.categories[0] || 'default'}`}></div>
                    )}
                    <span className="blog-card-category">
                      {post.categories[0] === 'voice' ? 'קול' :
                        post.categories[0] === 'children' ? 'ילדים' : 'כללי'}
                    </span>
                  </div>
                  <div className="blog-card-content">
                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>
                    <Link to={`/blog/${post.slug}`} className="read-more-link">
                      המשך קריאה
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

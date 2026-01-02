import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { loadYamlContent } from '../utils/yamlLoader';
import AOS from 'aos';
import '../styles/home.css';
import '../styles/glass.css';
import AuroraBackground from '../components/AuroraBackground';

import SEOHead from '../components/SEOHead';
import StructuredData from '../components/StructuredData';
import blogPosts from '../data/blogPosts';
import testimonials from '../data/testimonials';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Fallback content function
const getDefaultHomeContent = () => ({
  hero: {
    title: "הדס תודה",
    subtitle: "קלינאית תקשורת מומחית לשפה, דיבור וקול",
    description: "נעים להכיר, אני הדס. אני מלווה ילדים ומבוגרים במסעם לשיפור התקשורת והביטחון העצמי. בין אם מדובר באתגרי שפה והיגוי אצל ילדים, או בצרידות וקשיי קול אצל מבוגרים – אני כאן כדי להקשיב, לאבחן ולהתאים תוכנית טיפול אישית שתביא לתוצאות.",
    cta_text: "קביעת פגישת ייעוץ",
    services_text: "לגלות עוד על הטיפולים"
  },
  testimonials: {
    title: "קולות מהקליניקה",
    subtitle: "מה אומרים המטופלים שלי על הטיפול והתוצאות",
    items: [
      {
        quote: "אחרי שנים של צרידות כרונית, הגעתי להדס וסוף סוף מצאתי מענה. הטיפול המקצועי והיחס האישי החזירו לי את הקול ואת שמחת החיים.",
        author: "יעל, מורה"
      },
      {
        quote: "הבן שלי התקשה מאוד עם היגוי נכון של הרבה צלילים. אחרי מספר חודשים עם הדס, השיפור היה מדהים. היא ידעה בדיוק איך לגשת אליו ולגרום לו לשתף פעולה.",
        author: "רונית, אמא לילד בן 5"
      }
    ]
  },
  services: {
    title: "תחומי המומחיות שלי",
    subtitle: "מגוון השירותים המקצועיים שאני מציעה לילדים ומבוגרים",
    voice_services: [
      { name: "טיפול בצרידות ובעיות קול" },
      { name: "שיקום קולי מקצועי" },
      { name: "ליווי קולי (מורים, מרצים)" },
      { name: "טיפול בגמגום" }
    ],
    speech_services: [
      { name: "אבחון וטיפול בעיכוב שפתי" },
      { name: "טיפול בשיבושי היגוי" },
      { name: "שיפור יכולות ארגון מסר ושליפה" },
      { name: "הכנה לכיתה א׳ – היבטים שפתיים ותקשורתיים" }
    ]
  },
  about: {
    title: "נעים להכיר, אני הדס",
    paragraph1: "שמי הדס תודה, קלינאית תקשורת (M.A) עם תשוקה אמיתית לעזור לאנשים למצוא את קולם – תרתי משמע. אני מאמינה שביכולתה של תקשורת טובה לפתוח דלתות, לבנות גשרים ולהעצים כל אדם.",
    paragraph2: "הניסיון שלי כולל עבודה עם מגוון רחב של גילאים ואתגרים: החל מליווי התפתחותי של ילדים בתחומי השפה והדיבור, דרך טיפול בקשיי היגוי ושטף, ועד להתמחות מעמיקה באבחון וטיפול בבעיות קול וצרידות אצל ילדים ומבוגרים.",
    paragraph3: "בקליניקה שלי, כל מטופל מקבל יחס אישי ותוכנית טיפול המותאמת בדיוק עבורו. אני משלבת ידע מקצועי עדכני עם גישה יצירתית ורגישה, כדי להפוך את התהליך הטיפולי לחוויה חיובית ומקדמת."
  },
  blog_section: {
    title: "הבלוג המקצועי",
    subtitle: "מאמרים, טיפים וחידושים בתחום קלינאות התקשורת"
  }
});

export default function Home() {
  const [homeContent, setHomeContent] = useState(null);
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Refresh AOS to detect new elements
    setTimeout(() => {
      AOS.refresh();
    }, 100);
  }, [homeContent]);

  if (loading) {
    return <div className="loading-screen">טוען תוכן...</div>;
  }

  // SEO structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "הדס תודה - קלינאית תקשורת",
    "description": "קלינאית תקשורת מוסמכת המתמחה בטיפול בגמגום, שפה, דיבור וקול לילדים ומבוגרים",
    "url": "https://www.hadas-toda.co.il",
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
      <div className="home-page-v2">
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
              <h1>{homeContent?.hero?.title || 'הדס תודה'} <span className="text-highlight">M.A</span></h1>
              <p className="bb-subtitle">{homeContent?.hero?.subtitle || 'מומחית לשפה, דיבור וקול'}</p>
              <p className="bb-description">
                {homeContent?.hero?.description}
              </p>
              <div className="bb-actions">
                <Link to="/contact" className="bb-btn btn-soft-glow btn-soft-glow-primary">
                  {homeContent?.hero?.cta_text || 'קביעת פגישת ייעוץ'}
                </Link>
                <Link to="/ai-assessment" className="bb-btn btn-soft-glow btn-soft-glow-outline btn-with-badge">
                  אבחון חכם <span className="badge-new">חדש!</span>
                </Link>
              </div>
            </div>

            <div className="bb-hero-shape" data-aos="fade-left" data-aos-delay="200">
              <div className="shape-circle home-shape-bg"></div>
              <div className="shape-content">
                <div className="stat-box glass-card">
                  <span className="stat-number">10+</span>
                  <span className="stat-label">שנות ניסיון</span>
                </div>
                <div className="stat-box glass-card">
                  <span className="stat-number">100+</span>
                  <span className="stat-label">מטופלים מרוצים</span>
                </div>
                <div className="stat-box glass-card">
                  <span className="stat-number">M.A</span>
                  <span className="stat-label">תואר שני</span>
                </div>
              </div>
            </div>
          </div>

          <div className="wave-bottom">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
            </svg>
          </div>
        </section>

        {/* Services Section */}
        <section className="bb-services section-padding">
          <div className="container">
            <div className="section-header-center">
              <h2>{homeContent?.services?.title || 'תחומי המומחיות שלי'}</h2>
              <div className="header-underline"></div>
              <p>{homeContent?.services?.subtitle}</p>
            </div>

            <div className="services-split-grid">
              {/* Voice Services */}
              <div className="service-group glass-card" data-aos="fade-up">
                <h3 className="group-title">🎤 שירותי קול וגמגום</h3>
                <div className="bb-services-grid home-services-grid">
                  {homeContent?.services?.voice_services?.map((service, index) => (
                    <div key={index} className="bb-service-card compact-card glass-card">
                      <div className="service-icon-wrapper small-icon">
                        {['🗣️', '🎭', '🎤', '💬'][index % 4]}
                      </div>
                      <h3>{service.name}</h3>
                    </div>
                  ))}
                </div>
              </div>

              {/* Speech Services */}
              <div className="service-group glass-card" data-aos="fade-up" data-aos-delay="200">
                <h3 className="group-title">🗣️ שירותי שפה ודיבור</h3>
                <div className="bb-services-grid home-services-grid">
                  {homeContent?.services?.speech_services?.map((service, index) => (
                    <div key={index} className="bb-service-card compact-card glass-card">
                      <div className="service-icon-wrapper small-icon">
                        {['📊', '🔤', '🧩', '✏️'][index % 4]}
                      </div>
                      <h3>{service.name}</h3>
                    </div>
                  ))}
                </div>
              </div>
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
                    <h3><span className="icon">🎯</span> למה לבחור בי?</h3>
                    <ul>
                      <li>
                        <span className="check-icon">✓</span>
                        יחס אישי, סבלני ורגיש לכל מטופל
                      </li>
                      <li>
                        <span className="check-icon">✓</span>
                        התמחות ייחודית בהפרעות קול וצרידות
                      </li>
                      <li>
                        <span className="check-icon">✓</span>
                        זמינות גבוהה וגמישות בשעות הטיפול
                      </li>
                      <li>
                        <span className="check-icon">✓</span>
                        קליניקה נעימה ומאובזרת בבני ברק
                      </li>
                    </ul>
                  </div>

                  <div className="visual-card stat-card glass-card">
                    <span className="number">10+</span>
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

        {/* Testimonials */}
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
                spaceBetween={30}
                slidesPerView={1}
                centeredSlides={true}
                slideToClickedSlide={true}
                loop={true}
                loopedSlides={3}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                }}
                pagination={{
                  clickable: true,
                  dynamicBullets: true,
                }}
                navigation={true}
                breakpoints={{
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                  },
                  1200: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                  },
                }}
                className="testimonials-swiper"
              >
                {testimonials.map((item, index) => (
                  <SwiperSlide key={item.id || index}>
                    <div className="testimonial-card glass-card">
                      <div className="quote-icon">❝</div>
                      <p className="testimonial-text">{item.text}</p>
                      <div className="testimonial-author">
                        <span className="author-name">{item.name}</span>
                        <span className="author-location">מטופל/ת</span>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div className="center-cta mt-5">
              <Link to="/testimonials" className="link-arrow">
                לכל סיפורי ההצלחה ←
              </Link>
            </div>
          </div>
        </section>

        {/* Blog Preview */}
        <section className="home-blog-modern section-padding bg-light">
          <div className="container">
            <div className="section-header-center">
              <h2>{homeContent?.blog_section?.title}</h2>
              <div className="header-underline"></div>
              <p>{homeContent?.blog_section?.subtitle}</p>
            </div>

            <div className="blog-grid-modern">
              {blogPosts.slice(0, 3).map((post, index) => (
                <div key={post.id} className="blog-card-modern glass-card" data-aos="fade-up" data-aos-delay={index * 100}>
                  <div className="blog-card-image">
                    {post.image ? (
                      <img src={post.image} alt={post.title} className="blog-image-real" />
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

import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { loadYamlContent } from '../utils/yamlLoader';
import AOS from 'aos';
import '../styles/home.css';
import SoundWaves from '../components/SoundWaves';
import SEOHead from '../components/SEOHead';
import StructuredData from '../components/StructuredData';
import blogPosts from '../data/blogPosts';

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
      { name: "ליווי קולי (מורים, מרצים)" }
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
  const counterRefs = useRef([]);

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

  // Simple counter animation using setInterval
  const animateCounter = (element, target, duration = 2000) => {
    if (!element) return;
    
    let current = 0;
    const increment = target / (duration / 50); // Update every 50ms
    
    const timer = setInterval(() => {
      current += increment;
      
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      
      const displayValue = Math.round(current);
      
      // Handle different number formats
      if (target === 10 || target === 100) {
        element.textContent = displayValue + '+';
      } else if (target === 'MA') {
        element.textContent = 'M.A';
        clearInterval(timer);
      } else {
        element.textContent = displayValue;
      }
    }, 50);
    
    // Return cleanup function
    return () => clearInterval(timer);
  };

  useEffect(() => {
    // Refresh AOS when component mounts
    const timer = setTimeout(() => {
      AOS.refresh();
    }, 100);

    return () => clearTimeout(timer);
  }, [homeContent]);

  if (loading) {
    return <div className="loading">טוען תוכן...</div>;
  }

  // SEO structured data for home page
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
    "medicalSpecialty": "Speech-Language Pathology",
    "serviceArea": {
      "@type": "Place",
      "name": "ישראל"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "שירותי קלינאות תקשורת",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "MedicalTherapy",
            "name": "טיפול בגמגום"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "MedicalTherapy",
            "name": "טיפול בצרידות ובעיות קול"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "MedicalTherapy",
            "name": "טיפול בעיכוב שפתי"
          }
        }
      ]
    }
  };

  return (
    <>
      <StructuredData type="home" />
      <div className="home-page">
        <SEOHead
          title="דף הבית"
          description="הדס תודה - קלינאית תקשורת מוסמכת המתמחה בטיפול בגמגום, צרידות, בעיות קול ועיכוב שפתי לילדים ומבוגרים. טיפול מקצועי ואישי."
          keywords="קלינאית תקשורת, גמגום, צרידות, בעיות קול, עיכוב שפתי, טיפול בדיבור, הדס תודה, ישראל"
          canonicalUrl="/"
          structuredData={structuredData}
        />
        {/* Hero Section */}
        <section className="home-hero">
          <SoundWaves 
            variant="background" 
            intensity="medium" 
            color="primary" 
            effect="subtle"
            scrollResponsive={true}
          />
          <div className="container">
            <div className="hero-content" data-aos="fade-up">
              <h1 className="hero-title" data-aos="fade-down" data-aos-delay="200">{homeContent?.hero?.title || 'הדס תודה'}</h1>
              <h2 className="hero-subtitle" data-aos="fade-down" data-aos-delay="400">{homeContent?.hero?.subtitle || 'קלינאית תקשורת מומחית לשפה, דיבור וקול'}</h2>
              <p className="hero-description" data-aos="fade-up" data-aos-delay="600">
                {homeContent?.hero?.description || 'נעים להכיר, אני הדס. אני מלווה ילדים ומבוגרים במסעם לשיפור התקשורת והביטחון העצמי. בין אם מדובר באתגרי שפה והיגוי אצל ילדים, או בצרידות וקשיי קול אצל מבוגרים – אני כאן כדי להקשיב, לאבחן ולהתאים תוכנית טיפול אישית שתביא לתוצאות.'}
              </p>
              <div className="hero-buttons" data-aos="fade-up" data-aos-delay="800">
                <Link to="/contact" className="btn hero-cta">
                  {homeContent?.hero?.cta_text || 'קביעת פגישת ייעוץ'}
                </Link>
                <Link to="/ai-assessment" className="btn-ai-assessment btn">
                ⚡ אבחון ראשוני חכם 
                  <span className="ai-badge">חדש!</span>
                </Link>
                <Link to="/services" className="btn-secondary btn">
                  {homeContent?.hero?.services_text || 'לגלות עוד על הטיפולים'}
                </Link>
              </div>
              <div className="hero-highlights" data-aos="fade-up" data-aos-delay="1000">
                <div className="highlight-item">
                  <span 
                    className="highlight-number counter" 
                    data-target="10"
                  >
                    10+
                  </span>
                  <span className="highlight-text">שנות ניסיון</span>
                </div>
                <div className="highlight-item">
                  <span 
                    className="highlight-number counter" 
                    data-target="100"
                  >
                    100+
                  </span>
                  <span className="highlight-text">מטופלים מרוצים</span>
                </div>
                <div className="highlight-item">
                  <span 
                    className="highlight-number counter" 
                    data-target="MA"
                  >
                    M.A
                  </span>
                  <span className="highlight-text">תואר שני בקלינאות תקשורת</span>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* Testimonials Preview */}
        <section className="home-testimonials">
          <SoundWaves 
            variant="background" 
            intensity="low" 
            color="secondary" 
            effect="subtle"
            scrollResponsive={true}
          />
          <div className="container">
            <h2 className="section-title" data-aos="fade-up">{homeContent?.testimonials?.title || 'קולות מהקליניקה'}</h2>
            <p className="section-subtitle" data-aos="fade-up" data-aos-delay="200">{homeContent?.testimonials?.subtitle || 'מה אומרים המטופלים שלי על הטיפול והתוצאות'}</p>
            
            <div className="testimonials-carousel">
              {(Array.isArray(homeContent?.testimonials?.items) ? homeContent.testimonials.items.map((testimonial, index) => (
                <div key={index} className="testimonial-card" data-aos={index % 2 === 0 ? "fade-right" : "fade-left"} data-aos-delay={400 + (index * 200)}>
                  <div className="quote">
                    "{testimonial.quote}"
                    <div className="quote-author">– {testimonial.author}</div>
                  </div>
                </div>
              )) : null) || (
                <>
                  <div className="testimonial-card" data-aos="fade-right" data-aos-delay="400">
                    <div className="quote">
                      "אחרי שנים של צרידות כרונית, הגעתי להדס וסוף סוף מצאתי מענה. הטיפול המקצועי והיחס האישי החזירו לי את הקול ואת שמחת החיים."
                      <div className="quote-author">– יעל, מורה</div>
                    </div>
                  </div>
                  
                  <div className="testimonial-card" data-aos="fade-left" data-aos-delay="600">
                    <div className="quote">
                      "הבן שלי התקשה מאוד עם היגוי נכון של הרבה צלילים. אחרי מספר חודשים עם הדס, השיפור היה מדהים. היא ידעה בדיוק איך לגשת אליו ולגרום לו לשתף פעולה."
                      <div className="quote-author">– רונית, אמא לילד בן 5</div>
                    </div>
                  </div>
                </>
              )}
            </div>
            
            <div className="testimonials-cta" data-aos="fade-up" data-aos-delay="800">
              <Link to="/testimonials" className="btn-secondary btn">
                עוד סיפורי הצלחה
              </Link>
            </div>
          </div>
        </section>


        {/* Treatment Areas */}
        <section className="home-services">
          <SoundWaves 
            variant="background" 
            intensity="low" 
            color="accent" 
            effect="subtle"
            scrollResponsive={true}
          />
          <div className="container">
            <h2 className="section-title" data-aos="fade-up">{homeContent?.services?.title || 'תחומי המומחיות שלי'}</h2>
            <p className="section-subtitle" data-aos="fade-up" data-aos-delay="200">{homeContent?.services?.subtitle || 'מגוון השירותים המקצועיים שאני מציעה לילדים ומבוגרים'}</p>
            
            <div className="services-categories">
              <div className="service-category" data-aos="fade-right" data-aos-delay="400">
                <h3 className="category-title">שירותי קול</h3>
                <div className="treatment-areas-grid">
                  {homeContent?.services?.voice_services?.map((service, index) => {
                    const icons = ['🗣️', '🎭', '🎤'];
                    return (
                      <div key={index} className="treatment-area-item">
                        <span className="treatment-icon">{icons[index] || '🗣️'}</span>
                        {service.name}
                      </div>
                    );
                  }) || (
                    <>
                      <div className="treatment-area-item">
                        <span className="treatment-icon">🗣️</span>
                        טיפול בצרידות ובעיות קול
                      </div>
                      <div className="treatment-area-item">
                        <span className="treatment-icon">🎭</span>
                        שיקום קולי מקצועי
                      </div>
                      <div className="treatment-area-item">
                        <span className="treatment-icon">🎤</span>
                        ליווי קולי (מורים, מרצים)
                      </div>
                    </>
                  )}
                </div>
              </div>
              
              <div className="service-category" data-aos="fade-left" data-aos-delay="600">
                <h3 className="category-title">שירותי שפה ודיבור</h3>
                <div className="treatment-areas-grid">
                  {homeContent?.services?.speech_services?.map((service, index) => {
                    const icons = ['📊', '🔤', '🧩', '✏️'];
                    return (
                      <div key={index} className="treatment-area-item">
                        <span className="treatment-icon">{icons[index] || '📊'}</span>
                        {service.name}
                      </div>
                    );
                  }) || (
                    <>
                      <div className="treatment-area-item">
                        <span className="treatment-icon">📊</span>
                        אבחון וטיפול בעיכוב שפתי
                      </div>
                      <div className="treatment-area-item">
                        <span className="treatment-icon">🔤</span>
                        טיפול בשיבושי היגוי
                      </div>
                      <div className="treatment-area-item">
                        <span className="treatment-icon">🧩</span>
                        שיפור יכולות ארגון מסר ושליפה
                      </div>
                      <div className="treatment-area-item">
                        <span className="treatment-icon">✏️</span>
                        הכנה לכיתה א׳ – היבטים שפתיים ותקשורתיים
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            <div className="services-cta" data-aos="fade-up" data-aos-delay="800">
              <Link to="/services" className="btn-secondary btn">
                פירוט נוסף על הטיפולים
              </Link>
            </div>
          </div>
        </section>

        {/* Quote */}
        <section className="home-quote">
          <div className="container">
            <div className="quote-wrapper" data-aos="zoom-in">
              <div className="quote-decoration left"></div>
              <div className="quote">
                "קול הוא הגשר בין הנשמה לעולם."
                <div className="quote-author"></div>
              </div>
              <div className="quote-decoration right"></div>
            </div>
          </div>
        </section>

        {/* About Preview */}
        <section className="home-about">
          <div className="container">
            <h2 className="section-title" data-aos="fade-up">{homeContent?.about?.title || 'נעים להכיר, אני הדס'}</h2>
            <div className="about-preview" data-aos="fade-up" data-aos-delay="200">
              <p>
                {homeContent?.about?.paragraph1 || 'שמי הדס תודה, קלינאית תקשורת (M.A) עם תשוקה אמיתית לעזור לאנשים למצוא את קולם – תרתי משמע. אני מאמינה שביכולתה של תקשורת טובה לפתוח דלתות, לבנות גשרים ולהעצים כל אדם.'}
              </p>
              <p>
                {homeContent?.about?.paragraph2 || 'הניסיון שלי כולל עבודה עם מגוון רחב של גילאים ואתגרים: החל מליווי התפתחותי של ילדים בתחומי השפה והדיבור, דרך טיפול בקשיי היגוי ושטף, ועד להתמחות מעמיקה באבחון וטיפול בבעיות קול וצרידות אצל ילדים ומבוגרים.'}
              </p>
              <p>
                {homeContent?.about?.paragraph3 || 'בקליניקה שלי, כל מטופל מקבל יחס אישי ותוכנית טיפול המותאמת בדיוק עבורו. אני משלבת ידע מקצועי עדכני עם גישה יצירתית ורגישה, כדי להפוך את התהליך הטיפולי לחוויה חיובית ומקדמת.'}
              </p>
              <div className="about-cta" data-aos="fade-up" data-aos-delay="400">
                <Link to="/about" className="btn-secondary btn">
                  קראו עוד על הגישה שלי
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Blog Preview */}
        <section className="home-blog">
          <div className="container">
            <h2 className="section-title" data-aos="fade-up">{homeContent?.blog_section?.title || 'הבלוג המקצועי'}</h2>
            <p className="section-subtitle" data-aos="fade-up" data-aos-delay="200">{homeContent?.blog_section?.subtitle || 'מאמרים, טיפים וחידושים בתחום קלינאות התקשורת'}</p>
            
            <div className="blog-preview-grid">
              {blogPosts.slice(0, 3).map((post, index) => (
                <div className="blog-preview-card" key={post.id} data-aos="fade-up" data-aos-delay={400 + (index * 200)}>
                  <div className="blog-preview-image">
                    <img src={post.image} alt={post.title} />
                    {post.categories.map(cat => (
                      <span key={cat} className={`blog-category ${cat}`}>
                        {cat === 'voice' && 'קול'}
                        {cat === 'speech' && 'דיבור'}
                        {cat === 'language' && 'שפה'}
                        {cat === 'children' && 'ילדים'}
                        {cat === 'adults' && 'מבוגרים'}
                      </span>
                    ))}
                  </div>
                  <div className="blog-preview-content">
                    <h3 className="blog-preview-title">{post.title}</h3>
                    <p className="blog-preview-date">{post.date}</p>
                    <p className="blog-preview-excerpt">{post.excerpt}</p>
                    <Link to={`/blog/${post.slug}`} className="blog-read-more">
                      המשך קריאה
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="blog-preview-cta" data-aos="fade-up" data-aos-delay="800">
              <Link to="/blog" className="btn-secondary btn">
                לכל המאמרים בבלוג
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

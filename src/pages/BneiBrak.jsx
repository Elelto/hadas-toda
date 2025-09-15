import React, { useEffect } from 'react';
import SEOHead from '../components/SEOHead';
import StructuredData from '../components/StructuredData';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SoundWaves from '../components/SoundWaves';
import '../styles/bnei-brak.css';

const BneiBrak = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const seoData = {
    title: "קלינאית תקשורת בבני ברק",
    description: "הדס תודה – קלינאית תקשורת בבני ברק. טיפול בגמגום, צרידות, בעיות קול ועיכוב שפתי לילדים ולמבוגרים. ליצירת קשר: 050-679-6209",
    keywords: "קלינאית תקשורת בני ברק, טיפול בגמגום בני ברק, צרידות בני ברק, בעיות קול בני ברק, עיכוב שפתי בני ברק, הדס תודה",
    canonicalUrl: "/bnei-brak"
  };

  const localServices = [
    {
      title: "טיפול בגמגום",
      description: "עבודה רגישה ומדורגת על שטף הדיבור, עם תרגול מעשי בבית ובקליניקה.",
      icon: "🗣️"
    },
    {
      title: "טיפול בצרידות", 
      description: "הקלה על מאמץ וצרידות, עם תרגילי קול שמתאימים לשגרה.",
      icon: "👄"
    },
    {
      title: "שיקום קול",
      description: "ליווי למורים, חזנים ומרצים – חיזוק הקול ושמירה עליו לאורך זמן.",
      icon: "🎵"
    },
    {
      title: "עיכוב שפתי",
      description: "פיתוח שפה דרך משחק ותקשורת יומיומית, יחד אתכם ההורים.",
      icon: "👶"
    }
  ];

  const nearbyAreas = [
    "רמת גן", "גבעתיים", "תל אביב", "פתח תקווה", "רמת השרון"
  ];

  return (
    <>
      <SEOHead {...seoData} />
      <StructuredData type="services" />
      
      <div className="bnei-brak-page">
        <Header />
        
        {/* Hero Section */}
        <section className="bnei-brak-hero">
          <SoundWaves variant="background" intensity="medium" color="primary" />
          <div className="container">
            <div className="hero-content">
              <h1 className="hero-title">
                קלינאית תקשורת בבני ברק
                <span className="location-highlight">הדס תודה</span>
              </h1>
              <p className="hero-subtitle">
                שלום, אני הדס. מטפלת בילדים ובמבוגרים – גמגום, צרידות, בעיות קול ועיכוב שפתי.
              </p>
              <div className="hero-features">
                <div className="feature">
                  <span className="feature-icon">📍</span>
                  <span>ממוקמת בבני ברק</span>
                </div>
                <div className="feature">
                  <span className="feature-icon">🎓</span>
                  <span>קלינאית מוסמכת M.A</span>
                </div>
                <div className="feature">
                  <span className="feature-icon">👨‍👩‍👧‍👦</span>
                  <span>ילדים ומבוגרים</span>
                </div>
              </div>
              <div className="hero-cta">
                <a href="tel:+972506796209" className="btn-primary">
                  בואו נדבר: 050-679-6209
                </a>
                <a href="/contact" className="btn-secondary">
                  השאירו פרטים
                </a>
              </div>
            </div>
          </div>
        </section>

        <SoundWaves variant="separator" intensity="low" color="secondary" />

        {/* Local Services */}
        <section className="local-services">
          <div className="container">
            <h2 className="section-title">תחומי טיפול</h2>
            <p className="section-subtitle">
              תחומים נפוצים שאני פוגשת בקליניקה
            </p>
            
            <div className="services-grid">
              {localServices.map((service, index) => (
                <div key={index} className="service-card">
                  <div className="service-icon">{service.icon}</div>
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-description">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <SoundWaves variant="separator" intensity="low" color="accent" />

        {/* Why Choose Local */}
        <section className="why-local">
          <div className="container">
            <div className="content-grid">
              <div className="text-content">
                <h2>למה דווקא כאן?</h2>
                <div className="advantages">
                  <div className="advantage">
                    <h3>🏠 קרוב ונוח</h3>
                    <p>קל להגיע, גם בתחבורה ציבורית.</p>
                  </div>
                  <div className="advantage">
                    <h3>🤝 יחס אישי</h3>
                    <p>מתאימה את הדרך והקצב לכל אדם ולכל משפחה.</p>
                  </div>
                  <div className="advantage">
                    <h3>⏰ זמינות וגמישות</h3>
                    <p>תורים בשעות נוחות ותיאום מהיר.</p>
                  </div>
                  <div className="advantage">
                    <h3>🎯 שיתוף פעולה</h3>
                    <p>עובדים יחד – אתם, הילד/ה ואני.</p>
                  </div>
                </div>
              </div>
              <div className="image-content">
                <div className="location-info">
                  <h3>פרטי מיקום</h3>
                  <div className="location-details">
                    <p><strong>עיר:</strong> בני ברק</p>
                    <p><strong>אזור:</strong> שיכון ג'</p>
                    <p><strong>שירות:</strong> תושבי בני ברק והסביבה</p>
                    <p><strong>טלפון:</strong> <a href="tel:+972506796209">050-679-6209</a></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <SoundWaves variant="separator" intensity="medium" color="primary" />

        {/* Coverage Area */}
        <section className="coverage-area">
          <div className="container">
            <h2 className="section-title">איפה אני מקבלת</h2>
            <p className="section-subtitle">
            
            </p>
            <div className="areas-grid">
              <div className="primary-area">
                <h3>🎯 אזור ראשי</h3>
                <p className="area-name">בני ברק</p>
                <p>נגיש ונוח להגיע</p>
              </div>
              <div className="nearby-areas">
                <h3>📍 אזורים סמוכים</h3>
                <div className="areas-list">
                  {nearbyAreas.map((area, index) => (
                    <span key={index} className="area-tag">{area}</span>
                  ))}
                </div>
                <p>גם מהערים הסמוכות, בתיאום מראש.</p>
              </div>
            </div>
          </div>
        </section>

        <SoundWaves variant="separator" intensity="low" color="secondary" />

        {/* Contact CTA */}
        <section className="local-contact">
          <div className="container">
            <div className="contact-card">
              <h2>נשמע לכם רלוונטי?</h2>
              <p>
                מוזמנים לדבר.
              </p>
              <div className="contact-options">
                <a href="tel:+972506796209" className="contact-btn phone">
                  <span className="btn-icon">📞</span>
                  בואו נדבר: 050-679-6209
                </a>
                <a href="/contact" className="contact-btn form">
                  <span className="btn-icon">✉️</span>
                  השאירו פרטים
                </a>
              </div>
              <p className="contact-note">חוזרת לרוב באותו יום</p>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default BneiBrak;

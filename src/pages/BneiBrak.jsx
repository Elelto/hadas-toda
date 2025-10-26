import React, { useEffect, useState } from 'react';
import SEOHead from '../components/SEOHead';
import StructuredData from '../components/StructuredData';
import AOS from 'aos';
import '../styles/bnei-brak.css';

const BneiBrak = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({ duration: 1000, once: true });
  }, []);

  const seoData = {
    title: "קלינאית תקשורת בבני ברק | הדס תודה M.A",
    description: "קלינאית תקשורת מוסמכת בבני ברק. טיפול מקצועי בגמגום, צרידות, בעיות קול ועיכוב שפתי לילדים ומבוגרים. קליניקה בשיכון ג'. ☎ 050-679-6209",
    keywords: "קלינאית תקשורת בני ברק, טיפול בגמגום בני ברק, צרידות בני ברק, בעיות קול בני ברק, עיכוב שפתי בני ברק, הדס תודה, שיכון ג בני ברק",
    canonicalUrl: "/bnei-brak"
  };

  const services = [
    {
      title: "טיפול בגמגום",
      description: "גישה מקצועית ורגישה לשיפור שטף הדיבור. תוכנית טיפול מותאמת אישית המשלבת טכניקות מוכחות ותרגול מעשי."
    },
    {
      title: "טיפול בצרידות ובעיות קול", 
      description: "אבחון וטיפול מקיף בהפרעות קול. התמחות בשיקום קולי למורים, מרצים וחזנים."
    },
    {
      title: "עיכוב שפתי והיגוי",
      description: "ליווי התפתחותי לילדים בתחומי השפה והדיבור. גישה משחקית ומעצימה המשלבת את ההורים בתהליך."
    }
  ];

  const clinicInfo = {
    location: "שיכון ג', בני ברק",
    phone: "050-679-6209",
    email: "hadas.toda.info@gmail.com",
    areas: ["בני ברק", "רמת גן", "גבעתיים", "תל אביב", "פתח תקווה"]
  };

  return (
    <>
      <SEOHead {...seoData} />
      <StructuredData type="services" />
      
      <div className="bnei-brak-page">
        {/* Hero Section */}
        <section className="hero-modern">
          <div className="container">
            <div className="hero-content" data-aos="fade-up">
              <div className="hero-badge">קלינאית תקשורת מוסמכת</div>
              <h1 className="hero-title">
                קליניקה לתקשורת בבני ברק
              </h1>
              <p className="hero-subtitle">
                הדס תודה, M.A - קלינאית תקשורת מומחית
              </p>
              <p className="hero-description">
                טיפול מקצועי בגמגום, צרידות, בעיות קול ועיכוב שפתי לילדים ומבוגרים
              </p>
              <div className="hero-actions">
                <a href="tel:+972506796209" className="btn-hero btn-primary">
                  📞 050-679-6209
                </a>
                <a href="#contact" className="btn-hero btn-secondary">
                  קביעת פגישה
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="services-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">תחומי טיפול</h2>
              <p className="section-description">
                טיפולים מקצועיים המבוססים על מחקר עדכני וניסיון קליני
              </p>
            </div>
            
            <div className="services-list">
              {services.map((service, index) => (
                <div key={index} className="service-item" data-aos="fade-up" data-aos-delay={index * 100}>
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-description">{service.description}</p>
                </div>
              ))}
            </div>
            
            <div className="services-cta">
              <a href="/services" className="link-arrow">
                לפרטים נוספים על הטיפולים ←
              </a>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="about-section">
          <div className="container">
            <div className="about-content">
              <div className="about-text">
                <h2 className="section-title">גישה מקצועית ואישית</h2>
                <p>
                  אני מאמינה שכל מטופל ייחודי ודורש גישה טיפולית מותאמת אישית. 
                  בקליניקה שלי בבני ברק, אני משלבת ידע מקצועי מתקדם עם יחס חם ואמפתי, 
                  ומלווה את המטופלים שלי בתהליך טיפולי ממוקד ויעיל.
                </p>
                <p>
                  הטיפולים מבוססים על שיטות מוכחות מחקרית ומותאמים לצרכים הספציפיים 
                  של כל מטופל – ילד או מבוגר. אני שמה דגש על שיתוף פעולה עם ההורים 
                  והמשפחה, ועל יצירת סביבה תומכת ומעצימה.
                </p>
              </div>
              <div className="about-credentials">
                <div className="credential-item">
                  <div className="credential-icon">🎓</div>
                  <div>
                    <h4>השכלה</h4>
                    <p>תואר שני (M.A) בקלינאות תקשורת</p>
                  </div>
                </div>
                <div className="credential-item">
                  <div className="credential-icon">💼</div>
                  <div>
                    <h4>ניסיון</h4>
                    <p>שנות ניסיון בטיפול בילדים ומבוגרים</p>
                  </div>
                </div>
                <div className="credential-item">
                  <div className="credential-icon">📍</div>
                  <div>
                    <h4>מיקום</h4>
                    <p>שיכון ג', בני ברק</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="contact-section">
          <div className="container">
            <div className="contact-grid">
              <div className="contact-info">
                <h2 className="section-title">פרטי התקשרות</h2>
                <div className="info-items">
                  <div className="info-item">
                    <div className="info-icon">📍</div>
                    <div>
                      <h4>כתובת</h4>
                      <p>{clinicInfo.location}</p>
                    </div>
                  </div>
                  <div className="info-item">
                    <div className="info-icon">�</div>
                    <div>
                      <h4>טלפון</h4>
                      <a href={`tel:+972${clinicInfo.phone.replace(/[^0-9]/g, '')}`}>{clinicInfo.phone}</a>
                    </div>
                  </div>
                  <div className="info-item">
                    <div className="info-icon">✉️</div>
                    <div>
                      <h4>דוא"ל</h4>
                      <a href={`mailto:${clinicInfo.email}`}>{clinicInfo.email}</a>
                    </div>
                  </div>
                </div>
                <div className="service-areas">
                  <h4>אזורי שירות</h4>
                  <p>מקבלת מטופלים מ{clinicInfo.areas.join(', ')} והסביבה</p>
                </div>
              </div>
              <div className="contact-cta">
                <h3>בואו נתחיל</h3>
                <p>
                  מוזמנים ליצור קשר לקביעת פגישת ייעוץ ראשונית. 
                  אשמח לענות על שאלות ולספר עוד על הטיפולים.
                </p>
                <div className="cta-buttons">
                  <a href="tel:+972506796209" className="btn btn-primary">
                    התקשרו עכשיו
                  </a>
                  <a href="/contact" className="btn btn-secondary">
                    השאירו הודעה
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default BneiBrak;

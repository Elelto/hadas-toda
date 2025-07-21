import React from 'react';
import '../styles/services.css';

const services = [
  { title: 'טיפול בגמגום', desc: 'התמודדות עם גמגום בקרב ילדים ומבוגרים באמצעות שיטות מגוונות ומותאמות אישית.' },
  { title: 'שיפור שפה ודיבור', desc: 'עבודה על שפה, הגייה, שטף דיבור והבנת הנשמע.' },
  { title: 'טיפול בקול', desc: 'שיקום וטיפוח הקול, תרגילים לשיפור איכות הקול ומניעת מאמץ קולי.' },
  { title: 'הדרכת הורים', desc: 'הדרכה וליווי הורים לתמיכה בתהליך הטיפולי.' },
];

export default function Services() {
  return (
    <div className="services-page">
      <div className="container">
        <section className="services-section">
          <div className="services-header">
            <h1 className="services-title" data-aos="fade-down">תחומי טיפול</h1>
            <p className="services-subtitle" data-aos="fade-up" data-aos-delay="200">מגוון שירותים מקצועיים בתחום קלינאות התקשורת</p>
          </div>
          
          <div className="services-grid">
            {services.map((service, index) => (
              <div key={index} className="service-card" data-aos="fade-up" data-aos-delay={400 + (index * 100)}>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.desc}</p>
              </div>
            ))}
          </div>
          
          <div className="services-info">
            <h2 className="info-title" data-aos="fade-up">איך מתנהל הטיפול?</h2>
            <div className="info-steps">
              <div className="info-step" data-aos="fade-right" data-aos-delay="200">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h3>פגישת היכרות</h3>
                  <p>שיחה ראשונית להבנת הצרכים והציפיות</p>
                </div>
              </div>
              <div className="info-step" data-aos="fade-left" data-aos-delay="400">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h3>אבחון מקצועי</h3>
                  <p>הערכה מקיפה לאיתור הקשיים והחוזקות</p>
                </div>
              </div>
              <div className="info-step" data-aos="fade-right" data-aos-delay="600">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h3>בניית תוכנית טיפול</h3>
                  <p>תוכנית אישית ומותאמת לצרכים הייחודיים</p>
                </div>
              </div>
              <div className="info-step" data-aos="fade-left" data-aos-delay="800">
                <div className="step-number">4</div>
                <div className="step-content">
                  <h3>מפגשי טיפול</h3>
                  <p>מפגשים קבועים בסביבה נעימה ותומכת</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

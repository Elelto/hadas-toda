import React, { useEffect, useState } from 'react';
import SEOHead from '../components/SEOHead';
import StructuredData from '../components/StructuredData';
import AOS from 'aos';
import '../styles/bnei-brak.css';

const BneiBrak = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({ duration: 800, once: true, offset: 100 });
  }, []);

  const seoData = {
    title: "קלינאית תקשורת בבני ברק | הדס תודה M.A - אבחון וטיפול מקצועי",
    description: "קלינאית תקשורת מוסמכת בבני ברק (M.A). מומחית בטיפול בגמגום, צרידות, בעיות קול ועיכוב שפתי לילדים ומבוגרים. קליניקה נגישה ונעימה בשיכון ג'. התקשרו: 050-679-6209",
    keywords: "קלינאית תקשורת בני ברק, טיפול בגמגום בבני ברק, קלינאית תקשורת לילדים בבני ברק, טיפול בצרידות, הדס תודה, מכון התפתחות הילד בני ברק, קלינאית תקשורת פרטית",
    canonicalUrl: "/bnei-brak"
  };

  const services = [
    {
      title: "טיפול בגמגום (Stuttering)",
      description: "גישה טיפולית מתקדמת לשיפור שטף הדיבור והביטחון העצמי. הטיפול מותאם אישית לילדים, נוער ומבוגרים, ומשלב טכניקות להפחתת המאמץ בדיבור ושינוי עמדות כלפי הגמגום.",
      icon: "🗣️"
    },
    {
      title: "טיפול בצרידות וקול", 
      description: "אבחון ושיקום קולי לסובלים מצרידות כרונית, יבלות, פוליפים או עייפות קולית. התמחות מיוחדת בטיפול באנשי מקצוע הקול: מורים, גננות, מרצים, חזנים וזמרים.",
      icon: "🎵"
    },
    {
      title: "התפתחות שפה ודיבור",
      description: "אבחון וטיפול בילדים עם איחור שפתי, שיבושי היגוי וקשיים בתקשורת. הדרכת הורים צמודה כחלק בלתי נפרד מהתהליך לקידום הילד בסביבתו הטבעית.",
      icon: "👶"
    },
    {
      title: "טיפול בהיגוי",
      description: "טיפול בשיבושי היגוי (כמו 'ש' שורקת, קושי בהגיית 'ר') לילדים ומבוגרים. שיפור מובנות הדיבור באמצעות תרגול ממוקד ומהנה.",
      icon: "✨"
    }
  ];

  const testimonials = [
    {
      text: "הגענו להדס עם חששות רבים לגבי הדיבור של בננו. הדס קיבלה אותנו בחיוך, מקצועיות ורוגע. תוך מספר מפגשים כבר ראינו שיפור משמעותי. ממליצים בחום!",
      name: "משפחת כהן",
      location: "בני ברק"
    },
    {
      text: "בתור מורה שסבלה מצרידות חוזרת, הטיפול אצל הדס הציל לי את הקריירה. למדתי איך להשתמש בקול נכון ואיך לשמור עליו לאורך זמן.",
      name: "רחל ל.",
      location: "רמת גן"
    },
    {
      text: "הדס מקצועית מאוד, נעימה וקשובה. הילד חיכה למפגשים איתה כל שבוע. תודה על הכל!",
      name: "יעל א.",
      location: "בני ברק"
    }
  ];

  const faqs = [
    {
      question: "היכן הקליניקה ממוקמת בבני ברק?",
      answer: "הקליניקה ממוקמת בלב שכונת שיכון ג' בבני ברק, באזור שקט ונגיש. כתובת מדויקת תינתן בעת קביעת התור. ישנה חניה בשפע ברחובות הסמוכים."
    },
    {
      question: "האם יש החזרים מקופות החולים?",
      answer: "אני עובדת כקלינאית תקשורת פרטית. מומלץ לבדוק מול הביטוח המשלים בקופת החולים שלכם או מול ביטוחי בריאות פרטיים לגבי זכאות להחזרים עבור טיפולי קלינאית תקשורת פרטיים."
    },
    {
      question: "לאילו גילאים מתאים הטיפול?",
      answer: "אני מטפלת במגוון רחב של גילאים – החל מפעוטות עם עיכוב שפתי, דרך ילדי גן ובית ספר, ועד מבוגרים הסובלים מבעיות קול, גמגום או שיבושי היגוי."
    },
    {
      question: "כמה זמן נמשך כל מפגש?",
      answer: "משך מפגש טיפולי הוא כ-45 דקות. המפגש כולל עבודה ישירה עם המטופל ולעיתים קרובות (במיוחד אצל ילדים) גם זמן להדרכת הורים."
    }
  ];

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const clinicInfo = {
    location: "שיכון ג', בני ברק",
    phone: "050-679-6209",
    email: "hadas.toda.info@gmail.com",
    areas: ["בני ברק", "רמת גן", "גבעתיים", "פתח תקווה", "תל אביב"]
  };

  return (
    <>
      <SEOHead {...seoData} />
      <StructuredData type="services" />
      
      <div className="bnei-brak-page-v2">
        {/* Modern Hero Section */}
        <section className="bb-hero">
          <div className="bb-hero-overlay"></div>
          <div className="container bb-hero-content">
            <div className="bb-hero-text" data-aos="fade-up">
              <span className="bb-badge">קלינאית תקשורת בבני ברק</span>
              <h1>הדס תודה <span className="text-highlight">M.A</span></h1>
              <p className="bb-subtitle">טיפול מקצועי, אישי ומסור לילדים ומבוגרים</p>
              <p className="bb-description">
                מתמחה בטיפול בגמגום, הפרעות קול וצרידות, ועיכוב שפתי.
                <br />
                בקליניקה נעימה ומאובזרת בשיכון ג'.
              </p>
              <div className="bb-actions">
                <a href="tel:+972506796209" className="bb-btn bb-btn-primary">
                  <span className="icon">📞</span> 050-679-6209
                </a>
                <a href="#contact" className="bb-btn bb-btn-outline">
                  צור קשר
                </a>
              </div>
            </div>
            <div className="bb-hero-shape" data-aos="fade-left" data-aos-delay="200">
              <div className="shape-circle"></div>
              <div className="shape-content">
                <div className="stat-box">
                  <span className="stat-number">10+</span>
                  <span className="stat-label">שנות ניסיון</span>
                </div>
                <div className="stat-box">
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
              <h2>תחומי טיפול בקליניקה</h2>
              <div className="header-underline"></div>
              <p>מעטפת טיפולית מקצועית המותאמת לצרכים האישיים שלך</p>
            </div>
            
            <div className="bb-services-grid">
              {services.map((service, index) => (
                <div key={index} className="bb-service-card" data-aos="fade-up" data-aos-delay={index * 100}>
                  <div className="service-icon-wrapper">{service.icon}</div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About / Approach Section */}
        <section className="bb-about section-padding bg-light">
          <div className="container">
            <div className="bb-about-wrapper">
              <div className="bb-about-image" data-aos="fade-right">
                <div className="image-placeholder">
                  <span className="placeholder-icon">👩‍⚕️</span>
                </div>
              </div>
              <div className="bb-about-content" data-aos="fade-left">
                <h2>הגישה הטיפולית שלי</h2>
                <p className="lead-text">
                  אני מאמינה כי טיפול מוצלח מתחיל בקשר אישי, אמון והבנת הצרכים הייחודיים של כל מטופל.
                </p>
                <p>
                  בקליניקה בבני ברק, אני משלבת ידע אקדמי עדכני (תואר שני M.A) עם ניסיון קליני עשיר. הטיפול נעשה באווירה נעימה, מכילה ומקבלת, תוך שימת דגש על שיתוף פעולה מלא עם ההורים (בטיפול בילדים) או עם המטופל המבוגר.
                </p>
                <ul className="bb-features-list">
                  <li>✅ אבחון מעמיק ומקיף</li>
                  <li>✅ תוכנית טיפול מותאמת אישית</li>
                  <li>✅ הדרכה וליווי צמוד</li>
                  <li>✅ סביבה תומכת ומקצועית</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="bb-testimonials section-padding">
          <div className="container">
            <div className="section-header-center">
              <h2>ממליצים עלינו</h2>
              <div className="header-underline"></div>
            </div>
            <div className="testimonials-grid">
              {testimonials.map((item, index) => (
                <div key={index} className="testimonial-card" data-aos="zoom-in" data-aos-delay={index * 100}>
                  <div className="quote-icon">❝</div>
                  <p className="testimonial-text">{item.text}</p>
                  <div className="testimonial-author">
                    <span className="author-name">{item.name}</span>
                    <span className="author-location">{item.location}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bb-faq section-padding bg-light">
          <div className="container">
            <div className="section-header-center">
              <h2>שאלות ותשובות</h2>
              <div className="header-underline"></div>
            </div>
            <div className="faq-container">
              {faqs.map((faq, index) => (
                <div 
                  key={index} 
                  className={`faq-item ${activeAccordion === index ? 'active' : ''}`}
                  onClick={() => toggleAccordion(index)}
                >
                  <div className="faq-question">
                    <h3>{faq.question}</h3>
                    <span className="faq-toggle">{activeAccordion === index ? '−' : '+'}</span>
                  </div>
                  <div className="faq-answer" style={{ maxHeight: activeAccordion === index ? '200px' : '0' }}>
                    <p>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact / CTA Section */}
        <section id="contact" className="bb-contact section-padding">
          <div className="container">
            <div className="contact-box-wrapper" data-aos="fade-up">
              <div className="contact-details">
                <h2>בואו נדבר</h2>
                <p>אני מזמינה אתכם ליצור קשר להתייעצות ראשונית או לתיאום תור.</p>
                
                <div className="contact-list">
                  <div className="contact-item">
                    <span className="icon">📍</span>
                    <div>
                      <strong>כתובת הקליניקה:</strong>
                      <p>{clinicInfo.location}</p>
                    </div>
                  </div>
                  <div className="contact-item">
                    <span className="icon">📞</span>
                    <div>
                      <strong>טלפון:</strong>
                      <p><a href={`tel:+972${clinicInfo.phone.replace(/-/g, '')}`}>{clinicInfo.phone}</a></p>
                    </div>
                  </div>
                  <div className="contact-item">
                    <span className="icon">✉️</span>
                    <div>
                      <strong>דוא"ל:</strong>
                      <p><a href={`mailto:${clinicInfo.email}`}>{clinicInfo.email}</a></p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="contact-map-area">
                <div className="map-placeholder">
                  {/* אפשר להוסיף כאן מפה אמיתית של גוגל בעתיד */}
                  <div className="map-card">
                    <h3>אזורי שירות</h3>
                    <div className="tags-cloud">
                      {clinicInfo.areas.map((area, i) => (
                        <span key={i} className="area-tag">{area}</span>
                      ))}
                    </div>
                  </div>
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

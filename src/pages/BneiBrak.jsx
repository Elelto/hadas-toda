import React, { useEffect, useState, useRef } from 'react';
import SEOHead from '../components/SEOHead';
import StructuredData from '../components/StructuredData';
import AOS from 'aos';
import '../styles/bnei-brak.css';
import { init, send } from '@emailjs/browser';
import '../styles/contact.css';
import { FaPhone, FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaInstagram, FaArrowLeft, FaExclamationCircle, FaMicrophoneAlt, FaCommentDots, FaStream, FaAppleAlt, FaAssistiveListeningSystems } from 'react-icons/fa';

// Specialization Configuration (Icon + Color) - same as Home.jsx
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
    icon: <FaStream />,
    color: '#A18CD1', // Purple
    bg: '#F3E5F5'
  },
  'oral': {
    icon: <FaAppleAlt />,
    color: '#FFB74D', // Orange
    bg: '#FFF3E0'
  },
  'intelligibility': {
    icon: <FaAssistiveListeningSystems />,
    color: '#4DB6AC', // Teal
    bg: '#E0F2F1'
  }
};

// Initialize EmailJS
init("l9xXgXVINGFdgI8KJ");

const BneiBrak = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);

  // Form State
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    user_phone: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    // ScrollToTop component already handles scrolling on mount
    setTimeout(() => {
      AOS.refresh();
    }, 100);
  }, []);

  // Form Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.user_name.trim()) errors.user_name = 'נא להזין שם';
    if (!formData.user_email.trim()) errors.user_email = 'נא להזין כתובת אימייל';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.user_email)) errors.user_email = 'כתובת האימייל אינה תקינה';
    if (formData.user_phone.trim() && !/^0[2-9]\d{7,8}$/.test(formData.user_phone)) errors.user_phone = 'מספר הטלפון אינו תקין';
    if (!formData.message.trim()) errors.message = 'נא להזין הודעה';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setSuccess(false);
    setError(false);

    // קבלת תאריך ושעה נוכחיים
    const now = new Date();
    const currentDate = now.toLocaleDateString('he-IL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    const currentTime = now.toLocaleTimeString('he-IL', {
      hour: '2-digit',
      minute: '2-digit'
    });

    const serviceID = 'service_zm8sd32';
    const templateID = 'template_abcdxis';
    const publicKey = 'l9xXgXVINGFdgI8KJ';

    const mainParams = {
      to_name: 'הדס תודה',
      user_name: formData.user_name,
      user_email: formData.user_email,
      user_phone: formData.user_phone || 'לא צוין',
      message: formData.message,
      current_date: currentDate,
      current_time: currentTime,
      to_email: 'hadas.toda.info@gmail.com',
      email: 'hadas.toda.info@gmail.com',
      recipient: 'hadas.toda.info@gmail.com',
      reply_to: formData.user_email
    };

    send(serviceID, templateID, mainParams, publicKey)
      .then(() => {
        // Auto-reply
        const replyParams = {
          user_name: formData.user_name,
          user_email: formData.user_email,
          user_phone: formData.user_phone || 'לא צוין',
          message: formData.message,
          to_name: formData.user_name,
          to_email: formData.user_email,
          email: formData.user_email,
          reply_to: 'hadas.toda.info@gmail.com'
        };
        send(serviceID, 'template_vmm0l2g', replyParams, publicKey)
          .catch(err => console.error('Reply error:', err));

        setSuccess(true);
        setLoading(false);
        setFormData({ user_name: '', user_email: '', user_phone: '', message: '' });
      })
      .catch((err) => {
        console.error('Send error:', err);
        setError(true);
        setLoading(false);
      });
  };

  // Mouse tracking for spotlight effect
  const handleMouseMove = (e) => {
    const cards = document.getElementsByClassName('bento-card');
    for (const card of cards) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    }
  };

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
      icon: "stuttering"
    },
    {
      title: "טיפול בצרידות וקול",
      description: "אבחון ושיקום קולי לסובלים מצרידות כרונית, יבלות, פוליפים או עייפות קולית. התמחות מיוחדת בטיפול באנשי מקצוע הקול: מורים, גננות, מרצים, חזנים וזמרים.",
      icon: "voice"
    },
    {
      title: "התפתחות שפה ודיבור",
      description: "אבחון וטיפול בילדים עם איחור שפתי, שיבושי היגוי וקשיים בתקשורת. הדרכת הורים צמודה כחלק בלתי נפרד מהתהליך לקידום הילד בסביבתו הטבעית.",
      icon: "articulation"
    },
    {
      title: "טיפול בהיגוי ומובנות דיבור",
      description: "טיפול בשיבושי היגוי (כמו 'ש' שורקת, קושי בהגיית 'ר') לילדים ומבוגרים, לרבות שיפור מובנות הדיבור והבהרת ההגייה. עבודה ממוקדת לשיפור בהירות הדיבור.",
      icon: "intelligibility"
    },
    {
      title: "טיפול בתפקודי פה ודחיקת לשון",
      description: "טיפול בתפקודי פה, דחיקת לשון, ושיפור תפקוד השרירים המעורבים בתהליך הדיבור והבליעה. טיפול מקצועי לילדים ומבוגרים.",
      icon: "oral"
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

  const contactInfo = {
    phone: "050-679-6209",
    whatsapp: "972506796209",
    email: "hadas.toda.info@gmail.com",
    address: "שיכון ג', בני ברק",
    social: {
      facebook: "https://www.facebook.com/profile.php?id=61566802899787",
      instagram: "https://www.instagram.com/hadas_toda/"
    }
  };

  return (
    <>
      <SEOHead {...seoData} />
      <StructuredData type="services" />

      <div className="bnei-brak-page-v2" onMouseMove={handleMouseMove}>
        {/* Modern Hero Section */}
        <section className="bb-hero">
          <div className="bb-hero-overlay"></div>
          <div className="container bb-hero-content">
            <div className="bb-hero-text" data-aos="fade-up">
              <span className="bb-badge">קלינאית תקשורת בבני ברק</span>
              <h1>הדס תודה <span className="text-highlight">M.A</span></h1>
              <p className="bb-subtitle">טיפול מקצועי, אישי ומסור לילדים ומבוגרים</p>
              <p className="bb-description">
                מתמחה בטיפולי קול, היגוי, גמגום, תפקודי פה ומובנות דיבור.
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
                  <span className="stat-number">7+</span>
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

            <div className="bb-services-grid-specializations">
              {services.map((service, index) => {
                const config = specializationConfig[service.icon] || specializationConfig['voice'];
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
                    <h3 className="spec-title">{service.title}</h3>
                    <p className="spec-description">{service.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* About / Approach Section */}
        <section className="bb-about section-padding bg-light">
          <div className="container">
            <div className="bb-about-wrapper">
              <div className="bb-about-visual">
                <div className="visual-decoration circle-bg"></div>
                <div className="visual-decoration dots"></div>

                <div className="visual-card main-card">
                  <h3><span className="icon">✨</span> הגישה הטיפולית</h3>
                  <ul>
                    <li>
                      <span className="check-icon">✓</span>
                      אבחון מעמיק ומדויק לכל מטופל
                    </li>
                    <li>
                      <span className="check-icon">✓</span>
                      בניית תוכנית טיפול אישית וממוקדת
                    </li>
                    <li>
                      <span className="check-icon">✓</span>
                      שילוב טכנולוגיות וכלי טיפול מתקדמים
                    </li>
                    <li>
                      <span className="check-icon">✓</span>
                      ליווי צמוד באווירה תומכת ומכילה
                    </li>
                  </ul>
                </div>

                <div className="visual-card stat-card">
                  <span className="number">100%</span>
                  <span className="text">מחויבות להצלחה</span>
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

        {/* Contact / Benton Grid Section */}
        <section id="contact" className="contact-page-bento section-padding">
          <div className="container">
            <div className="bento-header text-center">
              <h2 className="bento-title" style={{ fontSize: '3rem' }}>בואו נדבר</h2>
              <p className="bento-subtitle">אני מזמינה אותך ליצור קשר להתייעצות ראשונית או לתיאום תור</p>
            </div>

            <div className="bento-grid">
              {/* 1. Main Form Card */}
              <div className="bento-card form-card" data-aos="fade-up">
                <div className="card-bg-effect"></div>
                <div className="sound-wave-animation">
                  {[...Array(5)].map((_, i) => <div key={i} className="bar"></div>)}
                </div>
                <h2 className="card-title">שלח/י הודעה</h2>
                <form className="bento-form" ref={form} onSubmit={handleSubmit} noValidate>
                  <div className="bento-form-row">
                    <div className="form-group-bento">
                      <label htmlFor="user_name">שם מלא *</label>
                      <input type="text" id="user_name" name="user_name" value={formData.user_name} onChange={handleChange} className={formErrors.user_name ? 'error' : ''} placeholder="שם מלא" />
                      {formErrors.user_name && (
                        <div className="error-message">
                          <FaExclamationCircle />
                          <span>{formErrors.user_name}</span>
                        </div>
                      )}
                    </div>
                    <div className="form-group-bento">
                      <label htmlFor="user_phone">טלפון (אופציונלי)</label>
                      <input type="tel" id="user_phone" name="user_phone" value={formData.user_phone} onChange={handleChange} className={formErrors.user_phone ? 'error' : ''} placeholder="מספר טלפון" />
                      {formErrors.user_phone && (
                        <div className="error-message">
                          <FaExclamationCircle />
                          <span>{formErrors.user_phone}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="form-group-bento">
                    <label htmlFor="user_email">אימייל *</label>
                    <input type="email" id="user_email" name="user_email" value={formData.user_email} onChange={handleChange} className={formErrors.user_email ? 'error' : ''} placeholder="דוגמה: name@example.com" />
                    {formErrors.user_email && (
                      <div className="error-message">
                        <FaExclamationCircle />
                        <span>{formErrors.user_email}</span>
                      </div>
                    )}
                  </div>
                  <div className="form-group-bento full-height">
                    <label htmlFor="message">הודעה *</label>
                    <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows="4" className={formErrors.message ? 'error' : ''} placeholder="כיצד אוכל לעזור?"></textarea>
                    {formErrors.message && (
                      <div className="error-message">
                        <FaExclamationCircle />
                        <span>{formErrors.message}</span>
                      </div>
                    )}
                  </div>

                  <input type="hidden" name="recipient_email" value="hadas.toda.info@gmail.com" />

                  <button type="submit" className={`bento-submit-btn ${loading ? 'loading' : ''}`} disabled={loading}>
                    {loading ? 'שולח...' : 'שליחה'}
                    <FaArrowLeft className="btn-icon" />
                  </button>

                  {success && <div className="bento-feedback success">ההודעה נשלחה בהצלחה!</div>}
                  {error && <div className="bento-feedback error">אירעה שגיאה בשליחה.</div>}
                </form>
              </div>

              {/* 2. Phone Card */}
              <a href={`tel:${contactInfo.phone}`} className="bento-card phone-card" data-aos="fade-up" data-aos-delay="100">
                <div className="card-bg-effect"></div>
                <div className="pop-out-icon phone-3d">
                  <FaPhone />
                </div>
                <div className="bento-card-content">
                  <span className="card-label">טלפון</span>
                  <span className="card-value">{contactInfo.phone}</span>
                  <span className="card-action">חייג עכשיו</span>
                </div>
              </a>

              {/* 3. WhatsApp Card */}
              <a href={`https://wa.me/${contactInfo.whatsapp}`} target="_blank" rel="noopener noreferrer" className="bento-card whatsapp-card" data-aos="fade-up" data-aos-delay="200">
                <div className="card-bg-effect"></div>
                <div className="pop-out-icon whatsapp-3d">
                  <FaWhatsapp />
                </div>
                <div className="bento-card-content">
                  <span className="card-label">ווטסאפ</span>
                  <span className="card-value">זמינה לשיחה</span>
                  <span className="card-action">שלח הודעה</span>
                </div>
              </a>

              {/* 4. Email Card */}
              <a href={`mailto:${contactInfo.email}`} className="bento-card email-card" data-aos="fade-up" data-aos-delay="300">
                <div className="card-bg-effect"></div>
                <div className="pop-out-icon email-3d">
                  <FaEnvelope />
                </div>
                <div className="bento-card-content">
                  <span className="card-label">מייל</span>
                  <span className="card-value">hadas.toda.info@gmail.com</span>
                  <span className="card-action">כתוב לי</span>
                </div>
              </a>

              {/* 5. Map Card */}
              <div className="bento-card map-card" data-aos="fade-up" data-aos-delay="400">
                <div className="card-bg-effect"></div>
                <div className="map-overlay">
                  <div className="map-pin-3d">
                    <FaMapMarkerAlt />
                  </div>
                  <div className="address-badge">
                    {contactInfo.address}
                  </div>
                </div>
                <iframe
                  title="מיקום הקליניקה"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13520.846147508547!2d34.82549323022461!3d32.08510975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151d4a3f1f2b099d%3A0x2677dd5d196b8718!2z16nXmdeZ15XXnyDXkSfigJwsINeR16DXmSDXkdeo16c!5e0!3m2!1siw!2sil!4v1717998118455!5m2!1siw!2sil"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>

              {/* 6. Social Card */}
              <div className="bento-card social-card" data-aos="fade-up" data-aos-delay="500">
                <div className="card-bg-effect"></div>
                <div className="social-content">
                  <span className="social-label">עקבו אחרי</span>
                  <div className="social-icons-wrapper">
                    <a href={contactInfo.social.facebook} target="_blank" rel="noopener noreferrer" className="social-btn facebook">
                      <FaFacebookF />
                    </a>
                    <a href={contactInfo.social.instagram} target="_blank" rel="noopener noreferrer" className="social-btn instagram">
                      <FaInstagram />
                    </a>
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

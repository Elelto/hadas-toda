import React, { useState, useEffect, useRef } from 'react';
import { loadYamlContent } from '../utils/yamlLoader';
import AOS from 'aos';
import SEOHead from '../components/SEOHead';
import { init, send } from '@emailjs/browser';
import '../styles/contact.css';
import AuroraBackground from '../components/AuroraBackground';
import { FaPhone, FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaMap, FaFacebookF, FaInstagram, FaPlus, FaMinus, FaExternalLinkAlt, FaArrowLeft, FaExclamationCircle } from 'react-icons/fa';

// התחל את השירות של EmailJS עם המפתח הציבורי
init("l9xXgXVINGFdgI8KJ");

// Default content fallback
const getDefaultContactContent = () => ({
  hero: {
    title: "יצירת קשר",
    subtitle: "להתייעצות, שאלות או קביעת פגישה – אשמח לשוחח!"
  },
  contact_info: {
    title: "פרטי התקשרות",
    phone: "050-6796209",
    whatsapp: "972506796209",
    email: "hadas.toda.info@gmail.com",
    address: "שיכון ג', בני ברק",
    map_url: "https://maps.google.com/?q=שיכון+ג+בני+ברק",
    social: {
      facebook: "https://www.facebook.com/profile.php?id=61566802899787",
      instagram: "https://www.instagram.com/hadas_toda/"
    }
  },
  form: {
    title: "שלח/י הודעה"
  },
  faq: {
    title: "שאלות נפוצות",
    items: [
      {
        question: "מה משך הטיפול?",
        answer: "מפגש טיפולי נמשך כחצי שעה. במקרים מסוימים יתכן שיידרשו מפגשים ארוכים יותר, אך זה יתואם מראש."
      },
      {
        question: "האם נדרשת הכנה לפני הטיפול?",
        answer: "אין צורך בהכנה מיוחדת. מומלץ להגיע בלבוש נוח ולהימנע מארוחה כבדה לפני הטיפול."
      },
      {
        question: "האם יש החזר מקופת חולים?",
        answer: "בחלק מהמקרים ניתן לקבל החזר מקופות החולים השונות. אשמח להנפיק קבלה מתאימה לצורך הגשת בקשה להחזר."
      },
      {
        question: "האם ניתן לבטל תור שנקבע?",
        answer: "כן, ניתן לבטל תור עד 24 שעות לפני מועד הטיפול ללא חיוב. ביטול בהתראה קצרה יותר עשוי להיות כרוך בדמי ביטול."
      }
    ]
  }
});


export default function Contact() {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [contactContent, setContactContent] = useState(null);
  const [contentLoading, setContentLoading] = useState(true);
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    user_phone: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({});

  // Detect mobile devices for performance optimization
  const isMobile = window.matchMedia('(max-width: 768px)').matches;

  // Load YAML content
  useEffect(() => {
    const loadContent = async () => {
      try {
        const content = await loadYamlContent('/content/pages/contact.yml');
        if (content) {
          setContactContent(content);
        } else {
          setContactContent(getDefaultContactContent());
        }
      } catch (error) {
        console.error('Error loading contact content:', error);
        setContactContent(getDefaultContactContent());
      } finally {
        setContentLoading(false);
      }
    };

    loadContent();
  }, []);

  useEffect(() => {
    // Refresh AOS when content loads
    if (contactContent) {
      const timer = setTimeout(() => {
        AOS.refresh();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [contactContent]);

  // טיפול בשינויים בשדות הטופס
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // נקה שגיאות כאשר המשתמש מתקן את הקלט
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // בדיקת תקינות הטופס
  const validateForm = () => {
    const errors = {};

    if (!formData.user_name.trim()) {
      errors.user_name = 'נא להזין שם';
    }

    if (!formData.user_email.trim()) {
      errors.user_email = 'נא להזין כתובת אימייל';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.user_email)) {
      errors.user_email = 'כתובת האימייל אינה תקינה';
    }

    if (formData.user_phone.trim() && !/^0[2-9]\d{7,8}$/.test(formData.user_phone)) {
      errors.user_phone = 'מספר הטלפון אינו תקין';
    }

    if (!formData.message.trim()) {
      errors.message = 'נא להזין הודעה';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // בדיקת תקינות לפני שליחה
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setSuccess(false);
    setError(false);

    // נקח את הערכים מהטופס
    const name = formData.user_name;
    const email = formData.user_email;
    const phone = formData.user_phone;
    const message = formData.message;

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

    // הגדרת פרטי EmailJS
    const serviceID = 'service_zm8sd32';
    const templateID = 'template_abcdxis';
    const publicKey = 'l9xXgXVINGFdgI8KJ';

    // שליחת הפנייה לבעל האתר
    const mainParams = {
      to_name: 'הדס תודה',
      user_name: name,
      user_email: email,
      user_phone: phone || 'לא צוין',
      message: message,
      current_date: currentDate,
      current_time: currentTime,
      to_email: 'hadas.toda.info@gmail.com', // כתובת נמען מפורשת
      email: 'hadas.toda.info@gmail.com',     // ניסיון נוסף לכתובת בפורמט אחר
      recipient: 'hadas.toda.info@gmail.com',  // ניסיון נוסף
      reply_to: email
    };

    // שליחת הפנייה
    send(serviceID, templateID, mainParams, publicKey)
      .then((result) => {
        console.log('פנייה נשלחה בהצלחה:', result.text);

        // שליחת אישור אוטומטי לפונה (החלף את המזהה בתבנית האישור שלך)
        const replyParams = {
          user_name: name,
          user_email: email,
          user_phone: phone || 'לא צוין',
          message: message,
          to_name: name,
          to_email: email,  // המייל הולך לפונה
          email: email,     // ניסיון אחר לכתובת בפורמט אחר
          reply_to: 'hadas.toda.info@gmail.com'
        };

        // תבנית האישור לפונה
        const replyTemplateID = 'template_vmm0l2g';  // תבנית האישור

        // שליחת האישור
        send(serviceID, replyTemplateID, replyParams, publicKey)
          .then((replyResult) => {
            console.log('אישור נשלח לפונה:', replyResult.text);
            setSuccess(true);
            setLoading(false);
            form.current.reset();
          })
          .catch((replyError) => {
            console.error('שגיאה בשליחת האישור:', replyError);
            // אם נכשל האישור, עדיין מראים הצלחה כי הפנייה עצמה נשלחה
            setSuccess(true);
            setLoading(false);
            form.current.reset();
          });
      })
      .catch((error) => {
        console.error('שגיאה בשליחת הפנייה:', error);
        setError(true);
        setLoading(false);
      });
  };

  // אפקט לגלילה חלקה למיקום הטופס כאשר יש שגיאה
  useEffect(() => {
    if (Object.keys(formErrors).length > 0) {
      const firstErrorField = document.querySelector('.form-error');
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [formErrors]);

  // אפקט לסגירת הודעת ההצלחה אחרי 5 שניות
  useEffect(() => {
    let timer;
    if (success) {
      timer = setTimeout(() => {
        setSuccess(false);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [success]);

  // פונקציה לפתיחה וסגירה של שאלות נפוצות
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  if (contentLoading) {
    return <div className="loading">טוען...</div>;
  }

  if (!contactContent) {
    return <div className="error">שגיאה בטעינת התוכן</div>;
  }

  // SEO structured data for contact page
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "mainEntity": {
      "@type": "MedicalBusiness",
      "name": "הדס תודה - קלינאית תקשורת",
      "description": "יצירת קשר עם הדס תודה - קלינאית תקשורת מוסמכת לקביעת פגישות וייעוץ מקצועי",
      "url": "https://hadas-toda.co.il/contact",
      "telephone": "+972-50-679-6209",
      "email": "hadas.toda.info@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "שיכון ג'",
        "addressLocality": "בני ברק",
        "addressCountry": "IL"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "32.0851",
        "longitude": "34.8255"
      },
      "openingHours": "Mo-Th 09:00-18:00",
      "sameAs": [
        "https://www.facebook.com/profile.php?id=61566802899787",
        "https://www.instagram.com/hadas_toda/"
      ]
    }
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

  return (
    <div className="contact-page-bento" onMouseMove={handleMouseMove}>
      <AuroraBackground />
      <SEOHead
        title="יצירת קשר"
        description="יצירת קשר עם הדס תודה - קלינאית תקשורת מוסמכת. קביעת פגישות, ייעוץ מקצועי וטיפול בגמגום, צרידות ובעיות קול. טלפון: 050-679-6209"
        keywords="יצירת קשר, הדס תודה, קביעת פגישה, קלינאית תקשורת, ייעוץ, טלפון, בני ברק"
        canonicalUrl="/contact"
        structuredData={structuredData}
      />

      <div className="bento-content-wrapper">
        <div className="container">
          <div className="bento-header text-center">
            <h1 className="bento-title" data-aos="fade-down">{contactContent.hero?.title || "יצירת קשר"}</h1>
            <p className="bento-subtitle" data-aos="fade-up" data-aos-delay="100">{contactContent.hero?.subtitle || "להתייעצות, שאלות או קביעת פגישה – אשמח לשוחח!"}</p>
          </div>

          <div className="bento-grid">
            {/* 1. Main Form Card */}
            <div className="bento-card form-card" data-aos="fade-up" data-aos-delay="200">
              <div className="card-bg-effect"></div>
              <div className="sound-wave-animation">
                {[...Array(5)].map((_, i) => <div key={i} className="bar"></div>)}
              </div>
              <h2 className="card-title">{contactContent.form?.title || "שלח/י הודעה"}</h2>
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
            <a href={`tel:${contactContent.contact_info?.phone || "0506796209"}`} className="bento-card phone-card" data-aos="fade-up" data-aos-delay="300">
              <div className="card-bg-effect"></div>
              <div className="pop-out-icon phone-3d">
                <FaPhone />
              </div>
              <div className="bento-card-content">
                <span className="card-label">טלפון</span>
                <span className="card-value">{contactContent.contact_info?.phone || "050-6796209"}</span>
                <span className="card-action">חייג עכשיו</span>
              </div>
            </a>

            {/* 3. WhatsApp Card */}
            <a href={`https://wa.me/${contactContent.contact_info?.whatsapp || "972506796209"}`} target="_blank" rel="noopener noreferrer" className="bento-card whatsapp-card" data-aos="fade-up" data-aos-delay="400">
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
            <a href={`mailto:${contactContent.contact_info?.email || "hadas.toda.info@gmail.com"}`} className="bento-card email-card" data-aos="fade-up" data-aos-delay="500">
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
            <div className="bento-card map-card" data-aos="fade-up" data-aos-delay="600">
              <div className="card-bg-effect"></div>
              <div className="map-overlay">
                <div className="map-pin-3d">
                  <FaMapMarkerAlt />
                </div>
                <div className="address-badge">
                  {contactContent.contact_info?.address || "שיכון ג', בני ברק"}
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
            <div className="bento-card social-card" data-aos="fade-up" data-aos-delay="700">
              <div className="card-bg-effect"></div>
              <div className="social-content">
                <span className="social-label">עקבו אחרי</span>
                <div className="social-icons-wrapper">
                  <a href={contactContent.contact_info?.social?.facebook || "https://www.facebook.com/profile.php?id=61566802899787"} target="_blank" rel="noopener noreferrer" className="social-btn facebook">
                    <FaFacebookF />
                  </a>
                  <a href={contactContent.contact_info?.social?.instagram || "https://www.instagram.com/hadas_toda/"} target="_blank" rel="noopener noreferrer" className="social-btn instagram">
                    <FaInstagram />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <section className="organic-faq-section" data-aos="fade-up">
          <h2 className="organic-section-title text-center">{contactContent.faq_title || contactContent.faq?.title || "שאלות נפוצות"}</h2>
          <div className="organic-faq-grid">
            {(contactContent.faq_items || contactContent.faq?.items)?.map((faqItem, index) => (
              <div key={index} className={`organic-faq-item ${openFaq === index ? 'active' : ''}`} onClick={() => toggleFaq(index)}>
                <div className="faq-head">
                  <span className="question-text">{faqItem.question}</span>
                  <span className="toggle-icon">{openFaq === index ? '−' : '+'}</span>
                </div>
                <div className="faq-body">
                  <p>{faqItem.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}


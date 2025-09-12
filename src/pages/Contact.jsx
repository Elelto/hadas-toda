import React, { useState, useEffect, useRef } from 'react';
import { loadYamlContent } from '../utils/yamlLoader';
import AOS from 'aos';
import SEOHead from '../components/SEOHead';
import { init, send } from '@emailjs/browser';
import '../styles/contact.css';

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
      "url": "https://www.hadas-toda.co.il/contact",
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

  return (
    <div className="contact-page">
      <SEOHead
        title="יצירת קשר"
        description="יצירת קשר עם הדס תודה - קלינאית תקשורת מוסמכת. קביעת פגישות, ייעוץ מקצועי וטיפול בגמגום, צרידות ובעיות קול. טלפון: 050-679-6209"
        keywords="יצירת קשר, הדס תודה, קביעת פגישה, קלינאית תקשורת, ייעוץ, טלפון, בני ברק"
        canonicalUrl="/contact"
        structuredData={structuredData}
      />
      <div className="contact-hero">
        <div className="container">
          <h1 className="contact-title" data-aos="fade-down">{contactContent.hero?.title || "יצירת קשר"}</h1>
          <p className="contact-subtitle" data-aos="fade-up" data-aos-delay="300">{contactContent.hero?.subtitle || "להתייעצות, שאלות או קביעת פגישה – אשמח לשוחח!"}</p>
        </div>
      </div>
      
      <div className="container">
        <section className="contact-section">
          
          <div className="contact-container">
            <div className="contact-info-card" data-aos="fade-right">
              <div className="info-title-wrapper">
                <h2 className="info-title" id="contact-details-title" data-aos="fade-up" data-aos-delay="200">{contactContent.contact_info?.title || "פרטי התקשרות"}</h2>
              </div>
              
              <div className="contact-details" data-aos="fade-up" data-aos-delay="400">
                <div className="contact-item">
                  <div className="contact-icon">☎️</div>
                  <div className="contact-text">
                    <span className="contact-label">טלפון</span>
                    <a href={`tel:${contactContent.contact_info?.phone || "0506796209"}`} className="contact-link">{contactContent.contact_info?.phone || "050-6796209"}</a>
                  </div>
                </div>
                
                <div className="contact-item">
                  <div className="contact-icon">📱</div>
                  <div className="contact-text">
                    <span className="contact-label">ווטסאפ</span>
                    <a href={`https://wa.me/${contactContent.contact_info?.whatsapp || "972506796209"}`} target="_blank" rel="noopener noreferrer" className="contact-link contact-link-whatsapp">שלח/י הודעה <span className="whatsapp-icon">↗</span></a>
                  </div>
                </div>
                
                <div className="contact-item">
                  <div className="contact-icon">✉️</div>
                  <div className="contact-text">
                    <span className="contact-label">מייל</span>
                    <a href={`mailto:${contactContent.contact_info?.email || "hadas.toda.info@gmail.com"}`} className="contact-link">{contactContent.contact_info?.email || "hadas.toda.info@gmail.com"}</a>
                  </div>
                </div>
                
                <div className="contact-item">
                  <div className="contact-icon">📍</div>
                  <div className="contact-text">
                    <span className="contact-label">כתובת</span>
                    <a href={contactContent.contact_info?.map_url || "https://maps.google.com/?q=שיכון+ג+בני+ברק"} target="_blank" rel="noopener noreferrer" className="contact-link location-link">{contactContent.contact_info?.address || "שיכון ג', בני ברק"} <span className="map-icon">🗺️</span></a>
                  </div>
                </div>
                
                <div className="contact-map" data-aos="zoom-in" data-aos-delay="600">
                  <iframe 
                    title="מיקום הקליניקה"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13520.846147508547!2d34.82549323022461!3d32.08510975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151d4a3f1f2b099d%3A0x2677dd5d196b8718!2z16nXmdeZ15XXnyDXkSfigJwsINeR16DXmSDXkdeo16c!5e0!3m2!1siw!2sil!4v1717998118455!5m2!1siw!2sil"
                    width="100%"
                    height="200"
                    style={{ border: 0, borderRadius: '8px', marginTop: '1.5rem' }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
                
                <div className="contact-social" data-aos="fade-up" data-aos-delay="800">
                  <h3 className="social-title">עקבו אחרי</h3>
                  <div className="social-links">
                    <a href={contactContent.contact_info?.social?.facebook || "https://www.facebook.com/profile.php?id=61566802899787"} target="_blank" rel="noopener noreferrer" className="social-link" aria-label="פייסבוק">
                      <div className="social-icon">f</div>
                    </a>
                    <a href={contactContent.contact_info?.social?.instagram || "https://www.instagram.com/hadas_toda/"} target="_blank" rel="noopener noreferrer" className="social-link" aria-label="אינסטגרם">
                      <div className="social-icon">📸</div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="contact-form-card" data-aos="fade-left">
              <div className="form-title-wrapper">
                <h2 className="form-title" data-aos="fade-up" data-aos-delay="200">{contactContent.form?.title || "שלח/י הודעה"}</h2>
              </div>
              <form className="contact-form" ref={form} onSubmit={handleSubmit} data-aos="fade-up" data-aos-delay="400">
                <div className="form-group">
                  <label htmlFor="user_name" className="form-label">שם</label>
                  <input 
                    type="text" 
                    id="user_name"
                    name="user_name" 
                    className={`form-control ${formErrors.user_name ? 'is-invalid' : ''}`} 
                    value={formData.user_name}
                    onChange={handleChange}
                  />
                  {formErrors.user_name && <div className="form-error">{formErrors.user_name}</div>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="user_email" className="form-label">אימייל</label>
                  <input 
                    type="email" 
                    id="user_email"
                    name="user_email" 
                    className={`form-control ${formErrors.user_email ? 'is-invalid' : ''}`} 
                    value={formData.user_email}
                    onChange={handleChange}
                  />
                  {formErrors.user_email && <div className="form-error">{formErrors.user_email}</div>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="user_phone" className="form-label">טלפון <span className="optional-field">(אופציונלי)</span></label>
                  <input 
                    type="tel" 
                    id="user_phone"
                    name="user_phone" 
                    className={`form-control ${formErrors.user_phone ? 'is-invalid' : ''}`} 
                    value={formData.user_phone}
                    onChange={handleChange}
                    placeholder="050-1234567"
                  />
                  {formErrors.user_phone && <div className="form-error">{formErrors.user_phone}</div>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="message" className="form-label">הודעה</label>
                  <textarea 
                    id="message"
                    name="message" 
                    className={`form-control ${formErrors.message ? 'is-invalid' : ''}`} 
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="אנא כתבו את הודעתכם כאן..."
                  ></textarea>
                  {formErrors.message && <div className="form-error">{formErrors.message}</div>}
                </div>
                
                {/* שדה נסתר לכתובת המייל של היעד */}
                <input type="hidden" name="recipient_email" value="hadas.toda.info@gmail.com" />
                
                <button type="submit" className={`btn form-submit ${loading ? 'loading' : ''}`} disabled={loading}>
                  <span className="btn-text">{loading ? 'שולח...' : 'שלח/י הודעה'}</span>
                  {loading && <span className="spinner"></span>}
                </button>
                
                {success && (
                  <div className="form-feedback success">
                    <div className="feedback-icon">✓</div>
                    <div className="feedback-message">
                      <strong>ההודעה נשלחה בהצלחה!</strong>
                      <p>תודה על פנייתך, אחזור אליך בהקדם.</p>
                    </div>
                  </div>
                )}
                
                {error && (
                  <div className="form-feedback error">
                    <div className="feedback-icon">!</div>
                    <div className="feedback-message">
                      <strong>אירעה שגיאה בשליחת ההודעה</strong>
                      <p>אנא נסו שוב מאוחר יותר או צרו קשר באמצעי אחר.</p>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </section>
        
        <section className="faq-section">
          <div className="container">
            <div className="faq-title-wrapper">
              <h2 className="faq-title" data-aos="fade-up">{contactContent.faq_title || "שאלות נפוצות"}</h2>
            </div>
            <div className="faq-container" data-aos="fade-up" data-aos-delay="200">
              {contactContent.faq_items?.map((faqItem, index) => (
                <div key={index} className={`faq-item ${openFaq === index ? 'active' : ''}`} onClick={() => toggleFaq(index)}>
                  <div className="faq-question">
                    <span>{faqItem.question}</span>
                    <div className="faq-icon">{openFaq === index ? '-' : '+'}</div>
                  </div>
                  <div className="faq-answer">
                    <p>{faqItem.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

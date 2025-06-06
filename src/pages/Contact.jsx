import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import '../styles/contact.css';

// התחל את השירות של EmailJS עם המפתח הציבורי
emailjs.init("k7SxyE2trMVXhAE_C");

export default function Contact() {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError(false);
    
    // נקח את הערכים מהטופס
    const name = form.current.elements.user_name.value;
    const email = form.current.elements.user_email.value;
    const message = form.current.elements.message.value;

    // הגדרת פרטי EmailJS
    const serviceID = 'service_zm8sd32';
    const templateID = 'template_abcdxis';
    const publicKey = 'k7SxyE2trMVXhAE_C';

    // שליחת הפנייה לבעל האתר
    const mainParams = {
      to_name: 'הדס תודה',
      user_name: name,
      user_email: email,
      message: message,
      to_email: 'hadas.toda.info@gmail.com', // כתובת נמען מפורשת
      email: 'hadas.toda.info@gmail.com',     // ניסיון נוסף לכתובת בפורמט אחר
      recipient: 'hadas.toda.info@gmail.com',  // ניסיון נוסף
      reply_to: email
    };
    
    // שליחת הפנייה
    emailjs
      .send(serviceID, templateID, mainParams, publicKey)
      .then((result) => {
        console.log('פנייה נשלחה בהצלחה:', result.text);
        
        // שליחת אישור אוטומטי לפונה (החלף את המזהה בתבנית האישור שלך)
        const replyParams = {
          user_name: name,
          user_email: email,
          message: message,
          to_name: name,
          to_email: email,  // המייל הולך לפונה
          email: email,     // ניסיון אחר לכתובת בפורמט אחר
          reply_to: 'hadas.toda.info@gmail.com'
        };
        
        // תבנית האישור לפונה
        const replyTemplateID = 'template_vmm0l2g';  // תבנית האישור
        
        // שליחת האישור
        emailjs
          .send(serviceID, replyTemplateID, replyParams, publicKey)
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
  
  return (
    <div className="contact-page">
      <div className="container">
        <section className="contact-section">
          <div className="contact-header">
            <h1 className="contact-title">יצירת קשר</h1>
            <p className="contact-subtitle">להתייעצות, שאלות או קביעת פגישה – אשמח לשוחח!</p>
          </div>
          
          <div className="contact-container">
            <div className="contact-info-card">
              <h2 className="info-title">פרטי התקשרות</h2>
              
              <div className="contact-details">
                <div className="contact-item">
                  <div className="contact-icon">☎️</div>
                  <div className="contact-text">
                    <span className="contact-label">טלפון</span>
                    <a href="tel:0506796209" className="contact-link">050-6796209</a>
                  </div>
                </div>
                
                <div className="contact-item">
                  <div className="contact-icon">📱</div>
                  <div className="contact-text">
                    <span className="contact-label">ווטסאפ</span>
                    <a href="https://wa.me/972506796209" target="_blank" rel="noopener noreferrer" className="contact-link">שלח/י הודעה</a>
                  </div>
                </div>
                
                <div className="contact-item">
                  <div className="contact-icon">✉️</div>
                  <div className="contact-text">
                    <span className="contact-label">מייל</span>
                    <a href="mailto:hadas.toda.info@gmail.com" className="contact-link">hadas.toda.info@gmail.com</a>
                  </div>
                </div>
                
                <div className="contact-item">
                  <div className="contact-icon">📍</div>
                  <div className="contact-text">
                    <span className="contact-label">כתובת</span>
                    <span>רחוב יהודה הנשיא 19, בני ברק</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="contact-form-card">
              <h2 className="form-title">שלח/י הודעה</h2>
              <form className="contact-form" ref={form} onSubmit={handleSubmit}>
                <div className="form-group">
                  <input type="text" name="user_name" className="form-input" placeholder="שם" required />
                </div>
                
                <div className="form-group">
                  <input type="email" name="user_email" className="form-input" placeholder="אימייל" required />
                </div>
                
                <div className="form-group">
                  <textarea name="message" className="form-textarea" placeholder="הודעה" rows="4" required></textarea>
                </div>
                
                {/* שדה נסתר לכתובת המייל של היעד */}
                <input type="hidden" name="recipient_email" value="hadas.toda.info@gmail.com" />
                
                <button type="submit" className="btn form-submit" disabled={loading}>
                  {loading ? 'שולח...' : 'שלח/י הודעה'}
                </button>
                
                {success && <div className="form-feedback success">ההודעה נשלחה בהצלחה!</div>}
                {error && <div className="form-feedback error">אירעה שגיאה בשליחת ההודעה. אנא נסו שוב מאוחר יותר.</div>}
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

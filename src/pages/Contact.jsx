import React from 'react';
import '../styles/contact.css';

export default function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('ההודעה נשלחה!');
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
                    <a href="mailto:hadas-toda@gmail.com" className="contact-link">hadas-toda@gmail.com</a>
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
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <input type="text" id="name" className="form-input" placeholder="שם" required />
                </div>
                
                <div className="form-group">
                  <input type="email" id="email" className="form-input" placeholder="אימייל" required />
                </div>
                
                <div className="form-group">
                  <textarea id="message" className="form-textarea" placeholder="הודעה" rows="4" required></textarea>
                </div>
                
                <button type="submit" className="btn form-submit">שלח/י הודעה</button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

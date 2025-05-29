import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/testimonials.css';

const testimonials = [
  { 
    name: 'אמא של יואב', 
    text: 'הדס עזרה לבן שלי להתגבר על קשיי ההיגוי שלו בסבלנות ובמקצועיות. היא ידעה בדיוק איך לגשת אליו ולהפוך את הטיפול לחוויה נעימה.',
    childName: 'יואב',
    childAge: 6
  },
  { 
    name: 'דנה, אמא של רותם', 
    text: 'הרגשנו שינוי משמעותי כבר לאחר מספר מפגשים. הדס הצליחה ליצור קשר מיוחד עם הבת שלנו ולהתאים את הטיפול בדיוק לצרכים שלה. ממליצה בחום!',
    childName: 'רותם',
    childAge: 4
  },
  { 
    name: 'משפחת כהן', 
    text: 'הדס היא קלינאית תקשורת מקצועית ומסורה. הטיפול היה מותאם אישית לבתנו והיא הצליחה ליצור סביבה מוגנת ומקדמת עבורה. התקדמנו משמעותית בזכותה.',
    childName: 'נועה',
    childAge: 5
  },
];

export default function Testimonials() {
  return (
    <div className="testimonials-page">
      <div className="container">
        <section className="testimonials-section">
          <div className="testimonials-header">
            <h1 className="testimonials-title">מטופלים מספרים</h1>
            <p className="section-subtitle">
              החוויות של הורים וילדים שעברו טיפול אצלי
            </p>
          </div>
          
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-quote-mark">"</div>
                
                <p className="testimonial-text">
                  {testimonial.text}
                </p>
                
                <div className="testimonial-footer">
                  <div className="testimonial-author">
                    <div className="author-name">
                      {testimonial.name}
                    </div>
                    <div className="author-details">
                      {testimonial.childName ? `הורה של ${testimonial.childName}, בן/בת ${testimonial.childAge}` : ''}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="share-testimonial">
            <h2 className="share-title">רוצים לשתף את החוויה שלכם?</h2>
            <p className="share-description">
              אשמח לשמוע על החוויה שלכם בטיפול ולהוסיף את ההמלצה שלכם לאתר
            </p>
            <Link to="/contact" className="btn">
              דברו איתי
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

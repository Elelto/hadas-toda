import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/testimonials.css';

const testimonials = [
  { 
    name: 'אמא של אורי',
    text: 'הגענו להדס עם קשיי היגוי של אורי. המקצועיות, הסבלנות והגישה המדהימה של הדס הפכו את הטיפול לחוויה חיובית עבורו ועבורנו. השיפור ניכר ואנחנו מודים מאוד!',
    childName: 'אורי',
    childAge: 6,
    childGender: 'בן'
  },
  { 
    name: 'דניאל כהן',
    text: 'סבלתי מצרידות כרונית שהפריעה לי מאוד בחיי היום-יום. הטיפול אצל הדס היה נקודת מפנה. היא אבחנה במדויק את מקור הבעיה ובנתה תוכנית טיפול אישית ויעילה. היום הקול שלי נקי וחזק מתמיד. תודה ענקית!',
    childName: null,
    childAge: null,
    childGender: null
  },
  { 
    name: 'דנה, אמא של רותם',
    text: 'הרגשנו שינוי משמעותי בהתפתחות השפה של רותם כבר לאחר מספר מפגשים. הדס הצליחה ליצור קשר מיוחד עם הבת שלנו ולהתאים את הטיפול בדיוק לצרכים שלה. ממליצה בחום!',
    childName: 'רותם',
    childAge: 4,
    childGender: 'בת'
  },
  {
    name: 'מאיה לוי, מרצה',
    text: 'כמרצה, הקול שלי הוא כלי עבודה מרכזי. לאחר תקופה של עומס קולי, התחלתי לחוות קשיים. הדס, במקצועיות רבה, לימדה אותי טכניקות להפקת קול נכונה, תרגילי חיזוק ושמירה על בריאות הקול. אני מרגישה הבדל עצום.',
    childName: null,
    childAge: null,
    childGender: null
  },
  { 
    name: 'משפחת כהן',
    text: 'הדס היא קלינאית תקשורת מקצועית ומסורה. הטיפול היה מותאם אישית לבתנו והיא הצליחה ליצור סביבה מוגנת ומקדמת עבורה. התקדמנו משמעותית בזכותה בתחום השפתי והתקשורתי.',
    childName: 'נועה',
    childAge: 5,
    childGender: 'בת'
  }
];

export default function Testimonials() {
  return (
    <div className="testimonials-page">
      <div className="container">
        <section className="testimonials-section">
          <div className="testimonials-header">
            <h1 className="testimonials-title" data-aos="fade-down">הקול שלנו: סיפורי הצלחה מהקליניקה</h1>
            <p className="section-subtitle" data-aos="fade-up" data-aos-delay="200">
              מטופלים מכל הגילאים משתפים איך הטיפול עזר להם להתגבר על אתגרי קול, צרידות, שפה ודיבור.
            </p>
          </div>
          
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card" data-aos="fade-up" data-aos-delay={300 + (index * 100)}>
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
                        {testimonial.childName && testimonial.childGender ? `הורה של ${testimonial.childName}, ${testimonial.childGender} ${testimonial.childAge}` : (testimonial.childName ? `הורה של ${testimonial.childName}, גיל ${testimonial.childAge}` : '')}
                      </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="share-testimonial" data-aos="zoom-in" data-aos-delay="800">
            <h2 className="share-title">גם הקול שלכם יכול להישמע!</h2>
            <p className="share-description">
              אני מזמינה אתכם לשתף את סיפור ההצלחה האישי שלכם – בין אם מדובר בהתגברות על צרידות, שיפור יכולות הדיבור, או כל אתגר תקשורתי אחר. המלצתכם יכולה לעזור לאחרים.
            </p>
            <Link to="/contact" className="btn">
              שתפו את החוויה שלכם
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

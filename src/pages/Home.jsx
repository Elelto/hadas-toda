import React from 'react';
import { Link } from 'react-router-dom';
import heroImage from '../assets/logo.jpg'; // יש להחליף בתמונה מתאימה
import '../styles/home.css';

export default function Home() {
  // תחומי טיפול
  const treatmentAreas = [
    'עיכוב שפתי',
    'היגוי שורקות',
    'מודעות פונולוגית',
    'קשיים בהבנה',
    'שיבושי היגוי',
    'קשיי שליפה',
    'עיכוב התפתחותי',
    'אפרקסיה',
    'ארגון מסר',
    'הכנה לכיתה א\''
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="home-hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">הדס תודה</h1>
            <h2 className="hero-subtitle">קלינאית תקשורת בבני ברק</h2>
            <p className="hero-description">
              מטפלת ומאבחנת בתחומי השפה, הדיבור וההיגוי בקרב ילדים בגילאי שנה עד גילאי בית-ספר.
            </p>
            <Link to="/contact" className="btn hero-cta">
              דברו איתי
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Preview */}
      <section className="home-testimonials">
        <div className="container">
          <h2 className="section-title">מטופלים מספרים</h2>
          <div className="quote">
            "הדס עזרה לבן שלי להתגבר על קשיי ההיגוי שלו בסבלנות ובמקצועיות. היא ידעה בדיוק איך לגשת אליו ולהפוך את הטיפול לחוויה נעימה."
            <div className="quote-author">- אמא של יואב, בן 6</div>
          </div>
          <div className="testimonials-cta">
            <Link to="/testimonials" className="btn-secondary btn">
              לכל ההמלצות
            </Link>
          </div>
        </div>
      </section>

      {/* Treatment Areas */}
      <section className="home-services">
        <div className="container">
          <h2 className="section-title">תחומי טיפול</h2>
          <div className="treatment-areas-grid">
            {treatmentAreas.map((area, index) => (
              <div key={index} className="treatment-area-item">
                {area}
              </div>
            ))}
          </div>
          <div className="services-cta">
            <Link to="/services" className="btn-secondary btn">
              לכל השירותים
            </Link>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="home-quote">
        <div className="container">
          <div className="quote">
            "כל מה שילד צריך, זה מבוגר אחד שיאמין בו"
            <div className="quote-author">- הרב שלמה קרליבך</div>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="home-about">
        <div className="container">
          <h2 className="section-title">קצת עליי</h2>
          <div className="about-preview">
            <p>
              היי, אני הדס, קלינאית תקשורת לילדים, בעלת תואר שני בקלינאות תקשורת.
            </p>
            <p>
              במהלך השנים רכשתי ניסיון רב בטיפול ואבחון בתחומי השפה, הדיבור וההיגוי בעיקר בקרב ילדים בגילאי שנה עד גילאי בית-ספר.
            </p>
            <p>
              בעבודה שלי אני משלבת בין פעילות דידקטית ליד שולחן לבין פעילות חופשית כשמטרות הטיפול מושגות על בסיס תחומי העניין והעולם הפנימי של הילד.
            </p>
            <div className="about-cta">
              <Link to="/about" className="btn-secondary btn">
                עוד עליי
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import heroImage from '../assets/logo.jpg'; // יש להחליף בתמונה מתאימה
import '../styles/home.css';

export default function Home() {
  // תחומי טיפול
  // תחומי טיפול עדכניים
  const treatmentAreas = [
    'טיפול בצרידות ובעיות קול',
    'שיקום קולי מקצועי',
    'ליווי קולי (מורים, מרצים)',
    'אבחון וטיפול בעיכוב שפתי',
    'טיפול בשיבושי היגוי',
    'שיפור יכולות ארגון מסר ושליפה',
    'הכנה לכיתה א\' – היבטים שפתיים ותקשורתיים'
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="home-hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">הדס תודה</h1>
            <h2 className="hero-subtitle">קלינאית תקשורת מומחית לשפה, דיבור וקול</h2>
            <p className="hero-description">
              נעים להכיר, אני הדס. אני מלווה ילדים ומבוגרים במסעם לשיפור התקשורת והביטחון העצמי. בין אם מדובר באתגרי שפה והיגוי אצל ילדים, או בצרידות וקשיי קול אצל מבוגרים – אני כאן כדי להקשיב, לאבחן ולהתאים תוכנית טיפול אישית שתביא לתוצאות.
            </p>
            <Link to="/contact" className="btn hero-cta">
              בואו נדבר
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Preview */}
      <section className="home-testimonials">
        <div className="container">
          <h2 className="section-title">קולות מהקליניקה</h2>
          <div className="quote">
            "אחרי שנים של צרידות כרונית, הגעתי להדס וסוף סוף מצאתי מענה. הטיפול המקצועי והיחס האישי החזירו לי את הקול ואת שמחת החיים."
            <div className="quote-author">– יעל, מורה</div>
          </div>
          <div className="testimonials-cta">
            <Link to="/testimonials" className="btn-secondary btn">
              עוד סיפורי הצלחה
            </Link>
          </div>
        </div>
      </section>

      {/* Treatment Areas */}
      <section className="home-services">
        <div className="container">
          <h2 className="section-title">תחומי המומחיות שלי</h2>
          <div className="treatment-areas-grid">
            {treatmentAreas.map((area, index) => (
              <div key={index} className="treatment-area-item">
                {area}
              </div>
            ))}
          </div>
          <div className="services-cta">
            <Link to="/services" className="btn-secondary btn">
              פירוט נוסף על הטיפולים
            </Link>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="home-quote">
        <div className="container">
          <div className="quote">
            "קול הוא הגשר בין הנשמה לעולם."
            {/* <div className="quote-author">- אמרה ידועה</div> */}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="home-about">
        <div className="container">
          <h2 className="section-title">נעים להכיר, אני הדס</h2>
          <div className="about-preview">
            <p>
              שמי הדס תודה, קלינאית תקשורת (M.A) עם תשוקה אמיתית לעזור לאנשים למצוא את קולם – תרתי משמע. אני מאמינה שביכולתה של תקשורת טובה לפתוח דלתות, לבנות גשרים ולהעצים כל אדם.
            </p>
            <p>
              הניסיון שלי כולל עבודה עם מגוון רחב של גילאים ואתגרים: החל מליווי התפתחותי של ילדים בתחומי השפה והדיבור, דרך טיפול בקשיי היגוי ושטף, ועד להתמחות מעמיקה באבחון וטיפול בבעיות קול וצרידות אצל ילדים ומבוגרים.
            </p>
            <p>
              בקליניקה שלי, כל מטופל מקבל יחס אישי ותוכנית טיפול המותאמת בדיוק עבורו. אני משלבת ידע מקצועי עדכני עם גישה יצירתית ורגישה, כדי להפוך את התהליך הטיפולי לחוויה חיובית ומקדמת.
            </p>
            <div className="about-cta">
              <Link to="/about" className="btn-secondary btn">
                קראו עוד על הגישה שלי
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

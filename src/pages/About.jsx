import React from 'react';
import '../styles/about.css';

export default function About() {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="container">
          <h1 className="about-title">אודות הדס תודה</h1>
          <div className="about-subtitle">קלינאית תקשורת מוסמכת (M.A)</div>
        </div>
      </section>
      
      <section className="about-content">
        <div className="container">
          <div className="about-card">
            <h2>קצת עליי</h2>
            <p className="about-text">
              שמי הדס תודה, קלינאית תקשורת מוסמכת עם ניסיון רב בטיפול בילדים ובמבוגרים במגוון תחומים: גמגום, שפה, דיבור, קול ותקשורת.
            </p>
            <p className="about-text">
              אני מאמינה בגישה אישית ומותאמת לכל מטופל, עם דגש על מקצועיות, רגישות והעצמה. הטיפול מתבצע באווירה נעימה ותומכת, תוך שיתוף פעולה מלא עם המטופל ומשפחתו.
            </p>
            <p className="about-text">
              בעבודתי אני משלבת שיטות טיפול מגוונות ועדכניות, המותאמות באופן אישי לצרכים הייחודיים של כל מטופל. אני מקפידה על התעדכנות מקצועית שוטפת ועל יישום גישות טיפוליות חדשניות.
            </p>
            <p className="about-text highlight">
              אשמח ללוות אתכם או את ילדיכם בדרך לשיפור התקשורת והביטחון העצמי.
            </p>
          </div>
          
          <div className="about-qualifications">
            <h2>הכשרה וניסיון</h2>
            <ul className="qualifications-list">
              <li>תואר שני בקלינאות תקשורת (M.A)</li>
              <li>מומחיות בטיפול בהפרעות שפה ודיבור בילדים</li>
              <li>ניסיון עשיר בעבודה במסגרות חינוכיות וטיפוליות</li>
              <li>התמחות בטיפול בגמגום ושטף דיבור</li>
              <li>הכשרה בשיטות טיפול מתקדמות</li>
            </ul>
          </div>
        </div>
      </section>
      
      <section className="about-quote">
        <div className="container">
          <div className="quote">
            "הטיפול הנכון מתחיל בהקשבה אמיתית ובהבנת הצרכים הייחודיים של כל אדם"
            <div className="quote-author">- הדס תודה</div>
          </div>
        </div>
      </section>
    </div>
  );
}

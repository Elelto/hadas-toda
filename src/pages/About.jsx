import React from 'react';
import '../styles/about.css';

export default function About() {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="container">
          <h1 className="about-title" data-aos="fade-down">נעים להכיר, הדס תודה</h1>
          <div className="about-subtitle" data-aos="fade-up" data-aos-delay="300">קלינאית תקשורת (M.A), מומחית בטיפול בקול, צרידות, שפה ודיבור לילדים ומבוגרים</div>
        </div>
      </section>
      
      <section className="about-content">
        <div className="container">
          <div className="about-card" data-aos="fade-up">
            <h2 data-aos="fade-right" data-aos-delay="200">מסע אל הקול הפנימי והחיצוני</h2>
            <p className="about-text" data-aos="fade-up" data-aos-delay="400">
              שמי הדס תודה, קלינאית תקשורת מוסמכת (M.A), ואני כאן כדי ללוות אתכם במסע לגילוי וחיזוק הקול שלכם – בין אם מדובר בקול הפיזי או ביכולת התקשורתית. אני מתמחה באבחון וטיפול במגוון רחב של אתגרים, החל מבעיות קול וצרידות, דרך טיפול בהפרעות שפה ודיבור, וכלה בליווי התפתחותי לילדים ומתן כלים לתקשורת מיטבית למבוגרים.
            </p>
            <p className="about-text" data-aos="fade-up" data-aos-delay="600">
              אני מאמינה שמאחורי כל קול יש סיפור, ומאחורי כל אתגר תקשורתי יש פוטנציאל לצמיחה. הגישה הטיפולית שלי היא אישית, מכילה ומעצימה, ומבוססת על יצירת קשר של אמון וביטחון. יחד, נבנה תוכנית טיפול מותאמת אישית, באווירה נעימה ותומכת, תוך שיתוף פעולה מלא שלכם ושל משפחותיכם.
            </p>
            <p className="about-text" data-aos="fade-up" data-aos-delay="800">
              בעבודתי, אני משלבת ידע מקצועי נרחב עם שיטות טיפול חדשניות ומוכחות מחקרית, תוך התעדכנות מתמדת בהתפתחויות האחרונות בתחום. המטרה שלי היא לא רק לטפל בסימפטום, אלא להעניק לכם כלים מעשיים לשיפור איכות החיים, הביטחון העצמי והיכולת להביע את עצמכם באופן מלא.
            </p>
            <p className="about-text highlight" data-aos="zoom-in" data-aos-delay="1000">
              אני מזמינה אתכם, ילדים ומבוגרים כאחד, לצאת יחד למסע מרתק שבסופו תוכלו למצוא את הקול הייחודי שלכם ולהישמע.
            </p>
          </div>
          
          <div className="about-qualifications" data-aos="fade-up" data-aos-delay="400">
            <h2 data-aos="fade-left" data-aos-delay="600">הכשרה, ניסיון והתמחויות</h2>
            <ul className="qualifications-list" data-aos="fade-up" data-aos-delay="800">
              <li>בוגרת תואר ראשון (B.A) ותואר שני (M.A) בהפרעות בתקשורת מאוניברסיטת תל אביב.</li>
              <li>התמחות קלינית מקיפה במכון היוקרתי לשפה, דיבור ושמיעה ע"ש סקלאר, המרכז הרפואי שיבא, תל השומר.</li>
              <li>ניסיון מקצועי עשיר כקלינאית תקשורת בקופות החולים המובילות 'כללית' ו'מאוחדת', במגוון תפקידים קליניים וטיפוליים.</li>
              <li>מומחיות באבחון וטיפול בהפרעות קול וצרידות (Voice Disorders) במבוגרים וילדים.</li>
              <li>טיפול בהפרעות שפה, דיבור והיגוי (Articulation) בילדים ונוער.</li>
              <li>ליווי התפתחותי שפתי לגיל הרך.</li>
              <li>התמחות בטיפול בגמגום (Stuttering) ובהפרעות שטף דיבור.</li>
              <li>הכשרות מתקדמות ועדכניות בטיפול קולי (Vocal Therapy), שיקום קול וטכניקות טיפול חדשניות.</li>
            </ul>
          </div>
        </div>
      </section>
      
      <section className="about-quote">
        <div className="container">
          <div className="quote">
            "הקול שלנו הוא הגשר בין עולמנו הפנימי לעולם החיצון. אני כאן כדי לעזור לכם לבנות גשר חזק, יציב וצלול."
            <div className="quote-author">- הדס תודה</div>
          </div>
        </div>
      </section>
    </div>
  );
}

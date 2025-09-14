import React from 'react';
import '../styles/ai-assessment.css';

export default function AIAssessmentPage() {
  return (
    <div className="ai-assessment-page">
      <div className="development-notice">
        <div className="notice-container">
          <div className="notice-icon">🚧</div>
          <h1>מערכת אבחון AI</h1>
          <h2>בפיתוח כרגע </h2>
          <p>
            המערכת נמצאת כרגע בפיתוח ושיפורים נוספים.
            <br />
            אנא חזרו בקרוב לחוויית אבחון משופרת.
          </p>
          <div className="contact-suggestion">
            <p>
              בינתיים, אתם מוזמנים ליצור קשר ישיר עם הדס תודה
              <br />
              לקביעת פגישת ייעוץ ראשונית.
            </p>
            <a href="/contact" className="btn contact-btn">
              יצירת קשר
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import { FaQuoteRight } from 'react-icons/fa';
import SEOHead from '../components/SEOHead';
import testimonials from '../data/testimonials';
import '../styles/testimonials.css';

export default function Testimonials() {
  useEffect(() => {
    // Refresh AOS when component mounts
    const timer = setTimeout(() => {
      AOS.refresh();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // SEO structured data for testimonials page
  // Note: Removed Review schema as testimonials are not verified reviews
  // Future: Can integrate Google Business reviews widget or link
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "המלצות - הדס תודה",
    "description": "המלצות ממטופלים על הטיפול בקלינאות התקשורת של הדס תודה - סיפורי הצלחה בטיפול בגמגום, צרידות ובעיות קול",
    "url": "https://hadas-toda.co.il/testimonials"
  };

  return (
    <div className="testimonials-page">
      <SEOHead
        title="המלצות"
        description="המלצות ממטופלים על הטיפול בקלינאות התקשורת של הדס תודה. סיפורי הצלחה בטיפול בגמגום, צרידות, בעיות קול ועיכוב שפתי."
        keywords="המלצות, ביקורות, סיפורי הצלחה, טיפול בגמגום, צרידות, הדס תודה, קלינאית תקשורת"
        canonicalUrl="/testimonials"
        structuredData={structuredData}
      />

      <div className="testimonials-hero">
        <div className="container">
          <h1 className="testimonials-title" data-aos="fade-down">הקול שלכם, הסיפור שלי</h1>
          <p className="section-subtitle" data-aos="fade-up" data-aos-delay="200">
            אין דבר מרגש יותר מלראות את השינוי בחיי המטופלים שלי. <br />
            כאן תוכלו לקרוא על החוויות האישיות וסיפורי ההצלחה מהקליניקה.
          </p>
        </div>
      </div>

      <div className="container">
        <section className="testimonials-section">

          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={testimonial.id} className="testimonial-card" data-aos="fade-up" data-aos-delay={100}>

                <div className="quote-icon-wrapper">
                  <FaQuoteRight className="quote-icon" />
                </div>

                <p className="testimonial-text">
                  {testimonial.text}
                </p>

                <div className="testimonial-footer">
                  <div className="author-info">
                    <h3 className="author-name">{testimonial.name}</h3>
                    <div className="author-details">
                      {testimonial.childName && testimonial.childGender ? `הורה של ${testimonial.childName}, ${testimonial.childGender} ${testimonial.childAge}` : (testimonial.childName ? `הורה של ${testimonial.childName}, גיל ${testimonial.childAge}` : '')}
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>

          <div className="share-testimonial" data-aos="zoom-in" data-aos-delay="200">
            <div className="share-content">
              <h2 className="share-title">הסיפור שלכם חשוב לנו</h2>
              <p className="share-description">
                עזרנו לכם? נשמח מאוד לשמוע מכם! <br />
                המילים שלכם עוזרות לאחרים להגיע לטיפול הנכון עבורם.
              </p>
              <Link to="/contact" className="btn btn-primary">
                רשמו לנו המלצה
              </Link>
            </div>
            <div className="share-decoration">
              <FaQuoteRight />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

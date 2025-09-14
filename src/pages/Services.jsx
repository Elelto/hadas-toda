import React, { useState, useEffect } from 'react';
import { loadYamlContent } from '../utils/yamlLoader';
import AOS from 'aos';
import SEOHead from '../components/SEOHead';
import StructuredData from '../components/StructuredData';
import '../styles/services.css';

// Default content fallback
const getDefaultServicesContent = () => ({
  hero: {
    title: "תחומי טיפול",
    subtitle: "מגוון שירותים מקצועיים בתחום קלינאות התקשורת"
  },
  services: [
    { title: 'טיפול בגמגום', desc: 'התמודדות עם גמגום בקרב ילדים ומבוגרים באמצעות שיטות מגוונות ומותאמות אישית.' },
    { title: 'שיפור שפה ודיבור', desc: 'עבודה על שפה, הגייה, שטף דיבור והבנת הנשמע.' },
    { title: 'טיפול בקול', desc: 'שיקום וטיפוח הקול, תרגילים לשיפור איכות הקול ומניעת מאמץ קולי.' },
    { title: 'הדרכת הורים', desc: 'הדרכה וליווי הורים לתמיכה בתהליך הטיפולי.' },
  ],
  process: {
    title: "איך מתנהל הטיפול?",
    steps: [
      { number: "1", title: "פגישת היכרות", description: "שיחה ראשונית להבנת הצרכים והציפיות" },
      { number: "2", title: "אבחון מקצועי", description: "הערכה מקיפה לאיתור הקשיים והחוזקות" },
      { number: "3", title: "בניית תוכנית טיפול", description: "תוכנית אישית ומותאמת לצרכים הייחודיים" },
      { number: "4", title: "מפגשי טיפול", description: "מפגשים קבועים בסביבה נעימה ותומכת" }
    ]
  }
});

export default function Services() {
  const [servicesContent, setServicesContent] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load YAML content
  useEffect(() => {
    const loadContent = async () => {
      const content = await loadYamlContent('/content/pages/services.yml');
      if (content) {
        const transformedContent = {
          hero: {
            title: content.title || "תחומי טיפול",
            subtitle: content.subtitle || "מגוון שירותים מקצועיים בתחום קלינאות התקשורת"
          },
          services: Array.isArray(content.services) ? content.services : Object.values(content.services || {}),
          process: {
            title: content.process_title || "איך מתנהל הטיפול?",
            steps: Array.isArray(content.process_steps)
              ? content.process_steps.map(step => ({
                  title: step.title || "",
                  description: step.description || ""
                }))
              : Object.values(content.process_steps || {}).map(step => ({
                  title: step.title || "",
                  description: step.description || ""
                }))
          }
        };
        setServicesContent(transformedContent);
      } else {
        console.log('Services - No content loaded, using fallback');
        setServicesContent(getDefaultServicesContent());
      }
      setLoading(false);
    };

    loadContent();
  }, []);

  useEffect(() => {
    // Refresh AOS when content loads
    if (servicesContent) {
      const timer = setTimeout(() => {
        AOS.refresh();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [servicesContent]);

  if (loading) {
    return <div className="loading">טוען...</div>;
  }

  if (!servicesContent) {
    return <div className="error">שגיאה בטעינת התוכן</div>;
  }

  // SEO structured data for services page
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "הדס תודה - שירותי קלינאות תקשורת",
    "description": "שירותי קלינאות תקשורת מקצועיים: טיפול בגמגום, צרידות, בעיות קול, עיכוב שפתי ושיבושי היגוי",
    "url": "https://www.hadas-toda.co.il/services",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "שירותי טיפול בתקשורת",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "MedicalTherapy",
            "name": "טיפול בגמגום",
            "description": "טיפול מקצועי בגמגום לילדים ומבוגרים"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "MedicalTherapy",
            "name": "טיפול בצרידות ובעיות קול",
            "description": "שיקום קולי וטיפול בצרידות כרונית"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "MedicalTherapy",
            "name": "טיפול בעיכוב שפתי",
            "description": "אבחון וטיפול בעיכוב שפתי אצל ילדים"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "MedicalTherapy",
            "name": "טיפול בשיבושי היגוי",
            "description": "שיפור הגייה נכונה וטיפול בשיבושי היגוי"
          }
        }
      ]
    }
  };

  return (
    <>
      <StructuredData type="services" />
      <div className="services-page">
        <SEOHead
          title="שירותים"
          description="שירותי קלינאות תקשורת מקצועיים של הדס תודה: טיפול בגמגום, צרידות, בעיות קול, עיכוב שפתי ושיבושי היגוי לילדים ומבוגרים."
          keywords="טיפול בגמגום, צרידות, בעיות קול, עיכוב שפתי, שיבושי היגוי, קלינאית תקשורת, שירותי טיפול"
          canonicalUrl="/services"
          structuredData={structuredData}
        />
        <div className="container">
          <section className="services-section">
            <div className="services-header">
              <h1 className="services-title" data-aos="fade-down">{servicesContent.hero?.title || "תחומי טיפול"}</h1>
              <p className="services-subtitle" data-aos="fade-up" data-aos-delay="200">{servicesContent.hero?.subtitle || "מגוון שירותים מקצועיים בתחום קלינאות התקשורת"}</p>
            </div>
            
            <div className="services-grid">
              {servicesContent.services?.map((service, index) => (
                <div key={index} className="service-card" data-aos="fade-up" data-aos-delay={400 + (index * 100)}>
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-description">{service.desc || service.description}</p>
                </div>
              ))}
            </div>
            
            <div className="services-info">
              <h2 className="info-title" data-aos="fade-up">{servicesContent.process?.title || "איך מתנהל הטיפול?"}</h2>
              <div className="info-steps">
                {servicesContent.process?.steps?.map((step, index) => (
                  <div key={index} className="info-step" data-aos={index % 2 === 0 ? "fade-right" : "fade-left"} data-aos-delay={200 + (index * 200)}>
                    <div className="step-number">{step.number}</div>
                    <div className="step-content">
                      <h3>{step.title}</h3>
                      <p>{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

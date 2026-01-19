import React, { useState, useEffect } from 'react';
import { loadYamlContent } from '../utils/yamlLoader';
import AOS from 'aos';
import SEOHead from '../components/SEOHead';
import StructuredData from '../components/StructuredData';
import '../styles/services.css';
import {
  FaMicrophoneAlt,
  FaCommentDots,
  FaStream,
  FaAppleAlt,
  FaAssistiveListeningSystems
} from 'react-icons/fa';

// Specialization Configuration (Icon + Color)
const specializationConfig = {
  'voice': {
    icon: <FaMicrophoneAlt />,
    color: '#FF6B6B',
    bg: '#FFE5E5'
  },
  'articulation': {
    icon: <FaCommentDots />,
    color: '#4ECDC4',
    bg: '#E0F7FA'
  },
  'stuttering': {
    icon: <FaStream />,
    color: '#A18CD1',
    bg: '#F3E5F5'
  },
  'oral': {
    icon: <FaAppleAlt />,
    color: '#FFB74D',
    bg: '#FFF3E0'
  },
  'intelligibility': {
    icon: <FaAssistiveListeningSystems />,
    color: '#4DB6AC',
    bg: '#E0F2F1'
  }
};

// Default content fallback
const getDefaultServicesContent = () => ({
  hero: {
    title: "תחומי טיפול",
    subtitle: "מגוון שירותים מקצועיים בתחום קלינאות התקשורת"
  },
  services: [
    { title: 'טיפולי קול', desc: 'אבחון וטיפול בהפרעות קול וצרידות. שיקום קולי מקצועי למורים, מרצים וכל מי שמשתמש בקול באופן מקצועי.' },
    { title: 'היגוי', desc: 'טיפול בשיבושי היגוי והגייה לילדים ומבוגרים. עבודה ממוקדת על צלילים ספציפיים ושיפור בהירות הדיבור.' },
    { title: 'גמגום', desc: 'התמודדות עם גמגום והפרעות שטף דיבור באמצעות שיטות טיפוליות מוכחות ומותאמות אישית.' },
    { title: 'תפקודי פה', desc: 'טיפול בתפקודי פה, דחיקת לשון, ושיפור תפקוד השרירים המעורבים בתהליך הדיבור והבליעה.' },
    { title: 'מובנות דיבור', desc: 'שיפור מובנות הדיבור והבהרת ההגייה לאנשים שדיבורם לא מובן מספיק. עבודה על בהירות ויעילות תקשורתית.' },
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
  const [expandedIndex, setExpandedIndex] = useState(null); // Accordion state

  // Toggle accordion
  const toggleAccordion = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

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

            {/* Services Journey (Zig-Zag Layout) */}
            <div className="services-journey">
              {servicesContent.services?.map((service, index) => {
                const config = specializationConfig[service.icon] || specializationConfig['voice'];
                const isEven = index % 2 === 0;

                return (
                  <div
                    key={index}
                    className={`journey-station ${isEven ? 'even' : 'odd'}`}
                    data-aos={isEven ? "fade-right" : "fade-left"}
                    data-aos-delay={100}
                  >
                    <div className="station-visual">
                      <div
                        className="visual-circle"
                        style={{
                          background: `linear-gradient(135deg, ${config.bg} 0%, white 100%)`,
                          boxShadow: `0 20px 40px ${config.color}20`
                        }}
                      >
                        <div className="visual-icon" style={{ color: config.color }}>
                          {config.icon}
                        </div>
                      </div>
                      <div className="visual-blob" style={{ background: config.color }}></div>
                    </div>

                    <div className="station-content">
                      <div className="station-number" style={{ color: config.color, opacity: 0.1 }}>0{index + 1}</div>
                      <h3 className="station-title">{service.title}</h3>
                      <p className="station-description">{service.desc || service.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Process Timeline Section */}
            <div className="process-section">
              <h2 className="process-title" data-aos="fade-up">{servicesContent.process?.title || "איך מתנהל הטיפול?"}</h2>
              <div className="timeline-container">
                {servicesContent.process?.steps?.map((step, index) => (
                  <div key={index} className="timeline-step" data-aos="fade-up" data-aos-delay={index * 150}>
                    <div className="timeline-marker">
                      <div className="timeline-dot"></div>
                      <div className="timeline-line"></div>
                    </div>
                    <div className="timeline-content">
                      <div className="step-number-badge">{step.number}</div>
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

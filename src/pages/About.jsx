import React, { useState, useEffect } from 'react';
import { loadYamlContent } from '../utils/yamlLoader';
import AOS from 'aos';
import SEOHead from '../components/SEOHead';
import '../styles/about.css';

// Default content fallback
const getDefaultAboutContent = () => ({
  hero: {
    title: "נעים להכיר, הדס תודה",
    subtitle: "קלינאית תקשורת (M.A), מתמחה בטיפולי קול, היגוי, גמגום, תפקודי פה ומובנות דיבור"
  },
  content: {
    title: "מסע אל הקול הפנימי והחיצוני",
    paragraphs: [
      "שמי הדס תודה, קלינאית תקשורת מוסמכת (M.A), ואני כאן כדי ללוות אתכם במסע לגילוי וחיזוק הקול שלכם – בין אם מדובר בקול הפיזי או ביכולת התקשורתית. אני מתמחה באבחון וטיפול במגוון רחב של אתגרים, החל מבעיות קול וצרידות, דרך טיפול בהפרעות שפה ודיבור, וכלה בליווי התפתחותי לילדים ומתן כלים לתקשורת מיטבית למבוגרים.",
      "אני מאמינה שמאחורי כל קול יש סיפור, ומאחורי כל אתגר תקשורתי יש פוטנציאל לצמיחה. הגישה הטיפולית שלי היא אישית, מכילה ומעצימה, ומבוססת על יצירת קשר של אמון וביטחון. יחד, נבנה תוכנית טיפול מותאמת אישית, באווירה נעימה ותומכת, תוך שיתוף פעולה מלא שלכם ושל משפחותיכם.",
      "בעבודתי, אני משלבת ידע מקצועי נרחב עם שיטות טיפול חדשניות ומוכחות מחקרית, תוך התעדכנות מתמדת בהתפתחויות האחרונות בתחום. המטרה שלי היא לא רק לטפל בסימפטום, אלא להעניק לכם כלים מעשיים לשיפור איכות החיים, הביטחון העצמי והיכולת להביע את עצמכם באופן מלא.",
      "אני מזמינה אתכם, ילדים ומבוגרים כאחד, לצאת יחד למסע מרתק שבסופו תוכלו למצוא את הקול הייחודי שלכם ולהישמע."
    ]
  },
  qualifications: {
    title: "הכשרה, ניסיון והתמחויות",
    items: [
      "בוגרת תואר ראשון (B.A) ותואר שני (M.A) בהפרעות בתקשורת מאוניברסיטת תל אביב.",
      "התמחות קלינית מקיפה במכון היוקרתי לשפה, דיבור ושמיעה ע\"ש סקלאר, המרכז הרפואי שיבא, תל השומר.",
      "ניסיון מקצועי עשיר כקלינאית תקשורת בקופות החולים המובילות 'כללית' ו'מאוחדת', במגוון תפקידים קליניים וטיפוליים.",
      "מומחיות באבחון וטיפול בהפרעות קול וצרידות (Voice Disorders) במבוגרים וילדים.",
      "טיפול בהפרעות שפה, דיבור והיגוי (Articulation) בילדים ונוער.",
      "ליווי התפתחותי שפתי לגיל הרך.",
      "התמחות בטיפול בגמגום (Stuttering) ובהפרעות שטף דיבור.",
      "הכשרות מתקדמות ועדכניות בטיפול קולי (Vocal Therapy), שיקום קול וטכניקות טיפול חדשניות."
    ]
  },
  courses: [
    {
      name: "קורס בטיפול בגמגום",
      instructor: "ד\"ר יוסי כהן"
    },
    {
      name: "קורס בטיפול בצרידות",
      instructor: "ד\"ר מיכל לוי"
    }
  ],
  quote: {
    text: "הקול שלנו הוא הגשר בין עולמנו הפנימי לעולם החיצון. אני כאן כדי לעזור לכם לבנות גשר חזק, יציב וצלול.",
    author: "הדס תודה"
  }
});

export default function About() {
  const [aboutContent, setAboutContent] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load YAML content
  useEffect(() => {
    const loadContent = async () => {
      try {
        const content = await loadYamlContent('/content/pages/about.yml');
        console.log('Loaded about content:', content); // Debug log
        if (content) {
          // Transform flat YAML structure to expected structure
          const transformedContent = {
            hero: {
              title: content.hero?.title || content.title || "נעים להכיר, הדס תודה",
              subtitle: content.hero?.subtitle || content.subtitle || "קלינאית תקשורת (M.A), מומחית בטיפול בקול, צרידות, שפה ודיבור לילדים ומבוגרים"
            },
            content: {
              title: "מסע אל הקול הפנימי והחיצוני",
              paragraphs: [
                content.paragraph1 || content.content?.paragraphs?.[0] || "",
                content.paragraph2 || content.content?.paragraphs?.[1] || "",
                content.paragraph3 || content.content?.paragraphs?.[2] || "",
                content.highlight || content.content?.paragraphs?.[3] || ""
              ].filter(p => p) // Remove empty paragraphs
            },
            qualifications: {
              title: content.qualifications_title || content.qualifications?.title || "הכשרה, ניסיון והתמחויות",
              items: (() => {
                if (Array.isArray(content.qualifications)) {
                  return content.qualifications.map(item => typeof item === 'string' ? item : item.item);
                } else if (content.qualifications && typeof content.qualifications === 'object') {
                  return Object.values(content.qualifications).map(item => typeof item === 'string' ? item : item.item);
                }
                return [];
              })()
            },
            courses: content.courses || [],
            quote: {
              text: content.quote?.text || content.quote || "הקול שלנו הוא הגשר בין עולמנו הפנימי לעולם החיצון. אני כאן כדי לעזור לכם לבנות גשר חזק, יציב וצלול.",
              author: content.quote?.author || "הדס תודה"
            }
          };
          setAboutContent(transformedContent);
        } else {
          setAboutContent(getDefaultAboutContent());
        }
      } catch (error) {
        console.error('Error loading about content:', error);
        setAboutContent(getDefaultAboutContent());
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, []);

  useEffect(() => {
    // Refresh AOS when content loads
    if (aboutContent) {
      const timer = setTimeout(() => {
        AOS.refresh();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [aboutContent]);

  if (loading) {
    return <div className="loading">טוען...</div>;
  }

  if (!aboutContent) {
    return <div className="error">שגיאה בטעינת התוכן</div>;
  }

  // SEO structured data for about page
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "הדס תודה",
    "jobTitle": "קלינאית תקשורת",
    "description": "קלינאית תקשורת מוסמכת (M.A) עם התמחות בטיפולי קול, היגוי, גמגום, תפקודי פה ומובנות דיבור לילדים ומבוגרים",
    "url": "https://hadas-toda.co.il/about",
    "worksFor": {
      "@type": "MedicalBusiness",
      "name": "הדס תודה - קלינאית תקשורת"
    },
    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "degree",
        "educationalLevel": "Master's Degree",
        "about": "קלינאות תקשורת"
      }
    ],
    "knowsAbout": [
      "טיפול בגמגום",
      "טיפול בצרידות",
      "בעיות קול",
      "עיכוב שפתי",
      "שיבושי היגוי",
      "קלינאות תקשורת"
    ]
  };

  return (
    <div className="about-page">
      <SEOHead
        title="אודות"
        description="הדס תודה - קלינאית תקשורת מוסמכת (M.A) עם התמחות בטיפולי קול, היגוי, גמגום, תפקודי פה ומובנות דיבור."
        keywords="הדס תודה, קלינאית תקשורת, M.A, ניסיון מקצועי, טיפול בקול, צרידות, אודות"
        canonicalUrl="/about"
        structuredData={structuredData}
      />
      <section className="about-hero">
        <div className="container">
          <h1 className="about-title" data-aos="fade-down">{aboutContent.hero?.title || "נעים להכיר, הדס תודה"}</h1>
          <div className="about-subtitle" data-aos="fade-up" data-aos-delay="300">{aboutContent.hero?.subtitle || "קלינאית תקשורת (M.A), מומחית בטיפול בקול, צרידות, שפה ודיבור לילדים ומבוגרים"}</div>
        </div>
      </section>

      {/* Bio Section - White Background */}
      <section className="section-bio">
        <div className="container">
          <h2 className="section-title" data-aos="fade-right">{aboutContent.content?.title || "מסע אל הקול הפנימי והחיצוני"}</h2>
          <div className="bio-content">
            {aboutContent.content?.paragraphs?.map((paragraph, index) => (
              <p key={index} className={`about-text ${index === aboutContent.content.paragraphs.length - 1 ? 'highlight' : ''}`} data-aos="fade-up" data-aos-delay={200 + (index * 100)}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Qualifications Section - Light Background */}
      <section className="section-qualifications">
        <div className="container">
          <h2 className="section-title" data-aos="fade-left">{aboutContent.qualifications?.title || "הכשרה, ניסיון והתמחויות"}</h2>
          <ul className="qualifications-list" data-aos="fade-up" data-aos-delay="400">
            {aboutContent.qualifications?.items?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Courses Section - White Background */}
      {aboutContent.courses && aboutContent.courses.length > 0 && (
        <section className="section-courses">
          <div className="container">
            <h2 className="section-title" data-aos="fade-right">{aboutContent.courses_title || "השתלמויות מקצועיות"}</h2>
            <ul className="courses-list" data-aos="fade-up" data-aos-delay="400">
              {aboutContent.courses.map((course, index) => (
                <li key={index} className="course-item">
                  <span className="course-name">{course.name}</span>
                  {course.instructor && (
                    <span className="course-instructor">{course.instructor}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="about-quote">
        <div className="container">
          <div className="quote">
            "{aboutContent.quote?.text || "הקול שלנו הוא הגשר בין עולמנו הפנימי לעולם החיצוני. אני כאן כדי לעזור לכם לבנות גשר חזק, יציב וצלול."}"
            <div className="quote-author">- {aboutContent.quote?.author || "הדס תודה"}</div>
          </div>
        </div>
      </section>
    </div>
  );
}

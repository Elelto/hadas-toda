import { useState, useEffect } from 'react';

export const useYamlContent = (filePath) => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadYamlContent = async () => {
      try {
        setLoading(true);
        // נסה לטעון את קובץ ה-YAML
        const response = await fetch(filePath);
        if (!response.ok) {
          throw new Error(`Failed to load ${filePath}`);
        }
        
        const yamlText = await response.text();
        
        // Parse YAML manually (simple parser for our structure)
        const parseSimpleYaml = (yamlText) => {
          const lines = yamlText.split('\n');
          const result = {};
          let currentSection = null;
          let currentObject = result;
          let indent = 0;
          
          for (let line of lines) {
            const trimmed = line.trim();
            if (!trimmed || trimmed.startsWith('#')) continue;
            
            const currentIndent = line.length - line.trimStart().length;
            
            if (trimmed.includes(':')) {
              const [key, ...valueParts] = trimmed.split(':');
              const value = valueParts.join(':').trim();
              
              if (currentIndent === 0) {
                // Top level section
                currentSection = key.trim();
                if (value) {
                  result[currentSection] = value;
                } else {
                  result[currentSection] = {};
                  currentObject = result[currentSection];
                }
              } else if (currentIndent === 2 && currentSection) {
                // Second level
                if (value) {
                  currentObject[key.trim()] = value;
                } else {
                  currentObject[key.trim()] = {};
                }
              }
            } else if (trimmed.startsWith('- ')) {
              // List item
              const item = trimmed.substring(2);
              if (item.includes(':')) {
                // Object in list
                const [itemKey, itemValue] = item.split(':');
                if (!Array.isArray(currentObject)) {
                  // Convert to array if needed
                  const keys = Object.keys(currentObject);
                  const lastKey = keys[keys.length - 1];
                  currentObject[lastKey] = [];
                }
              } else {
                // Simple list item
                const keys = Object.keys(currentObject);
                const lastKey = keys[keys.length - 1];
                if (!currentObject[lastKey]) {
                  currentObject[lastKey] = [];
                }
                currentObject[lastKey].push({ name: item });
              }
            }
          }
          
          return result;
        };
        
        const parsedContent = parseSimpleYaml(yamlText);
        setContent(parsedContent);
        setError(null);
      } catch (err) {
        console.error('Error loading YAML content:', err);
        setError(err.message);
        // Fallback to default content
        setContent(getDefaultContent(filePath));
      } finally {
        setLoading(false);
      }
    };

    loadYamlContent();
  }, [filePath]);

  return { content, loading, error };
};

// Fallback content if YAML fails to load
const getDefaultContent = (filePath) => {
  if (filePath.includes('home.yml')) {
    return {
      hero: {
        title: "הדס תודה",
        subtitle: "קלינאית תקשורת מומחית לשפה, דיבור וקול",
        description: "נעים להכיר, אני הדס. אני מלווה ילדים ומבוגרים במסעם לשיפור התקשורת והביטחון העצמי. בין אם מדובר באתגרי שפה והיגוי אצל ילדים, או בצרידות וקשיי קול אצל מבוגרים – אני כאן כדי להקשיב, לאבחן ולהתאים תוכנית טיפול אישית שתביא לתוצאות.",
        cta_text: "קביעת פגישת ייעוץ",
        services_text: "לגלות עוד על הטיפולים"
      },
      testimonials: {
        title: "קולות מהקליניקה",
        subtitle: "מה אומרים המטופלים שלי על הטיפול והתוצאות",
        items: [
          {
            quote: "אחרי שנים של צרידות כרונית, הגעתי להדס וסוף סוף מצאתי מענה. הטיפול המקצועי והיחס האישי החזירו לי את הקול ואת שמחת החיים.",
            author: "יעל, מורה"
          },
          {
            quote: "הבן שלי התקשה מאוד עם היגוי נכון של הרבה צלילים. אחרי מספר חודשים עם הדס, השיפור היה מדהים. היא ידעה בדיוק איך לגשת אליו ולגרום לו לשתף פעולה.",
            author: "רונית, אמא לילד בן 5"
          }
        ]
      },
      services: {
        title: "תחומי המומחיות שלי",
        subtitle: "מגוון השירותים המקצועיים שאני מציעה לילדים ומבוגרים",
        voice_services: [
          { name: "טיפול בצרידות ובעיות קול" },
          { name: "שיקום קולי מקצועי" },
          { name: "ליווי קולי (מורים, מרצים)" }
        ],
        speech_services: [
          { name: "אבחון וטיפול בעיכוב שפתי" },
          { name: "טיפול בשיבושי היגוי" },
          { name: "שיפור יכולות ארגון מסר ושליפה" },
          { name: "הכנה לכיתה א׳ – היבטים שפתיים ותקשורתיים" }
        ]
      },
      about: {
        title: "נעים להכיר, אני הדס",
        paragraph1: "שמי הדס תודה, קלינאית תקשורת (M.A) עם תשוקה אמיתית לעזור לאנשים למצוא את קולם – תרתי משמע. אני מאמינה שביכולתה של תקשורת טובה לפתוח דלתות, לבנות גשרים ולהעצים כל אדם.",
        paragraph2: "הניסיון שלי כולל עבודה עם מגוון רחב של גילאים ואתגרים: החל מליווי התפתחותי של ילדים בתחומי השפה והדיבור, דרך טיפול בקשיי היגוי ושטף, ועד להתמחות מעמיקה באבחון וטיפול בבעיות קול וצרידות אצל ילדים ומבוגרים.",
        paragraph3: "בקליניקה שלי, כל מטופל מקבל יחס אישי ותוכנית טיפול המותאמת בדיוק עבורו. אני משלבת ידע מקצועי עדכני עם גישה יצירתית ורגישה, כדי להפוך את התהליך הטיפולי לחוויה חיובית ומקדמת."
      },
      blog_section: {
        title: "הבלוג המקצועי",
        subtitle: "מאמרים, טיפים וחידושים בתחום קלינאות התקשורת"
      }
    };
  }
  return {};
};

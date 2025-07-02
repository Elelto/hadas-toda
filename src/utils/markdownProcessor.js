// מודול לעיבוד קבצי Markdown
import matter from 'gray-matter';

// פונקציה להמרת תאריך לפורמט עברי
export function formatDateToHebrew(dateString) {
  try {
    const date = new Date(dateString);
    const day = date.getDate();
    
    // המרת החודש למספר בין 1-12
    const month = date.getMonth() + 1;
    let hebrewMonth;
    
    switch(month) {
      case 1: hebrewMonth = 'בינואר'; break;
      case 2: hebrewMonth = 'בפברואר'; break;
      case 3: hebrewMonth = 'במרץ'; break;
      case 4: hebrewMonth = 'באפריל'; break;
      case 5: hebrewMonth = 'במאי'; break;
      case 6: hebrewMonth = 'ביוני'; break;
      case 7: hebrewMonth = 'ביולי'; break;
      case 8: hebrewMonth = 'באוגוסט'; break;
      case 9: hebrewMonth = 'בספטמבר'; break;
      case 10: hebrewMonth = 'באוקטובר'; break;
      case 11: hebrewMonth = 'בנובמבר'; break;
      case 12: hebrewMonth = 'בדצמבר'; break;
      default: hebrewMonth = '';
    }
    
    const year = date.getFullYear();
    return `${day} ${hebrewMonth}, ${year}`;
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString; // החזרת התאריך המקורי במקרה של שגיאה
  }
}

// פונקציה לחילוץ ה-slug מתוך שם הקובץ
export function extractSlugFromFilename(fileName) {
  // הדפוס של שם הקובץ הוא: YYYY-MM-DD-slug.md
  const match = fileName.match(/^\d{4}-\d{2}-\d{2}-(.+)\.md$/);
  if (match && match[1]) {
    return match[1];
  }
  // אם אין התאמה, מחזירים את שם הקובץ ללא סיומת
  return fileName.replace(/\.md$/, '');
}

// פונקציה פשוטה להמרת Markdown ל-HTML
export function simpleMarkdownToHtml(markdown) {
  // זוהי המרה בסיסית מאוד - בפרויקט אמיתי כדאי להשתמש בפתרון מקיף יותר
  let html = markdown
    // קישורים
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    // כותרות
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    // פסקאות
    .replace(/^(?!<[a-z][a-z0-9]*>)(.+)$/gm, '<p>$1</p>')
    // הדגשה
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    // רשימות
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    // ניקוי כפילויות
    .replace(/<\/p><p>/g, '</p>\n<p>');
  
  // עטיפת רשימות
  if (html.includes('<li>')) {
    html = html.replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>');
  }
  
  return html;
}

// פונקציה לעיבוד קובץ Markdown
export function processMarkdown(fileContent, fileName) {
  // פירוס ה-frontmatter והתוכן
  const { data: frontmatter, content } = matter(fileContent);
  
  // חילוץ ה-slug מתוך שם הקובץ
  const slug = extractSlugFromFilename(fileName);
  
  // המרת תוכן ה-Markdown ל-HTML
  const htmlContent = simpleMarkdownToHtml(content);
  
  // המרת התאריך לפורמט עברי
  const formattedDate = formatDateToHebrew(frontmatter.date);
  
  return {
    title: frontmatter.title || 'ללא כותרת',
    slug,
    date: formattedDate,
    excerpt: frontmatter.excerpt || '',
    image: frontmatter.image || '',
    categories: frontmatter.categories || [],
    content: htmlContent
  };
}

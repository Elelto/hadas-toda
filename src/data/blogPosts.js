// ייבוא קבצי הבלוג הקבועים לשימוש בפיתוח
import blogPostsData from './blogPostsData';

// ייבוא המודול לעיבוד קבצי Markdown
import { processMarkdown } from '../utils/markdownProcessor';

// ייבוא של כל קבצי הבלוג בתיקיית content/blog
// השימוש ב-import.meta.glob מאפשר לייבא את כל הקבצים בזמן הבנייה
// הפרמטר { as: 'raw' } מורה ל-Vite לייבא את הקבצים כמחרוזות טקסט גולמיות
const mdFiles = import.meta.glob('../content/blog/*.md', { eager: true, as: 'raw' });

// עיבוד קבצי ה-Markdown לפוסטים
function processMdFiles() {
  try {
    // בסביבת פיתוח, נשתמש בנתונים הקבועים
    if (import.meta.env.DEV) {
      console.log('משתמש בנתוני בלוג סטטיים בסביבת פיתוח');
      return blogPostsData;
    }
    
    // בסביבת ייצור, נעבד את קבצי ה-Markdown
    console.log('מעבד קבצי Markdown לפוסטים');
    let id = 1;
    const posts = Object.entries(mdFiles).map(([filePath, content]) => {
      // חילוץ שם הקובץ מהנתיב
      const fileName = filePath.split('/').pop();
      
      // עיבוד הקובץ באמצעות המודול שיצרנו
      const postData = processMarkdown(content, fileName);
      
      // הוספת מזהה ייחודי
      return {
        id: id++,
        ...postData
      };
    });
    
    // מיון הפוסטים לפי תאריך, מהחדש לישן
    return posts.sort((a, b) => {
      const dateA = new Date(a.date.split(', ')[1]);
      const dateB = new Date(b.date.split(', ')[1]);
      return dateB - dateA;
    });
  } catch (error) {
    console.error('שגיאה בעיבוד קבצי Markdown:', error);
    // במקרה של שגיאה, נחזיר את הנתונים הקבועים
    return blogPostsData;
  }
}

// יצירת מערך הפוסטים באמצעות הפונקציה שיצרנו
const blogPosts = processMdFiles();

// ייצוא מערך הפוסטים
export default blogPosts;

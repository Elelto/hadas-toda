import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

// פונקציה להמרת תאריך מפורמט ISO לפורמט עברי
function formatDateToHebrew(dateString) {
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
function extractSlugFromFilename(fileName) {
  // הדפוס של שם הקובץ הוא: YYYY-MM-DD-slug.md
  const match = fileName.match(/^\d{4}-\d{2}-\d{2}-(.+)\.md$/);
  if (match && match[1]) {
    return match[1];
  }
  // אם אין התאמה, מחזירים את שם הקובץ ללא סיומת
  return fileName.replace(/\.md$/, '');
}

// פונקציה לקריאת כל קבצי ה-Markdown בתיקיית הבלוג
export function getAllBlogPosts() {
  const blogDir = path.join(process.cwd(), 'src/content/blog');
  const fileNames = fs.readdirSync(blogDir);
  
  let id = 1; // מזהה ייחודי לכל פוסט
  
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      // חילוץ ה-slug מתוך שם הקובץ
      const slug = extractSlugFromFilename(fileName);
      
      // קריאת תוכן הקובץ כטקסט
      const fullPath = path.join(blogDir, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      
      // שימוש ב-gray-matter לפירוס ה-frontmatter
      const matterResult = matter(fileContents);
      
      // המרת תוכן ה-Markdown ל-HTML
      const content = marked(matterResult.content);
      
      // המרת התאריך לפורמט עברי
      const formattedDate = formatDateToHebrew(matterResult.data.date);
      
      // שילוב המידע מה-frontmatter עם התוכן המעובד
      return {
        id: id++,
        title: matterResult.data.title,
        slug,
        date: formattedDate,
        excerpt: matterResult.data.excerpt,
        image: matterResult.data.image,
        categories: matterResult.data.categories || [],
        content
      };
    });
  
  // מיון הפוסטים לפי תאריך, מהחדש לישן
  return allPostsData.sort((a, b) => {
    if (new Date(a.date) < new Date(b.date)) {
      return 1;
    } else {
      return -1;
    }
  });
}

// פונקציה לקבלת פוסט בודד לפי ה-slug
export function getBlogPostBySlug(slug) {
  const blogDir = path.join(process.cwd(), 'src/content/blog');
  
  // חיפוש הקובץ המתאים לפי ה-slug
  const fileNames = fs.readdirSync(blogDir);
  const fileName = fileNames.find(file => {
    const fileSlug = extractSlugFromFilename(file);
    return fileSlug === slug;
  });
  
  // אם הקובץ לא נמצא, מחזירים null
  if (!fileName) {
    return null;
  }
  
  const fullPath = path.join(blogDir, fileName);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);
  const content = marked(matterResult.content);
  
  // המרת התאריך לפורמט עברי
  const formattedDate = formatDateToHebrew(matterResult.data.date);
  
  return {
    id: 0, // יש להחליף במזהה אמיתי אם נדרש
    title: matterResult.data.title,
    slug,
    date: formattedDate,
    excerpt: matterResult.data.excerpt,
    image: matterResult.data.image,
    categories: matterResult.data.categories || [],
    content
  };
}

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// נשתמש בפונקציות פשוטות במקום בחבילה marked שעלולה לגרום לבעיות
function simpleMarkdownToHtml(markdown) {
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

// פונקציה להמרת תאריך לפורמט עברי
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

// קריאת כל קבצי ה-Markdown בתיקיית הבלוג
function getAllBlogPosts() {
  const blogDir = path.join(__dirname, '..', 'src', 'content', 'blog');
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
      const content = simpleMarkdownToHtml(matterResult.content);
      
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

// עדכון קבצי ה-JavaScript הסטטיים
function updateBlogPostsData() {
  const posts = getAllBlogPosts();
  
  // יצירת קובץ index.js חדש
  const indexContent = `// קובץ זה נוצר אוטומטית על ידי סקריפט update-blog-data.js
// אין לערוך אותו ידנית כי השינויים יימחקו בפעם הבאה שהסקריפט ירוץ

${posts.map((post, index) => `import post${post.id} from './post${post.id}';`).join('\n')}

const blogPosts = [
  ${posts.map(post => `post${post.id}`).join(',\n  ')}
];

export default blogPosts;`;

  const indexPath = path.join(__dirname, '..', 'src', 'data', 'blogPostsData', 'index.js');
  fs.writeFileSync(indexPath, indexContent);
  
  // יצירת קובץ נפרד לכל פוסט
  posts.forEach(post => {
    const postContent = `// קובץ זה נוצר אוטומטית על ידי סקריפט update-blog-data.js
// אין לערוך אותו ידנית כי השינויים יימחקו בפעם הבאה שהסקריפט ירוץ

const post${post.id} = {
  id: ${post.id},
  title: "${post.title.replace(/"/g, '\\"')}",
  slug: "${post.slug}",
  date: "${post.date}",
  excerpt: "${post.excerpt.replace(/"/g, '\\"')}",
  image: "${post.image}",
  categories: [${post.categories.map(cat => `"${cat}"`).join(', ')}],
  content: \`${post.content.replace(/`/g, '\\`')}\`
};

export default post${post.id};`;

    const postPath = path.join(__dirname, '..', 'src', 'data', 'blogPostsData', `post${post.id}.js`);
    fs.writeFileSync(postPath, postContent);
  });
  
  console.log(`עודכנו ${posts.length} פוסטים בהצלחה!`);
}

// הרצת הסקריפט
updateBlogPostsData();

import { db } from '../services/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { loadYamlContent } from './yamlLoader';
import blogPosts from '../data/blogPosts';

const parseHebrewDate = (hebrewDateStr) => {
  const months = {
    'ינואר': 0, 'פברואר': 1, 'מרץ': 2, 'אפריל': 3, 'מאי': 4, 'יוני': 5,
    'יולי': 6, 'אוגוסט': 7, 'ספטמבר': 8, 'אוקטובר': 9, 'נובמבר': 10, 'דצמבר': 11
  };
  
  try {
    const parts = hebrewDateStr.split(' '); // ["20", "במרץ", "2025"]
    if (parts.length === 3) {
      const day = parseInt(parts[0], 10);
      const monthName = parts[1].replace(/^ב/, ''); // "במרץ" -> "מרץ"
      const month = months[monthName] !== undefined ? months[monthName] : 0;
      const year = parseInt(parts[2], 10);
      
      const date = new Date(year, month, day);
      // Ensure we format as local YYYY-MM-DD
      const offset = date.getTimezoneOffset();
      const localDate = new Date(date.getTime() - (offset * 60 * 1000));
      return localDate.toISOString().split('T')[0];
    }
  } catch (error) {
    console.error('Error parsing Hebrew date:', hebrewDateStr, error);
  }
  return new Date().toISOString().split('T')[0];
};

export const migrateDataToFirebase = async (onProgress) => {
  const logs = [];
  const log = (msg) => {
    console.log(msg);
    logs.push(msg);
    if (onProgress) onProgress([...logs]);
  };

  log('🚀 מתחיל מיגרציה של נתוני האתר ל-Firebase...');

  // 1. מיגרציה של דפי האתר
  const pages = ['home', 'about', 'services', 'contact', 'testimonials'];
  for (const page of pages) {
    try {
      log(`🔄 טוען נתונים עבור דף: ${page}...`);
      const data = await loadYamlContent(`/content/pages/${page}.yml`);
      if (data) {
        await setDoc(doc(db, 'pages', page), data);
        log(`✅ דף ${page} הועבר בהצלחה ל-Firebase!`);
      } else {
        log(`⚠️ לא נמצאו נתונים עבור דף: ${page}`);
      }
    } catch (error) {
      log(`❌ שגיאה בהעברת דף ${page}: ${error.message}`);
    }
  }

  // 2. מיגרציה של רכיבי ממשק (Header & Footer)
  const components = ['header', 'footer'];
  for (const comp of components) {
    try {
      log(`🔄 טוען נתונים עבור רכיב: ${comp}...`);
      const data = await loadYamlContent(`/content/components/${comp}.yml`);
      if (data) {
        await setDoc(doc(db, 'components', comp), data);
        log(`✅ רכיב ${comp} הועבר בהצלחה ל-Firebase!`);
      } else {
        log(`⚠️ לא נמצאו נתונים עבור רכיב: ${comp}`);
      }
    } catch (error) {
      log(`❌ שגיאה בהעברת רכיב ${comp}: ${error.message}`);
    }
  }

  // 3. מיגרציה של פוסטים בבלוג
  log('🔄 מעביר פוסטים בבלוג...');
  let blogSuccessCount = 0;
  for (const post of blogPosts) {
    try {
      const isoDate = parseHebrewDate(post.date);
      await setDoc(doc(db, 'blog', post.slug), {
        title: post.title,
        slug: post.slug,
        date: isoDate, // YYYY-MM-DD
        formattedDate: post.date, // "20 במרץ 2025"
        excerpt: post.excerpt,
        image: post.image,
        categories: post.categories,
        content: post.content, // HTML content
        createdAt: new Date().toISOString()
      });
      blogSuccessCount++;
      log(`✅ פוסט "${post.title}" הועבר בהצלחה!`);
    } catch (error) {
      log(`❌ שגיאה בהעברת פוסט "${post.title}": ${error.message}`);
    }
  }
  log(`📊 סה"כ הועברו ${blogSuccessCount} פוסטים בבלוג.`);
  log('🎉 תהליך המיגרציה הסתיים בהצלחה!');
};

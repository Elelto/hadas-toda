/**
 * inject-seo-meta.js
 * 
 * מריץ לאחר vite build ו-prerender.
 * מחליף את meta tags הגנריים בכל HTML סטטי ב-dist
 * עם meta tags ייעודיים לכל דף — כך גוגלבוט רואה תוכן מדויק.
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const DIST = path.join(__dirname, '../dist');
const BASE_URL = 'https://hadas-toda.co.il';

// הגדרת meta tags לכל דף
const PAGE_META = {
  '/': {
    title: 'קלינאית תקשורת בני ברק | הדס תודה M.A - טיפולי קול, גמגום, היגוי',
    description: 'הדס תודה - קלינאית תקשורת מוסמכת (M.A) בבני ברק. טיפול מקצועי בגמגום, צרידות, בעיות קול, היגוי ועיכוב שפתי לילדים ומבוגרים. התקשרו: 050-679-6209',
    keywords: 'קלינאית תקשורת, הדס תודה, בני ברק, גמגום, צרידות, היגוי, עיכוב שפתי, בעיות קול',
    canonical: BASE_URL + '/',
    ogTitle: 'קלינאית תקשורת בני ברק | הדס תודה',
    ogDescription: 'קלינאית תקשורת מוסמכת (M.A) בבני ברק - טיפול בגמגום, צרידות, היגוי ועיכוב שפתי לילדים ומבוגרים',
  },
  '/online-therapy': {
    title: 'קלינאית תקשורת אונליין | הדס תודה M.A - טיפול מרחוק בגמגום, קול והיגוי',
    description: 'הדס תודה - קלינאית תקשורת אונליין M.A. טיפול מקצועי בגמגום, צרידות, בעיות קול והיגוי דרך זום - מהנוחות של הבית שלך. קלינאית תקשורת אונליין לילדים ומבוגרים בכל רחבי ישראל. התקשרו: 050-679-6209',
    keywords: 'קלינאית תקשורת אונליין, הדס תודה אונליין, טיפול גמגום אונליין, קלינאית תקשורת זום, טיפול קול מרחוק, טיפול בצרידות אונליין, טיפול שפה מרחוק, קלינאית תקשורת ישראל, קלינאית תקשורת מרחוק',
    canonical: BASE_URL + '/online-therapy',
    ogTitle: 'קלינאית תקשורת אונליין | הדס תודה M.A',
    ogDescription: 'הדס תודה - קלינאית תקשורת אונליין M.A. טיפול בגמגום, צרידות וקול דרך זום - מהבית שלך, בכל רחבי ישראל',
    schema: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "MedicalBusiness",
      "@id": BASE_URL + "/online-therapy#online-service",
      "name": "הדס תודה - קלינאית תקשורת אונליין",
      "description": "טיפולי קלינאות תקשורת אונליין עם הדס תודה M.A. טיפול בגמגום, צרידות, קול והיגוי דרך זום",
      "url": BASE_URL + "/online-therapy",
      "telephone": "+972-50-679-6209",
      "availableChannel": {
        "@type": "ServiceChannel",
        "serviceType": "Online",
        "availableLanguage": "he",
        "serviceUrl": BASE_URL + "/online-therapy"
      },
      "areaServed": { "@type": "Country", "name": "ישראל" },
      "medicalSpecialty": "Speech-Language Pathology"
    }),
    faqSchema: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "האם טיפול אונליין יעיל כמו טיפול פרונטלי?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "כן! מחקרים רבים מראים שטיפולי קלינאות תקשורת אונליין יעילים באותה מידה כמו טיפולים פרונטליים. היתרון הוא שניתן לתרגל בסביבה הטבעית של המטופל."
          }
        },
        {
          "@type": "Question",
          "name": "מה צריך כדי להתחיל טיפול אונליין?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "כל מה שצריך זה מחשב או טאבלט עם מצלמה ומיקרופון, חיבור אינטרנט יציב, ומקום שקט בבית. אני אדריך אתכם בכל השלבים הטכניים."
          }
        },
        {
          "@type": "Question",
          "name": "לאילו גילאים מתאים טיפול קלינאות תקשורת אונליין?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "טיפול אונליין מתאים לילדים מגיל 4-5 ומעלה (בליווי הורה), לנוער ולמבוגרים. לילדים צעירים יותר אני מציעה הדרכת הורים אונליין."
          }
        },
        {
          "@type": "Question",
          "name": "כמה זמן נמשך כל מפגש קלינאות תקשורת אונליין?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "מפגש טיפולי נמשך כ-45 דקות, בדומה למפגש בקליניקה. המפגש כולל עבודה ישירה ולעיתים גם הדרכת הורים."
          }
        },
        {
          "@type": "Question",
          "name": "האם יש החזרים מקופות החולים לטיפול אונליין?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "אני עובדת כקלינאית תקשורת פרטית. מומלץ לבדוק מול הביטוח המשלים שלכם לגבי זכאות להחזרים עבור טיפולים פרטיים."
          }
        }
      ]
    })
  },
  '/bnei-brak': {
    title: 'קלינאית תקשורת בני ברק | הדס תודה M.A - מומחית לקול, גמגום והיגוי',
    description: 'הדס תודה - קלינאית תקשורת מוסמכת (M.A) בבני ברק. מומחית לטיפול בגמגום, צרידות, בעיות קול, היגוי ועיכוב שפתי. קליניקה בשיכון ג\' בני ברק. 050-679-6209',
    keywords: 'קלינאית תקשורת בני ברק, הדס תודה בני ברק, גמגום בני ברק, צרידות בני ברק, היגוי בני ברק, קלינאית תקשורת שיכון ג',
    canonical: BASE_URL + '/bnei-brak',
    ogTitle: 'קלינאית תקשורת בני ברק | הדס תודה M.A',
    ogDescription: 'קלינאית תקשורת מוסמכת בבני ברק - הדס תודה M.A. טיפול בגמגום, צרידות, היגוי ועיכוב שפתי בשיכון ג\'',
  },
  '/services': {
    title: 'שירותי קלינאות תקשורת | הדס תודה M.A - גמגום, קול, היגוי, תפקודי פה',
    description: 'שירותי קלינאות תקשורת מקצועיים עם הדס תודה M.A: טיפול בגמגום, צרידות וקול, שיבושי היגוי, תפקודי פה, עיכוב שפתי ומובנות דיבור. בני ברק ואונליין.',
    keywords: 'קלינאות תקשורת, טיפול גמגום, שיקום קולי, צרידות, היגוי, עיכוב שפתי, תפקודי פה, מובנות דיבור',
    canonical: BASE_URL + '/services',
    ogTitle: 'שירותי קלינאות תקשורת | הדס תודה M.A',
    ogDescription: 'טיפול מקצועי בגמגום, צרידות, היגוי, עיכוב שפתי ותפקודי פה - קלינאות תקשורת בבני ברק ואונליין',
  },
  '/about': {
    title: 'אודות הדס תודה | קלינאית תקשורת מוסמכת M.A - בני ברק',
    description: 'הדס תודה - קלינאית תקשורת מוסמכת (M.A) עם ניסיון עשיר בטיפול בגמגום, צרידות, היגוי ועיכוב שפתי. מחויבת לטיפול אישי, מקצועי וחם לכל מטופל.',
    keywords: 'הדס תודה, קלינאית תקשורת, M.A, בני ברק, אודות, ניסיון מקצועי',
    canonical: BASE_URL + '/about',
    ogTitle: 'אודות הדס תודה | קלינאית תקשורת M.A',
    ogDescription: 'קלינאית תקשורת מוסמכת (M.A) עם ניסיון עשיר בטיפול בגמגום, צרידות, היגוי ועיכוב שפתי בבני ברק',
  },
  '/contact': {
    title: 'צרו קשר | הדס תודה - קלינאית תקשורת בני ברק | 050-679-6209',
    description: 'צרו קשר עם הדס תודה, קלינאית תקשורת מוסמכת בבני ברק. טלפון: 050-679-6209 | ווטסאפ | אימייל. קליניקה בשיכון ג\', בני ברק.',
    keywords: 'קשר הדס תודה, קלינאית תקשורת בני ברק טלפון, 050-679-6209',
    canonical: BASE_URL + '/contact',
    ogTitle: 'צרו קשר | הדס תודה - קלינאית תקשורת',
    ogDescription: 'צרו קשר עם הדס תודה - קלינאית תקשורת בבני ברק. טל: 050-679-6209',
  },
  '/blog': {
    title: 'בלוג קלינאות תקשורת | הדס תודה - מאמרים וטיפים מקצועיים',
    description: 'מאמרים וטיפים מקצועיים בתחום קלינאות התקשורת: גמגום, צרידות, עיכוב שפתי, היגוי ובעיות קול - מאת הדס תודה, קלינאית תקשורת מוסמכת M.A.',
    keywords: 'בלוג קלינאות תקשורת, מאמרים גמגום, טיפים צרידות, עיכוב שפתי ילדים, הדס תודה',
    canonical: BASE_URL + '/blog',
    ogTitle: 'בלוג קלינאות תקשורת | הדס תודה M.A',
    ogDescription: 'מאמרים מקצועיים בקלינאות תקשורת: גמגום, צרידות, עיכוב שפתי והיגוי',
  },
  '/testimonials': {
    title: 'המלצות מטופלים | הדס תודה - קלינאית תקשורת בני ברק',
    description: 'המלצות אמיתיות מהמטופלים של הדס תודה, קלינאית תקשורת מוסמכת בבני ברק. קראו על חוויות הטיפול בגמגום, צרידות, היגוי ועוד.',
    keywords: 'המלצות קלינאית תקשורת, ביקורות הדס תודה, חוויות מטופלים, קלינאות תקשורת בני ברק',
    canonical: BASE_URL + '/testimonials',
    ogTitle: 'המלצות מטופלים | הדס תודה קלינאית תקשורת',
    ogDescription: 'המלצות אמיתיות מהמטופלים של הדס תודה - קלינאית תקשורת מוסמכת בבני ברק',
  },
};

// טעינת בלוגים דינמית
function loadBlogMeta() {
  const blogDir = path.join(__dirname, '../src/content/blog');
  if (!fs.existsSync(blogDir)) return;
  
  const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));
  files.forEach(file => {
    const filePath = path.join(blogDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(content);

    const slugMatch = file.match(/^\d{4}-\d{2}-\d{2}-(.+)\.md$/);
    const slug = slugMatch ? slugMatch[1] : file.replace('.md', '');
    const route = `/blog/${slug}`;

    const title = data.title ? `${data.title} | הדס תודה` : 'בלוג קלינאות תקשורת | הדס תודה';
    const description = data.excerpt || data.description || 'מאמר בבלוג קלינאות תקשורת של הדס תודה.';
    const keywords = data.categories ? data.categories.join(', ') : 'קלינאות תקשורת, הדס תודה';
    const ogImage = data.image ? `${BASE_URL}${data.image}` : `${BASE_URL}/images/logo.png`;

    PAGE_META[route] = {
      title,
      description,
      keywords,
      canonical: `${BASE_URL}${route}`,
      ogTitle: title,
      ogDescription: description,
      ogImage: ogImage
    };
  });
}
loadBlogMeta();

function injectMetaToFile(filePath, meta) {
  let html = fs.readFileSync(filePath, 'utf8');

  // החלפת title
  html = html.replace(
    /<title>[^<]*<\/title>/,
    `<title>${meta.title}</title>`
  );

  // החלפת description
  html = html.replace(
    /<meta name="description" content="[^"]*">/,
    `<meta name="description" content="${meta.description}">`
  );

  // החלפת keywords
  if (meta.keywords) {
    html = html.replace(
      /<meta name="keywords" content="[^"]*">/,
      `<meta name="keywords" content="${meta.keywords}">`
    );
  }

  // החלפת canonical
  html = html.replace(
    /<link rel="canonical" href="[^"]*">/,
    `<link rel="canonical" href="${meta.canonical}">`
  );

  // החלפת OG title
  html = html.replace(
    /<meta property="og:title" content="[^"]*">/,
    `<meta property="og:title" content="${meta.ogTitle}">`
  );

  // החלפת OG description
  html = html.replace(
    /<meta property="og:description" content="[^"]*">/,
    `<meta property="og:description" content="${meta.ogDescription}">`
  );

  // החלפת OG URL
  html = html.replace(
    /<meta property="og:url" content="[^"]*">/,
    `<meta property="og:url" content="${meta.canonical}">`
  );

  // החלפת Twitter title
  html = html.replace(
    /<meta name="twitter:title" content="[^"]*">/,
    `<meta name="twitter:title" content="${meta.ogTitle}">`
  );

  // החלפת Twitter description
  html = html.replace(
    /<meta name="twitter:description" content="[^"]*">/,
    `<meta name="twitter:description" content="${meta.ogDescription}">`
  );

  // החלפת תמונות (אם הוגדר)
  if (meta.ogImage) {
    html = html.replace(
      /<meta property="og:image" content="[^"]*">/,
      `<meta property="og:image" content="${meta.ogImage}">`
    );
    html = html.replace(
      /<meta name="twitter:image" content="[^"]*">/,
      `<meta name="twitter:image" content="${meta.ogImage}">`
    );
  }

  // הוספת schema ייעודי (אם קיים)
  if (meta.schema) {
    // מחיקת ה-MedicalBusiness הקיים והחלפתו בחדש
    const schemaRegex = /<script type="application\/ld\+json">\s*\{\s*"@context":\s*"https:\/\/schema\.org",\s*"@type":\s*"MedicalBusiness"[\s\S]*?<\/script>/;
    if (schemaRegex.test(html)) {
      html = html.replace(schemaRegex, `<script type="application/ld+json">\n${meta.schema}\n  </script>`);
    } else {
      html = html.replace('</head>', `\n  <script type="application/ld+json">\n${meta.schema}\n  </script>\n</head>`);
    }
  }

  if (meta.faqSchema) {
    html = html.replace('</head>', `\n  <script type="application/ld+json">\n${meta.faqSchema}\n  </script>\n</head>`);
  }

  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`✅ Injected SEO meta: ${filePath}`);
}

// עבור כל דף ב-PAGE_META
Object.entries(PAGE_META).forEach(([route, meta]) => {
  const dirName = route === '/' ? '' : route.slice(1);
  const filePath = path.join(DIST, dirName, 'index.html');

  if (fs.existsSync(filePath)) {
    injectMetaToFile(filePath, meta);
  } else {
    console.warn(`⚠️  File not found: ${filePath}`);
  }
});

console.log('\n🎉 SEO meta injection complete!');

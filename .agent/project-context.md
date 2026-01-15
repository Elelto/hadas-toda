# פרויקט hadas-toda - אתר קלינאית תקשורת

## 📋 סקירה כללית
אתר React מקצועי של הדס טודה - קלינאית תקשורת, המתמחה בטיפול בדיבור ושפה.

## 🛠️ סטק טכנולוגי

### Frontend
- **Framework**: React 18.2 + Vite 5.0
- **Routing**: React Router DOM v7.6
- **עיצוב**: CSS מותאם אישית (לא Tailwind)
- **אנימציות**: AOS (Animate On Scroll), Swiper
- **טפסים**: EmailJS
- **SEO**: React Helmet Async

### Backend & CMS
- **Hosting**: Netlify + GitHub Pages
- **CMS**: Netlify CMS
- **Content**: YAML + Markdown files
- **תמונות**: Image optimization עם Vite plugins

### Build Tools
- Vite bundler
- Sharp לעיבוד תמונות
- סקריפטים מותאמים אישית (`scripts/`)

## 📁 מבנה פרויקט חשוב

```
hadas-toda/
├── src/
│   ├── components/       # קומפוננטות React
│   ├── styles/          # קבצי CSS (glass.css, home.css, וכו')
│   ├── pages/           # עמודי האתר
│   └── App.jsx          # ניתוב ראשי
├── public/
│   └── content/         # תוכן YAML/MD
│       ├── blog/        # כתבות בלוג
│       └── pages/       # תוכן עמודים
├── scripts/             # סקריפטים של build
│   ├── sync-content.js
│   ├── update-blog-data.js
│   └── generate-sitemap.js
└── dist/                # Build output
```

## 🎨 עקרונות עיצוב

### Glass-Morphism Design System
- שקיפות וטשטוש (`backdrop-filter`)
- גרדיאנטים עדינים
- צללים רכים
- אנימציות מיקרו

### RTL Support
- **חובה**: תמיכה מלאה בעברית RTL
- כל CSS חייב לתמוך בכיווניות
- שימוש ב-`text-align: right` כברירת מחדל

### נגישות
- קובץ מיוחד: `accessibility.css`
- תמיכה בניווט מקלדת
- ניגודיות צבעים
- ARIA labels

## 🚀 פקודות NPM חשובות

| פקודה | תיאור |
|-------|--------|
| `npm run dev` | הפעלת שרת פיתוח מקומי |
| `npm run build` | בנייה לייצור (עם prebuild) |
| `npm run preview` | תצוגה מקדימה של build |
| `npm run deploy` | העלאה ל-GitHub Pages |
| `npm run cms` | הפעלת CMS proxy |
| `npm run update-blog` | עדכון מטא-דטה של בלוג |

## 📝 עמודים ראשיים

1. **Home** (`/`) - דף הבית עם bubbles אינטראקטיביים
2. **About** (`/about`) - אודות הדס
3. **Services** (`/services`) - שירותי טיפול
4. **Blog** (`/blog`) - כתבות מקצועיות
5. **Testimonials** (`/testimonials`) - המלצות לקוחות
6. **Contact** (`/contact`) - טופס יצירת קשר (Bento Grid)
7. **Gallery** (`/gallery`) - גלריית תמונות

## ⚙️ כללי עבודה

### קוד
1. ✅ תמיד כתוב הערות בעברית
2. ✅ שמור על RTL support בכל CSS
3. ✅ השתמש ב-functional components בלבד
4. ✅ שמור על Glass-Morphism aesthetic
5. ❌ אל תשתמש ב-Tailwind (CSS מותאם בלבד)

### תמונות
- דחוס תמונות לפני העלאה
- גודל מקסימלי: 1920px
- פורמט מומלץ: WebP/JPG

### Deployment
- GitHub Pages: `npm run deploy`
- Netlify: Auto-deploy מ-main branch
- לפני deploy: תמיד הרץ build מלא

## 🌐 קישורים

- **Production**: https://hadas-toda.co.il
- **Repository**: GitHub (Elelto/hadas-toda)
- **CMS**: Netlify CMS

## 🐛 בעיות ידועות לפתרון

- [ ] נגישות: חסרים alt texts בכמה תמונות
- [ ] SEO: לשפר meta descriptions
- [ ] ביצועים: לבדוק lazy loading לתמונות

## 📞 פרטי קשר לתמיכה

- מפתח: הכנסת דרך Cursor/Windsurf
- עדכונים: דרך Netlify CMS או ידנית ב-YAML files

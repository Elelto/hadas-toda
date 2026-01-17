---
name: SEO Checker
description: בדיקה מקיפה של אופטימיזציה למנועי חיפוש (SEO) לאתר hadas-toda
---

# SEO Checker Skill

## 🎯 מטרה
לבדוק ולשפר את האופטימיזציה של האתר למנועי חיפוש, תוך מקסום החשיפה בגוגל ושיפור דירוג האתר.

## 📋 אזורי בדיקה

### 1. Meta Tags & Titles
✅ **מה לבדוק:**
- כל דף יש `<title>` ייעודי (50-60 תווים)
- `<meta name="description">` תיאורי (150-160 תווים)
- `<meta name="keywords">` רלוונטיות
- Open Graph tags (`og:title`, `og:description`, `og:image`)
- Twitter Cards
- Canonical URLs

❌ **בעיות נפוצות:**
- כותרות זהות בכל הדפים
- descriptions ארוכות מדי או קצרות מדי
- חסרים Open Graph tags
- תמונות preview חסרות

**קבצים לבדיקה:**
- `index.html` - קבצי ה-head בסיסי
- `src/components/SEOHelmet.jsx` - אם קיים
- בדיקת React Helmet ביישומי React
- קבצי דפי נחיתה ספציפיים

**דוגמה טובה:**
```html
<title>קלינאית תקשורת בני ברק | הדס תודה - טיפול בגמגום וצרידות</title>
<meta name="description" content="קלינאית תקשורת מוסמכת בבני ברק. טיפול מקצועי בגמגום, צרידות, עיכוב שפתי ובעיות קול. למידע והתייעצות ללא עלות: 050-123-4567">
<meta name="keywords" content="קלינאית תקשורת, בני ברק, גמגום, צרידות, עיכוב שפתי">
```

---

### 2. Structured Data (Schema.org)
✅ **מה לבדוק:**
- `MedicalBusiness` schema לעסק רפואי
- `Person` schema להדס תודה
- `LocalBusiness` עם כתובת ומיקום
- `Service` לכל סוג טיפול
- `Review` ו-`AggregateRating` להמלצות
- `BreadcrumbList` לניווט
- `BlogPosting` למאמרים

❌ **בעיות נפוצות:**
- JSON-LD שגוי (syntax errors)
- מידע לא עדכני
- חסרים שדות חובה
- ratingValue ללא reviewCount

**קבצים לבדוק:**
- `index.html` - structured data בסיסי
- `src/utils/structuredData.js` - אם קיים
- כל דף ודף בנפרד

**בדיקה:**
```bash
# השתמש ב-Google Rich Results Test
# https://search.google.com/test/rich-results
```

**דוגמה:**
```json
{
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "name": "הדס תודה - קלינאית תקשורת",
  "image": "https://hadas-toda.co.il/images/logo.jpg",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "רחוב הרצל 123",
    "addressLocality": "בני ברק",
    "addressCountry": "IL"
  },
  "telephone": "+972-50-123-4567",
  "priceRange": "$$",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5",
    "reviewCount": "42"
  }
}
```

---

### 3. מילות מפתח (Keywords)
✅ **מה לבדוק:**
- מילות מפתח ראשיות מופיעות ב-H1
- מילות מפתח משניות ב-H2, H3
- צפיפות keyword סבירה (1-2%)
- מילות מפתח ארוכות (long-tail)
- מילות מפתח מקומיות

❌ **בעיות נפוצות:**
- Keyword stuffing (יותר מדי)
- מילות מפתח לא רלוונטיות
- חוסר consistency בשימוש במילים
- התעלמות מ-long-tail keywords

**מילות מפתח ראשיות ל-hadas-toda:**
```
ראשיות:
- קלינאית תקשורת
- הדס תודה
- טיפול בגמגום
- צרידות
- בעיות קול
- עיכוב שפתי

מקומיות:
- קלינאית תקשורת בני ברק
- טיפול בגמגום ישראל
- צרידות בני ברק

Long-tail:
- טיפול בגמגום לילדים בני ברק
- קלינאית תקשורת מוסמכת צרידות
- עיכוב שפתי טיפול מקצועי
```

**קבצים לבדוק:**
- `src/pages/Home.jsx`
- `src/pages/Services.jsx`
- `src/pages/About.jsx`
- תוכן בבלוג

---

### 4. URL Structure & Sitemap
✅ **מה לבדוק:**
- URLs ידידותיות וקריאות
- קיים `sitemap.xml`
- קיים `robots.txt`
- Canonical URLs נכונים
- אין duplicate content

❌ **בעיות נפוצות:**
- URLs עם query parameters מיותרים
- קבצים חסרים (sitemap/robots)
- sitemap לא עדכני
- URLs לא descriptive

**קבצים:**
- `public/sitemap.xml` - ✅ בדוק אם קיים
- `public/robots.txt` - ✅ בדוק אם קיים
- בדוק routing configuration

**דוגמה ל-robots.txt:**
```
User-agent: *
Allow: /
Sitemap: https://hadas-toda.co.il/sitemap.xml
```

**דוגמה ל-sitemap.xml:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://hadas-toda.co.il/</loc>
    <lastmod>2024-01-15</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://hadas-toda.co.il/services</loc>
    <lastmod>2024-01-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

---

### 5. ביצועים טכניים (Core Web Vitals)
✅ **מה לבדוק:**
- **LCP** (Largest Contentful Paint) < 2.5s
- **FID** (First Input Delay) < 100ms
- **CLS** (Cumulative Layout Shift) < 0.1
- Mobile-friendly
- HTTPS
- Page load time < 3s

❌ **בעיות נפוצות:**
- תמונות לא ממוטבות
- JavaScript blocking
- CSS לא ממוזער
- fonts לא preloaded
- חסרים lazy loading

**כלי בדיקה:**
```bash
# 1. Google PageSpeed Insights
https://pagespeed.web.dev/

# 2. Lighthouse בChrome DevTools
npm run build
npm run preview
# פתח DevTools → Lighthouse → Performance + SEO

# 3. GTmetrix
https://gtmetrix.com/
```

**קבצים לבדוק:**
- `vite.config.js` - build optimization
- `src/components/OptimizedImage.jsx` - אם קיים
- `index.html` - preconnect, preload
- CSS files - minification

---

### 6. תוכן איכותי (Content Quality)
✅ **מה לבדוק:**
- כותרות H1, H2, H3 מובנות
- תוכן ארוך ומפורט (800+ מילים לדפים חשובים)
- קישורים פנימיים
- alt text לכל תמונה
- תוכן ייחודי (לא מועתק)

❌ **בעיות נפוצות:**
- תוכן דל
- חוסר בכותרות
- אין קישורים פנימיים
- תמונות ללא alt
- duplicate content

**קבצים לבדוק:**
- `src/pages/*.jsx` - כל דפי התוכן
- `src/data/blogPosts.js` - תוכן הבלוג
- בדיקת word count בדפים חשובים

---

### 7. Mobile Optimization
✅ **מה לבדוק:**
- Responsive design
- Touch targets מספיק גדולים (48x48px)
- טקסט קריא (16px+)
- אין horizontal scroll
- Mobile-first indexing ready

❌ **בעיות נפוצות:**
- כפתורים קטנים מדי
- טקסט קטן מדי
- אלמנטים חופפים במובייל
- layout breaks במסכים קטנים

**בדיקה:**
```bash
# Chrome DevTools → Device Mode
# בדוק במכשירים שונים:
# - iPhone SE (375px)
# - iPhone 12 Pro (390px)
# - iPad (768px)
```

---

### 8. Local SEO (קידום מקומי)
✅ **מה לבדוק:**
- Google My Business profile
- NAP consistency (Name, Address, Phone)
- מילות מפתח מקומיות
- Schema.org LocalBusiness
- ביקורות ו-ratings

❌ **בעיות נפוצות:**
- אין פרופיל GMB
- כתובת/טלפון לא consistent
- חסרים ביקורות
- לא מופיעים מיקום ושעות פתיחה

**פעולות נדרשות:**
1. יצירת Google My Business
2. רישום ב-Waze Local
3. רישום ב-Yad2 / WinWin
4. קבלת ביקורות מלקוחות

**קובץ עזר:**
- `GOOGLE_MY_BUSINESS_GUIDE.md` - ✅ קיים בפרויקט

---

### 9. קישורים חיצוניים (Backlinks)
✅ **מה לבדוק:**
- יש backlinks איכותיים
- Domain authority גבוה
- Anchor text רלוונטי
- לא spam links

❌ **בעיות נפוצות:**
- אין backlinks
- backlinks מאתרים זבל
- anchor text לא רלוונטי

**אסטרטגיות:**
- מאמרי אורח באתרי בריאות
- שיתופי פעולה עם מקצועי בריאות
- רישום במדריכים מקצועיים
- תוכן שיתופי ואיכותי

---

### 10. Google Search Console Integration
✅ **מה לבדוק:**
- האתר מאומת ב-GSC
- Sitemap נשלח ומאושר
- אין crawl errors
- Mobile usability בסדר
- Core Web Vitals בירוק

❌ **בעיות נפוצות:**
- האתר לא מאומת
- Sitemap לא נשלח
- יש 404 errors
- Mobile usability issues

**קבצים:**
- `public/google-site-verification.html`
- או meta tag בindex.html

---

## 🔧 תהליך בדיקה

### שלב 1: Automated Tools
```bash
# 1. הרץ build
npm run build

# 2. הרץ preview
npm run preview

# 3. בדוק ב-Lighthouse
# Chrome DevTools → Lighthouse → SEO + Performance

# 4. בדוק ב-PageSpeed Insights
https://pagespeed.web.dev/?url=https://hadas-toda.co.il
```

### שלב 2: Manual Checks
1. ✅ בדוק meta tags בכל דף
2. ✅ בדוק structured data ב-Rich Results Test
3. ✅ בדוק sitemap.xml
4. ✅ בדוק robots.txt
5. ✅ בדוק mobile responsiveness
6. ✅ בדוק page load speed

### שלב 3: Code Review
בדוק את הקבצים הבאים:
- [ ] `index.html` - meta tags, structured data
- [ ] `public/sitemap.xml`
- [ ] `public/robots.txt`
- [ ] `src/pages/*.jsx` - content optimization
- [ ] `SEO_GUIDE.md` - התאמה להמלצות
- [ ] `vite.config.js` - build optimization

### שלב 4: External Tools
- [ ] Google Search Console
- [ ] Google PageSpeed Insights
- [ ] GTmetrix
- [ ] Ahrefs / SEMrush (אופציונלי)

---

## 📊 דוח מצופה

לאחר הבדיקה, הכן דוח זה:

```markdown
# דוח SEO - hadas-toda

## ציון כללי
- Lighthouse SEO Score: X/100
- PageSpeed Performance: X/100
- Mobile Friendly: ✅/❌

## Meta Tags ✅
- [ ] כל דף יש title ייעודי
- [ ] כל דף יש description
- [ ] Open Graph tags מוגדרים
- [ ] Canonical URLs נכונים

## Structured Data ✅
- [ ] MedicalBusiness schema
- [ ] Person schema
- [ ] LocalBusiness schema
- [ ] Reviews schema

## תוכן ומילות מפתח ✅
- [ ] H1 ייחודי בכל דף
- [ ] מילות מפתח מושתלות טבעית
- [ ] תמונות עם alt text
- [ ] קישורים פנימיים

## טכני ✅
- [ ] sitemap.xml קיים ועדכני
- [ ] robots.txt קיים
- [ ] HTTPS מופעל
- [ ] Mobile-friendly
- [ ] Core Web Vitals בירוק

## בעיות קריטיות 🔴
1. [תיאור בעיה]
   - קובץ: [נתיב]
   - תיקון: [המלצה]

## שיפורים מומלצים 🟡
1. [תיאור]

## עובד מצוין ✅
1. Structured data
2. Mobile optimization
3. ...
```

---

## 🎓 משאבים

- [Google Search Central](https://developers.google.com/search)
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [Schema.org](https://schema.org/)
- [Moz SEO Guide](https://moz.com/beginners-guide-to-seo)
- [Ahrefs Blog](https://ahrefs.com/blog/)

---

## ⚡ Quick Fixes

### התקן Google Analytics
```javascript
// src/components/GoogleAnalytics.jsx
const trackingId = "G-XXXXXXXXXX"; // החלף ב-ID אמיתי
```

### שפר Page Speed
```html
<!-- index.html -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="dns-prefetch" href="https://fonts.googleapis.com">
```

### הוסף Canonical URLs
```html
<link rel="canonical" href="https://hadas-toda.co.il/services">
```

### בדוק Structured Data
```bash
# Google Rich Results Test
https://search.google.com/test/rich-results?url=https://hadas-toda.co.il
```

---

## 📝 Checklist מהיר

עבור בודק מהיר, השתמש בצ'קליסט זה:

### בסיסי (5 דקות)
- [ ] כל דף יש title + description
- [ ] sitemap.xml קיים
- [ ] robots.txt קיים
- [ ] HTTPS מופעל
- [ ] Mobile-friendly

### בינוני (15 דקות)
- [ ] Structured data תקין
- [ ] Open Graph tags
- [ ] כותרות H1-H3 מובנות
- [ ] תמונות עם alt
- [ ] Lighthouse score > 90

### מתקדם (30 דקות)
- [ ] Core Web Vitals בירוק
- [ ] Google Search Console setup
- [ ] Backlinks strategy
- [ ] Local SEO optimization
- [ ] Content quality review

---

**הצלחה בקידום! 🚀**

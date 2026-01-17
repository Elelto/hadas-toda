---
description: בדיקת SEO מקיפה של האתר
---

# בדיקת SEO - hadas-toda

## שלב 1: בדיקת קבצים בסיסיים
בדוק שהקבצים הבאים קיימים ומעודכנים:

```bash
# בדוק sitemap
cat public/sitemap.xml

# בדוק robots.txt
cat public/robots.txt
```

## שלב 2: הרץ build ו-preview
```bash
npm run build
npm run preview
```

## שלב 3: בדיקות אוטומטיות

### Lighthouse בChrome DevTools:
1. פתח את האתר ב-Chrome
2. פתח DevTools (F12)
3. לך ללשונית Lighthouse
4. בחר: Performance, Accessibility, Best Practices, SEO
5. לחץ "Generate report"

### Google PageSpeed Insights:
פתח: https://pagespeed.web.dev/?url=https://hadas-toda.co.il

## שלב 4: בדיקות ידניות

### בדוק Meta Tags:
```bash
# בדוק את index.html
cat index.html | grep -E "<title>|<meta name="

# בדוק דפים ספציפיים
grep -r "React.Helmet" src/
```

### בדוק Structured Data:
פתח: https://search.google.com/test/rich-results?url=https://hadas-toda.co.il

### בדוק Mobile Friendliness:
1. פתח Chrome DevTools
2. Toggle Device Toolbar (Ctrl+Shift+M)
3. בדוק במכשירים: iPhone SE, iPhone 12, iPad

## שלב 5: קרא את ה-Skill המלא
אם צריך בדיקה מפורטת יותר, קרא:
```
.agent/skills/seo-checker/SKILL.md
```

## שלב 6: דוחות חיצוניים (אופציונלי)

- **Google Search Console**: https://search.google.com/search-console
- **GTmetrix**: https://gtmetrix.com/
- **WebPageTest**: https://www.webpagetest.org/

## Checklist מהיר ✅

- [ ] sitemap.xml קיים ועדכני
- [ ] robots.txt קיים
- [ ] כל דף יש title ייעודי
- [ ] כל דף יש meta description
- [ ] Structured data תקין (Rich Results Test)
- [ ] Lighthouse SEO Score > 90
- [ ] Mobile-friendly
- [ ] Page load time < 3s
- [ ] Core Web Vitals בירוק

---

**💡 טיפ**: להרצת בדיקה מלאה, פנה אל ה-skill עצמו באמצעות הפקודה:
```
אנא הרץ את SEO Checker skill
```

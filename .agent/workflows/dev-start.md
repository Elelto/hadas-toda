---
description: התחלת סביבת פיתוח מקומית
---

# הפעלת סביבת פיתוח (Development)

## התחלה מהירה

// turbo

### הפעלת שרת פיתוח רגיל
```bash
npm run dev
```

האתר יהיה זמין ב: http://localhost:5173

## מצבי פיתוח שונים

### עם CMS (ניהול תוכן)
אם אתה רוצה לערוך תוכן דרך Netlify CMS:

```bash
npm run dev-cms
```

זה מפעיל בו-זמנית:
- ✅ Vite dev server (port 5173)
- ✅ Netlify CMS proxy (port 8081)

גישה ל-CMS: http://localhost:5173/admin

### רק CMS Proxy
```bash
npm run cms
```

### סנכרון תוכן + מעקב
```bash
npm run watch-content
```
עוקב אחרי שינויים ב-`public/content/` ומסנכרן אוטומטית.

## מה קורה ב-`npm run dev`?

1. **סנכרון תוכן**: `node scripts/sync-content.js`
   - מסנכרן YAML files
   - מכין את התוכן לשימוש

2. **Vite Dev Server**:
   - Hot Module Replacement (HMR)
   - עדכונים מיידיים בדפדפן
   - Source maps לדיבאג

## עדכון תוכן בזמן פיתוח

### עריכת YAML Files
קבצים ב-`public/content/`:
- `pages/home.yml` - תוכן דף הבית
- `pages/about.yml` - תוכן דף אודות
- וכו'

לאחר עריכה - **רענן את הדפדפן** (או המערכת תעשה זאת אוטומטית)

### הוספת/עריכת פוסט בבלוג
1. צור/ערוך קובץ ב-`public/content/blog/`
2. הרץ:
```bash
npm run update-blog
```
3. רענן את הדפדפן

## Ports בשימוש

| Service | Port | URL |
|---------|------|-----|
| Vite Dev | 5173 | http://localhost:5173 |
| Netlify CMS | 8081 | (proxy בלבד) |
| Preview | 4173 | http://localhost:4173 |

## טיפים לפיתוח

### שינוי מהיר ב-CSS
קבצים ב-`src/styles/` מתעדכנים **מיידית** ללא רענון!

### דיבאג React Components
1. התקן React DevTools ב-Chrome/Firefox
2. פתח את DevTools (`F12`)
3. לכרטיסייה "Components"

### בדיקת Responsive
- Ctrl+Shift+M (Chrome/Firefox) - Device Toolbar
- בדוק Mobile, Tablet, Desktop

### נקיון Cache
אם משהו לא עובד:
```bash
# עצור את השרת (Ctrl+C)
# מחק את dist
rm -rf dist
# התחל מחדש
npm run dev
```

## Troubleshooting

### Port 5173 תפוס
```bash
# Vite יציע port אחר אוטומטית
# או הרוג את התהליך:
npx kill-port 5173
```

### שינויים לא נראים
1. **רענן את הדפדפן** (Ctrl+F5 - hard refresh)
2. **בדוק Console** לשגיאות
3. **עצור והפעל מחדש** את `npm run dev`

### תמונות לא נטענות במצב Dev
- ודא שהתמונות ב-`public/`
- Vite מגיש את `public/` כ-root
- הנתיב צריך להיות: `/path/to/image.jpg`

## Checklist להתחלת עבודה ✅

- [ ] `npm install` הורץ (אם זה פרויקט טרי)
- [ ] אין process אחר על port 5173
- [ ] Git branch נכון
- [ ] `.env` קיים (אם צריך)

## זמן טעינה צפוי
- הפעלה ראשונה: ~3-5 שניות
- HMR updates: מיידי (<100ms)

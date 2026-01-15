---
name: Accessibility Checker
description: בדיקה מקיפה של נגישות האתר hadas-toda
---

# Accessibility Checker Skill

## 🎯 מטרה
לבדוק ולשפר את נגישות האתר לאנשים עם מוגבלויות, תוך עמידה בתקן WCAG 2.1 AA.

## 📋 אזורי בדיקה

### 1. Semantic HTML
✅ **מה לבדוק:**
- שימוש ב-`<header>`, `<nav>`, `<main>`, `<footer>`
- `<h1>` יחיד בכל עמוד
- היררכיה נכונה של כותרות (h1→h2→h3)
- `<button>` לפעולות, `<a>` לקישורים

❌ **בעיות נפוצות:**
- `<div>` במקום `<button>`
- דילוג ברמות כותרות (h1→h3)
- כפתורים ללא תוכן טקסט

**קבצים לבדיקה:**
- `src/components/Header.jsx`
- `src/App.jsx`
- כל קומפוננטות ה-pages

---

### 2. ARIA Labels & Roles
✅ **מה לבדוק:**
- כל אלמנט אינטראקטיבי יש `aria-label` או טקסט ברור
- תמונות דקורטיביות: `aria-hidden="true"`
- טפסים: `<label>` מקושר ל-`<input>`

❌ **בעיות נפוצות:**
- אייקונים ללא תיאור
- כפתורי "X" (סגירה) ללא aria-label
- inputs ללא labels

**דוגמה לתיקון:**
```jsx
// ❌ לא טוב
<button onClick={close}>
  <FaTimes />
</button>

// ✅ טוב
<button onClick={close} aria-label="סגור">
  <FaTimes aria-hidden="true" />
</button>
```

**קבצים לבדוק:**
- `src/components/**/*.jsx`
- במיוחד: טפסים, modals, navigation

---

### 3. ניגודיות צבעים (Color Contrast)
✅ **יחס מינימלי:**
- טקסט רגיל: **4.5:1**
- טקסט גדול (18pt+): **3:1**
- אלמנטים UI: **3:1**

❌ **בעיות ידועות ב-hadas-toda:**
- טקסט ורוד על רקע לבן/בהיר
- Glass-morphism עם שקיפות גבוהה

**קבצים לבדוק:**
- `src/styles/contact.css` - קארד הקשר הוורוד
- `src/styles/glass.css` - כל ה-glass elements
- `src/styles/home.css` - bubbles וקישורים

**כלים:**
- Chrome DevTools → Lighthouse → Accessibility
- WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/

---

### 4. תמונות (Images)
✅ **מה לבדוק:**
- כל `<img>` יש `alt` תיאורי
- תמונות דקורטיביות: `alt=""` או `aria-hidden="true"`
- SVG icons: `aria-label` או טקסט חלופי

❌ **בעיות נפוצות:**
- תמונות ללא alt
- alt="image" (לא מתאר)
- logo ללא alt

**קבצים לבדוק:**
```bash
# חפש כל img tags
grep -r "<img" src/
```

---

### 5. ניווט במקלדת (Keyboard Navigation)
✅ **מה לבדוק:**
- Tab key עובד על כל אלמנט אינטראקטיבי
- Focus visible (outline/ring)
- Shift+Tab חוזר אחורה
- Enter/Space מפעילים כפתורים

❌ **בעיות נפוצות:**
- `outline: none` ב-CSS (ללא חלופה)
- modals לא לוכדים focus
- divs עם onClick (לא נגישים)

**קובץ ייעודי:**
- `src/styles/accessibility.css` - ✅ כבר קיים!

**בדיקה ידנית:**
1. פתח את האתר
2. לחץ Tab ועקוב אחרי ה-focus
3. ודא שכל כפתור/קישור נגיש

---

### 6. טפסים (Forms)
✅ **מה לבדוק:**
- כל `<input>` יש `<label>` מקושר
- שגיאות validation ברורות ונגישות
- placeholder לא מחליף label

❌ **בעיות נפוצות:**
- labels חסרים
- שגיאות רק בצבע (ללא טקסט)
- required fields לא מסומנים

**קבצים לבדוק:**
- `src/pages/Contact.jsx` (או כל עמוד עם טופס)

**דוגמה:**
```jsx
// ✅ טוב
<label htmlFor="name">שם מלא *</label>
<input 
  id="name" 
  type="text" 
  required
  aria-required="true"
  aria-invalid={errors.name ? "true" : "false"}
/>
{errors.name && (
  <span role="alert" className="error">
    {errors.name}
  </span>
)}
```

---

### 7. RTL (Right-to-Left)
✅ **מה לבדוק:**
- `dir="rtl"` ב-HTML
- text-align: right
- flexbox/grid בכיוון הנכון

**זה כבר עובד היטב ב-hadas-toda!** ✅

---

## 🔧 תהליך בדיקה

### שלב 1: Automated Testing
```bash
# הרץ Lighthouse בדיקת נגישות
npm run build
npm run preview
```
פתח Chrome DevTools → Lighthouse → Accessibility

### שלב 2: Manual Testing
1. ניווט במקלדת בלבד (Tab/Shift+Tab)
2. בדיקת screen reader (NVDA/JAWS/VoiceOver)
3. בדיקת zoom 200%
4. בדיקת color contrast

### שלב 3: Code Review
בדוק את הקבצים הבאים לפי הצ'קליסט למעלה:
- [ ] `src/App.jsx`
- [ ] `src/components/Header.jsx`
- [ ] `src/pages/*.jsx`
- [ ] `src/styles/accessibility.css`
- [ ] כל קומפוננטה חדשה

---

## 📊 דוח מצופה

לאחר הבדיקה, הכן דוח זה:

```markdown
# דוח נגישות - hadas-toda

## ציון כללי
- Lighthouse Score: X/100
- WCAG Level: AA/AAA

## בעיות קריטיות 🔴
1. [תיאור בעיה]
   - קובץ: [נתיב]
   - תיקון: [המלצה]

## שיפורים מומלצים 🟡
1. [תיאור]

## עובד מצוין ✅
1. RTL support
2. Semantic HTML
3. ...
```

---

## 🎓 משאבים

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM](https://webaim.org/)
- [A11y Project Checklist](https://www.a11yproject.com/checklist/)
- [React Accessibility Docs](https://react.dev/learn/accessibility)

---

## ⚡ Quick Fixes

### הוסף Focus Visible לכל כפתור
```css
/* src/styles/accessibility.css */
button:focus-visible,
a:focus-visible {
  outline: 3px solid #ff6b9d;
  outline-offset: 2px;
  border-radius: 4px;
}
```

### הוסף Alt לתמונות
```bash
# מצא תמונות ללא alt
grep -r '<img[^>]*>' src/ | grep -v 'alt='
```

### שפר ניגודיות
השתמש ב-Chrome DevTools:
1. Inspect element
2. Styles panel → Color picker
3. בדוק את Contrast ratio

---
description: העלאה לסביבת production
---

# תהליך העלאה לייצור (Deployment)

## ⚡ העלאה מהירה ל-Netlify

הפרויקט שלך מתארח ב-**Netlify** שמתעדכן אוטומטית מ-Git.

### פקודות העלאה:

```powershell
git add .; git commit -m "עדכון אתר"; git push origin main
```

**זהו!** Netlify יעשה את השאר אוטומטית.

---

## 📋 תהליך מפורט

### 1. בדוק מה השתנה
```powershell
git status
```

### 2. הוסף את כל השינויים
```powershell
git add .
```

### 3. צור commit עם הודעה
```powershell
git commit -m "תיאור השינוי שלך"
```

### 4. העלה ל-GitHub
```powershell
git push origin main
```

### 5. המתן ל-Netlify (1-2 דקות)
Netlify **אוטומטית**:
- ✅ מזהה את ה-push
- ✅ מריץ `npm run build`
- ✅ מעלה את `dist/` לאוויר
- ✅ מעדכן את https://hadas-toda.co.il

---

## 🧪 אימות לפני העלאה (אופציונלי)

אם רוצה לבדוק **לפני** להעלות:

```powershell
npm run build; npm run preview
```

פתח: http://localhost:4173

**בדוק:**
- ✅ העמוד נראה טוב
- ✅ אין שגיאות
- ✅ הכל עובד

---

## 📊 בדיקת סטטוס Deploy

### באתר Netlify:
1. כנס ל-Netlify Dashboard
2. לחץ על "Deploys"
3. תראה:
   - 🟢 **Published** - האתר עלה בהצלחה
   - 🟡 **Building** - בתהליך build
   - 🔴 **Failed** - יש שגיאה (בדוק logs)

### ב-Git:
```powershell
git log --oneline -5
```
תראה את ה-commits האחרונים

---

## ⏱️ זמנים צפויים

| שלב | זמן |
|-----|-----|
| `git push` | מיידי (~2 שניות) |
| Netlify build | 30-60 שניות |
| פרסום חי | 1-2 דקות **סה"כ** |

---

## 🔧 Troubleshooting

### Build נכשל ב-Netlify
1. בדוק את ה-logs ב-Netlify Dashboard
2. נסה לבנות מקומית:
   ```powershell
   npm run build
   ```
3. אם יש שגיאה - תקן ו-commit שוב

### Git push נכשל
```powershell
# אם יש conflict - pull קודם
git pull origin main

# פתור conflicts ואז
git push origin main
```

### אתר לא מתעדכן
- ✅ ודא ש-commit הגיע ל-GitHub
- ✅ בדוק ב-Netlify שה-deploy רץ
- ✅ נקה cache בדפדפן (Ctrl+Shift+R)

---

## ✅ Checklist לפני העלאה

- [ ] `git status` - בדקת מה משתנה
- [ ] `npm run build` עובד מקומית (אופציונלי)
- [ ] ההודעה ב-commit ברורה
- [ ] לא מעלה קבצים רגישים (.env וכו')

---

## 💡 טיפים

### Commit Messages טובים:
```powershell
git commit -m "הוספת skill של בדיקת נגישות"
git commit -m "תיקון ניגודיות בעמוד Contact"
git commit -m "עדכון תוכן blog על ADHD"
```

### העלאה מהירה של הכל:
```powershell
git add .; git commit -m "עדכון"; git push
```

### ביטול commit אחרון (אם טעית):
```powershell
git reset --soft HEAD~1
```

---

## 🎯 סיכום

**העלאה רגילה:**
```powershell
git add .; git commit -m "עדכון אתר"; git push origin main
```

**זמן עד שהאתר חי:** ~1-2 דקות

**לינק לבדיקה:** https://hadas-toda.co.il

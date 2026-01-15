# 🤖 Agent Configuration - hadas-toda

ברוך הבא לתיקיית התצורה של Claude Agent!

תיקייה זו מכילה Skills, Workflows ומידע שעוזרים ל-AI לעבוד עם הפרויקט בצורה חכמה יותר.

## 📁 מבנה התיקייה

```
.agent/
├── README.md                    # ← אתה כאן
├── project-context.md           # מידע כללי על הפרויקט
├── workflows/                   # תסריטי עבודה חוזרים
│   ├── deploy.md               # איך להעלות לייצור
│   └── dev-start.md            # איך להתחיל לפתח
└── skills/                      # יכולות מיוחדות
    └── accessibility-checker/   # בדיקת נגישות
        └── SKILL.md
```

---

## 🚀 Slash Commands זמינים

### Development
- `/dev` - התחל לעבוד (קורא את `workflows/dev-start.md`)

### Deployment  
- `/deploy` - העלאה לייצור (קורא את `workflows/deploy.md`)

### Quality Checks
- `/accessibility` - בדוק נגישות (משתמש ב-`skills/accessibility-checker`)

---

## ✍️ איך להוסיף Workflow חדש?

1. צור קובץ: `.agent/workflows/[שם-התהליך].md`
2. הוסף frontmatter:
```yaml
---
description: תיאור קצר של מה ה-workflow עושה
---
```
3. כתוב את השלבים בעברית
4. אם רוצה auto-run: הוסף `// turbo` או `// turbo-all`

**דוגמה:**
```markdown
---
description: בדיקת lint על כל הקוד
---

# Lint Check

// turbo

1. הרץ stylelint על CSS:
   ```
   npx stylelint "src/**/*.css"
   ```

2. בדוק שאין שגיאות
```

שימוש: `/lint-check`

---

## 🛠️ איך להוסיף Skill חדש?

1. צור תיקייה: `.agent/skills/[שם-הskill]/`
2. צור `SKILL.md` עם frontmatter:
```yaml
---
name: שם ה-Skill
description: תיאור קצר
---
```
3. תאר את הלוגיקה, הקבצים, והתהליך

**דוגמה:**
```
.agent/skills/image-compression-checker/
└── SKILL.md
```

---

## 📖 משאבים

- **Project Context**: קרא את `project-context.md` להבנת הפרויקט
- **Existing Workflows**: עיין ב-`workflows/` לדוגמאות
- **Existing Skills**: עיין ב-`skills/` לדוגמאות

---

## 🎯 כללי זהב

1. ✅ כתוב **בעברית** (זה פרויקט עברי!)
2. ✅ היה **ספציפי** - נתיבי קבצים מדויקים
3. ✅ עדכן קבצים כש**הפרויקט משתנה**
4. ✅ השתמש ב-`// turbo` לפעולות בטוחות בלבד

---

## 🧪 בדיקה

לאחר הוספת workflow/skill חדש:
1. נסה להריץ אותו דרך slash command
2. ודא שכל הנתיבים נכונים
3. בדוק שהתיעוד ברור

---

**עדכון אחרון:** 2026-01-15
**גרסת Antigravity:** Latest

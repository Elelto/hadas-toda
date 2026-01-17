---
description: עדכון תלויות (dependencies) לגרסאות אחרונות
---

# עדכון תלויות

העתק והרץ את כל הפקודות הבאות:

```bash
npm outdated
npm update
npm install
npm run build
git add package.json package-lock.json
git commit -m "update: dependencies updated"
git push
```

## הסבר קצר

1. `npm outdated` - בודק אילו packages מיושנים
2. `npm update` - מעדכן לגרסאות בטוחות (minor/patch)
3. `npm install` - מתקין את העדכונים
4. `npm run build` - בודק שהכל עובד ובונה את הפרויקט

## הערות

- לעדכוני major versions: `npm install <package-name>@latest`
- תמיד עשה commit לפני עדכון תלויות

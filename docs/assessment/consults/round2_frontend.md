# סבב התייעצות 2: Frontend (8), הפעלה ראשונה

2026-10-06 · זו התייעצות, לא מימוש. לא בניתי ולא הרצתי כלום; קראתי קוד ומסמכים בלבד.

**מה נקרא:** TEAM (כרטיס 8), ROUND2_REQUESTS, COMPONENTS §3.1–3.2, §3.11, §3.14, §5, §7.1, §8–§10, `round2_accessibility.md`,
ARCHITECTURE §1.9, §6.1, §8.4, §10.6, `AccessibilityWidget.jsx`, `accessibility.css`, `useHistoryUIState.js`, `FloatingWhatsApp.jsx`,
`App.jsx`, `index.html`, `package.json`, `vite.config.js`, `netlify.toml`, `inject-seo-meta.js`, `generate-sitemap.js`,
`GoogleAnalytics.jsx`, `Header.jsx` עם `yamlLoader.js` ו-`firebaseLoader.js`, ראש `global.css`, ושורות ממוקדות מהמוקאפ (grep).
**מדדים:** נמדדו מ-`dist/` האחרון (2026-10-04), לא מבנייה חדשה. **מגבלה:** כל מה שתלוי במקלדת של iOS או בקורא מסך מסומן "לבדיקה במכשיר".
סימון: **ממליץ** · **ממליץ בתנאי** · **מתנגד**.

---

## 1. AccessibilityWidget, פתיחה וריכוז מבחוץ: ממליץ בתנאי

**פתיחה מבחוץ לא דורשת שינוי ברכיב.** `isOpen` כבר נגזר מ-`location.state.accessibilityMenu`. כפתור הפס קורא ל-`useHistoryUIState('accessibilityMenu')`
באותו מפתח, ושני הכפתורים מסונכרנים, כולל `aria-expanded`. המחיר: Router בכלי (17KB gz, משותף עם האתר). **מיקום:** CSS בקובץ של הכלי בלבד, בתוך `max-width: 1023.98px`.
**מה כן משתנה ברכיב (כ-30 שורות JSX, בלי CSS):** `aria-expanded` ו-`aria-controls` על הכפתור; `aria-pressed` על ארבעת המתגים (לא על גודל הטקסט, שמחזורי ומצבו כתוב);
`aria-label` ל-"×"; מיקוד לפקד הראשון בפתיחה מהמשתמש (לא בטעינה); Esc ולחיצה בחוץ סוגרים, תוך התעלמות מ-`[data-a11y-toggle]` (אחרת הלחיצה סוגרת ופותחת מחדש);
חזרת מיקוד לפותח, ואם הוא לא גלוי (סיבוב מסך) לכפתור הגלוי. **שורת צבע אחת:** `.control-btn.active` ל-`--primary-dark` (3.28 ל-6.22).
**אישור אליה:** ARIA והתנהגות (בלי שינוי חזותי), והצבע (חזותי).

## 2. גודל טקסט ובלי `transform`: ממליץ בתנאי (אפשרי, בשינוי אחד בגישה)

בדקתי סלקטורים: `body.text-large .intake :is(p,li,span,a,h1,h2,h3)` הוא (0,2,2) מול (0,1,2) באתר, שניהם `!important`, לכן הבלוק גובר.
**הבעיה:** `font-size: inherit` ו-`line-height: inherit` שוטחים את h1–h3 ואת כל `span`, והבלוק גובר גם על מחלקות הגודל של הכלי.
**הצעה:** מחלקת גודל מגדירה רק `--fs` ו-`--lh`, וכלל אחד מחיל אותם ב-`!important`, גם על `input, textarea` (ב-`global.css` הם `16px !important`, ובלי זה שדה ההקלדה לא יגדל).
זה שינוי בגישה של §8.3.4, לא בעיצוב: אישור תפקיד 2. **בלי `transform` לפריסה:** אפשרי. גם אייקון שהכיוון שלו תלוי ב-`transform` אסור, כי `stop-animations` מאפס אותו (ממצא 5).
**תנאי:** בדיקת מחשב-סגנונות על ה-CSS האמיתי של האתר: כל תפקיד גודל × שלושת הגדלים × ניגודיות וגופן קריא, ברוחב 320.

## 3. D-06: ממליץ entry נפרד של Vite, מתנגד להחרגה לפי route

gtag נטען ב-`<head>` הסטטי, לפני React, ואין "route" להחריג בלי לעטוף בתנאי את קטע ה-Ads הקיים. גם אז ה-CSP של ARCH §8.4 לא יכול לחול על HTML שנושא סקריפטים inline,
והכלי היה טוען את חבילת האתר כולה (413KB gz). **מימוש:** `intake/index.html` (תיקייה, כך ש-`/intake/` עובד בלי rewrite), מפתח שני ב-`rollupOptions.input` (כבר אובייקט),
`src/intake/main.jsx` עם `createRoot` משלו, בלי `lazy`: S6, S10 והסכמה בחבילה הראשית. ה-`<head>` סטטי (noindex עד ההשקה, בבעלות תפקיד 4).
**צנרת SEO:** `vitePrerender.routes`, `PAGE_META` ב-`inject-seo-meta.js` ו-`generate-sitemap.js` הם רשימות מפורשות, ולכן הכלי מחוץ להן ואף אחת לא נוגעת בו.
ב-Netlify נחוץ `[[headers]]` ל-`/intake/*`; ה-rewrite של ARCH לא נחוץ (לאמת ב-Deploy Preview).
**תנאי קבלה:** אפס בקשות ל-origin אחר, אפס הפרות CSP, `window.gtag` לא מוגדר. ראו ממצאים 1–3.

## 4א. ישימות המוקאפ בסטאק: ממליץ, עם שלוש החלטות עכשיו

1. **תנועה ב-CSS בלבד.** framer-motion ב-`package.json` אבל לא מיובא באף קובץ ב-`src` (נבדק); האתר משתמש ב-AOS, והמוקאפ כולו keyframes. CSS מכבד `stop-animations`
   ו-reduced-motion אוטומטית, ו-framer-motion לא. §5 צריך להפסיק להזכיר אותו. כניסה מונפשת רק להודעה חדשה, לא לתמליל משוחזר.
2. **מצב מיקוד:** `intake-focus` נקבעת ב-`useLayoutEffect` (בלי הבהוב) ומוסרת ביציאה; `display:none` כמו במפרט. `100dvh` לא מספיק ב-iOS (המקלדת לא מקטינה שם את ה-layout viewport):
   `visualViewport` ל-iOS ו-`interactive-widget=resizes-content` לכרום ולפיירפוקס. לבדיקה באייפון אמיתי.
3. **מכריז יחיד:** אלמנט סטטי ב-`intake/index.html`, מחוץ ל-`#root`, שלא נהרס באף מעבר (כולל S6), ו-`announce(text)` אחד עם ריקון לפני כל הכרזה. אחד או שניים (הודעות וסטטוס)
   הוא עניין של מבקר הנגישות והמכשיר; ה-API לא משתנה.

## 4ב. שאלות §10 (ב)–(ה) אליי

- **(ב)** הכרזה: 4א.3. המוקאפ צריך להתעדכן (תפקיד 2).
- **(ג)** מקלדת מובייל: 4א.2. בלי `viewport-fit=cover` (`env()` יחזיר 0, ואין צורך), `maximum-scale=5` נשאר, שדה 16px ומעלה.
- **(ד)** `<a>` מול `a {color}`: ב-`global.css` יש `a{color:--accent}`, `a:hover{color:--primary-dark}` ו-`a:focus{outline:2px --primary}`. על כפתור 101 (פחם) זה 2.77:1 רגיל ו-2.32:1 בריחוף.
  הכלל חייב לכסות base, hover, focus-visible, active, visited, `highlight-links` ו-`high-contrast`. בדיקת מחשב-סגנונות לכל מצב.
- **(ה)** `data-track-ignore`: בכלי אין מאזין, אז הוא לא עושה כלום; להשאיר כהגנה. התיקון האמיתי הוא במאזין (אתר, באישור אליה). e2e עם gtag חסום: עליי, עם תפקידים 4 ו-11.
  בנקודות הכניסה באתר: `intake_cta_click` מ-`onClick` עם beacon, לא `data-custom-event` (המאזין היה מבטל את הניווט ויורה גם `ads_conversion___1`).

## 5. EFFICIENCY E1, Frontend על Sonnet: ממליץ בתנאי

מסכים עם אבטחה וקליני: מימוש נאמן למוקאפ מתאים ל-Sonnet, אבל באגים בטיחותיים שקטים. **ארבעת הרכיבים ששאלתם בטיחותיים, וכך גם חמישה נוספים.**
ביקורת Opus על ה-diff בלבד, על רשימה סגורה ב-`src/intake/safety/` (סינון לפי נתיב):
1. S6: רינדור רק מ-`red_flag_blocks`, בלי הרכבה או הסתרה בצד הלקוח; ריקון המכריז, מיקוד H1.
2. `Call101` יחיד (`tel:101`, בלי מאזין; lint על המחרוזת מחוצה לו).
3. ניתוב שגיאה, timeout ו-offline ל-S10 עם 101; "נשלח" רק אחרי 2xx.
4. הסכמה: לא מסומנת מראש ולא משוחזרת, גרסאות מ-`/bootstrap`, נוסח במלואו.
5. המודול הלא-מקוון וה-fallback הסטטי.
6. גודל גוף: בתים של המחרוזת הנשלחת, בלי חיתוך.
7. שורת הפרטיות ב-S8, מחיקה, כפתורי הגיל ו-S13.
8. אחסון הדפדפן: רק מפתח הנגישות ותאריך ה"נשלח".

---

## ממצאים נוספים (לא נשאלתי, משנים החלטות)

1. **`Header`, `Footer` ו-`yamlLoader` מחוץ לכלי.** `Header` טוען תוכן דרך `loadYamlContent`, שמנסה קודם Firestore (`getDoc`, ובמקרה אחד גם `setDoc`).
   בכלי זה חבילת Firebase ובקשות ל-Google, בניגוד ל-D-06 ול-`connect-src 'self'`. נדרש chrome דק של הכלי (לוגו וניווט כ-`<a>` רגילים), מ-`header.yml` ו-`footer.yml` בזמן build.
   `no-restricted-imports` תחת `src/intake/` ל-`firebase`, `yamlLoader`, `Header`, `Footer`, `SEOHead`, `GoogleAnalytics`, `react-helmet-async`. `AccessibilityWidget` ו-`FloatingWhatsApp` בטוחים לשימוש.
2. **פונטים מול CSP.** שורה 1 ב-`global.css` היא `@import` של Google Fonts. ה-CSP (`default-src 'self'`) חוסם אותו, והכלי יוצג ב-sans-serif של המערכת. לאפשר ל-Google חושף IP מדף בריאות.
   המלצה: אותם Rubik ו-Heebo כקבצי woff2 מקומיים (למשל `@fontsource`; תלות חדשה), והעברת ה-`@import` לקובץ שנטען רק באתר. שינוי באתר: אישור אליה.
3. **גודל חבילה.** ב-`dist`: `main` 1.44MB, 413KB gz, ו-`vendor` 30 בייט (ה-`manualChunks` לא תופס את react). לא אימתתי מה ייכנס ל-chunk המשותף של entry שני.
   תנאי: בנייה ראשונה, פירוט החבילה (כולל polyfills של `nodePolyfills`), ותקציב שנקבע אחריה ונאכף ב-CI.
4. **fallback סטטי.** `#root` ב-`intake/index.html` נושא מראש בלוק סטטי (101, טלפון הדס, וואטסאפ) שמוחלף כש-React עולה, וגם `<noscript>`. כך כשל טעינה לא נראה כדף לבן.
   הטקסט נוצר מאותו מחולל של `system.unavailable`, לא נכתב ביד. בלי `style=""` (CSP); העיצוב מקובץ ה-CSS.
5. **אייקונים לא נשענים על `transform`.** `stop-animations` מאפס `transform`, ו-`.chev` ב-`details` (מוקאפ שורה 356) מסתובב רק בו. כל כיוון כ-SVG נפרד.
   הדמיית `sim-noanim` במוקאפ לא מאפסת `transform`, ולכן לא חושפת זאת: להתאים לכלל האתר (עריכה סגורה).
6. **שכבות והיסטוריה.** דיאלוג, ⋮ וגיליון באותו `useHistoryUIState` עם מפתחות נפרדים: Back סוגר את העליונה. `<dialog>.showModal()` הופך את שאר הדף ל-inert, כולל כפתור הנגישות הצף:
   מקובל ב-S11 הקצר, אבל ב-S12 (טקסט ארוך) אין גישה לגודל טקסט בזמן הפתיחה. שאלה למבקר הנגישות.
7. **באג סמוך בווידג'ט.** `AccessibilityWidget` קורא `localStorage` ב-effect ואז כותב עליו ברירות מחדל. בייצור זה עובד אחרי הבהוב בגודל ברירת מחדל; ב-dev (StrictMode, כמו `main.jsx`) ההגדרות נמחקות בכל טעינה.
   `useState` עם אתחול עצל ו-`useLayoutEffect` פותרים את שניהם, באותו שינוי של סעיף 1.

---

## נספח: מה לשנות לפני שער 1

| בעלים | שינוי |
|---|---|
| אליה | (א) שינוי ב-`AccessibilityWidget` (סעיף 1). (ב) הוצאת `@import` הפונטים מ-`global.css` ותלות בפונטים מקומיים (ממצא 2). (ג) המבנה: entry נפרד וchrome דק, לא `Header`/`Footer` (ממצא 1) |
| UI (2) | §5: להסיר framer-motion. §8.3.4: `--fs`/`--lh` במקום `inherit`. §3.21: כלל לכפתורי `<a>` לכל המצבים. מוקאפ: `sim-noanim` מאפס גם `transform`, `.chev` ב-SVG לכל מצב, מכריז יחיד (עם תפקיד 14) |
| ארכיטקט (6) | §8.4: `[[headers]]` במקום rewrite; הכלי בלי `lazy` ועם תקציב חבילה; בלוק fallback סטטי ו-`announcer` סטטי ב-HTML של ה-entry |
| מעצב שיחה (3) | `redflag.after.no_form` (הווריאנט הטקסטואלי) במקום הסתרה ב-Frontend, כי נכונות הטקסט לא תלויה בלוגיקת ממשק |
| אבטחה (12) | לאשר את רשימת ה-diff בסעיף 5, ו-CSP: `base-uri 'none'`, `object-src 'none'`, `form-action 'self'` (לא יורשים מ-`default-src`) |

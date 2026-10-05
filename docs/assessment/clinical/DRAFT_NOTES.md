# הערות טיוטה: מנסח התוכן הקליני (תפקיד 5)

סטטוס: טיוטה 1.1 · 2026-10-04 · נימוקים ומקורות ל-`REVIEW_FOR_HADAS.md`.
סבב 2: נוספו סעיף 7 (מזהים יציבים: תחומים, מטרות, דגלים, סימני "מתי לפנות") וסעיף 8 (טיוטת משפטי בדיקה לדגלים).
סבב 3: §7 יושר מול `ARCHITECTURE.md`. `core_sudden_evaluated` לא קריטי, נוסף הפרט `lang_narrative`, ו-`wtc_lang_gap` הוצא משימוש.
סבב 4: **§9 מחליף את רשימת ה-goals של §7** (34 מטרות → 18; עד סבב 6 נכתב כאן "17" בטעות, וב-`goals_v2` יש 18 מזהים). הסלוטים, הדגלים וה-wtc של §7 נשארים בתוקף, עם השינויים שמפורטים ב-§9.
סבב 5: נוספו ל-§9 ארבעה סלוטי ניתוב שהארכיטקט בקש (`ARCHITECTURE.md` §1.4, שורות 161 ו-174–178): `core_relation_detail`, `reporter_role`, `self_declared_minor`, `document_request` (בלוק `routing_slots`). שלושה שאלות פתוחות לארכיטקט ב-`routing_slots_open_questions`.
סבב 6 (ממצאי אימות הסגירה: מבקר תכנון ממצא 5 ו-4ב, משפטי L-05 ו-ק-1): רשימת הבליעה כבר לא מדולגת כשהנוירולוגית חלה, והחריג "במעקב" צומצם לנוסח של REVIEW 3.3 (§9); ספירת המטרות תוקנה ל-18; §9.2 (תוויות למעצב השיחה), §9.3 (עמדות על D-02, D-13 ועל המחלוקת "דאגה"), §9.4 (לארכיטקט, לסבב הבא שלו).
הקובץ הזה הוא רקע לצוות, לא תוכן מאושר. **אין להשתמש בשום דבר מכאן במוצר לפני שהדס מאשרת.**

## 1. מה נקרא

- `docs/assessment/GOALS.md` (מקור סמכות), `TEAM.md` (כרטיס תפקיד 5), `HANDOFF_LOG.md`.
- דפי האתר: `src/pages/Services.jsx`, `About.jsx`, `Home.jsx`, `OnlineTherapy.jsx`, `BneiBrak.jsx`, `Contact.jsx`.
- תוכן ה-CMS: `public/content/pages/{services,about,home,contact}.yml`.
- דפי נחיתה: `src/data/landingPagesData.js` (גמגום, קול, פה, היגוי). אין תיקייה `public/landing/`, והדפים נבנים מהקובץ הזה.
- בלוג: `public/content/blog/*.md` (17 קבצים), `src/content/blog/` (10), `src/data/blogPostsData/`, `public/sitemap.xml`.

## 2. ממצאים מהאתר

**מה הדס מציגה בפועל**

- חמשת התחומים מהמערכת הישנה, כלומר קול, היגוי, גמגום, תפקודי פה ומובנות, מופיעים בכל דפי השירות.
- **התפתחות שפה בגיל הרך** מוצגת גם היא, אף שלא הופיעה במערכת הישנה. היא מופיעה בדף בני ברק ("איחור שפתי"), בדף אונליין ("התפתחות שפה ודיבור… עיכוב שפתי") ובדף אודות ("ליווי התפתחותי שפתי לגיל הרך"). בנוסף יש בדף אודות השתלמות "הערכה והתערבות בפעוטות בגיל 0–שנתיים". לכן הצעתי את התחום כ"בתחום" (שורה 1.6).
- ההשתלמויות בדף אודות כוללות לידקומב, אפרקסיה, תפקודי פה, צרידות, "מניפולציות לרינגיאליות, קול ובליעה" ו"חשיבה חברתית" לגילאי 4–7. מכאן ההחלטה לסמן את 1.8 (אפרקסיה) ואת 1.12 (תקשורת חברתית) כ"לבירור" ולא כ"לא בתחום".
- בשירות "מובנות דיבור" כתוב גם "לאנשים לאחר אירועים רפואיים המשפיעים על הדיבור". זה רמז לכך שחלק מהתחום הנוירולוגי אולי בתחומה, וזו הסיבה שזה מופיע כשאלה ב-1.9.
- בדף הנחיתה "פה" יש אפשרויות טופס למבוגרים, "קשיי בליעה" ו"כאבים או מתח בלסת", ואצל ילדים מופיעים "קשיי לעיסה ואכילה" ו"בררנות אכילה קיצונית". זה בסתירה מסוימת להצעה להפנות בליעה, ולכן זה עלה כשאלות 2 ו-3 להדס.

**מאמרים שקיימים כקבצים אבל לא מפורסמים**

הקבצים שלא מפורסמים: הפרעות קשב, בליעה בגיל השלישי, שבץ, פגיעת ראש, הפרעות נרכשות במבוגרים, אוטיזם ודיסלקציה. הם נמצאים רק ב-`public/content/blog/` ולא ב-`sitemap.xml`. לא הסתמכתי עליהם כראיה לכך שהתחומים האלה בתחומה.

**סתירות באתר (לטיפול של אליה או של הדס, לא שלי)**

- **משך מפגש:** בדף יצירת קשר (`contact.yml`) כתוב "כחצי שעה", ובדפי אונליין, בני ברק ונחיתת הגמגום כתוב "כ-45 דקות".
- **קופות:** בדף יצירת קשר כתוב "בחלק מהמקרים ניתן לקבל החזר מקופות החולים", ובדפי אונליין ובני ברק כתוב "אני עובדת כקלינאית תקשורת פרטית… לבדוק מול הביטוח המשלים".
- **סף שפה בבלוג:** במאמר "איחור בהתפתחות שפה" הסף לגיל 18–24 חודשים הוא "פחות מ-10 מילים". הסף המקובל במחקר על late talkers מחמיר יותר: פחות מ-50 מילים, או שאין צירופי שתי מילים, בגיל 24 חודשים. הצגתי להדס את שני הספים.
- בדף אודות (`About.jsx`) יש fallback שבו מופיעות השתלמויות שנראות כמו placeholder: "קורס בטיפול בגמגום – ד"ר יוסי כהן", "ד"ר מיכל לוי". מבחינת תוכן קליני זה לא רלוונטי, אבל כדאי לוודא שזה לא מוצג בשום מקום.

## 3. החלטות עיצוב בטיוטה ונימוקן

| החלטה | נימוק |
|---|---|
| שתי דרגות לדגל אדום: א, חירום (101), ו-ב, קודם רופא | לא כל דגל הוא חירום. ירידה בשמיעה, נסיגה ובליעה דורשות רופא בימים הקרובים, לא אמבולנס. אם יש רק הודעה אחת, היא תהיה מבהילה מדי או רכה מדי |
| צרידות בלי סימנים נלווים היא "תנאי מקדים" ולא דגל (אפשרות א) | הדס עצמה כתבה באתר שבדיקת אא"ג היא חובה לפני טיפול קול. אם כל צרידות תיחשב דגל, הדס תאבד את קהל הליבה שלה. מה שדחוף באמת הוא צרידות עם סימני סיכון |
| סעיף 5 משמש פעמיים: מספיק סימן אחד כדי לקבל תוצאה 1, והרשימה מוצגת גם במסך של תוצאה 3 | רשימה אחת לאישור במקום שתיים, ועקביות: מה שמוביל לתוצאה 1 הוא בדיוק מה שאומרים לפונה לחפש |
| "לא יודע/ת" על פרט ★ מוביל לתוצאה 2 | לפי GOALS.md: "כל הפרטים הקריטיים מולאו (לא 'לא יודע')" |
| המלצה של גורם מקצועי לפנות לקלינאית מונעת תוצאה 3 (4.1.8) | המערכת לא צריכה לסתור גננת, רופא או אורתודנט. זה גם סיכון משפטי ברור |
| דאגה משמעותית של הפונה מונעת תוצאה 3 | הבלוג של הדס מונה "קיימת דאגה הורית משמעותית" כסיבה לפנות. זה תואם גם לפרקטיקה המקובלת |
| ל"מבוגר אחר" יש סט מינימלי של פרטים גם כשהתחום מחוץ לתחומה (2.6) | גם הפניה נכונה וזיהוי של 101 דורשים לדעת אם השינוי פתאומי ואם האדם כבר נבדק |
| גמגום פתאומי אצל ילד בגיל הגן לא נחשב דגל 3.1 | אצל חלק ניכר מהילדים הגמגום ההתפתחותי מתחיל בפתאומיות (תוך ימים). בלי ההחרגה, 3.1 יפעיל אזעקת שווא על הקהל המרכזי של הדס |
| דגלים נבדקים בשני אופנים: פסיבי (כל אזכור, בכל רגע) ואקטיבי (שאלות סינון לפי תחום) | הפונה לא תמיד יזכיר את הסימן בעצמו. ובמקביל, סימן שהוזכר בדרך אגב לא יכול להיבלע |
| לא ניסחתי את ההודעות הקבועות | זה תפקיד 3. נתתי רק לאן כל הודעה מפנה ואת הדרגה שלה |

## 4. מקורות לפרקטיקה מקובלת (ומה לא בטוח)

הטענות במסמך מוצגות להדס כהצעות. אלה המקורות שעליהם הסתמכתי, מהזיכרון המקצועי ולא מבדיקה מקוונת בסשן הזה. מי שמשתמש בהם בהמשך צריך לבדוק אותם.

| נושא | מקור מקובל | מה הצעתי | ודאות |
|---|---|---|---|
| סימני אירוע מוחי | FAST / BE-FAST, ומד"א 101 | 3.1: פתאומי ועוד לא נבדק, ולכן 101 | גבוהה |
| צרידות | AAO-HNS Clinical Practice Guideline: Hoarseness (Dysphonia), עדכון 2018: לרינגוסקופיה אם הצרידות לא חולפת תוך 4 שבועות, או מיד כשיש חשד לסיבה חמורה. NICE NG12: צרידות מתמשכת ולא מוסברת בגיל 45 ומעלה מצדיקה מסלול חשד לסרטן. הבלוג של הדס: "שבועיים-שלושה" בילדים, "מעל שלושה שבועות" בגיל המבוגר | 3 שבועות לאא"ג יחד עם סימני סיכון (3.4). שבועיים כסף שמונע תוצאה 3 (4.1.5) | בינונית: הסף בפועל הוא החלטה של הדס |
| בדיקת אא"ג לפני טיפול קול | ASHA Practice Portal, Voice Disorders. נכתב גם בדף "קול" באתר | תנאי מקדים | גבוהה |
| ירידה פתאומית בשמיעה | AAO-HNS Clinical Practice Guideline: Sudden Hearing Loss, עדכון 2019: הערכה מהירה, וחלון הטיפול קצר | 3.6: דרגה ב, דחוף | גבוהה |
| סימני בליעה | ASHA Practice Portal, Adult Dysphagia: שיעול או השתנקות בארוחה, דלקות ריאה חוזרות, ירידה במשקל | 3.3 | גבוהה |
| גמגום אצל ילדים | Yairi & Ambrose: כ-75–80% מחלימים מעצמם. גורמי סיכון להתמדה: משך מעל 6–12 חודשים, היסטוריה משפחתית, הופעה מאוחרת, מין זכר, קושי שפתי נלווה. ASHA, Childhood Fluency Disorders. Lidcombe Program לגיל הגן | שום גמגום לא מקבל תוצאה 3 (4.1.1). המשך גמגום של "3–6 חודשים" כסימן | בינונית לגבי משך הזמן |
| גמגום נרכש אצל מבוגר | ASHA: גמגום נוירוגני או פסיכוגני | 3.7: קודם רופא | גבוהה |
| איחור שפתי | Rescorla (LDS): פחות מ-50 מילים, או שאין צירופים, בגיל 24 חודשים. ה-"red flags" של AAP/CDC: אין מילים עד 16 חודשים, אין צירופי שתי מילים עד 24 חודשים, ואובדן שפה או מיומנויות חברתיות בכל גיל מצדיק הערכה מיידית | 5.5 ו-3.5 | גבוהה לגבי נסיגה, בינונית לגבי הספים |
| מובנות | Coplan & Gleason (1988): זרים מבינים כ-50% בגיל שנתיים, כ-75% בגיל 3, וכמעט הכול בגיל 4. כלל האצבע "גיל חלקי 4" (Flipsen 2006) | 5.2 | בינונית: זה כלל אצבע, והנתונים מבוססים על אנגלית |
| רכישת צלילים בעברית | לא מצאתי מקור ודאי בזיכרון. דף ההיגוי באתר: "רוב הצלילים נרכשים עד גיל 4-5". שיבוש צדי נחשב לא התפתחותי בכל גיל, לפי פרקטיקה באנגלית | 5.2, מסומן "לא בטוח" | נמוכה |
| גילאים לתפקודי פה, ריור, מוצץ, וגיל מינימלי לטיפול קול בילדים | פרקטיקה כללית, בלי מקור חד | מסומנים כולם "לא בטוח" | נמוכה |
| קווי סיוע | ער"ן 1201, סה"ר (צ'אט), מוקד 118 של משרד הרווחה, מד"א 101, משטרה 100 | 3.8 ו-6.17 | גבוהה, אבל **לאמת לפני ההשקה** |
| חובת דיווח | חוק העונשין, סעיף 368ד: חובת דיווח של אנשי מקצוע, כולל מקצועות הבריאות, על חשד סביר לפגיעה בקטין | שאלה למבקר הסיכונים המשפטיים ולעורך הדין | לבדיקת עורך דין |

## 5. מה לא עשיתי, בכוונה

- לא ניסחתי את ההודעות הקבועות, את השאלות לפונה או את מסכי התוצאה. זה תפקיד 3.
- לא המרתי לפורמט שמכונה קוראת. זה ייעשה אחרי שהדס תאשר, בפורמט של הארכיטקט.
- לא מילאתי מחירים, קופות, שמות או הסמכות. גם בעמודת "מה כתוב באתר" בדף העובדות רק ציטטתי, כעזר להדס.
- לא קבעתי היקף. כל השורות במטריצה הן הצעות.

## 6. שאלות פתוחות לפי תפקיד

**→ ארכיטקט**

1. ~~האם תוצאה 5 יכולה להכיל שתי דרגות?~~ סבב 2: `red-flags.schema.json` כבר תומך ב-`emergency` ו-`urgent`. **חסר ערך שלישי** לדרגה ג (`distress`, `child_safety`), שאינה רפואית. ההצעה: להוסיף `severity: hotline`. אם לא, למפות ל-`urgent` עם נוסח משלו, וזה פחות טוב, כי `urgent` פירושו "לך לרופא".
1א. (סבב 2) `sudden_onset` לא יכול להיות regex על "פתאום", כי הורים מתארים כך גמגום התפתחותי. regex מיידי מתאים רק לביטויים ספציפיים. מעבר לזה צריך `extractor_signal` יחד עם `condition` (ראו סעיף 7). כש-`core_sudden_evaluated` לא ידוע, הדגל עולה בלי שאלת confirm.
1ב. (סבב 2) דגל שעולה באותו תור עם כוונת FAQ גובר על תשובת ה-FAQ. דגל שעלה לא מתבטל כשהפונה חוזר בו (REVIEW §3, כללים 1 ו-2).
2. האם אפשר לצרף "משנה" לתוצאה 1 או 2? יש שני מקרים: שורת הפניה נוספת כשיש קושי מעורב, חלק בתחום וחלק בהפניה (4.0.1), ושורת "בדיקת אא"ג לפני טיפול קול" (אפשרות א בסעיף 3).
3. סכמת הפרטים צריכה ערכים מפורשים: "לא ידוע", "סותר" ו"לא נשאל". בלעדיהם אי אפשר לאכוף את התנאי של תוצאה 3.
4. שלושת סוגי הפונים לא מכסים מי שאינו הורה, למשל גננת, סבתא או מטפלת שפונות על ילד. צריך להחליט איך ממפים אותם.
5. כשיש כמה קשיים בכמה תחומים: סדר העדיפות שהצעתי הוא 5, אחר כך 1, אחר כך 2, אחר כך 4, ואחר כך 3.

**→ מעצב שיחה**

1. ניסוח ההודעות לשתי דרגות הדגל, רגוע ולא אבחנתי ("סימנים כאלה צריכים בדיקה רפואית", ולא "זה נשמע כמו שבץ").
2. איך לשאול את שאלות הסינון (2.1.3, 2.6.1) בלי להבהיל, ובתוך תקציב של כחמש דקות. אפשר לאחד אותן לשאלה אחת.
3. איך המערכת מגיבה כשהפונה משתמש במונח אבחנתי ("יש לו אפרקסיה") בלי לאמץ אותו.
4. ניסוח פשוט של רשימות סעיף 5 לפונים.
5. (סבב 2) שמות הדגלים: `regression` הופך ל-`child_regression`, ובמקום `voice_persistent` יש `voice_risk`. הסיבה: צרידות ממושכת לבדה אינה דגל באפשרות א. כן נוסף `distress`, בדרגה ג.
6. (סבב 2) `redflag.emergency` צריך לכסות גם "התחיל לפני כמה ימים ועוד לא נבדק", בניסוח "היום". הנוסח הנוכחי ("בשעות או בימים האחרונים") מתאים. בנוסף, ההודעה של `adult_new_change` צריכה שורה של "אם זה הופיע פתאום — 101".
7. (סבב 2) לשאלה של 2.0.7א (סימנים נלווים) צריך ניסוח שלא יבהיל הורה לילד שמגמגם.

**→ מבקר סיכונים משפטיים**

1. האם קבוצות 4.1 מספיקות כדי שתוצאה 3 תהיה הגנתית? ואולי עדיף לבטל אותה?
2. 3.8.1, מצוקה או פגיעה עצמית: האם המערכת חייבת לעשות משהו מעבר להודעה? ההצעה בסבב 2 (3.8.5): בלי התראה מיידית להדס, ורק פס "עלה דגל" בסיכום אם הפונה משאיר פרטים. האם זה מספיק, ואולי יוצר חשיפה?
3. 3.8.2, גילוי על פגיעה בילד: האם גילוי שמגיע להדס דרך הסיכום יוצר חובת דיווח לפי סעיף 368ד?
4. מתבגר שפונה על עצמו: מאיזה גיל הוא יכול לתת הסכמה ולהשאיר פרטים?
5. מידע רפואי על "מבוגר אחר" שנמסר בלי ידיעתו או הסכמתו.
6. הפניה בשמות ספציפיים, לעומת הפניה לפי סוג בלבד: האם יש בזה חשיפה?
7. ציטוט מספרי קווי סיוע: מי מאמת אותם ובאיזו תדירות.

**→ הדס:** ראו סעיף 8 במסמך הסקירה (19 שאלות).

**→ אליה (לא קליני):** שתי הסתירות באתר (משך מפגש, קופות) ותוכן ה-placeholder בדף אודות. ראו סעיף 2.

## 7. מזהים יציבים, v1 (סבב 2)

**סבב 3, מאושר מול `ARCHITECTURE.md` §1.4 ו-§22:**

- **מזהי פרטים במטרה שממלאת שניים:** מאושר כמו שהארכיטקט הציע: `voice_duration_weeks` + `voice_duration_recurring`, `lang_expressive_words` + `lang_expressive_combining`, `oral_concern` + `oral_referrer`, `core_concern_text` + `domain`. נוסף פרט שלישי ל-`lang_expressive`: `lang_narrative` (ראו למטה).
- **`domain` כ-multi_enum:** מאושר. `dom=X` כאן פירושו `contains`. כלל תוצאה 4 ("הכול בהפניה") פירושו שכל הערכים ב-`domain` שייכים לתחומי ההפניה.
- **גיל בפרט אחד, בחודשים (`core_age_months`):** מאושר. 4.5 שנים = 54 חודשים, 5 שנים = 60, 6 = 72, 7 = 84. מוצע `conflict_tolerance: 3`, כי 18 מול 24 חודשים זו סתירה שמשנה את הסף.
- **`core_sudden_evaluated`:** עכשיו `critical: false`. זה תקין קלינית: הדגל מטפל ב-missing ו-unknown כ"לא נבדק" (דרך `status_in`), ולכן ההגדרה רק מוסיפה מקרים שבהם הדגל עולה, לא מורידה. בנוסף, מקרה עם סימן פתאומי לא מגיע לתוצאה 3 בכל מקרה (בגלל הדגל, או 4.1.4).
- **`wtc_lang_gap`: הוצא משימוש** (המזהה לא חוזר לשימוש). הוא נשען על הסקה, ותוכן קליני לא מוסיף בו מעבר לספים: דיבור נמוך כבר מפעיל את `wtc_lang_18m`, `wtc_lang_24m` ו-`wtc_lang_36m`. פער שהפונה מתאר נרשם ב-notes לסיכום להדס.
- **`wtc_lang_48m`:** מחושב עכשיו מפרט מפורש, `lang_narrative`.
- **ספק בדגל (§22 שאלה 5):** ב-`sudden_onset` הספק אחרי שאלת הבירור מעלה את הדגל **בדרגה א**, כלומר בלי `doubt_tier`, כי ההחמצה כאן חמורה מדי. בשאר הדגלים: `doubt_tier: urgent`.
- **`form_after_message` (§22 שאלה 3), הצעה עד להכרעת הדס:** בדגלי emergency הערך הוא `secondary` (או `none` אם הדס בוחרת בהמלצת UX). בדגלי urgent וב-hotline הערך הוא `secondary`, כי הפעולה העיקרית בהודעה היא הרופא או קו הסיוע.
- **`reporter_role` (§22 שאלה 6):** הערכים מאושרים (הורה / בן משפחה אחר / איש מקצוע / אחר). גננת וצוות חינוכי נכללים ב"איש מקצוע".

**הכללים:**

- מזהה קיים לא משתנה. פריט שהדס מוחקת יוצא משימוש, והמזהה שלו לא חוזר לשימוש.
- פורמט: snake_case, לפי `common.schema.json` (`entityId` ו-`slotId`). נקודות אסורות במזהים האלה, ולכן `stuttering_onset` ולא `stuttering.onset`.
- מזהי טקסט של מעצב השיחה נגזרים מכאן: `goal.<id>.ask|clarify|rephrase` · `when_to_contact.<wtc_id>` · `redflag.type.<flag_id>`.
- `prio`: מטרה עם ערך גבוה נשאלת קודם (כמו `goalDef.priority`). `crit: true` הוא ★. `goal: false` הוא סלוט אופורטוניסטי: נאסף רק אם הוזכר, בלי שאלה, ולכן הוא לא יכול לחסום תוצאה 3.
- `ref` הוא מספר הפריט ב-`REVIEW_FOR_HADAS.md`. `uncertain` פירושו "לא בטוח — לאישור הדס".
- **הכול הצעה עד שהדס מאשרת.**

```yaml
domains:   # ערכי ה-domain שמוסק מ-core_concern (confirm_in_wrap_up). ערך = שורה במטריצה
  voice: "1.1"
  articulation: "1.2"
  stuttering: "1.3"
  oral_function: "1.4"
  intelligibility: "1.5"
  early_language: "1.6"
  school_language: "1.7"
  apraxia: "1.8"
  adult_acquired: "1.9"
  adult_swallowing: "1.10"
  child_feeding: "1.11"
  social_communication: "1.12"
  hearing: "1.13"
  literacy: "1.14"
  voice_coaching: "1.15"
  other: "1.16"

goals:
  core:   # לכל פונה. rel = core_relation, age = core_age, dom = domain
    - {id: core_relation,         prio: 1000, crit: true,  ref: "2.0.1", values: [self, child, other_adult]}
    - {id: core_concern,          prio: 990,  crit: true,  ref: "2.0.3", note: "ציטוט + domain מוסק"}
    - {id: core_age,              prio: 980,  crit: true,  ref: "2.0.2", note: "שנים; מתחת לגיל 3 גם חודשים"}
    - {id: core_onset_pattern,    prio: 970,  crit: true,  ref: "2.0.4", values: [longstanding, gradual, sudden, recent_4w, unknown], note: "recent_4w = התחיל בתוך 4 שבועות, גם בלי המילה 'פתאום'"}
    - {id: core_sudden_signs,     prio: 968,  crit: true,  ref: "2.0.7א", applies: "core_onset_pattern in [sudden, recent_4w], או unknown כש-rel!=child", values: [speech_difficulty, slurred, comprehension, word_finding, swallowing, face_droop, limb_weakness, confusion, seizure, drowsiness, head_injury, none], note: "רמז לחלץ: חזרות, הארכות וחסימות (גמגום) אינן speech_difficulty"}
    - {id: core_sudden_evaluated, goal: false, crit: false, ref: "2.0.7א", values: [evaluated, not_evaluated, unknown], note: "לא שואלים לפני הדגל. אזכור של אשפוז, אבחנה או 'אחרי השבץ' = evaluated. unknown נחשב not_evaluated"}
    - {id: core_onset_time,       prio: 700,  crit: true,  ref: "2.0.4", applies: "dom not in [voice, stuttering, early_language]"}
    - {id: core_impact,           prio: 600,  crit: true,  ref: "2.0.6", values: [avoidance, frustration, teasing, work_school, worry, none_reported]}
    - {id: core_prof_recommended, prio: 590,  crit: true,  ref: "2.0.7", values: [yes, no, unknown], note: "+ מי המליץ (ציטוט)"}
    - {id: core_prior_eval,       prio: 200,  crit: false, ref: "2.0.8", note: "רק אם נשארו תורות בתקציב"}
    - {id: core_setting_pref,     prio: 150,  crit: false, ref: "2.0.9", values: [clinic, online, either]}
    - {id: core_hopes,            prio: 100,  crit: false, ref: "2.0.10"}

  voice:  # applies: dom=voice
    - {id: voice_duration,         prio: 920, crit: true, ref: "2.1.1", note: "מספר שבועות + recurring (בוליאני). מספר ולא טווחים, כי הסף עוד פתוח"}
    - {id: voice_risk_signs,       prio: 910, crit: true, ref: "2.1.3", values: [breathing, swallow_pain_or_difficulty, blood, neck_lump, weight_loss, ear_pain, after_surgery_intubation_trauma, none]}
    - {id: voice_ent_exam,         prio: 800, crit: true, ref: "2.1.2", values: [seen, not_seen, unknown], note: "+ מה נאמר (ציטוט)"}
    - {id: voice_symptoms,         prio: 795, crit: true, ref: "2.1.7", values: [pain, effort, fatigue, end_of_day_loss, none]}
    - {id: voice_recent_illness,   prio: 790, crit: true, ref: "2.1.5", applies: "voice_duration < 2 שבועות"}
    - {id: voice_smoking,          prio: 780, crit: true, ref: "2.1.4", applies: "rel!=child", uncertain: true}
    - {id: voice_professional_use, goal: false, ref: "2.1.6"}
    - {id: voice_child_strain,     goal: false, ref: "2.1.8", applies: "rel=child"}

  speech:  # applies: dom in [articulation, intelligibility]. speech_understood_by חל גם על early_language מגיל 30 חודשים
    - {id: speech_since_childhood,  prio: 900, crit: true, ref: "2.2.4", applies: "rel!=child", values: [since_childhood, new, unknown], note: "new מפעיל את adult_new_change"}
    - {id: speech_scope,            prio: 850, crit: true, ref: "2.2.1", values: [one_two_sounds, overall_unclear, unknown]}
    - {id: speech_understood_by,    prio: 840, crit: true, ref: "2.2.2, 2.5.9", values: [everyone, family_not_strangers, family_struggles, unknown]}
    - {id: speech_language_concern, prio: 830, crit: true, ref: "2.2.3", applies: "rel=child", note: "yes ו-age<6 מפעילים גם את מטרות lang"}
    - {id: speech_hearing_history,  goal: false, ref: "2.2.5"}
    - {id: speech_sound_quality,    goal: false, ref: "2.2.6", values: [interdental, lateral_wet, other]}

  stuttering:  # applies: dom=stuttering
    - {id: stuttering_since_childhood, prio: 900, crit: true, ref: "2.3.2", applies: "rel!=child", values: [since_childhood, new_in_adulthood, unknown]}
    - {id: stuttering_onset,           prio: 850, crit: true, ref: "2.3.1", applies: "rel=child", note: "חודשים מאז ההתחלה (מספר)"}
    - {id: stuttering_struggle,        prio: 840, crit: true, ref: "2.3.3", values: [part_word_repetitions, prolongations, blocks, physical_tension, whole_word_repetitions_only, unknown]}
    - {id: stuttering_awareness,       prio: 830, crit: true, ref: "2.3.4", values: [aware, frustrated, avoids, not_noticed, unknown]}
    - {id: stuttering_family_history,  goal: false, ref: "2.3.5"}
    - {id: stuttering_co_concerns,     goal: false, ref: "2.3.6"}

  oral:  # applies: dom=oral_function. oral_swallow_screen חל גם על child_feeding
    - {id: oral_swallow_screen,   prio: 910, crit: true, ref: "2.4.3", values: [choking_coughing, weight_loss, none]}
    - {id: oral_concern_referrer, prio: 850, crit: true, ref: "2.4.1", values: [tongue_thrust, mouth_breathing, snoring, drooling, chewing_textures, jaw, other], note: "+ referrer [orthodontist, dentist, pediatrician, none]. ממלא גם את core_prof_recommended"}
    - {id: oral_airway_ent,       prio: 800, crit: true, ref: "2.4.2", applies: "oral_concern_referrer כולל mouth_breathing או snoring", uncertain: true}
    - {id: oral_ortho_status,     goal: false, ref: "2.4.4"}
    - {id: oral_habits,           goal: false, ref: "2.4.5", values: [drooling, thumb_sucking, pacifier]}
    - {id: oral_speech_effect,    goal: false, ref: "2.4.6"}

  lang:  # applies: dom=early_language, או speech_language_concern=yes ו-age<6
    - {id: lang_regression,       prio: 930, crit: true, ref: "2.5.4", values: [yes, no, unknown]}
    - {id: lang_expressive,       prio: 850, crit: true, ref: "2.5.2", note: "lang_expressive_words (מספר משוער) + lang_expressive_combining [none, two_words, sentences] + lang_narrative [tells_events, partial, cannot_tell] (crit, applies: core_age_months ≥ 42; סבב 3). אצל דו-לשוניים סופרים את שתי השפות יחד"}
    - {id: lang_comprehension,    prio: 840, crit: true, ref: "2.5.3", values: [follows_simple, partial, not_following, unknown]}
    - {id: lang_hearing,          prio: 830, crit: true, ref: "2.5.5", values: [tested_ok, not_tested, concern, unknown]}
    - {id: lang_social,           prio: 820, crit: true, ref: "2.5.6", note: "קשר עין, הצבעה, תגובה לשם, משחק. לא לאבחנה, רק כדי להוסיף הפניה ל-1.12"}
    - {id: lang_home_languages,   goal: false, ref: "2.5.7"}
    - {id: lang_others_concerned, goal: false, ref: "2.5.8", note: "ממלא גם את core_prof_recommended"}

  adult:  # applies: rel=other_adult, או dom in [adult_acquired, adult_swallowing]. 2.6.1 ממופה לשני ה-core_onset_*, ו-2.6.2 ל-core_sudden_*
    - {id: adult_swallow_screen,  prio: 910, crit: true, ref: "2.6.3", values: [choking_coughing, food_stuck, pneumonia, weight_loss, none]}
    - {id: adult_in_rehab,        goal: false, ref: "2.6.4"}
    - {id: adult_known_diagnosis, goal: false, ref: "2.6.5"}
    - {id: adult_subject_aware,   goal: false, ref: "2.6.6"}

red_flags:   # severity בחוזה: emergency | urgent. דרגה ג (hotline) עוד לא קיימת בחוזה, ראו §6 ארכיטקט 1
  - id: sudden_onset
    tier: emergency                    # דרגה א
    ref: "3.1"
    directs_to: "מד\"א 101 או מיון, עכשיו או היום"
    after: end                         # הטופס רק כקישור משני
    condition: >-
      core_sudden_signs ≠ none
      AND (core_onset_pattern in [sudden, recent_4w]
           OR (rel!=child AND core_onset_pattern=unknown אחרי שאלת confirm אחת))
      AND core_sudden_evaluated ≠ evaluated
    exclusion: "rel=child AND age<7 AND dom=stuttering AND core_sudden_signs=none → לא דגל"
    trigger_note: "לא regex על 'פתאום'. regex מיידי רק לביטויים ספציפיים (צניחת פנים, חולשה ביד או ברגל, 'מדבר מעורפל' או 'מדבר כבד'). כל השאר: extractor_signal + condition"
  - {id: airway,              tier: emergency, ref: "3.2", directs_to: "101 עכשיו", after: end}
  - {id: swallowing,          tier: urgent,    ref: "3.3", directs_to: "רופא/ת משפחה או אא\"ג בימים הקרובים. חנק עכשיו → airway", after: offer_form, condition: "oral_swallow_screen או adult_swallow_screen ≠ none, או voice_risk_signs כולל swallow_pain_or_difficulty, או אזכור בכל שלב"}
  - {id: voice_risk,          tier: urgent,    ref: "3.4", directs_to: "אא\"ג בהקדם", after: offer_form, condition: "(voice_duration > 3 שבועות [uncertain] AND (voice_risk_signs ≠ none OR voice_smoking=yes)) OR voice_risk_signs כולל after_surgery_intubation_trauma. באפשרות ב נוסף: voice_duration > 3 שבועות AND voice_ent_exam ≠ seen", note: "מחליף את voice_persistent שהציע מעצב השיחה"}
  - {id: child_regression,    tier: urgent,    ref: "3.5", directs_to: "רופא/ת ילדים בהקדם", after: offer_form, condition: "lang_regression=yes", note: "קרה בתוך שעות, או יחד עם סימן מ-core_sudden_signs → sudden_onset. מחליף את regression שבטיוטה של texts.he.md"}
  - {id: sudden_hearing_loss, tier: urgent,    ref: "3.6", directs_to: "אא\"ג או מיון, היום או מחר", after: offer_form, note: "urgent, אבל הנוסח חייב לומר 'היום או מחר'"}
  - {id: adult_new_change,    tier: urgent,    ref: "3.7", directs_to: "רופא/ת משפחה ומשם לנוירולוג/ית, + שורה 'אם זה הופיע פתאום — 101'", after: offer_form, condition: "(speech_since_childhood=new OR stuttering_since_childhood=new_in_adulthood OR החמרה הדרגתית בדיבור, בקול או בבליעה) AND NOT sudden_onset"}
  - {id: distress,            tier: hotline,   ref: "3.8.1, 3.8.3–3.8.5, 3.8.7", directs_to: "ער\"ן 1201, סה\"ר. בסכנה מיידית 101 או 100", after: offer_form, note: "במקרה ספק מציגים את ההודעה, בלי שאלת confirm. חל גם כשמדובר במבוגר אחר"}
  - {id: child_safety,        tier: hotline,   ref: "3.8.2, 3.8.6", directs_to: "מוקד 118 של משרד הרווחה. בסכנה מיידית 100", after: offer_form, note: "הנוסח ממתין לעורך הדין (חובת דיווח)"}

flag_policy:   # REVIEW §3, הכללים של סבב 2
  flag_preempts_faq: "דגל ושאלה נפוצה באותו תור → רק הודעת הדגל"
  no_retraction: "דגל שעלה לא מתבטל. שלילה באותו משפט אינה אזכור. תשובה לשאלת confirm אינה חזרה. כל הציטוטים נכנסים לסיכום להדס"
  doubt: "ספק בין דגל לבין לא-דגל → דרגה ב (ב-distress: ספק → מציגים את ההודעה)"
  every_turn_every_phase: "גם בתוך FAQ, בסיכום (wrap_up) ואחרי התוצאה"

when_to_contact:   # REVIEW §5. אחד מהם קיים → תוצאה 1. בתוצאה 3: מוצגים לפי התחום, ואחריהם outcome.3.when_to_contact.always
  voice:
    wtc_voice_persisting:      "voice_duration ≥ 2–3 שבועות (סף פתוח)"
    wtc_voice_pain_effort:     "voice_symptoms כולל pain, effort או fatigue"
    wtc_voice_end_of_day:      "voice_symptoms כולל end_of_day_loss"
    wtc_voice_recurring:       "voice_duration.recurring=true"
    wtc_voice_work_impact:     "core_impact כולל work_school"
    wtc_voice_child_hoarse:    "rel=child AND (wtc_voice_persisting OR recurring)"
    wtc_voice_ent_recommended: "core_prof_recommended=yes (אא\"ג)"
  speech:
    wtc_speech_errors_after_5:  "age ≥ 5 AND יש שיבוש (speech_scope ≠ unknown)"
    wtc_speech_interdental:     "age ≥ 4.5 AND speech_sound_quality=interdental (אופורטוניסטי, ולכן 4.1.10 מכסה)"
    wtc_speech_lateral:         "speech_sound_quality=lateral_wet (אופורטוניסטי, ולכן 4.1.10 מכסה)"
    wtc_speech_intelligibility: "(age≥3 AND speech_understood_by=family_struggles) OR (age≥4 AND speech_understood_by ≠ everyone)"
    wtc_speech_child_impact:    "rel=child AND core_impact כולל frustration, avoidance או teasing"
    wtc_speech_adult_impact:    "rel!=child AND core_impact ≠ none_reported"
  stuttering:   # לעולם לא תוצאה 3 (4.1.1). כאן רק כדי להבחין בין 1 ל-2
    wtc_stuttering_disfluency_type: "stuttering_struggle כולל part_word_repetitions, prolongations או blocks"
    wtc_stuttering_physical_effort: "stuttering_struggle כולל physical_tension"
    wtc_stuttering_awareness:       "stuttering_awareness in [aware, frustrated, avoids]"
    wtc_stuttering_duration:        "stuttering_onset ≥ 3–6 חודשים (סף פתוח)"
    wtc_stuttering_family_history:  "stuttering_family_history=yes (אופורטוניסטי)"
    wtc_stuttering_adult_avoidance: "rel!=child AND core_impact כולל avoidance"
  oral:
    wtc_oral_mouth_breathing:       "oral_concern_referrer כולל mouth_breathing"
    wtc_oral_tongue_thrust:         "oral_concern_referrer כולל tongue_thrust"
    wtc_oral_professional_referral: "core_prof_recommended=yes"
    wtc_oral_drooling:              "age ≥ 4 AND drooling (באחד משני הסלוטים)"
    wtc_oral_sucking_habit:         "age ≥ 4–5 AND oral_habits כולל thumb_sucking או pacifier (אופורטוניסטי, ולא חוסם תוצאה 3. פתוח: לשקול להוסיף את oral ל-4.1)"
    wtc_oral_chewing:               "oral_concern_referrer כולל chewing_textures (רק אם 1.11 בתחום)"
  lang:
    wtc_lang_12m:              "age ≥ 12 חודשים AND (אין מלמול, או לא מגיב לשם, או לא מצביע) לפי lang_social ו-lang_comprehension"
    wtc_lang_18m:              "age ≥ 18 חודשים AND מספר המילים = 0"
    wtc_lang_24m:              "age ≥ 24 חודשים AND (מספר המילים < 50 OR צירופים = none) (סף פתוח מול 10 בבלוג)"
    wtc_lang_36m:              "age ≥ 36 חודשים AND (צירופים ≠ sentences OR speech_understood_by=family_struggles OR lang_comprehension ≠ follows_simple)"
    wtc_lang_48m:              "core_age_months ≥ 48 AND (lang_narrative in [partial, cannot_tell] OR speech_understood_by ≠ everyone)"   # סבב 3: בלי ציטוט
    # wtc_lang_gap: הוצא משימוש בסבב 3. המזהה לא חוזר לשימוש
    wtc_lang_others_concerned: "lang_others_concerned=yes OR core_prof_recommended=yes"
```

**ספירה:** 34 מטרות פעילות (המגבלה היא 40) וכ-55 סלוטים (המגבלה היא 120). חלק מהמטרות ממלאות שני סלוטים: מספר + recurring, מילים + צירופים, ותחום + מי הפנה.

## 8. טיוטת משפטי בדיקה לדגלים (לפי `test_phrases_he` בחוזה)

אלה טיוטות לבדיקות היחידה ולסט הזהב (תפקידים 10 ו-11). חיובי = הדגל חייב לעלות. שלילי = הדגל לא צריך לעלות. שלילי לא אומר שאין תוצאה אחרת: הוא עשוי להוביל לתוצאה 1, 2 או 4, או לדגל אחר.

| דגל | חיובי | שלילי |
|---|---|---|
| `sudden_onset` | "כמה עולה פגישה? ודרך אגב אבא שלי בן 78, מהשבוע שעבר הדיבור שלו מעורפל" · "אמא שלי פתאום לא מצליחה למצוא מילים מאז הבוקר" · "בעלי התחיל לדבר כבד ביום שני והפה שלו קצת עקום" · "הבת שלי בת 6 קיבלה מכה בראש אתמול ומאז היא מדברת לא ברור" · "מאתמול אני לא מבין מה אומרים לי והיד שלי חלשה" | "הבן שלי בן 3 התחיל פתאום לגמגם לפני שבועיים" · "הבת שלי בת 4 מיום ליום התחילה להיתקע בתחילת מילים" · "אבא שלי עבר שבץ לפני שנה, אושפז ועבר שיקום, ועדיין קשה לו לדבר" · "אין לו שום חולשה ביד, הדיבור שלו כמו תמיד, רק הקול צרוד" · "אני מגמגם מגיל 5" |
| `airway` | "הילד נחנק עכשיו ולא מצליח לנשום" · "יש לי קוצר נשימה ושריקה כשאני נושם, והקול נעלם" · "הוא נושם ברעש חזק ומתקשה לנשום" | "כשאני מגמגם אני עוצר את הנשימה" · "הוא נושם דרך הפה בלילה" · "אני צריכה לקחת אוויר באמצע משפט כשאני מרצה" |
| `swallowing` | "אמא שלי משתעלת כל פעם שהיא שותה מים" · "יש לי תחושה שהאוכל נתקע לי בגרון, וירדתי במשקל" · "סבא כבר פעמיים חלה בדלקת ריאות, והוא נחנק מאוכל" | "אין לו שום בעיה לבלוע" · "הבן שלי בררן באוכל ולא אוהב ירקות" · "האורתודנט אמר שיש לה דחיקת לשון בבליעה" |
| `voice_risk` | "אני צרוד כבר חודשיים, מעשן, ויש לי כאב כשאני בולע" · "מאז הניתוח בבלוטת התריס לפני חודש הקול שלי חלש וצרוד" · "צרידות כבר חמישה שבועות, ומצאתי גוש בצוואר" | "אני צרודה שלושה ימים מאז הצינון" · "אני מורה וצרודה כבר חודש. הייתי אצל אא\"ג ואמרו לי יבלות" · "הקול שלי מתעייף בסוף היום" |
| `child_regression` | "הבן שלי בן שנתיים אמר הרבה מילים, ובחודשים האחרונים הפסיק לדבר" · "היא ידעה להגיד אמא ואבא, ועכשיו כבר לא אומרת" · "הוא איבד מילים שהיו לו לפני חצי שנה" | "הוא עדיין לא מדבר בגיל שנתיים" · "היא מדברת פחות ליד אנשים זרים" · "הוא לומד מילים חדשות כל הזמן" |
| `sudden_hearing_loss` | "התעוררתי הבוקר ואני כמעט לא שומע באוזן ימין" · "מאתמול השמיעה שלה ירדה פתאום" · "לפני יומיים השמיעה באוזן אחת נעלמה בבת אחת" | "יש לו דלקות אוזניים חוזרות" · "הוא עבר בדיקת שמיעה לפני חודש" · "הוא לא תמיד מגיב כשקוראים לו" |
| `adult_new_change` | "אני בן 40, ובחצי השנה האחרונה התחלתי לגמגם. אף פעם לא גמגמתי" · "בחודשים האחרונים הדיבור של אבא נהיה יותר ויותר לא ברור" · "הקול של אמא נחלש לאט לאט במשך השנה" | "אני מגמגם מילדות" · "תמיד דיברתי מהר ולא ברור" · "אבא שלי עבר שבץ ואושפז, ועכשיו מחפשים לו שיקום" |
| `distress` | "אני לא רוצה לחיות ככה יותר" · "חשבתי לפגוע בעצמי בגלל הגמגום" · "אבא שלי אומר שהוא רוצה למות מאז שהוא לא מצליח לדבר" | "נמאס לי לגמגם" · "זה מתסכל אותי מאוד בעבודה" · "הילד בוכה כשלא מבינים אותו" |
| `child_safety` | "בעלי מכה את הילד כשהוא מגמגם" · "אני חושבת שמישהו בגן פוגע בבת שלי" · "הילד מספר שמכים אותו בבית של סבא" | "הילדים בגן צוחקים עליו כשהוא מדבר" · "הוא נפל ונחבל בברך" · "המורה מבקשת ממנו לדבר לאט" |

**בדיקות מדיניות (לא לכל דגל בנפרד):**

- **חזרה בו:** "אמא שלי פתאום לא מצליחה לדבר מאתמול", ובתור הבא "סתם, זה לא פתאומי". הדגל `sudden_onset` נשאר, ושני הציטוטים מופיעים בסיכום.
- **FAQ:** המקרה של האב בן 78 (השורה הראשונה בטבלה). צריך להופיע רק `redflag.*`, בלי `faq.answer_frame`.
- **הבחנה:** "הבן שלי בן 3 התחיל פתאום לגמגם, ומאז אתמול הוא גם ישנוני ומקיא". כאן יש סימן נוסף, ולכן `sudden_onset` עולה.

## 9. תוכנית מטרות v2 (סבב 4, בתגובה ל-`reviews/critic_phase1.md`, ממצאים 3–5)

**יעד:** 2–3 שאלות אחרי ההודעה הראשונה בנתיב טיפוסי, לכל היותר 5, ועוד שאלת אימות אחת. מוצע `max_intake_turns: 6`, כשמטרות `safety_screen` פטורות ממנו (ממצא 2). הטבלה לכל נתיב מופיעה ב-REVIEW §2.7.

```yaml
purpose:   # שדה חדש ב-goalDef (בקשה לארכיטקט)
  routing:       "בלי זה אין תוצאה בכלל"
  safety_screen: "לא מדלגים לעולם. פטור מהתקרות"
  decision:      "יכול להפוך תוצאה 2 ל-1, או לאפשר 3"
  summary_only:  "לתיק בלבד. לכל היותר מטרה אחת כזו בשיחה, ורק אם עוד לא הגענו ליעד"

skip_rules:
  - "דגל עלה → עוצרים (כמו היום)"
  - "כל ה-domain בתחומי הפניה, אושר, והפרטים של REVIEW 4.4 נענו → תוצאה 4. מדלגים על כל השאר"
  - "סימן wtc אחד אמת → תוצאה 1 נעולה. מדלגים על decision. safety_screen עדיין נשאל"
  - "outcome3_enabled=false → signs_screen עדיין נשאל (הוא מכריע בין 1 ל-2), ו-would_be_outcome_3 נרשם כ-true, false או undetermined"

goals_v2:   # prio גבוה = קודם. applies: rel = core_relation, dom = domain (contains)
  - {id: core_relation,              purpose: routing,       prio: 1000, note: "כפתורים"}
  - {id: core_concern,               purpose: routing,       prio: 990,  note: "בדרך כלל מההודעה הראשונה. domain נכנס ל-confirm_recap"}
  - {id: core_age,                   purpose: routing,       prio: 980,  applies: "rel=child", note: "אצל מבוגרים: אופורטוניסטי, לא נשאל"}
  - {id: core_onset_pattern,         purpose: safety_screen, prio: 970,  applies: "rel=other_adult OR dom∋adult_acquired|adult_swallowing|hearing|other(adult) OR speech_since_childhood=new OR stuttering_since_childhood=new_in_adulthood", note: "לא בתחום הקול. 'צרוד 5 ימים' לא מפעיל סינון נוירולוגי"}
  - {id: speech_since_childhood,     purpose: safety_screen, prio: 950,  applies: "dom∋articulation|intelligibility AND rel!=child"}
  - {id: stuttering_since_childhood, purpose: safety_screen, prio: 950,  applies: "dom∋stuttering AND rel!=child"}
  - {id: voice_duration,             purpose: decision,      prio: 940,  applies: "dom∋voice", note: "נדרש לפני screen_voice (קובע אם להוסיף את פריטי 3 השבועות)"}
  - {id: stuttering_onset,           purpose: decision,      prio: 940,  applies: "dom∋stuttering AND rel=child", note: "≤1 חודש, או 'פתאום' → מפעיל screen_neuro (גרסת ילד)"}
  - {id: screen_neuro,               purpose: safety_screen, prio: 930,  applies: "(rel!=child AND core_onset_pattern in [sudden, recent_4w]) OR (rel=child AND השינוי מתואר כפתאומי או חדש)", note: "חדש. יש שתי גרסאות (מבוגר וילד). ממלא את screen_neuro_any"}
  - {id: screen_voice,               purpose: safety_screen, prio: 920,  applies: "dom∋voice", note: "חדש. ממלא את screen_voice_any"}
  - {id: screen_swallow,             purpose: safety_screen, prio: 920,  applies: "rel=other_adult OR dom∋adult_acquired|adult_swallowing|child_feeding OR oral_concern∋chewing_textures|drooling", note: "חדש. ממלא את screen_swallow_any. סבב 6: הוסר 'AND screen_neuro לא חל' (ראו screen_order למטה)"}
  - {id: lang_regression,            purpose: safety_screen, prio: 920,  applies: "rel=child AND (dom∋early_language|social_communication|apraxia|school_language OR speech_language_concern=yes)", note: "אותה משמעות כמו v1, ועכשיו כפורמט של שאלת סינון"}
  - {id: speech_scope,               purpose: decision,      prio: 900,  applies: "dom∋articulation|intelligibility AND rel=child", note: "בדרך כלל ממולא מההודעה הראשונה"}
  - {id: speech_understood_by,       purpose: decision,      prio: 890,  applies: "dom∋articulation|intelligibility AND rel=child"}
  - {id: lang_expressive,            purpose: decision,      prio: 900,  applies: "נתיב lang (כמו ב-§7)", note: "כפתורים: אין מילים / מילים בודדות / יותר מ-50 בלי צירופים / מחבר שתי מילים / משפטים"}
  - {id: oral_concern_referrer,      purpose: decision,      prio: 900,  applies: "dom∋oral_function"}
  - {id: signs_screen,               purpose: decision,      prio: 700,  note: "חדש. בחירה מרובה אחת לכל תחום (signs_sets). ממלא את סלוטי ה-wtc, את core_impact, את core_prof_recommended ואת סלוטי התוספות"}
  - {id: core_anything_else,         purpose: summary_only,  prio: 100,  note: "חדש ('יש עוד משהו שחשוב שהדס תדע?'). נשאל רק אם עוד לא הגענו ליעד"}

retired_as_goals:   # המזהים נשארים כסלוטים. הם ממולאים מהמסכים או באופן אופורטוניסטי. לא חוזרים לשימוש כמטרות
  [core_sudden_signs, core_onset_time, core_impact, core_prof_recommended, core_prior_eval, core_setting_pref, core_hopes,
   voice_risk_signs, voice_ent_exam, voice_symptoms, voice_recent_illness, voice_smoking,
   speech_language_concern, stuttering_struggle, stuttering_awareness,
   oral_swallow_screen, oral_airway_ent, lang_comprehension, lang_hearing, lang_social, adult_swallow_screen]

new_slots:
  screen_neuro_any:   {type: enum, values: [yes, no, unknown]}
  screen_voice_any:   {type: enum, values: [yes, no, unknown]}
  screen_swallow_any: {type: enum, values: [yes, no, unknown]}
  core_sudden_signs:  "ערך חדש: acute_neuro_child (מכה בראש, חולשה, בלבול או ישנוניות, פרכוס, בהקשר של ילד)"
  voice_risk_signs:   "swallow_pain_or_difficulty הוצא משימוש → swallow_difficulty + swallow_pain"
  swallow_followup:   {type: enum, values: [yes, no, unknown], goal: false, filled_by: extracted_quote, ref: "REVIEW 3.3, 4.4 (1.10)", note: "סבב 6. 'מעקב רפואי על הבליעה' שנאמר במפורש ('הוא במעקב במרפאת בליעה'). אופורטוניסטי, לא נשאל. missing/unknown = לא במעקב (הדגל מטפל)"}

routing_slots:   # סבב 5, בקשת הארכיטקט (ARCHITECTURE §1.4, שורות 161 ו-174–178). D-02 ו-L-15
  - id: core_relation_detail
    purpose: routing
    goal: core_relation        # ממולא באותה לחיצה; אינו נשאל כמטרה נפרדת
    crit: false
    type: enum
    values: [son, daughter, grandson, granddaughter, father, mother, spouse, sibling, other_relative, not_related]
    filled_by: button
    note: >-
      מכפתורי הפתיחה ("הבן שלי", "הבת שלי" וכו') ומ-q.relation.other_followup, יחד עם core_relation
      ו-reporter_role (אותה לחיצה; ARCHITECTURE §1.4 choice_sets). לא חל כש-core_relation=self (אין ערך
      "עצמי" ברשימה — הפונה הוא בעצמו המושא). תפקידו היחיד: subject_ref בנוסחים ("הבן שלך", "בתך") —
      לעולם לא שם (ARCHITECTURE §1.9). לא ★: לא קובע תוצאה 3 ולא כל תוצאה אחרת.
  - id: reporter_role
    purpose: routing
    goal: core_relation         # ממולא באותה לחיצה; אינו נשאל כמטרה נפרדת
    crit: false                 # לא ★ בהגדרה הטכנית (★=חוסם תוצאה 3 בלבד, §1.4). ראו שאלה פתוחה למטה
    type: enum
    values: [parent, other_family, professional, other]
    filled_by: button
    note: >-
      מכפתורי הפתיחה, אותה לחיצה כמו core_relation_detail. גננת/מורה/איש חינוך → professional (מאושר
      ב-§7). סבא/סבתא → other_family (D-02: "בינתיים כאן, עד תשובת עו\"ד"). שער ה-D-02
      (decision-table `routing_stops.non_parent_reporter`): core_relation=child AND reporter_role≠parent
      → נוסח קבוע, בלי טופס ובלי פרטים מזהים. אצל core_relation=other_adult נרשם לתיק בלי לשמש שער:
      "מבוגר על מבוגר אחר מותר, עם מינימום פרטים" (D-02). אצל core_relation=self אינו ממולא — ראו שאלה
      פתוחה למטה.
  - id: self_declared_minor
    purpose: routing
    goal: false                 # אין מטרה; מתגלה פסיבית בכל רגע, כמו דגל (flag_policy.every_turn_every_phase)
    crit: false                 # שער D-02 תלוי בו, אבל זה לא ★ בהגדרה הטכנית. ראו שאלה פתוחה למטה
    type: boolean
    filled_by: extracted_quote
    note: >-
      אופורטוניסטי בלבד — לא נשאל בשאלה פעילה, כי גיל לא נשאל אצל מבוגרים (`core_age` applies: rel=child,
      §9). מתגלה מציטוט מפורש ("אני בת 16", "אני בכיתה י'") בכל רגע בשיחה, כמו דגל אדום — ולכן לא נכנס
      לתקציב 2–3 השאלות ולא מוסיף תור. True → `routing_stop minor_self` (D-02): נוסח קבוע (לשתף הורה,
      פרטי הקשר של הדס להורים), בלי טופס ובלי איסוף טלפון. מגבלה ידועה: מי שלא מזכיר גיל לא מתגלה.
  - id: document_request
    purpose: decision
    goal: false                 # אין מטרה; אופורטוניסטי (L-15)
    crit: false                 # לא ★: ה-true (לא ה-missing) הוא מה שמשפיע, כמו קבוצת 4.1
    type: boolean
    filled_by: extracted_quote
    note: >-
      מתגלה מציטוט ("אני צריכה מכתב לבית המשפט / לביטוח / לבית הספר"). True → (1) `outcome3_exclusions`,
      כמו קבוצות 4.1 — לא תוצאה 3; (2) שורת תוספת (`addenda`) בהודעת התוצאה: מכתבים ואישורים הם נושא
      לשיחה עם הדס אחרי היכרות, בלי הבטחה למכתב (סבב 6, לפי L-15; הניסוח עצמו: תפקיד 3, ⚖️); (3) תגית בסיכום להדס. לא עוצר את השיחה ולא מוחק
      תוכן (בשונה מעצירות D-02) — ממשיכים את ההיכרות הרגילה עד תוצאה 1, 2 או 4.

routing_slots_open_questions:   # לארכיטקט, סבב 5
  - >-
    reporter_role: המשימה מנתה חמישה תפקידי מדווח (הורה/אפוטרופוס, הפונה עצמו, בן משפחה מבוגר אחר, איש
    מקצוע, אחר), אבל ה-enum המאושר ב-§7 מכיל ארבעה ערכים (parent, other_family, professional, other) בלי
    ערך "עצמי". השארתי את הארבעה המאושרים, בהנחה ש-core_relation=self מייתר ערך "עצמי" נפרד (reporter_role
    לא ממולא, ולא משמש שער). נכון? או שצריך ערך חמישי?
  - >-
    `crit` על reporter_role ו-self_declared_minor: שניהם שער ל-routing_stop של D-02, שמבטל כל תוצאה (לא רק
    3) — חזק יותר מ-★ שמוגדר כ"חוסם תוצאה 3 בלבד" (§1.4). סימנתי `crit: false` כדי לא לעמעם את המשמעות
    הטכנית של ★, אבל כרגע אין סימון נפרד לשער הזה. צריך תווית נפרדת (למשל `gate: true`) ב-`slot-catalog.schema.json`?
  - >-
    document_request: המשימה כתבה שהבוט נותן "סירוב קבוע". הנחתי שזו שורת `addenda` בתוצאה הסופית (השיחה
    ממשיכה), לא `routing_stop` שמוחק את השיחה כמו ב-D-02. אם הכוונה לעצירה, צריך להוסיף אותו ל-`routing_stops`
    (decision-table §1.6) ולא רק ל-`outcome3_exclusions`.

screen_lists:   # כל רשימה שייכת לדגל אחד ולדרגה אחת. כפתורים: כן / לא / לא ידוע לי (VOICE §3.10)
  screen_neuro.adult: {raises: sudden_onset, items: [דיבור מעורפל או כבד, קושי לדבר, קושי להבין, קושי למצוא מילים, קושי פתאומי בבליעה, צניחה בצד אחד של הפנים, חולשה ביד או ברגל, בלבול], unknown: "הדגל עולה (דרגה א)"}
  screen_neuro.child: {raises: sudden_onset, items: [התחיל אחרי מכה בראש, חולשה ביד או ברגל, צניחה בפנים, בלבול או ישנוניות חריגה, פרכוס, קושי פתאומי בבליעה], exclusion_line: "חזרות או היתקעות במילים אינן חלק מהרשימה", unknown: "doubt_tier: urgent"}
  screen_voice:       {raises: voice_risk, items_always: [קושי לבלוע, שיעול עם דם, גוש בצוואר, ירידה במשקל בלי הסבר, שינוי בקול אחרי ניתוח, הנשמה או מכה בצוואר], items_if_weeks_ge_3: [כאב בבליעה, כאב באוזן, עישון], unknown: "doubt_tier: urgent"}
  screen_swallow:     {raises: swallowing, items: [שיעול או השתנקות באוכל או בשתייה, אוכל נתקע, דלקות ריאה חוזרות, ירידה במשקל (ילד: קושי לעלות במשקל)], exception: "מבוגר שכבר במעקב רפואי בגלל הבליעה (adult_in_rehab=yes, או swallow_followup=yes) → תוצאה 4, הפניה 6.8. סבב 6: core_sudden_evaluated=evaluated לבדו כבר לא מספיק — אשפוז בגלל האירוע (השבץ) לא אומר שמישהו עוקב היום אחרי הבליעה. זה הנוסח של REVIEW 3.3 ('כשלא ידוע אם הוא במעקב, הדגל עולה'), שה-DRAFT סטה ממנו", unknown: "doubt_tier: urgent"}
  screen_neuro.adult_after_known_event:   # סבב 6, הצעה, ממתין להדס (REVIEW §2.7). לא פעיל עד אישור
    {applies: "screen_neuro חל AND core_sudden_evaluated=evaluated", raises: sudden_onset, items: "כמו screen_neuro.adult", framing: "מאז הבירור או השחרור — הופיע משהו מאלה מחדש, או החמיר?", yes: "הדגל עולה בדרגה א גם כש-evaluated (אירוע חדש)", unknown: "doubt_tier: urgent",
     why: "בנוסח הנוכחי ('באותו זמן'), אחרי אירוע ידוע שנבדק התשובה הצפויה היא 'כן' (אלה סימני האירוע עצמו), והדגל לא עולה בגלל evaluated. כלומר השאלה עולה תור ולא יכולה לשנות דבר, ו'לא ידוע לי' בה מעלה אזעקת שווא בדרגה א. בגרסה הזו היא תופסת אירוע חוזר בשבועות שאחרי האירוע הראשון. נוסח: תפקיד 3, ⚖️"}
  screen_order:   # סבב 6 (מבקר תכנון, ממצא 5). שתי הרשימות לא מתאחדות ואף אחת לא מדלגת על השנייה
    rule: "כשגם screen_neuro וגם screen_swallow חלים: הנוירולוגית קודם (930 > 920). 'כן' או 'לא ידוע לי' שמעלים דגל → עוצרים בתוצאה 5, ורשימת הבליעה לא נדרשת (תוצאה 5 לא תלויה בה). 'לא', או 'כן' שלא מעלה דגל (evaluated) → רשימת הבליעה נשאלת"
    why_not_merge: "כל רשימה שייכת לדגל אחד ולדרגה אחת (§9.1, תיקון 1): הנוירולוגית מעלה sudden_onset בדרגה א (101), הבליעה מעלה swallowing בדרגה ב (רופא בימים הקרובים). 'כן' אחד לרשימה משותפת לא היה יודע איזו דרגה להעלות"
    why_not_skip: "הפריט 'קושי פתאומי לבלוע' ברשימה הנוירולוגית תופס בליעה כסימן לשבץ, לא סימני שאיפה (שיעול בארוחה, דלקות ריאה חוזרות, ירידה במשקל). אלה בדיוק הסימנים שחשובים בשבועות הראשונים אחרי שבץ, כשהאדם כבר בבית. הדילוג לא היה החלטה קלינית מכוונת אלא ניסיון לחסוך כפילות, והוא השאיר את הנתיב הזה בלי סינון שאיפה"
    cost: "שאלה אחת נוספת, רק כשהשינוי חדש והנוירולוגית לא העלתה דגל: מבוגר אחרי אירוע נרכש בארבעת השבועות האחרונים (1.9, 1.10), או ילד עם קושי אכילה או ריור שהתחיל פתאום. שבץ לפני שבועיים: 2 שאלות (3 אם לא נאמר מתי). היעד 2–3 נשמר; התקרה 5 לא נפגעת (מסכים פטורים ממנה ממילא)"
  lang_regression:    {raises: child_regression, items: [איבד מילים או יכולות שכבר היו לו], unknown: "doubt_tier: urgent"}
  note: "קושי בנשימה (airway) לא נכלל באף רשימה, כדי לא לערבב דרגות. הוא נתפס בזיהוי פסיבי, ושורת 101 מוצגת תמיד. הרשימות לא כוללות פריטים שאינם דגל (שמיעה, תקשורת חברתית, נחירות). אלה עברו ל-signs_screen"

flag_condition_changes:
  sudden_onset:     "... OR screen_neuro_any=yes (אלא אם נאמר במפורש שכבר נבדק). שאר התנאי כמו ב-§7"
  voice_risk:       "screen_voice_any=yes, בכל משך (הפריטים נבחרו כך שהם רלוונטיים בכל משך) OR התנאי של §7 על סלוטים שהוזכרו"
  swallowing:       "screen_swallow_any=yes OR סלוטי בליעה שהוזכרו, AND NOT (adult_in_rehab=yes OR swallow_followup=yes). 'כאב בבליעה' לבדו לא מפעיל. evaluated לבדו לא פוטר (סבב 6)"
  adult_new_change: "AND NOT (adult_known_diagnosis קיים AND במעקב)"

signs_sets:   # בחירה מרובה. 'אף אחד מאלה' → הכול no. 'לא בטוח/ה' → unknown (→ 2). אפשרות שלא סומנה = no
  voice:      ["כאב, מאמץ או עייפות בדיבור → voice_symptoms", "הקול נחלש בסוף היום → voice_symptoms:end_of_day_loss", "חוזר שוב ושוב → voice_duration_recurring", "מפריע לעבודה או ללימודים → core_impact:work_school", "כבר נבדקתי אצל אא\"ג → voice_ent_exam:seen", "רופא המליץ על טיפול קול → core_prof_recommended", "(פחות משבועיים) יש עכשיו צינון או מחלה → voice_recent_illness", "(ילד) צועק או מאמץ את הקול → voice_child_strain"]
  speech:     ["מתוסכל, נמנע או שמקניטים אותו → core_impact", "(ילד) גם מעט מילים או משפטים קצרים לגיל → speech_language_concern", "לשון בין השיניים → speech_sound_quality:interdental", "צליל רטוב או צדי → lateral_wet", "גננת או רופא המליצו לפנות → core_prof_recommended", "חשש לגבי השמיעה → speech_hearing_history", "(מבוגר) מפריע בעבודה או בחברה → core_impact"]
  stuttering: ["חוזר על חלקי מילים או צלילים → part_word_repetitions", "מאריך צלילים → prolongations", "נתקע, והמילה לא יוצאת → blocks", "מתח בפנים או מצמוץ → physical_tension", "מודע, מתוסכל או נמנע → stuttering_awareness + core_impact", "גמגום במשפחה → stuttering_family_history", "איש מקצוע המליץ → core_prof_recommended", "רק חוזר על מילים שלמות → whole_word_repetitions_only"]
  oral:       ["פה פתוח או נשימה דרך הפה → oral_concern:mouth_breathing", "לשון נדחקת בין השיניים → tongue_thrust", "אורתודנט או רופא שיניים המליץ → oral_referrer + core_prof_recommended", "ריור → drooling", "מוצץ או מציצת אצבע → oral_habits", "נוחר או עוצר נשימה בשינה → oral_concern:snoring (תוספת אא\"ג)", "כבר נבדק אצל אא\"ג → oral_airway_ent", "משפיע על הדיבור → oral_speech_effect"]
  lang:       ["מתקשה להבין הוראות פשוטות → lang_comprehension", "גם הקרובים מתקשים להבין אותו → speech_understood_by:family_struggles", "זרים לא מבינים את רוב הדיבור → family_not_strangers", "(מגיל 3.5) לא מצליח לספר מה קרה → lang_narrative", "לא מגיב לשמו, כמעט לא מצביע או יוצר קשר עין → lang_social (תוספת הפניה 1.12)", "חשש לגבי השמיעה → lang_hearing (תוספת הפניה 1.13)", "גננת, רופאה או טיפת חלב הביעו דאגה → lang_others_concerned", "מתוסכל כשלא מבינים אותו → core_impact"]

outcome4_guard:   # ממצא 5. מחליף את "4 יורדת ל-2 אם ★ חסר"
  rule: "4 דורשת: domain filled ומאושר ב-confirm_recap, אין דגל, והפרטים של REVIEW 4.4 נענו (filled או unknown, כשהדגלים עצמם מטפלים ב-unknown). ★ של תוצאה 3 לא נוגעים ב-4"
  per_domain: {adult_acquired: [core_onset_pattern, screen_swallow, "screen_neuro אם חל"], adult_swallowing: [screen_swallow, "screen_neuro אם חל", "swallow_followup (unknown → דגל)"], hearing: [core_onset_pattern], literacy: [core_relation], social_communication: [core_age, lang_regression], child_feeding_infant: [core_age, screen_swallow, "screen_neuro אם חל"]}
  reachability: >-
    סבב 6. כל פרט בלי "אם חל" ב-per_domain חייב להיות ניתן להשגה תחת תנאי ה-applies של התחום, בכל ערך של
    core_onset_pattern. נבדק ידנית אחרי הסרת ההחרגה מ-screen_swallow: כל שש השורות ניתנות להשגה, חוץ מ-social_communication
    אצל מבוגר (core_age ו-lang_regression חלים רק על ילד). שם זה מכוון: במטריצה 1.12 עמודות המבוגרים הן "—", והתוצאה 2,
    כמו ב-1.16. הבודק צריך לסמן את השורה הזו כ-rel=child בלבד, לא להיכשל עליה. בקשה לארכיטקט:
    בדיקה ב-build שנכשלת אם פרט נדרש לא ניתן להשגה (§9.4). לא לאמץ כלל גורף "פרט שהמטרה שלו לא חלה = מתקיים"
    עבור safety_screen: זה בדיוק המנגנון שהיה מעלים את רשימת הבליעה בשקט, ותוצאה 4 הייתה ניתנת בלי סינון שאיפה.
    "אם חל" מותר רק כשנכתב במפורש, כמו אצל screen_neuro.

outcome3:
  exclusion_change: "4.1.4 = שינוי חדש בדיבור או בשפה (לא בקול). worry ב-core_impact כבר לא מחריג — שנוי במחלוקת עם המבקר המשפטי (ק-1(ו)); לא משנה עד הכרעה, ראו §9.3 ו-REVIEW 4.5. 4.1.7 = השפעה בפועל בלבד"
  launch_recommendation: "outcome3_enabled=false + רישום would_be_outcome_3. החלטה אחת של אליה והדס (REVIEW 4.3, שלוש אפשרויות; שתי התיבות החופפות אוחדו בסבב 6)"
  expected_rate: "כ-5% (2–10), הערכה בלי נתונים. אם worry נשאר החרגה: פחות מ-2%. דרך הביניים של 4.5: מעט פחות מ-5%"
  record_for_dispute: "בכל שיחה שבה would_be_outcome_3=true: גם would_be_3_worry (core_impact∋worry) ו-would_be_3_reassurance (meta.reassurance_request או meta.diagnosis_request). enums בלבד, בלי תוכן. אחרי 3–6 חודשים המספרים מכריעים את 4.5 (§9.4)"
```

### 9.1 ביקורת על `content/VOICE_AND_TONE.md` §3.7 ו-§3.10 (סבב 4)

- **§3.7 (מונח אבחנתי): מאושר כמו שהוא.** הכללים (מייחסים, לא מאשרים, לא מרחיבים, לא מערערים, המונח לא מתפשט) תואמים בדיוק ל-REVIEW, עיקרון 1. תוספת אחת לארכיטקט: מונח שהפונה מוסר עם אשפוז או מעקב ("אבא עבר שבץ ואושפז") ממלא בשקט את `core_sudden_evaluated=evaluated` ואת `adult_known_diagnosis`, והבוט לא שואל "מי אבחן". זה מה שמונע אזעקת שווא של `sudden_onset` על אירוע ישן.
- **§3.10 (סינון): מאושר, עם שני תיקונים.**
  1. **"כן" מספיק לדגל** נכון רק כשכל רשימה שייכת לדגל אחד ולדרגה אחת. לכן המבנה ב-§9 מוציא מהרשימות את קושי הנשימה (דרגה א) ואת הפריטים שאינם דגל (שמיעה, תקשורת חברתית, נחירות). אלה עוברים ל-`signs_screen`.
  2. **המספרים מתעדכנים:** "6–8 תורות" הופך ל-2–3 שאלות ועוד אימות. "1–2 שאלות סינון" הופך ל-0–1 ברוב הנתיבים. 2 רק בשני מקרים: ילד עם קושי שפה והופעה פתאומית, ו(סבב 6) שינוי חדש אצל מבוגר בתחומי 1.9 או 1.10, או קושי אכילה או ריור שהתחילו פתאום אצל ילד, כשהנוירולוגית לא העלתה דגל (`screen_order`).

  שאר הסעיף מאושר: פתיח שמנרמל, מילים יומיומיות, שורת ההוצאה לגמגום, שאלת ההופעה שנשארת נפרדת משאלת הסימנים, וניסוח מחדש קצר.
- **ל-`signs_screen` (לא סינון) נדרשת בחירה מרובה,** כי כל אפשרות ממלאת סלוט אחר. זה חריג נוסף לכלל "בלי רשימות" (§3.6), ומעצב השיחה מכריע בניסוח. בוואטסאפ: רשימה ממוספרת, ותשובה כמו "1, 3" או "אף אחד".

### 9.2 למעצב השיחה: ספירת המטרות והתוויות (סבב 6)

**ספירת המטרות: 18, אתה צודק.** `goals_v2` מכיל 18 מזהים: routing 3 (`core_relation`, `core_concern`, `core_age`) ·
safety_screen 7 (`core_onset_pattern`, `speech_since_childhood`, `stuttering_since_childhood`, `screen_neuro`, `screen_voice`,
`screen_swallow`, `lang_regression`) · decision 7 (`voice_duration`, `stuttering_onset`, `speech_scope`, `speech_understood_by`,
`lang_expressive`, `oral_concern_referrer`, `signs_screen`) · summary_only 1 (`core_anything_else`). ה-"17" בכותרת הסבב
היה טעות ספירה שלי (תוקן בשורת סבב 4 למעלה). ארבעת `routing_slots` אינם מטרות. אם D-13 מאושרת: 19 (`self_age_band`, §9.3).

**תוויות `signs_screen` (texts §8.3): מאושרות, חוץ משבע.** מאושר כמו שהוא: קול 8/8, היגוי 6/7, שטף 7/8, פה 6/8, שפה 5/8.

| תחום | עכשיו | מוצע | למה |
|---|---|---|---|
| היגוי | (ילד) יש דאגה גם לגבי מילים או משפטים | (ילד) גם מעט מילים, או משפטים קצרים יותר משל בני הגיל | האפשרות ממלאת `speech_language_concern`, שמפעיל את רשימת הנסיגה. "דאגה" יסומן אצל כמעט כל הורה ויוסיף שאלת סינון בלי סיבה. התנהגות שאפשר לראות מבחינה טוב יותר |
| שטף | מתיחה של צלילים ("מממים") | מתיחה של צלילים ("אאאאבא") | "מממים" נקרא כמילה. הדוגמה צריכה להראות צליל אחד ארוך, בניגוד ל"א-א-אמא" של החזרות |
| פה | הלשון נדחקת בין השיניים | הלשון נדחקת קדימה בין השיניים, בזמן בליעה או במנוחה | אצל הפונה זה נשמע כמו אפשרות ההיגוי ("יוצאת בין השיניים בזמן הדיבור"), אבל היא ממלאת סלוט אחר (`tongue_thrust` מול `interdental`) |
| פה | נחירות, או עצירות נשימה בשינה | נחירות, או הפסקות נשימה בשינה | "עצירות" בעברית יומיומית היא קודם כל עצירות במעיים |
| שפה | קשה להבין בקשות פשוטות | מתקשה להבין הוראות פשוטות | נקרא גם כ"קשה לנו להבין את הבקשות שלו", כלומר דיבור ולא הבנה, ואז `lang_comprehension` מתמלא בטעות. "מתקשה" זהה בכתב בזכר ובנקבה |
| שפה | (מגיל 3.5) קשה לספר מה קרה | (מגיל 3.5) מתקשה לספר מה קרה | אותה עמימות, ואחידות עם השורה הקודמת |
| שפה | כמעט אין תגובה לשם, הצבעה או קשר עין | כמעט אין תגובה כשקוראים בשם, כמעט אין הצבעה, או מעט קשר עין | הנוסח הנוכחי נקרא "לא מגיב להצבעה של אחרים". אלה שלושה סימנים נפרדים, וכל אחד מהם לבדו מספיק לתוספת 1.12 |

הערה לשטף: "רק חזרות על מילים שלמות" שמסומנת יחד עם אחת משלוש האפשרויות הראשונות אינה "סתירה" (→ 2). הסימנים
של חזרות על חלקי מילים, מתיחות והיתקעויות גוברים (כיוון שמרני). לארכיטקט, §9.4.

**תוויות התקציר (texts §8.7): מאושרות, חוץ משתיים.** מאושר כמו שהוא: שלוש תוויות השורה, הגיל, `unknown`, ו-14 מתוך 16
ערכי `domain`.

| ערך | עכשיו | מוצע | למה |
|---|---|---|---|
| `oral_function` | הפה, הלשון או הנשימה | הפה, הלשון, או נשימה דרך הפה | "הנשימה" לבדה מזמינה לאשר קושי בנשימה כ"נושא". קושי בנשימה הוא דגל חירום, לא התחום הזה |
| `school_language` | שפה ולמידה בבית הספר | שפה בגיל בית הספר: ניסוח, הבנה או מציאת מילים | "למידה" מזמינה לאשר כאן קשיי קריאה וכתיבה (1.14, הפניה) כאילו הם 1.7 (לבירור). שורת האימות היא המקום היחיד שבו הפונה יכול לתקן את התחום |

שתי הערות בלי שינוי: (1) `apraxia` ("הפקה של צלילים ומילים") חופף להיגוי, אבל אישור בטעות מוביל ל-2 (1.8 לבירור), כלומר
לכיוון השמרני. (2) `core_relation_detail` לא חל כש-`core_relation=self` (§9, `routing_slots`), ולכן שורת "השיחה על: עצמך"
צריכה להיבנות מ-`core_relation`.

**עוד שלושה נוסחים שנדרשים ממך (לא דחוף לשער):** (1) REVIEW 4.0.5 תוקן לפי L-15: מכתבים ואישורים הם "נושא לשיחה עם הדס,
אחרי היכרות", בלי הבטחה. השורה צריכה מזהה ב-texts, ⚖️. (2) אם D-13 מאושרת: שאלת טווח הגיל, וגרסה של `minor.self` לפני
ההודעה הראשונה (§9.3). (3) אם הדס מאשרת את `screen_neuro.adult_after_known_event`: נוסח ⚖️ ("מאז הבירור או השחרור").

### 9.3 עמדות: D-02, D-13, והמחלוקת על "דאגה" (סבב 6)

**D-02: ✔ ממליץ.** קלינית, ההורה הוא גם מקור המידע הנכון על קטין (רקע התפתחותי, מה נאמר בגן או בבית הספר) וגם מי
שמחליט על טיפול. נער שמגמגם או שהקול שלו מטריד אותו נשאר בתחום, דרך ההורה. הפער היחיד הוא ביישום, לא בכלל: מושא קטין
במסלול "על מישהו אחר" (§9.4, פריט 6).

**D-13 (שאלת גיל ב"על עצמי"): ⚠ ממליץ, בארבעה תנאים.**
- **הנימוק הקליני:** כל הלוגיקה של "על עצמי" מכוילת למבוגר: הרשימה הנוירולוגית למבוגר ("לא ידוע לי" → דרגה א), השאלה
  "קיים מילדות?", עמודת "על עצמי" במטריצה. בן 14 שלא מציין גיל עובר את כל אלה ומגיע לטופס. ציטוט אופורטוניסטי תופס רק
  מי שמזכיר כיתה או גיל. בנוסף, נער שכתב סיפור שלם (גמגום, הצקות) ואז נעצר ב"לשתף הורה" חווה דחייה. עדיף שיידע מראש.
- **המחיר מול התקציב:** לחיצה אחת, רק במסלול "על עצמי", מיד אחרי הכפתור ולפני ההודעה החופשית הראשונה. היעד של 2–3
  שאלות נספר אחרי ההודעה הראשונה, ולכן המחיר מול היעד הוא 0. מספר המטרות עולה ל-19.
- **התנאים:** (1) טווח בלבד, "מתחת ל-18" / "18 ומעלה", לא גיל מדויק: טבלת ההחלטה לא משתמשת בגיל של מבוגר, ומה שלא
  משמש לא נאסף. (2) בלי "מעדיף/ה לא לומר". תשובה חופשית לא ברורה → ממשיכים כמבוגר, והציטוט (`self_declared_minor`)
  וההצהרה בתיבת ההסכמה נשארים כגיבוי. (3) **תנאי בטיחות:** כש-`minor.self` מוצג לפני כל הודעה, דגל `distress` לא קיבל
  שום טקסט לסרוק, ולכן הנוסח הזה חייב לכלול גם את קווי הסיוע (ער"ן 1201, סה"ר), לא רק 101. היום `minor.self@v1` מסתמך
  על הדגל ("בלי ער"ן כאן"), וזה נכון רק כשהעצירה באה אחרי טקסט. (4) הטווח לא נכנס לסיכום להדס.
- **הסלוט, אם מאושר:** `{id: self_age_band, purpose: routing, prio: 995, applies: "rel=self", type: enum, values: [under_18,
  adult], filled_by: button, turn_budget: 1, note: "under_18 → self_declared_minor=true → routing_stop minor_self"}`.

**המחלוקת על "דאגה" (ק-1(ו)): לא שיניתי את הלוגיקה.** הנושא כתוב להדס ולאליה כפריט החלטה, עם שתי העמדות זו לצד זו
ודרך ביניים, ב-REVIEW 4.5. עד הכרעה, `worry` לא מחריג (מצב סבב 4), וזה רדום כל עוד D-03 בתוקף. ההמלצה שלי שם: דרך הביניים,
ורישום שמאפשר להכריע לפי נתונים (`record_for_dispute`, §9).

### 9.4 לארכיטקט (לאגד לסבב הבא שלו)

1. **`screen_swallow`** כבר לא מותנה ב"נוירולוגית לא חלה"; סדר: נוירולוגית קודם, ובליעה רק אם לא עלה דגל (`screen_order`).
   מקרי רגרסיה: "אבא אחרי שבץ לפני שבועיים, בשיקום, בלי סימני שאיפה" → 4, אחרי שתי רשימות; "אותו דבר, משתעל בארוחות, אין
   שיקום או מעקב" → `swallowing` בדרגה ב. עם התיקון, הטענה ב-ARCH §7 ("ירידה ל-2 רק אם הפונה תיקן את התחום") שוב נכונה.
2. **בדיקה ב-build:** כל פרט בלי "אם חל" ב-`outcome4_requirements` ניתן להשגה תחת ה-`applies` של התחום. לא לאמץ "פרט
   שהמטרה שלו לא חלה = מתקיים" כברירת מחדל ל-`safety_screen` (`outcome4_guard.reachability`). `social_communication`: rel=child בלבד.
3. **סלוט חדש `swallow_followup`.** החריג של רשימת הבליעה כבר לא מקבל `core_sudden_evaluated=evaluated` לבדו.
4. **ממתין להדס:** `screen_neuro.adult_after_known_event` דורש בחירת נוסח לפי תנאי. זה אותו מנגנון שחסר ל-`screen_voice.ask`
   מול `ask_3w` (texts, ההערה ל-`goal.screen_voice.ask`).
5. **ספירה:** 18 מטרות (ARCH שורה 59 כותב 17). 19 אם D-13 מאושרת: `self_age_band` ב-choice set של "על עצמי", לפני
   ההודעה הראשונה. `self_declared_minor` מציטוט נשאר כגיבוי.
6. **מושא קטין במסלול "על מישהו אחר"** (נכד או נכדה, אח צעיר, תלמיד; משפטי L-05(2)). קלינית, ילד שעובר כ-`other_adult`
   מקבל את המסכים הלא נכונים: הרשימה הנוירולוגית למבוגר, "קיים מילדות?", ובלי שאלת נסיגה. הצעה: כש-`core_relation_detail`
   הוא נכד, נכדה או אח/אחות, או כש-`reporter_role=professional`, לשאול `core_age`. אם הגיל מתחת ל-18, המושא ילד, ושער
   `non_parent_reporter` חל.
7. **הורה על ילד בגיר** (`core_relation=child` ו-`core_age` ≥ 18): לנתב כ-`other_adult` (מסכי מבוגר, 4.1.3). ממתין להדס (REVIEW §1).
8. **רישום למחלוקת 4.5:** `would_be_3_worry`, `would_be_3_reassurance` ברשומת המדדים, enums בלבד.
9. **שטף:** "רק מילים שלמות" יחד עם סימני גמגום אחרים אינו סתירה. הסימנים האחרים גוברים (§9.2).

# דיווחי תיקון — מה המתקנים טוענים שתוקן

קובץ זה מעתיק מילולית את דיווחי התיקון מסבבי התיקון, כדי שהמבקרים המקוריים
יוכלו לאמת אותם (כלל 9 ב-EFFICIENCY.md). **"דווח כתוקן" אינו "סגור"** —
ממצא קריטי/גבוה נסגר רק אחרי אימות של המבקר שהעלה אותו.

## ארכיטקט — סבב 3 (ARCHITECTURE.md טיוטה 2)

| ממצא | סטטוס מדווח |
|---|---|
| F1 | תוקן: הודעה שהחילוץ שלה נכשל נשמרת ומחולצת מחדש עם ההודעה הבאה, תמיד לפני כל תוצאה. אם עדיין נכשל — אין תוצאה 3, והכרטיס מקבל הודעה עם 101 |
| F2 | תוקן: שאלות הסינון לדגל אדום פטורות מכל תקרה ונשאלות תמיד לפני הסיכום. תור של שאלה נפוצה בלבד נחשב התקדמות, עד 4 |
| F5 | תוקן: תוצאה 4 דורשת תחום מאושר ותשובות לפרטי טבלה 4.4; slots קריטיים (★) כבר לא דוחפים ל-2 |
| התראות | תוקן: heartbeat חיצוני עם קודי סטטוס בלבד (דורש אישור אליה לפי D-07), שורת "עוד לא התקשרנו" עם וואטסאפ במסך האישור, ודגל `away_until` |
| SEC-01 / L-04 / D-01 | תוקן: "סיום" מוחק בשרת את התוכן מיד; נשארת רק רשומת מדדים בלי תוכן |
| SEC-02 / L-05 / D-02 | תוקן: קטין על עצמו ומדווח שאינו הורה — הודעה קבועה, בלי טופס, והתוכן נמחק |
| SEC-03 / D-05, SEC-04 / D-06 | תוקן: מצב צל בלי מודל ובלי תוכן; הכלי הוא דף נפרד בלי gtag ועם CSP משלו |
| SEC-06 | תוקן: בדיקת דגל אדום על כל הטקסט לפני כל דחייה; תקרת גוף 32KB; בלי קיצוץ שקט בוואטסאפ |
| SEC-09 | תוקן: סוד-אב אחד ב-Production בלבד, מפתחות נפרדים ל-previews |
| SEC-11 / D-04 | תוקן, ונאכף בסכמה |
| `preferred_time_note` | הוסר; זמן וערוץ הם בחירות קבועות |
| L-03 / D-07 | תוקן: רשימת מעבדים; trace בפרודקשן בלי תוכן |
| L-19 | תוקן: דיסקליימר חובה בכל תוצאה, כולל דגל אדום |

טבלת הקיצוץ של מבקר התכנון: אומצה כולה חוץ משניים — התראות וואטסאפ להדס
נדחו לשלב 2 (דורשות Business Platform); מונה עלות הטוקנים יוסר רק אם תקרת
ההוצאה של הספק שייבחר היא קשיחה.

## מעצב UX — סבב 3 (UX_SPEC טיוטה 3)

- D-01: "סיום ומחיקה" מוחק בשרת אחרי אישור אחד; "למחוק עכשיו" הוסר. S9 שומר
  כרטיס הפניה של תוצאה 4 בזיכרון הדף בלבד עד היציאה.
- D-02: מסך חדש S13 — שני כרטיסים קבועים, בלי טופס ובלי טלפון; התיק נמחק כשהכרטיס מוצג.
- D-03 / D-04: תוצאה 3 כבויה; טופס אחרי דגל אדום רק בדרגת urgent.
- SEC-19: מסך החזרה מציע המשך / התחלה מחדש / מחיקה במשקל שווה, בלי תוכן לפני "המשך".
- SEC-06: הודעה ארוכה לא נחסמת ב-800 תווים; בדיקת דגל אדום בלבד על כל הטקסט,
  אחרת בועה שמבקשת לקצר (עם 101) והטקסט חוזר לתיבה.
- SEC-04 / D-06: אין אנליטיקה בדף הכלי; המשפך עובר לרשומות מדדים בצד השרת בלי תוכן.
- משפטי: שורת דיסקליימר קטנה בכל מסך דגל אדום (`redflag.footer`).
- מבקר תכנון: הקשה אחת אופציונלית להדס לכל פנייה + רשימה חודשית; בלי תזכורות ובלי סיכום שבועי.

## מנסח קליני — סבב 4

- 34→17 מטרות; יעד: 2–3 שאלות אחרי ההודעה הראשונה, לכל היותר 5.
- ארבע רשימות סינון בפורמט 3 כפתורים + שאלת "סימנים" אחת לכל תחום.
- כש-wtc אחד מתקיים → תוצאה 1 ננעלת ומטרות ההחלטה הנותרות מדולגות; סינון בטיחות לעולם לא מדולג ופטור מתקרות.
- צרוד-עם-הצטננות: לא נשאל על שבץ.
- סתירת תוצאה 3 תוקנה (4.1.4 דיבור/שפה בלבד, קול תחת 4.1.5); דאגה לבדה כבר לא מחריגה.
- תוצאה 4 לא נופלת ל-2; דורשת תחום מאושר + פרטים מטבלה 4.4.

## ארכיטקט — סבב 4 (ARCHITECTURE.md טיוטה 3)

2026-10-05 · תפקיד 6, מופע חדש. **"דווח כתוקן" אינו "סגור"** (כלל 9): כל שורה מפנה לסעיף ולחוזה, כדי שהמבקרים יוכלו לאמת.
**החוזים:** 17 schemas, Ajv strict בלי שגיאות. 22 דוגמאות חיוביות ו-95 שליליות, שנבדקו גם ב-Ajv וגם ב-jsonschema (117/117). 37 מהשליליות חדשות, ו-19 מהן לחוסמים 1–3. השלילית הישנה "טקסט מעל 6,000" הוסרה, כי התקרה הזו בוטלה. `node content/build_texts_json.mjs --check`: OK.
סטטוסים: **תוקן** · **הוחלט** (החלטה רשומה) · **נדחה** (עם נימוק) · **נדחה לשער 2**.

### חוסמי שער 1

| ממצא | סטטוס | מה ואיפה |
|---|---|---|
| **חוסם 1: מחיקה בשליחה** (SEC-01(1), שארית L-04, סתירה 3 של מבקר התכנון, UX §8 פריטים 1 ו-9) | **תוקן** | שליחת הטופס מוחקת את תוכן השיחה **באותה בקשה**: כתיבת CAS שהופכת את התיק לשלד בלי תוכן, מחיקת ה-traces והשלד, ורשומת מדדים. ה-cookie מתנקה. מסך האישור נבנה מהתשובה בלבד, ורענון מציג S2 "כבר נשלחה" לפי הסימון המקומי. המייל נשלח בתוך הבקשה (6 שניות), כך שבמקרה הרגיל גם פרטי הקשר והסיכום נמחקים מהפנייה לפני התשובה. מחיקה שנכשלה → `content_deleted: false`, והניקוי השעתי מוחק לפי `session_purged_at`. **ARCH** §4, §8.2, §9.1, §11.1, §13.1, §16. **חוזים:** `case-file` (`submitted` מחייב `contentFree`, `closed` ו-`purge_at`), `channel-envelope` (`handoff_result`, שמחייב `closed` ו-`ends_conversation`), `lead-record` (`session_purged_at`). 9 שליליות (B1) |
| **חוסם 2: שני דגלים בהודעה אחת** (SEC-11) | **תוקן** | הכלל: הטופס זמין רק אם **כל** הדגלים שעלו מתירים אותו. דגל אחד עם `none` מבטל את הטופס לכל השיחה (`handoff.status = blocked`), ו-`intake-handoff` מחזיר 403. S6 משולב: בלוק ראשי, ובלוק לכל דגל `hotline` נוסף. התוכן נמחק בסוף התור, ונשאר שלד לרענון. חל גם על `distress` יחד עם urgent. **ARCH** §1.5, §5.4, §7, §16. **חוזים:** `red-flags` (`doubt_tier` של emergency או hotline מחייב `none`), `case-file` (דגל `none` מחייב `blocked` ותיק בלי תוכן), `channel-envelope` (`red_flag_blocks`; בלוק `none` מחייב `form: none`; אסור `form_request` באותה מעטפה), `lead-record` (`red_flag_tiers` רק `urgent`). 8 שליליות (B2) |
| **חוסם 3: רגרסיית SEC-06** (`maxlength` חותך הדבקה) | **תוקן** | אין `maxlength` ואין חיתוך בצד הלקוח. התקרה היחידה היא גוף בקשה של 32KB, כ-16,000 תווי עברית, ו-TX-03 נכנס במלואו. הממשק בודק את גודל הגוף לפני שליחה. מעל התקרה הוא לא שולח, מציג `chat.input.too_long_block` עם 101, והטקסט נשאר בשדה. בשרת הסדר הוא: גודל, `JSON.parse`, regex על כל הטקסט, ורק אז ולידציה. מעל התקרה: 413. `text` במעטפה עד 81,920 תווים (20×4,096, כל רצף וואטסאפ), כך שהוולידציה לא דוחה טקסט שהגוף התיר. **ARCH** §6 (התרשים), §6.1 צעדים 0, 2 ו-4, §8.2, §8.3, §10.4, §16 (בדיקה דרך הממשק, ובדיקה סטטית שאין `maxlength`). **חוזים:** `channel-envelope`, `trace-record`. 2 שליליות (B3), ו-2 חיוביות (10,000 ו-32,000 תווים) |
| ↳ הצעת האבטחה: 20,000 תווים וגוף של 64KB | **נדחה** | המשימה קבעה 32KB, והתקרה הזו מכילה את TX-03 עם מרווח. מעל התקרה יש הודעה מפורשת ולא חיתוך, ולכן הבטיחות לא תלויה בגודל התקרה (§20) |
| **חוסם 4: D-13** (L-05(1), SEC-02(2)) | **הוחלט: הצבעה ✔ על ענף א** | שני הענפים מוגדרים, ונבנים מאותו קוד. ענף א: `self_age_band` מיד אחרי "על עצמי" (routing, עדיפות 995, הקשה אחת, בלי "מעדיף/ה לא לומר", לא נספר בתקציב, לא מגיע להדס). "מתחת ל-18" כותב `self_declared_minor`, ועצירה לפני טקסט בוחרת את `minor.self.before_text`, עם 101, 1201 וסה"ר. ענף ב: המצב הקיים, עם המגבלה הידועה. **ARCH** §1.4 (טבלת הענפים; ספירת תורות מההודעה הראשונה), §1.6, §1.11(11), §16. **חוזים:** `decision-table` (`routing_stops.message_variants`), `case-file` ו-`slot-catalog` (ספירת `turns.intake`) |

### מבקר התכנון: פריטים חלקיים

| ממצא | סטטוס | מה ואיפה |
|---|---|---|
| 4(א): בודק השלמות דורש נוסחי תוצאה 3 מאושרים כשהמתג כבוי | **תוקן** | שדה `active` ב-`fixed-texts` (`false` מחייב `notes`). שער הייצור חל רק על נוסחים פעילים. `outcome3_enabled: true` מחייב שכל נוסחי 3 יהיו פעילים ומאושרים. §1.9, §1.11 צעדים 3 ו-9 |
| 8 + סתירה 1: מנגנון המשוב | **תוקן** | UX טיוטה 3 אומץ כמו שהוא. הקשה אופציונלית אחת במייל (3 כפתורים: `triage`, ו-`summary_rating` בשתי רמות), ורשימה במייל החודשי (`first_call`). בלי תזכורות, בלי סיכום שבועי ובלי תגיות סיבה. הסקריפט המקומי בוטל. §13.3. ב-`lead-record`: `feedback` צומצם, `lead_ref` חובה, ונוסף `history.source`. 5 שליליות (F8) |
| 9(ב) + סתירה 2: האם הדס מקבלת התראה על כל פנייה | **הוחלט: כן** | המייל של כל פנייה הוא ההתראה: תגית קבועה בנושא, ההסתייגות בשורה הראשונה, ומסנן Gmail ("לעולם לא לספאם" + התראה בטלפון) שמוגדר ונבדק לפני ההשקה. בלי קוד ובלי מעבד חדש. וואטסאפ נשאר לשלב 2. §0.1, §7.1, §13.2, §20 |
| 9(ג): תאריך השיחה הראשונה | **נדחה** | אין מדד כזה ב-GOALS, ושאלה על תאריך מוסיפה עומס בניגוד ל-UX §5.1. אם אליה ירצה, אפשר להוסיף בחירה גסה בשער 2. §13.3 |
| 10(ב): heartbeat (עכשיו D-12) | **תוקן** | ארבעת תנאי האבטחה: רשימת קודים סגורה בלי מזהים ובלי מספרים; כתובת ping סודית, ב-Production בלבד; התראה מחוץ ל-EmailJS ול-Gmail של הדס, עם 2FA; רישום ב-D-07. §13.2, §11.2, §18 |
| 10(ג): הסיכום השבועי | **תוקן** | אין סיכום שבועי. מה שהיה בו עבר לקודי heartbeat, ל-`facts_expiring` ולמייל החודשי. סיכון הספאם מכוסה במסנן ובשורת הגיבוי. §1.7, §13.2 |
| 1(א), נמוך: הודעה רביעית כשכבר ממתינות 3 | **תוקן** | אף הודעה לא נזרקת, והשיחה עוברת מיד למצב בלי מודל. §5.5 |
| 2, נמוך: התיאור של `consecutive_no_progress`, והערך 6 | **תוקן** | התיאור ב-`case-file` (מסכים קודם, כלל ה-FAQ). `max_intake_turns` = 6 מצוטט ב-§1.4 ובחוזה |
| 5 (בעיה חדשה): רשימת הבליעה בנתיב השבץ | **תוקן** (החלק של תפקיד 6) | הקליני תיקן את הסדר (`screen_order`). מצדי: בדיקת השגה ב-build, ו-`if_applicable_slots` רק במפורש, בלי כלל גורף "מטרה שלא חלה = מתקיים". §1.6, §1.11(10), §7 |
| סתירה 5: 12 מול 18 שניות | **הוחלט: 12** | §15. UX צריך להתיישר |
| סתירה 6: התגית "כפילות אפשרית" | **תוקן בחוזה** | אין תגית כזו ב-`lead-record`. UX ומעצב השיחה מסירים אותה. §7.1 |

### מבקר האבטחה: פריטים שמפנים לארכיטקט

| ממצא | סטטוס | מה ואיפה |
|---|---|---|
| SEC-01(2), SEC-10: EmailJS | **תוקן בתכנון** (האימות של אליה נדחה לשער 2) | תנאי מוקדם עם חלופה, לפני שהנוסחים עוברים לעו"ד: שירות נפרד לכלי, היסטוריית תוכן כבויה, קריאות מהשרת. אחרת `email_api` עם DPA. §11.2, §13.1 |
| SEC-01(3): "ואינו שומר" ב-`ai_provider_clause` | **תוקן** | מותר רק עם ZDR בחוזה. אחרת המשפט אומר את תקופת השמירה. §11.1 |
| SEC-01(4): 24 מול כ-25 שעות | **תוקן** | מחיקה בקריאה אחרי `expires_at`, ניקוי שעתי, וקוד `purge_failed`. `error.delete_failed` צריך לומר "תוך כ-24 שעות" (תפקיד 3). §4, §9.1 |
| SEC-02(1): פרטי הניתוב | **סגור** | נמסרו ב-DRAFT §9. §1.4, §21.5 |
| SEC-02(3): עצירת מי שאינו הורה, ואי-התאמת ה-enum | **תוקן** | `non_parent_reporter` כולל מושא מתחת ל-18, וגם גיל לא ידוע לנכד, לנכדה או לאח. `core_age` נשאל במסלולים האלה. ה-enum: הערכים `self/child/other_adult` ממופים למפתחות `self/child/other`. §1.4, §1.6, §16 |
| SEC-02(4): `routing_stops` ריק | **תוקן** | `minItems: 2`, ו-`contains` לשתי העצירות. 2 שליליות |
| SEC-03 (שלב 2): `H->>B` לפני בדיקת המצב | **תוקן** | ה-webhook שומר רק ב-`live`, ובדיקה מוודאת ש-`wa-inbox` ריק במצב צל. §8.3 |
| SEC-04: כותרת `Cookie` | **תוקן** | אף פעם לא נרשמת. השרת קורא רק את `__Host-intake_sid`, והחריג היחיד הוא עוגיית `_gcl_*` בהמרת Ads. §10.5 |
| SEC-08: `synthetic_full` לא קשור להקשר הפריסה | **תוקן** | `deploy_context` חובה, ו-`production` מחייב `content_mode: none`. §16. 2 שליליות |
| SEC-09(1): previews מ-fork | **הוחלט: כבויים** | הגדרה של אליה ב-Netlify. §9.3 |
| SEC-09(2): קוד preview כותב לחנויות ייצור | **תוקן** | עטיפת ה-Blobs פותחת חנות בלי סיומת רק ב-`production`. הגבול שנשאר מתועד. §9.3 |
| SEC-12(5) ו-(6) (שלב 2) | **תוקן** | ניטור דירוג האיכות של המספר וכיבוי אוטומטי; בהרצה, מענה רק לשיחה שמתחילה בטקסט מקישור האתר. §8.3 |
| SEC-13: סדר הסינון | **תוקן** | מספר מוכר נזרק לפני ה-regex. §8.3 |
| SEC-17(5): `preferred_time_note` ב-`form_request` | **תוקן** | `fields`: `name`, `phone`, `preferred_time`, `preferred_channel`. שלילית אחת |
| הערות שוליים: שם נקודת הקצה של "סיום" | **תוקן** | `DELETE /api/intake/session`, כמו UX ו-texts. §8.2 |
| הערות שוליים: ה-enums של פנייה הם מידע בכינוי | **תוקן** | §11.1 (גם רשומת ההסכמה), ותיאור `lead-record`. למדיניות: SEC-14 ועו"ד |
| §ד: רשימת המיסוך | **תוקן** | ת"ז גם ב-8 ספרות ועם מפרידים, כל פורמטי הטלפון, כרטיסי אשראי (Luhn). §6.1 |
| §ד: beacon ומונים לפני הסכמה (UX §8(3)) | **תוקן** | `POST /api/intake/event`: רק שמות מרשימה סגורה (`uiEvents`, `dailyCounters` ב-`metrics-record`), בלי IP ובלי user agent. §8.2. שלילית אחת |

### המבקר המשפטי: פריטים שמפנים לארכיטקט

| ממצא | סטטוס | מה ואיפה |
|---|---|---|
| L-04 (חוסם) | **תוקן** | חוסם 1. בנוסף, S8 כבר לא אומר "נשלחו" לפני שהמסירה קרתה: המסירה בתוך הבקשה, ו-S8 בוחר נוסח לפי `delivery` ו-`content_deleted` (שני נוסחים חדשים לתפקיד 3). §13.1 |
| L-05(1) ו-L-05(2) | **הוחלט / תוקן** | (1) חוסם 4. (2) העצירה המורחבת ב-§1.6 |
| L-09 (חדש): `texts_shown` | **תוקן** | הסט של `bootstrap` כולל את `intro.greeting`, `page.tool.not_this`, `page.tool.steps` ו-`consent.emergency`, והשרת דורש התאמה מלאה (409). §12, `consent-record` |
| L-14: נוסחי S1 ברשומה | **תוקן** | כמו L-09. ההכרעה על תקופת השמירה נשארת אצל עו"ד (שאלה 27) |
| L-03: ספק, EmailJS, DPA | **תוקן בתכנון** (ה-DPA: אליה, שער 2) | §11.1, §11.2 |
| L-11: ה-enums של פנייה | **תוקן** | מידע בכינוי, למדיניות. §11.1 |
| L-15 (חדש): השורה של 4.0.5 | **תוקן בחוזה** (הנוסח אצל תפקיד 3) | `addenda` עם `text_id` ⚖️, תגית `document_request` ב-`lead-record`, ומקרה רגרסיה תחת לחץ. §1.4, §16 |
| L-17: Meta ו-`wa_retention_clause` | **תוקן** (הערך נדחה לשלב 2) | שורת Meta ב-§11.2, והמשתנה נרשם ב-§1.9 |
| `deletion_clause` ו-`expiry_clause` שונים בין ARCH ל-texts | **תוקן** | ARCH אימץ את הערכים של תפקיד 3. §11.1 |

### המנסח הקליני: §9.4 ו-`routing_slots_open_questions`

| בקשה | סטטוס | מה ואיפה |
|---|---|---|
| 1. סדר הרשימות (נוירולוגית ואז בליעה) | **תוקן** | שני מקרי רגרסיה, והטענה ב-§7 שוב נכונה. §7, §16 |
| 2. בדיקת השגה ב-build | **תוקן** | §1.11(10). `applies_when` ו-`if_applicable_slots` בשורות `by_domain`. `social_communication` לילד בלבד |
| 3. `swallow_followup` | **סגור** | פרט enum רגיל, בלי שינוי בחוזה |
| 4. נוסח לפי תנאי | **תוקן** (ההפעלה ממתינה להדס) | `texts.by_condition` ב-`slot-catalog`. §1.4 |
| 5. ספירה: 18 מטרות (19 עם D-13) | **תוקן** | §0.2, §1.4 |
| 6. מושא קטין במסלול "מישהו אחר" | **תוקן** | §1.4, §1.6 |
| 7. הורה על ילד בגיר | **תוקן כמנגנון** (ההחלטה של הדס) | התנאים הנגזרים `subject_minor` / `subject_adult`. §1.4 |
| 8. רישום למחלוקת 4.5 | **תוקן** | `would_be_3_detail` ב-`metrics-record`, רק כש-`would_be_outcome_3 = true`. שלילית אחת |
| 9. שטף: מילים שלמות יחד עם סימנים אחרים | **תוקן** | המנוע לא רואה בזה סתירה, והקדימות כתובה בטבלה. §1.6 |
| שאלה פתוחה 1: `reporter_role` בלי "עצמי" | **סגור: ההנחה נכונה** | 4 ערכים, והפרט לא חל על `self`. §1.4 |
| שאלה פתוחה 2: תווית `gate` | **נדחה, עם חלופה** | השער נגזר מ-`routing_stops` בבודק, מודפס, ודורש מקרים בסט הזהב. תווית ידנית הייתה עלולה לצאת מסנכרון. §1.4, §1.11(6) |
| שאלה פתוחה 3: `document_request` כתוספת | **סגור: ההנחה נכונה** | תוספת, החרגה מ-3 ותגית. לא עצירה. §1.4 |

### מעצב השיחה

| שאלה | סטטוס | מה ואיפה |
|---|---|---|
| `screen_voice.ask` מול `ask_3w` | **תוקן** | `texts.by_condition`. §1.4 |
| שדה `active` | **תוקן** | ב-`fixed-texts`. הממיר צריך לכתוב אותו. §1.9 |
| 12 משתנים חדשים | **תוקן** | כולם נרשמו: `ai_provider_name`, `wa_retention_clause`, `site_url`, `entry_point`, `lead_ref`, `month_label`, `conversations_count`, `leads_count`, `referrals_count`, `redflags_count`, `interim_count`, `age_months`. `week_counts` לא נתמך. §1.9 |
| האם התחלה מחדש מוחקת | **סגור: כן** | אותו `DELETE`, ואז S1 עם הסכמה חדשה. §4 |
| `language.unsupported` ובדיקת האותיות הלטיניות | **תוקן** | `latin_ratio_exempt_text_ids` ב-`output-rules` (עד 5 מזהים, נוסחים קבועים בלבד). §1.9 |
| האם `chat.*` בבאנדל | **סגור: כן** | הכלל: כל נוסח שמוצג בלי תשובה מהשרת, או מעטפת ממשק. גם `resume.*` ו-`closed.keep_note`. §1.9, `fixed-texts` |
| `consent.emergency` ברשומת ההסכמה | **סגור: כן** | §12 |
| `meta.want_human.wa` | **סגור: מאושר לשלב 2** | §8.3 |
| `redflag.cta.er` | **הוחלט: בלי כפתור** | השורה `redflag.secondary.emergency` נשארת. §20 |

### התייעצויות

| נושא | סטטוס | מה ואיפה |
|---|---|---|
| SEO שאלה 2: המרת Ads מצד השרת | **הוחלט: ✔ מקבל**, בששת תנאי האבטחה | `gclid` נקרא רק ב-`intake-handoff`, מעוגיית `_gcl_*`, ולא נשמר בשום מקום. בלי value ובלי outcome, `order_id` אקראי, enhanced conversions כבוי, בלי קהלים, מפתחות ב-Production בלבד. **`INTAKE_ADS_CONVERSION=off` בהשקה**, עד אישור עו"ד (שאלה 16), רישום ב-D-07 ושורה במדיניות. §13.4, §11.2 |
| D-09, בתנאי האבטחה והיעילות | **הוחלט: ✔ בכל התנאים** | מונה עלות יומי משלנו (CAS); תקציב לכתובת (HMAC במפתח יומי, נמחק אחרי יומיים); ב-80% חסימת שיחות חדשות והתראה; ב-100% המשך בלי מודל; ירידה רכה; עלות ברשומת המדדים, בלי תוכן. מבטל חלקית את קיצוץ F12. §10.3, §6.2, §6.4 |

### נדרש מתפקידים אחרים (לאיגוד על ידי המנהל)

- **מעצב שיחה (3):** נוסחים חדשים: `chat.input.too_long_block` (בבאנדל, עם 101), `system.model_free` (101), `form.confirmation.privacy.pending` ⚖️, `form.confirmation.privacy.delete_pending` ⚖️, שורת התוספת של `document_request` ⚖️ (L-15). אם D-13 מאושרת: `goal.self_age_band.ask|clarify|rephrase`, שתי תוויות כפתור, ו-`minor.self.before_text` ⚖️ (101, 1201 וסה"ר). `error.delete_failed`: "תוך כ-24 שעות". בממיר: `active: false` משורות "לא פעיל", ורשימת `BUNDLE` עם `chat.*`, `resume.*`, `closed.keep_note`, `nav.*`. להוסיף את `language.unsupported` ל-`latin_ratio_exempt_text_ids`. להוציא משימוש את `hadas.email.tag.possible_duplicate` ואת `redflag.cta.er`. לשקול 101 ב-`resume.submitted.body`. לבדוק את "רישום טכני" ב-`about.data` מול ה-enums בכינוי.
- **UX (1):** S8 נבנה מתשובת השליחה בלבד, ורענון מציג S2. S8 צריך גם את שורת הגיבוי (מבקר התכנון 10(א)) ואת שורת הפרטיות לפי מצב המסירה. S6 משולב. §4.3: דגל שחוסם טופס מוחק את התוכן מיד, ונשאר שלד. §1.5 טו: ההודעה מעל 32KB. S10: וריאציה בלי מודל (מסכים בכפתורים, ואז תוצאה וטופס). התחלה מחדש מובילה ל-S1. §5.5: `lead_ref` במקום שם פרטי, ושאלת ההתראה הוכרעה. 12 שניות (§1.5 יז). להסיר את "כפילות אפשרית" (§5.2). `outcome.extraction_gap` ב-§7.6 וב-S5. "סיום" בתוצאה 3 מוחק בשרת (§1.3). `page.tool.not_this` מעל התיבה ב-S1.
- **UI (2):** S6 בשני בלוקים, עם שורת הסתייגות אחת; ההודעה על 32KB ליד שדה הקלט; בלי כפתור חדר מיון; שורת הפרטיות ב-S8 לפי המצב.
- **מנסח קליני (5):** אם D-13 מאושרת: `self_age_band` וה-choice set שלו. `core_age.applies_when` ו-`non_parent_reporter` המורחבים, בשפת התנאים. `if_applicable_slots` ו-`applies_when` בשורות `outcome4_requirements`. "לא ידוע לי" כסטטוס ב-`screen_*_any`.
- **SEO (4) ו-Frontend (8):** בלי `maxlength`, ובדיקת גודל הגוף לפני שליחה; רינדור S8 מהתשובה, והסימון המקומי; הגדרת המרת Ads כשתופעל.
- **אליה:** D-13; Deploy Previews מ-fork כבויים; תנאי EmailJS; שירות heartbeat עם 2FA; מסנן Gmail והתראה בטלפון של הדס, ובדיקה שלהם; D-10.
- **מנהל (DECISIONS):** הצבעות הארכיטקט: D-13 ✔ (ענף א), D-09 ✔ (כל התנאים אומצו), D-12 ✔ (תנאי האבטחה אומצו), המרת Ads ✔ (כבויה בהשקה). שורה חדשה מוצעת: "התראה על כל פנייה = המייל + התראת Gmail, בלי ערוץ נוסף" (אליה והדס).

## ארכיטקט — סבב 5 (ARCHITECTURE.md טיוטה 3.1)

2026-10-06 · תפקיד 6, מופע חדש. התיקונים לאימות הסגירה של האבטחה, סבב 2 (`reviews/security_phase1.md`, ג.1–ג.6), ושלוש תוספות של המנהל. **כלל 9:** כל טענה כאן מגובה בפלט מריץ שכל אחד יכול להריץ שוב. אותו מריץ הוא שמראה את הפער בטיוטה 3.

### מה תוקן

| ממצא | סטטוס | מה ואיפה |
|---|---|---|
| **ג.6: 117 המקרים לא בריפו, ואין להם מריץ** | **תוקן** | `architecture/contracts/tests/`: `run.mjs`, `regex_safety.mjs`, ו-14 קבצי `cases/*.cases.json`. מה המריץ בודק: <br>• 17 schemas ב-Ajv 8.20 `strict: true`, וכל אזהרה מכשילה. <br>• מקרה שלילי חייב להיכשל **בנתיב שמוגדר לו**, והבסיס שלו חייב לעבור לבד. <br>• שני מקרים חיוביים הם קובצי התוכן האמיתיים (`texts.he.json`, `output-rules.json`). <br>**שחזור:** 117 המקרים של סבב 4 לא נשמרו, ולכן **כל המקרים נבנו מחדש**. אין כאן טענה שהם אותם מקרים. 183 מקרים: 42 חיוביים ו-141 שליליים |
| ↳ 4 בדיקות הגישוש שעברו בטעות | **תוקן, ומכוסה** | `cf.G1.probe_hotline_copied_as_secondary`, `cf.G1.probe_emergency_copied_as_secondary`, `env.G2.probe_hotline_block_copied_as_secondary`, `lead.G3.probe_child_safety_without_tiers`. **מול החוזים של טיוטה 3 (`5831d7b`) המריץ נותן 137/183.** 24 מקרים שליליים עוברים שם בטעות, ובהם ארבעת אלה. עוד 15 לא רצים שם, כי הבסיס שלהם משתמש בשדה חדש. מול טיוטה 3.1: 183/183 |
| **ג.1: השדה המועתק** | **תוקן** | **הכלל:** המדיניות נגזרת מהדגל עצמו. <br>• `formPolicy()` היא הקריאה היחידה למדיניות בקוד. <br>• `intake-handoff` מחליט לפי מזהי הדגלים מול `red-flags.json`, והמחמיר גובר. מזהה לא מוכר = חסום. <br>**ב-schema:** `common.noFormFlagId` (`sudden_onset`, `airway`, `distress`, `child_safety`). <br>• `case-file`: דרגה או מזהה מחייבים `none` בכל רשומה, וכלל השיחה נדלק גם לפיהם. <br>• `channel-envelope`: דרגת בלוק, `red_flag_tier`. <br>• `lead-record`: מזהה מהרשימה פסול; `red_flag_tiers` חובה עם מזהים. <br>• `metrics-record`, וגם `red-flags` (מזהה ⇒ `none`). <br>`intake:check` צעד 12: הרשימה שווה לדגלי `none` בתוכן. ARCH §1.5, §13.1 צעד 1 |
| **ג.2: ReDoS** | **תוקן** | ביטויי הדגלים רצים **רק ב-re2js**, גרסה לינארית של RE2. V8 לא נעצר באמצע ביטוי, ולכן תקציב אמיתי אפשרי רק במנוע לינארי. <br>**כללים:** P1 שני המנועים מקמפלים ומסכימים. P2 בלי backreferences ובלי lookaround, וזה גם ב-schema. P3 **בלי כמתים מקוננים**. P4 חזרה עד 50. P5 ב-V8, לכל היותר כמת פתוח אחד. <br>**תקציב בזמן ריצה:** 50ms לביטוי ו-500ms לסריקה. ב-CI: 20/250ms. הנימוק למספרים: 60 ביטויים טיפוסיים על 16,000 תווים לקחו 65–90ms במדידה מקומית. <br>**כשל בטוח:** כל דגל שלא נבדק **עולה** (`scan_incomplete`), ואף פעם לא מדלגים עליו. נרשם ב-trace, במדדים ובקוד heartbeat `redflag_scan`. <br>**CI:** קלט זדוני של 16,000 תווי עברית ו-32,000 תווי ASCII. ביטויי `output-rules` נמדדים ב-worker עם timeout. <br>**נמדד:** `(א+)+ב` על 16,000 תווים לוקח ב-re2js כ-6ms, וב-V8 נהרג אחרי 2 שניות. ARCH §1.5, §6.1, §10.1 |
| **ג.3: ה-cookie לא מתנקה** | **תוקן** | `Set-Cookie: __Host-intake_sid=; Path=/; Secure; HttpOnly; SameSite=Strict; Max-Age=0`, בלי `Domain`, כי `__Host-` אוסר אותו. ההגדרה והניקוי נבנים מאותו קבוע, ובדיקת יחידה משווה את התכונות. אותה כותרת ב-`DELETE` ובעצירה. בדיקת Playwright לפי `context.cookies()`, כי העוגייה HttpOnly. ARCH §8.2, §13.1 צעד 5, §16 |
| **ג.4: כלל הקדימות ב-S8** (החלק של הארכיטקט) | **תוקן** | טבלה של 4 מצבים, `delivery` × `content_deleted`. הכותרת לפי המסירה (`title` / `title.pending`), ושורת הפרטיות לפי שני השדות, כולל `both_pending` של תפקיד 3. ARCH §13.1 |
| **ג.5: הקבלה נכתבת אחרונה** | **תוקן** | קבלה עם `delivery: pending` נכתבת מיד אחרי הפנייה, לפני המחיקה, ומתעדכנת בסוף. אחרי שליחה הדפדפן מאפס את התמליל בזיכרון. ARCH §13.1 צעדים 2 ו-5, §16 |
| עצירת ניתוב (נמצא בדרך) | **תוקן** | §6.1 צעד 12 אמר "בעצירה נשמר רק השלד", אבל ה-schema לא אכף את זה. עכשיו עצירה מחייבת `contentFree` ו-`purge_at`. 2 מקרים שליליים |
| תוספת המנהל: כותרת לבלוק משני | **תוקן** | `red_flag_blocks[].title_text_ref`: חובה בבלוק משני, שהוא תמיד `hotline`, בתבנית `redflag.title.hotline.<flag_id>`. אסור בבלוק הראשי, כי הכותרת שלו היא `title` של התוצאה. `intake:check` צעד 14 בודק שהנוסח קיים לכל דגל `hotline`. מקרה חיובי ו-4 שליליים (`env.T.*`). ARCH §1.5, §1.10 |
| תוספת המבקר: D-14 | **תוקן** | "החלטת הארכיטקט" → "D-14: מחליטה הדס; המלצת הארכיטקט". ARCH §13.2, §20 #31, §22. גם בסבב 4 כאן נכתב "הוחלט: כן". זו הייתה המלצה |
| התייעצות E1 | **נענה** | `consults/round2_architect.md`: ⚠. הגבול כפי שנכתב לא ניתן לביצוע. ההצעה: רשימת נתיבים שמכונה בודקת, כולל קבצים שמפנים למזהים שהשתנו, ובדיקות ירוקות לפני הביקורת |

**נדרש מאחרים:** תפקיד 7 מוסיף את `re2js` כתלות ישירה, ואת `ajv` ו-`re2js` כתלויות פיתוח. היום שתיהן מגיעות רק בעקיפין, דרך stylelint ו-firebase, ו-`npm prune` עלול להסיר אותן. תפקיד 7 גם מכניס את ביטויי המיסוך לסוויטה (ARCH §22). `about.data@v2` ("רישום טכני") נשאר אצל תפקיד 3.

**שאר הבדיקות:** `node docs/assessment/content/build_texts_json.mjs --check` → `check: OK, texts.he.json matches texts.he.md`.

### הפלט של המריץ (כמו שהוא)

`node docs/assessment/architecture/contracts/tests/run.mjs` (exit 0), הריצה האחרונה על הקבצים הסופיים:

```text
schemas: 17/17 compile under Ajv 8.20.0 strict, 0 warnings
cases: 183/183 as expected (42 valid, 141 invalid) in 14 files
  case-file.schema.json              7 valid   28 invalid  ok
  channel-envelope.schema.json       8 valid   20 invalid  ok
  common.schema.json                 4 valid    7 invalid  ok
  consent-record.schema.json         1 valid    4 invalid  ok
  decision-table.schema.json         1 valid    9 invalid  ok
  eval-gold-extract.schema.json      1 valid    3 invalid  ok
  extractor-output.schema.json       1 valid    4 invalid  ok
  faq.schema.json                    1 valid    3 invalid  ok
  fixed-texts.schema.json            1 valid    6 invalid  ok
  generator-output.schema.json       1 valid    3 invalid  ok
  lead-record.schema.json            3 valid   11 invalid  ok
  metrics-record.schema.json         5 valid    8 invalid  ok
  output-rules.schema.json           1 valid    4 invalid  ok
  red-flags.schema.json              1 valid   15 invalid  ok
  referrals.schema.json              1 valid    2 invalid  ok
  slot-catalog.schema.json           2 valid    6 invalid  ok
  trace-record.schema.json           3 valid    8 invalid  ok
regex lint self-test: 20/20 (known-bad rejected, known-good accepted)
engine self-test: (א+)+ב on 16000 chars: linear engine 6.0 ms; V8 killed after 2000 ms (timeout)
red-flag patterns (linear mode): 6/6 pass lint P1-P4
engine agreement (re2js vs ECMAScript u): 108 pattern x phrase pairs checked
red-flag timing (re2js, 16000 Hebrew / 32000 ASCII chars, 8-10 adversarial inputs each): worst single pattern 6.4 ms (sudden_onset/face_droop, 'digits'); worst whole-set 7.2 ms ('literal_near_miss'); budgets 20/250 ms
output-rules.json (v8 mode, 3000 chars): 28/28 pass lint P1-P5; worst 0.17 ms (tips_word, 'aleph_run'), budget 5 ms

ALL PASS
```

## ארכיטקט — סבב 6 (ARCHITECTURE.md טיוטה 3.2)

2026-10-06 · תפקיד 6, מופע חדש. סבב קטן אחרון לפני שער 1. שלוש משימות: ההשלכות של התייעצות ה-Frontend, ה-ReDoS בביטויי המיסוך (אבטחה, אימות סגירה סבב 3, בינוני), ותשובה על שתי ההצעות של אחראי היעילות. **כלל 9:** כל טענה על המריץ מגובה בפלט שלמטה. הטענות על קוד האתר נבדקו מול הריפו (קבצים ושורות בטבלה). עמוד הכלי עצמו **לא נבנה**, ולכן תנאי הקבלה של §8.4.7 הם מפרט, לא תוצאה.

### מה שונה

| נושא | סטטוס | מה ואיפה |
|---|---|---|
| **Frontend §3: entry נפרד** | **נרשם** | ARCH §8.4.1. `intake/index.html`, מפתח שני ב-`rollupOptions.input`, `createRoot` משלו, בלי `lazy` למסכים הבטיחותיים, בלי inline, ותקציב חבילה אחרי הבנייה הראשונה. **אומת:** gtag ב-`<head>` הסטטי של `index.html` (שורות 5–30), ו-`input` כבר אובייקט (`main`) |
| ↳ rewrite | **שונה** | ה-redirect של טיוטה 3.1 ("כמו `/landing/*`") בוטל. במקומו `/intake/* → /intake/index.html 200` לפני ה-catch-all. ל-`/intake/` הוא לא נחוץ, ובזה ה-Frontend צודק. בלעדיו, כל כתובת אחרת תחת `/intake/` מקבלת את ה-HTML של האתר עם gtag. כותרות ל-`/intake` ול-`/intake/*` (§8.4.5) |
| **ממצא 1: Header/Footer** | **נרשם** | §8.4.2. chrome סטטי מ-`header.yml`/`footer.yml` בזמן build, וקישורים כ-`<a href>`. `no-restricted-imports` על firebase, yamlLoader, firebaseLoader, Header, Footer, SEOHead, GoogleAnalytics, react-helmet-async, aos ו-framer-motion. **אומת:** `Header.jsx:82` ו-`Footer.jsx` קוראים ל-`loadYamlContent`; `firebaseLoader.js:14,27` (`getDoc`/`setDoc`) |
| **ממצא 2: גופנים** | **נרשם, ממתין לאליה** | §8.4.3. woff2 מקומיים (`@fontsource`), וה-`@import` עובר לקובץ שרק האתר טוען. החלופה אם אליה לא מאשרת: הכלי לא מייבא את `global.css`. **אומת:** `global.css:1`, שמיובא ב-`main.jsx:4` וב-`App.jsx:25` |
| **ממצא 4: fallback סטטי** | **נרשם** | §8.4.4, §10.8. הבלוק ב-`#root` כולל 101 עם השם הנגיש, טלפון ווואטסאפ. הוא נוצר בזמן build מ-`texts.he.json`, ו-CI משווה אותו לקובץ. **תוספת שלי:** הבלוק מוצג בכל טעינה רגילה עד ש-React עולה, ולכן "לא זמין כרגע" היה מבהיל. ביקשתי מתפקיד 3 נוסח `fallback.static` שנכון בשני המצבים, ו-`system.unavailable` נשאר ל-`<noscript>`. נוסף Error Boundary עליון, וה-announcer הסטטי מחוץ ל-`#root` |
| **Frontend §3: צנרת ה-SEO** | **נרשם** | §8.4.6. **אומת:** `vitePrerender.routes`, `PAGE_META` (לולאה רק עליו, `inject-seo-meta.js:277`) ו-`staticPages` (`generate-sitemap.js:38`) הם רשימות מפורשות. `fix-landing-paths.js` עובד רק על `public/landing`, ו-`sync-content.js` רק מעתיק תוכן. אין שינוי |
| **CSP** | **נוסף, ממתין לאבטחה** | `base-uri 'none'`, `object-src 'none'`, `form-action 'self'` (§8.4.5) |
| **אבטחה סבב 3: מיסוך ב-V8** | **תוקן** | §1.5 פריטים 6–7, §6.1 צעדים 1–2, התרשים ב-§6, §10.1, §1.11 צעד 13. **המיסוך רץ רק ב-re2js:** אותם כללים (P1–P4 במצב `linear`), אותם תקציבים (50/500ms בזמן ריצה, 20/250ms ב-CI, נפרדים מתקציב הסריקה), ואותו כשל בטוח: מיסוך שלא הושלם → הטקסט לא נסרק, לא נשמר ולא נשלח, כל הדגלים עולים (`scan_incomplete`), ו-S6. אף פעם לא מדלגים. **הנרמול** שנשאר ב-V8 מוגבל למחלקת תו אחת בלי כמת. **החלופה שנדחתה:** סריקת הדגלים על הטקסט הלא ממוסך בזיכרון. היא מוסיפה מסלול שלישי, לאירוע ש-CI אמור למנוע |
| ↳ חוזה | **שונה** | `trace-record`: `input.mask` (`status`, `ms`, `patterns_evaluated`, בלי טקסט), ו-`scan.status: mask_incomplete`. שני כללי `allOf` קושרים ביניהם בשני הכיוונים. `case-file`: התיאור של `scan_incomplete`. 5 מקרים חדשים: חיובי אחד ו-4 שליליים (`tr.ok.mask_incomplete`, `tr.RX.mask_failed_but_scan_ran`, `tr.RX.mask_incomplete_without_mask_failure`, `tr.RX.mask_status_skipped`, `tr.RX.mask_carries_text`) |
| ↳ מריץ | **נוסף** | `regex_safety.mjs`: `MASK_REFERENCE` (סט לדוגמה: `number_run` ו-`email`, שמוצאים מועמדים; הסיווג בקוד), `maskInputs` (שמונת הקלטים הקיימים ועוד 10 בצורת מזהים), `timeMask` (find-all), ובדיקה עצמית עם ביטוי הגישוש של האבטחה. **בדיקת מוטציה (ידנית, בלי קובץ):** הוספתי לסט המיסוך את ביטוי הגישוש, ביטוי עם lookaround, ו-`\d`. הסוויטה נכשלה על שלושתם: תקציב (233ms), lint (P1/P2), ו"מצא מועמד" ב-6 משפטי "לא מועמד" |

### התייעצות E1 (`consults/round2_architect.md`, סבב 6)

- **(א) אסקלציה לכתיבה ב-Opus אחרי שתי ביקורות כושלות: ✔ בתנאים.** "נכשל" = ממצא חוסם, לכל מודול ולכל פריט עבודה. קודם בודקים אם הבעיה בחוזה (אם כן, היא עולה אליי ולא לכותב חדש). הכותב החדש הוא מופע Opus חדש ולא המבקר (E8), והשער הירוק נשאר. אחרי שני כשלונות של Opus עוצרים ומעלים אליי.
- **(ב1) סט הזהב ברשימה הסגורה: ✔.** הוא שומר: הוא מחליף מדגם (D-01), ממנו נבחר הספק, ובו נבדקת שכבה 2 של הדגלים. `intake:check` סופר מקרים, אבל לא בודק תוויות. הנתיבים: `intake/eval/**`. תווית של דגל, שער ניתוב או קטין היא החלטה קלינית.
- **(ב2) קוד ההמרה מצד השרת ברשימה הסגורה: ✔.** זה הגבול של D-06, ושבעת האינווריאנטים של §13.4 הם באגים שקטים. מודול יחיד `intake/notify/adsConversion*` (§19), עם בדיקה סטטית ובדיקה של מפתחות המטען.
- **תוספת:** `intake/index.html`, תוסף ה-build של הבלוק הסטטי, והבלוקים של `/intake` ב-`netlify.toml` נכנסים לרשימת הנתיבים.

**נדרש מאחרים:**
- **תפקיד 7:** ביטויי המיסוך דרך re2js, עם `timeMask` ב-`intake:check` (§22).
- **תפקיד 8:** §8.4.
- **תפקיד 4:** לא לגעת ב-prerender, ב-`PAGE_META` וב-sitemap, וה-`<head>` של הכלי.
- **תפקיד 3:** הנוסח `fallback.static`.
- **אבטחה:** אישור ה-CSP, ה-rewrite והמיסוך.
- **אליה:** הגופנים, המבנה של עמוד הכלי, ושינוי ב-`global.css`.

**שאר הבדיקות:** `node docs/assessment/content/build_texts_json.mjs --check` → `check: OK, texts.he.json matches texts.he.md`.

### הפלט של המריץ (כמו שהוא)

`node docs/assessment/architecture/contracts/tests/run.mjs` (exit 0), הריצה האחרונה על הקבצים הסופיים:

```text
schemas: 17/17 compile under Ajv 8.20.0 strict, 0 warnings
cases: 188/188 as expected (43 valid, 145 invalid) in 14 files
  case-file.schema.json              7 valid   28 invalid  ok
  channel-envelope.schema.json       8 valid   20 invalid  ok
  common.schema.json                 4 valid    7 invalid  ok
  consent-record.schema.json         1 valid    4 invalid  ok
  decision-table.schema.json         1 valid    9 invalid  ok
  eval-gold-extract.schema.json      1 valid    3 invalid  ok
  extractor-output.schema.json       1 valid    4 invalid  ok
  faq.schema.json                    1 valid    3 invalid  ok
  fixed-texts.schema.json            1 valid    6 invalid  ok
  generator-output.schema.json       1 valid    3 invalid  ok
  lead-record.schema.json            3 valid   11 invalid  ok
  metrics-record.schema.json         5 valid    8 invalid  ok
  output-rules.schema.json           1 valid    4 invalid  ok
  red-flags.schema.json              1 valid   15 invalid  ok
  referrals.schema.json              1 valid    2 invalid  ok
  slot-catalog.schema.json           2 valid    6 invalid  ok
  trace-record.schema.json           4 valid   12 invalid  ok
regex lint self-test: 20/20 (known-bad rejected, known-good accepted)
engine self-test: (א+)+ב on 16000 chars: linear engine 5.6 ms; V8 killed after 2000 ms (timeout)
red-flag patterns (linear mode): 6/6 pass lint P1-P4
engine agreement (re2js vs ECMAScript u): 108 pattern x phrase pairs checked
red-flag timing (re2js, 16000 Hebrew / 32000 ASCII chars, 8-10 adversarial inputs each): worst single pattern 6.2 ms (sudden_onset/face_droop, 'digits'); worst whole-set 7.1 ms ('literal_near_miss'); budgets 20/250 ms
masking patterns (linear mode, reference set): 2/2 pass lint P1-P4
masking engine agreement (every match, re2js vs ECMAScript u): 26 pattern x phrase pairs; expectations 13/13 (7 candidate, 6 none)
masking timing (re2js find-all, 16000 Hebrew / 32000 ASCII chars, 18 adversarial inputs each): worst single pattern 8.4 ms (email, 'email_run'); worst whole-set 13.1 ms ('email_run'); budgets 20/250 ms
masking timing-net self-test (security probe \d{1,50}[- ]?\d{1,50}[- ]?\d{1,50}[- ]?\d{1,50}x): lint passes it (P1-P5); re2js 252.3 ms on 'digits_open' vs budget 20 ms -> caught; V8 on 200 digits killed after 1000 ms (timeout)
output-rules.json (v8 mode, 3000 chars): 28/28 pass lint P1-P5; worst 0.19 ms (tips_word, 'aleph_run'), budget 5 ms

ALL PASS
```

# נוסחים קבועים — העוזר הדיגיטלי של הדס

סטטוס: טיוטה 3 · 2026-10-05 · תפקיד 3 (מעצב שיחה וכותב תוכן) · הסבב האחרון לפני שער 1
הקול והטון: `VOICE_AND_TONE.md`. במקרה של סתירה עם `GOALS.md` — GOALS.md גובר.
**הקובץ הזה הוא המקור הקריא. `texts.he.json` נגזר ממנו מכנית** (ARCHITECTURE §1.9) בעזרת
`content/build_texts_json.mjs`, שגם מאמת מול `contracts/fixed-texts.schema.json`. משנים כאן ומריצים
`node docs/assessment/content/build_texts_json.mjs`. לא עורכים את ה-JSON ידנית.
סבב 3: יישור מול `DECISIONS.md` (D-01–D-04), `reviews/legal_phase1.md` §2, `reviews/security_phase1.md`,
`ux/UX_SPEC.md` טיוטה 3 (§7.0), `ui/COMPONENTS.md` §10 והמוקאפ, ו-`clinical/DRAFT_NOTES.md` §9–9.1
(תוכנית מטרות v2).
סבב 4 (רשימה סגורה אחרי סבב 4 של הארכיטקט, `reviews/FIX_REPORTS.md`): נוסחי 32KB, בלי מודל, פרטיות במסך האישור
לפי מצב המסירה, שורת התוספת של `document_request`, ו-D-13 (שאלת גיל ו-`minor.self.before_text`);
`error.delete_failed@v2`; יצאו משימוש `redflag.cta.er` ו-`hadas.email.tag.possible_duplicate`. פירוט ב"יומן שינויים — סבב 4".
סבב 4.1 (רשימה סגורה אחרי `ux/UX_SPEC.md` טיוטה 4.1): S8 כשהמסירה ממתינה (`form.confirmation.what_now.pending`, `.when.pending`),
שורת סגירה בלי טופס במסך הדגל (`redflag.after.no_form`), `redflag.form_not_sent` אחרי 403, וכותרת לפי סוג לכל בלוק קו סיוע משני
(`redflag.title.hotline.distress`, `.child_safety`). נוקו גם שאריות ההפניה ל-`hadas.email.tag.possible_duplicate`. פירוט ב"יומן שינויים — סבב 4.1".

## מוסכמות

- **מזהה:** `<אזור>.<שם>[.<וריאנט>]@v<מספר>`. אותיות לטיניות קטנות, ספרות וקו תחתון, 2–6 מקטעים.
  מזהי מטרות, דגלים וסימני wtc לקוחים כמו שהם מ-DRAFT_NOTES §7.
- **גרסאות:** כל שינוי בטקסט, גם פסיק, מעלה גרסה. שינוי בהערה לא מעלה גרסה. כל הווריאנטים של
  נוסח חולקים את הגרסה שלו. מזהה שיצא משימוש לא חוזר לשימוש.
- **מבנה (להמרה המכנית):** כל נוסח, כולל כל כפתור, הוא כותרת `####`/`#####` עם המזהה. **רק שורות
  `>` הן טקסט שמוצג.** "**איפה:**" → `purpose_he`. "**הערה:**", "**מתי:**", "**סטטוס:**" → `notes`.
  פסקאות מחוץ לנוסח הן הערות לצוות ולא נכנסות ל-JSON.
- **וריאנטים לפי מושא:** סיומת `.self` / `.child.m` / `.child.f` / `.child.n` / `.other` →
  `variants.self` / `child_m` / ... **רק אם נוסח הבסיס קיים כותרת בקובץ.** לכן `q.relation.opt.self`
  ו-`faq.topic.other` הם נוסחים עצמאיים ולא וריאנטים.
- **וריאנט ערוץ (חדש בסבב 3):** סיומת `.wa` → `variants.whatsapp`, ו-`.wa.self` (וכו') →
  `variants["whatsapp.self"]`. משתמשים בו רק כשנוסח האתר לא נכון בוואטסאפ, למשל כי שם הדס רואה כל הודעה.
- **סימונים:** ⚖️ = `legal_review: "required"` · **(קליני)** = המשמעות היא החלטה של הדס ·
  **(עובדה)** = כל הערכים מגיעים מ-`faq.json` → `facts`, באישור הדס.
- **"לא פעיל" (סבב 3; סבב 4: שדה `active`):** נוסח שנשמר אבל לא מוצג בהשקה מקבל שורת
  "**סטטוס:** לא פעיל — <סיבה>", שעוברת ל-`notes` ומתחילה תמיד ב"סטטוס: לא פעיל". שורת "**סטטוס הסעיף:**"
  חלה על כל הנוסחים עד הכותרת `##` הבאה. **בסבב 4 הממיר גם כותב `active: false`** (החוזה `fixed-texts` דורש `notes`
  כשהשדה כבוי, וה"סיבה" היא אותה שורה). נוסח פעיל לא נושא את השדה (ברירת המחדל `true`).
  **"יצא משימוש"** שונה: הנוסח נמחק מהקובץ ונרשם בטבלת "יצאו משימוש" שביומן, והמזהה לא חוזר לשימוש.
- **נוסחי פרטיות (חדש בסבב 3, L-11):** כל משפט על שמירה, מחיקה או מי רואה מתאר בדיוק את D-01. אין "רק",
  "אף פעם" או "נמחק" בלי בדיקה מול D-01 ו-ARCHITECTURE §11.1. משכי זמן מגיעים מ-`{{deletion_clause}}` ומ-`{{expiry_clause}}`
  (facts, ARCHITECTURE §11.1). **ארבעה חריגים,** שבהם משך הזמן כתוב במילים כי שום משפט שלם לא מתאים שם:
  `error.delete_failed` ("כ-24 שעות", הניקוי השעתי; סבב 4), `form.confirmation.privacy.pending` ("כשבוע": 7 ימים של
  ניסיונות מסירה, ועוד עד שעה של ניקוי), `form.confirmation.privacy.delete_pending` ("כשעה", הניקוי השעתי) ו-`.both_pending`
  (שניהם). משכים עם "כ-" נכתבים כך בכוונה: כל אחד יכול לחרוג בשעה. אם אחד מהערכים בארכיטקטורה משתנה
  (§9.1, §11.1, §13.1), משנים גם אותם.
- **שאלות קבועות (ARCHITECTURE §5.6):** בגרסה 1 אין מנסח בתורות השאלה. כל שאלה מוצגת כמו שהיא כתובה כאן,
  לפעמים אחרי קידומת `ack.*`. לכן כל `goal.<id>.ask` עומד בפני עצמו, ומתאים אחרי כל קידומת.
- **סימון מותר בטקסט:** שורה חדשה, `**מודגש**`, `[תווית](url)` (רק לכתובות ברשימת המותרים). מתאם
  הוואטסאפ ממיר `**…**` לסימון של וואטסאפ.
- **נייטרליות מגדרית** כלפי הפונה (VOICE §2). "תקין" ו"אין צורך" לא מופיעים באף נוסח. מקצועות
  כתובים בצורה המוסדית ("רופא המשפחה"), בלי לוכסנים.
- **משתנים:** רק ממרשם המשתנים (ARCHITECTURE §1.9, והתוספות בטבלה כאן). **אף משתנה לא צמוד לאות
  עברית** ("ל{{x}}" או "מלאכותית{{x}}" אסורים). משתני "clause" עומדים כמשפט שלם ונפרד.
  **אין `{{fact}}` ואין `{{redflag_specific}}`** — לכל דגל ולכל נושא FAQ יש נוסח שלם משלו.
- **101:** כל נוסח שמוצג כשהעוזר לא יכול להמשיך או לא מבין את הפונה (לא זמין, הגבלת קצב, שפה,
  הודעה קולית, קובץ, סיום שיחה) כולל 101. דגל אדום יכול להגיע בכל אחד מהמצבים האלה.

### משתנים

| משתנה | מקור | הצורה הנדרשת של הערך |
|---|---|---|
| `{{hadas_phone}}` · `{{hadas_whatsapp_link}}` · `{{privacy_url}}` · `{{privacy_contact}}` · `{{response_time}}` · `{{followup_time}}` | facts (הדס / אליה / עו"ד) | `response_time` נכנס אחרי "בדרך כלל", למשל "תוך יום עבודה" |
| `{{ai_provider_name}}` | facts (ארכיטקט אחרי הבנצ'מרק + עו"ד) — **חדש בסבב 3** | שם הספק כפי שיוצג, למשל "Anthropic". SEC-01: מי שקורא "מי רואה" צריך לדעת למי זה עובר |
| `{{ai_provider_clause}}` | facts (ארכיטקט + עו"ד) | **משפט שלם** שאומר איפה הספק פועל וכמה זמן **הוא** שומר (SEC-23), למשל "הספק פועל מחוץ לישראל, ואינו שומר את המידע." **עד 7 מילים**, כדי ש-`consent.disclaimer` יישאר עד 70 מילים |
| `{{deletion_clause}}` | facts (ARCHITECTURE §11.1) — מחליף את `retention_period` | **משפט שלם, עד 11 מילים** (בגלל `consent.disclaimer`). ערך מומלץ: "השיחה נמחקת ב"סיום ומחיקה", או מעצמה אחרי 24 שעות בלי פעילות." (נכון גם עם התקרה של 72 שעות, שרק מקדימה את המחיקה). פנייה שנשלחה נכתבת בנפרד, בנוסחים שצריכים אותה |
| `{{expiry_clause}}` | facts (ARCHITECTURE §11.1) | **משפט שלם.** ערך מומלץ: "אפשר לחזור לשיחה מהמכשיר הזה עד 24 שעות אחרי ההודעה האחרונה, ואז היא נמחקת." |
| `{{response_time_away}}` | facts — מחליף את `response_time` כשהדס בחופשה (ARCHITECTURE §13.2) | באותה צורה כמו `response_time` |
| `{{wa_retention_clause}}` | facts (שלב 2) — **חדש בסבב 3** (SEC-16) | משפט שלם על השמירה בערוץ הוואטסאפ |
| `{{transcript_clause}}` | facts | משפט שלם **לפונה**, למשל "להדס נשלחים סיכום וציטוטים מהשיחה, לא השיחה המלאה." |
| `{{callback_number}}` | facts | המספר שממנו הדס חוזרת |
| `{{mda_text_channel}}` | facts — **לאמת מול מד"א** | משמש רק ב-`redflag.cant_speak` (לא פעיל). שם הערוץ הכתוב ואיך משתמשים בו, רק אם מד"א אישרו שהוא קיים |
| `{{sahar_url}}` | facts — **לאמת** | קישור לצ'אט של סה"ר (נכנס גם לרשימת המותרים) |
| `{{site_url}}` | תצורת פריסה — **חדש בסבב 3** | כתובת האתר, ל-`reporter.copy_payload` |
| `{{retention_period}}` · `{{lead_first_name}}` · `{{week_counts}}` · `{{pending_count}}` | — | **לא בשימוש מסבב 3.** `retention_period` הוחלף ב-`deletion_clause`. שאר הנוסחים שהשתמשו בהם יצאו משימוש (הארכיטקט ביטל את השם הפרטי במייל החודשי) |
| עובדות FAQ (סעיף 6) | facts — **חדשים** | לכל נושא עובדה משלו. עובדה שלא אושרה → הרשומה חסרה → `faq.missing` |
| `{{subject_ref}}` | `subject_ref.*` (סעיף 7) | אף פעם לא שם |
| `{{referral_name}}` · `{{referral_description}}` · `{{referral_contact}}` | referrals.json | |
| `{{relative_time}}` · `{{submitted_date}}` · `{{error_count}}` · `{{stage_number}}` · `{{stage_name}}` | מנוע / ממשק | לרשום במרשם |
| `{{consent_time}}` · `{{disclaimer_version}}` · `{{outcome_label}}` · `{{outcome_text_version}}` · `{{redflag_type}}` · `{{redflag_text_id}}` | מנוע | לצד של הדס |
| `{{outcome_number}}` · `{{received_at}}` | מנוע | לצד של הדס |
| `{{entry_point}}` · `{{lead_ref}}` · `{{month_label}}` · `{{conversations_count}}` · `{{leads_count}}` · `{{referrals_count}}` · `{{redflags_count}}` · `{{interim_count}}` | מנוע — **חדשים בסבב 3, לרשום** | המייל להדס והמייל החודשי (UX §5.2, §5.5). `lead_ref` הוא מזהה הפנייה הקצר שכבר מופיע בשולי המייל (למשל K7Q-2M), במקום השם הפרטי. המספרים מופיעים אחרי נקודתיים, כך שאין בעיית יחיד ורבים |
| `{{age_months}}` | מנוע — **חדש בסבב 3, לרשום** | גיל בחודשים, לשורת האימות (`wrapup.age.months`) |

### רשימת בדיקה למבקר הסיכונים המשפטיים ⚖️

כל כותרת עם ⚖️. במיוחד בסבב 3: `consent.disclaimer`, `consent.checkbox` (וחלופות `.ack` / `.data`),
כל נוסחי המחיקה (`chat.delete.*`, `chat.end.confirm`, `resume.restart_confirm`, `error.session_expired`,
`error.delete_failed`, `form.confirmation.privacy` (וגם `.pending`, `.delete_pending` ו-`.both_pending`), `form.confirmation.title.pending`, `closed.keep_note`), `meta.who_sees`, `about.data`,
`meta.data_deletion`, `meta.omit_request`, `meta.document_request` (וגם `outcome.addendum.document_request`), `minor.self`
(וגם `minor.self.before_text`, שכולל את מספרי ער"ן וסה"ר לאימות), `system.model_free`, `reporter.not_parent`,
`redflag.footer`, `redflag.type.sudden_onset`, `redflag.type.distress` (וריאנט וואטסאפ), `wa.opening`,
`outcome.1.body`, `outcome.3.*` (לא פעיל), `language.unsupported`.
סבב 4.1: `form.confirmation.what_now.pending` (מה נאמר על המסירה שעוד לא קרתה), `redflag.after.no_form`,
`redflag.form_not_sent` (מה נאמר על פרטים שלא נשלחו), `redflag.title.hotline.distress` ו-`redflag.title.hotline.child_safety`
(האחרון לא להפעיל לפני תשובת עורך הדין, כמו `redflag.type.child_safety`).

### יומן שינויים — סבב 4.1 (וסעיפי הנגישות של טיוטה 4.2)

רשימה סגורה מ-`ux/UX_SPEC.md` טיוטה 4.1 (§0.2, §7.0), ועוד שני סעיפי נגישות של טיוטה 4.2 (`consults/round2_accessibility.md`). נוסח קיים אחד עלה בגרסה (`redflag.cta.call.a11y@v2`). בשאר שונו רק הערות.
⚖️ = לעורך הדין. אישורים: `approvals` ריק, כל הנוסחים החדשים טיוטה.

**חדש (7):**

| נוסח | מקור | הערה |
|---|---|---|
| `form.confirmation.what_now.pending@v1` ⚖️ | UX S8, `delivery: pending` | במקום `form.confirmation.what_now`. ההעברה עוד לא הושלמה, והסיכום יקרא כשיגיע. בלי "נשלח", "התקבל", "הגיע", "תקלה", ובלי זמן |
| `form.confirmation.when.pending@v1` (עובדה) | UX S8, `delivery: pending` | במקום `form.confirmation.when`. "אחרי שהסיכום יגיע אליה": הזמן מתחיל בהגעה ולא בלחיצה, ואין בו הבטחה שכבר הגיע |
| `redflag.after.no_form@v1` ⚖️ | UX S6 (4.1) | בלוק `urgent` ראשי כש-`form: none`, במקום `redflag.after@v2`. הטלפון כטקסט, בלי טופס ובלי "להשאיר פרטים" |
| `redflag.form_not_sent@v1` ⚖️ | UX S6/S7 (4.1) | רק אחרי 403 `form_blocked`. לא חוסם. אומר רק ש"לא נשלחו", בלי "נמחקו" |
| `redflag.title.hotline.distress@v1` ⚖️ | UX S6 משולב, מוקאפ `combined3` | כותרת h2 של בלוק מצוקה משני: "אם קשה עכשיו" |
| `redflag.title.hotline.child_safety@v1` ⚖️ | UX S6 משולב, מוקאפ `combined3` | כותרת h2 של בלוק בטיחות ילד משני: "אם יש חשש לפגיעה בילד". סטטוס טיוטה, כמו `redflag.type.child_safety` |
| `a11y.buttons_hint@v1` ⚖️ | נגישות 4ד.2, §1 תנאי 5; UX 4.2 §0.4 | רמז מוסתר לקורא מסך, אחרי כל הודעה שאחריה כפתורי בחירה: "יש אפשרויות לבחירה מתחת להודעה." בהקשת הגיל (D-13) הוא תנאי בטיחות. בבאנדל |

**גרסה חדשה (1):**

| נוסח | מקור | מה השתנה |
|---|---|---|
| `redflag.cta.call.a11y@v2` ⚖️ | נגישות 4ב.3, WCAG 2.5.3 (רמה A) | "חיוג למד"א 101" ← "חיוג ל-101, מד"א". השם הנגיש פותח בדיוק בטקסט הגלוי "חיוג ל-101". הממיר בודק עכשיו שכל `<מזהה>.a11y` פותח בנוסח הבסיס שלו |

**הערות שנסגרו (בלי שינוי בטקסט, בלי העלאת גרסה):** `form.confirmation.title.pending` (השאלה "האם `what_now` ו-`when` נשארים במצב pending"
נענתה: שניהם מוחלפים). `redflag.after@v2`: נוסף שהוא מוצג רק כש-`form: secondary`.

**שאריות `hadas.email.tag.possible_duplicate`:** הנוסח עצמו יצא כבר בסבב 4 (גרסה 0.4.0 של הקובץ) ואינו קיים ב-`texts.he.md` או ב-`texts.he.json`
(נבדק: אין כותרת, אין מפתח). נשארה שורה אחת מטעה, ברשימת "חדש" של סבב 3, שהציגה אותו כנוסח חי. היא סומנה "(יצא משימוש בסבב 4)".
ההפניות האחרות הן רישום ההוצאה משימוש (כאן, בסבב 4 ובהיסטוריית `build_texts_json.mjs`), ונשארות בכוונה כדי שהמזהה לא יחזור לשימוש.

**כותרות לפי סוג (סעיף 4 ברשימה): למה לא כותרת משותפת.** בבלוקים משניים של דגלי `hotline` (`distress`, `child_safety`) יש שני h2 עם אותה כותרת
כשהמסך נושא את שניהם (חירום או urgent ראשי, ועוד שני דגלי קו סיוע). זה בעייתי לקורא מסך שמנווט לפי כותרות, ומעורפל לעין: שני בלוקים
שונים, ואותו "אפשר לדבר עם מישהו עכשיו". לכן לכל סוג כותרת משלו, ושתיהן נבדלות גם מהכותרת של הדרגה (כדי שבלוק משני לא יחזור על h1 של בלוק
ראשי מדרגת `hotline`). **הבלוק הראשי מדרגת `hotline` נשאר עם `redflag.title.hotline`** (h1, שם הדרגה בחוזה). **→ ארכיטקט ו-UI:** בחירת הכותרת לבלוק משני היא
לפי הדגל (`redflag.title.hotline.<flag_id>`), ו-`red_flag_blocks` נושא היום רק `text_ref`: צריך להחליט אם הכותרת נגזרת מ-`text_ref` או שדה חדש.
המוקאפ (`sec()` ב-`ui/mockup.html`) ו-`COMPONENTS.md` §3.14 עדיין משתמשים בכותרת הדרגה.

### יומן שינויים — סבב 4

רשימה סגורה מ"ארכיטקט — סבב 4" ב-`reviews/FIX_REPORTS.md` (ARCHITECTURE §1.9, §6.1, §10.3, §13.1; D-13 ענף א).
נוסחים אחרים לא שונו. ⚖️ = לעורך הדין. אישורים: `approvals` ריק, כל הנוסחים החדשים טיוטה.

**חדש (13; 11 ברשימה הראשונה, ועוד 2 בתיקון הזול שלפני שער 1):**

| נוסח | מקור | הערה |
|---|---|---|
| `chat.input.too_long_block@v1` | ARCH §6.1, חוסם 3 (SEC-06) | בבאנדל. 101. ההודעה לא נשלחה והטקסט נשאר בשדה |
| `system.model_free@v1` ⚖️ | ARCH §10.3, D-09 | 101. לא מבטיח שההודעה תיקרא או תגיע להדס |
| `form.confirmation.privacy.pending@v2` ⚖️ | ARCH §13.1, L-04; משפטי, אימות סבב 2 | `delivery: pending`. v2: "תוך כשבוע" במקום "לכל היותר 7 ימים", כי הניקוי השעתי יכול לחרוג בשעה |
| `form.confirmation.privacy.delete_pending@v1` ⚖️ | ARCH §13.1, L-04 | `content_deleted: false`. "כשעה" במילים |
| `form.confirmation.privacy.both_pending@v1` ⚖️ | משפטי, אימות סבב 2 | שניהם ממתינים: אף אחד משני הנוסחים הקיימים לא נכון שם |
| `form.confirmation.title.pending@v1` ⚖️ | משפטי, אימות סבב 2 | "הפרטים בדרך להדס", כש-`delivery: pending`. "נשלחו" לא נכון עד שהמסירה הצליחה |
| `outcome.addendum.document_request@v1` ⚖️ | L-15, ARCH §1.4 (`addenda`) | תוצאות 1, 2, 4. ללא הבטחה למסמך |
| `goal.self_age_band.ask` · `.clarify` · `.rephrase` (v1) | D-13 ענף א, קליני §9.3 | הקשה אחת, מיד אחרי "על עצמי". לא נספרת בתקציב |
| `q.self_age_band.opt.under_18` · `q.self_age_band.opt.adult` (v1) | D-13 ענף א | "מתחת ל-18" · "18 ומעלה". בלי "מעדיף לא לומר" |
| `minor.self.before_text@v1` ⚖️ | D-13 ענף א, קליני §9.3 (3), SEC-02 | 101, ער"ן 1201, סה"ר. **המספרים לאימות לפני השקה** |

D-13 עדיין פתוחה אצל אליה. שישה נוסחים (`goal.self_age_band.*`, `q.self_age_band.opt.*`, `minor.self.before_text`) נכתבו לענף א, שהארכיטקט הצביע עליו.
אם יבחר ענף ב, הם יוצאים משימוש.

**גרסה חדשה (1):**

| נוסח | מקור | מה השתנה |
|---|---|---|
| `error.delete_failed@v2` ⚖️ | SEC-01(4), ARCH §4, §9.1 | "תוך כ-24 שעות מההודעה האחרונה" במקום "לכל המאוחר 24 שעות". הניקוי שעתי, ולכן "כ-" |

**יצאו משימוש (2):** המזהים לא חוזרים לשימוש.

| ישן | למה |
|---|---|
| `redflag.cta.er` | הארכיטקט החליט שאין כפתור "איתור חדר מיון" בגרסה 1 (§20: חיפוש במפות שולח לגוגל "חדר מיון" ומיקום). השורה `redflag.secondary.emergency` נשארת |
| `hadas.email.tag.possible_duplicate` | זיהוי כפילויות קוצץ, ואין תגית כזו ב-`lead-record` (ARCH §7.1) |

**הממיר:** נוסח "לא פעיל" נכתב עם `active: false`; `chat.*`, `resume.*` ו-`closed.keep_note` נכנסו ל-`client_bundle`.
`output-rules.json`: `language.unsupported` ב-`latin_ratio_exempt_text_ids`.

### יומן שינויים — סבב 3

**מקורות:** משפטי = `legal_phase1.md` §2 · אבטחה = `security_phase1.md` · D-xx = `DECISIONS.md` · UX =
`UX_SPEC.md` טיוטה 3 §7.0 · UI = `COMPONENTS.md` §10 והמוקאפ · קליני = `DRAFT_NOTES.md` §9–9.1.

**גרסה חדשה (44):**

| נוסח | מקור | מה השתנה |
|---|---|---|
| `consent.disclaimer@v3` | משפטי 2.1, L-09, D-01, D-02 | "כולל מידע על בריאות", מסירה לא חובה, האחראית, זכויות; המחיקה לפי D-01; 52 מילים קבועות; עד 70 עם שני המשפטים המשתנים |
| `consent.checkbox@v2` | משפטי 2.1 (תיבה אחת), אבטחה SEC-16, UX | אומר בדיוק למה מסכימים, וקישור למדיניות |
| `consent.reconsent_note@v2` | משפטי 2.1 | "נוסח ההסבר וההסכמה" במקום "התנאים" |
| `page.tool.steps@v3` | משפטי 2.1, L-04 | נקודה 3: מה שנשלח להדס נשאר אצלה |
| `resume.prompt@v3` · `resume.restart_confirm@v2` · `resume.submitted.body@v2` | UX, D-01, אבטחה SEC-19 | אפשרות מחיקה; התחלה מחדש מוחקת בשרת; בלי רמז על מי הייתה הפנייה |
| `chat.send.wait@v2` | UI (ד) | ברור מי הדובר |
| `chat.end.confirm@v3` | UX, D-01 | "לצאת" נשמר 24 שעות ואז נמחק; "לצאת ולמחוק" מוחק עכשיו |
| `chat.ended@v2` | מוסכמת 101 | נוסף 101 (היה חסר) |
| `chat.delete.confirm@v2` · `chat.delete.done@v2` | משפטי 2.2, UX, D-01 | "גם מהשרת", ומה נשאר |
| `about.data@v2` | אבטחה SEC-01, D-01 | הספק בשמו, המחיקה לפי D-01, מה קורה אחרי שליחה |
| `meta.identity@v2` · `meta.want_human@v3` · `faq.missing@v2` · `faq.answer.process_duration@v2` | משפטי L-07 (וריאנט ערוץ) | נוסף וריאנט וואטסאפ. נוסח האתר לא השתנה |
| `meta.who_sees@v2` | משפטי 2.1, אבטחה SEC-01 | בלי "רק"; הספק בשמו; השמירה; וריאנט וואטסאפ |
| `meta.diagnosis_request@v2` · `meta.advice_request@v2` | משפטי 2.6, L-11 | "אם יושארו פרטים"; וריאנט וואטסאפ |
| `meta.off_topic_end@v2` | אבטחה SEC-26 | נוסף הטופס |
| `meta.too_long@v2` | אבטחה SEC-06, UX | מה לכתוב קודם, ו-101. הטקסט לא נחסם |
| `meta.data_deletion@v2` | משפטי 2.1, אבטחה SEC-20 | המחיקה מהתפריט, ומה לעשות אחרי שליחה; וריאנט וואטסאפ |
| `language.unsupported@v2` | משפטי 2.6, L-31 | שורה בערבית ושורה ברוסית (לאימות בידי דוברי השפה) |
| `goal.lang_expressive.ask@v2` | קליני §9 | כפתורים; הסיפור עבר ל-`signs_screen` |
| `outcome.3.when_to_contact.intro@v2` | משפטי 2.3, L-29 | "למשל… הרשימה אינה מלאה" (לא פעיל, D-03) |
| `outcome.1.body@v2` | משפטי 2.3, L-21 | מדווח במקום "מומלץ" |
| `outcome.3.body@v3` · `outcome.3.disclaimer@v2` | משפטי 2.3 (חלופה א), L-15 | לא פעיל (D-03) |
| `outcome.4.referral_disclaimer@v2` | משפטי 2.3, L-16 | אין התחייבות לזמינות, הפרטים משתנים |
| `redflag.type.sudden_onset@v2` | משפטי 2.4, L-20; UI (ו) | הפעולה קודם, בלי תנאי. בווריאנט `.self` הוסרה הטענה שיש למד"א ערוץ כתוב |
| `redflag.type.airway@v2` | UI (ו) | בווריאנט `.self` הוסרה אותה טענה |
| `redflag.type.distress@v3` · `redflag.type.child_safety@v3` | משפטי 2.4, L-07 | וריאנט וואטסאפ: ההודעות מגיעות להדס, אבל היא לא עוקבת בזמן אמת. נוסח האתר לא השתנה |
| `error.session_expired@v3` · `fallback.saved@v2` | D-01 | אומרים שהשיחה נמחקה, ולכמה זמן היא שמורה |
| `form.consent.checkbox@v3` · `form.privacy_note@v2` · `form.confirmation.privacy@v2` | משפטי 2.1, L-11, D-01, UX, ARCHITECTURE §11.1 | בלי "רק" על השימוש; תוכן השיחה נמחק עם השליחה; הפנייה אצל הדס; במערכת עד שהמסירה הצליחה (לכל היותר 7 ימים). זה מחליף את `{{lead_retention}}` של המבקר המשפטי |
| `form.confirmation.when@v2` | ARCHITECTURE §13.2 | משפט ה"אם לא חזרו" עבר ל-`form.confirmation.fallback` |
| `wa.opening.fallback@v2` · `wa.no_consent_reply@v2` · `wa.message_only@v2` | ARCHITECTURE §1.9 (101 חובה) | נוסף 101 |
| `wa.opening@v3` | משפטי 2.6, L-17, אבטחה SEC-16 | ספק ה-AI, גיל, שמירה |

**חדש (74, מהם 3 שינויי שם):**

| נוסח | מקור |
|---|---|
| `minor.self` · `reporter.not_parent` · `interim.deleted_note` · `reporter.copy_contact` · `reporter.copied` · `reporter.copy_payload` · `q.relation.opt.child_not_parent` | D-02, משפטי 2.5, UX S13 |
| `meta.document_request` · `hadas.email.tag.document_request` | משפטי 2.5, L-15 |
| `meta.omit_request` | אבטחה SEC-11 |
| `goal.other_awareness.ask` (לא פעיל) | משפטי 2.5, אבטחה SEC-22 |
| `consent.checkbox.ack` · `consent.checkbox.data` (לא פעילים) | משפטי 2.1 (חלופת שתי התיבות, שאלה 17) |
| `redflag.footer` | משפטי 2.4, L-19, UX |
| `redflag.doubt.sudden_onset` | קליני §9 (`screen_neuro.child`, ספק → `urgent`) |
| `redflag.cant_speak` (לא פעיל, לאימות מול מד"א) · `redflag.cta.er` · `redflag.cta.call_1201` | UI (ה), (ו) |
| `redflag.title.urgent` · `redflag.title.hotline` · `redflag.after.hotline` (לא פעיל, D-04) | שמות הדרגות בחוזה `red-flags` (מחליפים את `.medical` / `.helpline`) |
| `goal.screen_neuro.*` · `goal.screen_voice.*` · `goal.screen_swallow.*` · `goal.signs_screen.*` · `goal.core_anything_else.ask` | קליני §9 |
| `resume.delete` · `resume.marker_remove` · `closed.keep_note` · `error.delete_failed` · `faq.topic.prompt` · `chat.input.too_long_hint` · `form.confirmation.add_later` | UX §7.0 |
| `outcome.card.label` · `outcome.stale_label` · `chat.new_message` · `a11y.restored_log` · `form.preview.row.*` (5) | UI, UX |
| `hadas.email.feedback.*` (4) · `hadas.monthly.*` (5) · `hadas.email.btn.*` (2) · `hadas.email.section.received` / `.age` / `.topic` / `.warm_summary` · `hadas.email.tag.possible_duplicate` (יצא משימוש בסבב 4) / `.summary_unavailable` | UX §5.2, §5.3, §5.5; אבטחה SEC-17 (6) |
| `ack.*` (5) · `outcome.extraction_gap` · `form.confirmation.fallback` · `wrapup.fix_prompt` · `wrapup.value.unknown` · `wrapup.age.months` | ARCHITECTURE §5.5, §5.6, §13.2, §22 (הארכיטקט, סבב 3: אימות שנבנה בקוד) |

**יצאו משימוש (53):** 397 − 53 + 74 = 418 נוסחים.

| ישן | מחליף |
|---|---|
| `goal.core_sudden_signs.ask` / `.rephrase` | `goal.screen_neuro.ask` / `.rephrase` |
| `goal.voice_risk_signs.ask` / `.rephrase` | `goal.screen_voice.ask` (+ `ask_3w`) / `.rephrase` |
| `goal.oral_swallow_screen.*` · `goal.adult_swallow_screen.*` | `goal.screen_swallow.*` (רשימה אחת לדגל `swallowing`) |
| `goal.core_onset_time` · `core_impact` · `core_prof_recommended` · `core_prior_eval` · `core_setting_pref` · `core_hopes` · `voice_ent_exam` · `voice_symptoms` · `voice_recent_illness` · `voice_smoking` · `speech_language_concern` · `stuttering_struggle` · `stuttering_awareness` · `oral_airway_ent` · `lang_comprehension` · `lang_hearing` · `lang_social` (כולם `.ask`) | אין מטרה. הסלוטים מתמלאים מ-`signs_screen` או באופן אופורטוניסטי (קליני §9, `retired_as_goals`) |
| `redflag.title.medical` · `redflag.title.helpline` · `redflag.after.helpline` | `redflag.title.urgent` · `redflag.title.hotline` · `redflag.after.hotline` |
| `resume.other_tab` · `resume.here` | אין (שתי לשוניות מסתנכרנות ב-409, UX) |
| `hadas.email.relevance.*` · `hadas.email.rating.*` | `hadas.email.feedback.*` |
| `hadas.reminder.*` · `hadas.digest.*` · `hadas.email.stop_reminders` | `hadas.monthly.*` |
| `hadas.page.reason_tags.*` · `hadas.page.rating_detail.*` | אין (UX §5.3: בלי שאלות המשך). לכן גם התיקון של L-34 ל"לא רצינית" כבר לא נדרש |

**נבדק ולא נוסף:**
- `closed.data_note`, `closed.delete_now`, `dialog.exit.resume_hint` (משפטי §7): UX טיוטה 3 זנח אותם. לפי D-01
  "למחוק עכשיו" התמזג ל"סיום ומחיקה", ולכן S9 מציג את `chat.delete.done` ו-`closed.keep_note`. הרמז על החזרה
  תוך 24 שעות נכנס ל-`chat.end.confirm@v3`.
- `consent.emergency` **נשאר** (UX כתב שלא נדרש). הוא קיים מסבב 2, ומעצב ה-UI לא ראה אותו, כי המוקאפ בנוי על
  טיוטה 1. אם הוא נכנס לתוך `consent.disclaimer`, ההסתייגות עוברת ל-77 מילים. הוא מוצג בדיוק כמו שביקשו:
  סעיף החירום המודגש בתוך תיבת ההסתייגות, ו-101 נראה במסך הראשון.

### מפתח מזהים למוקאפ (→ מעצב ה-UI)

המוקאפ בנוי על טיוטה 1, ולכן הוא מסמן 108 מזהים כחסרים. **58 מהם כבר קיימים בקובץ באותו שם** (נוספו בסבב 2),
**33 קיימים בשם אחר** (הטבלה), ו-**17 היו חסרים באמת** ונכתבו בסבב 3. UX טיוטה 3 קבע שהמזהים כאן קנוניים.

| במוקאפ | בקובץ |
|---|---|
| `about.privacy_link` | `consent.privacy_link` |
| `chat.composer.wait` · `chat.disclaimer.more` · `chat.error.not_sent` · `chat.status.slow` · `chat.stage.${n}` | `chat.send.wait` · `chat.disclaimer_more` · `chat.not_sent` · `chat.slow` · `chat.stage.1–3` |
| `chat.early_handoff.yes` / `.no` | `meta.want_human.to_form` / `.stay` |
| `confirm.back_to_site` · `rf.back_to_site` | `nav.back_to_site` |
| `confirm.disclaimer` · `confirm.from_number` · `confirm.privacy` · `confirm.who` | `form.confirmation.disclaimer` · `.from_number` · `.privacy` · `.who` |
| `delete.done` · `dialog.delete.title` / `.body` / `.confirm` / `.cancel` | `chat.delete.done` · `chat.delete.title` / `.confirm` / `.yes` / `.no` |
| `dialog.exit.title` · `dialog.exit.leave_delete` | `chat.end.title` · `chat.end.leave_delete` (וגם `chat.end.confirm`, `.stay`, `.leave`) |
| `dialog.restart.title` / `.cancel` | `resume.restart_confirm.title` / `.no` (וגם `resume.restart_confirm`, `.yes`) |
| `form.error.fallback` | `error.form_send_repeat` |
| `form.best_time.opt.*` · `form.channel_pref.opt.*` | `form.best_time.morning` / `.noon` / `.evening` · `form.channel_pref.call` / `.whatsapp` |
| `hadas.email.relevance.q` · `hadas.email.rating.q` | יצאו משימוש → `hadas.email.feedback.question` |
| `hadas.page.reason_q` | יצא משימוש (UX §5.3) |
| `outcome.4.referrals.title` | `outcome.4.body` משמש גם ככותרת הרשימה |
| `q.age.child.m` / `.f` | `goal.core_age.ask` (וריאנטים `child_m` / `child_f`) |
| `q.prev_treatment.opt.yes` / `.no` | יצא משימוש עם `core_prior_eval` (קליני §9). תוויות כפתורים הן `label_he` בקטלוג |
| `rf.call_101.a11y` · `rf.contact_hadas` · `rf.secondary` | `redflag.cta.call.a11y` · `redflag.after.emergency` · `redflag.secondary.emergency` (שורה; הכפתור `redflag.cta.er` יצא משימוש בסבב 4) |
| `rf.self_variant` · `rf.away_variant` | הווריאנט `.self` של `redflag.type.*` · שורה קבועה בנוסח הבסיס של דגלי החירום |
| `rf.call_1201` | `redflag.cta.call_1201` |
| `redflag.title` · `redflag.generic` · `redflag.emergency` (מ-T) | `redflag.title.<tier>` + `redflag.type.<id>` (כל הודעה שלמה) |
| `summary.*` · `chat.end.confirm.yes/no` · `q.relation` · `meta.language` · `error.persistent` (מ-T) | `hadas_summary.*` · `chat.end.leave` / `.stay` · `goal.core_relation.ask` · `language.unsupported` · `system.unavailable` |

### יומן שינויים — סבב 2

**גרסה חדשה (הטקסט השתנה מאז טיוטה 1):** `entry.button@v2` · `page.tool.steps@v2` ·
`consent.disclaimer@v2` (קוצר; החירום עבר ל-`consent.emergency`; ספק ה-AI כמשפט נפרד) ·
`chat.disclaimer_line@v2` · `chat.end.confirm@v2` · `meta.want_human@v2` · `resume.prompt@v2` ·
`outcome.disclaimer@v2` · `outcome.3.body@v2` · `faq.source_note@v2` · `form.name.label@v2` ·
`form.consent.checkbox@v2` · `error.rate_limit@v2` (+101) · `error.session_expired@v2` ·
`redflag.after@v2` · `redflag.type.swallowing@v2` · `redflag.type.distress@v2` ·
`redflag.type.child_safety@v2` · `wa.prefix@v2` · `wa.opening@v2` (סימון `**`).

**יצאו משימוש → מחליף:**

| ישן | מחליף |
|---|---|
| `q.relation@v1` | `goal.core_relation.ask` (הכפתורים `q.relation.opt.*` נשארים) |
| `q.age.*` · `q.onset.*` · `q.impact.*` · `q.prev_treatment` · `q.prev_treatment.followup` | `goal.core_age.ask` · `goal.core_onset_pattern.ask` / `goal.core_onset_time.ask` · `goal.core_impact.ask` · `goal.core_prior_eval.ask` |
| `q.situations.*` · `q.anything_else` | אין מטרה מקבילה אצל המנסח הקליני |
| `meta.language@v1` | `language.unsupported` (שם שהמנוע דורש, +101) |
| `wa.voice_message@v1` · `wa.media@v1` | `media.voice_ask_to_type` · `media.unsupported_attachment` (+101) |
| `error.persistent@v1` | `system.unavailable` + `fallback.*` (מסך S10) |
| `summary.*@v1` | `hadas_summary.*` (`summary.disclaimer` → `hadas_summary.header`) |
| `faq.answer_frame@v1` | נוסח שלם לכל נושא, `faq.answer.<topic>` (ARCHITECTURE §1.9: `{{fact}}` לא נתמך) |
| `redflag.title@v1` · `redflag.generic@v1` · `redflag.emergency@v1` | כותרת לכל דרגה + הודעה שלמה לכל סוג |
| `redflag.type.regression@v1` | `redflag.type.child_regression` |
| `outcome.3.when_to_contact.items@v1` | `when_to_contact.<wtc_id>` |
| `form.confirmation.body@v1` | `form.confirmation.what_now` / `.when` / `.from_number` / `.who` / `.disclaimer` / `.privacy` |
| `chat.end.confirm.yes@v1` · `chat.end.confirm.no@v1` | `chat.end.leave` · `chat.end.stay` (+ `chat.end.leave_delete`) |

**נכתב ויצא בתוך סבב 2 (לא נמסר מעולם):** `when_to_contact.wtc_lang_gap` (המנסח הקליני הוציא את
הסימן), `redflag.closing` (כל הודעת דגל שלמה בפני עצמה).

נוסחי טיוטה 1 לא הוצגו לאף משתמש, ולכן לא נשמר להם רישום הסכמה.

---

## 1. כניסה ודף הכלי

שם הכלי: **"שיחת היכרות"** — בלי "אבחון", "הערכה" או "בדיקה". הסטאב "מערכת אבחון AI" צריך להתחלף
(→ תפקידים 4 ו-8). כל קריאה לפעולה אומרת שמדובר בעוזר דיגיטלי.

#### `entry.button@v2`
**איפה:** הכפתור הראשי של נקודת כניסה (דף הבית, תחומי טיפול).
> שיחה קצרה עם העוזר הדיגיטלי

#### `entry.button.short@v1`
**איפה:** כרטיסים ורצועות צרים (דברו איתי, בלוג).
> לשיחה עם העוזר הדיגיטלי

#### `entry.home.sub@v1`
**איפה:** שורת משנה מתחת לכפתור בדף הבית.
> עוזר דיגיטלי · כ-5 דקות

#### `entry.teaser@v1` ⚖️
**איפה:** שורה ליד הכפתור.
> מתלבטים אם לפנות? אפשר לספר לעוזר הדיגיטלי של הדס, בכמה שאלות קצרות, מה מעסיק. הדס תקבל סיכום מסודר, ובסוף יוצג כיוון להמשך.

#### `entry.services.title@v1`
**איפה:** רצועה בעמוד תחומי הטיפול.
> לא בטוחים איזה תחום מתאים?

#### `entry.services.body@v1` ⚖️
**איפה:** רצועה בעמוד תחומי הטיפול.
> אפשר לספר לעוזר הדיגיטלי של הדס מה מעסיק, בכמה שאלות קצרות. הדס תקבל סיכום מסודר.

#### `entry.contact.title@v1`
**איפה:** כרטיס בדברו איתי, אונליין ובני ברק.
> שיחה עם העוזר הדיגיטלי

#### `entry.contact.body@v1`
**איפה:** כרטיס בדברו איתי, אונליין ובני ברק.
> כמה שאלות קצרות, וסיכום מסודר שמגיע להדס. כ-5 דקות.

#### `entry.landing.inline@v1`
**איפה:** שורה מעל SmartLeadForm בדפי הנחיתה.
> מעדיפים לספר במילים שלכם? שיחה קצרה עם העוזר הדיגיטלי

#### `entry.blog.title@v1`
**איפה:** רצועה בסוף פוסט בבלוג.
> מתלבטים אם לפנות להדס?

#### `entry.unavailable@v1`
**איפה:** מחליף את הקריאה לפעולה כשהכלי מושבת (UX §2.6). מקשר לדברו איתי.
> העוזר לא זמין כרגע · ליצירת קשר · חירום: 101

#### `page.tool.h1@v1`
**איפה:** כותרת העמוד הייעודי (גם intro.title של UX).
> שיחת היכרות עם העוזר הדיגיטלי

#### `page.tool.sub@v1`
**איפה:** שורת המשנה בעמוד (גם intro.body של UX).
> לפני שפונים להדס תודה, קלינאית תקשורת: כמה שאלות קצרות, וסיכום מסודר שמגיע אליה.

#### `page.tool.steps@v3` ⚖️
**איפה:** "איך זה עובד" ב-S1 (UX page.how.1–3).
**הערה:** ⚖️ כי נקודות 2–3 הן הבטחות פרטיות. נקודה 2 נכונה לפי D-01 (אין מדגם סינון בגרסה 1). נקודה 3: מחיקה בשרת מיד (D-01), ופנייה שכבר נשלחה נשארת אצל הדס (L-04).
> 1. עוזר דיגיטלי שואל שאלה אחת בכל פעם. זה לוקח בערך 5 דקות.
> 2. הדס מקבלת סיכום רק אם בוחרים לשלוח אותו.
> 3. אפשר לעצור ולמחוק את השיחה בכל רגע. מה שכבר נשלח להדס נשאר אצלה.

#### `page.tool.not_this@v1` ⚖️
**איפה:** S1, מה זה לא.
> העוזר הוא תוכנה אוטומטית. הוא אינו הדס, אינו מאבחן ואינו נותן ייעוץ מקצועי או רפואי. במצב חירום יש להתקשר למד"א 101.

#### `page.tool.direct@v1`
**איפה:** תחתית S1 (גם intro.alt_contact של UX).
> מעדיפים לדבר ישירות? אפשר להתקשר להדס: {{hadas_phone}}, או לכתוב לה בוואטסאפ.

#### `page.header.logo.a11y@v1`
**איפה:** `aria-label` של קישור הלוגו בכותרת הכלי, אל דף הבית של האתר (UX 4.3, `page.header.*`).
**הערה:** הלוגו הוא תמונה, והשם פותח בשם שבו, "הדס תודה", ואחריו היעד, "דף הבית" (WCAG 2.5.3, 2.4.4). קישור הלוגו, כמו "חזרה לאתר" (`page.header.back`), פותח את דיאלוג היציאה כשיש שיחה פתוחה. 4 מילים, נייטרלי מגדרית.
> הדס תודה, דף הבית

---

## 2. פתיחה, הסכמה וחזרה

#### `intro.greeting@v1` ⚖️
**איפה:** טקסט בראש S1, לא בועה (החלטת UX).
> שלום, כאן העוזר הדיגיטלי של הדס תודה, קלינאית תקשורת.
> אני תוכנה אוטומטית, לא הדס עצמה. בכמה שאלות קצרות אפשר לספר מה מעסיק, והדס תקבל סיכום מסודר לפני שהיא חוזרת.
> זה לוקח בדרך כלל כמה דקות.

#### `consent.title@v1`
**איפה:** כותרת אזור ההסכמה ב-S1.
> לפני שמתחילים

#### `consent.disclaimer@v3` ⚖️
**איפה:** S1, גלוי במלואו. נשמרים זמן האישור ומזהה הנוסח.
**הערה:** 52 מילים קבועות, ועוד `deletion_clause` (11 מילים בערך המומלץ) ו-`ai_provider_clause` (עד 7), כלומר עד 70. כל הרכיבים של L-09 בפנים: מידע על בריאות, ספק ה-AI, מחיקה לפי D-01, למי נשלח, שהמסירה אינה חובה, האחראית, זכויות, גיל והורה. הוצאו לעומת v2 רק דברים שמופיעים במקום אחר באותו מסך: "ולא אדם" (`intro.greeting`), "ייעוץ רפואי" ו"איש מקצוע" (`page.tool.not_this`), ו"לא לכתוב פרטים מזהים" (עבר ל-`about.data`). אם עורך הדין ידרוש עוד רכיבים, הם גוברים על יעד ה-UX (L-09). סעיף החירום הוא `consent.emergency`, שמוצג מודגש בתוך אותה תיבה.
> - העוזר הוא תוכנה (בינה מלאכותית), לא הדס. הוא לא מאבחן, והכיוון בסוף עלול לטעות.
> - מה שנכתב, כולל מידע על בריאות, מעובד אצל ספק בינה מלאכותית. {{ai_provider_clause}}
> - {{deletion_clause}} להדס נשלח סיכום רק אם יושארו פרטים.
> - מסירת המידע אינה חובה. האחראית עליו: הדס תודה. זכויות: [מדיניות הפרטיות]({{privacy_url}})
> - מיועד לגיל 18 ומעלה, ועל ילד — להורה או לאפוטרופוס.

#### `consent.emergency@v1` ⚖️ (קליני)
**איפה:** S1. מוצג כסעיף החירום המודגש בתוך תיבת ההסתייגות (החלטת UX ו-UI). מזהה נפרד, כדי שההסתייגות תישאר עד 70 מילים.
**הערה:** UX טיוטה 3 כתב שאין צורך במזהה נפרד, כי מעצב ה-UI לא ראה אותו (המוקאפ בנוי על טיוטה 1). ההסכמה נרשמת עם הגרסאות של `consent.disclaimer`, של `consent.emergency` ושל `consent.checkbox` (→ ארכיטקט).
> במצב חירום, או בקושי פתאומי בדיבור, בהבנה או בבליעה: מד"א 101 — לא השיחה הזו.

#### `consent.checkbox@v2` ⚖️
**איפה:** תיבת הסכמה חובה ב-S1. הכפתור לא מושבת לפני הסימון (UX S1).
**הערה:** חלופת התיבה האחת של המבקר המשפטי (§2.1), מילה במילה, ועוד קישור. אומרת בדיוק למה מסכימים (SEC-16). "כמתואר למעלה" מכסה את הספק ואת המחיקה. אם עורך הדין ידרוש שתי תיבות (שאלה 17): `consent.checkbox.ack` + `consent.checkbox.data`.
> ידוע לי שזו תוכנה אוטומטית ולא אבחון, ושגילי 18 ומעלה. הסכמה לעיבוד מה שייכתב כאן, כולל מידע על בריאות, כמתואר למעלה וב[מדיניות הפרטיות]({{privacy_url}}).

#### `consent.checkbox.ack@v1` ⚖️
**איפה:** תיבה ראשונה מתוך שתיים, רק אם עורך הדין ידרוש (UX `consent.checkbox.label`).
**סטטוס:** לא פעיל — חלופה, תלוי בשאלה 17 לעורך הדין.
> ידוע לי שזו תוכנה אוטומטית ולא אבחון, ושבמצב חירום פונים למד"א 101. גילי 18 ומעלה, ואם השיחה על ילד — אני ההורה או האפוטרופוס.

#### `consent.checkbox.data@v1` ⚖️
**איפה:** תיבה שנייה, רק אם עורך הדין ידרוש (UX `consent.checkbox2.label`, ARCHITECTURE `scope: intake_health_data`).
**סטטוס:** לא פעיל — חלופה, תלוי בשאלה 17 לעורך הדין.
> הסכמה לעיבוד מה שייכתב בשיחה, כולל מידע על בריאות, כמתואר למעלה וב[מדיניות הפרטיות]({{privacy_url}}).

#### `consent.checkbox.error@v1`
**איפה:** S1, לחיצה על התחלה בלי סימון.
> כדי להתחיל, יש לסמן את תיבת ההסכמה.

#### `consent.button.accept@v1`
**איפה:** כפתור ההתחלה ב-S1.
> הסכמה והתחלה

#### `consent.start_loading@v1`
**איפה:** מצב טעינה של כפתור ההתחלה.
> מתחילים…

#### `consent.button.decline@v1`
**איפה:** כפתור משני ב-S1.
> לא עכשיו

#### `consent.declined@v1`
**איפה:** אחרי "לא עכשיו".
> בסדר גמור. אפשר לפנות להדס ישירות: בטלפון {{hadas_phone}}, בוואטסאפ, או בטופס יצירת הקשר באתר.

#### `consent.reconsent_note@v2` ⚖️
**איפה:** S1, כשנוסח ההסתייגות עודכן ויש שיחה פתוחה.
**הערה:** אין מסמך "תנאים" (L-09).
> נוסח ההסבר וההסכמה עודכן. כדי להמשיך, יש לאשר אותו שוב.

#### `consent.privacy_link@v1`
**איפה:** קישור למדיניות הפרטיות (גם about.privacy_link).
> מדיניות הפרטיות

#### `resume.prompt@v3`
**איפה:** S2, יש שיחה פתוחה. שום תוכן מהשיחה לא מוצג לפני "המשך" (SEC-19).
**הערה:** שלוש פעולות באותו משקל: `resume.continue` · `resume.restart` · `resume.delete` (UX). בלי "עצרנו" (VOICE 1.4).
> יש שיחה שהתחילה {{relative_time}} ולא הסתיימה. אפשר להמשיך מאותה נקודה, להתחיל מחדש או למחוק אותה.

#### `resume.continue@v1`
**איפה:** כפתור ב-S2.
> המשך

#### `resume.restart@v1`
**איפה:** כפתור ב-S2.
> התחלה מחדש

#### `resume.delete@v1`
**איפה:** כפתור ב-S2, באותו משקל כמו "המשך" ו"התחלה מחדש" (SEC-19, UX). פותח את דיאלוג המחיקה (`chat.delete.*`), ואחריו S9.
> מחיקת השיחה

#### `resume.restart_confirm.title@v1`
**איפה:** דיאלוג התחלה מחדש.
> התחלה מחדש

#### `resume.restart_confirm@v2` ⚖️
**איפה:** דיאלוג התחלה מחדש (UX `dialog.restart.body`).
**הערה:** לפי UX S2, התחלה מחדש מוחקת את השיחה הקודמת בשרת (→ ארכיטקט: אותו `DELETE` של D-01).
> להתחיל מחדש? השיחה הקודמת תימחק עכשיו, גם מהשרת.

#### `resume.restart_confirm.yes@v1`
**איפה:** כפתור בדיאלוג התחלה מחדש.
> התחלה מחדש

#### `resume.restart_confirm.no@v1`
**איפה:** כפתור בדיאלוג התחלה מחדש.
> ביטול

#### `resume.submitted.title@v1`
**איפה:** S2, כבר נשלחה פנייה מהמכשיר.
> כבר נשלחה פנייה להדס

#### `resume.submitted.body@v2`
**איפה:** S2, כבר נשלחה פנייה מהמכשיר.
**הערה:** לא אומר ולא רומז על מי הייתה הפנייה (SEC 2.1.6). לכן הוסר "למשל על מישהו אחר".
> מהמכשיר הזה נשלחה פנייה להדס ב-{{submitted_date}}. אם עוד לא חזרו אליך, אפשר להתקשר: {{hadas_phone}}. אפשר גם להתחיל פנייה חדשה.

#### `resume.submitted.new@v1`
**איפה:** כפתור ב-S2.
> פנייה חדשה

#### `resume.marker_remove@v1`
**איפה:** קישור ב-S2, מצב "כבר נשלחה פנייה". מוחק את הסימון המקומי (תאריך בלבד, SEC 2.1.6). לא נוגע בפנייה שנשלחה.
> הסרת הסימון

---

## 3. חלון השיחה

#### `chat.header.title@v1`
**איפה:** הפס העליון.
> העוזר הדיגיטלי של הדס תודה

#### `chat.header.subtitle@v1`
**איפה:** תגית בפס העליון (UX chat.header.badge).
> מענה אוטומטי

#### `chat.disclaimer_line@v2` ⚖️
**איפה:** השורה הקבועה בדסקטופ ובטאבלט.
> עוזר דיגיטלי, לא הדס · לא אבחון · חירום: 101

#### `chat.disclaimer_line.short@v1` ⚖️
**איפה:** השורה הקבועה **במובייל (ברירת מחדל, החלטה בסבב 3)** ובזום 200%.
**הערה:** תשובה ל-UI (ג): מקובל. המבקר המשפטי כבר אישר את שתי השורות (§2.6). שלושת הרכיבים ש-GOALS דורש נשארים: אוטומטי, לא אבחון, 101. "לא הדס" נשמר בפס העליון, שבו מוצגים תמיד `chat.header.title` ("העוזר הדיגיטלי של הדס תודה") ו-`chat.header.subtitle` ("מענה אוטומטי"), ובקישור `chat.disclaimer_more`. **תנאי:** אם הפס העליון מתקצר במובייל עד שהכותרת לא מוצגת, חוזרים לשורה המלאה.
> מענה אוטומטי · לא אבחון · חירום: 101

#### `chat.disclaimer_more@v1`
**איפה:** קישור אחרי השורה הקבועה, פותח את "על העוזר".
> עוד

#### `chat.stage.1@v1`
**איפה:** מחוון השלבים.
> היכרות

#### `chat.stage.2@v1`
**איפה:** מחוון השלבים.
> השלמת פרטים

#### `chat.stage.3@v1`
**איפה:** מחוון השלבים.
> סיכום

#### `chat.input.placeholder@v1`
**איפה:** שדה הקלט הריק.
> כתיבת הודעה…

#### `chat.send.label@v1`
**איפה:** כפתור השליחה (גם תווית נגישות).
> שליחה

#### `chat.send.wait@v2`
**איפה:** כשהשליחה חסומה עד שמגיעה תשובה (UX chat.composer.wait). אפשר להמשיך להקליד.
**הערה:** תשובה ל-UI (ד): נוסח העבודה ("עוד לא קיבלתי תשובה") לא אמר מי מדבר. כאן המערכת מתארת מצב, בלי "אני".
> התשובה בדרך. אפשר לשלוח אחרי שתגיע.

#### `chat.input.too_long_hint@v1`
**איפה:** שורת רמז מעל 800 תווים. **השליחה לא נחסמת** (SEC-06, UX S3). אחרי השליחה: בדיקת דגלים בלבד, ואז `meta.too_long`.
> הודעה ארוכה. כדאי לקצר, ולפתוח במה שהשתנה לאחרונה.

#### `chat.input.too_long_block@v1`
**איפה:** בועה ליד שדה הקלט, כשגוף הבקשה עובר את תקרת 32KB (כ-16,000 תווי עברית). הממשק בודק את הגודל **לפני** שליחה, לא שולח, והטקסט נשאר בשדה (ARCHITECTURE §6.1, חוסם 3). אין `maxlength` ואין חיתוך.
**הערה:** 101 חובה. נחוץ כי ההודעה לא נשלחה, ולכן גם לא עברה בדיקת דגלים בשרת. אומר במפורש שלא נשלחה, ומה לעשות: לקצר, לחלק, ולפתוח במה שהשתנה פתאום (כמו `meta.too_long`, PERSONAS TX-03). בבאנדל (`chat.*`). "32KB" לא מופיע, כי הפונה לא מודד בבייטים.
> ההודעה ארוכה מדי ולא נשלחה. הטקסט נשאר בשדה, ואפשר לקצר אותו או לחלק אותו לכמה הודעות. אם משהו השתנה לאחרונה או הופיע פתאום, כדאי לכתוב את זה קודם, בכמה מילים. במצב חירום: מד"א 101.

#### `chat.typing@v1`
**איפה:** חיווי המתנה.
> ההודעה בדרך…

#### `chat.slow@v1`
**איפה:** אחרי 8 שניות המתנה (UX chat.status.slow).
> התשובה בדרך, עוד רגע.

#### `chat.not_sent@v1`
**איפה:** תווית על בועה שלא נשלחה.
> לא נשלחה

#### `chat.new_message@v1`
**איפה:** התווית הגלויה "הודעה חדשה" כשהפונה גלל למעלה (UI). תווית הנגישות שלה היא `a11y.new_message_pill`.
> הודעה חדשה

#### `chat.quick.dont_know@v1`
**איפה:** כפתור בכל שאלה סגורה (החלטת UX).
> לא ידוע לי

#### `chat.quick.have_question@v1`
**איפה:** רק בהודעה הראשונה ובתפריט (החלטת UX). פותח את faq.topic.
> יש לי שאלה

#### `chat.end.title@v1`
**איפה:** דיאלוג יציאה.
> לצאת מהשיחה?

#### `chat.end.confirm@v3` ⚖️
**איפה:** דיאלוג יציאה (S11), 3 פעולות.
**הערה:** D-01: "לצאת" שומר את השיחה לחזרה, והיא נמחקת מעצמה בתום החלון. "לצאת ולמחוק" הוא אותו `DELETE` כמו "סיום ומחיקה". מחליף את `dialog.exit.resume_hint` של UX ושל המבקר המשפטי.
> מה שסיפרת לא יישלח להדס. אחרי "לצאת": {{expiry_clause}} "לצאת ולמחוק" מוחק אותה עכשיו, גם מהשרת.

#### `chat.end.stay@v1`
**איפה:** כפתור ראשי בדיאלוג יציאה. מקבל מיקוד.
> להמשיך בשיחה

#### `chat.end.leave@v1`
**איפה:** כפתור בדיאלוג יציאה. השיחה נשמרת לחזרה עד 24 שעות מההודעה האחרונה, ואז נמחקת (D-01).
> לצאת

#### `chat.end.leave_delete@v1`
**איפה:** כפתור בדיאלוג יציאה. ישר ל-`DELETE` ול-S9, בלי דיאלוג נוסף (הבחירה כאן היא האישור, UX S11).
> לצאת ולמחוק

#### `chat.ended@v2`
**איפה:** S9, אחרי מחיקה, ואחרי יציאה.
**הערה:** נוסף 101 (מוסכמת 101: נוסח של סיום שיחה).
> השיחה הסתיימה. אפשר לפנות להדס בכל זמן: {{hadas_phone}}. במצב חירום: מד"א 101.

#### `chat.delete.title@v1`
**איפה:** דיאלוג מחיקה.
> מחיקת השיחה

#### `chat.delete.confirm@v2` ⚖️
**איפה:** דיאלוג מחיקה (S11), 2 פעולות. משמש ל"סיום ומחיקה" בתוצאה, ל"מחיקת השיחה" ב-S2 ולמחיקה מהתפריט.
**הערה:** D-01: המחיקה מיידית בשרת. נשארות רק רשומת מדדים ורשומת הסכמה, שתיהן בלי תוכן ("רישום טכני"). אחרי מחיקה אי אפשר לשלוח טופס (UX). "בשרת" מגביל את ה"רק" לשרת של האתר; השמירה אצל ספק ה-AI מתוארת ב-`ai_provider_clause` ובמדיניות.
> למחוק את השיחה? היא תימחק עכשיו גם מהשרת, ואי אפשר יהיה לבטל, לחזור אליה או לשלוח את הפרטים להדס. בשרת נשאר רק רישום טכני, בלי תוכן.

#### `chat.delete.yes@v1`
**איפה:** כפתור בדיאלוג מחיקה.
> מחיקה

#### `chat.delete.no@v1`
**איפה:** כפתור בדיאלוג מחיקה. מקבל מיקוד.
> ביטול

#### `chat.delete.done@v2` ⚖️
**איפה:** S9, אחרי מחיקה מוצלחת (UX). אם המחיקה נכשלה: `error.delete_failed`.
> השיחה נמחקה, גם מהשרת. בשרת נשאר רק רישום טכני, בלי תוכן השיחה.

#### `chat.sr.bot_label@v1`
**איפה:** תווית דובר מוסתרת לכל הודעה של העוזר (UX a11y.speaker.bot).
> העוזר הדיגיטלי:

#### `chat.sr.user_label@v1`
**איפה:** תווית דובר מוסתרת להודעות הפונה (UX a11y.speaker.user).
> ההודעה שלך:

---

## 4. תפריט, "על העוזר" ונגישות

#### `menu.talk_to_hadas@v1`
**איפה:** תפריט.
> לדבר עם הדס

#### `menu.about@v1`
**איפה:** תפריט.
> על העוזר הדיגיטלי

#### `menu.restart@v1`
**איפה:** תפריט.
> התחלה מחדש

#### `menu.delete@v1`
**איפה:** תפריט.
> מחיקת השיחה

#### `menu.accessibility@v1`
**איפה:** תפריט, אם יוחלט.
> נגישות

#### `about.title@v1`
**איפה:** S12.
> על העוזר הדיגיטלי

#### `about.body@v1` ⚖️
**איפה:** S12.
> העוזר הדיגיטלי הוא תוכנה אוטומטית שעוזרת לפונים חדשים לספר בקצרה מה מעסיק אותם, ומכינה להדס תודה סיכום מסודר לפני שהיא חוזרת. הוא אינו הדס ואינו אדם. הוא לא מאבחן, לא נותן טיפים או תרגילים, ולא קובע אם צריך טיפול. את זה עושה רק איש מקצוע.

#### `about.data@v2` ⚖️
**איפה:** S12.
**הערה:** SEC-01: הספק בשמו, השמירה לפי D-01, ומה קורה אחרי שליחה (ARCHITECTURE §11.1: פרטי הקשר והסיכום נמחקים מהמערכת אחרי שהמסירה הצליחה, לכל היותר אחרי 7 ימים של ניסיונות). כאן גם ההמלצה לא לכתוב פרטים מזהים, שיצאה מ-`consent.disclaimer`.
> מה שנכתב בשיחה, כולל מידע על בריאות, עובר לעיבוד אצל {{ai_provider_name}}, ספק שירות הבינה המלאכותית שמפעיל את העוזר. {{ai_provider_clause}} {{deletion_clause}} בשרת נשאר רק רישום טכני, בלי תוכן.
> להדס נשלח סיכום רק אם בוחרים להשאיר פרטים. אחרי שהסיכום הגיע אליה, הוא נמחק מהמערכת ונשאר אצלה. למחיקה של פנייה שכבר נשלחה: {{privacy_contact}}.
> כדאי לא לכתוב בשיחה פרטים מזהים מיותרים, כמו שם מלא או מספר תעודת זהות.

UX `about.disclaimer_full` אינו נוסח נפרד: המסך מציג את `consent.disclaimer` ואת
`consent.emergency` בגרסה הנוכחית.

#### `a11y.log_label@v1`
**איפה:** שם אזור התמליל.
> שיחה עם העוזר הדיגיטלי

#### `a11y.quick_replies@v1`
**איפה:** שם קבוצת הכפתורים. בהקשת הגיל (D-13) שם הקבוצה הוא השאלה עצמה (`aria-labelledby` אל בועת השאלה), ולא הנוסח הזה (`consults/round2_accessibility.md` 4ד.1).
> אפשרויות תשובה

#### `a11y.buttons_hint@v1` ⚖️
**איפה:** רמז מוסתר חזותית, לקורא מסך, **בכל הודעה של העוזר שאחריה באים כפתורי בחירה**: בסוף ההכרזה, ובטקסט המוסתר של ההודעה (UX טיוטה 4.2, §0.4, §7.10; מבקר הנגישות §1 תנאי 5). פעם אחת בכל אחד משני המקומות. הכפתורים עצמם נשארים לפני שדה הקלט ב-DOM.
**הערה:** משתמש קורא מסך שלא יודע שיש כפתורים יקליד תשובה, וקורא מסך לא מגלה כפתורים עד שמגיע אליהם. **בהקשת הגיל (D-13) זו שאלת בטיחות:** טקסט חופשי לא ברור נחשב בגיר, ולכן הרמז הוא תנאי בטיחות ולא נוחות (מבקר הנגישות 4ד.2), והנוסח ⚖️. בלי "אפשר גם להקליד", כי במצב בלי מודל (`system.model_free`) טקסט חופשי לא מעובד והנוסח היה שגוי. "מתחת להודעה" ולא "למטה": הכפתורים בסדר הקריאה מיד אחרי ההודעה. נייטרלי מגדרית (ט7), בלי שמות הכפתורים, כי הקורא מקריא אותם. **לבדיקה במכשיר:** איך הקולות העבריים מקריאים "ל-18" (מבקר הנגישות 4ד.3).
> יש אפשרויות לבחירה מתחת להודעה.

#### `a11y.call_hadas@v1`
**איפה:** `aria-label` של קישור הטלפון של הדס (`tel:`) בכל מקום שבו הוא מוצג: S13a, S13b ובכל מקום אחר שבו הטקסט הגלוי של הקישור הוא ספרות בלבד (UX §7.0, 2.4.4).
**הערה:** השם נפתח בטקסט הגלוי של הקישור, מספר הטלפון, כדי שפקודת קול ("לחץ על" והמספר) תמצא אותו (WCAG 2.5.3, רמה A), ואחריו המילים שמסבירות מה הקישור עושה (2.4.4). "התקשרות" ולא פועל בגוף מסוים: נייטרלי מגדרית (ט7). הממיר לא בודק את זה אוטומטית, כי אין לטקסט הגלוי מזהה משלו. אם הקישור יוצג עם תווית במילים במקום מספר, יש לפתוח בה.
> {{hadas_phone}}, התקשרות להדס

#### `a11y.message_sent@v1`
**איפה:** הכרזה שקטה אחרי שליחה (לא חובה).
> נשלח

#### `a11y.stage@v1`
**איפה:** הכרזת השלב.
> שלב {{stage_number}} מתוך 3: {{stage_name}}

#### `a11y.outcome_region@v1`
**איפה:** שם אזור כרטיס התוצאה.
> תוצאת השיחה

#### `a11y.new_message_pill@v1`
**איפה:** תווית "הודעה חדשה" כשהפונה גלל למעלה.
> הודעה חדשה, מעבר אליה

#### `a11y.restored_log@v1`
**איפה:** טקסט מוסתר חזותית, לפני התמליל ששוחזר אחרי "המשך" או רענון (UI §10).
> השיחה נפתחה מחדש מאותה נקודה. ההודעות הקודמות מופיעות למעלה.

#### `a11y.exit@v1`
**איפה:** כפתור היציאה בפס העליון.
> יציאה מהשיחה

#### `a11y.menu@v1`
**איפה:** כפתור התפריט בפס העליון.
> תפריט

---

## 5. מענים קבועים לשאלות מטא, ושפה

#### `meta.identity@v2` ⚖️
**איפה:** "את הדס?", "זה בן אדם?". גם תשובת FAQ בקטגוריה about_bot.
**הערה:** נוסח האתר לא השתנה. נוסף וריאנט וואטסאפ, כי שם הדס רואה את השיחה כולה (L-07).
> לא, כאן העוזר הדיגיטלי של הדס, תוכנה אוטומטית. הדס עצמה תקרא את הסיכום אם יושארו פרטים, ותחזור בעצמה.

##### `meta.identity.wa@v2` ⚖️
> לא, כאן העוזר הדיגיטלי של הדס, תוכנה אוטומטית. הדס עצמה רואה את השיחה הזו, ותמשיך בה בעצמה.

#### `meta.who_sees@v2` ⚖️
**איפה:** "מי רואה את זה?". גם תשובת FAQ בקטגוריה privacy.
**הערה:** SEC-01 ו-L-11: בלי "משמש רק", הספק בשמו, והשמירה לפי D-01. בווריאנט וואטסאפ הדס רואה הכול.
> מה שנכתב כאן עובר לעיבוד אצל {{ai_provider_name}}, ספק שירות הבינה המלאכותית שמפעיל את העוזר. {{ai_provider_clause}} {{deletion_clause}} להדס נשלח סיכום רק אם בסוף יושארו פרטי קשר. פרטים מלאים במדיניות הפרטיות: {{privacy_url}}

##### `meta.who_sees.wa@v2` ⚖️
> הדס רואה את כל מה שנכתב בשיחה הזו, כמו בכל שיחת וואטסאפ איתה. ההודעות עוברות לעיבוד גם אצל {{ai_provider_name}}, ספק שירות הבינה המלאכותית שמפעיל את העוזר. {{ai_provider_clause}} {{wa_retention_clause}} פרטים מלאים במדיניות הפרטיות: {{privacy_url}}

#### `meta.why_asking.generic@v1`
**איפה:** "למה אתם שואלים?". נוסח גיבוי; המנסח רשאי להסביר בקצרה משלו, בלי תוכן קליני.
> השאלה עוזרת להדס להבין את התמונה עוד לפני השיחה איתה. אם התשובה לא ידועה, אפשר להמשיך גם כך.

#### `meta.diagnosis_request@v2` ⚖️
**איפה:** "זה גמגום?", "מה יש לו?". גם fallback.clinical_deflect בחוזה ה-FAQ.
**הערה:** L-11: השאלה מגיעה להדס רק אם יושארו פרטים.
> על זה רק הדס יכולה לענות, אחרי שיחה מסודרת. העוזר הדיגיטלי לא מאבחן ולא קובע מה מצב הדיבור. רשמתי את השאלה, ואם בסוף יושארו פרטים, היא תופיע בסיכום להדס.

##### `meta.diagnosis_request.wa@v2` ⚖️
> על זה רק הדס יכולה לענות, אחרי שיחה מסודרת. העוזר הדיגיטלי לא מאבחן ולא קובע מה מצב הדיבור. רשמתי את השאלה, והיא תופיע בסיכום להדס.

#### `meta.reassurance_request@v1` ⚖️
**איפה:** "אז הכול בסדר?", "זה יעבור לבד?".
> העוזר הדיגיטלי לא קובע אם כדאי טיפול ומה מצב הדיבור. את זה אפשר לברר רק בשיחה עם הדס או עם איש מקצוע אחר. אם יש דאגה, זו סיבה טובה לפנות.

#### `meta.advice_request@v2` ⚖️
**איפה:** "יש תרגילים?", "מה לעשות בינתיים?".
**הערה:** L-11, כמו `meta.diagnosis_request`. סומן ⚖️ בסבב 3, כי הוא אומר מה מגיע להדס.
> טיפים ותרגילים הדס נותנת רק אחרי שהיא מכירה את המצב, כי מה שמתאים במקרה אחד לא תמיד מתאים במקרה אחר. רשמתי שיש עניין בזה. אם יושארו פרטים, הדס תראה את זה בסיכום.

##### `meta.advice_request.wa@v2` ⚖️
> טיפים ותרגילים הדס נותנת רק אחרי שהיא מכירה את המצב, כי מה שמתאים במקרה אחד לא תמיד מתאים במקרה אחר. רשמתי שיש עניין בזה, והדס תראה את זה בסיכום.

#### `meta.want_human@v3`
**איפה:** בקשה לדבר עם הדס באמצע (UX chat.early_handoff.offer).
**הערה:** נוסח האתר לא השתנה. בוואטסאפ אין טופס: וריאנט שמעביר להדס ומשתיק את הבוט, כמו `wa.message_only` (→ ארכיטקט ומפתח הוואטסאפ: לאשר שזו ההתנהגות בשלב 2).
> בוודאי. אפשר לעבור עכשיו לטופס, עם מה שסופר עד כה, והדס תחזור. אפשר גם להתקשר אליה ישירות: {{hadas_phone}}.

##### `meta.want_human.wa@v3`
> בוודאי. הדס תמשיך בשיחה הזו בעצמה, והעוזר הדיגיטלי לא יענה בה יותר. אם צריך לדבר איתה מהר, אפשר להתקשר: {{hadas_phone}}.

#### `meta.want_human.to_form@v1`
**איפה:** כפתור אחרי meta.want_human.
> מעבר לטופס

#### `meta.want_human.stay@v1`
**איפה:** כפתור אחרי meta.want_human.
> להמשיך בשיחה

#### `meta.multiple_subjects@v1`
**איפה:** הפונה מתאר יותר ממושא אחד (ARCHITECTURE §1.4). השאר נרשמים ב-notes.
> רשמתי שיש שאלה גם לגבי בני משפחה נוספים. השיחה הזו עוסקת באדם אחד בכל פעם. בסיום אפשר להתחיל שיחה נוספת לכל אחד מהם.

#### `meta.off_topic@v1`
**איפה:** קלט לא ענייני או ניסיון לשנות את תפקיד הבוט. גם fallback לנושא לא קשור בחוזה ה-FAQ.
> בשיחה הזו אפשר לעזור רק בהכנת פנייה להדס ובשאלות על הקליניקה. אפשר לחזור לשאלה הקודמת?

#### `meta.off_topic_end@v2`
**איפה:** אחרי קלט לא ענייני חוזר, או 3 תורות רצופות של ניסיון השתלטות בלי התקדמות (UX chat.input_end; SEC-26, תשובה 2.1.4). השיחה מסתיימת.
**הערה:** נוסף הטופס של האתר (SEC-26). בדיקת הדגלים ממשיכה עד הסוף.
> נראה שהשיחה הזו לא מתאימה כרגע, ולכן היא נעצרת כאן. אפשר לפנות להדס ישירות: בטלפון {{hadas_phone}}, בוואטסאפ, או בטופס יצירת הקשר באתר. במצב חירום: מד"א 101.

#### `language.unsupported@v2` ⚖️
**איפה:** כתיבה בשפה שאינה עברית. השם נדרש על ידי המנוע, וחייב לכלול 101 ודרכי קשר ישירות.
**הערה:** כל שורה כוללת 101, כי מי שלא קורא עברית הוא בדיוק מי שצריך אותה. השורות בערבית וברוסית (L-31) הן התרגום של המבקר המשפטי, **ולפני ההשקה דובר שפת אם צריך לאמת אותן** (→ אליה). **פטור מבדיקת האותיות הלטיניות (סבב 4):** הנוסח רשום ב-`output-rules.json` תחת `latin_ratio_exempt_text_ids` (ARCHITECTURE §1.9; הרשימה דורשת אישור המבקר המשפטי). הפטור חל על `max_latin_ratio` בלבד: 101 בכל שורה, מספרי טלפון וכל כלל אסור ממשיכים לחול.
> בשלב זה העוזר הדיגיטלי עונה רק בעברית. אפשר לפנות להדס ישירות: {{hadas_phone}}. במצב חירום: מד"א 101.
> This assistant works in Hebrew only. To reach Hadas: {{hadas_phone}}. In an emergency in Israel, call 101.
> هذا المساعد يعمل باللغة العبرية فقط. للتواصل مع هداس: {{hadas_phone}}. في حالة طوارئ في إسرائيل اتصلوا بـ 101.
> Этот помощник работает только на иврите. Связаться с Хадас: {{hadas_phone}}. В экстренной ситуации в Израиле звоните 101.

#### `meta.too_long@v2`
**איפה:** בועה אחרי שליחת הודעה מעל 800 תווים. **הטקסט לא נחסם:** קודם בדיקת דגלים על כל הטקסט, בלי מודל ובלי שמירה (→ S6 אם עלה דגל), ואחר כך הבועה הזו, והטקסט חוזר לשדה כמו שהוא (SEC-06, UX S3).
**הערה:** 101 חובה (ARCHITECTURE §1.9). מה לכתוב קודם — כדי שסימן חדש לא ייחתך כשמקצרים (PERSONAS TX-03). אותו נוסח משמש בוואטסאפ לחריגה אחרי איחוד הודעות.
> ההודעה ארוכה מדי. אם משהו השתנה לאחרונה או הופיע פתאום, כדאי לכתוב את זה קודם, בכמה מילים. את השאר אפשר לחלק לכמה הודעות קצרות. במצב חירום: מד"א 101.

#### `meta.data_deletion@v2` ⚖️
**איפה:** "תמחקו את מה שכתבתי".
**הערה:** L-28 ו-SEC-20: באמצע שיחה המחיקה מהתפריט מיידית (D-01). פנייה שכבר נשלחה, ובקשות עיון, דרך `privacy_contact`. בוואטסאפ (שלב 2) ההודעות נמצאות גם בוואטסאפ של הדס (→ מפתח הוואטסאפ ועורך הדין: מה בדיוק נמחק שם).
> אפשר למחוק את השיחה עכשיו, מהתפריט: "מחיקת השיחה". המחיקה מיידית, גם מהשרת. לבקשות אחרות, כמו מחיקה של פנייה שכבר נשלחה להדס או עיון במידע: {{privacy_contact}}.

##### `meta.data_deletion.wa@v2` ⚖️
> ההודעות בשיחה הזו נמצאות גם בוואטסאפ של הדס, ואפשר לבקש ממנה למחוק אותן. למחיקה של מה שנשמר במערכת של העוזר הדיגיטלי, או לעיון במידע: {{privacy_contact}}.

#### `meta.document_request@v1` ⚖️
**איפה:** בקשה למסמך, לאישור או לחוות דעת, לכל גורם: בית משפט, ביטוח, בית ספר, "להראות לאשתי" (L-15). אחריו חזרה למטרה.
**הערה:** אותו נוסח לכל גורם, בלי לנקוב בשמו. לא נשבר תחת לחץ (VOICE 5.7). הבקשה חוסמת תוצאה 3, ונרשמת במייל כתגית `hadas.email.tag.document_request` (→ ארכיטקט). בכרטיס התוצאה (1, 2, 4) מופיעה אחרי זה שורת התוספת `outcome.addendum.document_request` (סבב 4, L-15).
> העוזר הדיגיטלי לא כותב מסמכים, אישורים או חוות דעת, ומה שנכתב בשיחה הזו אינו מסמך מקצועי ואינו מתאים להצגה כחוות דעת. מסמכים מקצועיים הם נושא לשיחה עם הדס, אחרי היכרות.

#### `meta.omit_request@v1` ⚖️
**איפה:** "אל תכתבו את זה בסיכום", "שהדס לא תדע" (SEC-11, PERSONAS EM-01).
**הערה:** **אסור להבטיח השמטה.** אומרים בכנות מה יקרה, ונותנים שליטה: התצוגה המקדימה, אי-שליחה, מחיקה. אם עלה דגל אדום, הוא קודם (D-04: אחרי `child_safety` אין טופס בכלל).
> אי אפשר לבחור חלקים מהשיחה שלא ייכנסו לסיכום. אם בסוף יושארו פרטים, הסיכום להדס עשוי לכלול גם את זה. לפני השליחה אפשר לראות מה יישלח, ואפשר גם לא לשלוח, או למחוק את השיחה מהתפריט.

##### `meta.omit_request.wa@v1` ⚖️
> הדס רואה את כל מה שנכתב בשיחה הזו, ואי אפשר להסתיר ממנה חלק. אם יש משהו שלא רוצים לשתף איתה, עדיף לא לכתוב אותו כאן.

---

## 6. שאלות נפוצות

לכל נושא יש נוסח שלם משלו (ARCHITECTURE §1.9). **כל עובדה היא משתנה בשם משלו**, שמוצהר
ב-`faq.json` → `facts` ומאושר על ידי הדס. הטקסט הקבוע עצמו לא מכיל אף עובדה. עובדה שלא אושרה
(או שעבר ה-`valid_until` שלה) → הרשומה חסרה → `faq.missing`.
**→ הדס:** שתי הסתירות באתר (אורך מפגש: חצי שעה מול 45 דקות; החזרים מהקופות) חייבות הכרעה בעובדות.

#### `faq.topic.prompt@v1`
**איפה:** שורה קצרה של העוזר לפני כפתורי הנושא, אחרי "יש לי שאלה" (UX S4). נותנת הקשר לקורא מסך.
> על מה השאלה?

#### `faq.topic.price@v1`
**איפה:** כפתור נושא (נפתח מ"יש לי שאלה").
> מחיר

#### `faq.topic.location@v1`
**איפה:** כפתור נושא.
> מיקום

#### `faq.topic.kupot@v1`
**איפה:** כפתור נושא.
> קופות והחזרים

#### `faq.topic.online@v1`
**איפה:** כפתור נושא.
> טיפול אונליין

#### `faq.topic.hours@v1`
**איפה:** כפתור נושא.
> ימים ושעות

#### `faq.topic.other@v1`
**איפה:** כפתור נושא.
> שאלה אחרת

#### `faq.topic.other_prompt@v1`
**איפה:** אחרי "שאלה אחרת".
> אפשר לכתוב את השאלה כאן.

#### `faq.source_note@v2`
**איפה:** תווית כרטיס המידע (UX faq.card.label).
> מידע מהדס

#### `faq.return@v1`
**איפה:** אחרי כרטיס המידע, כשהשיחה באמצע. אחריו שאלת המטרה הנוכחית.
> ואם אפשר, בחזרה לשאלה הקודמת:

#### `faq.missing@v2`
**איפה:** אין עובדה מאושרת לשאלה (fallback.unknown בחוזה ה-FAQ; UX `faq.unknown`).
**הערה:** נוסח האתר לא השתנה. נוסף וריאנט וואטסאפ.
> את המידע הזה אין לי, אבל הדס תוכל לענות. רשמתי את השאלה, והיא תופיע בסיכום שיגיע להדס אם יושארו פרטים.

##### `faq.missing.wa@v2`
> את המידע הזה אין לי, אבל הדס תוכל לענות. רשמתי את השאלה, והיא תופיע בסיכום להדס.

#### `faq.answer.price@v1` (עובדה)
**איפה:** תשובה לשאלת מחיר.
**הערה:** אם הדס מאשרת רק חלק מהמחירים — גרסה חדשה בלי השורות החסרות.
> פגישה ראשונה: {{price_first_meeting}}
> מפגש בקליניקה: {{price_session_clinic}}
> מפגש אונליין: {{price_session_online}}

#### `faq.answer.session_length@v1` (עובדה)
**איפה:** "כמה זמן נמשך מפגש?".
> מפגש טיפול נמשך {{session_length}}.

#### `faq.answer.location@v1` (עובדה)
**איפה:** "איפה הקליניקה?".
> מיקום הקליניקה: {{clinic_location}}

#### `faq.answer.accessibility@v1` (עובדה)
**איפה:** "יש מעלית?", "זה נגיש?".
> נגישות הקליניקה: {{clinic_accessibility}}

#### `faq.answer.kupot@v1` (עובדה) ⚖️
**איפה:** "יש החזר מהקופה?".
**הערה:** ⚖️ כי תשובה לא מדויקת על החזרים היא מצג כספי.
> קופות חולים והחזרים: {{kupot_refunds}}

#### `faq.answer.receipts@v1` (עובדה)
**איפה:** קבלות וביטוחים פרטיים.
> קבלות וביטוחים פרטיים: {{receipts_insurance}}

#### `faq.answer.online@v1` (עובדה)
**איפה:** "אפשר אונליין?".
> טיפול אונליין: {{online_info}}

#### `faq.answer.hours@v1` (עובדה)
**איפה:** ימים ושעות.
> ימים ושעות: {{clinic_hours}}

#### `faq.answer.first_wait@v1` (עובדה)
**איפה:** "כמה זמן מחכים לתור?".
**הערה:** עובדה מתיישנת. ב-`faq.json` חובה `valid_until` קצר.
> זמן ההמתנה לתור ראשון, נכון לעכשיו: {{first_appointment_wait}}

#### `faq.answer.response_time@v1` (עובדה)
**איפה:** "תוך כמה זמן חוזרים?".
> אחרי השארת פרטים, הדס חוזרת בדרך כלל {{response_time}}.

#### `faq.answer.languages@v1` (עובדה)
**איפה:** "באיזו שפה הטיפול?".
> שפות הטיפול: {{therapy_languages}}

#### `faq.answer.ages@v1` (עובדה)
**איפה:** "מאיזה גיל מטפלים?".
**הערה:** התשובה מוסרת עובדה כללית בלבד. אם המקרה הספציפי מתאים — רק טבלת ההחלטה קובעת.
> גילאי המטופלים: {{patient_ages}}

#### `faq.answer.cancellation@v1` (עובדה)
**איפה:** ביטול תור.
> ביטול תור: {{cancellation_policy}}

#### `faq.answer.reports@v1` (עובדה)
**איפה:** סיכומים ומכתבים לקופה, לגן או לבית הספר.
> סיכומים ומכתבים (לקופה, לגן או לבית הספר): {{reports_letters}}

#### `faq.answer.home_visits@v1` (עובדה)
**איפה:** "יש ביקורי בית?".
> ביקורי בית: {{home_visits}}

#### `faq.answer.contact@v1` (עובדה)
**איפה:** "איך מגיעים להדס ישירות?".
> אפשר לפנות להדס ישירות בטלפון {{hadas_phone}}, או בוואטסאפ: {{hadas_whatsapp_link}}

#### `faq.answer.process_duration@v2`
**איפה:** "כמה זמן זה לוקח?" (קטגוריה process). מתאר את הכלי, לא עובדה של הדס.
**הערה:** נוסח האתר לא השתנה. נוסף וריאנט וואטסאפ.
> השיחה כאן לוקחת בדרך כלל כמה דקות. אפשר לעצור בכל רגע, ולהדס נשלח סיכום רק אם בוחרים להשאיר פרטים.

##### `faq.answer.process_duration.wa@v2`
> השיחה כאן לוקחת בדרך כלל כמה דקות, ואפשר לעצור בכל רגע. הדס רואה את מה שנכתב כאן, ותקבל גם סיכום מסודר.

---

## 7. מושא השיחה — `subject_ref.*`, וכפתורי הפתיחה

`{{subject_ref}}` = `subject_ref.<core_relation_detail>` (הסלוט שהארכיטקט הוסיף בסבב 3). הכפתורים "על הבן
שלי" / "על הבת שלי" ממלאים אותו (`son` / `daughter`), וגם התשובה ל-`q.relation.other_followup`. ערך שאין לו
נוסח → `subject_ref.default`. כל נוסח מתאים אחרי "של", "אצל", "עבור" ו"לגבי". אותם נוסחים משמשים גם כערך
של "השיחה על" בשורת האימות (§8.9).

#### `subject_ref.son@v1`
**איפה:** {{subject_ref}} כשהמושא הוא בן של הפונה.
> הבן שלך

#### `subject_ref.daughter@v1`
**איפה:** {{subject_ref}} — בת.
> הבת שלך

#### `subject_ref.child@v1`
**איפה:** {{subject_ref}} — ילד, מגדר לא ידוע.
> הילד או הילדה

#### `subject_ref.father@v1`
**איפה:** {{subject_ref}} — אב.
> אבא שלך

#### `subject_ref.mother@v1`
**איפה:** {{subject_ref}} — אם.
> אמא שלך

#### `subject_ref.husband@v1`
**איפה:** {{subject_ref}} — בעל.
> בעלך

#### `subject_ref.wife@v1`
**איפה:** {{subject_ref}} — אישה.
> אשתך

#### `subject_ref.partner_m@v1`
**איפה:** {{subject_ref}} — בן זוג.
> בן הזוג שלך

#### `subject_ref.partner_f@v1`
**איפה:** {{subject_ref}} — בת זוג.
> בת הזוג שלך

#### `subject_ref.grandfather@v1`
**איפה:** {{subject_ref}} — סב.
> סבא

#### `subject_ref.grandmother@v1`
**איפה:** {{subject_ref}} — סבתא.
> סבתא

#### `subject_ref.grandson@v1`
**איפה:** {{subject_ref}} — נכד.
> הנכד שלך

#### `subject_ref.granddaughter@v1`
**איפה:** {{subject_ref}} — נכדה.
> הנכדה שלך

#### `subject_ref.brother@v1`
**איפה:** {{subject_ref}} — אח.
> האח שלך

#### `subject_ref.sister@v1`
**איפה:** {{subject_ref}} — אחות.
> האחות שלך

#### `subject_ref.default@v1`
**איפה:** default_text_id — הקשר לא ידוע.
> מי שעליו השיחה

#### `q.relation.opt.self@v1`
**איפה:** כפתור פתיחה (UX 2×2). אם התוויות יושבות ב-label_he של הקטלוג — מעתיקים מכאן.
> על עצמי

#### `q.relation.opt.son@v1`
**איפה:** כפתור פתיחה. ממלא core_relation=child, core_relation_detail=son, ומגדר המושא=m.
> על הבן שלי

#### `q.relation.opt.daughter@v1`
**איפה:** כפתור פתיחה. ממלא core_relation=child, core_relation_detail=daughter, ומגדר המושא=f.
> על הבת שלי

#### `q.relation.opt.other@v1`
**איפה:** כפתור פתיחה. ממלא core_relation=other_adult.
> על מישהו אחר

#### `q.relation.other_followup@v1`
**איפה:** אחרי "על מישהו אחר", כשהקשר חסר. מוצג עם הכפתור `q.relation.opt.child_not_parent`, ואפשר תמיד להקליד.
> מה הקשר אליך? למשל הורה, בן או בת זוג, סבא או סבתא.

#### `q.relation.opt.child_not_parent@v1` ⚖️
**איפה:** כפתור אחרי `q.relation.other_followup` (UX S13b: "ילד/ה, ואני לא ההורה" בהקשה אחת). מוביל ישר ל-`reporter.not_parent` (D-02), לפני שנאסף פרט על הילד.
**הערה:** "ילד או ילדה" ולא "ילד/ה" (VOICE 2.1). מתאים גם לסבא או לסבתא שכותבים על נכד, שגם הם מופנים להורים לפי D-02. לא בכפתורי הפתיחה, כדי לא להעמיס עליהם.
> על ילד או ילדה, ואני לא ההורה

#### `q.self_age_band.opt.under_18@v1`
**איפה:** כפתור אחרי "על עצמי", בתשובה ל-`goal.self_age_band.ask` (D-13 ענף א). ממלא `self_age_band = under_18` ו-`self_declared_minor = true`, ומפעיל את `minor_self` בקוד, בלי מודל.
**הערה:** "מתחת ל-18" ולא "קטין" (נוסח שלא מרחיק). הקשה אחת, בלי גיל מדויק.
> מתחת ל-18

#### `q.self_age_band.opt.adult@v1`
**איפה:** כפתור אחרי "על עצמי", בתשובה ל-`goal.self_age_band.ask` (D-13 ענף א). ממלא `self_age_band = adult`.
**הערה:** בלי כפתור "מעדיף לא לומר" (תנאי 2 של המנסח הקליני). תשובה חופשית לא ברורה נחשבת בגיר, והציטוט (`self_declared_minor`) וההצהרה בהסכמה נשארים גיבוי.
> 18 ומעלה

---

## 8. שאלות תבנית לכל מטרה — `goal.<id>.ask`

סבב 3: **18 המטרות** של DRAFT_NOTES §9 (`goals_v2`). (בהעברה כתוב "17", אבל ב-YAML יש 18 מזהים, וכתבתי לכולם.)
סבב 4: אם D-13 ענף א נבחר, יש מטרה 19, `self_age_band`, והנוסחים שלה כתובים (`ask` / `clarify` / `rephrase` וכפתורי `q.self_age_band.opt.*`).
21 מטרות יצאו משימוש (`retired_as_goals`), ונוסחי התבנית שלהן הוסרו. הסלוטים שלהן מתמלאים מ-`signs_screen`
או באופן אופורטוניסטי.
**בגרסה 1 הנוסחים האלה הם מה שמוצג** (ARCHITECTURE §5.6), לפעמים אחרי קידומת `ack.*`, ולא רק כשהמנסח נכשל.
**`clarify`** של כל מטרה = `q.clarify.generic`. **`rephrase`** = `goal.<id>.rephrase` בשאלות הסינון, ב-`core_onset_pattern`
וב-`signs_screen`, ו-`q.rephrase.generic` בכל השאר.
**כפתורים:** התוויות שייכות ל-`label_he` בקטלוג. בהערות מופיעות תוויות מוצעות, וכל שאלה סגורה מקבלת גם
`chat.quick.dont_know`. **בשאלות סינון** הערכים הם `yes` / `no` בלבד. "לא ידוע לי" הוא סטטוס `unknown`, לא ערך,
ו"כן" שהוקלד נחשב תשובה, כי השאלה נשאלה ממש עכשיו (הארכיטקט, סבב 3).
**סגנון:** שאלות התבנית לא יודעות באילו מילים הפונה השתמש. לכן הן מכנות את הקושי "זה", ולא נוקבות בשם תחום
(חוץ מ"קול"). שאלות הסינון פותחות ב"שאלה שנשאלת תמיד" (VOICE §3.10). **כל רשימת סינון שייכת לדגל אחד ולדרגה
אחת** (קליני §9.1): קושי בנשימה לא נמצא באף רשימה (הוא נתפס בזיהוי הפסיבי, ושורת 101 קבועה), ושמיעה, תקשורת
חברתית ונחירות עברו ל-`signs_screen`.

| מטרה | מטרה (purpose) | נוסחים |
|---|---|---|
| `core_relation` · `self_age_band` (D-13, סבב 4) · `core_concern` · `core_age` | routing | 8.1 |
| `core_onset_pattern` · `speech_since_childhood` · `stuttering_since_childhood` · `screen_neuro` · `screen_voice` · `screen_swallow` · `lang_regression` | safety_screen | 8.1, 8.2 |
| `voice_duration` · `stuttering_onset` · `speech_scope` · `speech_understood_by` · `lang_expressive` · `oral_concern_referrer` · `signs_screen` | decision | 8.3 |
| `core_anything_else` | summary_only | 8.4 |

### 8.1 ליבה

#### `goal.core_relation.ask@v1`
**איפה:** הודעת הפתיחה בשיחה (UX chat.opening). עם q.relation.opt ו-chat.quick.have_question.
> כאן העוזר הדיגיטלי של הדס. על מי השיחה? אפשר לבחור כאן, או פשוט לכתוב במילים שלך מה מעסיק.

#### `goal.self_age_band.ask@v1`
**איפה:** מטרת routing `self_age_band` (D-13 ענף א). מוצגת מיד אחרי "על עצמי", לפני ההודעה החופשית הראשונה, עם הכפתורים `q.self_age_band.opt.*`.
**הערה:** prio 995, `applies_when: core_relation = self`, `turn_budget` 1, `show_to_hadas: false`: לא נספרת בתקציב השאלות, והטווח לא מגיע להדס. שני כפתורים בלבד (ARCHITECTURE §1.4), בלי "מעדיף לא לומר" ובלי `chat.quick.dont_know`. "מתחת ל-18" מפעיל `minor.self.before_text`. הנוסח לא מסביר למה שואלים: ההסבר כבר ב-`consent.disclaimer`, ושאלה שמזהירה מראש מזמינה תשובה לא נכונה. "הגיל שלך" נייטרלי בכתב (VOICE ט3).
> שאלה אחת לפני שממשיכים: מה טווח הגיל שלך — מתחת ל-18, או 18 ומעלה?

#### `goal.self_age_band.clarify@v1`
**איפה:** הבהרה של `self_age_band`, כשהפונה כתב תשובה חופשית במקום ללחוץ. תשובה לא ברורה נחשבת בגיר (קליני §9.3 תנאי 2).
> רציתי לוודא שהבנתי נכון. האם הגיל מתחת ל-18, או 18 ומעלה?

#### `goal.self_age_band.rephrase@v1`
**איפה:** ניסוח מחדש של `self_age_band`, למי שלא הבין או ענה על משהו אחר.
> בפשטות: האם כבר מלאו לך 18, או שעדיין לא?

#### `goal.core_concern.ask@v1`
**איפה:** מטרה core_concern.
> מה מעסיק? אפשר לכתוב במילים פשוטות, בכמה משפטים.

##### `goal.core_concern.ask.self@v1`
> מה מעסיק אותך? אפשר לכתוב במילים פשוטות, בכמה משפטים.

##### `goal.core_concern.ask.child.n@v1`
> מה מעסיק לגבי {{subject_ref}}? אפשר לכתוב במילים פשוטות, בכמה משפטים.

##### `goal.core_concern.ask.other@v1`
> מה מעסיק לגבי {{subject_ref}}? אפשר לכתוב במילים פשוטות, בכמה משפטים.

#### `goal.core_age.ask@v1`
**איפה:** מטרה core_age (נשמר בחודשים). נשאלת כש-rel=child. בנתיב "על עצמי" נשאלת מוקדם, כדי לזהות קטין (D-02, UX S13).
> מה הגיל, בערך?

##### `goal.core_age.ask.child.m@v1`
> בן כמה {{subject_ref}}? מתחת לגיל 3, עדיף בחודשים.

##### `goal.core_age.ask.child.f@v1`
> בת כמה {{subject_ref}}? מתחת לגיל 3, עדיף בחודשים.

##### `goal.core_age.ask.child.n@v1`
> מה הגיל של {{subject_ref}}? מתחת לגיל 3, עדיף בחודשים.

##### `goal.core_age.ask.other@v1`
> מה הגיל של {{subject_ref}}, בערך?

#### `goal.core_onset_pattern.ask@v1`
**איפה:** מטרת סינון core_onset_pattern (מבוגר אחר, שינוי בבגרות). לא בתחום הקול (קליני §9).
**הערה:** כפתורים מוצעים: "כבר הרבה זמן" · "בהדרגה" · "פתאום או לאחרונה". נשארת נפרדת משאלת הסימנים (VOICE §3.10).
> איך זה התחיל: זה כך כבר הרבה זמן, זה התפתח בהדרגה, או שזה הופיע פתאום או בשבועות האחרונים?

#### `goal.core_onset_pattern.rephrase@v1`
**איפה:** ניסוח מחדש של core_onset_pattern.
> בפשטות: זה חדש, או שזה כך כבר הרבה זמן?

### 8.2 שאלות סינון

`speech_since_childhood` ו-`stuttering_since_childhood` הן שאלות סינון לפי §9 (שינוי חדש בבגרות), אבל הן לא
רשימות. הנוסחים לא השתנו.

#### `goal.speech_since_childhood.ask@v1`
**איפה:** מטרה speech_since_childhood (rel≠child).
**הערה:** כפתורים מוצעים: "מילדות" · "חדש".
> זה קיים מילדות, או שזה חדש?

##### `goal.speech_since_childhood.ask.self@v1`
> זה קיים אצלך מילדות, או שזה חדש?

##### `goal.speech_since_childhood.ask.other@v1`
> זה קיים אצל {{subject_ref}} מילדות, או שזה חדש?

#### `goal.stuttering_since_childhood.ask@v1`
**איפה:** מטרה stuttering_since_childhood (rel≠child).
**הערה:** כפתורים מוצעים: "מילדות" · "התחיל בבגרות".
> זה קיים מילדות, או שזה הופיע לראשונה בגיל מבוגר?

##### `goal.stuttering_since_childhood.ask.self@v1`
> זה קיים אצלך מילדות, או שזה הופיע לראשונה בגיל מבוגר?

##### `goal.stuttering_since_childhood.ask.other@v1`
> זה קיים אצל {{subject_ref}} מילדות, או שזה הופיע לראשונה בגיל מבוגר?

#### `goal.screen_neuro.ask@v1` ⚖️ (קליני)
**איפה:** מטרת סינון screen_neuro, גרסת מבוגר (ממלאת `screen_neuro_any`). רק כשההופעה פתאומית או בשבועות האחרונים.
**מתי:** מעלה את `sudden_onset`. "לא ידוע לי" אצל מבוגר מעלה את הדגל בדרגה א (קליני §9). כפתורים מוצעים: "כן, משהו מאלה" · "לא, אף אחד" · "לא ידוע לי".
**הערה:** 8 הפריטים של `screen_neuro.adult` בשש שורות. שלושת קשיי הדיבור וההבנה מאוחדים בשורה אחת, כדי שהרשימה תישאר קצרה.
> שאלה שנשאלת תמיד כשמשהו הופיע לאחרונה: האם באותו זמן הופיע גם אחד מאלה?
> • דיבור מעורפל או "כבד"
> • קושי לדבר, להבין דיבור או למצוא מילים
> • קושי פתאומי לבלוע
> • צניחה בצד אחד של הפנים
> • חולשה ביד או ברגל
> • בלבול

##### `goal.screen_neuro.ask.child.n@v1` ⚖️ (קליני)
**הערה:** `screen_neuro.child`. "לא ידוע לי" → `doubt_tier: urgent` → `redflag.doubt.sudden_onset`. שורת ההוצאה בסוף: הורה לילד שמגמגם לא נבהל, והמחלץ לא מסמן גמגום כסימן.
> שאלה שנשאלת תמיד כשמשהו התחיל פתאום או לאחרונה: האם באותו זמן קרה גם אחד מאלה?
> • השינוי התחיל אחרי מכה בראש
> • חולשה ביד או ברגל
> • צניחה בצד אחד של הפנים
> • בלבול, או ישנוניות חריגה
> • פרכוס
> • קושי פתאומי לבלוע
> חזרות על מילים או היתקעות בתחילת מילים אינן חלק מהרשימה הזו.

#### `goal.screen_neuro.rephrase@v1` ⚖️ (קליני)
**איפה:** ניסוח מחדש של screen_neuro.
> בפשטות: חוץ מהדיבור, הופיע עוד משהו חדש באותו זמן — למשל חולשה, בלבול, צניחה בפנים או קושי לבלוע?

##### `goal.screen_neuro.rephrase.child.n@v1` ⚖️ (קליני)
> בפשטות: חוץ מהדיבור, קרה עוד משהו חדש באותו זמן — למשל מכה בראש, חולשה, ישנוניות חריגה או פרכוס?

#### `goal.screen_voice.ask@v1` ⚖️ (קליני)
**איפה:** מטרת סינון screen_voice (ממלאת `screen_voice_any`), כשהקול כך פחות מ-3 שבועות. רק `items_always`.
**מתי:** מעלה את `voice_risk`. "לא ידוע לי" → `doubt_tier: urgent`. כפתורים מוצעים: "כן, משהו מאלה" · "לא, אף אחד" · "לא ידוע לי".
**הערה:** בלי קושי בנשימה (קליני §9.1). → ארכיטקט: הבחירה בין הנוסח הזה ל-`goal.screen_voice.ask_3w` תלויה ב-`voice_duration_weeks`. לחוזה יש מזהה `ask` אחד לכל מטרה, ו-`ask_alt1|2` נבחרים לפי `seq`, לא לפי תנאי. צריך מנגנון: שתי מטרות עם `applies_when` שמוציאים זה את זה, או בחירת נוסח לפי תנאי.
> שאלה שנשאלת תמיד כשיש שינוי בקול: האם יחד עם זה יש גם אחד מאלה?
> • קושי לבלוע
> • שיעול עם דם
> • גוש בצוואר
> • ירידה במשקל בלי הסבר
> • השינוי בקול התחיל אחרי ניתוח, הנשמה או מכה בצוואר

#### `goal.screen_voice.ask_3w@v1` ⚖️ (קליני)
**איפה:** screen_voice כשהקול כך 3 שבועות ומעלה: `items_always` ועוד `items_if_weeks_ge_3` (כאב בבליעה, כאב באוזן, עישון).
**הערה:** אותם כפתורים ואותה החלטה כמו `goal.screen_voice.ask`. העישון נשאל כאן ולא כמטרה נפרדת (`voice_smoking` יצא משימוש).
> שאלה שנשאלת תמיד כשיש שינוי בקול: האם יחד עם זה יש גם אחד מאלה?
> • קושי לבלוע, או כאב בבליעה
> • שיעול עם דם
> • גוש בצוואר
> • ירידה במשקל בלי הסבר
> • כאב באוזן
> • עישון
> • השינוי בקול התחיל אחרי ניתוח, הנשמה או מכה בצוואר

#### `goal.screen_voice.rephrase@v1` ⚖️ (קליני)
**איפה:** ניסוח מחדש של screen_voice (שני האורכים).
> בפשטות: חוץ מהקול, יש עוד משהו — כמו קושי לבלוע, דם בשיעול, גוש בצוואר או ירידה במשקל?

#### `goal.screen_swallow.ask@v1` ⚖️ (קליני)
**איפה:** מטרת סינון screen_swallow (ממלאת `screen_swallow_any`), כש-screen_neuro לא חל. מחליפה את `oral_swallow_screen` ואת `adult_swallow_screen`.
**מתי:** מעלה את `swallowing`, חוץ ממבוגר שכבר במעקב רפואי בגלל הבליעה (→ תוצאה 4). "לא ידוע לי" → `doubt_tier: urgent`. כפתורים מוצעים: "כן, משהו מאלה" · "לא, אף אחד" · "לא ידוע לי".
**הערה:** הפתיח לא מניח שיש קושי באכילה, כי השאלה נשאלת גם על מבוגר אחר שהקושי שלו הוא בדיבור.
> שאלה שנשאלת תמיד בנושא אכילה ושתייה: האם יש אחד מאלה?
> • שיעול או השתנקות בזמן אכילה או שתייה
> • תחושה שהאוכל נתקע
> • דלקות ריאה חוזרות
> • ירידה במשקל

##### `goal.screen_swallow.ask.child.n@v1` ⚖️ (קליני)
> שאלה שנשאלת תמיד בנושא אכילה ושתייה: האם יש אחד מאלה?
> • שיעול או השתנקות בזמן אכילה או שתייה
> • תחושה שהאוכל נתקע
> • דלקות ריאה חוזרות
> • קושי לעלות במשקל

#### `goal.screen_swallow.rephrase@v1` ⚖️ (קליני)
**איפה:** ניסוח מחדש של screen_swallow.
> בפשטות: יש שיעול, השתנקות או תחושה שהאוכל נתקע בזמן אכילה או שתייה?

#### `goal.lang_regression.ask@v1` ⚖️ (קליני)
**איפה:** מטרת סינון lang_regression (rel=child). רשימה של פריט אחד, ולכן שאלה רגילה.
**מתי:** מעלה את `child_regression`. "לא ידוע לי" → `doubt_tier: urgent`. כפתורים מוצעים: "כן" · "לא" · "לא ידוע לי".
> שאלה שנשאלת תמיד בגיל הזה: האם קרה שמילים או יכולות שכבר היו — הפסיקו להופיע? למשל מילים שנאמרו בעבר, ועכשיו כבר לא.

#### `goal.lang_regression.rephrase@v1` ⚖️ (קליני)
**איפה:** ניסוח מחדש של lang_regression.
> בפשטות: יש מילים שנאמרו בעבר, ועכשיו כבר לא נאמרות?

### 8.3 מטרות החלטה

#### `goal.voice_duration.ask@v1`
**איפה:** מטרה voice_duration (שבועות + חוזר). נשאלת לפני screen_voice, כי היא קובעת איזה נוסח סינון יוצג.
> כמה זמן הקול כבר כך, בערך — ימים, שבועות או חודשים? ואם זה חוזר מדי פעם, גם את זה חשוב לדעת.

##### `goal.voice_duration.ask.child.n@v1`
> כמה זמן הקול של {{subject_ref}} כבר כך, בערך — ימים, שבועות או חודשים? ואם זה חוזר מדי פעם, גם את זה חשוב לדעת.

##### `goal.voice_duration.ask.other@v1`
> כמה זמן הקול של {{subject_ref}} כבר כך, בערך — ימים, שבועות או חודשים? ואם זה חוזר מדי פעם, גם את זה חשוב לדעת.

#### `goal.stuttering_onset.ask@v1`
**איפה:** מטרה stuttering_onset (rel=child, חודשים). חודש או פחות, או "פתאום" → screen_neuro בגרסת ילד.
> לפני כמה זמן זה התחיל, בערך? מספר חודשים מספיק.

#### `goal.speech_scope.ask@v1`
**איפה:** מטרה speech_scope (rel=child). בדרך כלל כבר ממולאת מההודעה הראשונה.
> האם זה בעיקר צליל אחד או שניים — למשל ר' או ש' — או שבאופן כללי קשה להבין את הדיבור?

#### `goal.speech_understood_by.ask@v1`
**איפה:** מטרה speech_understood_by (rel=child).
**הערה:** כפתורים מוצעים: "כולם" · "בעיקר המשפחה" · "גם המשפחה מתקשה".
> מי מבין את הדיבור: כולם, גם מי שפחות מכיר; בעיקר בני המשפחה; או שגם בני המשפחה מתקשים לפעמים?

#### `goal.lang_expressive.ask@v2`
**איפה:** מטרה lang_expressive (נתיב שפה בגיל הרך). ממלאת מילים וצירופים.
**הערה:** קליני §9: עם כפתורים, והסיפור (`lang_narrative`) עבר ל-`signs_screen`. כפתורים מוצעים, בנוסח נייטרלי (במקום "מחבר שתי מילים"): "עוד אין מילים" · "מילים בודדות" · "יותר מ-50 מילים, בלי צירופים" · "צירופים של שתי מילים" · "משפטים". "בכל השפות" — ספירה משותפת אצל דו-לשוניים (קליני).
> איך נראה הדיבור היום, בערך? אפשר לבחור את מה שהכי קרוב. סופרים את המילים בכל השפות שמדברים בבית יחד.

#### `goal.oral_concern_referrer.ask@v1`
**איפה:** מטרה oral_concern_referrer (מה + מי הפנה).
> מה בעיקר מעסיק בנושא הפה — למשל דחיקת לשון, נשימה דרך הפה, נחירות, ריור או לעיסה — ומי הפנה, אם מישהו הפנה?

#### `goal.signs_screen.ask@v1` (קליני)
**איפה:** מטרה signs_screen: בחירה מרובה אחת לכל תחום (`signs_sets`). מוצגת עם רשימת האפשרויות של התחום, ועוד "אף אחד מאלה" ו"לא ידוע לי".
**הערה:** לא שאלת סינון: אף אפשרות לא מעלה דגל. זה החריג השני לכלל "בלי רשימות" (VOICE §3.6, §3.10). הפתיח לא מבטיח שמשהו יגיע להדס, כי באתר זה קורה רק אם יושארו פרטים. התוויות של האפשרויות — בטבלה מתחת (→ קטלוג, `label_he`).
> עוד כמה דברים שעוזרים להבין את התמונה: מה מהרשימה מתאים? אפשר לסמן כמה, או "אף אחד מאלה".

##### `goal.signs_screen.ask.wa@v1` (קליני)
> עוד כמה דברים שעוזרים להבין את התמונה: מה מהרשימה מתאים? אפשר לכתוב את המספרים, למשל 1, 3, או "אף אחד".

#### `goal.signs_screen.rephrase@v1`
**איפה:** ניסוח מחדש של signs_screen.
> בפשטות: מה מהרשימה נכון? אפשר לסמן גם דבר אחד, ואם שום דבר לא מתאים — "אף אחד מאלה".

**תוויות לאפשרויות של `signs_screen` (הצעה ל-`label_he` בקטלוג, לא נוסח קבוע).** הניסוח מ-DRAFT_NOTES §9
`signs_sets`, נייטרלי מגדרית ובלי מונחים קליניים. הסלוט שכל אפשרות ממלאת — כמו ב-§9. אפשרות שמסומנת "(ילד)"
או "(מבוגר)" מוצגת רק לקהל הזה. לכל רשימה נוספות "אף אחד מאלה" (exclusive) ו"לא ידוע לי" (unknown).

| תחום | תוויות |
|---|---|
| קול | כאב, מאמץ או עייפות בזמן הדיבור · הקול נחלש לקראת סוף היום · הצרידות חוזרת שוב ושוב · הקול מפריע לעבודה או ללימודים · כבר הייתה בדיקה אצל רופא אף-אוזן-גרון · רופא המליץ על טיפול בקול · (פחות משבועיים) יש עכשיו צינון או מחלה · (ילד) הרבה צעקות, או מאמץ של הקול |
| היגוי | תסכול, הימנעות מדיבור או הקנטות בגלל הדיבור · (ילד) יש דאגה גם לגבי מילים או משפטים · הלשון יוצאת בין השיניים בזמן הדיבור · צלילים כמו ש' או ס' נשמעים "רטובים", או שהאוויר יוצא מהצד · גננת, מורה או רופא המליצו לפנות · יש חשש לגבי השמיעה · (מבוגר) זה מפריע בעבודה או בחברה |
| שטף | חזרות על חלקי מילים או צלילים ("א-א-אמא") · מתיחה של צלילים ("מממים") · היתקעות, כשהמילה לא יוצאת · מתח בפנים או מצמוץ בזמן הדיבור · מודעות לקושי, תסכול או הימנעות מדיבור · יש במשפחה מי שהיה לו קושי דומה בדיבור · איש מקצוע המליץ לפנות · רק חזרות על מילים שלמות ("אני-אני-אני") |
| פה | הפה פתוח רוב הזמן, או נשימה דרך הפה · הלשון נדחקת בין השיניים · אורתודנט או רופא שיניים המליץ לפנות · ריור · מוצץ או מציצת אצבע · נחירות, או עצירות נשימה בשינה · כבר הייתה בדיקה אצל רופא אף-אוזן-גרון · זה משפיע גם על הדיבור |
| שפה | קשה להבין בקשות פשוטות · גם בני המשפחה מתקשים להבין את הדיבור · מי שלא מכיר לא מבין את רוב הדיבור · (מגיל 3.5) קשה לספר מה קרה · כמעט אין תגובה לשם, הצבעה או קשר עין · יש חשש לגבי השמיעה · גננת, רופא או אחות בטיפת חלב הביעו דאגה · תסכול כשלא מבינים |

### 8.4 לפני הסיכום

#### `goal.core_anything_else.ask@v1`
**איפה:** מטרה core_anything_else (`summary_only`, UX `wrap_up_ask`). רק אם עוד לא הגענו ליעד השאלות.
> יש עוד משהו שחשוב שהדס תדע? אם לא, אפשר להמשיך לסיכום.

### 8.5 לא פעיל

#### `goal.other_awareness.ask@v1` ⚖️
**איפה:** "מבוגר אחר": שאלה אחת שלא חוסמת. התשובה מוצגת בולט במייל להדס (L-10, SEC-22, UX S13).
**סטטוס:** לא פעיל — אין מטרה כזו בקטלוג. תלוי בשאלה 21 לעורך הדין ובהחלטה של המנסח הקליני.
**הערה:** כפתורים מוצעים: "כן" · "עדיין לא" · "לא ידוע לי".
> שאלה אחת לפני שממשיכים: האם הפנייה נעשית בידיעה של {{subject_ref}}?

### 8.6 נוסחים כלליים

#### `q.clarify.generic@v1`
**איפה:** clarify של כל המטרות.
> רציתי לוודא שהבנתי נכון. אפשר לכתוב את זה במילים אחרות?

#### `q.rephrase.generic@v1`
**איפה:** rephrase של כל המטרות בלי rephrase ייעודי.
> אם השאלה לא ברורה, אפשר לענות במילים פשוטות, או לכתוב שזה לא ידוע.

#### `q.rephrase.prefix@v1`
**איפה:** פתיח לניסוח מחדש של המנסח.
> אנסח אחרת:

#### `q.dont_know.ack@v1`
**איפה:** אישור קבוע אחרי "לא ידוע לי".
> בסדר, אפשר להמשיך גם בלי זה.

**קידומות אישור `ack.*` (ARCHITECTURE §5.6, מהלך `acknowledge_and_ask`).** הקוד מצמיד קידומת אחת לשאלת התבנית הבאה.
כולן עד 5 מילים, בלי שיפוט ובלי רגש (VOICE מ0), ומתאימות לפני כל `goal.<id>.ask`. הצעה לבחירה: `ack.extra_detail`
כשבתור נחלץ פרט שאינו של המטרה הנוכחית; `ack.full_first_message` אחרי הודעה ראשונה שמילאה 3 פרטים או יותר;
אחרת אחת משלוש הכלליות, לפי `seq`, כדי שלא תחזור אותה קידומת פעמיים ברצף.

#### `ack.thanks@v1`
**איפה:** קידומת כללית.
> תודה.

#### `ack.noted@v1`
**איפה:** קידומת כללית.
> תודה, רשמתי.

#### `ack.understood@v1`
**איפה:** קידומת כללית.
> הבנתי, תודה.

#### `ack.extra_detail@v1`
**איפה:** הפונה הוסיף פרט שאינו של המטרה הנוכחית (VOICE מ5). לא אומר שזה "יגיע להדס", כי באתר זה קורה רק אם יושארו פרטים.
> תודה, רשמתי גם את זה.

#### `ack.full_first_message@v1`
**איפה:** אחרי הודעה ראשונה מפורטת (VOICE 5.9).
> תודה, זה עוזר מאוד.

#### `transition.returning_to_question@v1`
**איפה:** חזרה למטרה אחרי מענה מטא או FAQ.
> ובחזרה לשאלה:

### 8.7 אישור בסיום (wrap_up)

**נבנה בקוד, בלי מודל** (הארכיטקט, סבב 3; ARCHITECTURE §5.6): `wrapup.recap_intro`, ואחריו שורה לכל פרט
שמסומן `confirm_in_wrap_up`, בצורה "`label_he`: `recap_label_he`" מהקטלוג, ואז `wrapup.confirm` עם שני הכפתורים.
"יש תיקון" → `wrapup.fix_prompt`, טקסט חופשי שנחלץ כרגיל, תור אחד. פרט בסטטוס `unknown` מוצג עם
`wrapup.value.unknown`. גיל מתחת ל-3 מוצג עם `wrapup.age.months`, ומעל זה כמספר בלבד.

**תוויות לשורת האימות (הצעה ל-`label_he` / `recap_label_he` בקטלוג, דרך המנסח הקליני).** בלי מונחים קליניים
(VOICE §3.7): הפונה מאשר כאן את מה שהמחלץ הבין, ולכן תווית כמו "שטף הדיבור" או "אפרקסיה" הייתה מכניסה
מונח שהוא לא אמר.

| פרט | `label_he` בשורה | `recap_label_he` לכל ערך |
|---|---|---|
| `core_relation_detail` | השיחה על | נוסחי `subject_ref.*` (§7). `self` → "עצמך" |
| `core_age` | גיל | מספר, או `wrapup.age.months` |
| `domain` | הנושא | voice: הקול · articulation: הגייה של צלילים · stuttering: היתקעויות או חזרות בדיבור · oral_function: הפה, הלשון או הנשימה · intelligibility: עד כמה מבינים את הדיבור · early_language: התפתחות הדיבור והשפה · school_language: שפה ולמידה בבית הספר · apraxia: הפקה של צלילים ומילים · adult_acquired: שינוי בדיבור, בשפה או בהבנה · adult_swallowing: בליעה · child_feeding: אכילה ושתייה · social_communication: תקשורת וקשר עם אנשים · hearing: שמיעה · literacy: קריאה וכתיבה · voice_coaching: פיתוח הקול, למשל לדיבור מול קהל · other: נושא אחר |

#### `wrapup.recap_intro@v1`
**איפה:** לפני תקציר האימות.
> לפני הסיכום, רק לוודא שהבנתי נכון:

#### `wrapup.confirm@v1`
**איפה:** אחרי התקציר.
> זה נכון, או שיש מה לתקן?

#### `wrapup.opt.correct@v1`
**איפה:** כפתור אחרי wrapup.confirm.
> נכון

#### `wrapup.opt.fix@v1`
**איפה:** כפתור אחרי wrapup.confirm.
> יש תיקון

#### `wrapup.fix_prompt@v1`
**איפה:** אחרי "יש תיקון". פותח טקסט חופשי לתור אחד.
> מה לתקן? אפשר לכתוב במילים פשוטות.

#### `wrapup.value.unknown@v1`
**איפה:** הערך בשורת האימות לפרט בסטטוס `unknown`.
> לא ידוע

#### `wrapup.age.months@v1`
**איפה:** ערך הגיל בשורת האימות, מתחת לגיל 3 (הגיל נשמר בחודשים).
> {{age_months}} חודשים

### 8.8 שאלת הבירור של `sudden_onset`

#### `redflag.confirm.sudden_onset@v1` ⚖️ (קליני)
**איפה:** triggers.confirm של sudden_onset. אצל מבוגר, כשיש סימן ומשך הזמן לא ידוע. נשאלת פעם אחת.
**הערה:** כפתורים מוצעים: "בבת אחת או לאחרונה" · "כבר הרבה זמן". לפי המנסח הקליני, ספק אחרי
השאלה מעלה את הדגל בדרגה א.
> שאלה אחת חשובה: השינוי הזה הופיע בבת אחת או בשבועות האחרונים, או שהוא קיים כבר הרבה זמן?

---

## 9. "מתי כן לפנות" — `when_to_contact.<wtc_id>` ⚖️ (קליני)

בתוצאה 3 מוצגת הרשימה של התחום שעלה, ואחריה `outcome.3.when_to_contact.always`. משפטים
שמתארים מה רואים, בגוף סתמי, מובנים גם למי שלא היה בשיחה. ספים שהמנסח הקליני סימן "לא בטוח"
כתובים לפי ההצעה הנוכחית. אם הדס משנה — גרסה חדשה.

**סטטוס הסעיף:** לא פעיל — תוצאה 3 כבויה בהשקה (D-03). הנוסחים נשמרים להפעלה עתידית, אחרי חודש נתונים ותשובת עורך הדין.

#### `outcome.3.when_to_contact.title@v1` ⚖️
**איפה:** כותרת הרשימה בתוצאה 3.
> מתי כן לפנות להדס

#### `outcome.3.when_to_contact.intro@v2` ⚖️
**איפה:** שורת פתיחה לרשימה בתוצאה 3.
**הערה:** L-29: "למשל" ו"הרשימה אינה מלאה", כדי שספי הגיל לא ייקראו כרשימה ממצה.
> כדאי לפנות, למשל, אם אחד מאלה קורה עכשיו או בהמשך. הרשימה אינה מלאה:

#### `when_to_contact.wtc_voice_persisting@v1` ⚖️ (קליני)
**איפה:** תוצאה 3, תחום קול.
> הקול צרוד או שונה כבר יותר משבועיים-שלושה.

#### `when_to_contact.wtc_voice_pain_effort@v1` ⚖️ (קליני)
**איפה:** תוצאה 3, תחום קול.
> יש כאב, מאמץ או עייפות בזמן הדיבור או אחריו.

#### `when_to_contact.wtc_voice_end_of_day@v1` ⚖️ (קליני)
**איפה:** תוצאה 3, תחום קול.
> הקול נחלש או "נעלם" לקראת סוף היום.

#### `when_to_contact.wtc_voice_recurring@v1` ⚖️ (קליני)
**איפה:** תוצאה 3, תחום קול.
> הצרידות חוזרת שוב ושוב.

#### `when_to_contact.wtc_voice_work_impact@v1` ⚖️ (קליני)
**איפה:** תוצאה 3, תחום קול.
> הקול מפריע לעבודה או ללימודים.

#### `when_to_contact.wtc_voice_child_hoarse@v1` ⚖️ (קליני)
**איפה:** תוצאה 3, תחום קול.
> אצל ילד או ילדה: הקול צרוד רוב הזמן.

#### `when_to_contact.wtc_voice_ent_recommended@v1` ⚖️ (קליני)
**איפה:** תוצאה 3, תחום קול.
> רופא אף-אוזן-גרון המליץ על טיפול בקול.

#### `when_to_contact.wtc_speech_errors_after_5@v1` ⚖️ (קליני)
**איפה:** תוצאה 3, היגוי ומובנות.
> מגיל 5 ומעלה, צלילים מסוימים עדיין נאמרים אחרת.

#### `when_to_contact.wtc_speech_interdental@v1` ⚖️ (קליני)
**איפה:** תוצאה 3, היגוי ומובנות.
> מגיל 4 וחצי בערך, הלשון יוצאת בין השיניים בזמן הדיבור (למשל בס' או בש').

#### `when_to_contact.wtc_speech_lateral@v1` ⚖️ (קליני)
**איפה:** תוצאה 3, היגוי ומובנות.
> בכל גיל: צלילים כמו ש' או ס' נשמעים "רטובים", או שהאוויר יוצא מהצד.

#### `when_to_contact.wtc_speech_intelligibility@v1` ⚖️ (קליני)
**איפה:** תוצאה 3, היגוי ומובנות.
> בגיל 3, גם בני המשפחה מתקשים להבין את הדיבור. מגיל 4, מי שלא מכיר לא מבין את רוב הדיבור.

#### `when_to_contact.wtc_speech_child_impact@v1` ⚖️ (קליני)
**איפה:** תוצאה 3, היגוי ומובנות.
> יש תסכול, הימנעות מדיבור, או הקנטות בגלל הדיבור.

#### `when_to_contact.wtc_speech_adult_impact@v1` ⚖️ (קליני)
**איפה:** תוצאה 3, היגוי ומובנות.
> ההגייה או הדיבור המהיר מפריעים ביום-יום.

#### `when_to_contact.wtc_stuttering_disfluency_type@v1` ⚖️ (קליני)
**איפה:** תחום שטף. לפי REVIEW 4.1.1 אין כאן תוצאה 3; משמש להבחנה בין 1 ל-2.
> יש חזרות על חלקי מילים ("א-א-אמא"), מתיחה של צלילים, או היתקעות בלי קול.

#### `when_to_contact.wtc_stuttering_physical_effort@v1` ⚖️ (קליני)
**איפה:** תחום שטף.
> רואים מאמץ בזמן הדיבור, כמו מתח בפנים או מצמוץ.

#### `when_to_contact.wtc_stuttering_awareness@v1` ⚖️ (קליני)
**איפה:** תחום שטף.
> יש מודעות לקושי, תסכול, אמירות כמו "קשה לי לדבר", או הימנעות מדיבור.

#### `when_to_contact.wtc_stuttering_duration@v1` ⚖️ (קליני)
**איפה:** תחום שטף.
> ההיתקעויות בדיבור נמשכות כבר יותר מ-3 עד 6 חודשים.

#### `when_to_contact.wtc_stuttering_family_history@v1` ⚖️ (קליני)
**איפה:** תחום שטף.
> יש במשפחה מי שהיה לו קושי דומה בשטף הדיבור.

#### `when_to_contact.wtc_stuttering_adult_avoidance@v1` ⚖️ (קליני)
**איפה:** תחום שטף.
> הימנעות ממצבי דיבור, או החלפת מילים כדי לא להיתקע.

#### `when_to_contact.wtc_oral_mouth_breathing@v1` ⚖️ (קליני)
**איפה:** תוצאה 3, תפקודי פה.
> הפה פתוח רוב היום, או שהנשימה היא בעיקר דרך הפה. במקביל כדאי גם בדיקה אצל רופא אף-אוזן-גרון.

#### `when_to_contact.wtc_oral_tongue_thrust@v1` ⚖️ (קליני)
**איפה:** תוצאה 3, תפקודי פה.
> הלשון נדחקת קדימה או בין השיניים בזמן בליעה או דיבור.

#### `when_to_contact.wtc_oral_professional_referral@v1` ⚖️ (קליני)
**איפה:** תוצאה 3, תפקודי פה.
> אורתודנט או רופא שיניים המליץ לפנות.

#### `when_to_contact.wtc_oral_drooling@v1` ⚖️ (קליני)
**איפה:** תוצאה 3, תפקודי פה.
> יש ריור אחרי גיל 4 בערך.

#### `when_to_contact.wtc_oral_sucking_habit@v1` ⚖️ (קליני)
**איפה:** תוצאה 3, תפקודי פה.
> מציצת אצבע או מוצץ נמשכים אחרי גיל 4–5 בערך.

#### `when_to_contact.wtc_oral_chewing@v1` ⚖️ (קליני)
**איפה:** תוצאה 3, תפקודי פה (רק אם 1.11 בתחום).
> יש קושי בלעיסה, או עם מרקמים מסוימים של אוכל.

#### `when_to_contact.wtc_lang_12m@v1` ⚖️ (קליני)
**איפה:** תוצאה 3, שפה בגיל הרך.
> בגיל שנה: אין מלמול, אין תגובה לשם, או אין הצבעה ונפנוף לשלום.

#### `when_to_contact.wtc_lang_18m@v1` ⚖️ (קליני)
**איפה:** תוצאה 3, שפה בגיל הרך.
> בגיל 18 חודשים: עדיין אין מילים.

#### `when_to_contact.wtc_lang_24m@v1` ⚖️ (קליני)
**איפה:** תוצאה 3, שפה בגיל הרך.
> בגיל שנתיים: פחות מ-50 מילים בערך, או שעדיין אין חיבור של שתי מילים יחד.

#### `when_to_contact.wtc_lang_36m@v1` ⚖️ (קליני)
**איפה:** תוצאה 3, שפה בגיל הרך.
> בגיל 3: עדיין אין משפטים קצרים, גם בני המשפחה מתקשים להבין, או שקשה להבין בקשות פשוטות.

#### `when_to_contact.wtc_lang_48m@v1` ⚖️ (קליני)
**איפה:** תוצאה 3, שפה בגיל הרך (מחושב מ-lang_narrative).
> בגיל 4: קשה לספר מה קרה, או שמי שלא מכיר לא מבין את רוב הדיבור.

#### `when_to_contact.wtc_lang_others_concerned@v1` ⚖️ (קליני)
**איפה:** תוצאה 3, שפה בגיל הרך.
> בכל גיל: גננת, מורה או רופא הביעו דאגה.

#### `when_to_contact.bilingual_note@v1` ⚖️ (קליני)
**איפה:** מתחת לרשימת השפה בגיל הרך. כלל הפרשנות של המנסח הקליני.
> במשפחה שמדברת יותר משפה אחת, סופרים את המילים בכל השפות יחד.

---

## 10. מסכי התוצאה (1–4)

מבנה (UX S5): בועת הסיכום החם → כרטיס (תווית `outcome.card.label`, כותרת, גוף, הסתייגות **בתוך הכרטיס**,
`outcome.extraction_gap` אם צריך, תוכן ייעודי, פעולה ראשית) → קישורים משניים `outcome.add_more` · `outcome.finish`.
**תוצאה 3 כבויה בהשקה (D-03):** כל נוסחי `outcome.3.*` מסומנים "לא פעיל". המקרים האלה מקבלים תוצאה 2, ונרשם
`would_be_outcome_3`.

#### `outcome.card.label@v1` ⚖️
**איפה:** תווית קבועה מעל כותרת כרטיס התוצאה, בתוצאות 1–4 (הצעת UI, אושרה ב-UX טיוטה 3).
**הערה:** "כיוון" הוא המונח של `consent.disclaimer` ("הכיוון שיוצג בסוף"). לא "תוצאה" ולא "המלצה". ⚖️ כי הוא ממסגר את כרטיס התוצאה.
> הכיוון להמשך

#### `outcome.stale_label@v1`
**איפה:** תגית על כרטיס תוצאה קודם שנשאר בתמליל אחרי "שכחתי לספר" (UX S5, UI `.stale-tag`).
> הכיוון הקודם, לפני העדכון

#### `outcome.extraction_gap@v1` ⚖️
**איפה:** בתוך כרטיס התוצאה, כשהודעה של הפונה לא נקלטה גם בחילוץ החוזר (ARCHITECTURE §5.5, F1). תוצאה 3 נחסמת. 101 חובה.
**הערה:** לא אומרים "תקלה" ולא מאשימים את הפונה. מה שנכתב עבר בדיקת דגלים בכל מקרה, אבל את זה לא אומרים לפונה, כדי שלא יסתמך על זה.
> חלק ממה שנכתב בשיחה לא נקלט כמו שצריך, וייתכן שהכיוון כאן לא מביא אותו בחשבון. אם יש בו משהו חשוב, כדאי לספר להדס ישירות: {{hadas_phone}}. במצב חירום: מד"א 101.

#### `transition.to_outcome@v1`
**איפה:** ההודעה לפני הסיכום והכרטיס.
> תודה על השיתוף. הנה סיכום קצר, ומה אפשר לעשות מכאן.

#### `outcome.summary.label@v1`
**איפה:** תווית לבועת הסיכום החם.
> מה שעלה בשיחה

#### `outcome.summary.fallback@v1`
**איפה:** במקום הסיכום החם, כשהמודל נכשל.
> תודה על הזמן ועל השיתוף.

#### `outcome.disclaimer@v2` ⚖️
**איפה:** בתוך הכרטיס, בתוצאות 1, 2 ו-4 (UX outcome.common.disclaimer).
> נוצר אוטומטית, רק ממה שנכתב בשיחה. זה לא אבחון ולא ייעוץ רפואי, ולא מחליף איש מקצוע. חירום: 101.

#### `outcome.addendum.document_request@v1` ⚖️
**איפה:** שורת תוספת (`addenda[].text_id`, `audience: user`) בכרטיס התוצאה, בתוצאות 1, 2 ו-4, כשהפונה ביקש בשיחה מסמך, אישור או חוות דעת לגורם חיצוני (`document_request`, L-15). אחרי `outcome.disclaimer`. לא מוצגת בתוצאה 3 (כבויה, ובקשת מסמך חוסמת אותה).
**הערה:** באותו ניסוח של `meta.document_request`, כפי שהמבקר המשפטי ביקש: "נושא לשיחה עם הדס, אחרי היכרות", ולא "הדס מספקת מכתבים אחרי הערכה" (REVIEW 4.0.5), כי זה נקרא כהבטחה למכתב לבית משפט או לביטוח. מתייחסת ל"הכיוון שמוצג כאן" (`outcome.card.label`) ולא לשיחה, כי צילום מסך של הכרטיס הוא הסיכון.
> העוזר הדיגיטלי לא כותב מסמכים, אישורים או חוות דעת, והכיוון שמוצג כאן אינו מסמך מקצועי ואינו מתאים להצגה כחוות דעת. מסמכים מקצועיים הם נושא לשיחה עם הדס, אחרי היכרות.

#### `outcome.cta.form@v1`
**איפה:** פעולה ראשית בתוצאות 1–3.
> השארת פרטים להדס

#### `outcome.cta.phone@v1`
**איפה:** מתחת לפעולה הראשית בתוצאות 1–3.
> או להתקשר: {{hadas_phone}}

#### `outcome.add_more@v1`
**איפה:** קישור משני בכל מסך תוצאה.
> שכחתי לספר משהו

#### `outcome.finish@v1`
**איפה:** קישור משני בכל מסך תוצאה. פותח את דיאלוג המחיקה (`chat.delete.*`), ומוחק בשרת (D-01). אחר כך S9.
**הערה:** התווית נשארת כמו שהיא: לפי D-01 היא סוף-סוף מדויקת (L-04, כיוון א של המבקר המשפטי).
> סיום ומחיקה

#### `closed.keep_note@v1` ⚖️
**איפה:** S9, מתחת לכרטיס ההפניה (תוצאה 4), או לרשימת "מתי לפנות" (תוצאה 3, כשתופעל), שנשארים על המסך רק בזיכרון הדף אחרי המחיקה (UX S9).
> הפרטים מוצגים עכשיו בלבד, ולא יישמרו אחרי סגירת הדף. כדאי לרשום אותם.

#### `outcome.1.title@v1` ⚖️
**איפה:** כרטיס תוצאה 1.
> כדאי לפנות להדס

#### `outcome.1.body@v2` ⚖️
**איפה:** כרטיס תוצאה 1.
**הערה:** L-21: בלי "מומלץ". מדווח מה עלה בשיחה, בדומה לתוצאה 3, בנוסח של המבקר המשפטי. הכותרת "כדאי לפנות להדס" נשארת (סבירה לדעתו).
> לפי מה שנכתב בשיחה, הנושא שתואר הוא מהתחומים שהדס תודה עוסקת בהם, ועלו בשיחה דברים שהדס הגדירה מראש כסיבה לפנות. אפשר לפנות אליה לשיחה ראשונה, כדי להבין את התמונה המלאה ולשמוע מה האפשרויות.

#### `outcome.2.title@v1` ⚖️
**איפה:** כרטיס תוצאה 2.
> שווה לשוחח עם הדס

#### `outcome.2.body@v1` ⚖️
**איפה:** כרטיס תוצאה 2.
> לפי מה שעלה בשיחה, כדאי לשוחח עם הדס תודה בשיחת התייעצות. שיחה קצרה איתה תעזור להבין את התמונה טוב יותר, ולברר אם ואיך אפשר לעזור.

**תוצאה 3 ⚖️ — הנוסח הרגיש ביותר בקובץ.** מדווח רק על מה שלא עלה בשיחה. אם עורך הדין פוסל את
התוצאה, היא מתמזגת לתוצאה 2. החלטת UX: הטופס באותה בולטות כמו ב-1–2, אבל אחרי ההסתייגות והרשימה.
בלי וי ירוק ובלי צבע של הצלחה.

#### `outcome.3.title@v1` ⚖️
**איפה:** כרטיס תוצאה 3. כותרת נייטרלית בכוונה.
**סטטוס:** לא פעיל — תוצאה 3 כבויה בהשקה (D-03).
> סיכום השיחה

#### `outcome.3.body@v3` ⚖️
**איפה:** כרטיס תוצאה 3.
**סטטוס:** לא פעיל — תוצאה 3 כבויה בהשקה (D-03).
**הערה:** חלופה א של המבקר המשפטי (§2.3), מילה במילה: בלי לייחס את הרשימה להדס, ובלי הנוסח של GOALS, שהוא הקרוב ביותר ל"אין צורך כעת". "זה לא אומר שהכול בסדר" — שלילה מפורשת; "בסדר" אסור רק בטקסט של המודל (`output-rules`).
> בשיחה הקצרה הזו לא עלה אף אחד מהסימנים שברשימה שנקבעה מראש. זה דיווח על מה שנכתב כאן בלבד: זה לא אומר שהכול בסדר, ושיחה אוטומטית יכולה להחמיץ דברים חשובים. אם יש דאגה, זו סיבה מספיקה לפנות.

#### `outcome.3.disclaimer@v2` ⚖️
**איפה:** בתוך כרטיס תוצאה 3 — ההסתייגות המורחבת.
**סטטוס:** לא פעיל — תוצאה 3 כבויה בהשקה (D-03).
**הערה:** L-15: לא מתאים להצגה לגורם אחר.
> הסיכום נוצר אוטומטית, רק מתוך התשובות כאן. שיחה קצרה ואוטומטית לא רואה את כל התמונה ועלולה לטעות. היא אינה אבחון, הערכה מקצועית או ייעוץ רפואי, אינה מחליפה פגישה עם קלינאית תקשורת או רופא, ואינה מסמך שמתאים להצגה לגורם אחר. חירום: 101.

#### `outcome.3.when_to_contact.always@v1` ⚖️ (קליני)
**איפה:** תוצאה 3, אחרי פריטי when_to_contact של התחום (return_signs_text_id).
**סטטוס:** לא פעיל — תוצאה 3 כבויה בהשקה (D-03).
**הערה:** המנסח הקליני אימץ אותו במקום השורה שלו (REVIEW §5).
> - יש דאגה, או תחושה שמשהו לא מסתדר. זו סיבה מספיקה לפנות.
> - משהו משתנה, מחמיר, או לא משתפר עם הזמן.
> - קושי בדיבור, בהבנה או בבליעה מופיע פתאום. במקרה כזה לא לחכות: מד"א 101 או חדר מיון.

#### `outcome.3.door_open@v1` ⚖️
**איפה:** תוצאה 3, לפני הכפתורים.
**סטטוס:** לא פעיל — תוצאה 3 כבויה בהשקה (D-03).
> אפשר לפנות להדס בכל זמן, גם עכשיו. אם משהו חשוב לא עלה בשיחה, כדאי לספר לה ישירות.

#### `outcome.4.title@v1` ⚖️
**איפה:** כרטיס תוצאה 4.
> לאן כדאי לפנות

#### `outcome.4.body@v1` ⚖️
**איפה:** כרטיס תוצאה 4. משמש גם ככותרת הרשימה (UX outcome.4.referrals.title מיותר).
> תודה על השיתוף. לפי מה שעלה בשיחה, הנושא הזה אינו מהתחומים שהדס תודה עוסקת בהם. כדי שהפנייה תגיע למי שעוסק בזה, אלה מקומות שאפשר לפנות אליהם:

#### `outcome.4.referral_item@v1` (קליני)
**איפה:** פריט ברשימת ההפניות.
> {{referral_name}} — {{referral_description}} {{referral_contact}}

#### `outcome.4.external_hint@v1`
**איפה:** תווית נגישות לקישור חיצוני.
> נפתח בלשונית חדשה

#### `outcome.4.referral_disclaimer@v2` ⚖️
**איפה:** מתחת לרשימת ההפניות.
**הערה:** L-16: אין התחייבות לזמינות, והפרטים עשויים להשתנות.
> הרשימה נועדה לעזור למצוא כתובת מתאימה. היא אינה המלצה על גורם מסוים ואינה התחייבות לזמינותו, והפרטים עשויים להשתנות. כדאי לבדוק את ההתאמה ישירות מולם.

#### `outcome.4.no_referral@v1` ⚖️ (קליני)
**איפה:** במקום הרשימה, כשאין הפניה מתאימה.
> לנושא הזה אין כרגע הפניה מוכנה. רופא המשפחה או רופא הילדים יוכלו לכוון למקום המתאים.

#### `outcome.4.misunderstood@v1` ⚖️
**איפה:** קישור צנוע בתוצאה 4 (רשת ביטחון לסיווג שגוי).
> נראה שמשהו לא הובן נכון בשיחה? אפשר לפנות להדס ישירות: {{hadas_phone}}.

---

## 11. ⚖️ דגל אדום (תוצאה 5)

**מבנה המסך (UX S6).** הדרגות הן הערכים של החוזה `red-flags`: `emergency` / `urgent` / `hotline` (הארכיטקט, סבב 3).
הכותרת היא `redflag.title.<tier>`. הטופס לפי **D-04**.

| דרגה | כותרת | גוף | פעולות | טופס להדס (D-04) |
|---|---|---|---|---|
| emergency | `redflag.title.emergency` | `redflag.type.<id>` | `redflag.cta.call` (ראשי) · השורה `redflag.secondary.emergency` (אין כפתור חדר מיון) | **אין.** רק השורה הפסיבית `redflag.after.emergency` |
| urgent | `redflag.title.urgent` | `redflag.type.<id>`, או `redflag.doubt.<id>` כשהדגל עלה מספק | — | משני, רק כש-`form: secondary` במעטפה: `redflag.after` + `redflag.cta.form`. כש-`form: none` (דגל נוסף אוסר טופס, או הדס לא אישרה): `redflag.after.no_form`, בלי כפתור |
| hotline | `redflag.title.hotline` | `redflag.type.distress` / `child_safety` | `redflag.cta.call_1201` (ב-distress) | **אין** (`redflag.after.hotline` לא פעיל). `child_safety` — עד תשובת עורך הדין |

**מסך משולב (UX S6, טיוטה 4.1).** בלוק ראשי לפי הדרגה הגבוהה, ובלוק משני שלם לכל דגל `hotline` נוסף. **כותרת הבלוק הראשי:** `redflag.title.<tier>`.
**כותרת בלוק משני:** `redflag.title.hotline.distress` או `redflag.title.hotline.child_safety`, לפי הדגל (לא כותרת הדרגה, כדי ששני בלוקים משניים לא ישאו אותה כותרת).
**שורה על הדס בכל מסך: אחת, בבלוק הראשי בלבד:** `redflag.after.emergency` (חירום), `redflag.after` (urgent עם טופס משני), `redflag.after.no_form` (urgent בלי טופס). בדרגת hotline אין שורה כזו.
**אחרי 403 על הטופס** (ולא מהשיחה): `redflag.form_not_sent` אחרי הבלוקים ולפני `redflag.footer`.

בכל המסכים, אחרי הפעולות: `redflag.footer` (ההסתייגות של תוצאה 5, `disclaimer_text_ref`, L-19), ואז
`nav.back_to_site`. **בלי סיכום של מודל.** כל הודעה שלמה בפני עצמה, בלי חורים.
**`.self`** — הקושי הוא של הפונה עצמו (UX `rf.self_variant`; נבחר מ-`core_relation`, בלי סלוט חדש).
**"הפונה לא ליד המושא"** (UX `rf.away_variant`) — בלי וריאנט: שורה אחת בנוסח הבסיס של דגלי החירום.
**`.wa`** — וריאנט וואטסאפ, רק כשנוסח האתר לא נכון שם (L-07).
**מי שלא יכול לדבר בטלפון:** `redflag.cant_speak` הוא מציין מקום בלבד, עד שמד"א יאשרו ערוץ כתוב. בסבב 3 הוסרה
מהווריאנטים `.self` הטענה "אפשר לפנות למד"א גם בכתב", כי היא הניחה שירות שלא אומת.
הפעולה בשורה הראשונה. לא נוקבים בשם של מצב רפואי ולא חוזרים על הסימנים שהפונה תיאר.
כל מספרי החירום וקווי הסיוע — **לאמת לפני השקה** (L-16: הדס אחראית לתוכן, אליה לבדיקה הטכנית).

#### `redflag.title.emergency@v1` ⚖️
**איפה:** כותרת S6, דרגת emergency.
> חשוב לפנות עכשיו לעזרה רפואית

#### `redflag.title.urgent@v1` ⚖️
**איפה:** כותרת S6, דרגת urgent. מחליף את `redflag.title.medical` (אותו טקסט, שם הדרגה בחוזה).
> קודם כול, בדיקה רפואית

#### `redflag.title.hotline@v1` ⚖️
**איפה:** כותרת S6, דרגת hotline. מחליף את `redflag.title.helpline` (אותו טקסט).
**הערה:** h1 של **בלוק ראשי** מדרגת hotline. בלוק hotline משני נושא את הכותרת לפי סוג הדגל (שני הנוסחים הבאים), ולא את הזו.
> אפשר לדבר עם מישהו עכשיו

#### `redflag.title.hotline.distress@v1` ⚖️
**איפה:** כותרת h2 של בלוק משני בדגל distress, במסך משולב (UX S6, טיוטה 4.1). בבלוק ראשי מדרגת hotline: `redflag.title.hotline`.
**הערה:** נבדלת מ-`redflag.title.hotline` בכוונה: כשבלוק בטיחות ילד הוא הראשי, "אפשר לדבר עם מישהו עכשיו" כבר h1, ושני h2 כמעט זהים היו מבלבלים בניווט לפי כותרות. "אם קשה עכשיו" מנרמל ולא מניח מצוקה (כמו ב-`minor.self.before_text`), ונכון גם כשמישהו קרוב אמר את הדברים וגם כשהדברים של הפונה עצמו, ולכן אין וריאנטים. בלי שם של מצב, בלי "מצוקה" ובלי שם השירות. נכנסת לבאנדל (`redflag.title.*`).
> אם קשה עכשיו

#### `redflag.title.hotline.child_safety@v1` ⚖️
**איפה:** כותרת h2 של בלוק משני בדגל child_safety, במסך משולב (UX S6, טיוטה 4.1). בבלוק ראשי מדרגת hotline: `redflag.title.hotline`.
**סטטוס:** טיוטה. לא להפעיל לפני תשובת עורך הדין על חובת דיווח ועל השאלה אם להציג טופס (שאלה 23), כמו `redflag.type.child_safety`.
**הערה:** תנאי ("אם יש חשש") ולא קביעה: הכותרת לא אומרת שמשהו קרה ולא מייחסת דבר לפונה או למשפחה. "פגיעה" מופיעה רק בתוך החשש, כמו בגוף הנוסח; בלי "הזנחה" ובלי "סכנה" (הגוף מפרט). מכוונת לנושא הבלוק, כדי שלא תתבלבל עם הבלוק הרפואי שמעליו ("חשש לילד" לבדו היה נקרא כחשש התפתחותי). נכנסת לבאנדל (`redflag.title.*`).
> אם יש חשש לפגיעה בילד

#### `redflag.footer@v1` ⚖️
**איפה:** בכל מסך דגל אדום, בכל הדרגות, **אחרי הפעולות**, בגופן משני (L-19, UX S6). זו ההסתייגות של תוצאה 5 (`disclaimer_text_ref`). בוואטסאפ המתאם מצרף אותה כשורה אחרונה.
**הערה:** הנוסח של המבקר המשפטי, מילה במילה. לא בפתיחה, כדי לא להחליש את הדחיפות. → הדס ועורך הדין מכריעים (שאלה 8).
> הודעה קבועה שמוצגת אוטומטית לפי מה שנכתב בשיחה. היא אינה אבחון.

#### `redflag.type.sudden_onset@v2` ⚖️ (קליני)
**איפה:** S6, דגל sudden_onset (emergency).
**הערה:** L-20: הפעולה קודם, בלי תנאי. "אם כבר היה בירור" עבר לשורה השנייה, כדי שמי שחושב "כבר היינו אצל רופא" לא יוותר על השיחה. המבנה של המבקר המשפטי; הניסוח הקליני אצל הדס. "גם אם עברו כמה ימים" — כלל 3 של המנסח הקליני.
> יש להתקשר עכשיו למד"א 101, או לפנות היום לחדר מיון. שינוי חדש כזה צריך בדיקה רפואית מהירה, גם אם עברו כמה ימים.
> אם כבר היה בירור רפואי מאז שזה התחיל, ומשהו השתנה או החמיר — גם אז לפנות לבדיקה היום.
> אם אין לך אפשרות להיות שם עכשיו, אפשר להתקשר ל-101 ולמסור את הכתובת.
> העוזר הדיגיטלי לא יכול להעריך את המצב, ולכן השיחה כאן נעצרת.

##### `redflag.type.sudden_onset.self@v2` ⚖️ (קליני)
**הערה:** למבוגר שהדיבור שלו עצמו השתנה (בקשת UX). הוסרה הטענה על ערוץ כתוב של מד"א (ראו `redflag.cant_speak`).
> יש להתקשר עכשיו למד"א 101, או לפנות היום לחדר מיון. שינוי חדש כזה צריך בדיקה רפואית מהירה, גם אם עברו כמה ימים.
> אם קשה לדבר בטלפון, כדאי לבקש ממישהו שנמצא לידך להתקשר.
> אם כבר היה בירור רפואי מאז שזה התחיל, ומשהו השתנה או החמיר — גם אז לפנות לבדיקה היום.
> העוזר הדיגיטלי לא יכול להעריך את המצב, ולכן השיחה כאן נעצרת.

#### `redflag.doubt.sudden_onset@v1` ⚖️ (קליני)
**איפה:** S6, דרגת urgent, כש-`sudden_onset` עלה אצל ילד רק בגלל "לא ידוע לי" ב-screen_neuro (`doubt_message_text_id`, קליני §9: `screen_neuro.child` → `doubt_tier: urgent`).
**הערה:** בלי זה, הכותרת של דרגת urgent הייתה מוצגת מעל הודעת 101 של דרגת emergency. אצל מבוגר הספק מעלה את הדגל בדרגה א, ואז מוצג `redflag.type.sudden_onset`.
> כדאי לפנות עוד היום לרופא הילדים, או למוקד רפואי, ולספר על השינוי. כשלא ברור אם הופיע עוד משהו חדש, עדיף לבדוק.
> אם מופיעים ישנוניות חריגה, בלבול, חולשה או פרכוס: מד"א 101, מיד.

#### `redflag.type.airway@v2` ⚖️ (קליני)
**איפה:** S6, דגל airway (emergency).
**הערה:** נוסח הבסיס לא השתנה. בווריאנט `.self` הוסרה הטענה על ערוץ כתוב של מד"א.
> יש להתקשר עכשיו למד"א 101.
> קושי לנשום, נשימה רועשת או חנק צריכים עזרה רפואית מיידית. המוקדנים ינחו מה לעשות עד שתגיע עזרה.
> אם אין לך אפשרות להיות שם עכשיו, אפשר להתקשר ל-101 ולמסור את הכתובת.

##### `redflag.type.airway.self@v2` ⚖️ (קליני)
> יש להתקשר עכשיו למד"א 101.
> אם קשה לדבר, כדאי לבקש ממישהו שנמצא לידך להתקשר.
> קושי לנשום או חנק צריכים עזרה רפואית מיידית.

#### `redflag.cant_speak@v1` ⚖️ (קליני)
**איפה:** שורה נוספת בווריאנטים `.self` של דגלי החירום, למי שלא יכול לדבר בטלפון ואין לידו אף אחד (UI (ו)).
**סטטוס:** לא פעיל — מציין מקום. **לבדיקה עובדתית מול מד"א:** האם יש ערוץ פנייה כתוב (מסרון, אפליקציה, אחר), למי הוא מיועד, ואיך משתמשים בו. אם אין ערוץ כזה, הנוסח יוצא משימוש. אם יש, המשתנה מקבל את התיאור המאומת, והנוסח מקבל גרסה חדשה רק אם צריך.
**הערה:** הנוסח לא טוען שיש ערוץ כזה. כל המידע עליו נמצא במשתנה, שלא קיים עד שיאומת.
> אם אי אפשר לדבר בטלפון ואין אף אחד בסביבה: {{mda_text_channel}}

#### `redflag.cta.call@v1`
**איפה:** כפתור ראשי בדרגת emergency, קישור tel:101.
**הערה:** → תפקיד 4: המאזין הגלובלי של GA לא יעכב את הקישור (UX §6.4, SEC-05).
> חיוג ל-101

#### `redflag.cta.call.a11y@v2` ⚖️
**איפה:** `aria-label` של כפתור 101 (`redflag.cta.call`), בכל מקום שהכפתור מופיע: בלוק ראשי בחירום, וגם בלוק משני בדגל distress.
**הערה:** WCAG 2.5.3 (רמה A, `consults/round2_accessibility.md` 4ב.3): השם הנגיש חייב להכיל את הטקסט הגלוי. בגרסה 1 ("חיוג למד"א 101") המילה "למד"א" באה במקום המקף, והמחרוזת "חיוג ל-101" לא הופיעה בה, ולכן פקודת קול ("לחץ על חיוג ל-101") לא הייתה מוצאת את הכפתור. v2 **פותח בטקסט הגלוי בדיוק**, ואחריו שם הגורם. כפתור חירום, ולכן ⚖️. **הממיר בודק את זה:** כל `<מזהה>.a11y` שיש לו נוסח בסיס חייב להתחיל בו (`build_texts_json.mjs`). **→ UI:** `ui/mockup.html` מחזיק עותק של הנוסח הישן.
> חיוג ל-101, מד"א

#### `redflag.secondary.emergency@v1`
**איפה:** שורת טקסט בדרגת emergency, מתחת לכפתור 101. אין כפתור "איתור חדר מיון" בגרסה 1: `redflag.cta.er` יצא משימוש בסבב 4 (ARCHITECTURE §20).
> אפשר גם להגיע ישירות לחדר המיון הקרוב.

#### `redflag.after.emergency@v1` ⚖️
**איפה:** שורה פסיבית בדרגת emergency, לא כפתור (UX S6). אין טופס (D-04).
> אחרי בדיקה רפואית אפשר לפנות להדס: {{hadas_phone}}.

#### `redflag.type.swallowing@v2` ⚖️ (קליני)
**איפה:** S6, דגל swallowing (urgent).
> כדאי לקבוע בימים הקרובים בדיקה אצל רופא המשפחה או אצל רופא אף-אוזן-גרון. קשיים בבליעה ובאכילה צריכים קודם בירור רפואי.
> אם יש חנק או קושי לנשום: מד"א 101, מיד.

#### `redflag.type.voice_risk@v1` ⚖️ (קליני)
**איפה:** S6, דגל voice_risk (urgent).
**הערה:** "יחד עם מה שתואר כאן" — כדי לא לחזור על הסימנים ולא לרמוז על מחלה.
> כדאי לקבוע בהקדם בדיקה אצל רופא אף-אוזן-גרון, לפני כל טיפול בקול. שינוי בקול, יחד עם מה שתואר כאן, צריך קודם בדיקה רפואית.
> אם יש קושי לנשום: מד"א 101, מיד.

#### `redflag.type.child_regression@v1` ⚖️ (קליני)
**איפה:** S6, דגל child_regression (urgent).
> כדאי לפנות לרופא הילדים בימים הקרובים. כשמילים או יכולות שכבר היו מפסיקות להופיע, חשוב לבדוק את זה קודם אצל רופא.
> אם זה קרה בתוך שעות, או יחד עם ישנוניות, בלבול, חולשה או פרכוס: מד"א 101, מיד.

#### `redflag.type.sudden_hearing_loss@v1` ⚖️ (קליני)
**איפה:** S6, דגל sudden_hearing_loss (urgent, היום או מחר).
> חשוב להגיע היום או מחר לבדיקה אצל רופא אף-אוזן-גרון, או לחדר מיון. כשהשמיעה יורדת פתאום, בדיקה מהירה חשובה, ולא כדאי לחכות לשיחה עם הדס.

#### `redflag.type.adult_new_change@v1` ⚖️ (קליני)
**איפה:** S6, דגל adult_new_change (urgent).
**הערה:** כולל את השורה "אם זה הופיע פתאום — 101" (DRAFT_NOTES §6, שאלה 6).
> כדאי לפנות בקרוב לרופא המשפחה, ולספר על השינוי. שינוי חדש בדיבור, בקול או בבליעה אצל מבוגר צריך קודם בירור רפואי, ולפעמים גם הפניה לנוירולוג.
> אם השינוי הופיע או החמיר פתאום: מד"א 101 או חדר מיון, היום.

##### `redflag.type.adult_new_change.self@v1` ⚖️ (קליני)
> כדאי לפנות בקרוב לרופא המשפחה, ולספר על השינוי. שינוי חדש בדיבור, בקול או בבליעה בגיל מבוגר צריך קודם בירור רפואי, ולפעמים גם הפניה לנוירולוג.
> אם השינוי הופיע או מחמיר פתאום: מד"א 101 או חדר מיון, היום. אם קשה לדבר בטלפון, כדאי לבקש ממישהו שנמצא לידך להתקשר.

#### `redflag.after@v2` ⚖️
**איפה:** דרגת urgent בלבד, מעל `redflag.cta.form` המשני (D-04). **רק כשהמעטפה נושאת `form: secondary`.** כשהטופס חסום (`form: none`): `redflag.after.no_form`.
**הערה:** הנוסח מבטיח טופס ("אפשר גם להשאיר פרטים כבר עכשיו"), ולכן אסור להציג אותו בלי הכפתור שלו. השרת בוחר את המזהה לפי `form`, לא הממשק (UX S6, 4.1).
> אחרי הבדיקה הרפואית אפשר לחזור להדס, עם מה שנאמר בה. אפשר גם להשאיר פרטים כבר עכשיו, אבל לא לחכות לתשובה ממנה לפני הבדיקה.

#### `redflag.after.no_form@v1` ⚖️
**איפה:** S6, שורת הסגירה של בלוק `urgent` ראשי כש-`form: none` (דגל נוסף אוסר טופס, או שהדס לא אישרה טופס משני), במקום `redflag.after@v2`. אין כפתור. הטלפון כטקסט בלבד, לא קישור ולא כפתור, כדי שלא יתחרה בפעולה הרפואית (UX S6, 4.1).
**הערה:** לא מזכיר טופס: בלי "להשאיר פרטים" ובלי "כבר עכשיו". הסדר ("אחרי הבדיקה") שומר את הרעיון של v2 שהבדיקה קודמת. "לא לחכות לתשובה ממנה" הוסר בכוונה, כי בלי טופס אין תשובה שמחכים לה, והמשפט היה רומז שתגיע. דומה בכוונה ל-`redflag.after.emergency`. **פתוח לעורך הדין:** אם מותר להציג את הטלפון של הדס ליד בלוק `child_safety` (שאלה 23, D-04). זו שורה אחת בבלוק הראשי בלבד, והיא אינה מופיעה בדרגת hotline.
> אחרי הבדיקה הרפואית אפשר לפנות להדס: {{hadas_phone}}.

#### `redflag.cta.form@v1`
**איפה:** כפתור משני, רק בדרגת urgent (D-04), ורק כש-`form: secondary`.
> השארת פרטים להדס

#### `redflag.form_not_sent@v1` ⚖️
**איפה:** S6, **רק** כשהמסך מוצג אחרי 403 `form_blocked` על שליחת הטופס (למשל מלשונית ישנה, אחרי שעלה דגל שאוסר טופס). אחרי הבלוקים ולפני `redflag.footer`. לא חוסם: אפשר להסיר אם המשפטי חושב שמיותר (UX S6, 4.1). בשום כניסה אחרת למסך.
**הערה:** הפונה זה עתה לחץ "שליחה" ועלול להאמין שהפנייה יצאה. כתוב רק מה שוודאי לפי ARCHITECTURE §1.5 ו-§13.1 (בלי פנייה ובלי מייל, כלום לא מגיע להדס): "לא נשלחו". **לא** כתוב "נמחקו" או "לא נשמרו", כי זה לא נבדק מול §9.1, ולא כתוב מה לעשות בהמשך, כי הבלוק הראשי כבר נושא את הפעולה. בלי "תקלה" ובלי האשמה. "שמילאת" נייטרלי בכתב (ט2).
> הפרטים שמילאת בטופס לא נשלחו להדס.

#### `redflag.type.distress@v3` ⚖️ (קליני)
**איפה:** S6, דגל distress (hotline). גרסת הבסיס: כשמישהו קרוב אמר את הדברים (REVIEW 3.8.3), או בשיחה על ילד. אין טופס (D-04).
**הערה:** ער"ן פועל בכל שעה. שעות סה"ר לא נכתבות עד שיאומתו. **באתר:** "לא מגיע לאף אחד בזמן אמת" נכון — הכלי לא מתריע לאיש (REVIEW 3.8.5), ואסור שהפונה יחשוב שמישהו הוזעק. **בוואטסאפ** המשפט הזה לא נכון, כי ההודעות מגיעות מיד לוואטסאפ של הדס (L-07). לכן וריאנט `.wa`: אומר בכנות שהן מגיעות אליה, ושהיא לא עוקבת בזמן אמת. נוסח האתר לא השתנה.
> תודה שכתבת את זה. כשמישהו קרוב אומר דברים כאלה, אפשר להתייעץ עכשיו עם ער"ן בטלפון 1201, בכל שעה — גם עבורך וגם עבור {{subject_ref}}.
> סה"ר — תמיכה בצ'אט, בכתב: {{sahar_url}}
> במצב של סכנה מיידית: מד"א 101 או משטרה 100.
> חשוב לדעת: מה שנכתב כאן לא מגיע לאף אחד בזמן אמת.

##### `redflag.type.distress.self@v3` ⚖️ (קליני)
> תודה שכתבת את זה. אפשר לדבר עכשיו עם מישהו שמקשיב:
> ער"ן — בטלפון 1201, בכל שעה.
> סה"ר — תמיכה בצ'אט, בכתב: {{sahar_url}}
> במצב של סכנה מיידית: מד"א 101 או משטרה 100.
> חשוב לדעת: מה שנכתב כאן לא מגיע לאף אחד בזמן אמת.

##### `redflag.type.distress.wa@v3` ⚖️ (קליני)
> תודה שכתבת את זה. כשמישהו קרוב אומר דברים כאלה, אפשר להתייעץ עכשיו עם ער"ן בטלפון 1201, בכל שעה — גם עבורך וגם עבור {{subject_ref}}.
> סה"ר — תמיכה בצ'אט, בכתב: {{sahar_url}}
> במצב של סכנה מיידית: מד"א 101 או משטרה 100.
> חשוב לדעת: ההודעות כאן מגיעות גם לוואטסאפ של הדס, אבל היא לא עוקבת אחריהן בזמן אמת, וייתכן שלא תראה אותן בקרוב. לכן כדאי לפנות עכשיו לאחד המספרים שלמעלה.

##### `redflag.type.distress.wa.self@v3` ⚖️ (קליני)
> תודה שכתבת את זה. אפשר לדבר עכשיו עם מישהו שמקשיב:
> ער"ן — בטלפון 1201, בכל שעה.
> סה"ר — תמיכה בצ'אט, בכתב: {{sahar_url}}
> במצב של סכנה מיידית: מד"א 101 או משטרה 100.
> חשוב לדעת: ההודעות כאן מגיעות גם לוואטסאפ של הדס, אבל היא לא עוקבת אחריהן בזמן אמת, וייתכן שלא תראה אותן בקרוב. לכן כדאי לפנות עכשיו לאחד המספרים שלמעלה.

#### `redflag.cta.call_1201@v1`
**איפה:** כפתור ראשי בדגל distress, קישור tel:1201 (UI `rf.call_1201`). כמו כפתור 101: בלי עיכוב של GA.
**הערה:** אין לו תווית נגישות נפרדת: השם הנגיש הוא הטקסט הגלוי, ולכן 2.5.3 מתקיים. אם תתווסף אחת (`redflag.cta.call_1201.a11y`), היא חייבת להתחיל ב"חיוג לער"ן 1201" (הממיר יבדוק).
> חיוג לער"ן 1201

#### `redflag.type.child_safety@v3` ⚖️
**איפה:** S6, דגל child_safety (hotline). אין טופס (D-04).
**סטטוס:** טיוטה. לא להפעיל לפני תשובת עורך הדין על חובת דיווח (חוק העונשין, סעיף 368ד), ועל השאלה אם להציע טופס בכלל (שאלה 23). לאמת שמוקד 118 פועל בכל שעה. המערכת לא חוקרת ולא שואלת שאלות המשך.
**הערה:** נוסח האתר לא השתנה (L-02). נוסף וריאנט וואטסאפ, כמו ב-distress (L-07). בשום מקרה לא כותבים "לא נכתוב את זה בסיכום".
> תודה שכתבת את זה. כשיש חשש שילד נפגע או מוזנח, אפשר לפנות למוקד 118 של משרד הרווחה ולהתייעץ.
> אם ילד בסכנה עכשיו: משטרה 100.
> חשוב לדעת: מה שנכתב כאן לא מגיע לאף אחד בזמן אמת.

##### `redflag.type.child_safety.wa@v3` ⚖️
> תודה שכתבת את זה. כשיש חשש שילד נפגע או מוזנח, אפשר לפנות למוקד 118 של משרד הרווחה ולהתייעץ.
> אם ילד בסכנה עכשיו: משטרה 100.
> חשוב לדעת: ההודעות כאן מגיעות גם לוואטסאפ של הדס, אבל היא לא עוקבת אחריהן בזמן אמת, וייתכן שלא תראה אותן בקרוב.

#### `redflag.after.hotline@v1` ⚖️
**איפה:** מעל `redflag.cta.form` בדרגת hotline. מחליף את `redflag.after.helpline` (אותו טקסט).
**סטטוס:** לא פעיל — לפי D-04 אין טופס בדרגת hotline. נשמר אם הדס או עורך הדין יחליטו אחרת.
> אם בהמשך תרצו עזרה גם בנושא הדיבור, אפשר להשאיר פרטים להדס. זה לא תנאי לשום דבר.

#### `nav.back_to_site@v1`
**איפה:** חזרה לאתר מ-S6, S8, S9 ו-S13 (UX rf.back_to_site, confirm.back_to_site).
> חזרה לאתר

---

## 12. שגיאות, המתנה ונפילה

#### `error.generic@v1`
**איפה:** תקלה כללית, אפשר לנסות שוב (UX chat.error.server).
> משהו השתבש, וההודעה לא נשלחה. אפשר לנסות שוב.

#### `error.retry.button@v1`
**איפה:** כפתור ניסיון חוזר.
> לנסות שוב

#### `error.timeout@v1`
**איפה:** אחרי 25 שניות בלי תשובה.
> התשובה מתעכבת. אפשר לחכות עוד רגע, או לנסות שוב.

#### `error.network@v1`
**איפה:** פס "אין חיבור" (UX chat.error.offline).
> נראה שהחיבור לאינטרנט נקטע. כשהחיבור יחזור, אפשר לנסות שוב.

#### `error.rate_limit@v2`
**איפה:** הגבלת קצב. השליחה חסומה, ולכן 101.
> נשלחו הרבה הודעות בזמן קצר. אפשר להמשיך בעוד דקה. במצב חירום: מד"א 101.

#### `error.session_expired@v3` ⚖️
**איפה:** תוקף השיחה פג — גם UX resume.expired (S2) וגם chat.error.session_expired.
**הערה:** D-01: בתום החלון התוכן נמחק, ולכן אומרים את זה.
> השיחה נסגרה ונמחקה אחרי זמן ללא פעילות, ואי אפשר להמשיך אותה. אפשר להתחיל שיחה חדשה.

#### `error.delete_failed@v2` ⚖️
**איפה:** S9, כשבקשת המחיקה נכשלה (UX). עם `error.retry.button`.
**הערה:** נכון לפי D-01 ו-ARCHITECTURE §9.1: גם בלי מחיקה, התוכן נמחק בתום החלון, בקריאה אחרי `expires_at` או בניקוי השעתי (קוד `purge_failed`). לכן "תוך כ-24 שעות", ולא "לכל המאוחר 24" (SEC-01(4): 24 מול כ-25 שעות). המשך כתוב כאן במילים (אחד משלושה חריגים, ראו מוסכמות), ולכן משתנה יחד עם `deletion_clause`. בלי "לא הצלחנו" (VOICE 1.4). v2: סבב 4.
> המחיקה לא הצליחה כרגע. אפשר לנסות שוב. גם בלי זה, השיחה תימחק מעצמה תוך כ-24 שעות מההודעה האחרונה.

#### `system.unavailable@v1` ⚖️
**איפה:** מסך S10: השרת או ספק המודל לא זמינים, או שתקרת העלות נוצלה. השם נדרש על ידי המנוע.
**הערה:** זה גם הנוסח הסטטי היחיד בבאנדל של ה-Frontend (ARCHITECTURE §10.8), ולכן הטלפון כתוב
דרך משתנה שמוטמע בזמן build.
> העוזר הדיגיטלי לא זמין כרגע. אפשר לפנות להדס ישירות: בטלפון {{hadas_phone}}, בוואטסאפ, או בטופס יצירת הקשר באתר. במצב חירום: מד"א 101.

#### `system.model_free@v1` ⚖️
**איפה:** בועה קבועה כשהשיחה במצב `degraded` (בלי מודל: ספק המודל למטה, תקרת עלות או תקציב הכתובת, D-09) והפונה שלח טקסט חופשי. אחריה מוצג המסך הבא בכפתורים (ARCHITECTURE §5.4, §10.3). 101 חובה.
**הערה:** אומר מה המצב, בלי הבטחות: לא "ההודעה תיקרא", לא "תגיע להדס" ולא "לא נשמרה", כי בדיקת הדגלים (regex) רצה על כל הודעה והשמירה תלויה במצב. לא מזכיר עלות, תקרה או ספק. בלי "תקלה" ובלי האשמה. "רק" נכון: במצב הזה ממשיכים בכפתורים בלבד.
> כרגע העוזר הדיגיטלי לא יכול לעבד הודעות כתובות, ואפשר להמשיך רק בבחירה מהאפשרויות שמוצגות. במצב חירום: מד"א 101.

#### `fallback.title@v1`
**איפה:** כותרת S10.
> העוזר הדיגיטלי לא זמין כרגע

#### `fallback.static@v1` ⚖️
**איפה:** S10, וריאציה ד (UX): הבלוק הסטטי ב-`#root` של `intake/index.html`, שנוצר בזמן build. מוצג כש-JavaScript לא רץ, וגם בכל טעינה רגילה עד ש-React עולה (ARCHITECTURE §8.4.4). בבלוק יש גם כפתורי `tel:101` ו-`fallback.phone` / `fallback.whatsapp`.
**הערה:** הניסוח תנאי ("אם העוזר לא נפתח כאן") ולא קביעה, כדי שיהיה נכון בשני המצבים: הורה שרואה אותו לרגע בטעינה תקינה לא נבהל, והורה שהכלי לא עלה אצלו מקבל את הדרכים לפנות. בלי "לא זמין כרגע" (זה `fallback.title`, ל-`<noscript>`). טקסט רגיל בלבד, בלי קישורי `[תווית](url)` ובלי חלקים אינטראקטיביים: הוא חייב לעבוד בלי JS, והקישורים הם הכפתורים שבבלוק. הטלפון והקישור לוואטסאפ משתנים שמוטמעים בזמן build, כמו ב-`system.unavailable`. בלי טופס, כי בלי JS הוא לא קיים. 101 חובה.
> אם העוזר הדיגיטלי לא נפתח כאן, אפשר לפנות להדס ישירות: בטלפון {{hadas_phone}}, או בוואטסאפ: {{hadas_whatsapp_link}}
> במצב חירום: מד"א 101.

#### `fallback.saved@v2` ⚖️
**איפה:** S10, וריאציית "ספק המודל למטה, השרת עובד" בלבד (UX), שבה זה נכון טכנית.
**הערה:** D-01: "שמור" בלי גבול זמן לא היה מדויק.
> מה שסופר עד עכשיו שמור. {{expiry_clause}}

#### `fallback.whatsapp@v1`
**איפה:** כפתור ב-S10.
> וואטסאפ להדס

#### `fallback.phone@v1`
**איפה:** כפתור ב-S10.
> שיחת טלפון

#### `fallback.contact@v1`
**איפה:** כפתור ב-S10.
> טופס יצירת קשר

#### `fallback.whatsapp_prefill@v1`
**איפה:** הטקסט שממולא מראש בקישור הוואטסאפ.
**הערה:** כללי בלבד, בלי תוכן מהשיחה (מידע רפואי לא נכנס ל-URL). בשלב 2 הבוט יענה עליו ב-wa.opening.
> שלום, הגעתי מהאתר ואשמח לשוחח על פנייה.

---

## 13. טופס המסירה ואישור

#### `form.title@v1`
**איפה:** כותרת S7.
> השארת פרטים להדס

#### `form.intro@v1`
**איפה:** S7.
> הדס תקרא את הסיכום ותחזור בטלפון.

#### `form.partial_note@v1`
**איפה:** S7, תיק חלקי אחרי יציאה מוקדמת.
> הפנייה תישלח עם מה שסופר עד עכשיו. חלק מהפרטים עוד לא נאספו, והדס תשאל עליהם בשיחה.

#### `form.preview.title@v1`
**איפה:** S7, התצוגה המקדימה.
> מה יישלח להדס

#### `form.preview.fix@v1`
**איפה:** S7, קישור מתוך התצוגה המקדימה.
> משהו לא מדויק? חזרה לשיחה

#### `form.preview.row.who@v1`
**איפה:** S7, תצוגה מקדימה: תווית השורה "מי פונה" (UX, UI).
> מי פונה

#### `form.preview.row.about@v1`
**איפה:** S7, תצוגה מקדימה: על מי השיחה.
> על מי השיחה

#### `form.preview.row.age@v1`
**איפה:** S7, תצוגה מקדימה: גיל.
> גיל

#### `form.preview.row.topic@v1`
**איפה:** S7, תצוגה מקדימה: הנושא. הערך הוא `recap_label_he` של `domain` (§8.7), לא שם קליני.
> הנושא

#### `form.preview.row.facts@v1`
**איפה:** S7, תצוגה מקדימה: העובדות המרכזיות, כציטוטים.
> עיקרי הדברים, במילים שלך

#### `form.name.label@v2` ⚖️
**איפה:** S7, שדה השם — של הפונה, לא של הילד (UX S7). מזעור מידע.
> השם שלך (אפשר שם פרטי בלבד)

#### `form.phone.label@v1`
**איפה:** S7, שדה הטלפון.
> טלפון

#### `form.phone.hint@v1`
**איפה:** S7, רמז לשדה הטלפון.
> כדי שהדס תחזור אליך

#### `form.best_time.label@v1`
**איפה:** S7, שדה רשות — רק אם אליה והדס יאשרו.
> מתי נוח שהדס תתקשר? (לא חובה)

#### `form.best_time.morning@v1`
**איפה:** כפתור ב-form.best_time.
> בוקר

#### `form.best_time.noon@v1`
**איפה:** כפתור ב-form.best_time.
> צהריים

#### `form.best_time.evening@v1`
**איפה:** כפתור ב-form.best_time.
> ערב

#### `form.channel_pref.label@v1`
**איפה:** S7, שדה רשות — רק אם יאושר.
> איך נוח שהדס תחזור? (לא חובה)

#### `form.channel_pref.call@v1`
**איפה:** כפתור ב-form.channel_pref.
> שיחת טלפון

#### `form.channel_pref.whatsapp@v1`
**איפה:** כפתור ב-form.channel_pref.
> וואטסאפ

#### `form.consent.checkbox@v3` ⚖️
**איפה:** S7, תיבת הסכמה למסירה (נפרדת מההסכמה בפתיחה).
**הערה:** הנוסח של המבקר המשפטי (§2.1), מותאם ל-D-01: עם השליחה תוכן השיחה נמחק בשרת, והפנייה נשמרת אצל הדס (UX S8).
> הסכמה לשליחת סיכום השיחה ופרטי הקשר להדס תודה, כדי שתחזור לגבי הפנייה. {{transcript_clause}} אחרי השליחה תוכן השיחה נמחק, והפנייה נשמרת אצל הדס.

#### `form.privacy_note@v2` ⚖️
**איפה:** S7, מתחת לתיבת ההסכמה.
**הערה:** L-11: בלי "רק" על השימוש, כי יש גם משוב ומדדים. ה"רק" שנשאר הוא על השמירה, ונבדק מול ARCHITECTURE §11.1: פרטי הקשר והסיכום נשמרים עד שהמסירה הצליחה (לכל היותר 7 ימים), ואחר כך נשארים רק ערכים בלי פרטי קשר. במקום `{{lead_retention}}` של המבקר המשפטי, כי זו ההתנהגות בפועל.
> הפרטים ישמשו כדי שהדס תחזור לגבי הפנייה, וכדי לבדוק ולשפר את הדיוק של העוזר הדיגיטלי. במערכת הם נשמרים רק עד שהפנייה מגיעה להדס, ולכל היותר 7 ימים. [מדיניות הפרטיות]({{privacy_url}})

#### `form.submit@v1`
**איפה:** כפתור השליחה ב-S7.
> שליחה להדס

#### `form.sending@v1`
**איפה:** מצב טעינה של כפתור השליחה.
> בשליחה…

#### `form.validation.name_missing@v1`
**איפה:** שגיאת שדה.
> נא לכתוב שם

#### `form.validation.phone_missing@v1`
**איפה:** שגיאת שדה.
> נא לכתוב מספר טלפון

#### `form.validation.phone_format@v1`
**איפה:** שגיאת שדה. בלי "תקין" (VOICE 4.11).
> מספר הטלפון לא נקלט. אפשר לבדוק שיש בו 9 או 10 ספרות.

#### `form.validation.consent_missing@v1`
**איפה:** שגיאת שדה.
> כדי לשלוח, יש לסמן את תיבת ההסכמה.

#### `form.errors_summary@v1`
**איפה:** תקציר שגיאות לקורא מסך בראש הטופס.
> שדות לתיקון: {{error_count}}

#### `error.form_send@v1`
**איפה:** כשל שליחת הטופס. הפרטים לא נמחקים.
> הפרטים לא נשלחו בגלל תקלה. אפשר לנסות שוב, או להתקשר להדס: {{hadas_phone}}.

#### `error.form_send_repeat@v1`
**איפה:** כשל שני בשליחת הטופס (UX form.error.fallback).
> גם הפעם הפרטים לא נשלחו. אפשר לפנות להדס ישירות, בוואטסאפ או בטלפון {{hadas_phone}}. במצב חירום: מד"א 101.

#### `form.confirmation.title@v1`
**איפה:** כותרת S8, כשהמסירה הצליחה (`handoff_result.delivery = delivered`). כש-`delivery = pending`: `form.confirmation.title.pending`.
> הפרטים נשלחו להדס

#### `form.confirmation.title.pending@v1` ⚖️
**איפה:** כותרת S8, במקום `form.confirmation.title`, כש-`handoff_result.delivery = pending`: המייל לא נשלח בתוך הבקשה, וניסיונות חוזרים כל שעה (ARCHITECTURE §13.1).
**הערה:** "בדרך" ולא "נשלחו", וגם לא "התקבלו", שנקרא כאילו הדס כבר קיבלה. **נסגר (UX 4.1):** `form.confirmation.what_now` ו-`form.confirmation.when` מניחים שהמסירה קרתה, ולכן במצב pending הם מוחלפים ב-`form.confirmation.what_now.pending` וב-`form.confirmation.when.pending`. שלושת הנוסחים מוצגים יחד.
> הפרטים בדרך להדס

#### `form.confirmation.redflag_reminder@v1` ⚖️
**איפה:** S8, רק אחרי טופס ממסך דגל אדום (דרגת urgent, D-04). לפני "מה קורה עכשיו".
> לפני הכול: הבדיקה הרפואית שהוזכרה עדיין חשובה. לא לחכות לשיחה עם הדס כדי לקבוע אותה.

#### `form.confirmation.what_now@v1`
**איפה:** S8, כשהמסירה הצליחה (`handoff_result.delivery = delivered`). כש-`delivery = pending`: `form.confirmation.what_now.pending`.
> הדס תקרא את הסיכום ותחזור אליך בעצמה. מכאן ממשיכים עם הדס, לא עם העוזר הדיגיטלי.

#### `form.confirmation.what_now.pending@v1` ⚖️
**איפה:** S8, במקום `form.confirmation.what_now`, כש-`handoff_result.delivery = pending` (גם כש-`content_deleted = false`): המייל לא נשלח בתוך הבקשה, וניסיונות חוזרים כל שעה עד 7 ימים (ARCHITECTURE §13.1). מוצג עם `form.confirmation.title.pending` ו-`form.confirmation.when.pending` (UX S8, 4.1).
**הערה:** ההעברה לא הושלמה, ולכן בלי "נשלח", "התקבל", "הגיע" ו"תקלה" (בלי האשמה). "כשהסיכום יגיע אליה" מעגן את הקריאה להגעה, ואינו הבטחה שתהיה: אם המסירה נתקעת, ההגנה היא `form.confirmation.fallback`, שנשארת ותמיד מוצגת. בלי הבטחת זמן ("בתוך שעה", "היום"), כי אין דרך לדעת מתי הניסיון יצליח. "והמערכת ממשיכה לנסות" אומר רק שהניסיונות נמשכים, לא שיצליחו. נשמר "מכאן ממשיכים עם הדס" מהנוסח הרגיל. בלי סמל הצלחה במסך (UX). 24 מילים (תקרה 30).
> ההעברה להדס עוד לא הושלמה, והמערכת ממשיכה לנסות. כשהסיכום יגיע אליה, הדס תקרא ותחזור אליך בעצמה. מכאן ממשיכים עם הדס, לא עם העוזר הדיגיטלי.

#### `form.confirmation.when@v2` (עובדה)
**איפה:** S8, כשהמסירה הצליחה. כש-`delivery = pending`: `form.confirmation.when.pending`.
**הערה:** משפט ה"אם לא חזרו" עבר ל-`form.confirmation.fallback` (ARCHITECTURE §13.2). `response_time` צריך להיות מודע לשבת ולחג ("עד סוף יום העבודה הבא"); בחופשה המנוע מציב `response_time_away`.
> הדס חוזרת בדרך כלל {{response_time}}.

#### `form.confirmation.when.pending@v1` (עובדה)
**איפה:** S8, במקום `form.confirmation.when`, כש-`handoff_result.delivery = pending` (גם כש-`content_deleted = false`). מוצג אחרי `form.confirmation.what_now.pending` ולפני `form.confirmation.fallback` (UX S8, 4.1).
**הערה:** הזמן מתחיל ברגע שהסיכום מגיע להדס ולא ברגע הלחיצה, ואין בנוסח הבטחה שהוא כבר הגיע. אותו `{{response_time}}` מדף העובדות, כולל המודעות לשבת ולחג. **נבדק (UX: "לבדוק שגם `response_time_away` נקרא נכון"):** הערך נכנס אחרי "בדרך כלל" בכל אחד משני המקרים, ומשפט העיגון בא לפניו ולא משנה את צורתו, לכן הוא נקרא נכון עם "תוך יום עבודה", עם "עד סוף יום העבודה הבא", ועם ערך חופשה באותה צורה (למשל "מיום ראשון"). **לאמת מול הערך האמיתי של `response_time_away` כשיוזן בדף העובדות.** גבול הזמן העליון של הפונה נשאר `form.confirmation.fallback` ("עד {{followup_time}}"), והוא נשאר כמו שהוא. 8 מילים קבועות ועוד הערך (תקרה 20).
> אחרי שהסיכום יגיע אליה, הדס חוזרת בדרך כלל {{response_time}}.

#### `form.confirmation.from_number@v1` (עובדה)
**איפה:** S8.
> השיחה תגיע מהמספר {{callback_number}}. כדאי לשמור אותו, כדי לזהות את השיחה.

#### `form.confirmation.who@v1`
**איפה:** S8, רק במקרה של "מבוגר אחר".
> הדס תחזור אליך, למספר שנמסר כאן, ולא ישירות אל {{subject_ref}}.

#### `form.confirmation.disclaimer@v1` ⚖️
**איפה:** S8.
> הסיכום שנשלח נוצר אוטומטית, ואינו הערכה מקצועית. אם בינתיים מופיע קושי פתאומי בדיבור, בהבנה או בבליעה — לא לחכות: מד"א 101.

#### `form.confirmation.fallback@v1` (עובדה)
**איפה:** S8, אחרי `form.confirmation.when` (ARCHITECTURE §13.2): הפונה הוא הגיבוי לכשל מסירה או למייל שנפל לספאם.
**הערה:** בלי "חזרנו" ו"לנו" של נוסח העבודה, כי הבוט לא מדבר בשם הדס (VOICE 1.4).
> אם לא חזרו אליך עד {{followup_time}}, ייתכן שהפנייה לא הגיעה. אפשר לכתוב להדס בוואטסאפ: {{hadas_whatsapp_link}}, או להתקשר: {{hadas_phone}}.

#### `form.confirmation.add_later@v1`
**איפה:** S8. אין "שכחתי לספר" אחרי שליחה (UX S8).
> נזכרת במשהו? אפשר לכתוב להדס ישירות, בוואטסאפ או בטלפון {{hadas_phone}}.

#### `form.confirmation.privacy@v2` ⚖️
**איפה:** S8.
**הערה:** D-01 ו-UX S8: עם אישור המסירה תוכן השיחה נמחק בשרת. מה שנשלח נמצא אצל הדס. במערכת פרטי הקשר והסיכום נמחקים אחרי שהמסירה הצליחה (ARCHITECTURE §11.1), ולכן אין כאן "נשמר במערכת".
> תוכן השיחה נמחק, מהמכשיר ומהשרת. הסיכום ופרטי הקשר נשלחו להדס, ונשמרים אצלה.

#### `form.confirmation.privacy.pending@v2` ⚖️
**איפה:** S8, במקום `form.confirmation.privacy`, כש-`handoff_result.delivery = pending` ו-`content_deleted = true`: המייל לא נשלח בתוך הבקשה, וניסיונות חוזרים כל שעה (ARCHITECTURE §13.1, L-04). תוכן השיחה כבר נמחק.
**הערה:** נכון לפי §9.1 ו-§11.1: פרטי הקשר והסיכום נשמרים במערכת עד שהמסירה מצליחה, ונמחקים לכל המאוחר אחרי 7 ימים של ניסיונות, ועוד עד שעה של הניקוי השעתי. לכן "תוך כשבוע" ולא "לכל היותר 7 ימים" (v2: הניסוח הקודם יכול היה לחרוג בשעה). כתוב במילים (חריג, ראו מוסכמות). לא כתוב "נשלחו", כי עוד לא. הכותרת במצב הזה: `form.confirmation.title.pending`.
> תוכן השיחה נמחק, מהמכשיר ומהשרת. הסיכום ופרטי הקשר נשלחים להדס. עד שיגיעו אליה, הם נשמרים במערכת, ובכל מקרה נמחקים תוך כשבוע.

#### `form.confirmation.privacy.delete_pending@v1` ⚖️
**איפה:** S8, במקום `form.confirmation.privacy`, כש-`handoff_result.content_deleted = false` ו-`delivery = delivered`: מחיקת התוכן נכשלה אחרי שני ניסיונות, והניקוי השעתי מוחק לפי `session_purged_at` (ARCHITECTURE §13.1, L-04).
**הערה:** לא כתוב "נמחק", כי עוד לא. "כשעה" (ולא "שעה"): הניקוי רץ אחת לשעה, וייתכן עיכוב קטן. כתוב במילים (חריג, ראו מוסכמות). אם גם המסירה ממתינה: `form.confirmation.privacy.both_pending`.
> תוכן השיחה יימחק מהשרת תוך כשעה. הסיכום ופרטי הקשר נשלחו להדס, ונשמרים אצלה.

#### `form.confirmation.privacy.both_pending@v1` ⚖️
**איפה:** S8, במקום `form.confirmation.privacy`, כש-`handoff_result.delivery = pending` **וגם** `content_deleted = false`: המייל עוד לא נשלח, ומחיקת התוכן נכשלה. שני הנוסחים הקיימים (`.pending`, `.delete_pending`) לא נכונים כאן.
**הערה:** שני משפטי הזמן מההערות שלהם: "כשעה" (ניקוי שעתי) ו"כשבוע" (7 ימים ועוד עד שעה). לא כתוב "נמחק" ולא "נשלחו", כי אף אחד מהם עוד לא קרה. כותרת: `form.confirmation.title.pending`. כתוב במילים (חריג, ראו מוסכמות).
> תוכן השיחה יימחק מהשרת תוך כשעה. הסיכום ופרטי הקשר נשלחים להדס. עד שיגיעו אליה, הם נשמרים במערכת, ובכל מקרה נמחקים תוך כשבוע.

---

## 14. הצד של הדס

נוסחים שמופנים להדס עצמה. היא הסמכות הקלינית, ולכן בכפתורי המשוב שלה מותרת לשון של הערכה
מקצועית. סריקת המילים האסורות מחריגה את `hadas.*` ואת `hadas_summary.*` לפי מזהה.

#### `hadas_summary.header@v1` ⚖️
**איפה:** השורה הראשונה בגוף המייל, מילה במילה לפי GOALS (UX hadas.email.disclaimer).
> סיכום אוטומטי של דברי הפונה, לא הערכה מקצועית.

#### `hadas_summary.detail@v1` ⚖️
**איפה:** מתחת לשורה הראשונה במייל.
> הסיכום נוצר על ידי מערכת אוטומטית מתוך מה שנכתב בשיחה, וייתכנו בו טעויות והשמטות. ציטוטים מובאים כלשונם. פרטים שלא נשאלו או לא נענו מסומנים "לא עלה בשיחה". הכיוון שהוצג לפונה נקבע לפי טבלת ההחלטה, ואינו מחליף שיקול דעת מקצועי.

#### `hadas_summary.outcome_label@v1` ⚖️
**איפה:** שורת התוצאה במייל.
> הכיוון שהוצג לפונה: {{outcome_label}} (נוסח {{outcome_text_version}})

#### `hadas_summary.consent_record@v1` ⚖️
**איפה:** שוליים טכניים במייל.
> אישור תנאים: {{consent_time}} · נוסח הסתייגות {{disclaimer_version}}

#### `hadas_summary.redflag_banner@v1` ⚖️
**איפה:** באנר בראש מייל שנשלח אחרי דגל אדום.
> לתשומת לב: בשיחה עלה דגל אדום ({{redflag_type}}). לפונה הוצגה הודעה {{redflag_text_id}}.

#### `hadas_summary.not_mentioned@v1`
**איפה:** ערך לפרט שלא עלה.
> לא עלה בשיחה

#### `hadas_summary.unknown@v1`
**איפה:** ערך לפרט שהפונה ענה עליו "לא ידוע".
> סומן כלא ידוע לפונה

#### `hadas_summary.faq_missing_label@v1`
**איפה:** כותרת לשאלות בלי מידע.
> שאלות שהעוזר לא ידע לענות עליהן:

#### `hadas.email.subject@v1`
**איפה:** שורת הנושא. בלי תחום ובלי גיל — מוצגת במסך נעול (UX §5.2).
> [שיחת היכרות] פנייה חדשה · תוצאה {{outcome_number}} · {{received_at}}

#### `hadas.email.subject_redflag@v1`
**איפה:** שורת הנושא אחרי דגל אדום (דרגת urgent, D-04).
**הערה:** → הדס מכריעה: המבקר המשפטי מציע "[לתשומת לב]" במקום "[דגל אדום]", בגלל המסך הנעול (L-23). מבקר האבטחה מאשר את "[דגל אדום]" (תשובה 2.2.4). שינוי יעלה גרסה.
> [שיחת היכרות] [דגל אדום] פנייה חדשה · {{received_at}}

#### `hadas.email.btn.call@v1`
**איפה:** כפתור ליד הטלפון בראש המייל (UX §5.2). קישור tel.
> חיוג

#### `hadas.email.btn.wa@v1`
**איפה:** כפתור ליד הטלפון בראש המייל. קישור וואטסאפ, בלי טקסט ממולא.
> וואטסאפ

#### `hadas.email.section.received@v1`
**איפה:** שורה בראש המייל (UX §5.2).
> התקבל: {{received_at}} · נקודת כניסה: {{entry_point}}

#### `hadas.email.section.contact@v1`
**איפה:** כותרת מקטע במייל.
> פרטי קשר

#### `hadas.email.section.who@v1`
**איפה:** כותרת מקטע במייל.
> מי פונה ועל מי

#### `hadas.email.section.age@v1`
**איפה:** כותרת שורה במייל (UX §5.2).
> גיל המושא

#### `hadas.email.section.topic@v1`
**איפה:** כותרת שורה במייל. הערך הוא התחום שהמחלץ הסיק ושהפונה אישר.
> תחום (כפי שעלה מדברי הפונה)

#### `hadas.email.section.outcome@v1`
**איפה:** כותרת מקטע במייל.
> תוצאת המערכת

#### `hadas.email.section.reason@v1`
**איפה:** כותרת מקטע במייל.
> למה

#### `hadas.email.section.facts@v1`
**איפה:** כותרת מקטע במייל. כל טקסט של הפונה מופיע בבלוק מתוחם של ציטוט (SEC-17).
> עובדות מרכזיות (במילים של הפונה)

#### `hadas.email.section.more@v1`
**איפה:** כותרת מקטע במייל.
> עוד דברים שסופרו

#### `hadas.email.section.warm_summary@v1`
**איפה:** כותרת הבלוק המתוחם של הסיכום החם שהמודל כתב לפונה (SEC-17 (6), UX §5.2). מפריד ניסוח של מכונה מדברי הפונה.
> הסיכום החם כפי שהוצג לפונה (ניסוח אוטומטי)

#### `hadas.email.section.unknown@v1`
**איפה:** כותרת מקטע במייל.
> לא ידוע או לא נאמר

#### `hadas.email.section.conflicts@v1`
**איפה:** כותרת מקטע במייל.
> לבדיקה

#### `hadas.email.section.faq@v1`
**איפה:** כותרת מקטע במייל.
> שאלות בדרך

#### `hadas.email.section.tags@v1`
**איפה:** כותרת מקטע במייל.
> תגיות

#### `hadas.email.section.meta@v1`
**איפה:** כותרת מקטע במייל.
> פרטים טכניים

#### `hadas.email.tag.outcome3_anyway@v1`
**איפה:** תגית במייל.
**סטטוס:** לא פעיל — תוצאה 3 כבויה בהשקה (D-03).
> פנייה למרות תוצאה 3

#### `hadas.email.tag.early_handoff@v1`
**איפה:** תגית במייל.
> יציאה מוקדמת, תיק חלקי

#### `hadas.email.tag.added_after@v1`
**איפה:** תגית במייל.
> חזרה לשיחה אחרי התוצאה

#### `hadas.email.tag.redflag@v1`
**איפה:** תגית במייל.
> דגל אדום

#### `hadas.email.tag.document_request@v1`
**איפה:** תגית במייל, כשהפונה ביקש מסמך או חוות דעת לגורם חיצוני (`meta.document_request`, L-15).
> ביקש מסמך לגורם חיצוני

#### `hadas.email.tag.summary_unavailable@v1`
**איפה:** תגית במייל (UX §5.2), כשהסיכום החם לא נוצר או נפסל בבדיקת הפלט.
> הסיכום החם לא זמין

#### `hadas.email.outcome.1@v1`
**איפה:** שם התוצאה במייל.
> בתחום · מומלץ לפנות

#### `hadas.email.outcome.2@v1`
**איפה:** שם התוצאה במייל.
> בתחום · שווה התייעצות

#### `hadas.email.outcome.3@v1`
**איפה:** שם התוצאה במייל.
**סטטוס:** לא פעיל — תוצאה 3 כבויה בהשקה (D-03).
> לא עלו סימנים כעת

#### `hadas.email.outcome.4@v1`
**איפה:** שם התוצאה במייל.
> לא בתחום · הופנה

#### `hadas.email.outcome.5@v1`
**איפה:** שם התוצאה במייל.
> דגל אדום

#### `hadas.email.feedback.question@v1`
**איפה:** הסימון המהיר במייל הפנייה, רגע א (UX §5.3). אופציונלי, בלי שאלות המשך.
> סימון מהיר (לא חובה):

#### `hadas.email.feedback.relevant_accurate@v1`
**איפה:** כפתור ברגע א (`triage=relevant`, `summary_rating=accurate_useful`).
> רלוונטית · הסיכום מדויק

#### `hadas.email.feedback.relevant_inaccurate@v1`
**איפה:** כפתור ברגע א (`triage=relevant`, `summary_rating=inaccurate`).
> רלוונטית · הסיכום לא מדויק

#### `hadas.email.feedback.not_relevant@v1`
**איפה:** כפתור ברגע א (`triage=not_relevant`).
> לא רלוונטית

#### `hadas.email.judgment.question@v1`
**איפה:** רגע ב — ההערכה אחרי שיחה ראשונה, **בעמוד שנפתח מהמייל החודשי** (UX §5.3). הכפתורים ממופים 1:1 לתוצאות.
> אחרי השיחה הראשונה — מה ההערכה שלך?

#### `hadas.email.judgment.o1@v1`
**איפה:** כפתור ברגע ב ↔ תוצאה 1.
> מתאים לטיפול או הערכה אצלי

#### `hadas.email.judgment.o2@v1`
**איפה:** כפתור ברגע ב ↔ תוצאה 2.
> התייעצות הייתה במקום

#### `hadas.email.judgment.o3@v1`
**איפה:** כפתור ברגע ב ↔ תוצאה 3. **נשאר פעיל** גם כשתוצאה 3 כבויה: זו ההערכה של הדס, והיא ממלאת את שורת `would_be_outcome_3` במטריצה.
> לא נדרש כרגע

#### `hadas.email.judgment.o4@v1`
**איפה:** כפתור ברגע ב ↔ תוצאה 4.
> לא בתחומי, הפניתי

#### `hadas.email.judgment.o5@v1`
**איפה:** כפתור ברגע ב ↔ תוצאה 5.
> נדרשה הפניה דחופה

#### `hadas.email.judgment.none@v1`
**איפה:** כפתור ברגע ב.
> לא התקיימה שיחה

#### `hadas.monthly.subject@v1`
**איפה:** נושא המייל החודשי (UX §5.5). במקום התזכורות והסיכום השבועי. בלי פרטים מזהים (מסך נעול).
> שיחת היכרות · סיכום חודשי · {{month_label}}

#### `hadas.monthly.counts@v1`
**איפה:** שורת המספרים במייל החודשי, בלי תוכן (UX §5.5).
> שיחות: {{conversations_count}} · פניות: {{leads_count}} · הפניות למקום אחר: {{referrals_count}} · דגלים אדומים: {{redflags_count}} · מסלולי ביניים: {{interim_count}}

#### `hadas.monthly.list_intro@v1`
**איפה:** מעל רשימת הפניות שעוד לא סומנו.
> פניות החודש שעוד לא סומנו. כל שורה פותחת עמוד קצר לסימון ההערכה אחרי השיחה הראשונה:

#### `hadas.monthly.row@v1`
**איפה:** שורה לכל פנייה ברשימה, וקישור לעמוד הקל עם רגע ב (וגם רגע א אם לא סומן).
**הערה:** בלי השם הפרטי (הארכיטקט ביטל את `lead_first_name`). `lead_ref` הוא המזהה הקצר שמופיע בשולי מייל הפנייה, כך שהדס יכולה לחפש אותו ב-Gmail. אליה רואה רק מזהה וערכים (L-26).
> {{lead_ref}} · {{received_at}} · {{outcome_label}}

#### `hadas.monthly.empty@v1`
**איפה:** במקום הרשימה, כשאין פניות שממתינות לסימון.
> אין החודש פניות שממתינות לסימון.

#### `hadas.page.confirm@v1`
**איפה:** העמוד הקל.
> אישור

#### `hadas.page.done@v1`
**איפה:** העמוד הקל.
> נרשם

#### `hadas.page.change@v1`
**איפה:** העמוד הקל.
> שינוי

#### `hadas.page.expired@v1`
**איפה:** העמוד הקל, קישור שפג.
> הקישור הזה כבר לא בתוקף. אפשר לסמן מהמייל האחרון.

---

## 15. וואטסאפ (שלב 2)

באותו מספר כותבים גם הדס וגם הבוט. נוסחי התוצאות, הדגל האדום והשאלות הנפוצות זהים לאתר.

#### `wa.prefix@v2` ⚖️
**איפה:** בתחילת כל הודעה של הבוט.
> **העוזר הדיגיטלי:**

#### `wa.opening@v3` ⚖️
**איפה:** ההודעה הראשונה למספר חדש.
**הערה:** L-17 ו-SEC-16: אותם רכיבי פרטיות כמו באתר — ספק ה-AI, השמירה, הגיל וההורה. "הסבר מלא" במקום "תנאים", כי אין מסמך תנאים. הנוסח של המבקר המשפטי, ועוד `wa_retention_clause`.
> **העוזר הדיגיטלי של הדס תודה**
> שלום וברכה. זו הודעה אוטומטית: כאן עוזר דיגיטלי (בינה מלאכותית) שעונה במספר של הדס תודה, קלינאית תקשורת. זו לא הדס עצמה.
> אפשר לספר כאן, בכמה שאלות קצרות, מה מעסיק. הדס תקבל סיכום מסודר ותמשיך מכאן בעצמה.
> - זה לא אבחון ולא ייעוץ מקצועי.
> - הדס רואה את כל מה שנכתב בשיחה הזו. ההודעות מעובדות גם אצל ספק שירות בינה מלאכותית. {{ai_provider_clause}} {{wa_retention_clause}}
> - השיחה מיועדת לגיל 18 ומעלה, ושיחה על ילד — להורה או לאפוטרופוס.
> - במצב חירום: מד"א 101.
>
> הסבר מלא ופרטיות: {{privacy_url}}
> להמשיך?

#### `wa.opening.btn.accept@v1`
**איפה:** כפתור תשובה (עד 20 תווים).
> אישור והמשך

#### `wa.opening.btn.message_only@v1`
**איפה:** כפתור תשובה (עד 20 תווים).
> רק להשאיר הודעה

#### `wa.opening.fallback@v2`
**איפה:** כשהכפתורים לא מוצגים.
**הערה:** נוסף 101 (ARCHITECTURE §1.9: כל `wa.*` שהוא תשובה לפונה).
> אפשר להשיב 1 כדי להמשיך, או 2 כדי רק להשאיר הודעה להדס. במצב חירום: מד"א 101.

#### `wa.no_consent_reply@v2`
**איפה:** הפונה כתב תוכן בלי לאשר.
**הערה:** נוסף 101. "ההסבר" במקום "התנאים" (L-09).
> לפני שממשיכים צריך אישור להסבר שלמעלה. אפשר להשיב 1 כדי להמשיך, או 2 כדי רק להשאיר הודעה להדס. במצב חירום: מד"א 101.

#### `wa.message_only@v2` ⚖️
**איפה:** אחרי "רק להשאיר הודעה". מכאן הבוט שותק.
**הערה:** נוסף 101: זו ההודעה האחרונה של הבוט בשיחה.
> בסדר. אפשר לכתוב כאן את ההודעה, והדס תקרא ותחזור בעצמה. העוזר הדיגיטלי לא יענה יותר בשיחה הזו. במצב חירום: מד"א 101.

#### `media.voice_ask_to_type@v1` ⚖️
**איפה:** הודעה קולית. השם נדרש על ידי המנוע, וחייב לכלול 101.
> העוזר הדיגיטלי מבין רק הודעות כתובות. אפשר לכתוב את הדברים? ההקלטה עצמה נשארת בשיחה, והדס תוכל לשמוע אותה. במצב חירום: מד"א 101.

#### `media.unsupported_attachment@v1` ⚖️
**איפה:** תמונה, קובץ או מדיה אחרת. כולל 101.
> העוזר הדיגיטלי לא פותח תמונות או קבצים. הם נשארים בשיחה, והדס תוכל לראות אותם. במצב חירום: מד"א 101.

#### `wa.handoff@v1` ⚖️
**איפה:** ההודעה האחרונה של הבוט, אחרי התוצאה. מכאן הבוט שותק.
> תודה. הסיכום הועבר להדס, והיא תמשיך מכאן בעצמה. ההודעה הבאה בשיחה הזו תהיה מהדס, לא מהעוזר הדיגיטלי. במצב חירום: מד"א 101.

---

## 16. מסלולי ביניים: קטין, ומי שאינו הורה (D-02)

UX S13: כרטיס קבוע (לא בועה ולא כרטיס תוצאה), בלי טופס, בלי איסוף טלפון, בלי סיכום מודל ובלי "שכחתי לספר".
**דגלים אדומים קודמים:** אם עלה דגל, מוצג S6 ולא המסלול הזה. התיק נמחק בסוף אותו תור (ARCHITECTURE §11.1),
ולכן `interim.deleted_note` נכון. **לא מבטיחים סודיות מההורים**, ולא אומרים מה הדס רשאית לעשות מול קטין
(שאלה 18 לעורך הדין). הטון: חם, לא נוזף ולא מתנשא — "כדאי לעשות את זה יחד עם הורה", לא "אסור".
**וואטסאפ:** המסלולים האלה לאתר בלבד. בוואטסאפ ההודעות כבר אצל הדס, ולכן "נמחק" ו"לא נשלח" לא נכונים שם.
וריאנט ייכתב כשיוגדר מסלול שלב 2 (D-05).

#### `minor.self@v1` ⚖️
**איפה:** S13a: "על עצמי", וגיל מתחת ל-18 שנאמר או נענה, או אמירה מפורשת ("אני בכיתה ח'"). פעולות: קישור לטלפון של הדס · `nav.back_to_site`.
**הערה:** 28 מילים (UX: עד 40). מפנה להדס דרך הורה או מבוגר שסומכים עליו (D-02: "פרטי הקשר של הדס להורים"), ולא מזמין את הקטין להשאיר טלפון. "אבל אפשר" — הדלת לא נסגרת. בלי ער"ן כאן: דגל `distress` תופס מצוקה בכל גיל, ומציג את ההודעה שלו. זה נכון כשהעצירה באה **אחרי** טקסט. כשהיא באה לפני כל טקסט (D-13 ענף א), נבחר `minor.self.before_text`.
> תודה שכתבת. השיחה כאן מיועדת לגיל 18 ומעלה, אבל אפשר לפנות להדס גם עכשיו, יחד עם הורה או עם מבוגר אחר שסומכים עליו: {{hadas_phone}}. במצב חירום: מד"א 101.

#### `minor.self.before_text@v1` ⚖️
**איפה:** S13a, כשעצירת `minor_self` קורית **לפני כל טקסט חופשי**: הקשה על `q.self_age_band.opt.under_18` מיד אחרי "על עצמי" (D-13 ענף א; `routing_stops.minor_self.message_variants` בוחר אותו). פעולות: קישור לטלפון של הדס · `nav.back_to_site`. 101 וגם 1201 חובה (בודק השלמות, ARCHITECTURE §1.11(11)).
**הערה:** תנאי הבטיחות של המנסח הקליני (§9.3, תנאי 3): דגל `distress` לא קיבל שום טקסט לסרוק, ולכן קווי הסיוע כאן. פותח ב"תודה" ולא ב"תודה שכתבת", כי עוד לא נכתב דבר. "אם קשה עכשיו" מנרמל ולא מניח מצוקה. מספרים בשורות נפרדות, כמו `redflag.type.distress`. 46 מילים, כולל משתנים (UX: עד 40, חריגה בגלל קווי הסיוע). `interim.deleted_note` מופיע מתחת, כרגיל. **לאימות לפני השקה (L-16, הדס ואליה):** ער"ן 1201 פעיל בכל שעה; כתובת `{{sahar_url}}` נכונה; אין הגבלת גיל למי שפונה לער"ן ולסה"ר. שעות סה"ר לא נכתבות עד שיאומתו.
> תודה. השיחה כאן מיועדת לגיל 18 ומעלה, אבל אפשר לפנות להדס גם עכשיו, יחד עם הורה או עם מבוגר אחר שסומכים עליו: {{hadas_phone}}.
> אם קשה עכשיו, אפשר לדבר עם מישהו שמקשיב:
> ער"ן — בטלפון 1201, בכל שעה.
> סה"ר — תמיכה בצ'אט, בכתב: {{sahar_url}}
> במצב חירום: מד"א 101.

#### `reporter.not_parent@v1` ⚖️
**איפה:** S13b: המושא ילד, והפונה אינו הורה או אפוטרופוס — גננת, מורה, סבא או סבתא (D-02). פעולות: `reporter.copy_contact` · `nav.back_to_site`.
**הערה:** 35 מילים. מסביר למה, בלי לנזוף. בלי "כדאי לא לכתוב כאן את שם הילד" של המבקר המשפטי: הכרטיס מופיע אחרי שהשיחה נעצרה, ושדה הקלט כבר לא קיים. במקום זה `interim.deleted_note`.
> תודה שכתבת. פנייה על ילד או ילדה נעשית כאן על ידי ההורים או האפוטרופוס, כי הם אלה שמחליטים עליה. אפשר להעביר להם את פרטי הקשר של הדס, כדי שיפנו בעצמם: {{hadas_phone}}. במצב חירום: מד"א 101.

#### `interim.deleted_note@v1` ⚖️
**איפה:** S13a ו-S13b, שורה מתחת לכרטיס (UX).
**הערה:** נכון רק אם התיק נמחק בסוף התור (ARCHITECTURE §11.1, "עצירת ניתוב").
> מה שנכתב כאן נמחק, ולא נשלח להדס.

#### `reporter.copy_contact@v1`
**איפה:** S13b, כפתור שמעתיק ללוח את `reporter.copy_payload`.
> העתקת הפרטים של הדס

#### `reporter.copied@v1`
**איפה:** S13b, אחרי העתקה (מוכרז לקורא מסך).
> הפרטים הועתקו

#### `reporter.copy_failed@v1`
**איפה:** S13b, כשההעתקה נכשלה (מוכרז ומוצג). הפרטים נחשפים בכרטיס כטקסט לבחירה ידנית (תוכן `reporter.copy_payload`). אסור להציג `reporter.copied` בלי הצלחה מאומתת (UX S13).
**הערה:** 11 מילים. בלי "לא הצלחנו" (VOICE 1.4) ובלי פנייה בלשון ממוגדרת.
> הפרטים לא הועתקו. הם מוצגים כאן כטקסט, ואפשר לסמן ולהעתיק אותם.

#### `reporter.copy_payload@v1`
**איפה:** הטקסט שמועתק ללוח ב-S13b. רק פרטי הקשר של הדס, בלי שום פרט מהשיחה (UX S13).
> הדס תודה, קלינאית תקשורת. טלפון: {{hadas_phone}} · אתר: {{site_url}}

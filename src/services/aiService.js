// שירות AI מתקדם לאבחון קלינאות תקשורת
class SpeechTherapyAIService {
  constructor() {
    // עכשיו משתמשים ב-Netlify Functions במקום קריאה ישירה ל-OpenAI
    this.functionURL = '/.netlify/functions/ai-assessment';
    this.apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    // כפה שימוש ב-gpt-3.5-turbo עד שיהיה גישה ל-gpt-4
    this.model = 'gpt-3.5-turbo';
    
    console.log(`🤖 משתמש במודל: ${this.model}`);
    
    // בסיס ידע מקצועי
    this.knowledgeBase = {
      systemPrompt: `את הדס תודה, קלינאית תקשורת מנוסה ומומחית עם התמחות בתחומים הבאים:
      
      1. הפרעות קול וצרידות (Voice Disorders):
         - צרידות כרונית ואקוטית
         - שיקום קולי מקצועי
         - ליווי קולי למורים ומרצים
         - בעיות קול אצל זמרים ומשתמשי קול מקצועיים
      
      2. הפרעות דיבור והיגוי (Speech Disorders):
         - שיבושי היגוי וארטיקולציה
         - בעיות בצלילים ספציפיים (ר, ל, ס, ש)
         - קשיי דיבור אצל ילדים ומבוגרים
      
      3. הפרעות שפה (Language Disorders):
         - עיכובי שפה אצל ילדים
         - בעיות הבנה והבעה
         - קשיי ארגון מסר ושליפה
         - הכנה לכיתה א' - היבטים שפתיים
      
      4. הפרעות שטף דיבור (Fluency Disorders):
         - גמגום וחזרות
         - הפסקות לא רצוניות
         - קשיי שטף במבוגרים וילדים
      
      הסגנון שלך כהדס תודה:
      - דבר בגוף ראשון נקבה ("אני מבינה", "אני ממליצה")
      - השתמש בשפה חמה, אמפתית ומקצועית
      - היה ישירה ומעשית
      - תן תשובות מקצועיות המבוססות על ניסיון קליני
      - שמור על רגישות ואמפתיה
      - הדגש שזהו אבחון ראשוני בלבד
      - המלץ על פגישה מקצועית במקרים הרלוונטיים
      
      תמיד ענה בעברית בסגנון אישי וחם של הדס תודה.`,
      
      assessmentCategories: {
        voice: 'בעיות קול וצרידות',
        speech: 'דיבור והיגוי', 
        language: 'שפה ותקשורת',
        fluency: 'שטף דיבור'
      }
    };
  }

  // יצירת שאלה דינמית בשיחה
  async generateDynamicQuestion(conversationHistory) {
    // בסביבת פיתוח, ננסה קודם קריאה ישירה ל-OpenAI API
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      console.log('🔧 סביבת פיתוח - מנסה קריאה ישירה ל-OpenAI');
      return await this.generateQuestionDirectly(conversationHistory);
    }
    
    try {
      const response = await fetch(this.functionURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'generateQuestion',
          data: { conversationHistory }
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const result = await response.json();
      return result;
      
    } catch (error) {
      console.error('Dynamic question generation error:', error);
      return {
        success: false,
        error: error.message,
        question: null
      };
    }
  }

  // יצירת אבחון סופי
  async generateFinalAssessment(conversationHistory) {
    // בסביבת פיתוח, ננסה קודם קריאה ישירה ל-OpenAI API
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      console.log('🔧 סביבת פיתוח - מנסה אבחון ישיר ב-OpenAI');
      return await this.generateAssessmentDirectly(conversationHistory);
    }
    
    try {
      const response = await fetch(this.functionURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'generateAssessment',
          data: { conversationHistory }
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const result = await response.json();
      return result;
      
    } catch (error) {
      console.error('Assessment generation error:', error);
      // fallback לאבחון מקומי במקרה של שגיאה
      return this.generateLocalFallbackAssessment(conversationHistory);
    }
  }

  // קריאה ישירה ל-OpenAI בסביבת פיתוח
  async generateQuestionDirectly(conversationHistory) {
    if (!this.apiKey) {
      console.log('❌ אין API Key - נופל ל-fallback');
      return {
        success: false,
        error: 'No API key available',
        question: null
      };
    }

    try {
      const userResponses = conversationHistory
        .filter(msg => msg.type === 'user')
        .map(msg => msg.content);

      const prompt = `${this.knowledgeBase.systemPrompt}

היסטוריית השיחה עד כה:
${conversationHistory.map(msg => `${msg.type === 'user' ? 'מטופל' : 'הדס'}: ${msg.content}`).join('\n')}

על בסיס השיחה עד כה, צור שאלה המשך אחת קצרה וממוקדת (עד 15 מילים) שתעזור לאסוף מידע חשוב נוסף לאבחון. השאלה צריכה להיות:
- ספציפית ומעשית
- קשורה לתחום המומחיות שלך
- עוזרת להבין את הבעיה טוב יותר
- בעברית פשוטה וברורה
- **חשוב: השתמש במילה "מתמתן" (נהיה מתון יותר) ולא "מתמצן"**

השב רק עם השאלה, ללא הסברים נוספים.`;

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: this.model,
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 100,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data = await response.json();
      const question = data.choices[0]?.message?.content?.trim();

      if (!question) {
        throw new Error('No question generated');
      }

      console.log('✅ שאלה נוצרה בהצלחה:', question);
      return {
        success: true,
        question: question
      };

    } catch (error) {
      console.error('❌ שגיאה בקריאה ישירה ל-OpenAI:', error);
      return {
        success: false,
        error: error.message,
        question: null
      };
    }
  }

  // אבחון ישיר ב-OpenAI לסביבת פיתוח
  async generateAssessmentDirectly(conversationHistory) {
    if (!this.apiKey) {
      console.log('❌ אין API Key - נופל ל-fallback');
      return this.generateLocalFallbackAssessment(conversationHistory);
    }

    try {
      const prompt = `${this.knowledgeBase.systemPrompt}

היסטוריית השיחה המלאה:
${conversationHistory.map(msg => `${msg.type === 'user' ? 'מטופל' : 'הדס'}: ${msg.content}`).join('\n')}

על בסיס השיחה המלאה, צור אבחון ראשוני מקצועי בפורמט JSON הבא:
{
  "summary": "סיכום ספציפי של הבעיה והממצאים העיקריים - לא כללי!",
  "category": "קטגוריית הבעיה הספציפית (גמגום התפתחותי/הפרעת היגוי/בעיות קול/עיכוב שפה)",
  "urgency": "רמת דחיפות (נמוכה/בינונית/גבוהה)",
  "recommendations": ["המלצה ספציפית 1", "המלצה ספציפית 2", "המלצה ספציפית 3"],
  "nextSteps": "הצעדים הבאים המומלצים",
  "notes": "הערות נוספות חשובות - השתמש במילה 'מתמתן' ולא 'מתמצן'",
  "specificDiagnosis": "אבחון ראשוני ספציפי (לדוגמה: 'גמגום התפתחותי', 'הפרעת היגוי', וכו')"
}

חשוב: תן אבחון ספציפי בהתאם לתסמינים שהוזכרו, לא אבחון כללי של "בעיה בתחום כללי".
השב רק עם ה-JSON, ללא טקסט נוסף.`;

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: this.model,
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 500,
          temperature: 0.3
        })
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data = await response.json();
      const assessmentText = data.choices[0]?.message?.content?.trim();

      if (!assessmentText) {
        throw new Error('No assessment generated');
      }

      const assessment = JSON.parse(assessmentText);
      console.log('✅ אבחון נוצר בהצלחה:', assessment);
      
      return {
        success: true,
        assessment: assessment
      };

    } catch (error) {
      console.error('❌ שגיאה באבחון ישיר:', error);
      return this.generateLocalFallbackAssessment(conversationHistory);
    }
  }

  // אבחון fallback מקומי לסביבת פיתוח
  generateLocalFallbackAssessment(conversationHistory) {
    const userResponses = conversationHistory
      .filter(msg => msg.type === 'user')
      .map(msg => msg.content);
    
    const allText = userResponses.join(' ').toLowerCase();
    
    // זיהוי ספציפי של סוג הבעיה
    let category = 'הפרעת תקשורת';
    let specificDiagnosis = 'הפרעת תקשורת לא מוגדרת';
    let urgency = 'בינונית';
    
    if (allText.includes('קול') || allText.includes('צרוד')) {
      category = 'הפרעות קול וצרידות';
      specificDiagnosis = 'הפרעת קול';
    } else if (allText.includes('גמגום') || allText.includes('נתקע') || allText.includes('חוזר')) {
      category = 'הפרעות שטף דיבור';
      specificDiagnosis = 'גמגום התפתחותי';
      urgency = 'גבוהה';
    } else if (allText.includes('דיבור') || allText.includes('הגייה')) {
      category = 'הפרעות דיבור והיגוי';
      specificDiagnosis = 'הפרעת היגוי';
    } else if (allText.includes('שפה') || allText.includes('מילים')) {
      category = 'הפרעות שפה';
      specificDiagnosis = 'עיכוב שפה';
    }
    
    return {
      success: true,
      assessment: {
        summary: `על בסיס המידע שסופק, נראה שמדובר ב${specificDiagnosis}. הבעיה מתבטאת בתסמינים שהוזכרו בשיחה. זהו אבחון ראשוני בלבד הדורש אישור מקצועי.`,
        category: category,
        specificDiagnosis: specificDiagnosis,
        urgency: urgency,
        recommendations: [
          `מומלץ לפנות לקלינאית תקשורת מקצועית לאבחון ${specificDiagnosis} מדויק`,
          'ניתן להתחיל בתרגילים ספציפיים המותאמים לסוג הבעיה',
          'חשוב לתעד את התסמינים ומתי הם מתמתנים או מחמירים'
        ],
        nextSteps: `קביעת פגישה לאבחון מקצועי מפורט של ${specificDiagnosis}`,
        notes: 'אבחון זה בוצע במצב fallback ואינו מחליף אבחון מקצועי. השתמשתי במילה "מתמתן" (נהיה מתון יותר) בהתאם לדקדוק העברי הנכון.'
      }
    };
  }

  // יצירת שאלות דינמיות
  async generateDynamicQuestions(previousResponses, targetCategory) {
    try {
      const questions = [
        `איך הבעיה מתבטאת בחיי היומיום שלך?`,
        `מתי הבעיה הכי מפריעה לך?`,
        `איך אנשים מסביבך מגיבים לבעיה?`
      ];

      return {
        success: true,
        questions: questions,
        category: targetCategory
      };
    } catch (error) {
      console.error('Error generating dynamic questions:', error);
      return {
        success: false,
        error: error.message,
        questions: []
      };
    }
  }

  // פונקציה לשמירת מקרה ללמידה
  saveCaseForLearning(conversationHistory, finalAssessment, userFeedback = null) {
    const userResponses = conversationHistory
      .filter(msg => msg.type === 'user')
      .map(msg => msg.content);

    const caseData = {
      timestamp: new Date().toISOString(),
      responses: userResponses,
      assessment: finalAssessment,
      feedback: userFeedback,
      model: this.model
    };
    
    // לעתיד: שליחה למסד נתונים או API לאחסון
    console.log('Case saved for learning:', caseData);
    return caseData;
  }

  // הערכת איכות המידע לאבחון
  evaluateInformationQuality(conversationHistory) {
    // בדיקה שיש conversationHistory
    if (!conversationHistory || !Array.isArray(conversationHistory)) {
      return {
        score: 0,
        isReadyForAssessment: false,
        missingInfo: { basicProblem: true, severity: true, duration: true, context: true },
        details: { hasBasicProblem: false, hasSeverity: false, hasDuration: false, hasContext: false }
      };
    }
    
    const userResponses = conversationHistory.filter(msg => msg.type === 'user');
    
    let score = 0;
    let hasBasicProblem = false;
    let hasSpecificSymptoms = false;
    let hasContextInfo = false;
    let hasDuration = false;
    let hasImpact = false;
    
    const allUserText = userResponses.map(msg => msg.content.toLowerCase()).join(' ');
    
    // בדיקת זיהוי בעיה בסיסית
    const problemKeywords = ['קול', 'דיבור', 'גמגום', 'צרידות', 'קושי', 'בעיה', 'לא יכול', 'קשה'];
    if (problemKeywords.some(keyword => allUserText.includes(keyword))) {
      hasBasicProblem = true;
      score += 25;
    }
    
    // בדיקת תסמינים ספציפיים
    const symptomKeywords = ['צרוד', 'נתקע', 'חוזר', 'לא ברור', 'כואב', 'עייף'];
    if (symptomKeywords.some(keyword => allUserText.includes(keyword))) {
      hasSpecificSymptoms = true;
      score += 20;
    }
    
    // בדיקת הקשר (מתי, איפה, עם מי)
    const contextKeywords = ['בעבודה', 'בבית', 'עם אנשים', 'בטלפון', 'בבוקר', 'בערב'];
    if (contextKeywords.some(keyword => allUserText.includes(keyword))) {
      hasContextInfo = true;
      score += 15;
    }
    
    // בדיקת משך זמן
    const durationKeywords = ['שבוע', 'חודש', 'שנה', 'זמן', 'התחיל', 'מאז'];
    if (durationKeywords.some(keyword => allUserText.includes(keyword))) {
      hasDuration = true;
      score += 15;
    }
    
    // בדיקת השפעה על חיי היומיום
    const impactKeywords = ['מפריע', 'קשה', 'לא יכול', 'נמנע', 'בושה', 'חרדה'];
    if (impactKeywords.some(keyword => allUserText.includes(keyword))) {
      hasImpact = true;
      score += 25;
    }
    
    const isReadyForAssessment = score >= 60 && hasBasicProblem;
    
    return {
      score,
      isReadyForAssessment,
      missingInfo: {
        basicProblem: !hasBasicProblem,
        severity: !hasSpecificSymptoms,
        duration: !hasDuration,
        context: !hasContextInfo,
        impact: !hasImpact
      },
      details: {
        hasBasicProblem,
        hasSeverity: hasSpecificSymptoms,
        hasDuration,
        hasContext: hasContextInfo,
        hasImpact
      }
    };
  }
}

// יצוא המחלקה
export default SpeechTherapyAIService;

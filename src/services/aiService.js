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
      return {
        success: false,
        error: error.message,
        assessment: null
      };
    }
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

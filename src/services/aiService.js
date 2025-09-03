// שירות AI מתקדם לאבחון קלינאות תקשורת
class SpeechTherapyAIService {
  constructor() {
    this.apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    // כפה שימוש ב-gpt-3.5-turbo עד שיהיה גישה ל-gpt-4
    this.model = 'gpt-3.5-turbo';
    this.baseURL = 'https://api.openai.com/v1/chat/completions';
    
    console.log(`🤖 משתמש במודל: ${this.model}`);
    
    // בסיס ידע מקצועי
    this.knowledgeBase = {
      systemPrompt: `אתה מומחה בקלינאות תקשורת עם התמחות בתחומים הבאים:
      
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
      
      הנחיות לאבחון:
      - תן תשובות מקצועיות ומדויקות
      - התבסס על ראיות מחקריות
      - ספק המלצות מעשיות
      - שמור על רגישות ואמפתיה
      - הדגש שזהו אבחון ראשוני בלבד
      - המלץ על פגישה מקצועית במקרים הרלוונטיים
      
      תמיד ענה בעברית ובצורה ברורה ונגישה.`,
      
      assessmentCategories: {
        voice: 'בעיות קול וצרידות',
        speech: 'דיבור והיגוי', 
        language: 'שפה ותקשורת',
        fluency: 'שטף דיבור'
      }
    };
  }

  // בדיקת זמינות API
  async checkAPIAvailability() {
    if (!this.apiKey) {
      console.warn('⚠️ API Key חסר - נופל למצב fallback');
      throw new Error('API Key not configured');
    }
    
    console.log('🔑 API Key נמצא, מנסה להתחבר ל-OpenAI...');
    return true;
  }

  // יצירת prompt מותאם לאבחון
  createAssessmentPrompt(userResponses, targetCategory = null) {
    let prompt = `בצע אבחון ראשוני מקצועי בתחום קלינאות התקשורת על בסיס התשובות הבאות:\n\n`;
    
    // הוספת תשובות המשתמש
    Object.entries(userResponses).forEach(([question, answer]) => {
      prompt += `שאלה: ${question}\nתשובה: ${answer}\n\n`;
    });
    
    if (targetCategory) {
      prompt += `התמקד בעיקר בתחום: ${this.knowledgeBase.assessmentCategories[targetCategory]}\n\n`;
    }
    
    prompt += `אנא ספק:
    1. הערכה מקצועית של המצב
    2. זיהוי תחומים שדורשים תשומת לב
    3. המלצות ראשוניות
    4. האם יש צורך בפגישה מקצועית
    5. טיפים מעשיים לשיפור
    
    חשוב: זהו אבחון ראשוני בלבד ואינו מחליף אבחון מקצועי מקיף.
    
    תשובה בפורמט JSON:
    {
      "assessment": "הערכה כללית",
      "categories": {
        "voice": {"score": 0-10, "recommendation": "המלצה"},
        "speech": {"score": 0-10, "recommendation": "המלצה"},
        "language": {"score": 0-10, "recommendation": "המלצה"},
        "fluency": {"score": 0-10, "recommendation": "המלצה"}
      },
      "needsProfessionalConsultation": true/false,
      "practicalTips": ["טיפ 1", "טיפ 2"],
      "urgencyLevel": "low/medium/high"
    }`;
    
    return prompt;
  }

  // שליחת בקשה ל-OpenAI API
  async callOpenAI(prompt) {
    try {
      await this.checkAPIAvailability();
      
      const response = await fetch(this.baseURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: this.model,
          messages: [
            {
              role: 'system',
              content: this.knowledgeBase.systemPrompt
            },
            {
              role: 'user', 
              content: prompt
            }
          ],
          max_tokens: parseInt(import.meta.env.VITE_AI_MAX_TOKENS) || 1000,
          temperature: parseFloat(import.meta.env.VITE_AI_TEMPERATURE) || 0.7,
          response_format: { type: "json_object" }
        })
      });

      console.log('📡 Response status:', response.status);
      console.log('📡 Response headers:', response.headers);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ API Error details:', errorText);
        
        // טיפול מיוחד בשגיאת מכסה
        if (response.status === 429) {
          console.warn('⚠️ חרגת מהמכסה של OpenAI - נופל למצב fallback');
          throw new Error('QUOTA_EXCEEDED');
        }
        
        throw new Error(`API Error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      return JSON.parse(data.choices[0].message.content);
      
    } catch (error) {
      console.error('AI Service Error:', error);
      throw error;
    }
  }

  // אבחון מלא עם AI
  async performAIAssessment(userResponses) {
    try {
      const prompt = this.createAssessmentPrompt(userResponses);
      const aiResponse = await this.callOpenAI(prompt);
      
      return {
        success: true,
        assessment: aiResponse,
        timestamp: new Date().toISOString(),
        model: this.model
      };
      
    } catch (error) {
      return {
        success: false,
        error: error.message,
        fallbackToRules: true
      };
    }
  }

  // אבחון ממוקד לקטגוריה ספציפית
  async assessSpecificCategory(userResponses, category) {
    try {
      const prompt = this.createAssessmentPrompt(userResponses, category);
      const aiResponse = await this.callOpenAI(prompt);
      
      return {
        success: true,
        category,
        assessment: aiResponse,
        timestamp: new Date().toISOString()
      };
      
    } catch (error) {
      return {
        success: false,
        error: error.message,
        category
      };
    }
  }

  // ניתוח תשובה פתוחה
  async analyzeOpenEndedResponse(question, response) {
    try {
      const prompt = `נתח את התשובה הבאה לשאלה בתחום קלינאות התקשורת:
      
      שאלה: ${question}
      תשובה: ${response}
      
      אנא זהה:
      1. סימנים לבעיות תקשורת
      2. מילות מפתח רלוונטיות
      3. רמת חומרה משוערת
      4. המלצות לשאלות המשך
      
      תשובה בפורמט JSON:
      {
        "indicators": ["סימן 1", "סימן 2"],
        "keywords": ["מילה 1", "מילה 2"],
        "severity": "low/medium/high",
        "followUpQuestions": ["שאלה 1", "שאלה 2"],
        "suggestedCategory": "voice/speech/language/fluency"
      }`;
      
      const aiResponse = await this.callOpenAI(prompt);
      return aiResponse;
      
    } catch (error) {
      console.error('Open-ended analysis error:', error);
      return null;
    }
  }

  // יצירת שאלות דינמיות
  async generateDynamicQuestions(previousResponses, targetCategory) {
    try {
      const prompt = `על בסיס התשובות הקודמות, צור 3 שאלות מותאמות לתחום ${this.knowledgeBase.assessmentCategories[targetCategory]}:
      
      תשובות קודמות:
      ${JSON.stringify(previousResponses, null, 2)}
      
      צור שאלות שיעזרו לחדד את האבחון בתחום זה.
      
      תשובה בפורמט JSON:
      {
        "questions": [
          {
            "id": "dynamic_1",
            "text": "טקסט השאלה",
            "type": "select/scale/text",
            "options": ["אפשרות 1", "אפשרות 2"] // רק אם type = select
          }
        ]
      }`;
      
      const aiResponse = await this.callOpenAI(prompt);
      return aiResponse.questions;
      
    } catch (error) {
      console.error('Dynamic questions error:', error);
      return [];
    }
  }

  // שמירת מקרה ללמידה עתידית
  async saveCaseForLearning(userResponses, finalAssessment, userFeedback = null) {
    // כאן ניתן לשמור במסד נתונים או קובץ ללמידה עתידית
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

  // יצירת שאלה דינמית בשיחה
  async generateDynamicQuestion(prompt, conversationHistory) {
    try {
      await this.checkAPIAvailability();
      
      // בניית הקשר השיחה
      const conversationContext = conversationHistory.map(msg => 
        `${msg.type === 'ai' ? 'קלינאי' : 'מטופל'}: ${msg.content}`
      ).join('\n');
      
      const fullPrompt = `${prompt}

הקשר השיחה עד כה:
${conversationContext}

צור שאלת המשך טבעית ומקצועית שתעזור לחדד את האבחון. השאלה צריכה להיות:
1. ממוקדת ורלוונטית לתשובות הקודמות
2. מקצועית אך נגישה
3. אמפתית וחמה
4. מותאמת לגיל ולמצב המתואר

החזר רק את טקסט השאלה, ללא הסברים נוספים.`;

      const response = await fetch(this.baseURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: this.model,
          messages: [
            {
              role: 'system',
              content: this.knowledgeBase.systemPrompt
            },
            {
              role: 'user',
              content: fullPrompt
            }
          ],
          max_tokens: 200,
          temperature: 0.8
        })
      });

      console.log('📡 Response status:', response.status);
      console.log('📡 Response headers:', response.headers);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ API Error details:', errorText);
        
        // טיפול מיוחד בשגיאת מכסה
        if (response.status === 429) {
          console.warn('⚠️ חרגת מהמכסה של OpenAI - נופל למצב fallback');
          throw new Error('QUOTA_EXCEEDED');
        }
        
        throw new Error(`API Error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      const question = data.choices[0].message.content.trim();
      
      return {
        success: true,
        question: question,
        timestamp: new Date().toISOString()
      };
      
    } catch (error) {
      console.error('Dynamic question generation error:', error);
      return {
        success: false,
        error: error.message,
        question: null
      };
    }
  }

  // יצירת אבחון סופי מהשיחה
  async generateFinalAssessment(conversationHistory) {
    try {
      await this.checkAPIAvailability();
      
      // בניית תקציר השיחה
      const conversationSummary = conversationHistory.map(msg => 
        `${msg.type === 'ai' ? 'קלינאי' : 'מטופל'}: ${msg.content}`
      ).join('\n');
      
      const prompt = `על בסיס השיחה הבאה, בצע אבחון ראשוני מקיף בתחום קלינאות התקשורת:

${conversationSummary}

אנא ספק אבחון מקצועי הכולל:
1. סיכום הבעיה המרכזית
2. הערכת חומרה ודחיפות
3. המלצות מעשיות
4. טיפים לשיפור מיידי
5. האם נדרשת פגישה מקצועית

תשובה בפורמט JSON:
{
  "summary": "סיכום מקצועי של הבעיה והמצב",
  "urgencyLevel": "low/medium/high",
  "needsProfessionalConsultation": true/false,
  "recommendations": ["המלצה 1", "המלצה 2", "המלצה 3"],
  "practicalTips": ["טיפ מעשי 1", "טיפ מעשי 2"],
  "mainConcerns": ["דאגה עיקרית 1", "דאגה עיקרית 2"],
  "followUpAdvice": "עצות למעקב והמשך טיפול"
}

חשוב: זהו אבחון ראשוני בלבד ואינו מחליף אבחון מקצועי מקיף.`;

      const response = await fetch(this.baseURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: this.model,
          messages: [
            {
              role: 'system',
              content: this.knowledgeBase.systemPrompt
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 800,
          temperature: 0.7,
          response_format: { type: "json_object" }
        })
      });

      console.log('📡 Response status:', response.status);
      console.log('📡 Response headers:', response.headers);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ API Error details:', errorText);
        
        // טיפול מיוחד בשגיאת מכסה
        if (response.status === 429) {
          console.warn('⚠️ חרגת מהמכסה של OpenAI - נופל למצב fallback');
          throw new Error('QUOTA_EXCEEDED');
        }
        
        throw new Error(`API Error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      const assessment = JSON.parse(data.choices[0].message.content);
      
      return {
        success: true,
        assessment: assessment,
        timestamp: new Date().toISOString(),
        model: this.model
      };
      
    } catch (error) {
      console.error('Final assessment generation error:', error);
      return {
        success: false,
        error: error.message,
        assessment: null
      };
    }
  }
}

// יצוא השירות
export default new SpeechTherapyAIService();

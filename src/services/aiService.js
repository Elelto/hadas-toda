// שירות AI מתקדם לאבחון קלינאות תקשורת
class SpeechTherapyAIService {
  constructor() {
    // עכשיו משתמשים ב-Netlify Functions במקום קריאה ישירה ל-OpenAI
    this.functionURL = '/.netlify/functions/ai-assessment';
    this.apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    // כפה שימוש ב-gpt-3.5-turbo עד שיהיה גישה ל-gpt-4
    this.model = 'gpt-3.5-turbo';
    // this.baseURL = 'https://api.openai.com/v1/chat/completions';
    
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
  async generateDynamicQuestion(prompt, conversationHistory) {
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
        error: error.message
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
        error: error.message
      };
    }
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
      
      // בניית הקשר השיחה עם דגש על תשובות המשתמש
      const userResponses = conversationHistory.filter(msg => msg.type === 'user');
      const lastUserResponse = userResponses[userResponses.length - 1]?.content || '';
      
      // איסוף שאלות קודמות למניעת חזרות
      const previousQuestions = conversationHistory
        .filter(msg => msg.type === 'ai')
        .map(msg => msg.content)
        .join('\n- ');
      
      const conversationContext = conversationHistory.map(msg => 
        `${msg.type === 'ai' ? 'קלינאי' : 'מטופל'}: ${msg.content}`
      ).join('\n');
      
      const fullPrompt = `You are Hadas Toda, an experienced speech therapist. Generate a short, focused follow-up question based on the patient's last response.

=== Patient's last response ===
"${lastUserResponse}"

=== Full conversation so far ===
${conversationContext}

=== Questions already asked (DO NOT repeat similar questions!) ===
- ${previousQuestions}

=== CRITICAL INSTRUCTIONS ===
1. **If patient wrote "הי" (hi) or similar - DO NOT assume any specific problem**
2. **Start with OPEN-ENDED questions to identify the actual problem**
3. **DO NOT assume stuttering, voice problems, or any specific issue**
4. **Ask what brings them to speech therapy assessment**
5. **Let the patient tell you their problem first**
6. **Only ask specific questions AFTER they mention their problem**

For initial conversation (when patient says "hi" or similar):
- "יש לך בעיה בדיבור או בקול?" (Do you have speech or voice problems?)
- "מה הביא אותך לאבחון תקשורת?" (What brought you to communication assessment?)
- "איך אני יכולה לעזור לך?" (How can I help you?)
- "יש לך קושי מסוים בתקשורת?" (Do you have any communication difficulty?)

ONLY ask specific questions AFTER patient mentions their problem:
- If they say "stuttering" → ask about when it started, which sounds, etc.
- If they say "voice problems" → ask about hoarseness, when it happens, etc.
- If they say "speech problems" → ask about specific sounds, clarity, etc.

WRONG examples (NEVER do this!):
- "מהם המצבים בהם את נתקעת?" (assuming stuttering without patient mentioning it)
- Assuming any specific problem before patient describes it
- Asking detailed questions about problems not yet mentioned

Return ONLY a general question to identify what problem the patient has.`;

      // בפיתוח מקומי - נסה קודם Netlify Function, אם לא עובד נפול ל-OpenAI ישיר
      try {
        const response = await fetch(this.functionURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            action: 'generateQuestion',
            prompt: fullPrompt,
            conversationHistory: conversationHistory
          })
        });

        console.log('📡 Function Response status:', response.status);

        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            return {
              success: true,
              question: data.question,
              timestamp: new Date().toISOString()
            };
          }
        }
        
        // אם הגענו לכאן, Netlify Function לא עובדת - נפול ל-OpenAI ישיר
        console.warn('⚠️ Netlify Function לא זמינה, נופל ל-OpenAI ישיר');
        throw new Error('FUNCTION_NOT_AVAILABLE');
        
      } catch (functionError) {
        console.warn('⚠️ Netlify Function נכשלה:', functionError.message);
        
        // fallback ל-OpenAI ישיר (רק בפיתוח מקומי)
        if (this.apiKey && this.apiKey !== 'your_openai_api_key_here') {
          console.log('🔄 נופל ל-OpenAI ישיר...');
          
          const response = await fetch('https://api.openai.com/v1/chat/completions', {
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

          if (!response.ok) {
            throw new Error(`OpenAI API Error: ${response.status}`);
          }

          const data = await response.json();
          const question = data.choices[0].message.content.trim();
          
          return {
            success: true,
            question: question,
            timestamp: new Date().toISOString()
          };
        }
        
        throw functionError;
      }
      
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

      // בפיתוח מקומי - נסה קודם Netlify Function, אם לא עובד נפול ל-OpenAI ישיר
      try {
        const response = await fetch(this.functionURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            action: 'generateAssessment',
            prompt: prompt,
            conversationHistory: conversationHistory
          })
        });

        console.log('📡 Function Response status:', response.status);

        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            return {
              success: true,
              assessment: data.assessment,
              timestamp: new Date().toISOString(),
              model: this.model
            };
          }
        }
        
        // אם הגענו לכאן, Netlify Function לא עובדת - נפול ל-OpenAI ישיר
        console.warn('⚠️ Netlify Function לא זמינה, נופל ל-OpenAI ישיר');
        throw new Error('FUNCTION_NOT_AVAILABLE');
        
      } catch (functionError) {
        console.warn('⚠️ Netlify Function נכשלה:', functionError.message);
        
        // fallback ל-OpenAI ישיר (רק בפיתוח מקומי)
        if (this.apiKey && this.apiKey !== 'your_openai_api_key_here') {
          console.log('🔄 נופל ל-OpenAI ישיר...');
          
          const response = await fetch('https://api.openai.com/v1/chat/completions', {
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

          if (!response.ok) {
            throw new Error(`OpenAI API Error: ${response.status}`);
          }

          const data = await response.json();
          const assessment = JSON.parse(data.choices[0].message.content);
          
          return {
            success: true,
            assessment: assessment,
            timestamp: new Date().toISOString(),
            model: this.model
          };
        }
        
        throw functionError;
      }
      
    } catch (error) {
      console.error('Final assessment generation error:', error);
      return {
        success: false,
        error: error.message,
        assessment: null
      };
    }
  }

  // הערכת איכות המידע לאבחון
  evaluateInformationQuality(conversationHistory) {
    const userResponses = conversationHistory.filter(msg => msg.type === 'user');
    
    let score = 0;
    let hasBasicProblem = false;
    let hasSpecificSymptoms = false;
    let hasContextInfo = false;
    let hasDuration = false;
    let hasImpact = false;
    
    const allUserText = userResponses.map(msg => msg.content.toLowerCase()).join(' ');
    
    // בדיקת מידע בסיסי על הבעיה
    const problemKeywords = ['בעיה', 'קושי', 'לא מדבר', 'גמגום', 'לשון', 'הגייה', 'דיבור', 'קול'];
    if (problemKeywords.some(keyword => allUserText.includes(keyword))) {
      hasBasicProblem = true;
      score += 20;
    }
    
    // בדיקת סימפטומים ספציפיים
    const symptomKeywords = ['צרידות', 'קשורה', 'לא ברור', 'מהיר', 'איטי', 'חזק', 'חלש', 'נעלם'];
    if (symptomKeywords.some(keyword => allUserText.includes(keyword))) {
      hasSpecificSymptoms = true;
      score += 25;
    }
    
    // בדיקת מידע הקשרי (גיל, מצב, סביבה)
    const contextKeywords = ['בן', 'בת', 'ילד', 'עבודה', 'בית ספר', 'חברים', 'משפחה', 'מורה'];
    if (contextKeywords.some(keyword => allUserText.includes(keyword))) {
      hasContextInfo = true;
      score += 20;
    }
    
    // בדיקת משך הבעיה
    const durationKeywords = ['שנה', 'חודש', 'שבוע', 'מתי', 'התחיל', 'זמן', 'לאחרונה'];
    if (durationKeywords.some(keyword => allUserText.includes(keyword))) {
      hasDuration = true;
      score += 15;
    }
    
    // בדיקת השפעה על החיים
    const impactKeywords = ['מפריע', 'קשה', 'ביטחון', 'חברתי', 'לימודים', 'עבודה', 'תקשורת'];
    if (impactKeywords.some(keyword => allUserText.includes(keyword))) {
      hasImpact = true;
      score += 20;
    }
    
    // בונוס לתשובות מפורטות
    const avgResponseLength = userResponses.reduce((sum, msg) => sum + msg.content.length, 0) / userResponses.length;
    if (avgResponseLength > 20) score += 10;
    
    return {
      score,
      isReadyForAssessment: score >= 80,
      missingInfo: {
        basicProblem: !hasBasicProblem,
        specificSymptoms: !hasSpecificSymptoms,
        contextInfo: !hasContextInfo,
        duration: !hasDuration,
        impact: !hasImpact
      },
      details: {
        hasBasicProblem,
        hasSpecificSymptoms,
        hasContextInfo,
        hasDuration,
        hasImpact,
        responseCount: userResponses.length,
        avgResponseLength: Math.round(avgResponseLength)
      }
    };
  }
}

// יצוא השירות
export default new SpeechTherapyAIService();

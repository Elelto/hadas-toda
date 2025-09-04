// Netlify Function לטיפול ב-AI Assessment בצד השרת
const OpenAI = require('openai');

// יצירת OpenAI instance רק אם API Key קיים
let openai = null;
if (process.env.OPENAI_API_KEY) {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
} else {
  console.error('OPENAI_API_KEY is not configured');
}

exports.handler = async (event, context) => {
  // הגדרת CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  // טיפול ב-preflight request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // רק POST requests מותרים
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    // בדיקה אם OpenAI instance קיים
    if (!openai) {
      console.error('OPENAI_API_KEY is missing in environment variables');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'API Key not configured',
          details: 'OPENAI_API_KEY environment variable is missing'
        }),
      };
    }

    // בדיקה אם יש body בבקשה
    if (!event.body) {
      console.error('Missing request body');
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          error: 'Missing request body'
        }),
      };
    }

    console.log('Request body:', event.body);
    const { action, data } = JSON.parse(event.body);

    switch (action) {
      case 'generateQuestion':
        return await generateQuestion(data, headers);
      case 'generateAssessment':
        return await generateAssessment(data, headers);
      default:
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Invalid action' }),
        };
    }
  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Internal server error',
        details: error.message 
      }),
    };
  }
};

// יצירת שאלה דינמית
async function generateQuestion(data, headers) {
  try {
    // בדיקה אם data קיים ויש לו conversationHistory
    if (!data || !data.conversationHistory) {
      console.error('Missing conversationHistory in data:', data);
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Missing conversationHistory in request data'
        }),
      };
    }
    
    const { conversationHistory } = data;
    
    const userResponses = conversationHistory.filter(msg => msg.type === 'user');
    const lastUserResponse = userResponses[userResponses.length - 1]?.content || '';
    
    const previousQuestions = conversationHistory
      .filter(msg => msg.type === 'ai')
      .map(msg => msg.content)
      .join('\n- ');
    
    const conversationContext = conversationHistory.map(msg => 
      `${msg.type === 'ai' ? 'קלינאי' : 'מטופל'}: ${msg.content}`
    ).join('\n');
    
    const prompt = `אתה קלינאי תקשורת מנוסה. צור שאלת המשך מותאמת אישית על בסיס התשובה האחרונה של המטופל.

=== התשובה האחרונה של המטופל ===
"${lastUserResponse}"

=== השיחה המלאה עד כה ===
${conversationContext}

=== שאלות שכבר נשאלו (אסור לחזור עליהן בדיוק!) ===
- ${previousQuestions}

=== הוראות חשובות ===
1. **קרא בעיון את התשובה האחרונה** - זה הדבר הכי חשוב!
2. אם המטופל כתב רק "הי" או תשובה כללית - שאל שאלת פתיחה בסיסית על הבעיה
3. אם המטופל הזכיר בעיה ספציפית - התמקד בדיוק בזה שהוא אמר
4. אם המטופל הזכיר גיל/מצב/סימפטום - שאל עליו בדיוק
5. **אסור לחזור על שאלות זהות או דומות מאוד לקודמות!**
6. אם השאלה דומה לקודמת - נסח אותה אחרת או שאל על היבט אחר
7. השתמש בשפה אמפתית ומקצועית

דוגמאות:
- אם המטופל כתב "הי" → "שלום! מה הביא אותך לפנות לייעוץ בנושא תקשורת ודיבור?"
- אם המטופל כתב "יש לי בעיה בדיבור" → "אני מבין. איך הבעיה בדיבור מתבטאת? האם זה קושי בהגייה, בקצב, או משהו אחר?"
- אם המטופל כתב "הילד שלי בן 5 לא מדבר טוב" → "מה בדיוק אתה מבחין בדיבור של הילד בן ה-5? האם זה קושי בהגיית מילים מסוימות?"

החזר רק את השאלה, ללא הסברים.`;

    const response = await openai.chat.completions.create({
      model: process.env.AI_MODEL || 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: parseInt(process.env.AI_MAX_TOKENS) || 1000,
      temperature: parseFloat(process.env.AI_TEMPERATURE) || 0.7,
    });

    const question = response.choices[0].message.content.trim();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        question: question,
      }),
    };
  } catch (error) {
    console.error('Question generation error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: error.message,
      }),
    };
  }
}

// יצירת אבחון סופי
async function generateAssessment(data, headers) {
  try {
    // בדיקה אם data קיים ויש לו conversationHistory
    if (!data || !data.conversationHistory) {
      console.error('Missing conversationHistory in data:', data);
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Missing conversationHistory in request data'
        }),
      };
    }
    
    const { conversationHistory } = data;
    
    const conversationContext = conversationHistory.map(msg => 
      `${msg.type === 'ai' ? 'קלינאי' : 'מטופל'}: ${msg.content}`
    ).join('\n');

    const prompt = `אתה מומחה בקלינאות תקשורת. בצע אבחון ראשוני מקצועי על בסיס השיחה הבאה:

=== השיחה המלאה ===
${conversationContext}

=== הוראות לאבחון ===
1. נתח את המידע שהתקבל מהמטופל
2. זהה את הבעיות העיקריות בתקשורת/דיבור
3. הערך את רמת הדחיפות
4. תן המלצות מעשיות וטיפים מיידיים
5. קבע אם נדרשת פגישה מקצועית

החזר את התשובה בפורמט JSON הבא:
{
  "summary": "סיכום מקצועי של הבעיה והמצב",
  "urgencyLevel": "low/medium/high",
  "needsProfessionalConsultation": true/false,
  "recommendations": ["המלצה 1", "המלצה 2", "המלצה 3"],
  "practicalTips": ["טיפ מעשי 1", "טיפ מעשי 2"],
  "mainConcerns": ["דאגה עיקרית 1", "דאגה עיקרית 2"],
  "followUpAdvice": "עצות למעקב והמשך טיפול"
}

החזר רק את ה-JSON, ללא טקסט נוסף.`;

    const response = await openai.chat.completions.create({
      model: process.env.AI_MODEL || 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: parseInt(process.env.AI_MAX_TOKENS) || 1000,
      temperature: parseFloat(process.env.AI_TEMPERATURE) || 0.7,
    });

    const assessmentText = response.choices[0].message.content.trim();
    
    // ניסיון לפרסר את ה-JSON
    let assessment;
    try {
      assessment = JSON.parse(assessmentText);
    } catch (parseError) {
      // אם הפרסור נכשל, ננסה לחלץ JSON מהטקסט
      const jsonMatch = assessmentText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        assessment = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('Failed to parse assessment JSON');
      }
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        assessment: assessment,
      }),
    };
  } catch (error) {
    console.error('Assessment generation error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: error.message,
      }),
    };
  }
}

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
    
    const prompt = `You are an experienced speech-language pathologist. Create a personalized follow-up question based on the patient's last response.

=== Patient's Last Response ===
"${lastUserResponse}"

=== Full Conversation So Far ===
${conversationContext}

=== Questions Already Asked (DO NOT repeat exactly!) ===
- ${previousQuestions}

=== Important Instructions ===
1. **Carefully read the last response** - this is the most important thing!
2. If patient wrote only "hi" or general response - ask basic opening question about the problem
3. If patient mentioned specific problem - focus exactly on what they said
4. If patient mentioned age/condition/symptom - ask about it specifically
5. **NEVER repeat identical or very similar questions to previous ones!**
6. If question is similar to previous - rephrase it differently or ask about different aspect
7. Use empathetic and professional language
8. **CRITICAL: Use correct Hebrew grammar - "מתמתן" (becomes milder) NOT "מתמצן"**
9. Focus on specific speech/communication disorders, not general issues
10. If discussing stuttering, ask specific questions about stuttering patterns

Examples:
- If patient wrote "hi" → "שלום! מה הביא אותך לפנות לייעוץ בנושא תקשורת ודיבור?"
- If patient wrote "יש לי בעיה בדיבור" → "אני מבין. איך הבעיה בדיבור מתבטאת? האם זה קושי בהגייה, בקצב, או משהו אחר?"
- If patient mentioned stuttering → "האם הגמגום שלך מתמתן או מחמיר בסיטואציות מסוימות?"

Return only the question in Hebrew, without explanations.`;

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

    const prompt = `You are a speech-language pathology expert. Perform a professional preliminary assessment based on the following conversation:

=== Full Conversation ===
${conversationContext}

=== Assessment Instructions ===
1. Analyze the information received from the patient
2. Identify the main communication/speech problems SPECIFICALLY
3. Assess urgency level
4. Provide practical recommendations and immediate tips
5. Determine if professional consultation is needed
6. **CRITICAL: Provide SPECIFIC diagnosis, not general "communication problem"**
7. **If stuttering is mentioned, focus specifically on stuttering patterns and characteristics**
8. **Use correct Hebrew grammar - "מתמתן" (becomes milder) NOT "מתמצן"**

Return the answer in the following JSON format:
{
  "summary": "Professional summary of the SPECIFIC problem and condition (not general)",
  "urgencyLevel": "low/medium/high",
  "needsProfessionalConsultation": true/false,
  "recommendations": ["Recommendation 1", "Recommendation 2", "Recommendation 3"],
  "practicalTips": ["Practical tip 1", "Practical tip 2"],
  "mainConcerns": ["Main concern 1", "Main concern 2"],
  "followUpAdvice": "Advice for follow-up and continued treatment",
  "specificDiagnosis": "Specific preliminary diagnosis (e.g., 'developmental stuttering', 'articulation disorder', etc.)"
}

Return only the JSON in Hebrew, without additional text.`;

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

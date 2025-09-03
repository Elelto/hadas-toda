import React, { useState, useEffect } from 'react';
import aiService from '../services/aiService';
import '../styles/ai-assessment.css';

export default function AIAssessment() {
  const [conversationHistory, setConversationHistory] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [userInput, setUserInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [finalAssessment, setFinalAssessment] = useState(null);
  const [questionCount, setQuestionCount] = useState(0);
  const [assessmentStarted, setAssessmentStarted] = useState(false);
  const [useAI, setUseAI] = useState(false); // התחל עם fallback

  // שאלות fallback מקומיות
  const fallbackQuestions = [
    "שלום! מה מביא אותך לאבחון היום? תאר/י בקצרה את הבעיה או הדאגה שלך.",
    "באיזה גיל מדובר? (עבור ילד/ה - כמה שנים, עבור מבוגר/ת - ציין/י את הגיל)",
    "מתי הבחנת לראשונה בבעיה? האם זה משהו חדש או קיים זמן רב?",
    "איך הבעיה משפיעה על החיים היומיומיים? (עבודה, לימודים, חברתי)",
    "האם יש דברים שמחמירים או משפרים את המצב?"
  ];

  // התחלת השיחה
  const startAssessment = async () => {
    setIsProcessing(true);
    setAssessmentStarted(true);
    
    if (useAI) {
      try {
        const initialPrompt = `
אתה קלינאי תקשורת מומחה של הדס טודה. תפקידך לבצע אבחון ראשוני מקיף באמצעות שיחה טבעית.

התמחויות של הדס:
- הפרעות קול וצרידות (ילדים ומבוגרים)
- טיפול בדיבור ושפה
- הפרעות הגייה
- טיפול בגמגום
- עיכובי שפה
- שיקום קול למקצועות דיבור (מורים, מרצים)
- הכנה לכיתה א' (היבטי שפה)

הנחיות לשיחה:
1. התחל בשאלה פתוחה וחמה
2. שאל שאלות המשך מותאמות לתשובות
3. התמקד בבעיה הספציפית
4. אסוף מידע על: גיל, תחום הבעיה, חומרת הבעיה, משך הבעיה
5. שאל 4-6 שאלות מקסימום
6. היה אמפתי ומקצועי

התחל עכשיו בשאלה ראשונה:
        `;

        const response = await aiService.generateDynamicQuestion(initialPrompt, []);
        
        if (response.success) {
          setCurrentQuestion(response.question);
          setConversationHistory([{
            type: 'ai',
            content: response.question,
            timestamp: new Date()
          }]);
        } else {
          throw new Error('Failed to start AI assessment');
        }
      } catch (error) {
        console.error('Error starting AI assessment:', error);
        // Fallback למערכת מקומית
        startFallbackAssessment();
      }
    } else {
      startFallbackAssessment();
    }
    
    setIsProcessing(false);
  };

  // התחלת אבחון fallback
  const startFallbackAssessment = () => {
    const firstQuestion = fallbackQuestions[0];
    setCurrentQuestion(firstQuestion);
    setConversationHistory([{
      type: 'ai',
      content: firstQuestion,
      timestamp: new Date()
    }]);
  };

  // טיפול בתשובת המשתמש
  const handleUserResponse = async () => {
    if (!userInput.trim()) return;

    const newHistory = [...conversationHistory, {
      type: 'user',
      content: userInput,
      timestamp: new Date()
    }];
    
    setConversationHistory(newHistory);
    setIsProcessing(true);
    setQuestionCount(prev => prev + 1);

    console.log(`🔍 מצב נוכחי: ${useAI ? 'AI' : 'Fallback'}, שאלה מספר: ${questionCount + 1}`);

    try {
      // בדיקה אם צריך לסיים את האבחון
      if (questionCount >= 4) {
        console.log('🏁 מסיים אבחון...');
        
        if (useAI) {
          console.log('🤖 מנסה אבחון AI...');
          const assessmentResult = await aiService.generateFinalAssessment(newHistory);
          
          if (assessmentResult.success) {
            console.log('✅ אבחון AI הצליח!', assessmentResult.assessment);
            setFinalAssessment({
              ...assessmentResult.assessment,
              isAIGenerated: true
            });
            setIsCompleted(true);
            setIsProcessing(false);
            return;
          } else {
            console.log('❌ אבחון AI נכשל:', assessmentResult.error);
            throw new Error('Failed to generate AI assessment');
          }
        } else {
          console.log('🔧 משתמש באבחון fallback מקומי');
          generateFallbackAssessment(newHistory);
          setIsProcessing(false);
          return;
        }
      } else {
        // שאלת המשך
        console.log('➡️ יוצר שאלת המשך...');
        
        if (useAI) {
          console.log('🤖 מנסה שאלת AI...');
          const nextQuestionResponse = await aiService.generateDynamicQuestion(
            `על בסיס השיחה עד כה, צור שאלת המשך מותאמת ומקצועית. זו שאלה מספר ${questionCount + 1} מתוך 5.`,
            newHistory
          );
          
          if (nextQuestionResponse.success) {
            console.log('✅ שאלת AI הצליחה!', nextQuestionResponse.question);
            setCurrentQuestion(nextQuestionResponse.question);
            setConversationHistory([...newHistory, {
              type: 'ai',
              content: nextQuestionResponse.question,
              timestamp: new Date()
            }]);
            setIsProcessing(false);
            return;
          } else {
            console.log('❌ שאלת AI נכשלה:', nextQuestionResponse.error);
            throw new Error('Failed to generate AI question');
          }
        } else {
          console.log('🔧 משתמש בשאלה fallback מקומית');
          const nextQuestion = fallbackQuestions[questionCount + 1] || "תודה על התשובות. האם יש עוד משהו חשוב שתרצה לשתף?";
          setCurrentQuestion(nextQuestion);
          setConversationHistory([...newHistory, {
            type: 'ai',
            content: nextQuestion,
            timestamp: new Date()
          }]);
          setIsProcessing(false);
          return;
        }
      }
    } catch (error) {
      console.error('💥 שגיאה בעיבוד תשובה:', error);
      
      // Fallback logic
      if (questionCount >= 4) {
        console.log('🔧 נופל לאבחון fallback בגלל שגיאה');
        generateFallbackAssessment(newHistory);
      } else {
        console.log('🔧 נופל לשאלה fallback בגלל שגיאה');
        const fallbackQuestion = fallbackQuestions[Math.min(questionCount + 1, fallbackQuestions.length - 1)] || 
          "תודה על התשובות. האם יש עוד משהו שתרצה לשתף?";
        setCurrentQuestion(fallbackQuestion);
        setConversationHistory([...newHistory, {
          type: 'ai',
          content: fallbackQuestion,
          timestamp: new Date()
        }]);
      }
    }

    setUserInput('');
    setIsProcessing(false);
  };

  // יצירת אבחון fallback
  const generateFallbackAssessment = (history) => {
    const userResponses = history.filter(msg => msg.type === 'user').map(msg => msg.content);
    
    let assessment = {
      summary: "על בסיס השיחה שלנו, זיהיתי מספר נקודות חשובות שדורשות תשומת לב מקצועית.",
      recommendations: [
        "מומלץ לקבוע פגישה אישית עם הדס לאבחון מקיף",
        "המשך מעקב אחר הבעיה והתפתחותה",
        "תיעוד של מקרים ספציפיים שבהם הבעיה בולטת"
      ],
      practicalTips: [
        "שמור/י על היגיינת קול טובה - שתיית מים רבה",
        "הימנע/י מצעקות ודיבור רם מיותר",
        "תרגל/י נשימה נכונה לפני דיבור"
      ],
      urgencyLevel: "medium",
      needsProfessionalConsultation: true,
      mainConcerns: userResponses.slice(0, 2)
    };

    // ניתוח בסיסי של התשובות
    const allText = userResponses.join(' ').toLowerCase();
    
    if (allText.includes('צרידות') || allText.includes('קול') || allText.includes('צרוד')) {
      assessment.urgencyLevel = "high";
      assessment.summary = "זוהו סימנים לבעיות קול שדורשות טיפול מקצועי מיידי.";
      assessment.practicalTips.unshift("הפסק/י מיידית פעילויות המעמיסות על הקול");
    }
    
    if (allText.includes('ילד') || allText.includes('בן ') || allText.includes('בת ')) {
      assessment.recommendations.unshift("חשוב לטפל בבעיות תקשורת בגיל צעיר לקבלת תוצאות מיטביות");
    }

    setFinalAssessment(assessment);
    setIsCompleted(true);
  };

  const handleRestart = () => {
    setConversationHistory([]);
    setCurrentQuestion('');
    setUserInput('');
    setIsCompleted(false);
    setFinalAssessment(null);
    setQuestionCount(0);
    setAssessmentStarted(false);
  };

  // אם האבחון הושלם
  if (isCompleted && finalAssessment) {
    return (
      <div className="ai-assessment-container">
        <div className="assessment-results">
          <h2>סיכום האבחון החכם</h2>
          <div className="ai-powered-badge">
            <span>🤖 מופעל על ידי בינה מלאכותית</span>
          </div>
          
          <div className="conversation-summary">
            <h3>תקציר השיחה</h3>
            <div className="conversation-history">
              {conversationHistory.slice(-6).map((message, index) => (
                <div key={index} className={`message ${message.type}`}>
                  <div className="message-content">{message.content}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="ai-assessment-summary">
            <h3>הערכה מקצועית</h3>
            <p>{finalAssessment.summary}</p>
          </div>

          {finalAssessment.recommendations && (
            <div className="ai-recommendations">
              <h3>המלצות</h3>
              <ul>
                {finalAssessment.recommendations.map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            </div>
          )}

          {finalAssessment.practicalTips && (
            <div className="practical-tips">
              <h3>טיפים מעשיים</h3>
              <ul>
                {finalAssessment.practicalTips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="urgency-indicator">
            <div className={`urgency-level ${finalAssessment.urgencyLevel || 'medium'}`}>
              {finalAssessment.urgencyLevel === 'high' && '🔴 דחיפות גבוהה'}
              {finalAssessment.urgencyLevel === 'medium' && '🟡 דחיפות בינונית'}
              {finalAssessment.urgencyLevel === 'low' && '🟢 דחיפות נמוכה'}
            </div>
          </div>

          {finalAssessment.needsProfessionalConsultation && (
            <div className="professional-consultation-notice">
              <h3>⚠️ המלצה לפגישה מקצועית</h3>
              <p>על בסיס השיחה, מומלץ לקבוע פגישה עם הדס לאבחון מקיף יותר.</p>
            </div>
          )}

          <div className="results-actions">
            <button className="btn-primary" onClick={() => window.location.href = '/contact'}>
              קביעת פגישה עם הדס
            </button>
            <button className="btn-secondary" onClick={handleRestart}>
              אבחון חדש
            </button>
          </div>
        </div>
      </div>
    );
  }

  // מסך התחלה
  if (!assessmentStarted) {
    return (
      <div className="ai-assessment-container">
        <div className="assessment-intro">
          <h1>אבחון חכם מותאם אישית</h1>
          <div className="ai-powered-badge">
            <span>🤖 מופעל על ידי בינה מלאכותית</span>
          </div>
          
          <div className="intro-content">
            <p>שלום! אני מערכת AI מתקדמת שפותחה במיוחד עבור הדס טודה.</p>
            <p>אבצע עמך שיחה אישית ומותאמת לזיהוי אתגרים תקשורתיים.</p>
            
            <div className="ai-toggle-section">
              <h3>בחר/י מצב אבחון:</h3>
              <div className="toggle-options">
                <label className={`toggle-option ${!useAI ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="aiMode"
                    checked={!useAI}
                    onChange={() => setUseAI(false)}
                  />
                  <span className="toggle-text">
                    <strong>🔧 מצב בדיקה</strong>
                    <br />
                    שאלות מקומיות מהירות (ללא עלות)
                  </span>
                </label>
                
                <label className={`toggle-option ${useAI ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="aiMode"
                    checked={useAI}
                    onChange={() => setUseAI(true)}
                  />
                  <span className="toggle-text">
                    <strong>🤖 מצב AI מתקדם</strong>
                    <br />
                    שיחה אישית עם בינה מלאכותית
                  </span>
                </label>
              </div>
            </div>
            
            <div className="features-list">
              <h3>מה כולל האבחון:</h3>
              <ul>
                <li>🎯 שיחה אישית ומותאמת</li>
                <li>🧠 ניתוח חכם של התשובות</li>
                <li>📋 המלצות מקצועיות מותאמות</li>
                <li>⏱️ כ-5 דקות בלבד</li>
              </ul>
            </div>
            
            <p className="disclaimer">
              *זהו אבחון ראשוני בלבד ואינו מחליף אבחון מקצועי מקיף
            </p>
          </div>
          
          <button className="btn-primary start-button" onClick={startAssessment}>
            התחל אבחון {useAI ? 'חכם' : 'מהיר'}
          </button>
        </div>
      </div>
    );
  }

  // מסך השיחה
  return (
    <div className="ai-assessment-container">
      <div className="assessment-header">
        <h1>שיחה עם המערכת החכמה</h1>
        <div className="ai-powered-badge">
          <span>🤖 מופעל על ידי בינה מלאכותית</span>
        </div>
        <div className="progress-indicator">
          שאלה {questionCount + 1} מתוך 5-6
        </div>
      </div>

      <div className="conversation-container">
        <div className="conversation-history">
          {conversationHistory.map((message, index) => (
            <div key={index} className={`message ${message.type}`}>
              <div className="message-avatar">
                {message.type === 'ai' ? '🤖' : '👤'}
              </div>
              <div className="message-content">{message.content}</div>
            </div>
          ))}
          
          {isProcessing && (
            <div className="message ai">
              <div className="message-avatar">🤖</div>
              <div className="message-content typing">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                מנתח ומכין שאלת המשך...
              </div>
            </div>
          )}
        </div>

        <div className="input-container">
          <textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="כתוב/י את התשובה שלך כאן..."
            className="user-input"
            rows={3}
            disabled={isProcessing}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleUserResponse();
              }
            }}
          />
          <button 
            className="btn-primary send-button"
            onClick={handleUserResponse}
            disabled={!userInput.trim() || isProcessing}
          >
            {isProcessing ? 'שולח...' : 'שלח'}
          </button>
        </div>
      </div>
    </div>
  );
}

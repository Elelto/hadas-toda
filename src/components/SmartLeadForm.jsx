import React, { useState, useEffect } from 'react';
import { ChevronDown, Phone, Mail, User, CheckCircle, ArrowLeft } from 'lucide-react';
import '../styles/landing-page.css';
import { init, send } from '@emailjs/browser';

// Initialize EmailJS
init("l9xXgXVINGFdgI8KJ");

const SmartLeadForm = ({ subject, formLogic, ctaName, onComplete }) => {
  const [step, setStep] = useState(1);
  const [patientType, setPatientType] = useState(null); // 'adult' | 'child'
  const [targetAge, setTargetAge] = useState(null); // 'adult', 'teen_child', 'toddler'
  const [fastTrack, setFastTrack] = useState(false);
  const [challenges, setChallenges] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    notes: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    // If fast track is toggled on mobile, we don't force jump, but we show the fields below.
    // However, if the user explicitly wants to skip, they can click "next".
  }, [fastTrack]);

  const handlePatientSelect = (type, age) => {
    setPatientType(type);
    setTargetAge(age);
    setChallenges({});
    setFastTrack(false);
    setStep(2);
  };

  const handleChallengeToggle = (id) => {
    setChallenges(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const hasSelectedChallenges = Object.values(challenges).some(v => v);

  const handleNextToContact = () => {
    setStep(3);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'נא להזין שם';
    
    const phone = formData.phone.replace(/[\s-]/g, '');
    if (!phone) {
      errors.phone = 'נא להזין מספר טלפון';
    } else if (!/^(0[2-489]\d{7}|05\d{8}|07[2-9]\d{7})$/.test(phone)) {
      errors.phone = 'מספר הטלפון אינו תקין';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    
    const selectedChallengesTexts = Object.keys(challenges)
      .filter(k => challenges[k])
      .map(k => {
        const option = [...(formLogic.adultOptions || []), ...(formLogic.childOptions || [])].find(o => o.id === k);
        return option ? option.label : k;
      })
      .join(', ');

    const now = new Date();
    const currentDate = now.toLocaleDateString('he-IL', { year: 'numeric', month: 'long', day: 'numeric' });
    const currentTime = now.toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' });

    const mainParams = {
      to_name: 'הדס תודה',
      user_name: formData.name,
      user_email: formData.email || 'לא הוזן',
      user_phone: formData.phone,
      message: `
סוג מטופל: ${patientType === 'adult' ? 'מבוגר/נער' : 'ילד/פעוט'}
מסלול מהיר: ${fastTrack ? 'כן' : 'לא'}
קשיים שנבחרו: ${selectedChallengesTexts || 'לא נבחרו'}
הערות חופשיות: ${formData.notes || 'אין'}
      `.trim(),
      current_date: currentDate,
      current_time: currentTime,
      to_email: 'hadas.toda.info@gmail.com',
      email: 'hadas.toda.info@gmail.com',
      recipient: 'hadas.toda.info@gmail.com',
      reply_to: formData.email || 'hadas.toda.info@gmail.com'
    };

    const serviceID = 'service_zm8sd32';
    const templateID = 'template_abcdxis';
    const publicKey = 'l9xXgXVINGFdgI8KJ';

    send(serviceID, templateID, mainParams, publicKey)
      .then(() => {
        setSuccess(true);
        setLoading(false);
        if (onComplete) onComplete();
      })
      .catch((err) => {
        console.error('Send error:', err);
        setError(true);
        setLoading(false);
      });
  };

  if (success) {
    return (
      <div className="form-success-state">
        <CheckCircle className="success-icon" size={64} />
        <h3>תודה רבה!</h3>
        <p>פנייתך התקבלה בהצלחה.<br/>אחזור אליך בהקדם לשיחת התאמה קצרה.</p>
      </div>
    );
  }

  return (
    <div className="smart-lead-form">
      <div className="form-progress">
        <div className={`progress-dot ${step >= 1 ? 'active' : ''}`}></div>
        <div className={`progress-line ${step >= 2 ? 'active' : ''}`}></div>
        <div className={`progress-dot ${step >= 2 ? 'active' : ''}`}></div>
        <div className={`progress-line ${step >= 3 ? 'active' : ''}`}></div>
        <div className={`progress-dot ${step >= 3 ? 'active' : ''}`}></div>
      </div>

      {step === 1 && (
        <div className="form-step step-1 active fade-in">
          <h3 className="step-title">עבור מי הטיפול ב{subject}?</h3>
          <p className="step-subtitle">בחירת מסלול מותאם אישית</p>
          <div className="step-options-grid">
            <div className={`option-card ${targetAge === 'adult' ? 'selected' : ''}`} onClick={() => handlePatientSelect('adult', 'adult')} role="button" tabIndex={0}>
              <span className="option-icon" style={{color: 'var(--primary-dark)'}}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              </span>
              <span className="option-label">מבוגרים</span>
            </div>
            <div className={`option-card ${targetAge === 'teen_child' ? 'selected' : ''}`} onClick={() => handlePatientSelect('child', 'teen_child')} role="button" tabIndex={0}>
              <span className="option-icon" style={{color: 'var(--primary-dark)'}}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><path d="M20 8v6M23 11h-6"></path></svg>
              </span>
              <span className="option-label">ילדים ונוער</span>
            </div>
            <div className={`option-card ${targetAge === 'toddler' ? 'selected' : ''}`} onClick={() => handlePatientSelect('child', 'toddler')} role="button" tabIndex={0}>
              <span className="option-icon" style={{color: 'var(--primary-dark)'}}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>
              </span>
              <span className="option-label">הגיל הרך</span>
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="form-step step-2 active slide-in-right">
          <div className="step-header-with-back" style={{display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem'}}>
            <button type="button" className="btn btn-prev" onClick={() => setStep(1)} aria-label="חזור" style={{padding: '0.5rem', borderRadius: '50%'}}>
              <ArrowLeft size={20} />
            </button>
            <div>
              <h3 className="step-title">מהם הקשיים העיקריים?</h3>
              <p className="step-subtitle">ניתן לסמן מספר אפשרויות</p>
            </div>
          </div>
          
          <div className="checkbox-options-list">
            {(patientType === 'adult' ? formLogic.adultOptions : formLogic.childOptions).map(opt => (
              <label key={opt.id} className={`checkbox-card ${challenges[opt.id] ? 'selected' : ''}`}>
                <input 
                  type="checkbox" 
                  checked={!!challenges[opt.id]}
                  onChange={() => handleChallengeToggle(opt.id)}
                  disabled={fastTrack}
                />
                <span className="checkbox-text">{opt.label}</span>
              </label>
            ))}
            
            <label className={`checkbox-card fast-track-card ${fastTrack ? 'selected' : ''}`} style={{marginTop:'15px', borderStyle:'dashed'}}>
              <input 
                type="checkbox" 
                checked={fastTrack} 
                onChange={(e) => setFastTrack(e.target.checked)} 
              />
              <span className="checkbox-text" style={{fontWeight:600}}>אני מעדיף/ה לפרט בשיחה הטלפונית</span>
            </label>
          </div>

          <div className="form-navigation">
            <button 
              type="button" 
              className="btn btn-next" 
              onClick={handleNextToContact}
              disabled={!hasSelectedChallenges && !fastTrack}
              style={{marginRight: 'auto'}}
            >
              המשך לשלב האחרון
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="form-step step-3 active slide-in-right">
          <div className="step-header-with-back" style={{display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem'}}>
            <button type="button" className="btn btn-prev" onClick={() => setStep(2)} aria-label="חזור" style={{padding: '0.5rem', borderRadius: '50%'}}>
              <ArrowLeft size={20} />
            </button>
            <div>
              <h3 className="step-title">פרטי התקשרות</h3>
              <p className="step-subtitle">אחזור אליך בהקדם האפשרי</p>
            </div>
          </div>
          
          <form className="contact-details-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>שם מלא *</label>
                <input 
                  type="text" 
                  name="name" 
                  placeholder="הכנס שם מלא" 
                  value={formData.name}
                  onChange={handleInputChange}
                  className={formErrors.name ? 'error' : ''}
                />
                {formErrors.name && <span className="error-text" style={{color:'red', fontSize:'0.8rem'}}>{formErrors.name}</span>}
              </div>
              <div className="form-group">
                <label>טלפון *</label>
                <input 
                  type="tel" 
                  name="phone" 
                  dir="ltr"
                  placeholder="050-000-0000" 
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={formErrors.phone ? 'error' : ''}
                />
                {formErrors.phone && <span className="error-text" style={{color:'red', fontSize:'0.8rem'}}>{formErrors.phone}</span>}
              </div>
            </div>
            
            <div className="form-group">
              <label>הערות (אופציונלי)</label>
              <textarea 
                name="notes" 
                placeholder="אם יש פרטים נוספים שחשוב שאדע..." 
                rows="2"
                value={formData.notes}
                onChange={handleInputChange}
              ></textarea>
            </div>
            
            {error && <div className="error-banner">אירעה שגיאה בשליחה. נסו שנית.</div>}

            <button type="submit" className={`btn-submit ${loading ? 'loading' : ''}`} disabled={loading} style={{marginTop: '1rem'}}>
              {loading ? 'שולח...' : 'שליחה ותיאום שיחה'}
            </button>
            <p className="privacy-note" style={{textAlign: 'center', marginTop: '0.5rem', fontSize: '0.85rem', opacity: 0.7}}>הפרטים חסויים לחלוטין וישמשו רק לצורך יצירת קשר ראשוני.</p>
          </form>
        </div>
      )}
    </div>
  );
};

export default SmartLeadForm;

import React, { useEffect, useState, useRef } from 'react';
import SEOHead from '../components/SEOHead';
import StructuredData from '../components/StructuredData';
import AOS from 'aos';
import '../styles/online-therapy.css';
import '../styles/contact.css';
import { init, send } from '@emailjs/browser';
import { FaPhone, FaWhatsapp, FaEnvelope, FaLaptop, FaClock, FaHome, FaUserMd, FaCheckCircle, FaVideo, FaArrowLeft, FaExclamationCircle, FaMicrophoneAlt, FaCommentDots, FaStream, FaAppleAlt, FaAssistiveListeningSystems, FaChild } from 'react-icons/fa';

// Specialization Configuration (Icon + Color)
const specializationConfig = {
    'voice': {
        icon: <FaMicrophoneAlt />,
        color: '#FF6B6B',
        bg: '#FFE5E5'
    },
    'articulation': {
        icon: <FaCommentDots />,
        color: '#4ECDC4',
        bg: '#E0F7FA'
    },
    'stuttering': {
        icon: <FaStream />,
        color: '#A18CD1',
        bg: '#F3E5F5'
    },
    'oral': {
        icon: <FaAppleAlt />,
        color: '#FFB74D',
        bg: '#FFF3E0'
    },
    'intelligibility': {
        icon: <FaAssistiveListeningSystems />,
        color: '#4DB6AC',
        bg: '#E0F2F1'
    },
    'children': {
        icon: <FaChild />,
        color: '#64B5F6',
        bg: '#E3F2FD'
    }
};

// Initialize EmailJS
init("l9xXgXVINGFdgI8KJ");

const OnlineTherapy = () => {
    const [activeAccordion, setActiveAccordion] = useState(null);

    // Form State
    const form = useRef();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [formData, setFormData] = useState({
        user_name: '',
        user_email: '',
        user_phone: '',
        message: ''
    });
    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        window.scrollTo(0, 0);
        setTimeout(() => {
            AOS.refresh();
        }, 100);
    }, []);

    // Form Handlers
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (formErrors[name]) {
            setFormErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.user_name.trim()) errors.user_name = 'נא להזין שם';
        if (!formData.user_email.trim()) errors.user_email = 'נא להזין כתובת אימייל';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.user_email)) errors.user_email = 'כתובת האימייל אינה תקינה';
        if (formData.user_phone.trim() && !/^0[2-9]\d{7,8}$/.test(formData.user_phone)) errors.user_phone = 'מספר הטלפון אינו תקין';
        if (!formData.message.trim()) errors.message = 'נא להזין הודעה';
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        setSuccess(false);
        setError(false);

        const now = new Date();
        const currentDate = now.toLocaleDateString('he-IL', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        const currentTime = now.toLocaleTimeString('he-IL', {
            hour: '2-digit',
            minute: '2-digit'
        });

        const serviceID = 'service_zm8sd32';
        const templateID = 'template_abcdxis';
        const publicKey = 'l9xXgXVINGFdgI8KJ';

        const mainParams = {
            to_name: 'הדס תודה',
            user_name: formData.user_name,
            user_email: formData.user_email,
            user_phone: formData.user_phone || 'לא צוין',
            message: `[פנייה מדף טיפול אונליין]\n\n${formData.message}`,
            current_date: currentDate,
            current_time: currentTime,
            to_email: 'hadas.toda.info@gmail.com',
            email: 'hadas.toda.info@gmail.com',
            recipient: 'hadas.toda.info@gmail.com',
            reply_to: formData.user_email
        };

        send(serviceID, templateID, mainParams, publicKey)
            .then(() => {
                const replyParams = {
                    user_name: formData.user_name,
                    user_email: formData.user_email,
                    user_phone: formData.user_phone || 'לא צוין',
                    message: formData.message,
                    to_name: formData.user_name,
                    to_email: formData.user_email,
                    email: formData.user_email,
                    reply_to: 'hadas.toda.info@gmail.com'
                };
                send(serviceID, 'template_vmm0l2g', replyParams, publicKey)
                    .catch(err => console.error('Reply error:', err));

                setSuccess(true);
                setLoading(false);
                setFormData({ user_name: '', user_email: '', user_phone: '', message: '' });
            })
            .catch((err) => {
                console.error('Send error:', err);
                setError(true);
                setLoading(false);
            });
    };

    const seoData = {
        title: "קלינאית תקשורת אונליין | הדס תודה M.A - טיפול מרחוק מקצועי",
        description: "טיפולי קלינאות תקשורת אונליין עם הדס תודה M.A. טיפול מקצועי בגמגום, צרידות, בעיות קול והיגוי - מהנוחות של הבית שלך. התקשרו: 050-679-6209",
        keywords: "קלינאית תקשורת אונליין, טיפול גמגום אונליין, טיפול קול מרחוק, טיפול בצרידות אונליין, קלינאית תקשורת זום, טיפול שפה מרחוק",
        canonicalUrl: "/online-therapy"
    };

    const benefits = [
        {
            icon: <FaHome />,
            title: "נוחות מהבית",
            description: "קבלו טיפול מקצועי מהסלון שלכם, ללא נסיעות ובזבוז זמן יקר"
        },
        {
            icon: <FaClock />,
            title: "גמישות בשעות",
            description: "אפשרות לתיאום מפגשים בשעות נוחות, כולל שעות ערב"
        },
        {
            icon: <FaLaptop />,
            title: "טכנולוגיה פשוטה",
            description: "מפגשים דרך זום - קל, נגיש וידידותי למשתמש"
        },
        {
            icon: <FaUserMd />,
            title: "אותה מקצועיות",
            description: "אותו טיפול איכותי ומקצועי כמו במפגש פנים אל פנים"
        }
    ];

    const services = [
        {
            title: "טיפול בגמגום אונליין",
            description: "טיפול מקצועי בגמגום לילדים, נוער ומבוגרים. שיטות מוכחות לשיפור שטף הדיבור והביטחון העצמי - הכל דרך מסך.",
            icon: "stuttering"
        },
        {
            title: "טיפול בצרידות וקול מרחוק",
            description: "שיקום קולי למורים, מרצים, זמרים ואנשי מקצוע. למדו לשמור על הקול שלכם מבלי לצאת מהבית.",
            icon: "voice"
        },
        {
            title: "התפתחות שפה ודיבור",
            description: "אבחון וטיפול בילדים עם עיכוב שפתי. הדרכת הורים צמודה כחלק מהתהליך.",
            icon: "articulation"
        },
        {
            title: "טיפול בהיגוי",
            description: "שיפור הגייה ומובנות דיבור לילדים ומבוגרים. טיפול ממוקד בשיבושי היגוי.",
            icon: "intelligibility"
        }
    ];

    const howItWorks = [
        {
            step: "1",
            title: "יצירת קשר",
            description: "צרו קשר דרך הטופס או בטלפון לשיחת היכרות קצרה"
        },
        {
            step: "2",
            title: "מפגש היכרות",
            description: "מפגש וידאו ראשוני להבנת הצרכים והציפיות"
        },
        {
            step: "3",
            title: "אבחון והערכה",
            description: "הערכה מקצועית מקיפה דרך הזום"
        },
        {
            step: "4",
            title: "תוכנית טיפול",
            description: "בניית תוכנית טיפול אישית ומותאמת"
        },
        {
            step: "5",
            title: "מפגשים קבועים",
            description: "טיפול שבועי בזום עם מעקב והתקדמות"
        }
    ];

    const faqs = [
        {
            question: "האם טיפול אונליין יעיל כמו טיפול פרונטלי?",
            answer: "כן! מחקרים רבים מראים שטיפולי קלינאות תקשורת אונליין יעילים באותה מידה כמו טיפולים פרונטליים. היתרון הוא שניתן לתרגל בסביבה הטבעית של המטופל."
        },
        {
            question: "מה צריך כדי להתחיל?",
            answer: "כל מה שצריך זה מחשב או טאבלט עם מצלמה ומיקרופון, חיבור אינטרנט יציב, ומקום שקט בבית. אני אדריך אתכם בכל השלבים הטכניים."
        },
        {
            question: "לאילו גילאים מתאים טיפול אונליין?",
            answer: "טיפול אונליין מתאים לילדים מגיל 4-5 ומעלה (בליווי הורה), לנוער ולמבוגרים. לילדים צעירים יותר אני מציעה הדרכת הורים אונליין."
        },
        {
            question: "כמה זמן נמשך כל מפגש?",
            answer: "מפגש טיפולי נמשך כ-45 דקות, בדומה למפגש בקליניקה. המפגש כולל עבודה ישירה ולעיתים גם הדרכת הורים."
        },
        {
            question: "האם יש החזרים מקופות החולים?",
            answer: "אני עובדת כקלינאית תקשורת פרטית. מומלץ לבדוק מול הביטוח המשלים שלכם לגבי זכאות להחזרים עבור טיפולים פרטיים."
        }
    ];

    const toggleAccordion = (index) => {
        setActiveAccordion(activeAccordion === index ? null : index);
    };

    const contactInfo = {
        phone: "050-679-6209",
        whatsapp: "972506796209",
        email: "hadas.toda.info@gmail.com"
    };

    return (
        <>
            <SEOHead {...seoData} />
            <StructuredData type="services" />

            <div className="online-therapy-page">
                {/* Hero Section with Aurora Theme */}
                <section className="bb-hero">
                    <div className="bb-hero-overlay"></div>
                    <div className="hero-background-shapes">
                        <div className="aurora-blob blob-1"></div>
                        <div className="aurora-blob blob-2"></div>
                    </div>
                    <div className="container bb-hero-content">
                        <div className="bb-hero-text" data-aos="fade-up">
                            <span className="bb-badge">
                                <FaVideo /> קליניקה דיגיטלית
                            </span>
                            <h1>קלינאית תקשורת <span className="text-gradient">אונליין</span></h1>
                            <p className="bb-subtitle">טיפול מקצועי ואישי - מהסלון שלכם</p>
                            <p className="bb-description">
                                הדס תודה M.A | קלינאית תקשורת מוסמכת
                                <br />
                                מרחב טיפולי נגיש, גמיש ומקצועי לילדים ומבוגרים בזום.
                            </p>
                            <div className="bb-actions">
                                <a href={`https://wa.me/${contactInfo.whatsapp}`} className="bb-btn bb-btn-primary" target="_blank" rel="noopener noreferrer">
                                    <FaWhatsapp /> לתיאום מפגש
                                </a>
                                <a href="#contact" className="bb-btn bb-btn-outline">
                                    צור קשר
                                </a>
                            </div>
                        </div>
                        <div className="bb-hero-shape" data-aos="fade-left" data-aos-delay="200">
                            <div className="shape-circle online-shape-bg"></div>
                            <div className="shape-content">
                                <div className="stat-box glass-card" style={{ top: '15%', right: '-10px' }}>
                                    <span className="stat-number"><FaVideo /></span>
                                    <span className="stat-label">זום / וידאו</span>
                                </div>
                                <div className="stat-box glass-card" style={{ bottom: '20%', left: '-10px' }}>
                                    <span className="stat-number">100%</span>
                                    <span className="stat-label">פרטיות</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="wave-bottom">
                        {/* Using simple wave svg */}
                        <svg viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg">
                            <path fill="#ffffff" fillOpacity="1" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
                        </svg>
                    </div>
                </section>

                {/* Benefits Section */}
                <section className="bb-services section-padding">
                    <div className="container">
                        <div className="section-header-center">
                            <h2>למה טיפול אונליין?</h2>
                            <div className="header-underline"></div>
                            <p>היתרונות של טיפול מרחוק</p>
                        </div>

                        <div className="benefits-grid">
                            {benefits.map((benefit, index) => (
                                <div
                                    key={index}
                                    className="benefit-card"
                                    data-aos="fade-up"
                                    data-aos-delay={index * 100}
                                >
                                    <div className="benefit-icon">
                                        {benefit.icon}
                                    </div>
                                    <h3>{benefit.title}</h3>
                                    <p>{benefit.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Services Section */}
                <section className="bb-services section-padding bg-light">
                    <div className="container">
                        <div className="section-header-center">
                            <h2>תחומי טיפול אונליין</h2>
                            <div className="header-underline"></div>
                            <p>כל שירותי הקליניקה - עכשיו גם מרחוק</p>
                        </div>

                        <div className="bb-services-grid-specializations">
                            {services.map((service, index) => {
                                const config = specializationConfig[service.icon] || specializationConfig['voice'];
                                return (
                                    <div
                                        key={index}
                                        className="bb-specialization-card glass-card"
                                        data-aos="fade-up"
                                        data-aos-delay={index * 100}
                                        style={{ '--hover-color': config.color }}
                                    >
                                        <div
                                            className="spec-icon"
                                            style={{
                                                color: config.color,
                                                background: config.bg,
                                                boxShadow: `0 4px 15px ${config.color}30`
                                            }}
                                        >
                                            {config.icon}
                                        </div>
                                        <h3 className="spec-title">{service.title}</h3>
                                        <p className="spec-description">{service.description}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* How It Works Section */}
                <section className="bb-timeline section-padding">
                    <div className="container">
                        <div className="section-header-center">
                            <h2>איך זה עובד?</h2>
                            <div className="header-underline"></div>
                            <p>תהליך פשוט ב-5 שלבים</p>
                        </div>

                        <div className="process-timeline">
                            {howItWorks.map((item, index) => (
                                <div
                                    key={index}
                                    className="process-step"
                                    data-aos="fade-up"
                                    data-aos-delay={index * 150}
                                >
                                    <div className="step-number">{item.step}</div>
                                    <div className="step-content">
                                        <h3>{item.title}</h3>
                                        <p>{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="bb-faq section-padding bg-light">
                    <div className="container">
                        <div className="section-header-center">
                            <h2>שאלות נפוצות על טיפול אונליין</h2>
                            <div className="header-underline"></div>
                        </div>
                        <div className="faq-container">
                            {faqs.map((faq, index) => (
                                <div
                                    key={index}
                                    className={`faq-item ${activeAccordion === index ? 'active' : ''}`}
                                    onClick={() => toggleAccordion(index)}
                                >
                                    <div className="faq-question">
                                        <h3>{faq.question}</h3>
                                        <span className="faq-toggle">{activeAccordion === index ? '−' : '+'}</span>
                                    </div>
                                    <div className="faq-answer" style={{ maxHeight: activeAccordion === index ? '200px' : '0' }}>
                                        <p>{faq.answer}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section id="contact" className="online-contact section-padding">
                    <div className="container">
                        <div className="section-header-center">
                            <h2>בואו נתחיל</h2>
                            <div className="header-underline"></div>
                            <p>השאירו פרטים ואחזור אליכם בהקדם</p>
                        </div>

                        <div className="contact-wrapper">
                            <div className="contact-info-cards">
                                <a href={`tel:${contactInfo.phone}`} className="contact-info-card" data-aos="fade-up">
                                    <FaPhone />
                                    <span className="label">טלפון</span>
                                    <span className="value">{contactInfo.phone}</span>
                                </a>
                                <a href={`https://wa.me/${contactInfo.whatsapp}`} className="contact-info-card whatsapp" target="_blank" rel="noopener noreferrer" data-aos="fade-up" data-aos-delay="100">
                                    <FaWhatsapp />
                                    <span className="label">וואטסאפ</span>
                                    <span className="value">שלחו הודעה</span>
                                </a>
                                <a href={`mailto:${contactInfo.email}`} className="contact-info-card" data-aos="fade-up" data-aos-delay="200">
                                    <FaEnvelope />
                                    <span className="label">אימייל</span>
                                    <span className="value">{contactInfo.email}</span>
                                </a>
                            </div>

                            <div className="contact-form-card" data-aos="fade-up" data-aos-delay="300">
                                <form className="online-form" ref={form} onSubmit={handleSubmit} noValidate>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label htmlFor="user_name">שם מלא *</label>
                                            <input
                                                type="text"
                                                id="user_name"
                                                name="user_name"
                                                value={formData.user_name}
                                                onChange={handleChange}
                                                className={formErrors.user_name ? 'error' : ''}
                                                placeholder="שם מלא"
                                            />
                                            {formErrors.user_name && (
                                                <div className="error-message">
                                                    <FaExclamationCircle />
                                                    <span>{formErrors.user_name}</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="user_phone">טלפון</label>
                                            <input
                                                type="tel"
                                                id="user_phone"
                                                name="user_phone"
                                                value={formData.user_phone}
                                                onChange={handleChange}
                                                className={formErrors.user_phone ? 'error' : ''}
                                                placeholder="מספר טלפון"
                                            />
                                            {formErrors.user_phone && (
                                                <div className="error-message">
                                                    <FaExclamationCircle />
                                                    <span>{formErrors.user_phone}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="user_email">אימייל *</label>
                                        <input
                                            type="email"
                                            id="user_email"
                                            name="user_email"
                                            value={formData.user_email}
                                            onChange={handleChange}
                                            className={formErrors.user_email ? 'error' : ''}
                                            placeholder="דוגמה: name@example.com"
                                        />
                                        {formErrors.user_email && (
                                            <div className="error-message">
                                                <FaExclamationCircle />
                                                <span>{formErrors.user_email}</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="message">הודעה *</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows="4"
                                            className={formErrors.message ? 'error' : ''}
                                            placeholder="ספרו לי קצת על עצמכם ועל מה שתרצו לטפל"
                                        ></textarea>
                                        {formErrors.message && (
                                            <div className="error-message">
                                                <FaExclamationCircle />
                                                <span>{formErrors.message}</span>
                                            </div>
                                        )}
                                    </div>

                                    <button type="submit" className={`submit-btn ${loading ? 'loading' : ''}`} disabled={loading}>
                                        {loading ? 'שולח...' : 'שליחה'}
                                        <FaArrowLeft className="btn-icon" />
                                    </button>

                                    {success && <div className="feedback success"><FaCheckCircle /> ההודעה נשלחה בהצלחה! אחזור אליכם בהקדם.</div>}
                                    {error && <div className="feedback error">אירעה שגיאה בשליחה. נסו שוב או צרו קשר בטלפון.</div>}
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div >
        </>
    );
};

export default OnlineTherapy;

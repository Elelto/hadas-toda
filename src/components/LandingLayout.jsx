import React, { useEffect } from 'react';
import { 
  Home, Clock, Target, Award, MonitorPlay, Video, Users, CheckCircle, Activity, Heart,
  PhoneOff, AlertCircle, TrendingDown, MicOff, Battery, Briefcase, Smile, Coffee, Wind,
  MessageCircle, MessageSquare, HelpCircle, Frown, User
} from 'lucide-react';
import SEOHead from './SEOHead';
import StructuredData from './StructuredData';
import SmartLeadForm from './SmartLeadForm';
import '../styles/landing-page.css';
import { getExperienceYearsLabel } from '../utils/experience';

const iconMap = {
  Home, Clock, Target, Award, MonitorPlay, Video, Users, CheckCircle, Activity, Heart,
  PhoneOff, AlertCircle, TrendingDown, MicOff, Battery, Briefcase, Smile, Coffee, Wind,
  MessageCircle, MessageSquare, HelpCircle, Frown, User
};

const LandingLayout = ({ pageData, variant = 'A' }) => {
  const experienceYearsLabel = getExperienceYearsLabel();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pageData.slug]);

  // Set the data-page attribute for CSS variables
  useEffect(() => {
    document.body.setAttribute('data-page', pageData.slug);
    document.body.setAttribute('data-variant', variant);
    return () => {
      document.body.removeAttribute('data-page');
      document.body.removeAttribute('data-variant');
    };
  }, [pageData.slug, variant]);

  if (!pageData) return null;

  const heroData = pageData.heroVariants && pageData.heroVariants[variant]
    ? { ...pageData.hero, ...pageData.heroVariants[variant] }
    : pageData.hero;

  return (
    <div className="landing-page-wrapper" dir="rtl">
      <SEOHead 
        title={pageData.seo.title}
        description={pageData.seo.description}
        keywords={pageData.seo.keywords}
        canonicalUrl={`/landing/${pageData.slug}/variant-${variant.toLowerCase()}`}
      />
      <StructuredData type="landingPage" pageData={pageData} />

      {/* Mini Header */}
      <header className="mini-header">
        <div className="header-container">
          <a href="/" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img src="/images/logo.png" alt="הדס תודה - לוגו" style={{ height: '35px', width: 'auto' }} />
            <span>הדס תודה <span className="logo-dot"></span></span>
          </a>
          <a href="tel:050-6796209" className="header-phone-btn" data-cta-name={`שיחת ייעוץ מהירה - נתב עליון - ${pageData.slug}`}>
            <span>📞 חייגו</span>
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-blob hero-blob-1"></div>
        <div className="hero-blob hero-blob-2"></div>
        <div className="hero-container">
          <div className="hero-content">
            <div className="trust-badge-hero">
              <span className="icon-badge">★</span>
              <span>{heroData.trustBadge}</span>
            </div>
            {/* The hero title supports HTML for <br/> */}
            <h1 className="hero-title" dangerouslySetInnerHTML={{ __html: heroData.title }}></h1>
            <p className="hero-subtitle">{heroData.subtitle}</p>
            <div className="hero-cta-group">
              <a href="#consultation-form" className="btn btn-primary" data-cta data-cta-name={heroData.ctaName}>
                {heroData.ctaPrimary}
              </a>
            </div>
          </div>
          <div className="hero-visual">
            <div className="shape-morph"></div>
            <div className="floating-badge badge-top-left">
              <span className="num" id="dynamic-experience">{experienceYearsLabel}</span>
              <span className="lbl">שנות ניסיון</span>
            </div>
            <div className="floating-badge badge-bottom-right">
              <span className="num">♡</span>
              <span class="lbl">ליווי אישי</span>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Identification Section */}
      <section className="section bg-light">
        <div className="container">
          <div className="section-header">
            <div className="line-decor"></div>
            <h2>{pageData.problems.title}</h2>
            <p>{pageData.problems.subtitle}</p>
          </div>

          <div className="problem-grid sticky-stack-container">
            {pageData.problems.items.map((prob, idx) => {
              const IconComp = iconMap[prob.icon] || AlertCircle;
              return (
                <div className="problem-card sticky-stack-card" key={idx} style={{ '--index': idx }}>
                  <div className="problem-icon" style={{ color: 'var(--primary-dark)', background: 'rgba(109, 89, 122, 0.08)' }}>
                    <IconComp size={24} />
                  </div>
                  <h3>{prob.title}</h3>
                  <p>{prob.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {pageData.testimonials && pageData.testimonials.items.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-header">
              <div className="line-decor"></div>
              <h2>{pageData.testimonials.title}</h2>
              <p>{pageData.testimonials.subtitle}</p>
            </div>

            <div className="fade-mask-wrapper">
              <div className="testimonials-grid carousel-mobile">
                {pageData.testimonials.items.map((test, idx) => (
                  <div className="testimonial-card" key={idx}>
                    <div className="stars-rating">★★★★★</div>
                    <div className="quote-bubble" dangerouslySetInnerHTML={{ __html: `"${test.text}"` }}>
                    </div>
                    <div className="author-info">
                      <div className="author-avatar">{test.initial}</div>
                      <div className="author-meta">
                        <h4>{test.name}</h4>
                        <span>{test.location}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Repeated CTA Section */}
      <section className="repeated-cta-strip">
        <div className="container" style={{ textAlign: 'center' }}>
          <h3 style={{ marginBottom: '1.5rem', color: 'var(--primary-dark)', fontSize: '1.8rem' }}>
            הגיע הזמן לדבר בקלות ובנוחות מהבית
          </h3>
          <a href="#consultation-form" className="btn btn-primary" data-cta data-cta-name={`CTA תחתון - ${pageData.slug}`}>
            בדקו התאמה לטיפול אונליין
          </a>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section bg-light">
        <div className="container">
          <div className="section-header">
            <div className="line-decor"></div>
            <h2>{pageData.benefits.title}</h2>
            <p>{pageData.benefits.subtitle}</p>
          </div>

          <div className="benefits-grid sticky-stack-container">
            {pageData.benefits.items.map((ben, idx) => {
              const IconComp = iconMap[ben.icon] || CheckCircle;
              return (
                <div className="benefit-card sticky-stack-card" key={idx} style={{ '--index': idx }}>
                  <div className="benefit-icon">
                    <IconComp size={32} />
                  </div>
                  <h3>{ben.title}</h3>
                  <p>{ben.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Smart Form Section */}
      <section className="section" id="consultation-form">
        <div className="container">
          <div className="section-header">
            <div className="line-decor"></div>
            <h2>השאירו פרטים לשיחת ייעוץ</h2>
            <p>מלאו את הפרטים הבאים ונחזור אליכם תוך 24 שעות עם מידע מותאם אישית.</p>
          </div>
          
          <div className="form-container" style={{ maxWidth: '680px', margin: '0 auto', background: 'white', borderRadius: '24px', padding: '2.5rem', boxShadow: 'var(--shadow-strong)' }}>
            <SmartLeadForm 
              subject={pageData.formLogic.subject}
              formLogic={pageData.formLogic}
              ctaName={`טופס חכם - ${pageData.slug}`}
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      {pageData.faqs && pageData.faqs.length > 0 && (
        <section className="faq-section" style={{ padding: '4rem 0', background: '#f7f5fa' }}>
          <div className="container" style={{ maxWidth: '800px' }}>
            <div className="section-header">
              <div className="line-decor"></div>
              <h2>שאלות נפוצות</h2>
              <p>כל מה שחשוב לדעת על תהליך הטיפול וההתאמה אליכם</p>
            </div>
            
            <div className="faq-container">
              {pageData.faqs.map((faq, idx) => (
                <details key={idx} style={{ background: 'white', marginBottom: '1rem', borderRadius: '12px', padding: '1.2rem', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
                  <summary style={{ fontWeight: '600', cursor: 'pointer', color: 'var(--primary-dark)', outline: 'none' }}>
                    {faq.question}
                  </summary>
                  <div style={{ marginTop: '1rem', color: 'var(--dark-light)', lineHeight: '1.6' }}>
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>

            {/* Removed WhatsApp CTA per user request */}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="landing-footer" style={{ background: 'var(--primary-dark)', color: 'white', padding: '2.5rem 0', textAlign: 'center' }}>
        <div className="container">
          <div style={{ fontSize: '1.3rem', fontWeight: '600', marginBottom: '1rem' }}>הדס תודה - קלינאית תקשורת</div>
          <a href="tel:050-6796209" style={{ color: 'white', textDecoration: 'none', display: 'block', marginBottom: '1.5rem', fontSize: '1.1rem' }}>050-6796209</a>
          <div style={{ opacity: '0.7', fontSize: '0.9rem' }}>
            &copy; {new Date().getFullYear()} הדס תודה. כל הזכויות שמורות. קליניקה לטיפול שפה ודיבור אונליין.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingLayout;

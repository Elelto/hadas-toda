import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import heroImage from '../assets/logo.png'; // יש להחליף בתמונה מתאימה
import SoundWaves from '../components/SoundWaves';
import '../styles/home.css';
import blogPosts from '../data/blogPosts';

export default function Home() {
  // תחומי טיפול
  // תחומי טיפול עדכניים
  const treatmentAreas = [
    'טיפול בצרידות ובעיות קול',
    'שיקום קולי מקצועי',
    'ליווי קולי (מורים, מרצים)',
    'אבחון וטיפול בעיכוב שפתי',
    'טיפול בשיבושי היגוי',
    'שיפור יכולות ארגון מסר ושליפה',
    'הכנה לכיתה א\' – היבטים שפתיים ותקשורתיים'
  ];

  const counterRefs = useRef([]);

  // Counter animation function
  const animateCounter = (element, target, duration = 2500) => {
    const startTime = performance.now();
    let lastValue = 0;
    
    // Smoother easing function
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
    
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Apply easing
      const easedProgress = easeOutCubic(progress);
      const rawValue = easedProgress * target;
      
      // Smooth interpolation to avoid jumps
      const currentValue = Math.round(rawValue);
      
      // Only update if value changed to avoid flickering
      if (currentValue !== lastValue || progress >= 1) {
        lastValue = currentValue;
        
        // Handle different number formats
        if (target === 10) {
          element.textContent = currentValue + '+';
        } else if (target === 100) {
          element.textContent = currentValue + '+';
        } else if (target === 'MA') {
          element.textContent = 'M.A';
        } else {
          element.textContent = currentValue;
        }
      }
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const targetValue = element.dataset.target;
          
          if (targetValue && !element.classList.contains('animated')) {
            element.classList.add('animated');
            
            if (targetValue === 'MA') {
              // For M.A, just show the text without animation
              element.textContent = 'M.A';
            } else {
              element.textContent = '0'; // Set initial display value to 0
              animateCounter(element, parseInt(targetValue));
            }
          }
        }
      });
    }, { threshold: 0.5 });

    counterRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="home-hero">
        <SoundWaves 
          variant="background" 
          intensity="medium" 
          color="primary" 
          effect="subtle"
          scrollResponsive={true}
        />
        <div className="container">
          <div className="hero-content" data-aos="fade-up">
            <h1 className="hero-title" data-aos="fade-down" data-aos-delay="200">הדס תודה</h1>
            <h2 className="hero-subtitle" data-aos="fade-down" data-aos-delay="400">קלינאית תקשורת מומחית לשפה, דיבור וקול</h2>
            <p className="hero-description" data-aos="fade-up" data-aos-delay="600">
              נעים להכיר, אני הדס. אני מלווה ילדים ומבוגרים במסעם לשיפור התקשורת והביטחון העצמי. בין אם מדובר באתגרי שפה והיגוי אצל ילדים, או בצרידות וקשיי קול אצל מבוגרים – אני כאן כדי להקשיב, לאבחן ולהתאים תוכנית טיפול אישית שתביא לתוצאות.
            </p>
            <div className="hero-buttons" data-aos="fade-up" data-aos-delay="800">
              <Link to="/contact" className="btn hero-cta">
                קביעת פגישת ייעוץ
              </Link>
              <Link to="/ai-assessment" className="btn-ai-assessment btn">
                🤖 אבחון ראשוני חכם
                <span className="ai-badge">חדש!</span>
              </Link>
              <Link to="/services" className="btn-secondary btn">
                לגלות עוד על הטיפולים
              </Link>
            </div>
            <div className="hero-highlights" data-aos="fade-up" data-aos-delay="1000">
              <div className="highlight-item">
                <span 
                  className="highlight-number counter" 
                  ref={(el) => counterRefs.current[0] = el}
                  data-target="10"
                >
                  0
                </span>
                <span className="highlight-text">שנות ניסיון</span>
              </div>
              <div className="highlight-item">
                <span 
                  className="highlight-number counter" 
                  ref={(el) => counterRefs.current[1] = el}
                  data-target="100"
                >
                  0
                </span>
                <span className="highlight-text">מטופלים מרוצים</span>
              </div>
              <div className="highlight-item">
                <span 
                  className="highlight-number counter" 
                  ref={(el) => counterRefs.current[2] = el}
                  data-target="MA"
                >
                  0
                </span>
                <span className="highlight-text">תואר שני בקלינאות תקשורת</span>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Testimonials Preview */}
      <section className="home-testimonials">
        <SoundWaves 
          variant="background" 
          intensity="low" 
          color="secondary" 
          effect="subtle"
          scrollResponsive={true}
        />
        <div className="container">
          <h2 className="section-title" data-aos="fade-up">קולות מהקליניקה</h2>
          <p className="section-subtitle" data-aos="fade-up" data-aos-delay="200">מה אומרים המטופלים שלי על הטיפול והתוצאות</p>
          
          <div className="testimonials-carousel">
            <div className="testimonial-card" data-aos="fade-right" data-aos-delay="400">
              <div className="quote">
                "אחרי שנים של צרידות כרונית, הגעתי להדס וסוף סוף מצאתי מענה. הטיפול המקצועי והיחס האישי החזירו לי את הקול ואת שמחת החיים."
                <div className="quote-author">– יעל, מורה</div>
              </div>
            </div>
            
            <div className="testimonial-card" data-aos="fade-left" data-aos-delay="600">
              <div className="quote">
                "הבן שלי התקשה מאוד עם היגוי נכון של הרבה צלילים. אחרי מספר חודשים עם הדס, השיפור היה מדהים. היא ידעה בדיוק איך לגשת אליו ולגרום לו לשתף פעולה."
                <div className="quote-author">– רונית, אמא לילד בן 5</div>
              </div>
            </div>
          </div>
          
          <div className="testimonials-cta" data-aos="fade-up" data-aos-delay="800">
            <Link to="/testimonials" className="btn-secondary btn">
              עוד סיפורי הצלחה
            </Link>
          </div>
        </div>
      </section>


      {/* Treatment Areas */}
      <section className="home-services">
        <SoundWaves 
          variant="background" 
          intensity="low" 
          color="accent" 
          effect="subtle"
          scrollResponsive={true}
        />
        <div className="container">
          <h2 className="section-title" data-aos="fade-up">תחומי המומחיות שלי</h2>
          <p className="section-subtitle" data-aos="fade-up" data-aos-delay="200">מגוון השירותים המקצועיים שאני מציעה לילדים ומבוגרים</p>
          
          <div className="services-categories">
            <div className="service-category" data-aos="fade-right" data-aos-delay="400">
              <h3 className="category-title">שירותי קול</h3>
              <div className="treatment-areas-grid">
                <div className="treatment-area-item">
                  <span className="treatment-icon">🗣️</span>
                  טיפול בצרידות ובעיות קול
                </div>
                <div className="treatment-area-item">
                  <span className="treatment-icon">🎭</span>
                  שיקום קולי מקצועי
                </div>
                <div className="treatment-area-item">
                  <span className="treatment-icon">🎤</span>
                  ליווי קולי (מורים, מרצים)
                </div>
              </div>
            </div>
            
            <div className="service-category" data-aos="fade-left" data-aos-delay="600">
              <h3 className="category-title">שירותי שפה ודיבור</h3>
              <div className="treatment-areas-grid">
                <div className="treatment-area-item">
                  <span className="treatment-icon">📊</span>
                  אבחון וטיפול בעיכוב שפתי
                </div>
                <div className="treatment-area-item">
                  <span className="treatment-icon">🔤</span>
                  טיפול בשיבושי היגוי
                </div>
                <div className="treatment-area-item">
                  <span className="treatment-icon">🧩</span>
                  שיפור יכולות ארגון מסר ושליפה
                </div>
                <div className="treatment-area-item">
                  <span className="treatment-icon">✏️</span>
                  הכנה לכיתה א׳ – היבטים שפתיים ותקשורתיים
                </div>
              </div>
            </div>
          </div>
          
          <div className="services-cta" data-aos="fade-up" data-aos-delay="800">
            <Link to="/services" className="btn-secondary btn">
              פירוט נוסף על הטיפולים
            </Link>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="home-quote">
        <div className="container">
          <div className="quote-wrapper" data-aos="zoom-in">
            <div className="quote-decoration left"></div>
            <div className="quote">
              "קול הוא הגשר בין הנשמה לעולם."
              <div className="quote-author"></div>
            </div>
            <div className="quote-decoration right"></div>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="home-about">
        <div className="container">
          <h2 className="section-title" data-aos="fade-up">נעים להכיר, אני הדס</h2>
          <div className="about-preview" data-aos="fade-up" data-aos-delay="200">
            <p>
              שמי הדס תודה, קלינאית תקשורת (M.A) עם תשוקה אמיתית לעזור לאנשים למצוא את קולם – תרתי משמע. אני מאמינה שביכולתה של תקשורת טובה לפתוח דלתות, לבנות גשרים ולהעצים כל אדם.
            </p>
            <p>
              הניסיון שלי כולל עבודה עם מגוון רחב של גילאים ואתגרים: החל מליווי התפתחותי של ילדים בתחומי השפה והדיבור, דרך טיפול בקשיי היגוי ושטף, ועד להתמחות מעמיקה באבחון וטיפול בבעיות קול וצרידות אצל ילדים ומבוגרים.
            </p>
            <p>
              בקליניקה שלי, כל מטופל מקבל יחס אישי ותוכנית טיפול המותאמת בדיוק עבורו. אני משלבת ידע מקצועי עדכני עם גישה יצירתית ורגישה, כדי להפוך את התהליך הטיפולי לחוויה חיובית ומקדמת.
            </p>
            <div className="about-cta" data-aos="fade-up" data-aos-delay="400">
              <Link to="/about" className="btn-secondary btn">
                קראו עוד על הגישה שלי
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Blog Preview */}
      <section className="home-blog">
        <div className="container">
          <h2 className="section-title" data-aos="fade-up">הבלוג המקצועי</h2>
          <p className="section-subtitle" data-aos="fade-up" data-aos-delay="200">מאמרים, טיפים וחידושים בתחום קלינאות התקשורת</p>
          
          <div className="blog-preview-grid">
            {blogPosts.slice(0, 3).map((post, index) => (
              <div className="blog-preview-card" key={post.id} data-aos="fade-up" data-aos-delay={400 + (index * 200)}>
                <div className="blog-preview-image">
                  <img src={post.image} alt={post.title} />
                  {post.categories.map(cat => (
                    <span key={cat} className={`blog-category ${cat}`}>
                      {cat === 'voice' && 'קול'}
                      {cat === 'speech' && 'דיבור'}
                      {cat === 'language' && 'שפה'}
                      {cat === 'children' && 'ילדים'}
                      {cat === 'adults' && 'מבוגרים'}
                    </span>
                  ))}
                </div>
                <div className="blog-preview-content">
                  <h3 className="blog-preview-title">{post.title}</h3>
                  <p className="blog-preview-date">{post.date}</p>
                  <p className="blog-preview-excerpt">{post.excerpt}</p>
                  <Link to={`/blog/${post.slug}`} className="blog-read-more">
                    המשך קריאה
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="blog-preview-cta" data-aos="fade-up" data-aos-delay="800">
            <Link to="/blog" className="btn-secondary btn">
              לכל המאמרים בבלוג
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

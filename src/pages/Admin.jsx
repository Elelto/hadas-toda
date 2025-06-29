import React, { useState, useEffect } from 'react';
import '../styles/global.css';
import '../styles/admin.css';
import netlifyIdentity from 'netlify-identity-widget';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [blogPosts, setBlogPosts] = useState([]);
  const [treatments, setTreatments] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  // Initialize Netlify Identity
  useEffect(() => {
    netlifyIdentity.init();
  }, []);

  // Handle Netlify Identity authentication
  const handleLogin = () => {
    netlifyIdentity.open();
    netlifyIdentity.on('login', (user) => {
      setUser(user);
      setIsAuthenticated(true);
      netlifyIdentity.close();
    });
    netlifyIdentity.on('error', (err) => {
      setError('שגיאת התחברות: ' + err.message);
    });
  };

  useEffect(() => {
    // Check if user is already authenticated with Netlify Identity
    const currentUser = netlifyIdentity.currentUser();
    if (currentUser) {
      setUser(currentUser);
      setIsAuthenticated(true);
    }
    
    // Mock data for demonstration
    setBlogPosts([
      { id: 1, title: 'שיקום תקשורת לאחר שבץ', date: '2025-04-10', status: 'פורסם' },
      { id: 2, title: 'עיכוב התפתחות שפה', date: '2025-04-20', status: 'פורסם' },
      { id: 3, title: 'דיסלקציה - מעבר לקשיי קריאה', date: '2025-05-15', status: 'פורסם' }
    ]);
    
    setTreatments([
      { id: 1, title: 'טיפול בהפרעות שפה', active: true },
      { id: 2, title: 'טיפול בגמגום', active: true },
      { id: 3, title: 'שיקום לאחר שבץ', active: true }
    ]);
    
    setTestimonials([
      { id: 1, author: 'דני כהן', content: 'הטיפול עם הדס שינה את חיי לחלוטין', active: true },
      { id: 2, author: 'מיכל לוי', content: 'הדס היא מטפלת מקצועית ומסורה', active: true }
    ]);
  }, []);

  const handleLogout = () => {
    netlifyIdentity.logout();
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>אזור ניהול</h1>
      </div>
      
      {!isAuthenticated ? (
        <div className="login-form">
          <h2>התחברות לאזור הניהול</h2>
          {error && <p className="error-message">{error}</p>}
          <p>כדי להיכנס לאזור הניהול, יש להתחבר באמצעות חשבון מנהל מאושר.</p>
          <button 
            onClick={handleLogin} 
            className="btn btn-primary"
            style={{ marginTop: '20px' }}
          >
            התחבר עם Netlify Identity
          </button>
        </div>
      ) : (
        <div className="admin-dashboard">
          <div className="admin-welcome">
            <h2>ברוכים הבאים לאזור הניהול, {user?.user_metadata?.full_name || user?.email || 'מנהל'}</h2>
            <button 
              onClick={handleLogout}
              className="btn btn-danger"
            >
              התנתק
            </button>
          </div>
          
          <div className="tabs">
            <button 
              className={`tab ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              לוח בקרה
            </button>
            <button 
              className={`tab ${activeTab === 'blog' ? 'active' : ''}`}
              onClick={() => setActiveTab('blog')}
            >
              ניהול בלוג
            </button>
            <button 
              className={`tab ${activeTab === 'treatments' ? 'active' : ''}`}
              onClick={() => setActiveTab('treatments')}
            >
              ניהול טיפולים
            </button>
            <button 
              className={`tab ${activeTab === 'testimonials' ? 'active' : ''}`}
              onClick={() => setActiveTab('testimonials')}
            >
              ניהול המלצות
            </button>
          </div>
          
          <div className="tab-content">
            {activeTab === 'dashboard' && (
              <div className="admin-sections">
                <div className="admin-section" onClick={() => setActiveTab('blog')}>
                  <div className="admin-section-icon">📝</div>
                  <h3>ניהול בלוג</h3>
                  <p>ניהול {blogPosts.length} פוסטים בבלוג</p>
                </div>
                
                <div className="admin-section" onClick={() => setActiveTab('treatments')}>
                  <div className="admin-section-icon">🤲</div>
                  <h3>ניהול טיפולים</h3>
                  <p>ניהול {treatments.length} טיפולים</p>
                </div>
                
                <div className="admin-section" onClick={() => setActiveTab('testimonials')}>
                  <div className="admin-section-icon">💬</div>
                  <h3>ניהול המלצות</h3>
                  <p>ניהול {testimonials.length} המלצות</p>
                </div>
              </div>
            )}
            
            {activeTab === 'blog' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <h3>ניהול פוסטים בבלוג</h3>
                  <button className="btn btn-primary">הוסף פוסט חדש</button>
                </div>
                
                {blogPosts.map(post => (
                  <div key={post.id} className="blog-post-item">
                    <div>
                      <strong>{post.title}</strong>
                      <div>תאריך: {post.date} | סטטוס: {post.status}</div>
                    </div>
                    <div className="blog-post-actions">
                      <button className="btn btn-primary btn-sm">ערוך</button>
                      <button className="btn btn-danger btn-sm">מחק</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {activeTab === 'treatments' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <h3>ניהול טיפולים</h3>
                  <button className="btn btn-primary">הוסף טיפול חדש</button>
                </div>
                
                {treatments.map(treatment => (
                  <div key={treatment.id} className="blog-post-item">
                    <div>
                      <strong>{treatment.title}</strong>
                      <div>סטטוס: {treatment.active ? 'פעיל' : 'לא פעיל'}</div>
                    </div>
                    <div className="blog-post-actions">
                      <button className="btn btn-primary btn-sm">ערוך</button>
                      <button className="btn btn-danger btn-sm">מחק</button>
                      <button className="btn btn-sm" style={{backgroundColor: treatment.active ? '#e67e22' : '#2ecc71', color: 'white'}}>
                        {treatment.active ? 'השבת' : 'הפעל'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {activeTab === 'testimonials' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <h3>ניהול המלצות</h3>
                  <button className="btn btn-primary">הוסף המלצה חדשה</button>
                </div>
                
                {testimonials.map(testimonial => (
                  <div key={testimonial.id} className="blog-post-item">
                    <div>
                      <strong>{testimonial.author}</strong>
                      <div>"{testimonial.content}"</div>
                    </div>
                    <div className="blog-post-actions">
                      <button className="btn btn-primary btn-sm">ערוך</button>
                      <button className="btn btn-danger btn-sm">מחק</button>
                      <button className="btn btn-sm" style={{backgroundColor: testimonial.active ? '#e67e22' : '#2ecc71', color: 'white'}}>
                        {testimonial.active ? 'השבת' : 'הפעל'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;

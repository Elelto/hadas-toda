import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, setDoc, deleteDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db, storage } from '../services/firebase';
import Auth from '../components/admin/Auth';
import { loadFirebaseContent, loadFirebaseCollection } from '../utils/firebaseLoader';
import { migrateDataToFirebase } from '../utils/migrateData';
import { 
  FaChartBar, FaFileAlt, FaPenSquare, FaCog, FaSignOutAlt, 
  FaComments, FaRocket, FaTrash, FaEdit, FaPlus, 
  FaSave, FaCamera, FaImage, FaTimes, FaUser, FaFilePdf 
} from 'react-icons/fa';
import { convertPdfToImage } from '../utils/pdfToImage';
import '../styles/admin.css';
import '../styles/admin-ux.css';

const Admin = () => {
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' }); // type: 'success' | 'error'

  // Migration State
  const [migrating, setMigrating] = useState(false);
  const [migrationLogs, setMigrationLogs] = useState([]);

  // Data States
  const [blogPosts, setBlogPosts] = useState([]);
  const [editingBlogPost, setEditingBlogPost] = useState(null); // null, 'new', or post object
  const [editingPage, setEditingPage] = useState('home'); // 'home', 'about', 'services', 'contact', 'testimonials'
  const [pageData, setPageData] = useState(null);
  const [componentData, setComponentData] = useState(null);
  const [editingComponent, setEditingComponent] = useState('header'); // 'header', 'footer'

  // Stats for Dashboard
  const [stats, setStats] = useState({ postsCount: 0, testimonialsCount: 0 });

  // 1. Auth check
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setCheckingAuth(false);
    });
    return unsubscribe;
  }, []);

  // Fetch stats and blog posts when authenticated
  useEffect(() => {
    if (user) {
      fetchBlogPosts();
      fetchTestimonialsCount();
    }
  }, [user]);

  const fetchBlogPosts = async () => {
    setLoading(true);
    const posts = await loadFirebaseCollection('blog', 'date', 'desc');
    setBlogPosts(posts);
    setStats(prev => ({ ...prev, postsCount: posts.length }));
    setLoading(false);
  };

  const fetchTestimonialsCount = async () => {
    const tData = await loadFirebaseContent('pages', 'testimonials');
    if (tData && tData.images) {
      setStats(prev => ({ ...prev, testimonialsCount: tData.images.length }));
    }
  };

  // Load page data when changing page tab or page selection
  useEffect(() => {
    if (user && activeTab === 'pages') {
      loadPageToEdit(editingPage);
    }
  }, [user, activeTab, editingPage]);

  // Load component data when changing component tab
  useEffect(() => {
    if (user && activeTab === 'components') {
      loadComponentToEdit(editingComponent);
    }
  }, [user, activeTab, editingComponent]);

  const loadPageToEdit = async (pageId) => {
    setLoading(true);
    const data = await loadFirebaseContent('pages', pageId);
    setPageData(data || {});
    setLoading(false);
  };

  const loadComponentToEdit = async (compId) => {
    setLoading(true);
    const data = await loadFirebaseContent('components', compId);
    setComponentData(data || {});
    setLoading(false);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const showMsg = (text, type = 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 5000);
  };

  // 2. Migration Trigger
  const runMigration = async () => {
    if (!window.confirm('האם את/ה בטוח/ה שברצונך להעביר את כל קבצי ה-YAML וה-Markdown המקומיים ל-Firebase? פעולה זו תדרוס נתונים קיימים ב-Firebase.')) {
      return;
    }
    setMigrating(true);
    setMigrationLogs([]);
    try {
      await migrateDataToFirebase((logs) => {
        setMigrationLogs(logs);
      });
      showMsg('המיגרציה הושלמה בהצלחה!');
      fetchBlogPosts();
      fetchTestimonialsCount();
    } catch (error) {
      showMsg('שגיאה במיגרציה: ' + error.message, 'error');
    } finally {
      setMigrating(false);
    }
  };

  // 3. Image Upload Utility
  // 3. Image/Document Upload Utility
  const handleImageUpload = async (e, onUrlObtained, allowPdfConversion = false) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    showMsg('מעלה קובץ...', 'success');
    try {
      if (allowPdfConversion && file.type === 'application/pdf') {
        showMsg('ממיר PDF לתמונה...', 'success');
        
        // Upload original PDF
        const pdfRef = ref(storage, `uploads/${Date.now()}_${file.name}`);
        const pdfSnap = await uploadBytes(pdfRef, file);
        const documentUrl = await getDownloadURL(pdfSnap.ref);
        
        // Convert to JPG and upload
        const jpgFile = await convertPdfToImage(file);
        const jpgRef = ref(storage, `uploads/${Date.now()}_${jpgFile.name}`);
        const jpgSnap = await uploadBytes(jpgRef, jpgFile);
        const imageUrl = await getDownloadURL(jpgSnap.ref);
        
        onUrlObtained({ image: imageUrl, document: documentUrl });
        showMsg('ה-PDF הועלה והומר לתמונה בהצלחה!');
      } else {
        const fileRef = ref(storage, `uploads/${Date.now()}_${file.name}`);
        const snapshot = await uploadBytes(fileRef, file);
        const url = await getDownloadURL(snapshot.ref);
        onUrlObtained(allowPdfConversion ? { image: url } : url);
        showMsg('הקובץ הועלה בהצלחה!');
      }
    } catch (err) {
      console.error('Upload error:', err);
      showMsg('שגיאה בהעלאת הקובץ: ' + err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  // 4. Save Page changes
  const savePageData = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await setDoc(doc(db, 'pages', editingPage), pageData);
      showMsg('העמוד עודכן בהצלחה!');
    } catch (err) {
      showMsg('שגיאה בשמירת העמוד: ' + err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  // 5. Save Component changes
  const saveComponentData = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await setDoc(doc(db, 'components', editingComponent), componentData);
      showMsg('הרכיב עודכן בהצלחה!');
    } catch (err) {
      showMsg('שגיאה בשמירת הרכיב: ' + err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  // 6. Save/Delete Blog Post
  const saveBlogPost = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Validate slug
      if (!editingBlogPost.slug || !/^[a-z0-9-]+$/.test(editingBlogPost.slug)) {
        showMsg('ה-Slug באנגלית חייב להכיל אותיות קטנות, מספרים ומקפים בלבד (למשל: speech-therapy).', 'error');
        setLoading(false);
        return;
      }

      // Format Hebrew Date for display based on YYYY-MM-DD
      const dateParts = editingBlogPost.date.split('-');
      let formattedDate = editingBlogPost.formattedDate || '';
      if (dateParts.length === 3) {
        const months = ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'];
        const day = parseInt(dateParts[2], 10);
        const month = months[parseInt(dateParts[1], 10) - 1];
        const year = dateParts[0];
        formattedDate = `${day} ב${month} ${year}`;
      }

      const postPayload = {
        ...editingBlogPost,
        formattedDate,
        createdAt: editingBlogPost.createdAt || new Date().toISOString()
      };

      await setDoc(doc(db, 'blog', editingBlogPost.slug), postPayload);
      showMsg('הפוסט נשמר בהצלחה!');
      setEditingBlogPost(null);
      fetchBlogPosts();
    } catch (err) {
      showMsg('שגיאה בשמירת הפוסט: ' + err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const deleteBlogPost = async (slug) => {
    if (!window.confirm('האם את/ה בטוח/ה שברצונך למחוק פוסט זה?')) return;
    setLoading(true);
    try {
      await deleteDoc(doc(db, 'blog', slug));
      showMsg('הפוסט נמחק בהצלחה!');
      fetchBlogPosts();
    } catch (err) {
      showMsg('שגיאה במחיקת הפוסט: ' + err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  if (checkingAuth) {
    return (
      <div className="admin-login-wrapper">
        <div className="login-card" style={{ textAlign: 'center' }}>
          <h2>טוען...</h2>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Auth onLoginSuccess={(u) => setUser(u)} />;
  }

  return (
    <div className="admin-container">
      <div className="admin-dashboard-layout">
        
        {/* Sidebar */}
        <aside className="admin-sidebar">
          <div className="sidebar-logo">
            <img src="/favicon/logo.png" alt="לוגו" onError={(e) => e.target.style.display = 'none'} />
            <h2>הדס תודה</h2>
          </div>
          <nav>
            <ul className="sidebar-menu">
              <li>
                <button 
                  className={`sidebar-item-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
                  onClick={() => { setActiveTab('dashboard'); setEditingBlogPost(null); }}
                >
                  <FaChartBar className="sidebar-item-icon" />
                  <span>לוח בקרה</span>
                </button>
              </li>
              <li>
                <button 
                  className={`sidebar-item-btn ${activeTab === 'pages' ? 'active' : ''}`}
                  onClick={() => { setActiveTab('pages'); setEditingBlogPost(null); }}
                >
                  <FaFileAlt className="sidebar-item-icon" />
                  <span>עריכת עמודי האתר</span>
                </button>
              </li>
              <li>
                <button 
                  className={`sidebar-item-btn ${activeTab === 'blog' ? 'active' : ''}`}
                  onClick={() => { setActiveTab('blog'); }}
                >
                  <FaPenSquare className="sidebar-item-icon" />
                  <span>ניהול בלוג</span>
                </button>
              </li>
              <li>
                <button 
                  className={`sidebar-item-btn ${activeTab === 'components' ? 'active' : ''}`}
                  onClick={() => { setActiveTab('components'); setEditingBlogPost(null); }}
                >
                  <FaCog className="sidebar-item-icon" />
                  <span>תפריטים ותחתית</span>
                </button>
              </li>
            </ul>
          </nav>
          <div className="sidebar-footer">
            <button onClick={handleLogout} className="btn-logout">
              <FaSignOutAlt className="btn-icon" style={{ marginLeft: '6px' }} />
              התנתק מהמערכת
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="admin-main-content">
          
          {/* Top Bar */}
          <div className="admin-top-bar">
            <h1>אזור ניהול האתר</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div className="admin-user-menu">
                <FaUser style={{ marginLeft: '8px', color: 'var(--primary)' }} />
                <span className="admin-username">{user.email}</span>
              </div>
              <button onClick={handleLogout} className="btn-logout mobile-logout-btn" title="התנתק מהמערכת">
                <FaSignOutAlt className="btn-icon" />
              </button>
            </div>
          </div>

          {/* Toast Message */}
          {message.text && (
            <div 
              className={`login-error ${message.type === 'error' ? '' : 'success'}`} 
              role="alert" 
              aria-live="assertive"
              style={{ 
                borderColor: message.type === 'error' ? 'var(--blush)' : '#2e7d32',
                backgroundColor: message.type === 'error' ? 'rgba(180, 68, 112, 0.1)' : '#e8f5e9',
                color: message.type === 'error' ? 'var(--blush)' : '#2e7d32'
              }}
            >
              <span>{message.type === 'error' ? '⚠️' : '✅'}</span>
              <span>{message.text}</span>
            </div>
          )}

          {/* TAB: Dashboard Summary */}
          {activeTab === 'dashboard' && (
            <div>
              <div className="admin-grid">
                <div className="widget-card" onClick={() => setActiveTab('blog')}>
                  <div className="widget-icon-wrapper">
                    <FaPenSquare />
                  </div>
                  <div className="widget-info">
                    <h3>פוסטים בבלוג</h3>
                    <div className="widget-value">{stats.postsCount}</div>
                  </div>
                </div>
                <div className="widget-card" onClick={() => { setActiveTab('pages'); setEditingPage('testimonials'); }}>
                  <div className="widget-icon-wrapper">
                    <FaComments />
                  </div>
                  <div className="widget-info">
                    <h3>המלצות באתר</h3>
                    <div className="widget-value">{stats.testimonialsCount}</div>
                  </div>
                </div>
              </div>

              {/* Migration Utility Box */}
              <div className="panel-card" style={{ marginTop: '2rem' }}>
                <div className="panel-header">
                  <h2>סנכרון ראשוני ל-Firebase</h2>
                </div>
                <p style={{ marginBottom: '1.5rem', color: '#666' }}>
                  אם זו הפעם הראשונה שאת/ה מפעיל/ה את המערכת החדשה, לחץ/י על הכפתור למטה כדי להעתיק את כל התוכן הקיים מהקוד ישירות למסד הנתונים של Firebase. זה יבצע העלאה אוטומטית של כל הדפים והבלוגים.
                </p>
                <button 
                  onClick={runMigration} 
                  className="btn-add" 
                  disabled={migrating}
                  style={{ background: migrating ? '#999' : 'linear-gradient(90deg, var(--secondary) 0%, var(--bali-hai) 100%)' }}
                >
                  {migrating ? 'מעביר נתונים...' : (
                    <>
                      <FaRocket className="btn-icon" style={{ marginLeft: '8px' }} />
                      העבר תוכן קיים ל-Firebase
                    </>
                  )}
                </button>

                {migrationLogs.length > 0 && (
                  <div className="migration-log-box">
                    {migrationLogs.map((logLine, idx) => (
                      <div key={idx}>{logLine}</div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB: Pages Content Editing */}
          {activeTab === 'pages' && pageData && (
            <div className="panel-card">
              <div className="panel-header">
                <h2>עריכת תוכן עמודים</h2>
                <select 
                  value={editingPage} 
                  onChange={(e) => setEditingPage(e.target.value)}
                  className="login-input"
                  style={{ width: '220px', marginTop: 0 }}
                >
                  <option value="home">דף הבית</option>
                  <option value="about">דף אודות</option>
                  <option value="services">דף שירותים</option>
                  <option value="contact">דף יצירת קשר</option>
                  <option value="testimonials">דף המלצות ותמונות</option>
                </select>
              </div>

              {loading ? (
                <h3>טוען נתוני עמוד...</h3>
              ) : (
                <form onSubmit={savePageData} className="admin-form">
                  
                  {/* EDIT FORM: HOME PAGE */}
                  {editingPage === 'home' && (
                    <div>
                      <h3>סקציית הגיבור (Hero)</h3>
                      <div className="admin-input-group">
                        <div className="form-group">
                          <label className="form-group-label" htmlFor="admin-field-1">כותרת ראשית</label>
<input id="admin-field-1" 
                            type="text" 
                            className="login-input"
                            value={pageData.hero?.title || ''}
                            onChange={(e) => setPageData({
                              ...pageData,
                              hero: { ...pageData.hero, title: e.target.value }
                            })}
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-group-label" htmlFor="admin-field-2">כותרת משנה</label>
<input id="admin-field-2" 
                            type="text" 
                            className="login-input"
                            value={pageData.hero?.subtitle || ''}
                            onChange={(e) => setPageData({
                              ...pageData,
                              hero: { ...pageData.hero, subtitle: e.target.value }
                            })}
                          />
                        </div>
                      </div>
                      <div className="form-group" style={{ marginTop: '1rem' }}>
                        <label className="form-group-label" htmlFor="admin-field-3">תיאור</label>
<textarea id="admin-field-3" 
                          className="admin-textarea"
                          value={pageData.hero?.description || ''}
                          onChange={(e) => setPageData({
                            ...pageData,
                            hero: { ...pageData.hero, description: e.target.value }
                          })}
                        />
                      </div>
                      <div className="admin-input-group" style={{ marginTop: '1rem' }}>
                        <div className="form-group">
                          <label className="form-group-label" htmlFor="admin-field-4">טקסט כפתור ראשי</label>
<input id="admin-field-4" 
                            type="text" 
                            className="login-input"
                            value={pageData.hero?.cta_text || ''}
                            onChange={(e) => setPageData({
                              ...pageData,
                              hero: { ...pageData.hero, cta_text: e.target.value }
                            })}
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-group-label" htmlFor="admin-field-5">טקסט כפתור שירותים</label>
<input id="admin-field-5" 
                            type="text" 
                            className="login-input"
                            value={pageData.hero?.services_text || ''}
                            onChange={(e) => setPageData({
                              ...pageData,
                              hero: { ...pageData.hero, services_text: e.target.value }
                            })}
                          />
                        </div>
                      </div>

                      <h3 style={{ marginTop: '2rem' }}>סקציית אודות (דף הבית)</h3>
                      <div className="form-group">
                        <label className="form-group-label" htmlFor="admin-field-6">כותרת אודות</label>
<input id="admin-field-6" 
                          type="text" 
                          className="login-input"
                          value={pageData.about?.title || ''}
                          onChange={(e) => setPageData({
                            ...pageData,
                            about: { ...pageData.about, title: e.target.value }
                          })}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-group-label" htmlFor="admin-field-7">פסקה ראשונה</label>
<textarea id="admin-field-7" 
                          className="admin-textarea"
                          value={pageData.about?.paragraph1 || ''}
                          onChange={(e) => setPageData({
                            ...pageData,
                            about: { ...pageData.about, paragraph1: e.target.value }
                          })}
                        />
                      </div>
                    </div>
                  )}

                  {/* EDIT FORM: ABOUT PAGE */}
                  {editingPage === 'about' && (
                    <div>
                      <div className="admin-input-group">
                        <div className="form-group">
                          <label className="form-group-label" htmlFor="admin-field-8">כותרת ראשית</label>
<input id="admin-field-8" 
                            type="text" 
                            className="login-input"
                            value={pageData.title || ''}
                            onChange={(e) => setPageData({ ...pageData, title: e.target.value })}
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-group-label" htmlFor="admin-field-9">כותרת משנה</label>
<input id="admin-field-9" 
                            type="text" 
                            className="login-input"
                            value={pageData.subtitle || ''}
                            onChange={(e) => setPageData({ ...pageData, subtitle: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="form-group" style={{ marginTop: '1rem' }}>
                        <label className="form-group-label" htmlFor="admin-field-10">פסקת פתיחה</label>
<textarea id="admin-field-10" 
                          className="admin-textarea"
                          value={pageData.paragraph1 || ''}
                          onChange={(e) => setPageData({ ...pageData, paragraph1: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-group-label" htmlFor="admin-field-11">פסקה 2</label>
<textarea id="admin-field-11" 
                          className="admin-textarea"
                          value={pageData.paragraph2 || ''}
                          onChange={(e) => setPageData({ ...pageData, paragraph2: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-group-label" htmlFor="admin-field-12">פסקה 3</label>
<textarea id="admin-field-12" 
                          className="admin-textarea"
                          value={pageData.paragraph3 || ''}
                          onChange={(e) => setPageData({ ...pageData, paragraph3: e.target.value })}
                        />
                      </div>

                      <h3 style={{ marginTop: '2rem' }}>הכשרות מקצועיות</h3>
                      <div className="form-group">
                        <label className="form-group-label" htmlFor="admin-field-13">כותרת סקציית הכשרות</label>
<input id="admin-field-13" 
                          type="text" 
                          className="login-input"
                          value={pageData.qualifications_title || ''}
                          onChange={(e) => setPageData({ ...pageData, qualifications_title: e.target.value })}
                        />
                      </div>
                      
                      <div className="admin-items-grid">
                        {(pageData.qualifications || []).map((q, idx) => (
                          <div key={idx} className="admin-card-item">
                            <div className="admin-card-header">
                              <h4>הכשרה #{idx + 1}</h4>
                              <button 
                                type="button" 
                                className="btn-remove-item" aria-label="הסר פריט"
                                onClick={() => {
                                  const newQuals = pageData.qualifications.filter((_, i) => i !== idx);
                                  setPageData({ ...pageData, qualifications: newQuals });
                                }}
                              >
                                <FaTrash />
                              </button>
                            </div>
                            
                            {q.image && (
                              <div className="admin-card-image-preview">
                                <img src={q.image} alt={q.item} />
                                {q.document && <span className="pdf-badge"><FaFilePdf /> PDF מקושר</span>}
                              </div>
                            )}
                            
                            <div className="form-group">
                              <label className="form-group-label" htmlFor="admin-field-14">תיאור ההכשרה</label>
<textarea id="admin-field-14" 
                                className="admin-textarea"
                                rows="3"
                                value={q.item || ''}
                                onChange={(e) => {
                                  const newQuals = [...pageData.qualifications];
                                  newQuals[idx].item = e.target.value;
                                  setPageData({ ...pageData, qualifications: newQuals });
                                }}
                              />
                            </div>
                            
                            <div className="form-group">
                              <label className="form-group-label" htmlFor="admin-field-15">תעודה (תמונה או PDF)</label>
<input id="admin-field-15" 
                                type="file" 
                                accept="image/*,application/pdf"
                                onChange={(e) => handleImageUpload(e, (result) => {
                                  const newQuals = [...pageData.qualifications];
                                  newQuals[idx].image = result.image;
                                  if (result.document) newQuals[idx].document = result.document;
                                  setPageData({ ...pageData, qualifications: newQuals });
                                }, true)}
                                className="file-input"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <button 
                        type="button" 
                        className="btn-add-item"
                        onClick={() => {
                          const newQuals = [...(pageData.qualifications || []), { item: '' }];
                          setPageData({ ...pageData, qualifications: newQuals });
                        }}
                      >
                        <FaPlus className="btn-icon" style={{ marginLeft: '6px' }} />
                        הוסף הכשרה
                      </button>

                      <h3 style={{ marginTop: '3rem' }}>השתלמויות מקצועיות (קורסים)</h3>
                      <div className="form-group">
                        <label className="form-group-label" htmlFor="admin-field-16">כותרת סקציית השתלמויות</label>
<input id="admin-field-16" 
                          type="text" 
                          className="login-input"
                          value={pageData.courses_title || ''}
                          onChange={(e) => setPageData({ ...pageData, courses_title: e.target.value })}
                        />
                      </div>
                      
                      <div className="admin-items-grid">
                        {(pageData.courses || []).map((c, idx) => (
                          <div key={idx} className="admin-card-item">
                            <div className="admin-card-header">
                              <h4>השתלמות #{idx + 1}</h4>
                              <button 
                                type="button" 
                                className="btn-remove-item" aria-label="הסר פריט"
                                onClick={() => {
                                  const newCourses = pageData.courses.filter((_, i) => i !== idx);
                                  setPageData({ ...pageData, courses: newCourses });
                                }}
                              >
                                <FaTrash />
                              </button>
                            </div>
                            
                            {c.image && (
                              <div className="admin-card-image-preview">
                                <img src={c.image} alt={c.name} />
                                {c.document && <span className="pdf-badge"><FaFilePdf /> PDF מקושר</span>}
                              </div>
                            )}
                            
                            <div className="form-group">
                              <label className="form-group-label" htmlFor="admin-field-17">שם ההשתלמות/קורס</label>
<input id="admin-field-17" 
                                type="text"
                                className="login-input"
                                value={c.name || ''}
                                onChange={(e) => {
                                  const newCourses = [...pageData.courses];
                                  newCourses[idx].name = e.target.value;
                                  setPageData({ ...pageData, courses: newCourses });
                                }}
                              />
                            </div>
                            
                            <div className="form-group">
                              <label className="form-group-label" htmlFor="admin-field-18">שם המרצה/מעביר הקורס</label>
<input id="admin-field-18" 
                                type="text"
                                className="login-input"
                                value={c.instructor || ''}
                                onChange={(e) => {
                                  const newCourses = [...pageData.courses];
                                  newCourses[idx].instructor = e.target.value;
                                  setPageData({ ...pageData, courses: newCourses });
                                }}
                              />
                            </div>
                            
                            <div className="form-group">
                              <label className="form-group-label" htmlFor="admin-field-19">תעודה (תמונה או PDF)</label>
<input id="admin-field-19" 
                                type="file" 
                                accept="image/*,application/pdf"
                                onChange={(e) => handleImageUpload(e, (result) => {
                                  const newCourses = [...pageData.courses];
                                  newCourses[idx].image = result.image;
                                  if (result.document) newCourses[idx].document = result.document;
                                  setPageData({ ...pageData, courses: newCourses });
                                }, true)}
                                className="file-input"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <button 
                        type="button" 
                        className="btn-add-item"
                        onClick={() => {
                          const newCourses = [...(pageData.courses || []), { name: '', instructor: '' }];
                          setPageData({ ...pageData, courses: newCourses });
                        }}
                      >
                        <FaPlus className="btn-icon" style={{ marginLeft: '6px' }} />
                        הוסף השתלמות
                      </button>
                    </div>
                  )}

                  {/* EDIT FORM: SERVICES PAGE */}
                  {editingPage === 'services' && (
                    <div>
                      <div className="admin-input-group">
                        <div className="form-group">
                          <label className="form-group-label" htmlFor="admin-field-20">כותרת ראשית</label>
<input id="admin-field-20" 
                            type="text" 
                            className="login-input"
                            value={pageData.title || ''}
                            onChange={(e) => setPageData({ ...pageData, title: e.target.value })}
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-group-label" htmlFor="admin-field-21">כותרת משנה</label>
<input id="admin-field-21" 
                            type="text" 
                            className="login-input"
                            value={pageData.subtitle || ''}
                            onChange={(e) => setPageData({ ...pageData, subtitle: e.target.value })}
                          />
                        </div>
                      </div>

                      <h3 style={{ marginTop: '2rem' }}>רשימת השירותים המוצעים</h3>
                      {(pageData.services || []).map((s, idx) => (
                        <div key={idx} style={{ padding: '1rem', backgroundColor: '#f9f9fc', borderRadius: '8px', marginBottom: '1rem' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h4>שירות #{idx + 1}</h4>
                            <button 
                              type="button" 
                              className="btn-remove-item" aria-label="הסר פריט"
                              style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
                              onClick={() => {
                                const newServs = pageData.services.filter((_, i) => i !== idx);
                                setPageData({ ...pageData, services: newServs });
                              }}
                            >
                              <FaTrash />
                              הסר שירות
                            </button>
                          </div>
                          <div className="form-group">
                            <label className="form-group-label" htmlFor="admin-field-22">שם השירות</label>
<input id="admin-field-22" 
                              type="text" 
                              className="login-input"
                              value={s.title || ''}
                              onChange={(e) => {
                                const newServs = [...pageData.services];
                                newServs[idx] = { ...s, title: e.target.value };
                                setPageData({ ...pageData, services: newServs });
                              }}
                            />
                          </div>
                          <div className="form-group">
                            <label className="form-group-label" htmlFor="admin-field-23">תיאור השירות</label>
<textarea id="admin-field-23" 
                              className="admin-textarea"
                              value={s.description || ''}
                              onChange={(e) => {
                                const newServs = [...pageData.services];
                                newServs[idx] = { ...s, description: e.target.value };
                                setPageData({ ...pageData, services: newServs });
                              }}
                            />
                          </div>
                        </div>
                      ))}
                      <button 
                        type="button" 
                        className="btn-add-item"
                        onClick={() => {
                          const newServs = [...(pageData.services || []), { title: '', description: '' }];
                          setPageData({ ...pageData, services: newServs });
                        }}
                      >
                        <FaPlus className="btn-icon" style={{ marginLeft: '6px' }} />
                        הוסף שירות חדש
                      </button>
                    </div>
                  )}

                  {/* EDIT FORM: CONTACT PAGE */}
                  {editingPage === 'contact' && (
                    <div>
                      <div className="admin-input-group">
                        <div className="form-group">
                          <label className="form-group-label" htmlFor="admin-field-24">כותרת עמוד</label>
<input id="admin-field-24" 
                            type="text" 
                            className="login-input"
                            value={pageData.title || ''}
                            onChange={(e) => setPageData({ ...pageData, title: e.target.value })}
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-group-label" htmlFor="admin-field-25">כותרת משנה</label>
<input id="admin-field-25" 
                            type="text" 
                            className="login-input"
                            value={pageData.subtitle || ''}
                            onChange={(e) => setPageData({ ...pageData, subtitle: e.target.value })}
                          />
                        </div>
                      </div>

                      <h3 style={{ marginTop: '2rem' }}>שאלות נפוצות (FAQ)</h3>
                      {(pageData.faq_items || []).map((faq, idx) => (
                        <div key={idx} style={{ padding: '1rem', backgroundColor: '#f9f9fc', borderRadius: '8px', marginBottom: '1rem' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h4>שאלה #{idx + 1}</h4>
                            <button 
                              type="button" 
                              className="btn-remove-item" aria-label="הסר פריט"
                              style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
                              onClick={() => {
                                const newFaqs = pageData.faq_items.filter((_, i) => i !== idx);
                                setPageData({ ...pageData, faq_items: newFaqs });
                              }}
                            >
                              <FaTrash />
                              הסר שאלה
                            </button>
                          </div>
                          <div className="form-group">
                            <label className="form-group-label" htmlFor="admin-field-26">שאלה</label>
<input id="admin-field-26" 
                              type="text" 
                              className="login-input"
                              value={faq.question || ''}
                              onChange={(e) => {
                                const newFaqs = [...pageData.faq_items];
                                newFaqs[idx] = { ...faq, question: e.target.value };
                                setPageData({ ...pageData, faq_items: newFaqs });
                              }}
                            />
                          </div>
                          <div className="form-group">
                            <label className="form-group-label" htmlFor="admin-field-27">תשובה</label>
<textarea id="admin-field-27" 
                              className="admin-textarea"
                              value={faq.answer || ''}
                              onChange={(e) => {
                                const newFaqs = [...pageData.faq_items];
                                newFaqs[idx] = { ...faq, answer: e.target.value };
                                setPageData({ ...pageData, faq_items: newFaqs });
                              }}
                            />
                          </div>
                        </div>
                      ))}
                      <button 
                        type="button" 
                        className="btn-add-item"
                        onClick={() => {
                          const newFaqs = [...(pageData.faq_items || []), { question: '', answer: '' }];
                          setPageData({ ...pageData, faq_items: newFaqs });
                        }}
                      >
                        <FaPlus className="btn-icon" style={{ marginLeft: '6px' }} />
                        הוסף שאלה נפוצה
                      </button>
                    </div>
                  )}

                  {/* EDIT FORM: TESTIMONIALS (IMAGES) */}
                  {editingPage === 'testimonials' && (
                    <div>
                      <div className="admin-input-group">
                        <div className="form-group">
                          <label className="form-group-label" htmlFor="admin-field-28">כותרת עמוד המלצות</label>
<input id="admin-field-28" 
                            type="text" 
                            className="login-input"
                            value={pageData.title || ''}
                            onChange={(e) => setPageData({ ...pageData, title: e.target.value })}
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-group-label" htmlFor="admin-field-29">כותרת משנה</label>
<input id="admin-field-29" 
                            type="text" 
                            className="login-input"
                            value={pageData.subtitle || ''}
                            onChange={(e) => setPageData({ ...pageData, subtitle: e.target.value })}
                          />
                        </div>
                      </div>

                      <h3 style={{ marginTop: '2rem' }}>גלריית תמונות המלצה</h3>
                      <div className="image-preview-container">
                        {(pageData.images || []).map((img, idx) => (
                          <div key={idx} className="image-preview-wrapper" style={{ border: img.hide ? '2px solid red' : '1px solid #ddd' }}>
                            <img src={img.image} alt={img.alt} />
                            <button 
                              type="button" 
                              className="btn-delete-img" aria-label="מחק תמונה"
                              onClick={() => {
                                const newImgs = pageData.images.filter((_, i) => i !== idx);
                                setPageData({ ...pageData, images: newImgs });
                              }}
                              title="מחק תמונה"
                            >
                              <FaTimes />
                            </button>
                            <div style={{ position: 'absolute', bottom: 0, right: 0, left: 0, background: 'rgba(0,0,0,0.6)', padding: '2px', display: 'flex', justifyContent: 'space-between' }}>
                              <input 
                                type="checkbox" 
                                checked={img.hide || false}
                                onChange={(e) => {
                                  const newImgs = [...pageData.images];
                                  newImgs[idx] = { ...img, hide: e.target.checked };
                                  setPageData({ ...pageData, images: newImgs });
                                }}
                                title="הסתר מהאתר"
                              />
                              <input 
                                type="text" 
                                value={img.alt || ''} 
                                onChange={(e) => {
                                  const newImgs = [...pageData.images];
                                  newImgs[idx] = { ...img, alt: e.target.value };
                                  setPageData({ ...pageData, images: newImgs });
                                }}
                                placeholder="Alt"
                                style={{ width: '80%', background: 'transparent', border: 'none', color: 'white', fontSize: '0.75rem', textAlign: 'right' }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="admin-image-uploader" style={{ marginTop: '1.5rem' }}>
                        <div className="uploader-content">
                          <FaCamera size={30} className="uploader-icon" />
                          <span>לחץ להעלאת תמונת המלצה</span>
                          <input 
                            type="file" 
                            accept="image/*"
                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}
                            onChange={(e) => handleImageUpload(e, (url) => {
                              const newImgs = [...(pageData.images || []), { image: url, alt: 'המלצה חדשה', hide: false }];
                              setPageData({ ...pageData, images: newImgs });
                            })}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="sticky-action-bar">
                    <button type="submit" className="btn-save" disabled={loading}>
                      {loading ? 'שומר...' : (
                        <>
                          <FaSave style={{ marginLeft: '8px' }} />
                          שמור שינויים בעמוד
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* TAB: Blog Posts List and Editor */}
          {activeTab === 'blog' && (
            <div className="panel-card">
              
              {/* List View */}
              {editingBlogPost === null && (
                <div>
                  <div className="panel-header">
                    <h2>ניהול פוסטים בבלוג</h2>
                    <button 
                      onClick={() => setEditingBlogPost({
                        title: '',
                        slug: '',
                        date: new Date().toISOString().split('T')[0],
                        excerpt: '',
                        image: '',
                        categories: [],
                        content: ''
                      })}
                      className="btn-add"
                    >
                      <FaPlus style={{ marginLeft: '6px' }} />
                      הוסף פוסט חדש
                    </button>
                  </div>

                  {loading ? (
                    <h3>טוען פוסטים...</h3>
                  ) : (
                    <div className="admin-list">
                      {blogPosts.map((post) => (
                        <div key={post.id || post.slug} className="admin-item-row">
                          <div className="item-info">
                            <span className="item-title">{post.title}</span>
                            <span className="item-meta">
                              <span>📅 תאריך: {post.formattedDate || post.date}</span>
                              <span>🔗 Slug: {post.slug}</span>
                            </span>
                          </div>
                          <div className="item-actions">
                            <button 
                              onClick={() => setEditingBlogPost(post)}
                              className="btn-action"
                              style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
                            >
                              <FaEdit />
                              ערוך
                            </button>
                            <button 
                              onClick={() => deleteBlogPost(post.slug)}
                              className="btn-action danger"
                              style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
                            >
                              <FaTrash />
                              מחק
                            </button>
                          </div>
                        </div>
                      ))}
                      {blogPosts.length === 0 && <p>לא נמצאו פוסטים בבלוג. אנא בצע סנכרון ראשוני או הוסף פוסט חדש.</p>}
                    </div>
                  )}
                </div>
              )}

              {/* Editor View */}
              {editingBlogPost !== null && (
                <div>
                  <div className="panel-header">
                    <h2>{editingBlogPost.createdAt ? 'עריכת פוסט בבלוג' : 'יצירת פוסט חדש בבלוג'}</h2>
                    <button 
                      onClick={() => setEditingBlogPost(null)}
                      className="btn-cancel"
                    >
                      ביטול וחזרה לרשימה
                    </button>
                  </div>

                  <form onSubmit={saveBlogPost} className="admin-form">
                    <div className="form-group">
                      <label className="form-group-label" htmlFor="admin-field-30">כותרת הפוסט</label>
<input id="admin-field-30" 
                        type="text" 
                        required
                        className="login-input"
                        value={editingBlogPost.title}
                        onChange={(e) => setEditingBlogPost({ ...editingBlogPost, title: e.target.value })}
                        placeholder="רשום כותרת פוסט מעניינת..."
                      />
                    </div>

                    <div className="admin-input-group">
                      <div className="form-group">
                        <label className="form-group-label" htmlFor="admin-field-31">Slug באנגלית (מזהה בקישור)</label>
<input id="admin-field-31" 
                          type="text" 
                          required
                          className="login-input"
                          value={editingBlogPost.slug}
                          onChange={(e) => setEditingBlogPost({ ...editingBlogPost, slug: e.target.value })}
                          placeholder="word-retrieval-vs-stuttering"
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-group-label" htmlFor="admin-field-32">תאריך פרסום</label>
<input id="admin-field-32" 
                          type="date" 
                          required
                          className="login-input"
                          value={editingBlogPost.date}
                          onChange={(e) => setEditingBlogPost({ ...editingBlogPost, date: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-group-label" htmlFor="admin-field-33">תקציר הפוסט (יוצג בדף הבלוגים הראשי)</label>
<textarea id="admin-field-33" 
                        required
                        className="admin-textarea"
                        value={editingBlogPost.excerpt}
                        onChange={(e) => setEditingBlogPost({ ...editingBlogPost, excerpt: e.target.value })}
                        placeholder="רשום תקציר קצר שמושך לקרוא..."
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-group-label" htmlFor="admin-field-34">קטגוריות (מופרדות בפסיקים)</label>
<input id="admin-field-34" 
                        type="text" 
                        className="login-input"
                        value={editingBlogPost.categories ? editingBlogPost.categories.join(', ') : ''}
                        onChange={(e) => setEditingBlogPost({ 
                          ...editingBlogPost, 
                          categories: e.target.value.split(',').map(cat => cat.trim()).filter(Boolean) 
                        })}
                        placeholder="speech, voice, children, tips"
                      />
                    </div>

                    {/* Image Upload for Post */}
                    <div className="form-group">
                      <label className="form-group-label">תמונת נושא לפוסט</label>
                      {editingBlogPost.image && (
                        <div style={{ marginBottom: '1rem', width: '200px', height: '120px', overflow: 'hidden', borderRadius: '8px' }}>
                          <img src={editingBlogPost.image} alt="תמונת נושא" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                      )}
                      <div className="admin-image-uploader">
                        <div className="uploader-content">
                          <FaImage size={30} className="uploader-icon" />
                          <span>לחץ להעלאת תמונת נושא חדשה</span>
                          <input 
                            type="file" 
                            accept="image/*"
                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}
                            onChange={(e) => handleImageUpload(e, (url) => {
                              setEditingBlogPost({ ...editingBlogPost, image: url });
                            })}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Content Markdown Area */}
                    <div className="form-group">
                      <label className="form-group-label" htmlFor="admin-field-35">תוכן הפוסט (תומך ב-HTML או Markdown)</label>
<textarea id="admin-field-35" 
                        required
                        className="admin-textarea"
                        style={{ minHeight: '350px' }}
                        value={editingBlogPost.content}
                        onChange={(e) => setEditingBlogPost({ ...editingBlogPost, content: e.target.value })}
                        placeholder="כאן כותבים את תוכן המאמר בפירוט..."
                      />
                    </div>

                    <div className="sticky-action-bar">
                      <button 
                        type="button" 
                        onClick={() => setEditingBlogPost(null)} 
                        className="btn-cancel"
                        style={{ marginLeft: '1rem' }}
                      >
                        ביטול
                      </button>
                      <button type="submit" className="btn-save" disabled={loading}>
                        {loading ? 'שומר פוסט...' : (
                          <>
                            <FaSave style={{ marginLeft: '8px' }} />
                            שמור ופרסם פוסט
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}

          {/* TAB: Components Layout Editing (Header/Footer) */}
          {activeTab === 'components' && componentData && (
            <div className="panel-card">
              <div className="panel-header">
                <h2>ניהול רכיבי ממשק</h2>
                <select 
                  value={editingComponent} 
                  onChange={(e) => setEditingComponent(e.target.value)}
                  className="login-input"
                  style={{ width: '220px', marginTop: 0 }}
                >
                  <option value="header">תפריט עליון (Header)</option>
                  <option value="footer">תחתית האתר (Footer)</option>
                </select>
              </div>

              {loading ? (
                <h3>טוען נתונים...</h3>
              ) : (
                <form onSubmit={saveComponentData} className="admin-form">
                  
                  {/* EDIT HEADER COMPONENT */}
                  {editingComponent === 'header' && (
                    <div>
                      <label className="form-group-label">קישורי התפריט העליון</label>
                      {(componentData.menu_items || []).map((item, idx) => (
                        <div key={idx} className="list-editor-item" style={{ gap: '10px' }}>
                          <input 
                            type="text" 
                            className="login-input"
                            value={item.name || ''}
                            onChange={(e) => {
                              const newItems = [...componentData.menu_items];
                              newItems[idx] = { ...item, name: e.target.value };
                              setComponentData({ ...componentData, menu_items: newItems });
                            }}
                            placeholder="שם הקישור"
                          />
                          <input 
                            type="text" 
                            className="login-input"
                            value={item.path || ''}
                            onChange={(e) => {
                              const newItems = [...componentData.menu_items];
                              newItems[idx] = { ...item, path: e.target.value };
                              setComponentData({ ...componentData, menu_items: newItems });
                            }}
                            placeholder="נתיב"
                          />
                          <button 
                            type="button" 
                            className="btn-remove-item" aria-label="הסר פריט"
                            onClick={() => {
                              const newItems = componentData.menu_items.filter((_, i) => i !== idx);
                              setComponentData({ ...componentData, menu_items: newItems });
                            }}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      ))}
                      <button 
                        type="button" 
                        className="btn-add-item"
                        onClick={() => {
                          const newItems = [...(componentData.menu_items || []), { name: '', path: '' }];
                          setComponentData({ ...componentData, menu_items: newItems });
                        }}
                      >
                        <FaPlus style={{ marginLeft: '6px' }} />
                        הוסף קישור לתפריט
                      </button>
                    </div>
                  )}

                  {/* EDIT FOOTER COMPONENT */}
                  {editingComponent === 'footer' && (
                    <div>
                      <div className="form-group">
                        <label className="form-group-label" htmlFor="admin-field-36">טקסט זכויות יוצרים (Copyright)</label>
<input id="admin-field-36" 
                          type="text" 
                          className="login-input"
                          value={componentData.copyright || ''}
                          onChange={(e) => setComponentData({ ...componentData, copyright: e.target.value })}
                        />
                      </div>

                      <label className="form-group-label" style={{ marginTop: '2rem' }}>קישורי תחתית האתר</label>
                      {(componentData.links || []).map((link, idx) => (
                        <div key={idx} className="list-editor-item" style={{ gap: '10px' }}>
                          <input 
                            type="text" 
                            className="login-input"
                            value={link.name || ''}
                            onChange={(e) => {
                              const newLinks = [...componentData.links];
                              newLinks[idx] = { ...link, name: e.target.value };
                              setComponentData({ ...componentData, links: newLinks });
                            }}
                            placeholder="שם הקישור"
                          />
                          <input 
                            type="text" 
                            className="login-input"
                            value={link.path || ''}
                            onChange={(e) => {
                              const newLinks = [...componentData.links];
                              newLinks[idx] = { ...link, path: e.target.value };
                              setComponentData({ ...componentData, links: newLinks });
                            }}
                            placeholder="נתיב"
                          />
                          <button 
                            type="button" 
                            className="btn-remove-item" aria-label="הסר פריט"
                            onClick={() => {
                              const newLinks = componentData.links.filter((_, i) => i !== idx);
                              setComponentData({ ...componentData, links: newLinks });
                            }}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      ))}
                      <button 
                        type="button" 
                        className="btn-add-item"
                        onClick={() => {
                          const newLinks = [...(componentData.links || []), { name: '', path: '' }];
                          setComponentData({ ...componentData, links: newLinks });
                        }}
                      >
                        <FaPlus style={{ marginLeft: '6px' }} />
                        הוסף קישור בתחתית
                      </button>
                    </div>
                  )}

                  <div className="sticky-action-bar">
                    <button type="submit" className="btn-save" disabled={loading}>
                      {loading ? 'שומר...' : (
                        <>
                          <FaSave style={{ marginLeft: '8px' }} />
                          שמור שינויים ברכיב
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

        </main>
      </div>
    </div>
  );
};

export default Admin;

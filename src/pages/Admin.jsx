import React, { useState, useEffect } from 'react';
import '../styles/global.css';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Simple authentication check - in a real app, you'd use a more secure method
  const handleLogin = (e) => {
    e.preventDefault();
    // Replace with your actual admin credentials
    if (username === 'admin' && password === 'password123') {
      setIsAuthenticated(true);
      localStorage.setItem('isAdminAuthenticated', 'true');
      setError('');
    } else {
      setError('שם משתמש או סיסמה לא נכונים');
    }
  };

  useEffect(() => {
    // Check if user is already authenticated
    const authStatus = localStorage.getItem('isAdminAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAdminAuthenticated');
  };

  return (
    <div className="admin-container" style={{ direction: 'rtl', padding: '2rem' }}>
      <h1>אזור ניהול</h1>
      
      {!isAuthenticated ? (
        <div className="login-form">
          <h2>התחברות</h2>
          {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}
          <form onSubmit={handleLogin}>
            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <label htmlFor="username">שם משתמש:</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
                style={{ padding: '0.5rem', width: '100%', maxWidth: '300px', display: 'block', marginTop: '0.5rem' }}
              />
            </div>
            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <label htmlFor="password">סיסמה:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                style={{ padding: '0.5rem', width: '100%', maxWidth: '300px', display: 'block', marginTop: '0.5rem' }}
              />
            </div>
            <button 
              type="submit" 
              style={{ 
                backgroundColor: '#8e44ad', 
                color: 'white', 
                padding: '0.5rem 1rem', 
                border: 'none', 
                borderRadius: '4px', 
                cursor: 'pointer' 
              }}
            >
              התחבר
            </button>
          </form>
        </div>
      ) : (
        <div className="admin-dashboard">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h2>ברוכים הבאים לאזור הניהול</h2>
            <button 
              onClick={handleLogout}
              style={{ 
                backgroundColor: '#e74c3c', 
                color: 'white', 
                padding: '0.5rem 1rem', 
                border: 'none', 
                borderRadius: '4px', 
                cursor: 'pointer' 
              }}
            >
              התנתק
            </button>
          </div>
          
          <div className="admin-sections">
            <div className="admin-section" style={{ marginBottom: '2rem' }}>
              <h3>ניהול בלוג</h3>
              <p>כאן תוכלו לנהל את הפוסטים בבלוג, להוסיף פוסטים חדשים ולערוך קיימים.</p>
              {/* Add blog management functionality here */}
            </div>
            
            <div className="admin-section" style={{ marginBottom: '2rem' }}>
              <h3>ניהול טיפולים</h3>
              <p>כאן תוכלו לנהל את רשימת הטיפולים המוצעים באתר.</p>
              {/* Add services management functionality here */}
            </div>
            
            <div className="admin-section" style={{ marginBottom: '2rem' }}>
              <h3>ניהול המלצות</h3>
              <p>כאן תוכלו לנהל את ההמלצות המוצגות באתר.</p>
              {/* Add testimonials management functionality here */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;

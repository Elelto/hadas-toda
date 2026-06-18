import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../services/firebase';
import '../../styles/admin.css';

const Auth = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Logged in successfully:', userCredential.user);
      if (onLoginSuccess) {
        onLoginSuccess(userCredential.user);
      }
    } catch (err) {
      console.error('Login error:', err);
      // Friendly Hebrew error messages
      switch (err.code) {
        case 'auth/invalid-email':
          setError('כתובת האימייל אינה תקינה.');
          break;
        case 'auth/user-not-found':
        case 'auth/wrong-password':
        case 'auth/invalid-credential':
          setError('שם המשתמש או הסיסמה אינם נכונים.');
          break;
        case 'auth/too-many-requests':
          setError('יותר מדי ניסיונות כושלים. החשבון נחסם זמנית, אנא נסה שנית מאוחר יותר.');
          break;
        default:
          setError('שגיאה בהתחברות. אנא נסה שנית.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-wrapper">
      <div className="login-card">
        <div className="login-logo-container">
          <img src="/favicon/logo.png" alt="הדס תודה" className="login-logo" onError={(e) => e.target.style.display = 'none'} />
          <h2>הדס תודה</h2>
          <p>כניסה למערכת ניהול האתר</p>
        </div>

        {error && (
          <div className="login-error" role="alert">
            <span className="error-icon">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">אימייל מנהל</label>
            <input
              type="email"
              id="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              className="login-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">סיסמה</label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              className="login-input"
            />
          </div>

          <button
            type="submit"
            className={`btn btn-primary login-btn ${loading ? 'loading' : ''}`}
            disabled={loading}
          >
            {loading ? 'מתחבר...' : 'התחבר למערכת'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;

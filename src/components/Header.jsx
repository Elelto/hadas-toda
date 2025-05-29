import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.jpg';
import '../styles/header.css';

export default function Header() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navItems = [
    { path: '/', label: 'ראשי' },
    { path: '/services', label: 'תחומי טיפול' },
    { path: '/about', label: 'קצת עליי' },
    { path: '/testimonials', label: 'מטופלים מספרים' },
    { path: '/contact', label: 'דברו איתי' }
  ];

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container header-container">
        {/* Logo */}
        <Link to="/" className="logo-container">
          <img 
            src={logo} 
            alt="הדס תודה לוגו" 
            className={`logo ${scrolled ? 'scrolled' : ''}`}
          />
          <div className="logo-text">
            <h1 className={`site-title ${scrolled ? 'scrolled' : ''}`}>הדס תודה</h1>
            <p className={`site-subtitle ${scrolled ? 'scrolled' : ''}`}>קלינאית תקשורת</p>
          </div>
        </Link>
        
        {/* Mobile menu button */}
        <button 
          onClick={toggleMenu} 
          className="mobile-menu-button"
          aria-label="תפריט"
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>
        
        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          {navItems.map((item) => (
            <Link 
              key={item.path}
              to={item.path} 
              className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="mobile-nav">
          {navItems.map((item) => (
            <Link 
              key={item.path}
              to={item.path} 
              className={`mobile-nav-link ${location.pathname === item.path ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}

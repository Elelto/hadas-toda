import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { loadYamlContent } from '../utils/yamlLoader';
import logo from '../assets/logo.png';
import '../styles/header.css';

// Default navigation items
const getDefaultNavItems = () => [
  { path: '/', label: 'ראשי' },
  { path: '/services', label: 'תחומי טיפול' },

  { path: '/about', label: 'קצת עליי' },
  { path: '/blog', label: 'בלוג מקצועי' },
  { path: '/testimonials', label: 'מטופלים מספרים' },
  { path: '/contact', label: 'דברו איתי' }
];

export default function Header() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [headerContent, setHeaderContent] = useState(null);
  const [navItems, setNavItems] = useState(getDefaultNavItems());

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

  // Load header content from YAML
  useEffect(() => {
    const loadContent = async () => {
      try {
        const content = await loadYamlContent('/content/components/header.yml');
        if (content) {
          setHeaderContent(content);
          if (content.navigation?.items) {
            // Filter out 'ai-assessment' if it comes from YAML
            const filteredItems = content.navigation.items.filter(item => item.path !== '/ai-assessment');
            setNavItems(filteredItems);
          }
        }
      } catch (error) {
        console.warn('Could not load header content, using defaults');
      }
    };

    loadContent();
  }, []);

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
            <h1 className={`site-title ${scrolled ? 'scrolled' : ''}`}>{headerContent?.site?.title || "הדס תודה"}</h1>
            <p className={`site-subtitle ${scrolled ? 'scrolled' : ''}`}>{headerContent?.site?.subtitle || "קלינאית תקשורת"}</p>
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
              className={`nav-link ${location.pathname === item.path ? 'active' : ''} ${item.isNew ? 'new-feature' : ''}`}
            >
              {item.label}
              {item.isNew && <span className="new-badge">חדש!</span>}
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
              className={`mobile-nav-link ${location.pathname === item.path ? 'active' : ''} ${item.isNew ? 'new-feature' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
              {item.isNew && <span className="new-badge">חדש!</span>}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}

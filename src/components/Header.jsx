import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { loadYamlContent } from '../utils/yamlLoader';
import logo from '../assets/logo-trimmed.png';
import '../styles/header.css';

const getDefaultNavItems = () => [
  { path: '/', label: 'ראשי' },
  { path: '/about', label: 'קצת עליי' },
  { path: '/services', label: 'תחומי טיפול' },
  { path: '/testimonials', label: 'מטופלים מספרים' },
  { path: '/blog', label: 'בלוג מקצועי' },
  { path: '/online-therapy', label: 'טיפול אונליין' },
  { path: '/contact', label: 'דברו איתי' }
];

export default function Header() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [headerContent, setHeaderContent] = useState(null);
  const [navItems, setNavItems] = useState([]);
  const [isNavLoaded, setIsNavLoaded] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

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
          const items = content.menu_items || content.navigation?.items;
          if (items) {
            // Filter out 'ai-assessment' if it comes from YAML
            const filteredItems = items.filter(item => item.path !== '/ai-assessment');
            setNavItems(filteredItems);
          } else {
            setNavItems(getDefaultNavItems());
          }
        } else {
          setNavItems(getDefaultNavItems());
        }
      } catch (error) {
        console.warn('Could not load header content, using defaults');
        setNavItems(getDefaultNavItems());
      } finally {
        setIsNavLoaded(true);
      }
    };

    loadContent();
  }, []);

  return (
    <>
      <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="container header-container">
          {/* Logo */}
          <Link to="/" className="logo-container" aria-label="הדס תודה - מעבר לדף הבית">
            <img
              src={logo}
              alt="הדס תודה לוגו"
              className={`logo ${scrolled ? 'scrolled' : ''}`}
              fetchPriority="high"
            />

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
            {!isNavLoaded ? (
              // Skeletons
              getDefaultNavItems().map((item) => (
                <div 
                  key={`skeleton-${item.path}`} 
                  className={`nav-link nav-link-skeleton ${location.pathname === item.path ? 'active' : ''}`}
                >
                  {item.label}
                </div>
              ))
            ) : (
              navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-link nav-fade-in ${location.pathname === item.path ? 'active' : ''} ${item.isNew ? 'new-feature' : ''}`}
                  aria-current={location.pathname === item.path ? 'page' : undefined}
                >
                  {item.label || item.name}
                  {item.isNew && <span className="new-badge">חדש!</span>}
                </Link>
              ))
            )}
          </nav>
        </div>
      </header>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <>
          <div className="mobile-nav-backdrop" onClick={() => setIsMenuOpen(false)} aria-hidden="true"></div>
          <div className="mobile-nav">
            {!isNavLoaded ? (
              // Skeletons
              getDefaultNavItems().map((item) => (
                <div 
                  key={`mob-skeleton-${item.path}`} 
                  className={`mobile-nav-link mobile-nav-skeleton ${location.pathname === item.path ? 'active' : ''}`}
                >
                  {item.label}
                </div>
              ))
            ) : (
              navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`mobile-nav-link nav-fade-in ${location.pathname === item.path ? 'active' : ''} ${item.isNew ? 'new-feature' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                  aria-current={location.pathname === item.path ? 'page' : undefined}
                >
                  {item.label || item.name}
                  {item.isNew && <span className="new-badge">חדש!</span>}
                </Link>
              ))
            )}
          </div>
        </>
      )}
    </>
  );
}

import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useHistoryUIState } from '../hooks/useHistoryUIState';
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
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useHistoryUIState('mobileMenu', false);
  const [scrolled, setScrolled] = useState(false);
  const [headerContent, setHeaderContent] = useState(null);
  const [navItems, setNavItems] = useState([]);
  const [isNavLoaded, setIsNavLoaded] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMobileNavClick = (e, path) => {
    e.preventDefault();
    if (location.pathname === path) {
      // If we're already on this page, just close the menu naturally
      setIsMenuOpen(false);
    } else {
      // If we're navigating to a new page, we must avoid a race condition 
      // between closing the menu (navigate(-1)) and going to the new page (navigate(path)).
      // 1. Remove the menu open state from the current history entry
      navigate(location.pathname + location.search + location.hash, {
        replace: true,
        state: { ...location.state, mobileMenu: undefined }
      });
      // 2. Safely push the new page onto the history stack
      setTimeout(() => {
        navigate(path);
      }, 0);
    }
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
                <a
                  key={item.path}
                  href={item.path}
                  className={`mobile-nav-link nav-fade-in ${location.pathname === item.path ? 'active' : ''} ${item.isNew ? 'new-feature' : ''}`}
                  onClick={(e) => handleMobileNavClick(e, item.path)}
                  aria-current={location.pathname === item.path ? 'page' : undefined}
                >
                  {item.label || item.name}
                  {item.isNew && <span className="new-badge">חדש!</span>}
                </a>
              ))
            )}
          </div>
        </>
      )}
    </>
  );
}

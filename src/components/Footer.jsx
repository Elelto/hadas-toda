import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { loadYamlContent } from '../utils/yamlLoader';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaFacebook, FaInstagram, FaArrowLeft } from 'react-icons/fa';
import '../styles/footer.css';

// Default footer content
const getDefaultFooterContent = () => ({
  contact: {
    title: "דברו איתי",
    name: "הדס תודה קלינאית תקשורת",
    phone: "050-6796209",
    email: "hadas.toda.info@gmail.com",
    address: "שיכון ג' בני ברק"
  },
  navigation: {
    items: [
      { path: '/', label: 'ראשי' },
      { path: '/services', label: 'תחומי טיפול' },
      { path: '/about', label: 'קצת עליי' },
      { path: '/testimonials', label: 'מטופלים מספרים' },
      { path: '/contact', label: 'יצירת קשר' }
    ]
  },
  copyright: {
    text: "הדס תודה - קלינאית תקשורת"
  }
});

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [footerContent, setFooterContent] = useState(null);

  // Load footer content from YAML
  useEffect(() => {
    const loadContent = async () => {
      try {
        const content = await loadYamlContent('/content/components/footer.yml');
        if (content) {
          setFooterContent(content);
        } else {
          setFooterContent(getDefaultFooterContent());
        }
      } catch (error) {
        console.warn('Could not load footer content, using defaults');
        setFooterContent(getDefaultFooterContent());
      }
    };

    loadContent();
  }, []);

  if (!footerContent) {
    return null; // Or a simple skeleton
  }

  const contact = footerContent.contact || getDefaultFooterContent().contact;
  const navItems = footerContent.navigation?.items || getDefaultFooterContent().navigation.items;
  const copyright = footerContent.copyright || getDefaultFooterContent().copyright;

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-content">

          {/* Brand Column */}
          <div className="footer-col brand-col">
            <h2 className="footer-logo">הדס תודה</h2>
            <p className="footer-tagline">
              קלינאית תקשורת מוסמכת (M.A).
              <br />
              טיפול בשפה, דיבור, קול וגמגום.
            </p>
            <div className="social-icons">
              <a href="https://wa.me/972506796209" target="_blank" rel="noopener noreferrer" className="social-icon whatsapp">
                <FaWhatsapp />
              </a>
              <a href="#" className="social-icon facebook">
                <FaFacebook />
              </a>
              <a href="#" className="social-icon instagram">
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* Links Column */}
          <div className="footer-col links-col">
            <h3 className="footer-heading">קישורים מהירים</h3>
            <ul className="footer-links-list">
              {navItems.map((item, index) => (
                <li key={index}>
                  <Link to={item.path} className="footer-link">
                    {item.label || item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="footer-col contact-col">
            <h3 className="footer-heading">{contact.title || "יצירת קשר"}</h3>
            <div className="contact-items">
              <a href={`tel:${contact.phone?.replace(/-/g, '')}`} className="contact-item">
                <span className="icon-box"><FaPhone /></span>
                <span className="text">{contact.phone}</span>
              </a>
              <a href={`mailto:${contact.email}`} className="contact-item">
                <span className="icon-box"><FaEnvelope /></span>
                <span className="text">{contact.email}</span>
              </a>
              <div className="contact-item">
                <span className="icon-box"><FaMapMarkerAlt /></span>
                <span className="text">{contact.address}</span>
              </div>
            </div>
          </div>

        </div>

        <div className="footer-bottom">
          <div className="copyright-text">
            &copy; {currentYear} {copyright.text}. כל הזכויות שמורות.
          </div>
        </div>
      </div>
    </footer>
  );
}

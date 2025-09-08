import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { loadYamlContent } from '../utils/yamlLoader';
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
      { path: '/contact', label: 'דברו איתי' }
    ]
  },
  copyright: {
    text: "הדס תודה"
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
    return null;
  }

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-content">
          {/* Contact information */}
          <div className="footer-contact">
            <h3 className="footer-heading">{footerContent.contact?.title || "דברו איתי"}</h3>
            <div className="contact-info">
              <div className="contact-name">{footerContent.contact?.name || "הדס תודה קלינאית תקשורת"}</div>
              <a href={`tel:${footerContent.contact?.phone || "0506796209"}`} className="contact-link">{footerContent.contact?.phone || "050-6796209"}</a>
              <a href={`mailto:${footerContent.contact?.email || "hadas.toda.info@gmail.com"}`} className="contact-link">{footerContent.contact?.email || "hadas.toda.info@gmail.com"}</a>
              <div className="contact-address">{footerContent.contact?.address || "שיכון ג' בני ברק"}</div>
            </div>
          </div>
          
          {/* Navigation links */}
          <div className="footer-nav">
            {footerContent.navigation?.items?.map(item => (
              <Link 
                key={item.path}
                to={item.path} 
                className="footer-nav-link"
              >
                {item.label}
              </Link>
            ))}
          </div>
          
          {/* Copyright */}
          <div className="copyright">
            &copy; {currentYear} {footerContent.copyright?.text || "הדס תודה"}
          </div>
        </div>
      </div>
    </footer>
  );
}

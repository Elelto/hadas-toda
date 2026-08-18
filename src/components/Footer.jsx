import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { loadYamlContent } from '../utils/yamlLoader';
import { buildWhatsAppUrl, WHATSAPP_PHONE } from '../utils/whatsapp';
import { FaWhatsapp, FaFacebook, FaInstagram } from 'react-icons/fa';
import '../styles/footer.css';

const getDefaultFooterContent = () => ({
  contact: {
    title: "דברו איתי",
    name: "הדס תודה קלינאית תקשורת",
    phone: "050-6796209",
    email: "hadas.toda.info@gmail.com",
    address: "שיכון ג' בני ברק"
  }
});

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [footerContent, setFooterContent] = useState(getDefaultFooterContent());

  useEffect(() => {
    const loadContent = async () => {
      try {
        const content = await loadYamlContent('/content/components/footer.yml');
        if (content) setFooterContent(content);
      } catch (error) {
        console.warn('Could not load footer content, using defaults');
      }
    };
    loadContent();
  }, []);

  const contact = footerContent.contact || getDefaultFooterContent().contact;

  return (
    <footer className="minimalist-footer">
      <div className="container">
        
        {/* Brand */}
        <div className="minimalist-brand">
          <h2 className="minimalist-logo">הדס תודה</h2>
          <span className="minimalist-tagline">קלינאית תקשורת (M.A)</span>
        </div>
        
        {/* Navigation Inline */}
        <nav className="minimalist-nav" aria-label="Footer Navigation">
          <Link to="/services">תחומי טיפול</Link>
          <span className="separator">•</span>
          <Link to="/about">קצת עליי</Link>
          <span className="separator">•</span>
          <Link to="/testimonials">המלצות</Link>
          <span className="separator">•</span>
          <Link to="/online-therapy">טיפול אונליין</Link>
          <span className="separator">•</span>
          <Link to="/contact">צור קשר</Link>
        </nav>

        {/* Contact Inline */}
        <div className="minimalist-contact">
          <a href={`tel:${contact.phone?.replace(/-/g, '')}`}>{contact.phone}</a>
          <span className="separator">•</span>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
          <span className="separator">•</span>
          <span>{contact.address}</span>
        </div>

        {/* Social & Copyright */}
        <div className="minimalist-bottom">
          <div className="minimalist-socials">
            <a href={buildWhatsAppUrl(WHATSAPP_PHONE)} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <FaWhatsapp />
            </a>
            <a href="#" aria-label="Facebook">
              <FaFacebook />
            </a>
            <a href="#" aria-label="Instagram">
              <FaInstagram />
            </a>
          </div>
          <div className="minimalist-copyright">
            © {currentYear} הדס תודה. כל הזכויות שמורות.
          </div>
        </div>

      </div>
    </footer>
  );
}

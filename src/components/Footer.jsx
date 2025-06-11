import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const navItems = [
    { path: '/', label: 'ראשי' },
    { path: '/services', label: 'תחומי טיפול' },
    { path: '/about', label: 'קצת עליי' },
    { path: '/testimonials', label: 'מטופלים מספרים' },
    { path: '/contact', label: 'דברו איתי' }
  ];

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-content">
          {/* Contact information */}
          <div className="footer-contact">
            <h3 className="footer-heading">דברו איתי</h3>
            <div className="contact-info">
              <div className="contact-name">הדס תודה קלינאית תקשורת</div>
              <a href="tel:0506796209" className="contact-link">050-6796209</a>
              <a href="mailto:hadas-toda@gmail.com" className="contact-link">hadas-toda@gmail.com</a>
              <div className="contact-address">שיכון ג' בני ברק</div>
            </div>
          </div>
          
          {/* Navigation links */}
          <div className="footer-nav">
            {navItems.map(item => (
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
            &copy; {currentYear} הדס תודה
          </div>
        </div>
      </div>
    </footer>
  );
}

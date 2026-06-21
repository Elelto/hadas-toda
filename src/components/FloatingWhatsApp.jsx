import React from 'react';
import { useLocation } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import { buildWhatsAppUrl, WHATSAPP_PHONE, WHATSAPP_MESSAGES } from '../utils/whatsapp';
import '../styles/floating-whatsapp.css';

export default function FloatingWhatsApp() {
  const location = useLocation();

  // Hide on admin routes
  if (location.pathname.startsWith('/admin') || location.pathname.startsWith('/dashboard')) {
    return null;
  }

  return (
    <a
      href={buildWhatsAppUrl(WHATSAPP_PHONE, WHATSAPP_MESSAGES.default)}
      target="_blank"
      rel="noopener noreferrer"
      className="floating-whatsapp"
      aria-label="שלחו הודעה בוואטסאפ"
    >
      <FaWhatsapp className="floating-whatsapp-icon" />
    </a>
  );
}

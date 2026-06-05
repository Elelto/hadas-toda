import React from 'react';
import { Helmet } from 'react-helmet-async';

const GoogleAnalytics = ({ trackingId }) => {
  // קבלת tracking ID ממשתני סביבה או מהפרמטר
  const gaTrackingId = trackingId || import.meta.env.VITE_GA_TRACKING_ID;
  const gadsTrackingId = import.meta.env.VITE_GADS_TRACKING_ID;
  
  if (!gaTrackingId) return null;

  return (
    <Helmet>
      {/* Additional page_view tracking + Hybrid Contact Click Listener */}
      <script>
        {`
          // Additional page_view event tracking for SPA navigation
          if (typeof gtag === 'function') {
            gtag('event', 'page_view', {
              page_title: document.title,
              page_location: window.location.href
            });
          }

          // Global Event Listener for Hybrid Contact Tracking (WhatsApp, Phone, Email)
          if (!window.__gaClickTrackingRegistered) {
            window.__gaClickTrackingRegistered = true;
            document.addEventListener('click', function(event) {
              // Find the closest anchor tag (handles nested elements like icons/spans)
              var anchor = event.target.closest('a');
              if (!anchor) return;
              
              // 1. Bypass global auto-tracking if the element has inline onclick or is explicitly ignored
              if (anchor.hasAttribute('onclick') || anchor.getAttribute('data-track-ignore') === 'true') {
                return;
              }
              
              var customEvent = anchor.getAttribute('data-custom-event');
              var href = anchor.getAttribute('href');
              if (!href && !customEvent) return;
              
              var hrefLower = href ? href.toLowerCase().trim() : '';
              var eventName = null;
              var label = href || '';
              
              // 2. Hybrid support: If data-custom-event is set, use its value as the event name.
              // Otherwise, detect contact link type and use the default event name.
              if (customEvent) {
                eventName = customEvent;
              } else if (hrefLower.indexOf('tel:') === 0) {
                eventName = 'phone_click';
                label = href.substring(4); // Use raw phone number as label
              } else if (hrefLower.indexOf('mailto:') === 0) {
                eventName = 'email_click';
                label = href.substring(7); // Use raw email as label
              } else if (hrefLower.indexOf('https://wa.me/') === 0 || hrefLower.indexOf('https://api.whatsapp.com/') === 0) {
                eventName = 'whatsapp_click';
              }
              
              // 3. Fire events if a matching eventName was determined
              if (eventName && typeof gtag === 'function') {
                // GA4 event - for Analytics reporting
                gtag('event', eventName, {
                  'event_category': 'Contact',
                  'event_label': label,
                  'link_url': href || '',
                  'link_text': anchor.innerText || anchor.textContent || ''
                });
                
                // Google Ads conversion event - fires for ALL contact link clicks
                // Uses gtagSendEvent helper (defined in index.html) to ensure
                // the event is sent before the browser navigates away
                if (typeof gtagSendEvent === 'function') {
                  gtagSendEvent(href || null);
                }
              }
            }, false);
          }
        `}
      </script>
      
      {/* Google Search Console Verification */}
      <meta name="google-site-verification" content={import.meta.env.VITE_GOOGLE_SITE_VERIFICATION || "YOUR_GOOGLE_SEARCH_CONSOLE_CODE"} />
      
      {/* Additional SEO Meta Tags */}
      <meta name="msvalidate.01" content={import.meta.env.VITE_BING_VERIFICATION || ""} />
    </Helmet>
  );
};

export default GoogleAnalytics;

import React from 'react';
import { Helmet } from 'react-helmet-async';

const GoogleAnalytics = ({ trackingId }) => {
  // קבלת tracking ID ממשתני סביבה או מהפרמטר
  const gaTrackingId = trackingId || import.meta.env.VITE_GA_TRACKING_ID;
  
  if (!gaTrackingId) return null;

  return (
    <Helmet>
      {/* Google Analytics */}
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaTrackingId}`}></script>
      <script>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaTrackingId}', {
            page_title: document.title,
            page_location: window.location.href,
            anonymize_ip: true,
            allow_google_signals: false,
            allow_ad_personalization_signals: false,
            cookie_flags: 'SameSite=None;Secure'
          });
          
          // Event tracking for better insights
          gtag('event', 'page_view', {
            page_title: document.title,
            page_location: window.location.href
          });
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

import React from 'react';
import { Helmet } from 'react-helmet-async';

const GoogleAnalytics = ({ trackingId }) => {
  if (!trackingId) return null;

  return (
    <Helmet>
      {/* Google Analytics */}
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`}></script>
      <script>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${trackingId}', {
            page_title: document.title,
            page_location: window.location.href
          });
        `}
      </script>
      
      {/* Google Search Console Verification */}
      <meta name="google-site-verification" content="YOUR_GOOGLE_SEARCH_CONSOLE_CODE" />
    </Helmet>
  );
};

export default GoogleAnalytics;

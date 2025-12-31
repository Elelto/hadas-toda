import React from 'react';
import { Helmet } from 'react-helmet-async';
import GoogleAnalytics from './GoogleAnalytics';

const SEOHead = ({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage,
  ogType = 'website',
  structuredData,
  noindex = false
}) => {
  const siteUrl = 'https://www.hadas-toda.co.il';
  const defaultImage = `${siteUrl}/images/logo.png`;

  const fullTitle = title ? `${title} | הדס תודה - קלינאית תקשורת` : 'הדס תודה | קלינאית תקשורת מוסמכת';
  const fullCanonicalUrl = canonicalUrl ? `${siteUrl}${canonicalUrl}` : siteUrl;
  const imageUrl = ogImage ? `${siteUrl}${ogImage}` : defaultImage;

  return (
    <>
      <Helmet>
        {/* Basic Meta Tags */}
        <title>{fullTitle}</title>
        <meta name="description" content={description} />
        {keywords && <meta name="keywords" content={keywords} />}
        <link rel="canonical" href={fullCanonicalUrl} />

        {/* Robots */}
        {noindex && <meta name="robots" content="noindex, nofollow" />}

        {/* Open Graph */}
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content={ogType} />
        <meta property="og:url" content={fullCanonicalUrl} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:site_name" content="הדס תודה - קלינאית תקשורת" />
        <meta property="og:locale" content="he_IL" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={imageUrl} />

        {/* Additional SEO */}
        <meta name="author" content="הדס תודה" />
        <meta name="language" content="Hebrew" />
        <meta name="geo.region" content="IL-M" />
        <meta name="geo.placename" content="בני ברק, ישראל" />
        <meta name="geo.position" content="32.0851;34.8255" />
        <meta name="ICBM" content="32.0851, 34.8255" />
        <meta name="business:contact_data:locality" content="בני ברק" />
        <meta name="business:contact_data:region" content="מחוז המרכז" />
        <meta name="business:contact_data:country_name" content="ישראל" />

        {/* Performance & SEO */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />

        {/* Structured Data */}
        {structuredData && (
          <script type="application/ld+json">
            {JSON.stringify(structuredData)}
          </script>
        )}
      </Helmet>

      {/* Google Analytics */}
      <GoogleAnalytics />
    </>
  );
};

export default SEOHead;

import React from 'react';
import { Helmet } from 'react-helmet-async';

const StructuredData = ({ type = 'organization', pageData = {} }) => {
  const baseUrl = 'https://www.hadas-toda.co.il';

  // נתוני העסק הבסיסיים
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "@id": `${baseUrl}/#organization`,
    "name": "הדס תודה - קלינאית תקשורת",
    "alternateName": "Hadas Toda Speech Therapist",
    "description": "קלינאית תקשורת מוסמכת (M.A) בבני ברק המתמחה בטיפולי קול, היגוי, גמגום, תפקודי פה ומובנות דיבור לילדים ומבוגרים",
    "url": baseUrl,
    "logo": `${baseUrl}/images/logo.png`,
    "image": `${baseUrl}/images/logo.png`,
    "telephone": "+972-50-679-6209",
    "email": "hadas.toda@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IL",
      "addressRegion": "מחוז המרכז",
      "addressLocality": "בני ברק",
      "postalCode": "5120000",
      "streetAddress": "בני ברק, ישראל"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "32.0851",
      "longitude": "34.8255"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "בני ברק"
      },
      {
        "@type": "City",
        "name": "רמת גן"
      },
      {
        "@type": "City",
        "name": "גבעתיים"
      },
      {
        "@type": "City",
        "name": "תל אביב"
      },
      {
        "@type": "AdministrativeArea",
        "name": "מחוז המרכז"
      }
    ],
    "serviceType": [
      "טיפולי קול וצרידות",
      "טיפול בהיגוי ושיבושי הגייה",
      "טיפול בגמגום ושטף דיבור",
      "טיפול בתפקודי פה ודחיקת לשון",
      "שיפור מובנות דיבור והבהרת דיבור"
    ],
    "medicalSpecialty": "Speech-Language Pathology",
    "priceRange": "$$",
    "paymentAccepted": ["Cash", "Credit Card"],
    "currenciesAccepted": "ILS",
    "openingHours": "Mo-Th 09:00-18:00",
    "sameAs": []
  };

  // נתוני שירותים רפואיים
  const medicalServiceData = {
    "@context": "https://schema.org",
    "@type": "MedicalService",
    "@id": `${baseUrl}/services#service`,
    "name": "שירותי קלינאות תקשורת",
    "description": "שירותי טיפול מקצועיים בתחום קלינאות התקשורת לילדים ומבוגרים",
    "provider": {
      "@id": `${baseUrl}/#organization`
    },
    "serviceType": [
      {
        "@type": "MedicalTherapy",
        "name": "טיפולי קול וצרידות",
        "description": "אבחון וטיפול בהפרעות קול וצרידות. שיקום קולי מקצועי"
      },
      {
        "@type": "MedicalTherapy",
        "name": "טיפול בהיגוי",
        "description": "טיפול בשיבושי היגוי והגייה לילדים ומבוגרים"
      },
      {
        "@type": "MedicalTherapy",
        "name": "טיפול בגמגום",
        "description": "התמודדות עם גמגום והפרעות שטף דיבור"
      },
      {
        "@type": "MedicalTherapy",
        "name": "טיפול בתפקודי פה",
        "description": "טיפול בתפקודי פה, דחיקת לשון ושיפור תפקוד השרירים"
      },
      {
        "@type": "MedicalTherapy",
        "name": "שיפור מובנות דיבור",
        "description": "שיפור מובנות הדיבור והבהרת ההגייה"
      }
    ],
    "areaServed": {
      "@type": "Country",
      "name": "ישראל"
    }
  };

  // נתוני איש מקצוע
  const personData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${baseUrl}/#person`,
    "name": "הדס תודה",
    "jobTitle": "קלינאית תקשורת מוסמכת",
    "description": "קלינאית תקשורת מוסמכת (M.A) עם התמחות בטיפולי קול, היגוי, גמגום, תפקודי פה ומובנות דיבור",
    "url": baseUrl,
    "image": `${baseUrl}/images/logo.png`,
    "telephone": "+972-50-679-6209",
    "email": "hadas.toda@gmail.com",
    "worksFor": {
      "@id": `${baseUrl}/#organization`
    },
    "hasCredential": {
      "@type": "EducationalOccupationalCredential",
      "name": "תואר שני בקלינאות תקשורת",
      "description": "M.A בקלינאות תקשורת"
    },
    "knowsAbout": [
      "טיפולי קול וצרידות",
      "היגוי ושיבושי הגייה",
      "גמגום ושטף דיבור",
      "תפקודי פה ודחיקת לשון",
      "מובנות דיבור",
      "קלינאות תקשורת"
    ],
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "אוניברסיטה"
    }
  };

  // נתוני דף בלוג
  const blogData = pageData.type === 'blog' ? {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${baseUrl}/blog#blog`,
    "name": "בלוג קלינאות תקשורת - הדס תודה",
    "description": "מאמרים וטיפים מקצועיים בתחום קלינאות התקשורת",
    "url": `${baseUrl}/blog`,
    "publisher": {
      "@id": `${baseUrl}/#organization`
    },
    "author": {
      "@id": `${baseUrl}/#person`
    },
    "inLanguage": "he"
  } : null;

  // נתוני פוסט בלוג
  const blogPostData = pageData.type === 'blogPost' ? {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${baseUrl}/blog/${pageData.slug}#article`,
    "headline": pageData.title,
    "description": pageData.description,
    "image": pageData.image ? `${baseUrl}${pageData.image}` : `${baseUrl}/images/logo.png`,
    "author": {
      "@id": `${baseUrl}/#person`
    },
    "publisher": {
      "@id": `${baseUrl}/#organization`
    },
    "datePublished": pageData.datePublished,
    "dateModified": pageData.dateModified || pageData.datePublished,
    "url": `${baseUrl}/blog/${pageData.slug}`,
    "mainEntityOfPage": `${baseUrl}/blog/${pageData.slug}`,
    "articleSection": "קלינאות תקשורת",
    "keywords": pageData.keywords,
    "inLanguage": "he",
    "isPartOf": {
      "@id": `${baseUrl}/blog#blog`
    }
  } : null;

  // בחירת הנתונים לפי סוג הדף
  let structuredData = [];

  switch (type) {
    case 'home':
      structuredData = [organizationData, personData, medicalServiceData];
      break;
    case 'services':
      structuredData = [organizationData, medicalServiceData];
      break;
    case 'about':
      structuredData = [organizationData, personData];
      break;
    case 'blog':
      structuredData = [organizationData, blogData].filter(Boolean);
      break;
    case 'blogPost':
      structuredData = [organizationData, blogPostData].filter(Boolean);
      break;
    default:
      structuredData = [organizationData];
  }

  return (
    <Helmet>
      {structuredData.map((data, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(data, null, 2)}
        </script>
      ))}
    </Helmet>
  );
};

export default StructuredData;

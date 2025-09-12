// SEO utility functions

// Generate dynamic sitemap based on blog posts and pages
export const generateDynamicSitemap = (blogPosts) => {
  const baseUrl = 'https://www.hadas-toda.co.il';
  const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'weekly' },
    { url: '/about', priority: '0.8', changefreq: 'monthly' },
    { url: '/services', priority: '0.9', changefreq: 'monthly' },
    { url: '/contact', priority: '0.8', changefreq: 'monthly' },
    { url: '/testimonials', priority: '0.7', changefreq: 'monthly' },
    { url: '/blog', priority: '0.8', changefreq: 'weekly' },
    { url: '/ai-assessment', priority: '0.6', changefreq: 'monthly' }
  ];

  const blogUrls = blogPosts.map(post => ({
    url: `/blog/${post.slug}`,
    priority: '0.6',
    changefreq: 'monthly',
    lastmod: post.date
  }));

  return [...staticPages, ...blogUrls];
};

// Generate meta keywords based on content
export const generateKeywords = (content, category = '') => {
  const baseKeywords = [
    'קלינאית תקשורת',
    'הדס תודה',
    'טיפול בגמגום',
    'צרידות',
    'בעיות קול',
    'עיכוב שפתי',
    'שיבושי היגוי',
    'ישראל'
  ];

  const categoryKeywords = {
    'voice': ['טיפול בקול', 'צרידות כרונית', 'שיקום קולי', 'בעיות קול'],
    'speech': ['טיפול בדיבור', 'שיבושי היגוי', 'הגייה נכונה'],
    'language': ['עיכוב שפתי', 'התפתחות שפה', 'טיפול שפתי'],
    'stuttering': ['גמגום', 'טיפול בגמגום', 'שטף דיבור'],
    'children': ['ילדים', 'טיפול לילדים', 'התפתחות תקשורת'],
    'adults': ['מבוגרים', 'טיפול למבוגרים', 'שיקום קולי מבוגרים']
  };

  let keywords = [...baseKeywords];
  
  if (category && categoryKeywords[category]) {
    keywords = [...keywords, ...categoryKeywords[category]];
  }

  // Add content-based keywords
  if (content) {
    const contentWords = content.toLowerCase().split(' ');
    const relevantWords = contentWords.filter(word => 
      word.length > 3 && 
      !['הוא', 'היא', 'אני', 'אתה', 'את', 'אנחנו', 'אתם', 'הם', 'הן'].includes(word)
    );
    keywords = [...keywords, ...relevantWords.slice(0, 5)];
  }

  return keywords.slice(0, 15).join(', ');
};

// Generate structured data for local business
export const generateLocalBusinessSchema = () => ({
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "name": "הדס תודה - קלינאית תקשורת",
  "description": "קלינאית תקשורת מוסמכת המתמחה בטיפול בגמגום, צרידות, בעיות קול ועיכוב שפתי",
  "url": "https://www.hadas-toda.co.il",
  "telephone": "+972-50-679-6209",
  "email": "hadas.toda.info@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "שיכון ג'",
    "addressLocality": "בני ברק",
    "addressRegion": "מחוז תל אביב",
    "postalCode": "51200",
    "addressCountry": "IL"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "32.0851",
    "longitude": "34.8255"
  },
  "openingHours": [
    "Mo-Th 09:00-18:00"
  ],
  "priceRange": "$$",
  "medicalSpecialty": "Speech-Language Pathology",
  "serviceArea": {
    "@type": "Place",
    "name": "ישראל"
  },
  "sameAs": [
    "https://www.facebook.com/profile.php?id=61566802899787",
    "https://www.instagram.com/hadas_toda/"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "שירותי קלינאות תקשורת",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "MedicalTherapy",
          "name": "טיפול בגמגום",
          "description": "טיפול מקצועי בגמגום לילדים ומבוגרים"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "MedicalTherapy",
          "name": "טיפול בצרידות ובעיות קול",
          "description": "שיקום קולי וטיפול בצרידות כרונית"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "MedicalTherapy",
          "name": "טיפול בעיכוב שפתי",
          "description": "אבחון וטיפול בעיכוב שפתי אצל ילדים"
        }
      }
    ]
  }
});

// SEO performance optimization tips
export const seoOptimizationTips = {
  images: {
    formats: ['webp', 'avif', 'jpg'],
    maxWidth: 1200,
    quality: 85,
    lazyLoading: true
  },
  content: {
    minWords: 300,
    maxWords: 2000,
    headingStructure: ['h1', 'h2', 'h3'],
    keywordDensity: 0.02 // 2%
  },
  technical: {
    pagespeed: {
      target: 90,
      metrics: ['FCP', 'LCP', 'CLS', 'FID']
    },
    mobile: {
      responsive: true,
      touchFriendly: true,
      viewportOptimized: true
    }
  }
};

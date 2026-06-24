import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import blogPosts from '../data/blogPosts';
import AOS from 'aos';
import SEOHead from '../components/SEOHead';
import { loadFirebaseCollection } from '../utils/firebaseLoader';
import '../styles/blog.css';

export default function Blog() {
  const [filter, setFilter] = useState('all');
  const [posts, setPosts] = useState(blogPosts);
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);

  // Load from Firebase on mount
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const firebasePosts = await loadFirebaseCollection('blog', 'date', 'desc');
        if (firebasePosts && firebasePosts.length > 0) {
          // Map to match the existing properties
          const formatted = firebasePosts.map(p => ({
            ...p,
            date: p.formattedDate || p.date // use hebrew date if available
          }));
          setPosts(formatted);
          setFilteredPosts(filter === 'all' ? formatted : formatted.filter(post => post.categories.includes(filter)));
        }
      } catch (err) {
        console.error('Error loading posts from Firebase, using static fallback:', err);
      }
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    // Refresh AOS when posts are loaded
    const timer = setTimeout(() => {
      AOS.refresh();
    }, 100);
    return () => clearTimeout(timer);
  }, [filteredPosts]);

  // קטגוריות לסינון
  const categories = [
    { id: 'all', label: 'הכל' },
    { id: 'voice', label: 'קול' },
    { id: 'speech', label: 'דיבור' },
    { id: 'language', label: 'שפה' },
    { id: 'children', label: 'ילדים' },
    { id: 'adults', label: 'מבוגרים' }
  ];

  // סינון המאמרים לפי הקטגוריה הנבחרת
  useEffect(() => {
    if (filter === 'all') {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(posts.filter(post => post.categories.includes(filter)));
    }
  }, [filter, posts]);

  // SEO structured data for blog page
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "הבלוג המקצועי - הדס תודה",
    "description": "מאמרים מקצועיים, טיפים וחידושים בתחום קלינאות התקשורת, גמגום, צרידות ובעיות קול",
    "url": "https://hadas-toda.co.il/blog",
    "author": {
      "@type": "Person",
      "name": "הדס תודה",
      "jobTitle": "קלינאית תקשורת"
    },
    "publisher": {
      "@type": "Organization",
      "name": "הדס תודה - קלינאית תקשורת",
      "url": "https://hadas-toda.co.il"
    },
    "blogPost": posts.slice(0, 5).map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "url": `https://hadas-toda.co.il/blog/${post.slug}`,
      "datePublished": post.date,
      "author": {
        "@type": "Person",
        "name": "הדס תודה"
      }
    }))
  };

  return (
    <div className="blog-page page-reveal">
      <SEOHead
        title="בלוג"
        description="הבלוג המקצועי של הדס תודה - מאמרים, טיפים וחידושים בתחום קלינאות התקשורת, גמגום, צרידות ובעיות קול לילדים ומבוגרים."
        keywords="בלוג קלינאות תקשורת, מאמרים מקצועיים, טיפים גמגום, צרידות, בעיות קול, הדס תודה"
        canonicalUrl="/blog"
        structuredData={structuredData}
      />
      <section className="blog-hero">
        <div className="container">
          <h1 className="page-title" data-aos="fade-down">הבלוג המקצועי</h1>
          <p className="page-subtitle" data-aos="fade-up" data-aos-delay="200">מאמרים, טיפים וחידושים בתחום קלינאות התקשורת</p>
        </div>
      </section>

      <section className="blog-content">
        <div className="container">
          {/* סינון לפי קטגוריות */}
          <div className="blog-filters" data-aos="fade-up" data-aos-delay="300">
            <div className="filter-label">סינון לפי נושא:</div>
            <div className="filter-options">
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`filter-btn ${filter === category.id ? 'active' : ''}`}
                  onClick={() => setFilter(category.id)}
                  aria-pressed={filter === category.id}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {/* רשימת המאמרים */}
          <div className="blog-posts-grid">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post, index) => (
                <div className="blog-card" key={post.id} data-aos="fade-up" data-aos-delay={400 + (index * 50)}>
                  <div className="blog-card-image">
                    <img src={post.image} alt={post.title} />
                    {post.categories.map(cat => (
                      <span key={cat} className={`blog-category ${cat}`}>
                        {categories.find(c => c.id === cat)?.label}
                      </span>
                    ))}
                  </div>
                  <div className="blog-card-content">
                    <h3 className="blog-card-title">{post.title}</h3>
                    <p className="blog-card-date">{post.date}</p>
                    <p className="blog-card-excerpt">{post.excerpt}</p>
                    <Link 
                      to={`/blog/${post.slug}`} 
                      className="blog-read-more"
                      aria-label={`המשך קריאה על: ${post.title}`}
                    >
                      המשך קריאה
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-posts-message">
                לא נמצאו מאמרים בקטגוריה זו
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

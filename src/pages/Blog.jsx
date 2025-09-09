import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import blogPosts from '../data/blogPosts';
import AOS from 'aos';
import '../styles/blog.css';

export default function Blog() {
  const [filter, setFilter] = useState('all');
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);

  useEffect(() => {
    setFilteredPosts(blogPosts);
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
      setFilteredPosts(blogPosts);
    } else {
      setFilteredPosts(blogPosts.filter(post => post.categories.includes(filter)));
    }
  }, [filter]);

  return (
    <div className="blog-page">
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
                    <Link to={`/blog/${post.slug}`} className="blog-read-more">
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

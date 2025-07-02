import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/blog.css';
import blogPosts from '../data/blogPosts';

export default function Blog() {
  const [filter, setFilter] = useState('all');
  
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
  const filteredPosts = filter === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.categories.includes(filter));

  return (
    <div className="blog-page">
      <section className="blog-hero">
        <div className="container">
          <h1 className="page-title">הבלוג המקצועי</h1>
          <p className="page-subtitle">מאמרים, טיפים וחידושים בתחום קלינאות התקשורת</p>
        </div>
      </section>
      
      <section className="blog-content">
        <div className="container">
          {/* סינון לפי קטגוריות */}
          <div className="blog-filters">
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
              filteredPosts.map(post => (
                <div className="blog-card" key={post.id}>
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

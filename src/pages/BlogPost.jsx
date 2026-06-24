import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import '../styles/blog.css';
import blogPosts from '../data/blogPosts';
import SEOHead from '../components/SEOHead';
import StructuredData from '../components/StructuredData';
import { loadFirebaseCollection } from '../utils/firebaseLoader';

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [posts, setPosts] = useState(blogPosts);

  // Load from Firebase on mount
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const firebasePosts = await loadFirebaseCollection('blog', 'date', 'desc');
        if (firebasePosts && firebasePosts.length > 0) {
          const formatted = firebasePosts.map(p => ({
            ...p,
            date: p.formattedDate || p.date
          }));
          setPosts(formatted);
        }
      } catch (err) {
        console.error('Error loading posts from Firebase, using static fallback:', err);
      }
    };
    fetchPosts();
  }, []);
  
  // מציאת המאמר המבוקש לפי ה-slug
  const post = posts.find(post => post.slug === slug);
  
  // אם המאמר לא נמצא, מעבר לעמוד הבלוג הראשי
  useEffect(() => {
    if (posts.length > 0 && !post) {
      navigate('/blog');
    }
  }, [post, navigate, posts]);
  
  // אם המאמר לא נמצא, לא מציגים כלום בזמן שמתבצע ניתוב מחדש
  if (!post) return null;
  
  // מציאת המאמרים הקודם והבא
  const currentIndex = posts.findIndex(p => p.slug === slug);
  const prevPost = currentIndex > 0 ? posts[currentIndex - 1] : null;
  const nextPost = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;

  return (
    <>
      <SEOHead
        title={post.title}
        description={post.excerpt || post.description}
        keywords={post.categories?.join(', ') || 'קלינאות תקשורת, בלוג'}
        canonicalUrl={`/blog/${slug}`}
        ogImage={post.image}
        ogType="article"
      />
      <StructuredData 
        type="blogPost" 
        pageData={{
          type: 'blogPost',
          slug: slug,
          title: post.title,
          description: post.excerpt || post.description,
          image: post.image,
          datePublished: post.date,
          dateModified: post.lastModified || post.date,
          keywords: post.categories?.join(', ') || 'קלינאות תקשורת'
        }}
      />
      <div className="blog-post-page page-reveal">
        <div className="container">
          {/* כותרת המאמר */}
          <header className="blog-post-header">
            <div className="blog-post-meta">
              <span className="blog-post-date">{post.date}</span>
              <div className="blog-post-categories">
                {post.categories.map(category => (
                  <span key={category} className={`blog-category ${category}`}>
                    {category === 'voice' && 'קול'}
                    {category === 'speech' && 'דיבור'}
                    {category === 'language' && 'שפה'}
                    {category === 'children' && 'ילדים'}
                    {category === 'adults' && 'מבוגרים'}
                  </span>
                ))}
              </div>
            </div>
            <h1 className="blog-post-title">{post.title}</h1>
            <p className="blog-post-excerpt">{post.excerpt}</p>
          </header>
          
          {/* תמונת כותרת */}
          <div className="blog-post-featured-image">
            <img src={post.image} alt={post.title} />
          </div>
          
          {/* תוכן המאמר */}
          <div className="blog-post-content">
            {/* תוכן המאמר מוזן כ-HTML */}
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
          
          {/* מידע על הכותב */}
          <div className="blog-post-author">
            <div className="author-image">
              <img 
                src="/images/hadas-profile.jpg" 
                alt="הדס תודה" 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/images/logo.png";
                  e.target.style.objectFit = "contain";
                }}
              />
            </div>
            <div className="author-info">
              <h3>הדס תודה</h3>
              <p>קלינאית תקשורת מומחית לשפה, דיבור וקול</p>
            </div>
          </div>
          
          {/* ניווט בין מאמרים */}
          <div className="blog-post-navigation">
            {prevPost && (
              <Link to={`/blog/${prevPost.slug}`} className="prev-post">
                <span className="nav-label">המאמר הקודם</span>
                <span className="nav-title">{prevPost.title}</span>
              </Link>
            )}
            
            <Link to="/blog" className="back-to-blog">
              חזרה לבלוג
            </Link>
            
            {nextPost && (
              <Link to={`/blog/${nextPost.slug}`} className="next-post">
                <span className="nav-label">המאמר הבא</span>
                <span className="nav-title">{nextPost.title}</span>
              </Link>
            )}
          </div>
          
          {/* מאמרים נוספים שעשויים לעניין */}
          <div className="related-posts">
            <h3 className="related-posts-title">מאמרים נוספים שעשויים לעניין אותך</h3>
            <div className="related-posts-grid">
              {posts
                .filter(p => p.slug !== slug && p.categories.some(cat => post.categories.includes(cat)))
                .slice(0, 3)
                .map(relatedPost => (
                  <div className="related-post-card" key={relatedPost.id}>
                    <Link to={`/blog/${relatedPost.slug}`}>
                      <div className="related-post-image">
                        <img src={relatedPost.image} alt={relatedPost.title} />
                      </div>
                      <h4 className="related-post-title">{relatedPost.title}</h4>
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

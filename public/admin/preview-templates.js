import globalStyles from '../../src/styles/global.css?url';
import blogStyles from '../../src/styles/blog.css?url';

console.log('Registering CMS preview templates & styles...');

const CMS = window.CMS;

if (CMS) {
  // Register fonts and styles for the preview iframe
  CMS.registerPreviewStyle('https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700&family=Heebo:wght@300;400;500;600;700&display=swap');
  CMS.registerPreviewStyle(globalStyles);
  CMS.registerPreviewStyle(blogStyles);

  // Define the Blog Post Preview component
  const PostPreview = ({ entry, widgetFor, getAsset }) => {
    const title = entry.getIn(['data', 'title']) || '';
    const dateVal = entry.getIn(['data', 'date']);
    
    // Format date in Hebrew locale format
    let dateStr = '';
    if (dateVal) {
      try {
        const dateObj = typeof dateVal === 'object' && dateVal.toDate ? dateVal.toDate() : new Date(dateVal);
        if (!isNaN(dateObj.getTime())) {
          dateStr = dateObj.toLocaleDateString('he-IL', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          });
        }
      } catch (e) {
        console.error('Error parsing preview date:', e);
      }
    }
    
    const excerpt = entry.getIn(['data', 'excerpt']) || '';
    const imageVal = entry.getIn(['data', 'image']);
    const image = imageVal ? getAsset(imageVal) : '';
    const categories = entry.getIn(['data', 'categories']);
    const categoriesArray = categories ? categories.toJS() : [];

    const h = window.React.createElement;

    return h('div', { className: 'blog-post-page', style: { padding: '20px 0' } },
      h('div', { className: 'container' },
        // Blog post header
        h('header', { className: 'blog-post-header' },
          h('div', { className: 'blog-post-meta' },
            dateStr && h('span', { className: 'blog-post-date' }, dateStr),
            categoriesArray.length > 0 && h('div', { className: 'blog-post-categories' },
              categoriesArray.map(category => {
                let label = category;
                if (category === 'voice') label = 'קול';
                else if (category === 'speech') label = 'דיבור';
                else if (category === 'language') label = 'שפה';
                else if (category === 'children') label = 'ילדים';
                else if (category === 'adults') label = 'מבוגרים';
                
                return h('span', { key: category, className: `blog-category ${category}` }, label);
              })
            )
          ),
          h('h1', { className: 'blog-post-title' }, title),
          excerpt && h('p', { className: 'blog-post-excerpt' }, excerpt)
        ),
        
        // Featured image
        image && h('div', { className: 'blog-post-featured-image' },
          h('img', { src: image, alt: title })
        ),
        
        // Blog post markdown content
        h('div', { className: 'blog-post-content' },
          widgetFor('body')
        ),
        
        // Author signature
        h('div', { className: 'blog-post-author' },
          h('div', { className: 'author-image' },
            h('img', { src: '/images/hadas-profile.jpg', alt: 'הדס תודה' })
          ),
          h('div', { className: 'author-info' },
            h('h3', {}, 'הדס תודה'),
            h('p', {}, 'קלינאית תקשורת מומחית לשפה, דיבור וקול')
          )
        )
      )
    );
  };

  CMS.registerPreviewTemplate('blog', PostPreview);
  console.log('Blog preview template registered successfully!');
} else {
  console.error('CMS object not found globally! Could not register previews.');
}

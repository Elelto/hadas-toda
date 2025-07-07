// Custom preview templates for Netlify CMS
// This adds a more visually appealing preview for blog posts

// Hebrew date formatting helper
const hebrewMonths = {
  '1': 'ינואר',
  '2': 'פברואר',
  '3': 'מרץ',
  '4': 'אפריל',
  '5': 'מאי',
  '6': 'יוני',
  '7': 'יולי',
  '8': 'אוגוסט',
  '9': 'ספטמבר',
  '10': 'אוקטובר',
  '11': 'נובמבר',
  '12': 'דצמבר'
};

// Helper function to format date in Hebrew
function formatDateToHebrew(dateString) {
  try {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    
    const hebrewMonth = hebrewMonths[month.toString()];
    return `${day} ב${hebrewMonth}, ${year}`;
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
}

// Wait for Netlify CMS to load
window.addEventListener('load', function() {
  // Make sure NetlifyCMS is available
  if (window.CMS) {
    // Register the preview template
    CMS.registerPreviewStyle('admin-rtl.css');
    
    // Create a React component for the blog post preview
    const BlogPostPreview = CMS.createClass({
      render: function() {
        const entry = this.props.entry;
        const title = entry.getIn(['data', 'title']) || 'כותרת הפוסט';
        const date = entry.getIn(['data', 'date']);
        const formattedDate = date ? formatDateToHebrew(date) : 'תאריך';
        const image = entry.getIn(['data', 'image']);
        const imageUrl = image ? this.props.getAsset(image).toString() : '';
        const categories = entry.getIn(['data', 'categories']);
        
        return CMS.createElement('div', { className: 'blog-preview' },
          CMS.createElement('h1', { className: 'blog-preview-title' }, title),
          CMS.createElement('div', { className: 'blog-preview-date' }, formattedDate),
          categories && categories.toJS ? CMS.createElement('div', { className: 'blog-preview-categories' },
            categories.toJS().map((category, index) => 
              CMS.createElement('span', { className: 'blog-preview-category', key: index }, category)
            )
          ) : null,
          imageUrl ? CMS.createElement('img', { className: 'blog-preview-image', src: imageUrl, alt: title }) : null,
          CMS.createElement('div', { className: 'blog-preview-content' }, this.props.widgetFor('body'))
        );
      }
    });
    
    // Register the preview template for blog posts
    CMS.registerPreviewTemplate('blog', BlogPostPreview);
    
    // Add custom logo to the header
    setTimeout(() => {
      const header = document.querySelector('[class*="AppHeader"]');
      if (header) {
        const logoContainer = document.createElement('div');
        logoContainer.className = 'custom-logo';
        logoContainer.textContent = 'הדס תודה';
        
        // Insert at the beginning of the header
        header.insertBefore(logoContainer, header.firstChild);
      }
    }, 500);
  }
});

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const DOMAIN = 'https://www.hadas-toda.co.il';

console.log('🗺️  Generating sitemap...');

// Get all blog posts
function getBlogPosts() {
    const blogDir = path.join(__dirname, '../src/content/blog');
    if (!fs.existsSync(blogDir)) return [];

    const files = fs.readdirSync(blogDir);
    const posts = files
        .filter(file => file.endsWith('.md'))
        .map(file => {
            const filePath = path.join(blogDir, file);
            const fileContent = fs.readFileSync(filePath, 'utf8');
            const { data } = matter(fileContent);

            // Extract slug from filename: YYYY-MM-DD-slug.md
            const slugMatch = file.match(/^\d{4}-\d{2}-\d{2}-(.+)\.md$/);
            const slug = slugMatch ? slugMatch[1] : file.replace('.md', '');

            return {
                slug,
                date: data.date,
                lastmod: data.lastmod || data.date // Use lastmod if available, otherwise date
            };
        })
        .sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by newest

    return posts;
}

// Define static pages with their priorities and changefreq
const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'weekly' },
    { url: '/bnei-brak', priority: '0.9', changefreq: 'monthly' },
    { url: '/online-therapy', priority: '0.9', changefreq: 'monthly' },
    { url: '/services', priority: '0.9', changefreq: 'monthly' },
    { url: '/blog', priority: '0.8', changefreq: 'weekly' },
    { url: '/about', priority: '0.8', changefreq: 'monthly' },
    { url: '/contact', priority: '0.8', changefreq: 'monthly' },
    { url: '/testimonials', priority: '0.7', changefreq: 'monthly' },
    { url: '/ai-assessment', priority: '0.6', changefreq: 'monthly' },
];

function generateSitemap() {
    const posts = getBlogPosts();
    const today = new Date().toISOString().split('T')[0];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    // Add static pages
    staticPages.forEach(page => {
        xml += `
  <url>
    <loc>${DOMAIN}${page.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
    });

    // Add blog posts
    posts.forEach(post => {
        // Format date to ISO format YYYY-MM-DD
        let lastmod = today;
        try {
            if (post.lastmod) {
                lastmod = new Date(post.lastmod).toISOString().split('T')[0];
            }
        } catch (e) {
            console.warn(`Invalid date for post ${post.slug}`);
        }

        xml += `
  <url>
    <loc>${DOMAIN}/blog/${post.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
    });

    xml += `
</urlset>`;

    const outputPath = path.join(__dirname, '../public/sitemap.xml');
    fs.writeFileSync(outputPath, xml);
    console.log(`✅ Sitemap generated with ${staticPages.length} pages and ${posts.length} blog posts.`);
}

generateSitemap();

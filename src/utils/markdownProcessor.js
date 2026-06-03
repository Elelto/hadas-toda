import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';

const markdownRenderer = new MarkdownIt({
  html: false,
  linkify: true,
  typographer: false,
  breaks: false
});

function normalizeMarkdown(markdown = '') {
  return String(markdown).replace(/\\[ \t]*(\r?\n)/g, '$1');
}

export function formatDateToHebrew(dateString) {
  try {
    const date = new Date(dateString);

    return new Intl.DateTimeFormat('he-IL', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
}

export function extractSlugFromFilename(fileName) {
  const match = fileName.match(/^\d{4}-\d{2}-\d{2}-(.+)\.md$/);

  if (match && match[1]) {
    return match[1];
  }

  return fileName.replace(/\.md$/, '');
}

export function markdownToHtml(markdown = '') {
  const html = markdownRenderer.render(normalizeMarkdown(markdown));
  return html
    .replace(/<table>/g, '<div class="table-container"><table>')
    .replace(/<\/table>/g, '</table></div>');
}

export function processMarkdown(fileContent, fileName) {
  const { data: frontmatter, content } = matter(fileContent);
  const slug = extractSlugFromFilename(fileName);
  const htmlContent = markdownToHtml(content);
  const formattedDate = formatDateToHebrew(frontmatter.date);

  return {
    title: frontmatter.title || 'ללא כותרת',
    slug,
    date: formattedDate,
    excerpt: frontmatter.excerpt || '',
    image: frontmatter.image || '',
    categories: frontmatter.categories || [],
    content: htmlContent
  };
}

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// Function to transform flat YAML structure to nested structure
function transformAboutContent(flatContent) {
  return {
    hero: {
      title: flatContent.title || "נעים להכיר, הדס תודה",
      subtitle: flatContent.subtitle || "קלינאית תקשורת (M.A), מומחית בטיפול בקול, צרידות, שפה ודיבור לילדים ומבוגרים"
    },
    content: {
      title: "מסע אל הקול הפנימי והחיצוני",
      paragraphs: [
        flatContent.paragraph1 || "",
        flatContent.paragraph2 || "",
        flatContent.paragraph3 || "",
        flatContent.highlight || ""
      ].filter(p => p) // Remove empty paragraphs
    },
    qualifications: {
      title: flatContent.qualifications_title || "הכשרה, ניסיון והתמחויות",
      items: flatContent.qualifications?.map(item => typeof item === 'string' ? item : item.item) || []
    },
    quote: {
      text: flatContent.quote || "הקול שלנו הוא הגשר בין עולמנו הפנימי לעולם החיצון. אני כאן כדי לעזור לכם לבנות גשר חזק, יציב וצלול.",
      author: "הדס תודה"
    }
  };
}

// Sync about page content
function syncAboutContent() {
  try {
    const srcPath = path.join(__dirname, '../src/content/pages/about.yml');
    const publicPath = path.join(__dirname, '../public/content/pages/about.yml');
    
    if (fs.existsSync(srcPath)) {
      const srcContent = fs.readFileSync(srcPath, 'utf8');
      const parsedContent = yaml.load(srcContent);
      const transformedContent = transformAboutContent(parsedContent);
      
      // Write transformed content to public folder
      const yamlOutput = yaml.dump(transformedContent, { 
        defaultFlowStyle: false,
        lineWidth: -1,
        noRefs: true
      });
      
      fs.writeFileSync(publicPath, yamlOutput, 'utf8');
      console.log('✅ About page content synced successfully');
    }
  } catch (error) {
    console.error('❌ Error syncing about content:', error);
  }
}

// Watch for changes and sync
function watchAndSync() {
  const srcDir = path.join(__dirname, '../src/content/pages');
  
  if (fs.existsSync(srcDir)) {
    fs.watch(srcDir, (eventType, filename) => {
      if (filename === 'about.yml' && eventType === 'change') {
        console.log('📝 About page content changed, syncing...');
        setTimeout(syncAboutContent, 100); // Small delay to ensure file is fully written
      }
    });
    console.log('👀 Watching for content changes...');
  }
}

// Initial sync
syncAboutContent();

// Start watching if this script is run directly
if (require.main === module) {
  watchAndSync();
  console.log('🚀 Content sync service started');
}

module.exports = { syncAboutContent, transformAboutContent };

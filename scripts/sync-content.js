const fs = require('fs');
const path = require('path');

// Function to copy directory recursively
function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
      console.log(`Copied: ${srcPath} -> ${destPath}`);
    }
  }
}

// Sync content from src/content to public/content
function syncContent() {
  const srcDir = path.join(__dirname, '../src/content');
  const destDir = path.join(__dirname, '../public/content');
  
  console.log('Syncing content files...');
  copyDir(srcDir, destDir);
  console.log('Content sync completed!');
}

// Run sync
syncContent();

// Watch for changes if this is run with --watch flag
if (process.argv.includes('--watch')) {
  const chokidar = require('chokidar');
  
  console.log('Watching for content changes...');
  const watcher = chokidar.watch('src/content/**/*.yml', {
    ignored: /node_modules/,
    persistent: true
  });
  
  watcher.on('change', (filePath) => {
    console.log(`File changed: ${filePath}`);
    syncContent();
  });
  
  watcher.on('add', (filePath) => {
    console.log(`File added: ${filePath}`);
    syncContent();
  });
  
  watcher.on('unlink', (filePath) => {
    console.log(`File removed: ${filePath}`);
    syncContent();
  });
}

const fs = require('fs');
const path = require('path');

const directory = path.join(__dirname, '../public/landing');

function processDir(dir) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      processDir(fullPath);
    } else if (item.endsWith('.html')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('../shared/style.css') || content.includes('../shared/track.js')) {
        content = content.replace(/\.\.\/shared\/style\.css/g, '/landing/shared/style.css');
        content = content.replace(/\.\.\/shared\/track\.js/g, '/landing/shared/track.js');
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated: ${fullPath}`);
      }
    }
  }
}

processDir(directory);
console.log('Path replacement completed successfully!');

/**
 * optimize-uploads.js
 * 
 * Scans the public/images/uploads directory and automatically generates WebP
 * versions for all JPG/PNG images to improve site loading speed.
 */

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const UPLOADS_DIR = path.join(__dirname, '..', 'public', 'images', 'uploads');

const WEBP_QUALITY = 80;

async function processDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) {
    console.log(`Directory not found, skipping: ${dirPath}`);
    return;
  }

  const files = fs.readdirSync(dirPath);
  let optimizedCount = 0;
  let totalSavingsBytes = 0;

  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      await processDirectory(fullPath);
    } else if (stat.isFile()) {
      const ext = path.extname(file).toLowerCase();
      
      // We only want to convert JPG and PNG files
      if (['.jpg', '.jpeg', '.png'].includes(ext)) {
        const baseName = path.basename(file, ext);
        const webpName = `${baseName}.webp`;
        const webpPath = path.join(dirPath, webpName);
        
        let shouldOptimize = true;

        if (fs.existsSync(webpPath)) {
          const webpStat = fs.statSync(webpPath);
          if (stat.mtimeMs <= webpStat.mtimeMs) {
            shouldOptimize = false; // WebP is already up-to-date
          }
        }

        if (shouldOptimize) {
          console.log(`📷 Optimizing: ${file} -> ${webpName}`);
          try {
            await sharp(fullPath)
              .webp({ quality: WEBP_QUALITY })
              .toFile(webpPath);
            
            const newStat = fs.statSync(webpPath);
            const savings = stat.size - newStat.size;
            
            if (savings > 0) {
              totalSavingsBytes += savings;
            }
            optimizedCount++;
          } catch (err) {
            console.error(`❌ Failed to optimize ${file}:`, err);
          }
        }
      }
    }
  }

  if (optimizedCount > 0) {
    console.log(`✅ Optimized ${optimizedCount} images in ${dirPath}`);
    console.log(`💾 Saved ${(totalSavingsBytes / 1024 / 1024).toFixed(2)} MB in total.`);
  }
}

async function run() {
  console.log('🚀 Starting global WebP optimization for uploads...');
  await processDirectory(UPLOADS_DIR);
  console.log('✨ Optimization complete!');
}

run().catch(err => {
  console.error('❌ Optimization script failed:', err);
  process.exit(1);
});

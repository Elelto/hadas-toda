/**
 * optimize-recommendations.js
 * 
 * Compresses & converts recommendation images for optimal loading:
 *   - Full-size WebP + JPEG (max 800px wide) → for lightbox
 *   - Thumbnail WebP + JPEG (max 400px wide) → for carousel/grid cards
 * 
 * Source: public/images/uploads/rec-N.jpeg (or any image defined in testimonials.yml)
 * Output: public/images/recommendation/optimized/
 *           [basename].webp, [basename].jpg          (full-size)
 *           [basename]-thumb.webp, [basename]-thumb.jpg  (thumbnail)
 * 
 * Usage:  node scripts/optimize-recommendations.js
 */

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');

const YML_PATH = path.join(__dirname, '..', 'src', 'content', 'pages', 'testimonials.yml');
const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const OUT_DIR = path.join(PUBLIC_DIR, 'images', 'recommendation', 'optimized');

const FULL_WIDTH = 800;
const THUMB_WIDTH = 400;
const JPEG_QUALITY = 75;
const WEBP_QUALITY = 75;

async function optimizeImages() {
  // Ensure output directory exists
  if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
  }

  if (!fs.existsSync(YML_PATH)) {
    console.error(`❌ Testimonials YAML not found at: ${YML_PATH}`);
    process.exit(1);
  }

  // Load testimonials
  const yamlText = fs.readFileSync(YML_PATH, 'utf8');
  const data = yaml.load(yamlText);
  const imagesList = data.images || [];

  console.log(`🔍 Found ${imagesList.length} images to optimize in testimonials.yml`);

  const expectedFiles = new Set();
  let totalSrcBytes = 0;
  let totalOutBytes = 0;

  for (const item of imagesList) {
    if (!item.image || item.hide === true) continue;

    // Resolve source path (YAML paths start with / e.g. /images/uploads/rec-1.jpeg)
    const relativeSrcPath = item.image.startsWith('/') ? item.image.substring(1) : item.image;
    const srcPath = path.join(PUBLIC_DIR, relativeSrcPath);

    if (!fs.existsSync(srcPath)) {
      console.warn(`⚠  Skipping missing image: ${srcPath}`);
      continue;
    }

    const srcExt = path.extname(srcPath);
    const srcBaseName = path.basename(srcPath, srcExt); // e.g. rec-1

    // Add expected optimized files to set
    const fullJpgName = `${srcBaseName}.jpg`;
    const fullWebpName = `${srcBaseName}.webp`;
    const thumbJpgName = `${srcBaseName}-thumb.jpg`;
    const thumbWebpName = `${srcBaseName}-thumb.webp`;

    expectedFiles.add(fullJpgName);
    expectedFiles.add(fullWebpName);
    expectedFiles.add(thumbJpgName);
    expectedFiles.add(thumbWebpName);

    const srcSize = fs.statSync(srcPath).size;
    totalSrcBytes += srcSize;

    const fullJpgPath = path.join(OUT_DIR, fullJpgName);
    const fullWebpPath = path.join(OUT_DIR, fullWebpName);
    const thumbJpgPath = path.join(OUT_DIR, thumbJpgName);
    const thumbWebpPath = path.join(OUT_DIR, thumbWebpName);

    // Run Sharp optimization if source file is newer than output or outputs don't exist
    const outExist = fs.existsSync(fullJpgPath) && fs.existsSync(fullWebpPath) && fs.existsSync(thumbJpgPath) && fs.existsSync(thumbWebpPath);
    
    let shouldOptimize = !outExist;
    if (outExist) {
      const srcMtime = fs.statSync(srcPath).mtimeMs;
      const outMtime = fs.statSync(fullJpgPath).mtimeMs;
      if (srcMtime > outMtime) {
        shouldOptimize = true;
      }
    }

    if (shouldOptimize) {
      console.log(`📷 Optimizing: ${srcBaseName}${srcExt} (${(srcSize / 1024).toFixed(0)} KB)`);
      try {
        const image = sharp(srcPath);
        const metadata = await image.metadata();

        // Full-size variants (max 800px wide)
        await sharp(srcPath)
          .resize({ width: FULL_WIDTH, withoutEnlargement: true })
          .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
          .toFile(fullJpgPath);

        await sharp(srcPath)
          .resize({ width: FULL_WIDTH, withoutEnlargement: true })
          .webp({ quality: WEBP_QUALITY })
          .toFile(fullWebpPath);

        // Thumbnail variants (max 400px wide)
        await sharp(srcPath)
          .resize({ width: THUMB_WIDTH, withoutEnlargement: true })
          .jpeg({ quality: JPEG_QUALITY - 5, mozjpeg: true })
          .toFile(thumbJpgPath);

        await sharp(srcPath)
          .resize({ width: THUMB_WIDTH, withoutEnlargement: true })
          .webp({ quality: WEBP_QUALITY - 5 })
          .toFile(thumbWebpPath);
      } catch (err) {
        console.error(`❌ Failed to optimize ${srcBaseName}:`, err);
        continue;
      }
    } else {
      console.log(`⚡ Already optimized (cached): ${srcBaseName}`);
    }

    // Accumulate sizes (using WebP + Jpeg sizes for estimation/tracking if needed, or just WebP)
    totalOutBytes += fs.statSync(fullWebpPath).size + fs.statSync(thumbWebpPath).size;
  }

  // --- Garbage Collection ---
  console.log('\n🧹 Running Garbage Collection in optimized folder...');
  if (fs.existsSync(OUT_DIR)) {
    const existingFiles = fs.readdirSync(OUT_DIR);
    let deletedCount = 0;
    for (const file of existingFiles) {
      const filePath = path.join(OUT_DIR, file);
      if (fs.statSync(filePath).isFile()) {
        if (!expectedFiles.has(file)) {
          console.log(`   🗑️  Deleting orphan: ${file}`);
          fs.unlinkSync(filePath);
          deletedCount++;
        }
      }
    }
    console.log(`   Cleaned up ${deletedCount} orphan files.`);
  }

  const totalSrcMB = (totalSrcBytes / 1024 / 1024).toFixed(2);
  const totalOutMB = (totalOutBytes / 1024 / 1024).toFixed(2);
  const totalSavings = totalSrcBytes > 0 ? ((1 - totalOutBytes / totalSrcBytes) * 100).toFixed(0) : 0;

  console.log('═══════════════════════════════════');
  console.log(`📦 Original total:  ${totalSrcMB} MB`);
  console.log(`📦 Optimized total: ${totalOutMB} MB (WebP + Thumb WebP)`);
  console.log(`💾 Total savings:   ${totalSavings}%`);
  console.log('═══════════════════════════════════');
}

optimizeImages().catch(err => {
  console.error('❌ Optimization failed:', err);
  process.exit(1);
});

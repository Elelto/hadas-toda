/**
 * optimize-recommendations.js
 * 
 * Compresses & converts recommendation images for optimal loading:
 *   - Full-size WebP + JPEG (max 800px wide) → for lightbox
 *   - Thumbnail WebP + JPEG (max 400px wide) → for carousel/grid cards
 * 
 * Source: public/images/recommendation/N.jpeg
 * Output: public/images/recommendation/optimized/
 *           N.webp, N.jpg          (full-size)
 *           N-thumb.webp, N-thumb.jpg  (thumbnail)
 * 
 * Usage:  node scripts/optimize-recommendations.js
 */

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const SRC_DIR = path.join(__dirname, '..', 'public', 'images', 'recommendation');
const OUT_DIR = path.join(SRC_DIR, 'optimized');

const FULL_WIDTH = 800;
const THUMB_WIDTH = 400;
const JPEG_QUALITY = 75;
const WEBP_QUALITY = 75;
const IMAGE_COUNT = 10;

async function optimizeImages() {
  // Ensure output directory exists
  if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
  }

  let totalSrcBytes = 0;
  let totalOutBytes = 0;

  for (let i = 1; i <= IMAGE_COUNT; i++) {
    const srcPath = path.join(SRC_DIR, `${i}.jpeg`);

    if (!fs.existsSync(srcPath)) {
      console.warn(`⚠  Skipping ${i}.jpeg — file not found`);
      continue;
    }

    const srcSize = fs.statSync(srcPath).size;
    totalSrcBytes += srcSize;

    const image = sharp(srcPath);
    const metadata = await image.metadata();

    console.log(`📷 ${i}.jpeg  ${(srcSize / 1024 / 1024).toFixed(2)} MB  (${metadata.width}×${metadata.height})`);

    // Full-size variants (max 800px wide)
    const fullJpgPath = path.join(OUT_DIR, `${i}.jpg`);
    const fullWebpPath = path.join(OUT_DIR, `${i}.webp`);

    await sharp(srcPath)
      .resize({ width: FULL_WIDTH, withoutEnlargement: true })
      .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
      .toFile(fullJpgPath);

    await sharp(srcPath)
      .resize({ width: FULL_WIDTH, withoutEnlargement: true })
      .webp({ quality: WEBP_QUALITY })
      .toFile(fullWebpPath);

    // Thumbnail variants (max 400px wide)
    const thumbJpgPath = path.join(OUT_DIR, `${i}-thumb.jpg`);
    const thumbWebpPath = path.join(OUT_DIR, `${i}-thumb.webp`);

    await sharp(srcPath)
      .resize({ width: THUMB_WIDTH, withoutEnlargement: true })
      .jpeg({ quality: JPEG_QUALITY - 5, mozjpeg: true })
      .toFile(thumbJpgPath);

    await sharp(srcPath)
      .resize({ width: THUMB_WIDTH, withoutEnlargement: true })
      .webp({ quality: WEBP_QUALITY - 5 })
      .toFile(thumbWebpPath);

    // Report per-image savings
    const fullJpg = fs.statSync(fullJpgPath).size;
    const fullWebp = fs.statSync(fullWebpPath).size;
    const thumbJpg = fs.statSync(thumbJpgPath).size;
    const thumbWebp = fs.statSync(thumbWebpPath).size;

    totalOutBytes += fullWebp + thumbWebp; // Count WebP as the primary format

    const savings = ((1 - (fullWebp + thumbWebp) / srcSize) * 100).toFixed(0);
    console.log(`   ✅ full: ${(fullWebp / 1024).toFixed(0)}KB webp / ${(fullJpg / 1024).toFixed(0)}KB jpg`);
    console.log(`   ✅ thumb: ${(thumbWebp / 1024).toFixed(0)}KB webp / ${(thumbJpg / 1024).toFixed(0)}KB jpg`);
    console.log(`   💾 savings: ${savings}%`);
    console.log('');
  }

  const totalSrcMB = (totalSrcBytes / 1024 / 1024).toFixed(2);
  const totalOutMB = (totalOutBytes / 1024 / 1024).toFixed(2);
  const totalSavings = ((1 - totalOutBytes / totalSrcBytes) * 100).toFixed(0);

  console.log('═══════════════════════════════════');
  console.log(`📦 Original total:  ${totalSrcMB} MB`);
  console.log(`📦 Optimized total: ${totalOutMB} MB (WebP only)`);
  console.log(`💾 Total savings:   ${totalSavings}%`);
  console.log('═══════════════════════════════════');
}

optimizeImages().catch(err => {
  console.error('❌ Optimization failed:', err);
  process.exit(1);
});

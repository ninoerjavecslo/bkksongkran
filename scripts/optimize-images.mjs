#!/usr/bin/env node
/**
 * Image optimization script for Songkran website
 * Generates WebP variants and smaller responsive versions
 * Run once: node scripts/optimize-images.mjs
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '../public');

async function optimizeImages() {
  console.log('🖼️  Starting image optimization...\n');

  try {
    // 1. festival-s2o.jpg → WebP versions
    console.log('Converting festival-s2o.jpg to WebP...');
    const s2oInput = path.join(publicDir, 'festival-s2o.jpg');

    // Full-size WebP
    await sharp(s2oInput)
      .webp({ quality: 80 })
      .toFile(path.join(publicDir, 'festival-s2o.webp'));
    console.log('  ✓ festival-s2o.webp (1440px)');

    // 800px responsive variant
    await sharp(s2oInput)
      .resize(800, Math.round((555 / 1440) * 800), { withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(path.join(publicDir, 'festival-s2o-800.webp'));
    console.log('  ✓ festival-s2o-800.webp (800px)');

    // 2. festival-gcircuit.jpg → WebP version
    console.log('\nConverting festival-gcircuit.jpg to WebP...');
    const gcircuitInput = path.join(publicDir, 'festival-gcircuit.jpg');

    await sharp(gcircuitInput)
      .webp({ quality: 80 })
      .toFile(path.join(publicDir, 'festival-gcircuit.webp'));
    console.log('  ✓ festival-gcircuit.webp (750px)');

    // 3. festival-siam-songkran.webp → responsive variant
    console.log('\nCreating responsive variant of festival-siam-songkran.webp...');
    const siamInput = path.join(publicDir, 'festival-siam-songkran.webp');

    // 800px responsive variant (maintaining aspect ratio from 2000x1153)
    await sharp(siamInput)
      .resize(800, Math.round((1153 / 2000) * 800), { withoutEnlargement: true })
      .webp({ quality: 75 })
      .toFile(path.join(publicDir, 'festival-siam-songkran-800.webp'));
    console.log('  ✓ festival-siam-songkran-800.webp (800px)');

    console.log('\n✅ All images optimized successfully!\n');
    console.log('Generated files:');
    console.log('  • festival-s2o.webp');
    console.log('  • festival-s2o-800.webp');
    console.log('  • festival-gcircuit.webp');
    console.log('  • festival-siam-songkran-800.webp');
    console.log('\nEstimated savings: ~900 KiB\n');
  } catch (error) {
    console.error('❌ Error during image optimization:', error.message);
    process.exit(1);
  }
}

optimizeImages();

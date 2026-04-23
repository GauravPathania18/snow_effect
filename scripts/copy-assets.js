#!/usr/bin/env node

/**
 * Copy build assets to public folder
 * Ensures the public folder is self-contained for serving
 */

const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const publicDir = path.join(rootDir, 'public');
const distDir = path.join(rootDir, 'dist');
const styleFile = path.join(rootDir, 'style.css');

// Ensure public directory exists
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Copy style.css
if (fs.existsSync(styleFile)) {
  fs.copyFileSync(styleFile, path.join(publicDir, 'style.css'));
  console.log('✓ Copied style.css to public/');
}

// Copy dist folder
if (fs.existsSync(distDir)) {
  const publicDistDir = path.join(publicDir, 'dist');
  
  // Remove existing dist if it exists
  if (fs.existsSync(publicDistDir)) {
    fs.rmSync(publicDistDir, { recursive: true });
  }
  
  // Copy new dist folder
  fs.cpSync(distDir, publicDistDir, { recursive: true });
  console.log('✓ Copied dist/ to public/');
}

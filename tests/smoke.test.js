/**
 * Smoke Test for UI-Effects
 * Tests basic functionality without a browser
 */

console.log('🧪 Running UI-Effects smoke tests...\n');

const tests = {
  passed: 0,
  failed: 0,
  errors: []
};

function test(name, fn) {
  try {
    fn();
    console.log(`✅ ${name}`);
    tests.passed++;
  } catch (err) {
    console.log(`❌ ${name}`);
    console.log(`   Error: ${err.message}`);
    tests.failed++;
    tests.errors.push({ name, error: err.message });
  }
}

// Test 1: Check build output exists
test('Build output file exists', () => {
  const fs = require('fs');
  const path = require('path');
  const bundlePath = path.join(__dirname, '../dist/ui-effects.min.js');
  if (!fs.existsSync(bundlePath)) {
    throw new Error(`Bundle not found at ${bundlePath}. Run: npm run build`);
  }
  const stats = fs.statSync(bundlePath);
  if (stats.size < 1000) {
    throw new Error(`Bundle too small (${stats.size} bytes). Possible build issue.`);
  }
  console.log(`   Size: ${(stats.size / 1024).toFixed(2)}KB`);
});

// Test 2: Check source files exist
test('Source files exist', () => {
  const fs = require('fs');
  const path = require('path');
  const files = [
    'src/index.js',
    'src/core/SnowEffect.js',
    'src/core/EffectManager.js',
    'src/ui/createSnowButton.js'
  ];
  files.forEach(file => {
    const fullPath = path.join(__dirname, '../', file);
    if (!fs.existsSync(fullPath)) {
      throw new Error(`Missing source file: ${file}`);
    }
  });
});

// Test 3: Check bundle contains expected content
test('Bundle contains key components', () => {
  const fs = require('fs');
  const path = require('path');
  const bundlePath = path.join(__dirname, '../dist/ui-effects.min.js');
  const content = fs.readFileSync(bundlePath, 'utf8');
  
  const required = [
    'SnowEffect',
    'EffectManager',
    'createSnowButton',
    'UIEffects'
  ];
  
  required.forEach(component => {
    if (!content.includes(component)) {
      throw new Error(`Missing component in bundle: ${component}`);
    }
  });
});

// Test 4: Check README exists and has content
test('README documentation exists', () => {
  const fs = require('fs');
  const path = require('path');
  const readmePath = path.join(__dirname, '../README.md');
  if (!fs.existsSync(readmePath)) {
    throw new Error('README.md not found');
  }
  const content = fs.readFileSync(readmePath, 'utf8');
  if (content.length < 500) {
    throw new Error('README.md is too short - documentation incomplete');
  }
  if (!content.includes('Installation') || !content.includes('API')) {
    throw new Error('README.md missing key sections');
  }
});

// Test 5: Check package.json valid
test('package.json is valid', () => {
  const path = require('path');
  const pkg = require('../package.json');
  if (!pkg.name || !pkg.version) {
    throw new Error('package.json missing name or version');
  }
  if (!pkg.scripts || !pkg.scripts.build) {
    throw new Error('package.json missing build script');
  }
});

// Test 6: Check source map exists after build
test('Source map generated', () => {
  const fs = require('fs');
  const path = require('path');
  const mapPath = path.join(__dirname, '../dist/ui-effects.min.js.map');
  if (!fs.existsSync(mapPath)) {
    throw new Error('Source map not found. Run: npm run build');
  }
  const stats = fs.statSync(mapPath);
  console.log(`   Size: ${(stats.size / 1024).toFixed(2)}KB`);
});

// Summary
console.log(`\n${'='.repeat(50)}`);
console.log(`Tests passed: ${tests.passed}`);
console.log(`Tests failed: ${tests.failed}`);
console.log(`${'='.repeat(50)}\n`);

if (tests.failed > 0) {
  process.exit(1);
} else {
  console.log('✅ All smoke tests passed!\n');
}

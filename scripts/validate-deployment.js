#!/usr/bin/env node

/**
 * Pre-deployment validation script
 * Checks that everything is ready for Netlify deployment
 */

const fs = require('fs');
const path = require('path');

console.log('\n🔍 Running pre-deployment validation...\n');

let errors = 0;
let warnings = 0;

// Check required files
console.log('📁 Checking required files:\n');

const requiredFiles = [
  'netlify.toml',
  'package.json',
  'public/_headers',
  'public/_redirects',
  'public/robots.txt',
  'public/sitemap.xml',
  'public/manifest.json',
  'scripts/build.mjs',
  'scripts/optimize.mjs'
];

requiredFiles.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - MISSING`);
    errors++;
  }
});

// Check netlify functions
console.log('\n⚡ Checking Netlify functions:\n');

const functionsDir = path.join(process.cwd(), 'netlify/functions');
if (fs.existsSync(functionsDir)) {
  const functions = fs.readdirSync(functionsDir).filter(f => f.endsWith('.js'));
  if (functions.length > 0) {
    functions.forEach(fn => console.log(`✅ ${fn}`));
  } else {
    console.log('⚠️  No functions found (optional)');
    warnings++;
  }
} else {
  console.log('⚠️  Functions directory not found (optional)');
  warnings++;
}

// Check package.json
console.log('\n📦 Checking package.json:\n');

try {
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  
  if (pkg.scripts && pkg.scripts.build) {
    console.log('✅ Build script found');
  } else {
    console.log('❌ Build script missing');
    errors++;
  }
  
  if (pkg.dependencies) {
    console.log(`✅ ${Object.keys(pkg.dependencies).length} dependencies`);
  }
} catch (err) {
  console.log('❌ Error reading package.json');
  errors++;
}

// Check netlify.toml
console.log('\n⚙️  Checking netlify.toml:\n');

try {
  const toml = fs.readFileSync('netlify.toml', 'utf8');
  
  if (toml.includes('publish = "dist"')) {
    console.log('✅ Publish directory configured');
  } else {
    console.log('⚠️  Publish directory not set to "dist"');
    warnings++;
  }
  
  if (toml.includes('[build]')) {
    console.log('✅ Build configuration found');
  } else {
    console.log('❌ Build configuration missing');
    errors++;
  }
  
  if (toml.includes('[[forms]]')) {
    console.log('✅ Forms configured');
  } else {
    console.log('⚠️  No forms configured (optional)');
    warnings++;
  }
  
  if (toml.includes('[[headers]]')) {
    console.log('✅ Headers configured');
  } else {
    console.log('⚠️  Headers not configured');
    warnings++;
  }
  
  if (toml.includes('[[redirects]]')) {
    console.log('✅ Redirects configured');
  } else {
    console.log('❌ Redirects not configured (needed for SPA)');
    errors++;
  }
} catch (err) {
  console.log('❌ Error reading netlify.toml');
  errors++;
}

// Check build output
console.log('\n🏗️  Checking build output:\n');

const distDir = path.join(process.cwd(), 'dist');
if (fs.existsSync(distDir)) {
  const files = fs.readdirSync(distDir);
  console.log(`✅ dist/ directory exists (${files.length} files)`);
  
  if (files.includes('index.html')) {
    console.log('✅ index.html found in dist/');
  } else {
    console.log('❌ index.html missing in dist/');
    errors++;
  }
  
  // Check for optimization artifacts
  if (files.includes('_headers')) {
    console.log('✅ _headers copied to dist/');
  } else {
    console.log('⚠️  _headers not in dist/ (run optimize script)');
    warnings++;
  }
  
  if (files.includes('_redirects')) {
    console.log('✅ _redirects copied to dist/');
  } else {
    console.log('⚠️  _redirects not in dist/ (run optimize script)');
    warnings++;
  }
} else {
  console.log('⚠️  dist/ directory not found (run build first)');
  warnings++;
}

// Summary
console.log('\n' + '='.repeat(50));
console.log('\n📊 Validation Summary:\n');

if (errors === 0 && warnings === 0) {
  console.log('🎉 Perfect! Everything looks good!\n');
  console.log('✅ Ready to deploy to Netlify\n');
  console.log('Next steps:');
  console.log('1. Commit and push to GitHub');
  console.log('2. Connect repository to Netlify');
  console.log('3. Deploy!\n');
} else if (errors === 0) {
  console.log(`✅ Ready to deploy (${warnings} warnings)\n`);
  console.log('Warnings are optional but recommended to fix.\n');
} else {
  console.log(`❌ Not ready to deploy (${errors} errors, ${warnings} warnings)\n`);
  console.log('Please fix the errors above before deploying.\n');
  process.exit(1);
}

console.log('📚 Documentation:');
console.log('   • Quick Start: NETLIFY_QUICK_START.md');
console.log('   • Full Guide: NETLIFY_DEPLOYMENT_GUIDE.md\n');

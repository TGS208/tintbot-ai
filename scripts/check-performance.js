#!/usr/bin/env node

/**
 * Performance check script for deployed site
 * Tests key performance metrics and reports issues
 */

const https = require('https');
const http = require('http');

const SITE_URL = process.argv[2] || 'https://tintbot.ai';

console.log(`\n🔍 Checking performance for: ${SITE_URL}\n`);

// Parse URL
const url = new URL(SITE_URL);
const client = url.protocol === 'https:' ? https : http;

// Test homepage load time
const startTime = Date.now();

const req = client.get(SITE_URL, (res) => {
  const loadTime = Date.now() - startTime;
  
  console.log('📊 Performance Metrics:\n');
  console.log(`⏱️  Load Time: ${loadTime}ms`);
  console.log(`✅ Status Code: ${res.statusCode}`);
  console.log(`📦 Content-Type: ${res.headers['content-type']}`);
  
  // Check headers
  console.log('\n🔒 Security Headers:\n');
  
  const securityHeaders = [
    'x-frame-options',
    'x-content-type-options',
    'strict-transport-security',
    'referrer-policy',
    'x-xss-protection'
  ];
  
  securityHeaders.forEach(header => {
    const value = res.headers[header];
    if (value) {
      console.log(`✅ ${header}: ${value}`);
    } else {
      console.log(`❌ ${header}: MISSING`);
    }
  });
  
  // Check cache headers
  console.log('\n💾 Cache Headers:\n');
  console.log(`Cache-Control: ${res.headers['cache-control'] || 'MISSING'}`);
  console.log(`ETag: ${res.headers['etag'] || 'MISSING'}`);
  
  // Performance assessment
  console.log('\n📈 Performance Assessment:\n');
  
  if (loadTime < 500) {
    console.log('🌟 Excellent: Load time under 500ms');
  } else if (loadTime < 1000) {
    console.log('✅ Good: Load time under 1s');
  } else if (loadTime < 2000) {
    console.log('⚠️  Fair: Load time under 2s');
  } else {
    console.log('❌ Poor: Load time over 2s - optimization needed');
  }
  
  // Recommendations
  console.log('\n💡 Recommendations:\n');
  
  if (!res.headers['cache-control']) {
    console.log('• Add Cache-Control headers for better caching');
  }
  
  if (res.headers['x-frame-options'] !== 'SAMEORIGIN') {
    console.log('• Set X-Frame-Options to SAMEORIGIN');
  }
  
  if (!res.headers['strict-transport-security']) {
    console.log('• Enable HSTS (Strict-Transport-Security)');
  }
  
  if (loadTime > 1000) {
    console.log('• Enable CDN/caching for faster delivery');
    console.log('• Optimize images and assets');
    console.log('• Enable compression (gzip/brotli)');
  }
  
  console.log('\n✨ For detailed analysis, use:');
  console.log(`   https://pagespeed.web.dev/analysis?url=${encodeURIComponent(SITE_URL)}`);
  console.log('');
  
}).on('error', (err) => {
  console.error('❌ Error:', err.message);
  console.log('\n💡 Tips:');
  console.log('• Make sure the site is deployed and accessible');
  console.log('• Check if the URL is correct');
  console.log('• Try accessing the site in your browser first\n');
});

req.setTimeout(10000); // 10 second timeout

/**
 * Post-build optimization script for Netlify deployment
 * Handles comprehensive optimizations without external dependencies
 */

import { readFileSync, writeFileSync, existsSync, readdirSync, copyFileSync, mkdirSync } from 'fs'
import path from 'path'

const DIST_DIR = './dist'
const PUBLIC_DIR = './public'

console.log('🚀 Starting post-build optimization...')

// Copy public assets to dist
function copyPublicAssets() {
  try {
    const publicFiles = ['_headers', '_redirects', 'robots.txt', 'sitemap.xml', 'manifest.json', 'success.html', 'forms.html']
    
    publicFiles.forEach(file => {
      const sourcePath = path.join(PUBLIC_DIR, file)
      const destPath = path.join(DIST_DIR, file)
      
      if (existsSync(sourcePath)) {
        copyFileSync(sourcePath, destPath)
        console.log(`  ✓ Copied ${file}`)
      }
    })
    
    console.log('✅ Public assets copied to dist')
  } catch (error) {
    console.warn('⚠️ Public assets copy failed:', error.message)
  }
}

// Generate comprehensive HTML optimizations
function optimizeHTML() {
  try {
    const htmlFiles = ['index.html']
    
    htmlFiles.forEach(file => {
      const filePath = path.join(DIST_DIR, file)
      if (existsSync(filePath)) {
        let html = readFileSync(filePath, 'utf8')
        
        // Add comprehensive meta tags and optimizations
        const enhancements = `
        <!-- SEO Enhancements -->
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
        <meta name="googlebot" content="index, follow">
        <link rel="canonical" href="https://tintbot.ai/">
        
        <!-- Preconnect to external domains for performance -->
        <link rel="dns-prefetch" href="https://fonts.googleapis.com">
        <link rel="dns-prefetch" href="https://fonts.gstatic.com">
        <link rel="dns-prefetch" href="https://cdn.tailwindcss.com">
        <link rel="dns-prefetch" href="https://unpkg.com">
        
        <!-- PWA Manifest -->
        <link rel="manifest" href="/manifest.json">
        <meta name="mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
        <meta name="apple-mobile-web-app-title" content="Tintbot.ai">
        
        <!-- Favicon - add if exists -->
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
        
        <!-- Theme Color -->
        <meta name="theme-color" content="#FF6B35">
        <meta name="msapplication-TileColor" content="#FF6B35">
        
        <!-- Structured Data for SEO -->
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Tintbot.ai",
          "applicationCategory": "BusinessApplication",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "operatingSystem": "Web",
          "description": "AI-powered platform for window tint professionals to qualify leads, book appointments, and automate operations",
          "url": "https://tintbot.ai",
          "screenshot": "https://tintbot.ai/og-image.png"
        }
        </script>
        
        <!-- Netlify Analytics Snippet (will be auto-injected if enabled in dashboard) -->
        `
        
        // Insert after charset meta tag
        if (html.includes('<meta charset="UTF-8">')) {
          html = html.replace('<meta charset="UTF-8">', `<meta charset="UTF-8">${enhancements}`)
        } else if (html.includes('<head>')) {
          html = html.replace('<head>', `<head>${enhancements}`)
        }
        
        // Add resource hints for critical resources
        const resourceHints = `
        <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap">
        <link rel="preload" as="script" href="https://cdn.tailwindcss.com">
        `
        
        // Insert before closing head tag
        html = html.replace('</head>', `${resourceHints}</head>`)
        
        writeFileSync(filePath, html)
      }
    })
    
    console.log('✅ HTML optimized with SEO and performance enhancements')
  } catch (error) {
    console.warn('⚠️ HTML optimization failed:', error.message)
  }
}

// Generate a simple service worker for PWA capabilities
function generateServiceWorker() {
  try {
    const swContent = `// Service Worker for Tintbot.ai
// Provides offline functionality and faster loading

const CACHE_NAME = 'tintbot-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
`;
    
    writeFileSync(path.join(DIST_DIR, 'sw.js'), swContent)
    console.log('✅ Service worker generated')
  } catch (error) {
    console.warn('⚠️ Service worker generation failed:', error.message)
  }
}

// Create netlify.toml in dist if needed (backup)
function ensureNetlifyConfig() {
  try {
    const netlifyTomlPath = path.join(DIST_DIR, 'netlify.toml')
    // Don't overwrite if exists
    if (!existsSync(netlifyTomlPath)) {
      const config = `# Netlify configuration (backup in dist)
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
`
      writeFileSync(netlifyTomlPath, config)
      console.log('✅ Netlify config ensured')
    }
  } catch (error) {
    console.warn('⚠️ Netlify config check failed:', error.message)
  }
}

// Run all optimizations
try {
  copyPublicAssets()
  optimizeHTML()
  generateServiceWorker()
  ensureNetlifyConfig()
  console.log('🎉 All optimizations completed successfully!')
} catch (error) {
  console.error('❌ Optimization failed:', error)
  // Don't exit with error - optimization is optional
}


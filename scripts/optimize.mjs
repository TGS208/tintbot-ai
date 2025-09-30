/**
 * Post-build optimization script for Netlify deployment
 * Handles basic optimizations without external dependencies
 */

import { readFileSync, writeFileSync, existsSync } from 'fs'
import path from 'path'

const DIST_DIR = './dist'

console.log('🚀 Starting post-build optimization...')

// Generate basic HTML optimizations
function optimizeHTML() {
  try {
    const htmlFiles = ['index.html']
    
    htmlFiles.forEach(file => {
      const filePath = path.join(DIST_DIR, file)
      if (existsSync(filePath)) {
        let html = readFileSync(filePath, 'utf8')
        
        // Add basic meta tags
        const metaTags = `
        <meta name="robots" content="index, follow">
        <meta name="googlebot" content="index, follow">
        <link rel="canonical" href="https://tintbot.ai/">
        `
        
        html = html.replace('<meta name="viewport"', `${metaTags}<meta name="viewport"`)
        writeFileSync(filePath, html)
      }
    })
    
    console.log('✅ HTML optimized')
  } catch (error) {
    console.warn('⚠️ HTML optimization failed:', error.message)
  }
}

// Run optimization
try {
  optimizeHTML()
  console.log('🎉 Optimization completed!')
} catch (error) {
  console.error('❌ Optimization failed:', error)
  // Don't exit with error - optimization is optional
}

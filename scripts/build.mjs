/**
 * SIMPLE Tintbot.ai Build System - Copy Static HTML
 * Copies the root index.html and public assets to dist
 */

import { mkdirSync, existsSync, copyFileSync, readdirSync, statSync } from 'fs'
import { join } from 'path'

console.log('🚀 Building Tintbot.ai - Copying static HTML...')

// Recursively copy directory
function copyDirectory(src, dest) {
  if (!existsSync(dest)) {
    mkdirSync(dest, { recursive: true })
  }

  const entries = readdirSync(src)

  for (const entry of entries) {
    const srcPath = join(src, entry)
    const destPath = join(dest, entry)

    if (statSync(srcPath).isDirectory()) {
      copyDirectory(srcPath, destPath)
    } else {
      copyFileSync(srcPath, destPath)
    }
  }
}

try {
  // Create dist directory
  if (!existsSync('dist')) {
    mkdirSync('dist', { recursive: true })
  }

  console.log('✅ Copying root index.html to dist/')
  copyFileSync('index.html', 'dist/index.html')

  console.log('✅ Copying demo.html to dist/')
  if (existsSync('demo.html')) {
    copyFileSync('demo.html', 'dist/demo.html')
  }

  console.log('✅ Copying features.html to dist/')
  if (existsSync('features.html')) {
    copyFileSync('features.html', 'dist/features.html')
  }

  console.log('✅ Copying pricing.html to dist/')
  if (existsSync('pricing.html')) {
    copyFileSync('pricing.html', 'dist/pricing.html')
  }

  console.log('✅ Copying quote.html to dist/')
  if (existsSync('quote.html')) {
    copyFileSync('quote.html', 'dist/quote.html')
  }

  console.log('✅ Copying public assets (including hero image) to dist/public/')
  if (existsSync('public')) {
    copyDirectory('public', 'dist/public')
  }

  console.log('✅ Copying components (chatbot scripts) to dist/components/')
  if (existsSync('components')) {
    copyDirectory('components', 'dist/components')
  }

  console.log('✅ Copying chat-welcome.html to dist/')
  if (existsSync('chat-welcome.html')) {
    copyFileSync('chat-welcome.html', 'dist/chat-welcome.html')
  }

  console.log('✅ Build complete! Your static HTML site is ready.')
  console.log('📁 Output: dist/index.html, dist/components/chat-overlay.js, dist/chat-welcome.html')

} catch (error) {
  console.error('❌ Build failed:', error.message)
  process.exit(1)
}

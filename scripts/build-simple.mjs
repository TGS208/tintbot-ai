/**
 * SIMPLE Tintbot.ai Build System - Copy Static HTML
 * Copies the root index.html (which has all the working content) to dist
 */

import { mkdirSync, existsSync, copyFileSync } from 'fs'

console.log('🚀 Building Tintbot.ai - Copying static HTML...')

try {
  // Create dist directory
  if (!existsSync('dist')) {
    mkdirSync('dist', { recursive: true })
  }

  console.log('✅ Copying root index.html to dist/')
  // Copy the root index.html which already has all the working content
  copyFileSync('index.html', 'dist/index.html')
  
  console.log('✅ Build complete! Your static HTML site is ready.')
  console.log('📁 Output: dist/index.html')
  
} catch (error) {
  console.error('❌ Build failed:', error.message)
  process.exit(1)
}

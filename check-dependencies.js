/**
 * Dependency checker script for Tintbot.ai
 * Verifies all required packages are properly configured
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Checking Tintbot.ai Dependencies...\n');

try {
  // Check if package.json exists
  const packagePath = path.join(process.cwd(), 'package.json');
  if (!fs.existsSync(packagePath)) {
    console.error('❌ package.json not found!');
    process.exit(1);
  }

  // Read package.json
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  
  console.log('📦 Project:', packageJson.name);
  console.log('📂 Version:', packageJson.version);
  
  // Check critical dependencies
  const criticalDeps = ['esbuild', 'react', 'react-dom', 'tailwindcss'];
  
  console.log('\n🔧 Critical Dependencies:');
  criticalDeps.forEach(dep => {
    const version = packageJson.dependencies?.[dep] || packageJson.devDependencies?.[dep];
    if (version) {
      console.log(`✅ ${dep}: ${version}`);
    } else {
      console.log(`❌ ${dep}: MISSING`);
    }
  });
  
  // Check if node_modules exists
  const nodeModulesPath = path.join(process.cwd(), 'node_modules');
  if (fs.existsSync(nodeModulesPath)) {
    console.log('\n📁 node_modules: EXISTS');
    
    // Check if esbuild is actually installed
    const esbuildPath = path.join(nodeModulesPath, 'esbuild');
    if (fs.existsSync(esbuildPath)) {
      console.log('✅ esbuild: INSTALLED');
    } else {
      console.log('❌ esbuild: NOT INSTALLED');
    }
  } else {
    console.log('\n❌ node_modules: NOT FOUND - Run npm install!');
  }
  
  console.log('\n🚀 Next Steps:');
  console.log('1. Run: npm install');
  console.log('2. Run: npm run build');
  console.log('3. Run: npm run dev');
  
} catch (error) {
  console.error('❌ Error checking dependencies:', error.message);
}

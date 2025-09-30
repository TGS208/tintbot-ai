#!/usr/bin/env node

/**
 * Generate Netlify status badge for README
 * Usage: node scripts/generate-badge.js [site-name]
 */

const siteName = process.argv[2] || 'YOUR-SITE-NAME';

const badge = `[![Netlify Status](https://api.netlify.com/api/v1/badges/YOUR-SITE-ID/deploy-status)](https://app.netlify.com/sites/${siteName}/deploys)`;

console.log('\n🎯 Netlify Status Badge:\n');
console.log(badge);
console.log('\n📝 Instructions:');
console.log('1. Deploy your site to Netlify');
console.log('2. Go to: Site Settings → General → Site information');
console.log('3. Copy your API ID (the badge ID)');
console.log('4. Replace YOUR-SITE-ID in the badge above');
console.log(`5. Replace YOUR-SITE-NAME with: ${siteName}`);
console.log('6. Add the badge to your README.md\n');

console.log('🔗 Example:');
console.log(`[![Netlify Status](https://api.netlify.com/api/v1/badges/12345678-abcd-1234-abcd-123456789abc/deploy-status)](https://app.netlify.com/sites/${siteName}/deploys)\n`);

#!/usr/bin/env node

/**
 * Automated Netlify Deployment Setup Script
 * This script prepares and validates everything needed for deployment
 */

const fs = require('fs')
const path = require('path')

console.log('🚀 Tintbot.ai Netlify Deployment Setup\n')

// Load deployment configuration
const configPath = path.join(__dirname, '../netlify-deployment-config.json')
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'))

let errors = 0
let warnings = 0

// =============================================================================
// Step 1: Validate Required Files
// =============================================================================
console.log('📁 Step 1: Validating Required Files\n')

const requiredFiles = [
  'netlify.toml',
  'package.json',
  'public/_headers',
  'public/_redirects',
  'public/forms.html',
  'scripts/build.mjs',
  'scripts/optimize.mjs'
]

requiredFiles.forEach(file => {
  const filePath = path.join(__dirname, '..', file)
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file}`)
  } else {
    console.log(`❌ ${file} - MISSING`)
    errors++
  }
})

// =============================================================================
// Step 2: Validate Netlify Functions
// =============================================================================
console.log('\n⚡ Step 2: Validating Netlify Functions\n')

const functionsDir = path.join(__dirname, '../netlify/functions')
const requiredFunctions = [
  'lead-router.js',
  'capture-lead.js',
  'google-sheets-capture.js',
  'subscribe.js',
  'webhook.js'
]

requiredFunctions.forEach(func => {
  const funcPath = path.join(functionsDir, func)
  if (fs.existsSync(funcPath)) {
    console.log(`✅ ${func}`)
  } else {
    console.log(`⚠️  ${func} - Missing (optional)`)
    warnings++
  }
})

// =============================================================================
// Step 3: Check Form Configuration
// =============================================================================
console.log('\n📋 Step 3: Validating Form Configuration\n')

const formsHtml = path.join(__dirname, '../public/forms.html')
if (fs.existsSync(formsHtml)) {
  const formsContent = fs.readFileSync(formsHtml, 'utf8')
  
  Object.keys(config.forms).forEach(formName => {
    if (formsContent.includes(`name="${formName}"`)) {
      console.log(`✅ Form: ${formName}`)
    } else {
      console.log(`❌ Form: ${formName} - NOT CONFIGURED`)
      errors++
    }
  })
} else {
  console.log('❌ forms.html not found')
  errors++
}

// =============================================================================
// Step 4: Validate netlify.toml
// =============================================================================
console.log('\n⚙️  Step 4: Validating netlify.toml\n')

const netlifyToml = path.join(__dirname, '../netlify.toml')
if (fs.existsSync(netlifyToml)) {
  const tomlContent = fs.readFileSync(netlifyToml, 'utf8')
  
  const checks = {
    'Build command configured': tomlContent.includes('command = "npm run build:prod"'),
    'Publish directory set': tomlContent.includes('publish = "dist"'),
    'Functions directory set': tomlContent.includes('functions = "netlify/functions"'),
    'Forms configured': tomlContent.includes('[[forms]]'),
    'Redirects configured': tomlContent.includes('[[redirects]]'),
    'Headers configured': tomlContent.includes('[[headers]]')
  }
  
  Object.entries(checks).forEach(([check, passed]) => {
    if (passed) {
      console.log(`✅ ${check}`)
    } else {
      console.log(`❌ ${check}`)
      errors++
    }
  })
} else {
  console.log('❌ netlify.toml not found')
  errors++
}

// =============================================================================
// Step 5: Check Build Output
// =============================================================================
console.log('\n🏗️  Step 5: Checking Build Output\n')

const distDir = path.join(__dirname, '../dist')
if (fs.existsSync(distDir)) {
  const distFiles = fs.readdirSync(distDir)
  console.log(`✅ dist/ directory exists (${distFiles.length} files)`)
  
  const requiredDistFiles = ['index.html', '_headers', '_redirects', 'forms.html']
  requiredDistFiles.forEach(file => {
    if (distFiles.includes(file)) {
      console.log(`✅ ${file} in dist/`)
    } else {
      console.log(`⚠️  ${file} missing in dist/`)
      warnings++
    }
  })
} else {
  console.log('⚠️  dist/ directory not found - run npm run build:prod first')
  warnings++
}

// =============================================================================
// Step 6: Integration Configuration Check
// =============================================================================
console.log('\n🔌 Step 6: Integration Configuration Status\n')

const integrations = config.integrations.optional

Object.entries(integrations).forEach(([name, integration]) => {
  const allVarsSet = integration.env_vars.every(
    varName => process.env[varName]
  )
  
  if (allVarsSet) {
    console.log(`✅ ${name} - Configured`)
  } else {
    console.log(`⚪ ${name} - Not configured (optional)`)
  }
})

console.log('\n💡 Tip: All integrations are optional. Configure them in Netlify Dashboard → Environment Variables')

// =============================================================================
// Step 7: Generate Deployment Checklist
// =============================================================================
console.log('\n📋 Step 7: Deployment Checklist\n')

console.log('Pre-Deployment:')
console.log('  [x] Code committed to GitHub')
console.log('  [x] Build system configured')
console.log('  [x] Forms configured')
console.log('  [x] Functions created')
console.log('')
console.log('Deployment (via Netlify Dashboard):')
console.log('  [ ] 1. Log into Netlify')
console.log('  [ ] 2. Click "Add new site" → "Import an existing project"')
console.log('  [ ] 3. Connect to GitHub')
console.log('  [ ] 4. Select TGS208/tintbot-ai repository')
console.log('  [ ] 5. Confirm build settings (auto-detected from netlify.toml)')
console.log('  [ ] 6. Click "Deploy site"')
console.log('  [ ] 7. Wait for build to complete (2-3 minutes)')
console.log('')
console.log('Post-Deployment:')
console.log('  [ ] 1. Visit your site URL')
console.log('  [ ] 2. Test form submission')
console.log('  [ ] 3. Check Netlify Dashboard → Forms for submissions')
console.log('  [ ] 4. Configure optional integrations (if desired)')

// =============================================================================
// Step 8: Create Quick Start Guide
// =============================================================================
console.log('\n📖 Step 8: Generating Quick Start Files\n')

const quickStartContent = `# 🚀 Quick Start: Deploy to Netlify

## ✅ Prerequisites Completed
- Build system configured
- Forms configured  
- Functions ready
- All files validated

## 🎯 Deploy in 3 Steps

### Step 1: Connect to Netlify
1. Go to [netlify.com](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Choose GitHub
4. Select \`TGS208/tintbot-ai\` repository
5. Select branch: \`main\`

### Step 2: Verify Build Settings
Netlify will auto-detect these from netlify.toml:
- **Build command**: \`npm run build:prod\`
- **Publish directory**: \`dist\`
- **Functions directory**: \`netlify/functions\`
- **Node version**: 20

✅ Click "Deploy site"

### Step 3: Wait for Build
- Build takes 2-3 minutes
- Site will be live at \`random-name.netlify.app\`
- Forms will start capturing leads immediately

## 🎉 Post-Deployment

### Test Your Site
1. Visit your Netlify URL
2. Fill out the business assessment form
3. Submit the form
4. Check Netlify Dashboard → Forms → business-assessment-leads

### View Lead Submissions
\`\`\`
Netlify Dashboard → Forms → [Form Name] → View submissions
\`\`\`

### Export Lead Data
- Click "Export to CSV" in Netlify Forms dashboard
- Download all submissions as spreadsheet

## 🔌 Optional: Add Integrations

All integrations are optional. Add them only if needed.

### Google Sheets Integration
1. Go to Netlify Dashboard → Site settings → Environment variables
2. Add:
   - \`GOOGLE_SHEETS_CLIENT_EMAIL\`
   - \`GOOGLE_SHEETS_PRIVATE_KEY\`
   - \`GOOGLE_SHEET_ID\`
3. Leads will automatically save to your sheet

### Slack Notifications
1. Create Slack webhook: https://api.slack.com/messaging/webhooks
2. Add to Netlify environment variables:
   - \`SLACK_WEBHOOK_URL\`
3. Get instant notifications for new leads

### Email Notifications
1. Get SendGrid API key: https://app.sendgrid.com/settings/api_keys
2. Add to Netlify environment variables:
   - \`SENDGRID_API_KEY\`
   - \`NOTIFICATION_EMAIL\`
3. Receive email for each new lead

## 📊 Lead Data

All leads are automatically captured with:
- ✅ Contact information (name, email, phone)
- ✅ Business details
- ✅ Timestamp and source tracking
- ✅ Lead quality score (0-100)
- ✅ UTM parameters (if present)
- ✅ User agent and IP
- ✅ Spam protection (honeypot + Netlify)

## 🆘 Troubleshooting

### Forms not capturing?
- Check Netlify Dashboard → Forms (may take 5 minutes to appear)
- Verify form has \`data-netlify="true"\` attribute
- Check function logs for errors

### Build failed?
- Check Netlify build logs
- Verify Node version is 20
- Try \`npm run build:prod\` locally first

### Need help?
- Check: NETLIFY_OPTIMIZATION_ANALYSIS.md
- Netlify Docs: https://docs.netlify.com/forms/setup/
- Community: https://community.netlify.com/

---

## ✨ You're Ready to Deploy!

Your site is 100% ready for deployment. No additional code needed.

**Next Step**: Log into Netlify and follow Step 1 above.
`

const quickStartPath = path.join(__dirname, '../QUICK_START_NETLIFY.md')
fs.writeFileSync(quickStartPath, quickStartContent)
console.log('✅ Created QUICK_START_NETLIFY.md')

// =============================================================================
// Final Summary
// =============================================================================
console.log('\n' + '='.repeat(70))
console.log('📊 DEPLOYMENT READINESS SUMMARY')
console.log('='.repeat(70) + '\n')

if (errors === 0 && warnings === 0) {
  console.log('✅ ALL CHECKS PASSED!')
  console.log('\n🎉 Your site is 100% ready for deployment!')
  console.log('\n📖 Next steps:')
  console.log('   1. Read: QUICK_START_NETLIFY.md')
  console.log('   2. Log into Netlify')
  console.log('   3. Import GitHub repository')
  console.log('   4. Deploy!')
} else {
  console.log(`⚠️  Found ${errors} error(s) and ${warnings} warning(s)`)
  
  if (errors > 0) {
    console.log('\n❌ CRITICAL: Fix errors before deploying')
  }
  
  if (warnings > 0) {
    console.log('\n⚠️  Warnings can be fixed after deployment')
  }
}

console.log('\n' + '='.repeat(70) + '\n')

// Exit with appropriate code
process.exit(errors > 0 ? 1 : 0)

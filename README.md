# 🤖 Tintbot.ai

[![Netlify Status](https://api.netlify.com/api/v1/badges/YOUR-SITE-ID/deploy-status)](https://app.netlify.com/sites/YOUR-SITE-NAME/deploys)

**AI-Powered Platform for Window Tint Professionals**

Transform your window tint shop with AI automation that qualifies leads, books appointments, and creates social content 24/7.

## 🚀 Quick Start

### Option 1: Deploy to Netlify (Recommended)

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/TGS208/tintbot-ai)

1. Click the button above
2. Connect your GitHub account
3. Deploy automatically
4. Your site is live in minutes!

**Full guide:** [NETLIFY_QUICK_START.md](./NETLIFY_QUICK_START.md)

### Option 2: Local Development

```bash
# Clone the repository
git clone https://github.com/TGS208/tintbot-ai.git
cd tintbot-ai

# Install dependencies
npm install

# Build the project
npm run build

# The built site is in the dist/ folder
# Open dist/index.html in your browser
```

**Windows Users:** See [WINDOWS_GUIDE.md](./WINDOWS_GUIDE.md) for PowerShell commands and troubleshooting

## ✨ Features

- **🤖 AI Chatbot** - Qualifies leads automatically 24/7
- **📅 Smart Booking** - Seamless appointment scheduling
- **📱 Social Automation** - Auto-generate and post content
- **📊 Business Analytics** - Track performance and ROI
- **🎯 Lead Scoring** - Prioritize high-quality prospects
- **💼 CRM Integration** - Sync with your existing tools

## 📁 Project Structure

```
tintbot-ai/
├── src/                  # Source code (React components)
├── scripts/              # Build scripts
│   ├── build.mjs        # Main build script
│   └── optimize.mjs     # Post-build optimizations
├── netlify/
│   └── functions/       # Serverless functions
├── public/              # Static assets
├── dist/                # Built output (auto-generated)
├── netlify.toml         # Netlify configuration
└── package.json         # Dependencies and scripts
```

## 🛠️ Build Commands

```bash
# Development build
npm run dev

# Production build
npm run build

# Production build with optimizations (used by Netlify)
npm run build && node scripts/optimize.mjs
```

## 📋 Deployment Options

### Netlify (Recommended) ⭐
- Automatic deployments from GitHub
- Built-in forms and functions
- Free SSL and CDN
- Deploy previews for PRs

**See:** [NETLIFY_DEPLOYMENT_GUIDE.md](./NETLIFY_DEPLOYMENT_GUIDE.md)

### Other Platforms
- **Vercel:** Deploy via `vercel` command
- **Cloudflare Pages:** Connect GitHub repo
- **GitHub Pages:** Build and deploy dist/ folder

## 🔧 Configuration

### Environment Variables (Optional)

For advanced features, set these in your deployment platform:

```bash
# Lead Notifications
SLACK_WEBHOOK_URL=your_slack_webhook
SENDGRID_API_KEY=your_sendgrid_key
NOTIFICATION_EMAIL=your-email@domain.com

# Analytics
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```

**Template:** [.env.netlify.template](./.env.netlify.template)

## 📊 Features Breakdown

### Forms
- ✅ Business Assessment Leads
- ✅ Newsletter Subscriptions
- ✅ Partnership Inquiries
- ✅ Contact Form

### Functions (Serverless)
- ✅ Lead Capture & Processing
- ✅ Google Sheets Integration
- ✅ Email Notifications
- ✅ Webhook Receiver

### Optimizations
- ✅ HTTP/2 & HTTP/3
- ✅ Brotli Compression
- ✅ Asset Minification
- ✅ Image Optimization
- ✅ Progressive Web App (PWA)
- ✅ Service Worker Caching
- ✅ SEO Optimized

## 🔒 Security Features

- HTTPS enforced
- HSTS enabled
- XSS protection
- CORS configured
- Content Security Policy
- Secure headers

## 📈 Performance

- **Lighthouse Score:** 90+ across all metrics
- **First Contentful Paint:** < 1.5s
- **Time to Interactive:** < 3.5s
- **CDN:** Global edge network
- **Caching:** Aggressive static asset caching

## 🧪 Testing

### Local Testing
```bash
# Build and test
npm run build
node scripts/optimize.mjs

# Test with Netlify CLI
npm install -g netlify-cli
netlify dev
```

### Automated Testing
- Build validation on every commit
- Deploy previews for pull requests
- Automatic Lighthouse audits

## 📞 Support

- **Windows Users:** [WINDOWS_GUIDE.md](./WINDOWS_GUIDE.md) - PowerShell commands and troubleshooting
- **Documentation:** See [docs](./docs) folder
- **Issues:** [GitHub Issues](https://github.com/TGS208/tintbot-ai/issues)
- **Deployment Help:** [NETLIFY_DEPLOYMENT_GUIDE.md](./NETLIFY_DEPLOYMENT_GUIDE.md)

## ❓ Troubleshooting

### Common Issues

**Problem: "npm is not recognized"**
- Solution: Install Node.js from https://nodejs.org/ and restart your terminal

**Problem: Build fails or dist folder is empty**
- Solution: Run `npm install --legacy-peer-deps` then `npm run build:prod`

**Problem: Character encoding issues in terminal**
- Solution: Use a text editor or browser to view HTML files, not terminal commands

**Problem: PowerShell won't run commands**
- Solution: See [WINDOWS_GUIDE.md](./WINDOWS_GUIDE.md) for detailed Windows help

For more troubleshooting, see the [WINDOWS_GUIDE.md](./WINDOWS_GUIDE.md) (Windows) or [NETLIFY_QUICK_START.md](./NETLIFY_QUICK_START.md) (deployment issues).

## 📝 License

Copyright © 2024 Tintbot.ai. All rights reserved.

## 🙏 Acknowledgments

Built with:
- React
- Tailwind CSS
- Netlify
- Lucide Icons
- Radix UI

---

## 🎯 Deployment Status

| Environment | Status | URL |
|------------|--------|-----|
| Production | [![Netlify Status](https://api.netlify.com/api/v1/badges/YOUR-SITE-ID/deploy-status)](https://app.netlify.com/sites/YOUR-SITE-NAME/deploys) | https://tintbot.ai |
| Staging | - | - |

---

**Made with ❤️ for Window Tint Professionals**

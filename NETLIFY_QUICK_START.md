# 🚀 Netlify Deployment Quick Checklist

## Pre-Deploy (5 minutes)
- [ ] Code committed and pushed to GitHub
- [ ] `npm run build` works locally
- [ ] No console errors in browser

## Netlify Setup (10 minutes)
- [ ] Create Netlify account at https://netlify.com
- [ ] Connect GitHub repository
- [ ] Import `TGS208/tintbot-ai` project
- [ ] Verify build settings:
  - Build command: `npm run build && node scripts/optimize.mjs`
  - Publish directory: `dist`
  - Functions directory: `netlify/functions`

## Deploy
- [ ] Click "Deploy site"
- [ ] Wait 2-3 minutes for build
- [ ] Visit preview URL (e.g., `random-name.netlify.app`)

## Post-Deploy Testing (5 minutes)
- [ ] Home page loads correctly
- [ ] Navigation works (Features, Demo, Pricing, etc.)
- [ ] Forms render properly
- [ ] Test form submission (check Netlify Dashboard → Forms)
- [ ] Mobile view works

## Optional: Custom Domain (15 minutes)
- [ ] Dashboard → Domain settings → Add custom domain
- [ ] Enter your domain (e.g., `tintbot.ai`)
- [ ] Update DNS settings at your registrar
- [ ] Wait for SSL certificate (1-24 hours)
- [ ] Enable "Force HTTPS"

## Optional: Environment Variables
Only if you need these features:
- [ ] Slack notifications → Set `SLACK_WEBHOOK_URL`
- [ ] Email notifications → Set `SENDGRID_API_KEY` & `NOTIFICATION_EMAIL`
- [ ] Google Analytics → Set `GOOGLE_ANALYTICS_ID`
- [ ] Google Sheets → Set sheet credentials

Set at: **Dashboard → Site settings → Environment variables**

## Verification
- [ ] Visit site at your URL
- [ ] Check Lighthouse score (should be 90+)
- [ ] Test on mobile device
- [ ] Submit a test form
- [ ] Verify form submission in Dashboard

## 🎉 Done!
Your site is live and optimized!

---

## Quick Reference

**Deploy from command line:**
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

**Test locally:**
```bash
netlify dev
# Visit http://localhost:8888
```

**View deploy logs:**
Dashboard → Deploys → [Latest deploy] → Deploy log

**View form submissions:**
Dashboard → Forms → [Form name]

**View function logs:**
Dashboard → Functions → [Function name] → Logs

---

## Common Issues

**Build fails:**
- Check Node version is 18
- Try `npm install --legacy-peer-deps`
- Review build log for errors

**Forms don't work:**
- Verify `netlify` or `data-netlify="true"` attribute
- Check form appears in Dashboard → Forms
- Test with a simple HTML form first

**404 on refresh:**
- Verify redirects in netlify.toml
- Check `_redirects` file is in dist/

**Need help?**
- Documentation: https://docs.netlify.com
- Forums: https://answers.netlify.com
- Full guide: See `NETLIFY_DEPLOYMENT_GUIDE.md`

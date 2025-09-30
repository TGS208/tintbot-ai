# 🚀 Tintbot.ai Deployment Checklist

## ✅ Pre-Deployment Setup

### 1. Environment Variables (Netlify Dashboard)
```bash
# Required for lead capture
SLACK_WEBHOOK_URL=your_slack_webhook (optional)
SENDGRID_API_KEY=your_sendgrid_key (optional)
NOTIFICATION_EMAIL=your-email@domain.com (optional)
```

### 2. Netlify Forms Configuration
- ✅ Forms are enabled in netlify.toml
- ✅ "business-assessment-leads" form is configured
- ✅ Functions are deployed in netlify/functions/

### 3. Domain & DNS
- [ ] Custom domain configured
- [ ] SSL certificate active
- [ ] DNS propagation complete

## 🎯 Testing Checklist

### Navigation Testing
- [ ] Home page loads correctly
- [ ] All "Business Analysis" buttons link to /assessment
- [ ] Assessment page loads with form
- [ ] Canva assessment embeds properly
- [ ] Form submission works
- [ ] Thank you/next steps display

### Lead Capture Testing
- [ ] Form validation works
- [ ] Lead data is captured (check Netlify Forms)
- [ ] Function logs show successful capture
- [ ] Email notifications work (if configured)

### Mobile Responsiveness
- [ ] Assessment form works on mobile
- [ ] Canva embed is responsive
- [ ] Navigation works on all devices
- [ ] Form submission works on mobile

## 📊 Analytics & Tracking

### Setup Required
- [ ] Google Analytics configured
- [ ] Facebook Pixel installed (optional)
- [ ] Lead tracking events configured
- [ ] Conversion tracking active

### Key Metrics to Track
- Assessment page visits
- Form completion rate
- Lead quality scores
- Conversion to consultation

## 🔧 Post-Deployment

### 1. Test Lead Capture Flow
1. Visit /assessment
2. Fill out form with test data
3. Submit form
4. Verify lead appears in Netlify Forms
5. Check function logs for success

### 2. Verify Canva Integration
1. Complete form submission
2. Confirm Canva assessment loads
3. Test responsive behavior
4. Verify next steps display

### 3. Monitor Performance
- Check Core Web Vitals
- Monitor page load speeds
- Test form submission success rate
- Monitor function execution

## 🚨 Troubleshooting

### Common Issues
1. **Canva not loading**: Check iframe src URL
2. **Form not submitting**: Verify Netlify forms configuration
3. **Functions failing**: Check environment variables
4. **Mobile issues**: Test responsive design

### Debug Commands
```bash
# Local testing
npm run dev

# Check build
npm run build

# Function testing
netlify dev
```

## 📞 Support Contacts
- Netlify Support: support@netlify.com
- Canva Support: help.canva.com
- Emergency: your-emergency-contact@domain.com

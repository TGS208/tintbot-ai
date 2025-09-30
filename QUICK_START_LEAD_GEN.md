# 🚀 Tintbot Lead Generation - Quick Action Plan

## Week 1: Foundation Setup

### Day 1-2: Lead Capture
- [ ] Sign up for Typeform Essential ($35/mo) → [typeform.com](https://typeform.com)
- [ ] Create vehicle quote form using template:
  ```
  Step 1: Vehicle type (Sedan/SUV/Truck/Luxury/Fleet)
  Step 2: Service interest (Basic/Ceramic/Premium)
  Step 3: Timeline (ASAP/2 weeks/This month/Researching)
  Step 4: Contact (Name, Phone, Email, ZIP)
  ```
- [ ] Embed form on website homepage
- [ ] Test form on mobile device

### Day 3-4: Lead Routing Automation
- [ ] Sign up for Make.com FREE tier → [make.com](https://make.com)
- [ ] Create automation scenario:
  ```
  Typeform → Score Lead → Route by Score → Notify Team
  ```
- [ ] Set up Google Sheets for lead storage
- [ ] Test automation with dummy data

### Day 5-7: SMS Notifications
- [ ] Sign up for Twilio → [twilio.com](https://twilio.com)
- [ ] Buy local phone number ($1/mo)
- [ ] Add $20 credit for SMS
- [ ] Connect to Make.com
- [ ] Test SMS to your phone

**Week 1 Cost**: $35/mo + $21 one-time = **$56 total**
**Expected Leads**: 10-20 from existing traffic

---

## Week 2: Email Nurture

### Day 8-10: Email Marketing Setup
- [ ] Sign up for ConvertKit ($29/mo) → [convertkit.com](https://convertkit.com)
- [ ] Create subscriber tags:
  - vehicle-sedan, vehicle-suv, vehicle-luxury, vehicle-fleet
  - timeline-asap, timeline-research
  - service-ceramic, service-basic
- [ ] Import existing leads from Google Sheets

### Day 11-14: Build Email Sequence
- [ ] Write 5-day nurture sequence:
  - Day 1: Educational (Why tint pays for itself)
  - Day 2: Social proof (Customer testimonials)
  - Day 3: Options guide (Basic vs Ceramic)
  - Day 4: FAQ (Top 10 questions)
  - Day 5: Limited offer (Discount urgency)
- [ ] Set up automation triggers
- [ ] Test sequence on your email

**Week 2 Cost**: $29/mo
**Cumulative**: $64/mo
**Expected Conversions**: 20-30% of leads book appointments

---

## Month 2: Scale with Paid Ads

### Week 5-6: Landing Pages
- [ ] Sign up for Leadpages ($37/mo) → [leadpages.com](https://leadpages.com)
- [ ] Create 3 landing pages:
  1. Ceramic Tint Special (main offer)
  2. Fleet Tinting (commercial clients)
  3. Luxury Car Tinting (premium service)
- [ ] Connect to Typeform
- [ ] Set up A/B tests

### Week 7-8: Google Ads Launch
- [ ] Set up Google Ads account
- [ ] Link Google My Business
- [ ] Create 3 campaigns:
  - Local Service Ads ($150/mo budget)
  - Search Ads ($200/mo budget)  
  - Remarketing ($100/mo budget)
- [ ] Write ad copy using template
- [ ] Monitor daily for first week

**Month 2 Cost**: $64 + $37 + $450 = **$551/mo**
**Expected Leads**: 80-120/mo
**Expected Revenue**: $10,000-$15,000/mo

---

## Month 3: Optimize & Automate

### Week 9-10: Facebook/Instagram Ads
- [ ] Set up Facebook Business Manager
- [ ] Install Meta Pixel on website
- [ ] Create 3 ad campaigns:
  - Before/after carousel ($10/day)
  - Video testimonial ($8/day)
  - Seasonal offer ($7/day)
- [ ] Set up Facebook Lead Forms
- [ ] Monitor and optimize

### Week 11-12: Reviews & Referrals
- [ ] Sign up for Podium ($289/mo) → [podium.com](https://podium.com)
- [ ] Connect review platforms (Google, Facebook, Yelp)
- [ ] Set up automated review requests (3 hours after job)
- [ ] Create referral program ($25 credit for both)
- [ ] Sign up for BrightLocal ($29/mo)
- [ ] Submit to top 50 directories
- [ ] Optimize Google My Business 100%

**Month 3 Cost**: $551 + $225 + $289 + $29 = **$1,094/mo**
**Expected Leads**: 150-200/mo
**Expected Revenue**: $18,000-$25,000/mo
**ROI**: 1,500%+

---

## Essential Tools Summary

| Tool | Cost | Purpose | Priority |
|------|------|---------|----------|
| **Typeform** | $35/mo | Lead capture forms | ⭐⭐⭐ Critical |
| **Make.com** | Free | Lead routing automation | ⭐⭐⭐ Critical |
| **Twilio** | ~$5/mo | SMS notifications | ⭐⭐⭐ Critical |
| **ConvertKit** | $29/mo | Email nurture | ⭐⭐ Important |
| **Leadpages** | $37/mo | Landing pages | ⭐⭐ Important |
| **Google Ads** | $450/mo | Paid search | ⭐⭐ Important |
| **Facebook Ads** | $225/mo | Social media | ⭐ Nice to have |
| **Podium** | $289/mo | Reviews & referrals | ⭐ Nice to have |
| **BrightLocal** | $29/mo | Local SEO | ⭐ Nice to have |

---

## Lead Scoring Formula

```javascript
// Score each lead 0-100
function scoreLeaD(data) {
  let score = 0;
  
  // Vehicle type
  if (data.vehicle === 'fleet') score += 30;
  else if (data.vehicle === 'luxury') score += 25;
  else if (data.vehicle === 'suv' || data.vehicle === 'truck') score += 20;
  else score += 15;
  
  // Timeline urgency
  if (data.timeline === 'asap') score += 30;
  else if (data.timeline === '2-weeks') score += 20;
  else if (data.timeline === 'this-month') score += 10;
  
  // Contact info
  if (data.phone) score += 25;
  if (data.email) score += 10;
  
  // Service type
  if (data.service === 'ceramic' || data.service === 'premium') score += 15;
  
  return score;
}

// Routing logic
if (score >= 80) {
  // Hot lead - immediate SMS to owner + auto-reply to customer
  sendSMS(owner, `🔥 HOT LEAD: ${data.name} - ${data.vehicle}`);
  sendSMS(customer, `Thanks! We'll call you in 5 min with your quote.`);
}
else if (score >= 60) {
  // Warm lead - add to sheet + schedule callback
  addToSheet(data);
  sendEmail(customer, nurture_sequence_day1);
}
else {
  // Cold lead - nurture sequence
  addToNurtureList(data);
}
```

---

## SMS Templates

### To Shop Owner (Hot Lead Alert):
```
🚗 NEW LEAD - Score: {score}/100

{vehicleYear} {vehicleMake} {vehicleModel}
Service: {tintType}
Timeline: {timeline}
Phone: {phone}

Reply 1 to CALL NOW
Reply 2 to SCHEDULE
```

### To Customer (Auto-Reply):
```
Hi {name}! Thanks for requesting a quote for your {vehicle}.

Estimated price: ${price}

We'll text you within 5 minutes to confirm your appointment!

Questions? Just reply to this text.

- {shopName}
```

---

## Google Ads Quick Setup

### Campaign 1: Local Service Ads
```
Budget: $5/day ($150/mo)
Target: "window tinting near me" + 10-mile radius
Bid Strategy: Maximize conversions
Landing Page: Main quote form
```

### Campaign 2: Search Ads
```
Budget: $7/day ($200/mo)
Keywords:
- "ceramic window tinting [city]"
- "car tint near me"
- "auto tinting prices [city]"
- "best window tint [city]"

Ad Copy:
Headline 1: Professional Window Tinting in [City]
Headline 2: Lifetime Warranty • Same-Day Service
Description: Premium ceramic tint. Free quotes. 
             Rated 4.9★ by 200+ customers. Book online!
```

### Campaign 3: Remarketing
```
Budget: $3/day ($100/mo)
Audience: Website visitors (last 30 days)
Ad: "Come back! 15% off expires tonight"
Landing Page: Discount offer form
```

---

## Facebook Ad Quick Setup

### Ad 1: Before/After Carousel
```
Format: 5-slide carousel
Slide 1: Before (hot car interior)
Slide 2: After (cool, comfortable)
Slide 3: Ceramic tint benefits
Slide 4: Customer review
Slide 5: Special offer

Audience: Local, ages 25-55, car owners
Budget: $10/day
CTA: "Get Free Quote"
```

### Ad 2: Video Testimonial
```
Format: 30-60 second customer video
Content: "Best investment for my car"
Audience: Lookalike of current customers
Budget: $8/day
CTA: "Book Now"
```

---

## Daily Checklist

### Every Morning (10 min):
- [ ] Check new leads in Google Sheet
- [ ] Review lead scores - call hot leads first
- [ ] Check Google/Facebook ad performance
- [ ] Respond to overnight texts/emails

### Every Afternoon (15 min):
- [ ] Follow up on morning leads
- [ ] Update job status (for review automation)
- [ ] Post to social media (1 story, 1 post)
- [ ] Check review notifications

### Every Evening (5 min):
- [ ] Tomorrow's appointment confirmations
- [ ] Check ad budgets (pause if overspending)
- [ ] Quick metrics check

---

## Key Metrics to Track

### Daily:
- New leads count
- Hot leads (score 80+)
- Appointments booked today
- Show-up rate

### Weekly:
- Total leads
- Conversion rate (leads → appointments)
- Average lead score
- Cost per lead
- Response time

### Monthly:
- Total ad spend
- Revenue from leads
- ROI percentage
- New reviews
- Google ranking position

---

## Emergency Troubleshooting

### "Not getting enough leads"
1. Check if forms are working
2. Increase Google Ads budget 20%
3. Create urgency offer (48-hour special)
4. Post more on social media
5. Ask for referrals from recent customers

### "Too many low-quality leads"
1. Increase lead score threshold (70 → 80)
2. Add budget qualification question to form
3. Adjust ad targeting (exclude "cheap" keywords)
4. Require phone number on all forms

### "Leads not converting"
1. Speed up response time (goal: 5 min)
2. Improve phone script
3. Add urgency (limited slots)
4. Offer convenient booking options
5. Show more social proof

---

## Next Steps

1. **Today**: Sign up for Typeform and create first form
2. **Tomorrow**: Set up Make.com automation  
3. **Day 3**: Add Twilio SMS notifications
4. **Day 4**: Test entire flow end-to-end
5. **Week 2**: Add email nurture with ConvertKit
6. **Month 2**: Launch Google Ads
7. **Month 3**: Add review automation

**Start here**: [typeform.com/signup](https://typeform.com/signup)

---

## Questions? 

Need help implementing? Reply with:
- Which step you're stuck on
- Your current monthly lead volume  
- Your budget for tools
- Timeline for implementation

Let's get your lead generation machine running! 🚀

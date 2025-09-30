# Lead Generation Implementation Guide for Tintbot.ai

## 🎯 Focus: Lead Generation for Window Tint Business

This guide provides a **practical, step-by-step implementation plan** for obtaining and deploying lead generation tools specifically for the window tint industry.

---

## 📋 Phase 1: Immediate Actions (Week 1-2)

### Step 1: Choose Your Lead Capture Tool

#### **Recommended: Typeform** 
**Cost**: $35/mo (Essential Plan) | **Setup Time**: 2-4 hours

**Why Typeform for Tint Shops:**
- Mobile-optimized (80% of tint customers browse on mobile)
- Visual appeal matches before/after photos
- Conditional logic for vehicle-specific questions
- Easy to embed on website

**Action Items:**
1. ✅ Sign up at [typeform.com](https://typeform.com)
2. ✅ Choose "Essential" plan ($35/mo)
3. ✅ Use automotive service template as starting point
4. ✅ Create your first tint quote form (30 min)

**Tint-Specific Form Structure:**
```
Step 1: What type of vehicle do you have?
   ↳ Sedan → Ask about tint preference
   ↳ SUV/Truck → Ask about full vs partial tint
   ↳ Luxury → Show premium ceramic options
   ↳ Commercial Fleet → Ask fleet size

Step 2: What's your main reason for tinting?
   ↳ Heat reduction
   ↳ Privacy
   ↳ UV protection
   ↳ Appearance

Step 3: When do you need this done?
   ↳ ASAP (this week)
   ↳ Within 2 weeks
   ↳ This month
   ↳ Just researching

Step 4: Contact Information
   ↳ Name
   ↳ Phone (required for quote)
   ↳ Email (optional for follow-up)
   ↳ ZIP code (to confirm service area)
```

---

### Step 2: Set Up Lead Routing

#### **Recommended: Make.com (formerly Integromat)**
**Cost**: FREE tier (1,000 operations/mo) | **Setup Time**: 1-2 hours

**Why Make.com:**
- Free tier sufficient for small shops (30+ leads/day)
- More powerful than Zapier
- Visual workflow builder
- No coding required

**Action Items:**
1. ✅ Sign up at [make.com](https://make.com)
2. ✅ Start with FREE tier (upgrade later if needed)
3. ✅ Create first automation (see workflow below)

**Lead Routing Automation:**
```
Trigger: New Typeform Submission
   ↓
Filter: Lead Score >= 60
   ↓
Branch 1: Hot Lead (Score >= 80)
   → Send SMS to shop owner (Twilio)
   → Create Google Sheet row
   → Send auto-reply SMS to customer
   
Branch 2: Warm Lead (Score 60-79)
   → Add to Google Sheet
   → Send email follow-up
   → Schedule for outreach tomorrow
   
Branch 3: Cold Lead (Score < 60)
   → Add to nurture list
   → Send educational content email
```

**Lead Scoring Formula:**
```javascript
function calculateLeadScore(response) {
  let score = 0;
  
  // Vehicle type (max 25 points)
  if (response.vehicleType === 'luxury') score += 25;
  else if (response.vehicleType === 'suv' || response.vehicleType === 'truck') score += 20;
  else if (response.vehicleType === 'sedan') score += 15;
  else if (response.vehicleType === 'fleet') score += 30;
  
  // Timeline (max 30 points)
  if (response.timeline === 'asap') score += 30;
  else if (response.timeline === 'within-2-weeks') score += 20;
  else if (response.timeline === 'this-month') score += 10;
  
  // Has phone number (25 points)
  if (response.phone) score += 25;
  
  // Has email (10 points)
  if (response.email) score += 10;
  
  // Reason is commercial (15 points)
  if (response.reason === 'heat-reduction' || response.reason === 'uv-protection') score += 15;
  
  return score; // Max score: 100
}
```

---

### Step 3: Set Up SMS Notifications

#### **Recommended: Twilio**
**Cost**: Pay-as-you-go (~$0.0079/SMS) | **Setup Time**: 30 min

**Why Twilio:**
- No monthly fees, only pay for what you use
- Reliable delivery
- Two-way SMS support
- Easy Make.com integration

**Action Items:**
1. ✅ Sign up at [twilio.com](https://twilio.com)
2. ✅ Get a local phone number ($1/mo)
3. ✅ Add $20 credit (lasts months for small shop)
4. ✅ Get API credentials for Make.com

**SMS Templates for Tint Leads:**

**To Shop Owner (High-Priority Lead):**
```
🚗 NEW LEAD - {leadScore}/100

Vehicle: {year} {make} {model}
Type: {tintType}
Timeline: {timeline}
Phone: {phone}

Reply 1 to CALL NOW
Reply 2 to SCHEDULE CALLBACK
```

**To Customer (Auto-Reply):**
```
Hi {name}! Thanks for requesting a {tintType} quote for your {vehicle}.

Your estimated price: ${priceEstimate}

We'll call you within 5 minutes to confirm your appointment.

Questions? Reply to this text!

- {businessName}
```

---

## 📋 Phase 2: Optimize Lead Quality (Week 3-4)

### Step 4: Create Landing Pages

#### **Recommended: Leadpages**
**Cost**: $37/mo (Standard Plan) | **Setup Time**: 2-3 hours

**Why Leadpages:**
- Pre-built templates for automotive services
- Mobile-responsive
- A/B testing built-in
- Direct Typeform integration

**Action Items:**
1. ✅ Sign up at [leadpages.com](https://leadpages.com)
2. ✅ Choose automotive template
3. ✅ Create 3 landing pages (see below)
4. ✅ Run A/B tests on headlines

**3 Essential Landing Pages:**

**Page 1: Ceramic Tint Special**
- Headline: "Beat the Heat - 30% Off Ceramic Tint This Week"
- Subheadline: "Keep your car cool & protect your interior"
- CTA: "Get Free Quote" → Typeform
- Image: Before/after heat comparison

**Page 2: Fleet Tinting**
- Headline: "Commercial Fleet Tinting - Volume Discounts"
- Subheadline: "Protect your drivers & save on cooling costs"
- CTA: "Schedule Fleet Consultation" → Typeform (fleet version)
- Image: Company vehicles with professional tint

**Page 3: Premium Luxury**
- Headline: "Luxury Car Tinting - Factory Finish Quality"
- Subheadline: "Lifetime warranty on all luxury vehicles"
- CTA: "Book VIP Consultation" → Typeform (luxury version)
- Image: High-end vehicle showcase

---

### Step 5: Set Up Email Nurture Campaign

#### **Recommended: ConvertKit**
**Cost**: $29/mo (Creator Plan) | **Setup Time**: 3-4 hours

**Why ConvertKit:**
- Simple automation for small businesses
- Tag-based segmentation
- Landing page builder included
- Easy email sequences

**Action Items:**
1. ✅ Sign up at [convertkit.com](https://convertkit.com)
2. ✅ Import leads from Google Sheets (Make.com sync)
3. ✅ Create tag structure (see below)
4. ✅ Build 5-day nurture sequence

**Tag Structure:**
- `vehicle-sedan`
- `vehicle-suv`
- `vehicle-luxury`
- `vehicle-fleet`
- `timeline-asap`
- `timeline-research`
- `service-ceramic`
- `service-basic`

**5-Day Nurture Email Sequence (for "Just Researching" leads):**

**Day 1: Educational**
Subject: "5 Reasons Window Tinting Pays for Itself"
Content: Heat reduction, UV protection, resale value, privacy, aesthetics
CTA: "See Pricing for Your Vehicle"

**Day 2: Social Proof**
Subject: "What Our Customers Say About Their New Tint"
Content: 3-4 testimonials with before/after photos
CTA: "Read More Reviews"

**Day 3: Options Guide**
Subject: "Basic vs Ceramic vs Premium: Which Tint is Right for You?"
Content: Comparison chart, price ranges, warranty info
CTA: "Get Custom Quote"

**Day 4: FAQ**
Subject: "Your Top 10 Tinting Questions Answered"
Content: Legal limits, care instructions, warranty, process
CTA: "Still Have Questions? Text Us"

**Day 5: Limited Offer**
Subject: "Exclusive Offer: 15% Off Any Tint Package"
Content: Urgency-based discount, expiring soon
CTA: "Book Your Appointment Today"

---

## 📋 Phase 3: Scale Lead Volume (Month 2)

### Step 6: Google Ads for Local Leads

#### **Budget**: $300-500/mo to start | **Setup Time**: 4-6 hours

**Why Google Ads:**
- High intent searches ("window tinting near me")
- Local targeting
- Immediate results
- Pay only for clicks

**Action Items:**
1. ✅ Set up Google Ads account
2. ✅ Link to Google My Business
3. ✅ Create 3 ad campaigns (see below)
4. ✅ Set daily budget limits

**3 Campaign Structure:**

**Campaign 1: Local Service Ads (LSA)**
- Budget: $150/mo
- Target: "window tinting near me" + location
- Ad Type: Google Guaranteed badge
- Landing Page: Main Leadpages landing page

**Campaign 2: Search Ads**
- Budget: $200/mo
- Keywords: 
  - "ceramic window tinting [city]"
  - "car tinting near me"
  - "auto tint prices [city]"
  - "best window tinting [city]"
- Landing Page: Specific pages by keyword intent

**Campaign 3: Remarketing**
- Budget: $100/mo
- Target: Website visitors who didn't convert
- Ad: Special offer for return visitors
- Landing Page: Discount/urgency page

**Ad Copy Template:**
```
Headline 1: Professional Window Tinting in [City]
Headline 2: Lifetime Warranty | Same-Day Service
Description: Beat the heat with premium ceramic tint. 
             Free quotes, mobile-friendly booking. 
             Rated 4.9★ by 200+ customers.
```

---

### Step 7: Facebook/Instagram Lead Ads

#### **Budget**: $200-300/mo | **Setup Time**: 3-4 hours

**Why Social Media Ads:**
- Visual platform (perfect for before/after photos)
- Precise demographic targeting
- Lead forms built-in (no website needed)
- Retargeting capabilities

**Action Items:**
1. ✅ Set up Facebook Business Manager
2. ✅ Create Instagram business account
3. ✅ Install Meta Pixel on website
4. ✅ Create ad campaigns (see below)

**Ad Campaign Strategy:**

**Campaign 1: Before/After Carousel**
- Format: Carousel (5 slides of before/after)
- Audience: Local, ages 25-55, car owners
- Budget: $10/day
- CTA: "Get Free Quote" → Facebook Lead Form

**Campaign 2: Video Testimonial**
- Format: Video (30-60 sec customer testimonial)
- Audience: Lookalike audience from current customers
- Budget: $8/day
- CTA: "Book Now" → Landing page

**Campaign 3: Seasonal Offer**
- Format: Single image (summer heat theme)
- Audience: Local + interested in automotive
- Budget: $7/day
- CTA: "Claim Offer" → Typeform with discount code

**Facebook Lead Form Setup:**
```
Question 1: What type of vehicle?
   - Sedan
   - SUV/Truck
   - Luxury
   - Fleet (3+ vehicles)

Question 2: Preferred tint type?
   - Not sure, need advice
   - Basic (budget-friendly)
   - Ceramic (best quality)

Question 3: When do you need it?
   - This week
   - Next 2 weeks
   - Just researching

[Auto-fills: Name, Phone, Email from Facebook]
```

---

## 📋 Phase 4: Advanced Lead Generation (Month 3+)

### Step 8: Review & Referral System

#### **Recommended: Podium**
**Cost**: $289/mo | **Setup Time**: 2-3 hours

**Why Podium:**
- Automated review requests via SMS
- 40% response rate (vs 5% email)
- Centralized inbox for all reviews
- Referral tracking

**Action Items:**
1. ✅ Sign up at [podium.com](https://podium.com)
2. ✅ Connect Google, Facebook, Yelp
3. ✅ Set up auto-request triggers
4. ✅ Create referral incentive program

**Review Collection Workflow:**
```
Trigger: Job marked complete in system
   ↓
Wait: 3 hours (let customer drive home)
   ↓
Send SMS: "How did we do? Rate us 1-5"
   ↓
If 4-5 stars:
   → Send Google review link
   → Offer $25 referral credit
   
If 1-3 stars:
   → Alert manager immediately
   → Send private feedback form
   → Schedule follow-up call
```

**Referral Incentive:**
```
SMS to happy customers:
"Love your new tint? 

Refer a friend and you BOTH get $25 off!

Your unique link: [shortlink]

Thanks for being awesome!
- {businessName}"
```

---

### Step 9: Local SEO & Directory Listings

#### **Recommended: BrightLocal**
**Cost**: $29/mo | **Setup Time**: 4-6 hours initial

**Why BrightLocal:**
- Automated citation building
- Rank tracking for local keywords
- Review monitoring
- Competitor analysis

**Action Items:**
1. ✅ Sign up at [brightlocal.com](https://brightlocal.com)
2. ✅ Audit current listings
3. ✅ Submit to top 50 directories
4. ✅ Set up rank tracking

**Priority Directories for Tint Shops:**
1. Google My Business (critical!)
2. Yelp
3. Facebook
4. Apple Maps
5. Bing Places
6. YellowPages
7. Angie's List
8. Thumbtack
9. Local automotive forums
10. Chamber of Commerce

**Google My Business Optimization:**
- Complete 100% of profile
- Add 20+ photos (before/after, shop, team)
- Post weekly updates
- Respond to ALL reviews within 24 hours
- Add Q&A section
- Enable messaging
- Add booking link

---

### Step 10: Content Marketing for Organic Leads

#### **Cost**: $0-100/mo | **Setup Time**: 2-3 hours/week ongoing

**Why Content Marketing:**
- Free organic traffic
- Builds authority
- Answers customer questions
- Ranks for long-tail keywords

**Action Items:**
1. ✅ Start a blog on your website
2. ✅ Publish 2 articles per month
3. ✅ Share on social media
4. ✅ Repurpose as social posts

**10 High-Value Blog Topics:**
1. "2024 Window Tint Laws in [Your State] - Complete Guide"
2. "Ceramic vs Carbon vs Basic Tint: Which is Worth It?"
3. "How to Care for Your Window Tint (+ What to Avoid)"
4. "Does Window Tinting Really Keep Your Car Cooler? We Tested It"
5. "Window Tint Warranty: What's Covered and What's Not"
6. "Can You Tint Over Factory Tint? Expert Advice"
7. "Best Tint Percentage for Your Car Type"
8. "How Much Does Window Tinting Cost in [City]?"
9. "DIY vs Professional Tinting: True Cost Comparison"
10. "Top 5 Window Tint Myths Debunked"

**Content Repurposing Strategy:**
```
Blog Post (1,000 words)
   ↓
→ 5 Facebook posts (key points)
→ 1 Instagram carousel (visual guide)
→ 1 YouTube video (talking head + visuals)
→ 10 Instagram stories (quick tips)
→ Email newsletter (summary + CTA)
```

---

## 📊 Success Metrics & KPIs

### Track These Weekly:
- **Lead Volume**: # of Typeform submissions
- **Lead Quality**: Average lead score
- **Response Time**: Time to first contact
- **Conversion Rate**: Leads → Appointments
- **Cost Per Lead**: Ad spend ÷ Leads
- **Show-Up Rate**: Appointments → Completed jobs

### Track These Monthly:
- **Total Ad Spend**: Google + Facebook total
- **Revenue Per Lead**: Total revenue ÷ Total leads
- **Customer Acquisition Cost (CAC)**: Total marketing ÷ New customers
- **Lifetime Value (LTV)**: Average customer value
- **LTV:CAC Ratio**: Target 3:1 minimum
- **Review Count**: New reviews gained
- **Average Rating**: Overall star rating

### Dashboard Setup (Free):
Use **Google Data Studio** to create a single dashboard:
1. Connect Google Sheets (Make.com data)
2. Connect Google Ads
3. Connect Facebook Ads
4. Connect Google Analytics
5. Create visual charts for all KPIs

---

## 💰 Total Investment Summary

### Month 1 - Foundation ($64-$99/mo)
- Typeform: $35/mo
- ConvertKit: $29/mo
- Twilio: ~$0-$5/mo (pay-per-use)
- Make.com: $0/mo (free tier)

### Month 2 - Scale ($564-$899/mo)
- All Month 1 tools
- Leadpages: $37/mo
- Google Ads: $300-500/mo
- Facebook Ads: $200-300/mo

### Month 3 - Optimize ($893-$1,228/mo)
- All previous tools
- Podium: $289/mo
- BrightLocal: $29/mo

### ROI Calculation:
```
Investment: $900/mo average
Expected leads: 100-150/mo
Conversion rate: 30% (industry standard)
New customers: 30-45/mo
Average job value: $400
Monthly revenue: $12,000-$18,000
ROI: 1,233% - 1,900%
```

---

## 🎯 Quick Start Checklist

### This Week:
- [ ] Sign up for Typeform ($35/mo)
- [ ] Create first quote form (use template above)
- [ ] Embed form on website
- [ ] Sign up for Make.com (free)
- [ ] Create lead routing workflow
- [ ] Sign up for Twilio
- [ ] Test SMS notifications

### Next Week:
- [ ] Sign up for ConvertKit ($29/mo)
- [ ] Build 5-day email sequence
- [ ] Import existing leads
- [ ] Set up tag structure

### Month 2:
- [ ] Launch Google Ads ($300-500/mo)
- [ ] Launch Facebook Ads ($200-300/mo)
- [ ] Create 3 landing pages
- [ ] Set up conversion tracking

### Month 3:
- [ ] Add Podium ($289/mo)
- [ ] Automate review requests
- [ ] Start BrightLocal ($29/mo)
- [ ] Build citation portfolio
- [ ] Optimize Google My Business

---

## 🚀 Expected Results Timeline

### Month 1:
- 50-75 leads (from existing traffic)
- 15-20 appointments
- $6,000-$8,000 revenue
- Break-even on tool costs

### Month 2:
- 100-150 leads (with ads)
- 30-45 appointments
- $12,000-$18,000 revenue
- 1,000%+ ROI on ad spend

### Month 3:
- 150-200 leads
- 45-60 appointments
- $18,000-$24,000 revenue
- 20+ five-star reviews
- Consistent lead flow

---

## 📞 Support & Resources

### Tool-Specific Support:
- **Typeform**: help.typeform.com
- **Make.com**: make.com/help
- **Twilio**: twilio.com/docs
- **ConvertKit**: help.convertkit.com
- **Leadpages**: support.leadpages.com

### Implementation Help:
- Join automotive marketing Facebook groups
- Watch YouTube tutorials for each tool
- Hire VA on Upwork for setup ($15-25/hr)
- Use tool templates from industry pros

### Quick Wins:
1. Start with Typeform + Make.com (can be done in 1 day)
2. Add SMS notifications (adds huge value)
3. Launch Google Ads with small budget ($10/day)
4. Scale what works, cut what doesn't

---

**🎯 Next Action: Sign up for Typeform and create your first lead capture form today!**

Visit: [typeform.com/signup](https://typeform.com/signup)

# 🔌 Integration Templates & Examples

This document provides ready-to-use templates for all supported integrations.

---

## 📋 Table of Contents

1. [Slack Notifications](#slack-notifications)
2. [Email Templates](#email-templates)
3. [Webhook Payloads](#webhook-payloads)
4. [Make.com Automation](#makecom-automation)
5. [Zapier Integration](#zapier-integration)
6. [Google Sheets Formulas](#google-sheets-formulas)
7. [CRM Integrations](#crm-integrations)

---

## 🔔 Slack Notifications

### Setup Slack Webhook

1. Go to https://api.slack.com/messaging/webhooks
2. Click "Create New App" → "From scratch"
3. Name: "Tintbot Leads"
4. Select your workspace
5. Click "Incoming Webhooks"
6. Toggle "Activate Incoming Webhooks" to ON
7. Click "Add New Webhook to Workspace"
8. Select channel (e.g., #leads)
9. Copy webhook URL

### Add to Netlify

```
Site settings → Environment variables → Add variable
Key: SLACK_WEBHOOK_URL
Value: https://hooks.slack.com/services/YOUR/WEBHOOK/URL
Scope: Production
```

### Message Format

The lead-router function automatically formats messages like this:

```
🔥 HOT LEAD (Score: 85/100)

Name: John Smith
Email: john@example.com
Phone: (555) 123-4567
Business: ABC Tinting

Details: Looking for ceramic tint on 2023 Tesla Model 3

Lead ID: LEAD_1705315800000_abc123 | Source: website-form | 2024-01-15T10:30:00Z
```

### Custom Slack Message (Advanced)

If you want to customize the Slack message format, edit `netlify/functions/lead-router.js`:

```javascript
const message = {
  text: `New Lead: ${lead.name}`,
  blocks: [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: "🎯 New Lead Captured"
      }
    },
    {
      type: "section",
      fields: [
        { type: "mrkdwn", text: `*Name:*\n${lead.name}` },
        { type: "mrkdwn", text: `*Score:*\n${lead.leadScore}/100` }
      ]
    }
  ]
}
```

---

## 📧 Email Templates

### Setup SendGrid

1. Create account at https://sendgrid.com
2. Go to Settings → API Keys
3. Create new API key with "Mail Send" permissions
4. Copy API key

### Add to Netlify

```
Key: SENDGRID_API_KEY
Value: SG.xxxxxxxxxxxxxxxxxxxxxx

Key: NOTIFICATION_EMAIL
Value: leads@yourbusiness.com
```

### Email Template: Hot Lead Alert

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; }
    .header { background: #FF6B6B; color: white; padding: 20px; }
    .content { padding: 20px; }
    .lead-info { background: #f4f4f4; padding: 15px; margin: 15px 0; }
    .score { font-size: 24px; font-weight: bold; color: #FF6B6B; }
    .action-btn { 
      background: #FF6B6B; 
      color: white; 
      padding: 12px 24px; 
      text-decoration: none; 
      display: inline-block;
      border-radius: 5px;
      margin-top: 15px;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>🔥 Hot Lead Alert!</h1>
    <p class="score">Lead Score: 85/100</p>
  </div>
  
  <div class="content">
    <h2>New High-Quality Lead</h2>
    
    <div class="lead-info">
      <p><strong>Name:</strong> John Smith</p>
      <p><strong>Email:</strong> john@example.com</p>
      <p><strong>Phone:</strong> (555) 123-4567</p>
      <p><strong>Business:</strong> ABC Tinting</p>
      <p><strong>Details:</strong> Looking for ceramic tint on 2023 Tesla Model 3</p>
    </div>
    
    <p><strong>Priority:</strong> 🔥 HOT - Contact within 5 minutes!</p>
    
    <a href="tel:+15551234567" class="action-btn">Call Now</a>
    <a href="mailto:john@example.com" class="action-btn">Send Email</a>
    
    <p style="margin-top: 30px; color: #666; font-size: 12px;">
      Lead ID: LEAD_1705315800000_abc123<br>
      Timestamp: 2024-01-15 10:30:00<br>
      Source: website-form
    </p>
  </div>
</body>
</html>
```

### Email Template: Daily Lead Summary

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; }
    .summary { background: #f9f9f9; padding: 20px; margin: 20px 0; }
    .stat { display: inline-block; margin: 10px 20px; }
    .stat-number { font-size: 32px; font-weight: bold; color: #4CAF50; }
    .stat-label { color: #666; }
    table { width: 100%; border-collapse: collapse; }
    th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
    th { background: #4CAF50; color: white; }
  </style>
</head>
<body>
  <h1>📊 Daily Lead Report - January 15, 2024</h1>
  
  <div class="summary">
    <div class="stat">
      <div class="stat-number">12</div>
      <div class="stat-label">Total Leads</div>
    </div>
    <div class="stat">
      <div class="stat-number">5</div>
      <div class="stat-label">Hot Leads</div>
    </div>
    <div class="stat">
      <div class="stat-number">78</div>
      <div class="stat-label">Avg Score</div>
    </div>
  </div>
  
  <h2>Top Leads</h2>
  <table>
    <tr>
      <th>Name</th>
      <th>Score</th>
      <th>Contact</th>
      <th>Details</th>
    </tr>
    <tr>
      <td>John Smith</td>
      <td>95/100</td>
      <td>john@example.com</td>
      <td>Ceramic tint, Tesla Model 3</td>
    </tr>
    <!-- More rows -->
  </table>
</body>
</html>
```

---

## 🔗 Webhook Payloads

### Standard Lead Payload

When a lead is captured, this JSON payload is sent:

```json
{
  "leadId": "LEAD_1705315800000_abc123",
  "timestamp": "2024-01-15T10:30:00Z",
  "name": "John Smith",
  "email": "john@example.com",
  "phone": "+15551234567",
  "business": "ABC Tinting",
  "challenges": "Looking for ceramic tint on 2023 Tesla Model 3",
  "vehicleType": "sedan",
  "vehicleMake": "Tesla",
  "vehicleModel": "Model 3",
  "vehicleYear": "2023",
  "serviceType": "ceramic",
  "timeline": "asap",
  "budget": "500-800",
  "leadScore": 85,
  "source": "website-form",
  "ip": "192.168.1.1",
  "userAgent": "Mozilla/5.0...",
  "referer": "https://google.com/search?q=ceramic+tint",
  "utm": {
    "utm_source": "google",
    "utm_medium": "cpc",
    "utm_campaign": "ceramic-promo",
    "utm_term": "ceramic tint near me",
    "utm_content": "ad-variant-a"
  }
}
```

### Webhook Endpoint Example (Node.js)

```javascript
// Your webhook receiver
app.post('/webhook/leads', (req, res) => {
  const lead = req.body
  
  console.log('New lead received:', lead.name)
  console.log('Lead score:', lead.leadScore)
  
  // Your custom logic here
  if (lead.leadScore >= 80) {
    sendImmediateNotification(lead)
  } else if (lead.leadScore >= 60) {
    addToFollowUpQueue(lead)
  } else {
    addToNurtureSequence(lead)
  }
  
  res.json({ success: true })
})
```

### Webhook Endpoint Example (Python)

```python
from flask import Flask, request
app = Flask(__name__)

@app.route('/webhook/leads', methods=['POST'])
def receive_lead():
    lead = request.json
    
    print(f"New lead: {lead['name']}")
    print(f"Score: {lead['leadScore']}")
    
    # Your custom logic
    if lead['leadScore'] >= 80:
        send_immediate_notification(lead)
    elif lead['leadScore'] >= 60:
        add_to_follow_up_queue(lead)
    else:
        add_to_nurture_sequence(lead)
    
    return {'success': True}
```

### Configure Custom Webhook

Add to Netlify environment variables:

```
Key: CUSTOM_WEBHOOK_URL
Value: https://yourdomain.com/webhook/leads
```

---

## 🤖 Make.com Automation

### Scenario Template

1. **Trigger**: Webhook (receive lead from Tintbot)
2. **Router**: Split by lead score
   - Branch 1 (Hot): Score >= 80
   - Branch 2 (Warm): Score >= 60
   - Branch 3 (Cold): Score < 60

3. **Hot Lead Actions**:
   - Send SMS via Twilio
   - Create Google Calendar event
   - Add to CRM as "Hot Lead"
   - Send Slack notification

4. **Warm Lead Actions**:
   - Add to email nurture sequence
   - Create task in project management tool
   - Add to CRM as "Warm Lead"

5. **Cold Lead Actions**:
   - Add to long-term nurture campaign
   - Tag in email system

### Make.com Webhook URL

```
https://hook.us1.make.com/xxxxxxxxxxxxxx
```

Add to Netlify as `CUSTOM_WEBHOOK_URL`

---

## ⚡ Zapier Integration

### Zap Template

**Trigger**: Webhooks by Zapier
- Choose "Catch Hook"
- Copy webhook URL
- Add to Netlify as `CUSTOM_WEBHOOK_URL`

**Action 1**: Filter by Zapier
- Only continue if Lead Score >= 60

**Action 2**: Google Sheets - Create Row
- Spreadsheet: Tintbot Leads
- Worksheet: Leads
- Map fields from webhook

**Action 3**: Gmail - Send Email
- To: your-email@domain.com
- Subject: New Lead: {{name}}
- Body: Use template

**Action 4**: Slack - Send Message
- Channel: #leads
- Message: New lead captured...

---

## 📊 Google Sheets Formulas

### Lead Age (Days)

```excel
=IF(A2="","",TODAY()-INT(A2))
```

### Priority Label

```excel
=IF(H2="","",IF(H2>=80,"🔥 HOT",IF(H2>=60,"⭐ WARM","📋 COLD")))
```

### Follow-up Date

```excel
=IF(A2="","",A2+3)
```

### Conditional Formatting

**Hot Leads (Score >= 80)**:
- Format → Conditional formatting
- Custom formula: `=$H2>=80`
- Background: Red

**Warm Leads (Score 60-79)**:
- Custom formula: `=AND($H2>=60,$H2<80)`
- Background: Yellow

### Pivot Table for Lead Sources

```
Rows: Source (Column I)
Values: Count of Lead ID (Column B)
```

---

## 🏢 CRM Integrations

### HubSpot

```javascript
// Add to lead-router.js
async function sendToHubSpot(lead) {
  const response = await fetch('https://api.hubapi.com/contacts/v1/contact', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.HUBSPOT_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      properties: [
        { property: 'email', value: lead.email },
        { property: 'firstname', value: lead.name.split(' ')[0] },
        { property: 'lastname', value: lead.name.split(' ')[1] },
        { property: 'phone', value: lead.phone },
        { property: 'company', value: lead.business },
        { property: 'lead_score', value: lead.leadScore }
      ]
    })
  })
  
  return response.json()
}
```

### Pipedrive

```javascript
async function sendToPipedrive(lead) {
  const response = await fetch('https://api.pipedrive.com/v1/persons', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: lead.name,
      email: [{ value: lead.email, primary: true }],
      phone: [{ value: lead.phone, primary: true }],
      api_token: process.env.PIPEDRIVE_API_KEY
    })
  })
  
  return response.json()
}
```

### Salesforce

```javascript
async function sendToSalesforce(lead) {
  const response = await fetch('https://yourinstance.salesforce.com/services/data/v55.0/sobjects/Lead', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.SALESFORCE_ACCESS_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      FirstName: lead.name.split(' ')[0],
      LastName: lead.name.split(' ')[1] || lead.name,
      Email: lead.email,
      Phone: lead.phone,
      Company: lead.business,
      LeadSource: lead.source,
      Rating: lead.leadScore >= 80 ? 'Hot' : 'Warm'
    })
  })
  
  return response.json()
}
```

---

## 🎨 Customization Guide

### Modify Lead Scoring

Edit `netlify/functions/lead-router.js`:

```javascript
function calculateLeadScore(leadData) {
  let score = 0
  
  // Customize point values
  if (leadData.name) score += 20        // Change from 15
  if (leadData.email) score += 20       // Change from 15
  if (leadData.phone) score += 15       // Change from 10
  
  // Add custom criteria
  if (leadData.referredBy) score += 10  // New criterion
  if (leadData.budget === 'premium') score += 15  // Budget-based
  
  return Math.min(score, 100)
}
```

### Add Custom Fields

1. Update form in `public/forms.html`:
```html
<input type="text" name="referredBy" placeholder="Referred by" />
```

2. Update Google Sheets columns
3. Update webhook payload mapping

---

## 📞 Support

Need help with integrations?

- Make.com Templates: https://www.make.com/en/templates
- Zapier App Directory: https://zapier.com/apps
- Integration requests: GitHub Issues

---

*Last Updated: 2024*
*Version: 1.0*

# Google Sheets Integration Setup Guide

## 📊 Automatic Lead Capture to Google Sheets

This guide walks you through setting up automatic lead capture to Google Sheets.

---

## ✅ Prerequisites

- Google account
- Google Cloud Console access (free)
- 15 minutes for setup

---

## 🎯 Step-by-Step Setup

### Step 1: Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Tintbot Leads"
4. Create a sheet named "Leads"
5. Add column headers in row 1:

| A | B | C | D | E | F | G | H | I | J | K |
|---|---|---|---|---|---|---|---|---|---|---|
| Timestamp | Lead ID | Name | Email | Phone | Business | Details | Score | Source | UTM Source | UTM Campaign |

6. Copy the Sheet ID from the URL:
   ```
   https://docs.google.com/spreadsheets/d/[SHEET_ID]/edit
   ```

### Step 2: Create Google Cloud Service Account

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project (or select existing)
3. Enable Google Sheets API:
   - Go to "APIs & Services" → "Library"
   - Search for "Google Sheets API"
   - Click "Enable"

4. Create Service Account:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "Service Account"
   - Name: "tintbot-sheets-integration"
   - Click "Create and Continue"
   - Skip optional steps, click "Done"

5. Create Key:
   - Click on the service account you just created
   - Go to "Keys" tab
   - Click "Add Key" → "Create new key"
   - Choose "JSON"
   - Download the JSON file

### Step 3: Share Sheet with Service Account

1. Open the JSON key file you downloaded
2. Find the `client_email` field (looks like: `xxxxx@xxxxx.iam.gserviceaccount.com`)
3. Go back to your Google Sheet
4. Click "Share" button
5. Paste the service account email
6. Give "Editor" permissions
7. Uncheck "Notify people"
8. Click "Share"

### Step 4: Extract Credentials

From your downloaded JSON file, you need:

1. **client_email**:
   ```json
   "client_email": "tintbot-sheets@project-id.iam.gserviceaccount.com"
   ```

2. **private_key**:
   ```json
   "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQ...rest of key...\n-----END PRIVATE KEY-----\n"
   ```

### Step 5: Add to Netlify

1. Go to Netlify Dashboard
2. Select your site
3. Go to "Site settings" → "Environment variables"
4. Add three variables:

**Variable 1:**
- Key: `GOOGLE_SHEETS_CLIENT_EMAIL`
- Value: [Paste client_email from JSON]
- Scope: Production

**Variable 2:**
- Key: `GOOGLE_SHEETS_PRIVATE_KEY`
- Value: [Paste entire private_key from JSON, including the newlines]
- Scope: Production

**Variable 3:**
- Key: `GOOGLE_SHEET_ID`
- Value: [Paste your Sheet ID from Step 1]
- Scope: Production

5. Click "Save"

### Step 6: Redeploy Site

1. In Netlify Dashboard, go to "Deploys"
2. Click "Trigger deploy" → "Deploy site"
3. Wait for build to complete (2-3 minutes)

---

## ✅ Testing

1. Visit your deployed site
2. Fill out and submit a form
3. Check your Google Sheet
4. A new row should appear with the lead data

---

## 🎨 Sheet Template (Copy This)

You can use this pre-formatted template:

[Google Sheets Template Link - Coming Soon]

Or manually create columns:

| Column | Description | Example |
|--------|-------------|---------|
| A - Timestamp | When lead was captured | 2024-01-15T10:30:00Z |
| B - Lead ID | Unique identifier | LEAD_1705315800000_abc123 |
| C - Name | Contact name | John Smith |
| D - Email | Email address | john@example.com |
| E - Phone | Phone number | (555) 123-4567 |
| F - Business | Business or vehicle type | ABC Tinting / 2023 Tesla Model 3 |
| G - Details | Additional information | Looking for ceramic tint |
| H - Score | Lead quality (0-100) | 85 |
| I - Source | Where lead came from | website-form |
| J - UTM Source | Marketing source | google-ads |
| K - UTM Campaign | Marketing campaign | ceramic-promo |

---

## 🔧 Troubleshooting

### Leads not appearing in sheet?

1. **Check service account permissions**:
   - Verify service account email has Editor access to sheet
   - Check "Share" settings in Google Sheet

2. **Verify credentials**:
   - Ensure private key includes newlines (`\n`)
   - Check client_email format ends with `.iam.gserviceaccount.com`
   - Confirm Sheet ID is correct

3. **Check Netlify function logs**:
   - Go to Netlify Dashboard → Functions
   - Click on `lead-router` function
   - Check logs for errors

4. **Test API manually**:
   ```bash
   # From Netlify function logs, you should see:
   ✅ Lead saved to Google Sheets
   ```

### Error: "The caller does not have permission"

- The service account doesn't have access to the sheet
- Re-share the sheet with the service account email
- Make sure you gave "Editor" permissions

### Error: "Invalid private key"

- The private key format is incorrect
- Make sure to include the entire key with `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----`
- Preserve the `\n` newline characters

---

## 📊 Advanced: Sheet Formulas

Add these formulas to enhance your sheet:

### Auto-Calculate Days Since Lead
In column L (add header "Days Old"):
```
=IF(A2="","",TODAY()-INT(A2))
```

### Priority Label
In column M (add header "Priority"):
```
=IF(H2="","",IF(H2>=80,"🔥 HOT",IF(H2>=60,"⭐ WARM","📋 NURTURE")))
```

### Follow-up Date (3 days after)
In column N (add header "Follow Up"):
```
=IF(A2="","",A2+3)
```

---

## 🎯 Next Steps

Once Google Sheets integration is working:

1. ✅ Set up conditional formatting (highlight hot leads in red)
2. ✅ Create pivot tables for lead source analysis
3. ✅ Add filters for easy sorting
4. ✅ Share with team members
5. ✅ Set up Google Sheets notifications (Tools → Notification rules)

---

## 💡 Pro Tips

1. **Automatic Backups**:
   - File → Version history → See version history
   - Restore from any previous version

2. **Data Validation**:
   - Add dropdown lists for lead status
   - Create custom filters

3. **Google Data Studio**:
   - Connect sheet to Data Studio for advanced reporting
   - Create visual dashboards

4. **Google Apps Script**:
   - Add custom automations
   - Send follow-up emails automatically
   - Calculate ROI metrics

---

## 🆘 Need Help?

- Google Sheets API Docs: https://developers.google.com/sheets/api
- Service Account Guide: https://cloud.google.com/iam/docs/service-accounts
- Netlify Functions: https://docs.netlify.com/functions/overview/

---

**Estimated Setup Time**: 15 minutes
**Difficulty**: Medium
**Cost**: Free (Google Cloud free tier is sufficient)

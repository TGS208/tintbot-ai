# 🚀 Render Deployment Guide for Tintbot.ai

## Pre-Deployment Checklist

### 1. GitHub Repository
- [x] Push all code to main branch
- [x] Ensure `render.yaml` is in root
- [x] Verify `package.json` scripts are correct
- [x] Test locally with `npm start`

### 2. Environment Variables
- [ ] `DATABASE_URL` (auto-provided by Render)
- [ ] `NODE_ENV=production`
- [ ] `HUBSPOT_API_KEY` (optional)
- [ ] `TWILIO_AUTH_TOKEN` (optional)
- [ ] `SLACK_WEBHOOK_URL` (optional)

### 3. Database Setup
- [ ] Create PostgreSQL database in Render
- [ ] Run `database/init.sql` after database creation
- [ ] Verify sample data is inserted

## Deployment Steps

### Step 1: Create Render Account
1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Connect your repository

### Step 2: Create Database
1. Dashboard → "New" → "PostgreSQL"
2. Name: `tintbot-db`
3. Plan: Starter ($7/month)
4. Region: Oregon (US West)
5. Click "Create Database"

### Step 3: Initialize Database
```bash
# Connect to your database via Render dashboard
# Run the SQL from database/init.sql
```

### Step 4: Create Web Service
1. Dashboard → "New" → "Web Service"
2. Connect Repository: `your-username/tintbot-ai`
3. Name: `tintbot-ai-web`
4. Branch: `main`
5. Build Command: `npm run render-build`
6. Start Command: `npm start`
7. Plan: Starter ($7/month)

### Step 5: Create Background Worker
1. Dashboard → "New" → "Background Worker"
2. Connect Repository: `your-username/tintbot-ai`
3. Name: `tintbot-automation-worker`
4. Build Command: `npm install`
5. Start Command: `node server/background-worker.js`
6. Plan: Starter ($7/month)

### Step 6: Configure Environment Variables
In both services, add:
- `NODE_ENV`: `production`
- `DATABASE_URL`: Link to your database

### Step 7: Set Up Custom Domains
1. In Web Service → Settings → Custom Domains
2. Add: `tintbot.ai`
3. Add: `*.tintbot.ai` (for white-label subdomains)
4. Configure DNS as instructed by Render

## Post-Deployment Verification

### Health Checks
- [ ] Visit `https://your-app.onrender.com/health`
- [ ] Should return: `{"status":"healthy","database":"connected"}`

### API Testing
- [ ] Test lead capture: `POST /api/capture-lead`
- [ ] Test subscription: `POST /api/subscribe`
- [ ] Test client config: `GET /api/client/elite-tint-001`

### Database Verification
```sql
-- Connect to your database and verify:
SELECT COUNT(*) FROM clients;  -- Should return 2
SELECT COUNT(*) FROM leads;    -- Should return 0 initially
```

### Background Worker Verification
- Check logs in Render dashboard
- Should see: "🚀 Starting Tintbot.ai background worker..."

## DNS Configuration

### For your main domain (tintbot.ai):
```
Type: CNAME
Name: @
Value: your-app.onrender.com
```

### For white-label subdomains:
```
Type: CNAME
Name: *
Value: your-app.onrender.com
```

## Monitoring & Maintenance

### Key Metrics to Monitor:
- Response time (< 500ms)
- Database connections (< 10)
- Background job success rate (> 95%)
- Lead capture rate

### Monthly Tasks:
- Review error logs
- Check database size
- Update dependencies
- Backup client data

## Troubleshooting

### Common Issues:
1. **Database connection errors**
   - Check DATABASE_URL environment variable
   - Verify database is running

2. **Build failures**
   - Check package.json scripts
   - Verify all dependencies are listed

3. **Background worker not processing**
   - Check worker logs in Render dashboard
   - Verify database permissions

## Success Criteria

Your deployment is successful when:
- [x] Web app loads at your domain
- [x] Health check returns 200 OK
- [x] API endpoints respond correctly
- [x] Background worker is processing leads
- [x] Database is populated with sample data
- [x] White-label subdomains work

## Support

- Render Docs: https://render.com/docs
- Community: https://community.render.com
- Your deployment URL: `https://your-unique-name.onrender.com`

## Cost Summary

Monthly costs:
- Web Service: $7
- PostgreSQL: $7  
- Background Worker: $7
- **Total: $21/month**

Per client revenue: $149/month
**Net profit per client: $128/month**

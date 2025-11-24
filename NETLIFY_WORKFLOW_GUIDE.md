# 🚀 Netlify Preview Deployment Workflow

## 📋 How You Got Here (Current Setup)

### What Happened:
1. **Branch Created**: `claude/create-marketing-website-011CUYi6tZ5DpQ2nWz2wquMS`
2. **Commits Pushed**: To this branch on GitHub
3. **PR Created**: Pull Request #19 opened
4. **Netlify Auto-Deploy**: Detected PR and built preview
5. **Preview URL Generated**: https://deploy-preview-19--maintintversion.netlify.app

### Why It Works:
✅ Netlify is connected to your GitHub repository
✅ Configured to build on Pull Requests
✅ Each PR gets unique preview URL
✅ Auto-rebuilds on new commits to PR branch

---

## 🔄 Future Workflow Options

### **Option 1: PR-Based Previews** (Current - Recommended)

**For Every New Feature:**

```bash
# 1. Create new branch from main
git checkout main
git pull origin main
git checkout -b feature/new-marketing-campaign

# 2. Make your changes
# ... edit files ...

# 3. Commit and push
git add .
git commit -m "feat: Add new marketing campaign"
git push origin feature/new-marketing-campaign

# 4. Create Pull Request on GitHub
# → Netlify automatically creates preview URL

# 5. Preview URL will be:
# https://deploy-preview-XX--maintintversion.netlify.app
# (XX = PR number)

# 6. Test on preview → Merge when ready → Goes to production
```

**Benefits:**
- ✅ Automatic preview for every PR
- ✅ Test before production
- ✅ Unique URL per feature
- ✅ No manual deployment needed

---

### **Option 2: Branch Previews** (Alternative)

**Configure Netlify to Deploy Specific Branches:**

**In Netlify Dashboard:**
1. Go to Site settings → Build & deploy → Deploy contexts
2. Enable "Branch deploys"
3. Select branches to deploy (e.g., `staging`, `dev`)

**Example:**
```bash
# Push to staging branch
git checkout -b staging
git push origin staging

# Gets preview URL:
# https://staging--maintintversion.netlify.app
```

**Benefits:**
- ✅ Permanent preview URLs for specific branches
- ✅ Staging environment
- ✅ Development environment

---

### **Option 3: Deploy Previews for All Branches**

**Enable in Netlify Dashboard:**

Settings → Build & deploy → Deploy contexts → Deploy previews:
- ☑️ Any pull request against production branch
- ☑️ All branches (creates preview for every branch)

**Result:**
Every branch you push gets a preview URL automatically!

---

## 🎯 Recommended Setup for Your Use Case

### **Production Environment**
- **Branch**: `main`
- **URL**: https://maintintversion.netlify.app (or custom domain)
- **Deploys**: Automatic on merge to main

### **Preview/Testing Environment**
- **Method**: Pull Requests (current setup)
- **URL**: https://deploy-preview-XX--maintintversion.netlify.app
- **Deploys**: Automatic on PR creation

### **Development Environment** (Optional)
- **Branch**: `dev` or `staging`
- **URL**: https://dev--maintintversion.netlify.app
- **Deploys**: Automatic on push to dev branch

---

## 📝 Step-by-Step: Create New Preview Site

### **Scenario: You Want to Test New Hero Image**

```bash
# 1. Start from main branch
git checkout main
git pull origin main

# 2. Create feature branch
git checkout -b feature/new-hero-image

# 3. Add your new hero image
cp /path/to/new-hero.jpg public/hero-tintbot.jpg

# 4. Update if needed
# Edit index.html if image name changed

# 5. Commit changes
git add public/hero-tintbot.jpg
git commit -m "feat: Update hero image with new branding"

# 6. Push to GitHub
git push origin feature/new-hero-image

# 7. Create Pull Request on GitHub
# Go to: https://github.com/TGS208/tintbot-ai
# Click "Compare & pull request"
# Title: "Update Hero Image"
# Click "Create pull request"

# 8. Wait 2-3 minutes
# Netlify will comment on PR with preview URL

# 9. Test preview URL
# Example: https://deploy-preview-XX--maintintversion.netlify.app

# 10. If good → Merge PR → Goes to production
# If needs changes → Push more commits to same branch → Preview auto-updates
```

---

## 🔧 Current Netlify Configuration

### **Your netlify.toml Settings:**

```toml
[build]
  publish = "dist"
  command = "npm run build:prod"

# This means:
# - Netlify runs: npm run build:prod
# - Serves files from: dist/ folder
# - Includes: index.html, demo.html, features.html, pricing.html, public/
```

### **Deploy Contexts (Check your dashboard):**

**Production:**
- Branch: `main`
- Command: `npm run build:prod`
- Published automatically

**Deploy Previews:**
- Trigger: Pull Requests
- Command: `npm run build:prod` (same as production)
- URL: `deploy-preview-XX--maintintversion.netlify.app`

---

## 🎨 Advanced: Multiple Preview Environments

### **Setup Staging + Development Branches**

```bash
# Create persistent preview branches
git checkout main
git checkout -b staging
git push origin staging

git checkout main
git checkout -b development
git push origin development
```

**Configure in Netlify:**
1. Settings → Build & deploy → Continuous deployment
2. Branch deploys → Let me add individual branches
3. Add: `staging` and `development`

**Result:**
- **Production**: https://maintintversion.netlify.app (main branch)
- **Staging**: https://staging--maintintversion.netlify.app
- **Development**: https://development--maintintversion.netlify.app
- **PR Previews**: https://deploy-preview-XX--maintintversion.netlify.app

---

## 📊 Preview Site Lifecycle

### **Current PR #19:**

```
Created → Commits pushed → Preview built → Testing → Merge → Production
                                  ↓
                    https://deploy-preview-19--maintintversion.netlify.app
                    (Available for 6 months after merge)
```

### **After Merge:**
- ✅ Preview URL stays available (6 months)
- ✅ Main site updates to merged code
- ✅ New PRs get new preview URLs (deploy-preview-20, 21, etc.)

---

## 🚦 Common Workflows

### **Workflow 1: Quick Fix**
```bash
git checkout -b fix/typo
# Fix typo
git push origin fix/typo
# Create PR → Test preview → Merge
```

### **Workflow 2: Major Feature**
```bash
git checkout -b feature/new-pricing-page
# Build new page
git push origin feature/new-pricing-page
# Create PR → Share preview with team → Iterate → Merge
```

### **Workflow 3: A/B Testing**
```bash
# Version A
git checkout -b test/hero-version-a
git push origin test/hero-version-a
# Preview: deploy-preview-20

# Version B  
git checkout -b test/hero-version-b
git push origin test/hero-version-b
# Preview: deploy-preview-21

# Compare both previews → Merge winner
```

---

## ⚡ Quick Commands Reference

### **Create New Preview:**
```bash
git checkout -b feature/your-feature
git add .
git commit -m "feat: Your changes"
git push origin feature/your-feature
# Create PR on GitHub → Auto preview
```

### **Update Existing Preview:**
```bash
# Already on feature branch
git add .
git commit -m "fix: Update based on feedback"
git push origin feature/your-feature
# Preview auto-updates in ~2 minutes
```

### **Check Preview Status:**
```bash
# Go to your PR on GitHub
# Look for Netlify bot comment
# Click "View deployment"
```

---

## 🎯 What You Should Do Now

### **After Merging PR #19:**

**Option A: Keep PR-Based Workflow** (Simplest)
- ✅ No changes needed
- ✅ Create PR for each feature
- ✅ Get automatic preview
- ✅ Merge when ready

**Option B: Add Staging Branch** (More Control)
```bash
git checkout main
git checkout -b staging
git push origin staging

# Configure in Netlify dashboard
# Now you have:
# - Production (main)
# - Staging (staging branch)
# - PR previews (any feature branch)
```

**Option C: Enable All Branch Previews**
- Netlify Dashboard → Deploy contexts → All branches
- Every branch gets preview URL
- More preview URLs to manage

---

## 💡 My Recommendation

**For Your Use Case (Marketing Site):**

1. **Keep Current Setup** ✅
   - PR-based previews
   - Automatic deployment
   - Clean workflow

2. **Add Staging Branch** (Optional)
   - For testing before creating PR
   - Persistent preview URL
   - Share with stakeholders

3. **Workflow:**
   ```
   Development → Feature Branch → PR Preview → Review → Merge → Production
                                      ↓
                              Test & Share URL
   ```

---

## 🔗 Useful Links

**Current Preview:**
https://deploy-preview-19--maintintversion.netlify.app

**GitHub PR:**
https://github.com/TGS208/tintbot-ai/pull/19

**Netlify Dashboard:**
https://app.netlify.com/sites/maintintversion/deploys

**Create New PR:**
https://github.com/TGS208/tintbot-ai/compare

---

## ❓ FAQ

**Q: How long do preview URLs last?**
A: 6 months after PR is closed/merged

**Q: Can I have multiple previews at once?**
A: Yes! Each PR gets its own preview URL

**Q: Do previews cost extra?**
A: No, included in Netlify free/pro plan

**Q: Can I share preview URLs with clients?**
A: Yes! They're public URLs, perfect for feedback

**Q: What if I delete the branch?**
A: Preview URL stays active for 6 months

**Q: Can I customize preview URL?**
A: No, but branch deploys give predictable URLs (staging--yoursite.netlify.app)

---

## 🎉 Summary

**You Already Have Preview Sites Working!**

**To Continue:**
1. Create feature branch
2. Push to GitHub
3. Open Pull Request
4. Netlify automatically creates preview
5. Test preview URL
6. Merge when ready
7. Repeat for next feature

**That's it!** 🚀

Your current setup is perfect for ongoing development and testing.

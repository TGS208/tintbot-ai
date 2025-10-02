# GitHub Actions Workflows

This directory contains automated workflows for the Tintbot.ai repository.

## Available Workflows

### 1. CI - Build and Test (`ci.yml`)
**Triggers:** Push to `main` or `develop`, Pull requests

**Purpose:** Continuous Integration workflow that validates builds on multiple Node.js versions.

**Steps:**
- Builds the project on Node.js 18.x and 20.x
- Runs validation checks
- Performs performance testing
- Uploads build artifacts
- Reports build size

**When it runs:** On every push to main/develop branches and on all pull requests.

---

### 2. Deploy to Netlify (`deploy-netlify.yml`)
**Triggers:** Push to `main`, Manual workflow dispatch

**Purpose:** Automatically deploys the production build to Netlify.

**Requirements:**
- `NETLIFY_AUTH_TOKEN` secret must be set in repository settings
- `NETLIFY_SITE_ID` secret must be set in repository settings

**Steps:**
- Builds production-ready package
- Validates deployment readiness
- Deploys to Netlify
- Provides deployment summary

**When it runs:** On every push to main branch or manually triggered.

---

### 3. Code Quality (`code-quality.yml`)
**Triggers:** Push to `main` or `develop`, Pull requests

**Purpose:** Performs code quality checks and security audits.

**Steps:**
- Checks for dependency vulnerabilities
- Identifies outdated dependencies
- Analyzes repository statistics
- Verifies build configuration
- Performs basic security checks

**When it runs:** On every push to main/develop branches and on all pull requests.

---

### 4. PR Validation (`pr-validation.yml`)
**Triggers:** Pull request opened, synchronized, or reopened

**Purpose:** Validates pull requests before merging.

**Steps:**
- Builds the project
- Runs validation checks
- Reports files changed and statistics
- Comments on PR with build results

**When it runs:** On all pull request events.

---

### 5. Dependency Update Check (`dependency-check.yml`)
**Triggers:** Weekly schedule (Monday 9 AM UTC), Manual dispatch

**Purpose:** Monitors dependencies for updates and security issues.

**Steps:**
- Checks for outdated packages
- Performs security audit
- Generates dependency report
- Uploads report as artifact

**When it runs:** Weekly on Mondays at 9 AM UTC or manually triggered.

---

### 6. Create Release (`release.yml`)
**Triggers:** Git tags (v*.*.*), Manual workflow dispatch

**Purpose:** Creates GitHub releases with build artifacts.

**Steps:**
- Builds production release
- Creates distribution archives (tar.gz and zip)
- Generates changelog
- Creates GitHub release with assets

**When it runs:** When a version tag is pushed or manually triggered.

---

## Setup Instructions

### Required Secrets

For the Netlify deployment workflow, you need to add these secrets to your repository:

1. Go to Repository Settings → Secrets and variables → Actions
2. Add the following secrets:
   - `NETLIFY_AUTH_TOKEN`: Your Netlify personal access token
   - `NETLIFY_SITE_ID`: Your Netlify site ID

### Getting Netlify Credentials

**Netlify Auth Token:**
1. Log into Netlify
2. Go to User Settings → Applications
3. Create a new personal access token
4. Copy the token

**Netlify Site ID:**
1. Open your site in Netlify dashboard
2. Go to Site Settings → General
3. Copy the Site ID (API ID)

---

## Usage Examples

### Manual Deployment
To manually trigger a Netlify deployment:
1. Go to Actions tab
2. Select "Deploy to Netlify"
3. Click "Run workflow"
4. Select the branch and click "Run workflow"

### Creating a Release
To create a new release:
```bash
# Tag your commit
git tag -a v1.0.0 -m "Release version 1.0.0"

# Push the tag
git push origin v1.0.0
```

Or manually trigger:
1. Go to Actions tab
2. Select "Create Release"
3. Click "Run workflow"
4. Enter version number (e.g., v1.0.0)
5. Click "Run workflow"

### Running Dependency Checks
Dependency checks run automatically weekly, but you can run them manually:
1. Go to Actions tab
2. Select "Dependency Update Check"
3. Click "Run workflow"

---

## Workflow Status Badges

Add these badges to your README to show workflow status:

```markdown
![CI](https://github.com/TGS208/tintbot-ai/workflows/CI%20-%20Build%20and%20Test/badge.svg)
![Deploy](https://github.com/TGS208/tintbot-ai/workflows/Deploy%20to%20Netlify/badge.svg)
![Code Quality](https://github.com/TGS208/tintbot-ai/workflows/Code%20Quality/badge.svg)
```

---

## Troubleshooting

### Build Failures
If builds fail, check:
1. All dependencies are listed in `package.json`
2. Build scripts are correctly configured
3. Node version compatibility

### Deployment Failures
If Netlify deployment fails, verify:
1. Secrets are correctly set in repository settings
2. Netlify site is properly configured
3. Build artifacts are being created in `dist/` directory

### Workflow Not Running
If a workflow doesn't run:
1. Check that the trigger conditions are met
2. Verify workflow file syntax is valid
3. Check repository Actions settings are enabled

---

## Contributing

When adding or modifying workflows:
1. Validate YAML syntax before committing
2. Test workflows in a feature branch first
3. Document any new secrets or configuration required
4. Update this README with new workflow information

---

## Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Netlify Actions Documentation](https://github.com/nwtgck/actions-netlify)
- [Workflow Syntax Reference](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions)

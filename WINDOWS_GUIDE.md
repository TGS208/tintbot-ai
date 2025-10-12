# 🪟 Windows User Guide for Tintbot.ai

This guide helps Windows users work with the Tintbot.ai repository using PowerShell or Command Prompt.

## 🚨 Common Issues and Solutions

### Issue 1: "Path is not recognized as a command"

**Error Example:**
```powershell
PS C:\Users\Parent\tintbot-ai> /workspaces/tintbot-ai/
/workspaces/tintbot-ai/ : The term '/workspaces/tintbot-ai/' is not recognized...
```

**Why this happens:** You're trying to run a directory path as a command. Directories are not executable.

**Solution:** Use proper PowerShell commands to navigate:

```powershell
# To navigate to a directory, use 'cd' (Change Directory)
cd C:\Users\Parent\tintbot-ai

# To list files in a directory
ls
# or
Get-ChildItem

# To list files in the dist folder
ls dist
# or
Get-ChildItem dist
```

### Issue 2: Character Encoding Issues in PowerShell

**Problem:** When you run `type index.html`, you see strange characters like `â€¢` instead of `•`

**Why this happens:** PowerShell's console encoding doesn't match the file's UTF-8 encoding.

**Solution:** Set PowerShell to use UTF-8 encoding:

```powershell
# Set console to UTF-8 for current session
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
chcp 65001

# Now try viewing the file again
type index.html
```

**Alternative:** Don't use `type` to view HTML files. Instead:
- Open them in a text editor (VS Code, Notepad++, etc.)
- Open them in a browser to see the actual website

## 📋 Essential PowerShell Commands

### Navigation Commands

```powershell
# Show current directory
pwd

# Change directory
cd C:\Users\Parent\tintbot-ai

# Go up one level
cd ..

# List files and folders
ls
# or
dir

# List with details
ls -Force  # Shows hidden files too
```

### File Operations

```powershell
# View file contents (short files)
Get-Content README.md
# or
cat README.md

# View first 20 lines
Get-Content index.html -Head 20

# View last 20 lines
Get-Content index.html -Tail 20

# Search for text in file
Select-String -Path index.html -Pattern "Tintbot"
```

### Working with This Project

```powershell
# 1. Navigate to project directory
cd C:\Users\Parent\tintbot-ai

# 2. Check if Node.js is installed
node --version
npm --version

# 3. Install dependencies (first time only)
npm install

# 4. Build the project
npm run build

# 5. Build with optimizations (for production)
npm run build:prod

# 6. View files in dist folder
ls dist

# 7. Open built website in browser
start dist\index.html
```

## 🔧 Setting Up Your Environment

### 1. Install Required Software

**Node.js** (Required for building the project)
- Download from: https://nodejs.org/
- Choose LTS version (recommended)
- This includes npm (Node Package Manager)

**Git** (Optional, for version control)
- Download from: https://git-scm.com/
- Allows you to clone and manage the repository

**Text Editor** (Recommended)
- VS Code: https://code.visualstudio.com/
- Notepad++: https://notepad-plus-plus.org/

### 2. Clone or Download the Repository

**Option A: Using Git**
```powershell
cd C:\Users\Parent
git clone https://github.com/TGS208/tintbot-ai.git
cd tintbot-ai
```

**Option B: Download ZIP**
1. Go to https://github.com/TGS208/tintbot-ai
2. Click "Code" → "Download ZIP"
3. Extract to `C:\Users\Parent\tintbot-ai`
4. Open PowerShell and navigate there

### 3. Install Dependencies

```powershell
# Navigate to project directory
cd C:\Users\Parent\tintbot-ai

# Install all required packages
npm install

# Wait for installation to complete (may take a few minutes)
```

### 4. Build the Project

```powershell
# Build for production
npm run build:prod

# This creates a 'dist' folder with the website files
```

### 5. View the Website

```powershell
# Open in default browser
start dist\index.html

# Or right-click dist\index.html and choose "Open with" → your browser
```

## 📁 Understanding the Folder Structure

```
tintbot-ai/
├── dist/                    # ⭐ Built website (created by npm run build)
│   ├── index.html          # Main website file
│   ├── _headers            # Netlify headers
│   ├── _redirects          # Netlify redirects
│   └── ...                 # Other built files
├── src/                     # Source code (for developers)
├── scripts/                 # Build scripts
├── public/                  # Static assets
├── index.html              # Source HTML (not the final version)
├── package.json            # Project configuration
└── README.md               # Project documentation
```

**Important:** 
- The `dist/` folder is created when you run `npm run build`
- Always use files from `dist/` folder for deployment
- The `index.html` in the root is source code, not the final version

## 🌐 Deploying Your Website

### Option 1: Netlify (Recommended)

1. Create account at https://netlify.com
2. Click "Add new site" → "Import an existing project"
3. Connect your GitHub repository
4. Netlify will automatically detect settings:
   - Build command: `npm run build:prod`
   - Publish directory: `dist`
5. Click "Deploy site"

**See detailed guide:** [NETLIFY_QUICK_START.md](./NETLIFY_QUICK_START.md)

### Option 2: Manual Upload

1. Build the project locally:
   ```powershell
   npm run build:prod
   ```

2. Upload everything in the `dist/` folder to your web host

3. Make sure `index.html` is the homepage

## ❓ Troubleshooting

### Problem: "npm is not recognized"

**Solution:** Node.js is not installed or not in PATH
1. Install Node.js from https://nodejs.org/
2. Restart PowerShell after installation
3. Verify with: `node --version`

### Problem: "npm install" fails

**Solution 1:** Try with legacy peer dependencies
```powershell
npm install --legacy-peer-deps
```

**Solution 2:** Clear npm cache
```powershell
npm cache clean --force
npm install
```

### Problem: Build fails

**Solution:** Check Node.js version
```powershell
node --version
# Should be v16 or higher
```

If your version is too old, update Node.js from https://nodejs.org/

### Problem: "dist folder is empty"

**Solution:** The build may have failed. Run:
```powershell
npm run build:prod
# Check for error messages
```

### Problem: Website shows blank page

**Solution:** 
1. Make sure you're opening `dist/index.html`, not root `index.html`
2. Check browser console for errors (F12 → Console tab)
3. Try a different browser

### Problem: PowerShell won't run scripts

**Error:** "script execution is disabled on this system"

**Solution:** Enable script execution
```powershell
# Run PowerShell as Administrator
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

## 🎓 Learning Resources

### PowerShell Basics
- Official docs: https://docs.microsoft.com/en-us/powershell/
- PowerShell tutorial: https://www.tutorialspoint.com/powershell/

### Node.js & npm
- Node.js docs: https://nodejs.org/en/docs/
- npm documentation: https://docs.npmjs.com/

### Web Development
- HTML/CSS/JS: https://www.w3schools.com/
- React: https://react.dev/

## 💡 Quick Tips

1. **Use Tab Completion:** Start typing a command or path and press Tab to auto-complete

2. **Copy-Paste in PowerShell:** 
   - Right-click to paste
   - Or use Ctrl+Shift+V

3. **Clear Screen:** Type `cls` or `clear`

4. **View Command History:** Press Up/Down arrow keys

5. **Stop Running Command:** Press Ctrl+C

6. **Open Current Folder in Explorer:**
   ```powershell
   explorer .
   ```

7. **Open Current Folder in VS Code:**
   ```powershell
   code .
   ```

## 🆘 Getting Help

If you're still having issues:

1. **Check the main README:** [README.md](./README.md)
2. **Netlify deployment guide:** [NETLIFY_QUICK_START.md](./NETLIFY_QUICK_START.md)
3. **GitHub Issues:** https://github.com/TGS208/tintbot-ai/issues
4. **Ask in Discussions:** https://github.com/TGS208/tintbot-ai/discussions

## 📞 Common Commands Cheat Sheet

```powershell
# Navigation
pwd                          # Show current directory
cd path\to\folder           # Change directory
cd ..                       # Go up one level
ls                          # List files

# Project Setup
npm install                 # Install dependencies
npm run build              # Build project
npm run build:prod         # Build for production

# Viewing Files
Get-Content file.txt        # View file contents
start index.html           # Open file in default app
explorer .                 # Open current folder in Explorer

# Troubleshooting
node --version             # Check Node.js version
npm --version              # Check npm version
npm cache clean --force    # Clear npm cache
npm install --legacy-peer-deps  # Install with legacy mode
```

---

**Made with ❤️ for Window Tint Professionals**

Need more help? Open an issue on GitHub!

# 🔧 Troubleshooting Guide for Tintbot.ai

This guide addresses common issues users encounter when working with the Tintbot.ai repository.

## 🪟 Windows PowerShell Issues

### ❌ Error: "The term '/path/to/directory' is not recognized"

**Full Error:**
```powershell
PS C:\Users\Parent\tintbot-ai> /workspaces/tintbot-ai/
/workspaces/tintbot-ai/ : The term '/workspaces/tintbot-ai/' is not recognized as the name of a cmdlet, function, script file, or operable program.
```

**What's Happening:**
You're trying to execute a directory path as if it were a command or program. Directories are not executable.

**Solution:**
Use the correct PowerShell commands:

```powershell
# ✅ CORRECT: Navigate to a directory
cd /workspaces/tintbot-ai
# or on Windows
cd C:\Users\Parent\tintbot-ai

# ✅ CORRECT: List files in a directory
ls
Get-ChildItem

# ✅ CORRECT: List files in dist folder
ls dist
```

**Learn More:** See [WINDOWS_GUIDE.md](./WINDOWS_GUIDE.md) for complete PowerShell tutorial.

---

### ❌ Problem: Strange Characters in Terminal (â€¢ instead of •)

**What You See:**
```
<li>â€¢ Upload car photo â†' instant preview</li>
<li>â€¢ Compare 35%, 50%, and 70% tint levels</li>
```

**What It Should Be:**
```
<li>• Upload car photo → instant preview</li>
<li>• Compare 35%, 50%, and 70% tint levels</li>
```

**What's Happening:**
PowerShell's console encoding doesn't match the file's UTF-8 encoding. This is a **display issue**, not a file corruption issue. The files are correct!

**Solution 1: Set PowerShell Encoding**
```powershell
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
chcp 65001
```

**Solution 2: Don't Use Terminal to View HTML (Recommended)**
Instead of using `type` or `cat` commands, open HTML files in:
- ✅ A web browser (Chrome, Firefox, Edge)
- ✅ A text editor (VS Code, Notepad++, Sublime Text)
- ✅ An IDE (Visual Studio Code, WebStorm)

**To Open in Browser:**
```powershell
# Windows
start dist\index.html

# Or right-click the file → Open with → Browser
```

**Verification:**
The repository files are correctly encoded. You can verify this:
```powershell
# Check file encoding
file -bi index.html
# Output: text/html; charset=utf-8 ✅

# Files have proper charset declaration
head -5 dist/index.html
# Output shows: <meta charset="UTF-8"> ✅
```

---

## 🏗️ Build Issues

### ❌ Error: "npm is not recognized"

**Solution:**
Node.js is not installed or not in your system PATH.

1. Download and install Node.js from https://nodejs.org/
2. Choose the LTS (Long Term Support) version
3. Restart your terminal after installation
4. Verify: `node --version` and `npm --version`

---

### ❌ Error: "npm install" fails

**Solution 1: Use legacy peer dependencies**
```powershell
npm install --legacy-peer-deps
```

**Solution 2: Clear cache and retry**
```powershell
npm cache clean --force
npm install
```

**Solution 3: Delete node_modules and retry**
```powershell
# Windows PowerShell
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install

# Or use Unix-style commands
rm -rf node_modules
rm package-lock.json
npm install
```

---

### ❌ Error: Build fails or dist folder is empty

**Symptoms:**
- `npm run build` completes but `dist/` folder doesn't exist
- `dist/` folder exists but is empty
- Build shows errors

**Solution:**

1. **Check Node.js version:**
   ```powershell
   node --version
   # Should be v16 or higher (v18 or v20 recommended)
   ```

2. **Clean build:**
   ```powershell
   # Remove old build
   rm -rf dist/
   
   # Rebuild
   npm run build:prod
   ```

3. **Check for errors:**
   Look for error messages in the build output. Common issues:
   - Missing dependencies → Run `npm install`
   - Syntax errors → Check recent code changes
   - Permission issues → Run terminal as administrator

4. **Verify dist contents:**
   ```powershell
   ls dist/
   # Should show: index.html, _headers, _redirects, etc.
   ```

---

### ❌ Error: "cannot find module" or "module not found"

**Solution:**
```powershell
# Reinstall dependencies
npm install

# If that doesn't work, clean install
rm -rf node_modules
rm package-lock.json
npm install
```

---

## 🌐 Deployment Issues

### ❌ Netlify: Site shows blank page

**Possible Causes & Solutions:**

1. **Wrong build command:**
   - ✅ Correct: `npm run build:prod`
   - ❌ Wrong: `npm run build` (missing optimizations)

2. **Wrong publish directory:**
   - ✅ Correct: `dist`
   - ❌ Wrong: `.` or `/` or `build`

3. **Build failed on Netlify:**
   - Check deploy logs in Netlify dashboard
   - Look for error messages
   - Verify Node.js version in netlify.toml

4. **Missing files:**
   - Ensure `_redirects` file exists in dist
   - Check that index.html was generated

**Verification Steps:**
```powershell
# Build locally first
npm run build:prod

# Check dist folder
ls dist/
# Should contain: index.html, _headers, _redirects, etc.

# Test locally
start dist/index.html
# Should open and display correctly in browser
```

---

### ❌ Netlify: Forms don't work

**Solution:**

1. **Check form attributes:**
   Forms must have `data-netlify="true"` or `netlify` attribute:
   ```html
   <form name="contact" method="POST" data-netlify="true">
   ```

2. **Add hidden form-name field:**
   ```html
   <input type="hidden" name="form-name" value="contact" />
   ```

3. **Check Netlify dashboard:**
   - Go to Site settings → Forms
   - Verify form is detected
   - Check form submissions

---

## 🖥️ Display Issues

### ❌ Website looks broken or unstyled

**Possible Causes:**

1. **Tailwind CSS not loading:**
   - Check browser console (F12) for errors
   - Verify CDN links are accessible

2. **JavaScript errors:**
   - Open browser console (F12)
   - Look for red error messages
   - Fix any script errors

3. **Caching issues:**
   - Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
   - Clear browser cache
   - Try incognito/private browsing mode

---

## 📝 File Encoding Issues (Summary)

### ✅ The files ARE correct!

If you see encoding issues when using `type`, `cat`, or PowerShell commands to view files:

**This is a display issue, NOT a file corruption issue.**

**Evidence files are correct:**
- ✅ Files have `charset=UTF-8` in HTML head
- ✅ Files are UTF-8 encoded (verified with `file` command)
- ✅ Files display correctly in browsers
- ✅ Files display correctly in text editors

**Why terminal shows wrong characters:**
- PowerShell default encoding ≠ UTF-8
- Console font doesn't support all Unicode characters
- Terminal emulation limitations

**Solution:**
**DON'T view HTML files in terminal!** Use:
- ✅ Web browser (Chrome, Firefox, Edge)
- ✅ Text editor (VS Code, Notepad++)
- ✅ IDE (Visual Studio Code)

---

## 🆘 Still Having Issues?

### Check These Resources:

1. **Windows Users:** [WINDOWS_GUIDE.md](./WINDOWS_GUIDE.md)
2. **Deployment:** [NETLIFY_QUICK_START.md](./NETLIFY_QUICK_START.md)
3. **Main Documentation:** [README.md](./README.md)

### Get Help:

- **GitHub Issues:** https://github.com/TGS208/tintbot-ai/issues
- **GitHub Discussions:** https://github.com/TGS208/tintbot-ai/discussions

### Before Asking for Help:

Please provide:
1. Your operating system (Windows/Mac/Linux)
2. Node.js version (`node --version`)
3. npm version (`npm --version`)
4. Exact error message (full output)
5. What you were trying to do
6. What you expected to happen
7. What actually happened

---

## 🎓 Learning Resources

- **PowerShell Basics:** https://docs.microsoft.com/en-us/powershell/
- **Node.js Documentation:** https://nodejs.org/en/docs/
- **Netlify Documentation:** https://docs.netlify.com/
- **Git Basics:** https://git-scm.com/doc

---

**Made with ❤️ for Window Tint Professionals**

#!/bin/bash

# Netlify Deployment Automation Script
# This script prepares and validates everything for deployment

set -e  # Exit on error

echo ""
echo "🚀 Netlify Deployment Preparation"
echo "=================================="
echo ""

# Color codes for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Step 1: Clean previous build
echo "🧹 Cleaning previous build..."
rm -rf dist/
echo -e "${GREEN}✅ Build directory cleaned${NC}"
echo ""

# Step 2: Install dependencies
echo "📦 Checking dependencies..."
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
    echo -e "${GREEN}✅ Dependencies installed${NC}"
else
    echo -e "${GREEN}✅ Dependencies already installed${NC}"
fi
echo ""

# Step 3: Build project
echo "🏗️  Building project..."
npm run build
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Build successful${NC}"
else
    echo -e "${RED}❌ Build failed${NC}"
    exit 1
fi
echo ""

# Step 4: Run optimizations
echo "⚡ Running optimizations..."
npm run optimize
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Optimizations applied${NC}"
else
    echo -e "${YELLOW}⚠️  Optimizations had warnings (non-critical)${NC}"
fi
echo ""

# Step 5: Validate deployment
echo "🔍 Validating deployment..."
npm run validate
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Validation passed${NC}"
else
    echo -e "${RED}❌ Validation failed${NC}"
    exit 1
fi
echo ""

# Step 6: Show deployment stats
echo "📊 Deployment Statistics"
echo "========================"
echo ""

# Count files
FILE_COUNT=$(find dist -type f | wc -l)
echo "📁 Files in dist/: $FILE_COUNT"

# Calculate size
DIST_SIZE=$(du -sh dist/ | cut -f1)
echo "💾 Total size: $DIST_SIZE"

# Check critical files
echo ""
echo "📋 Critical Files:"
[ -f "dist/index.html" ] && echo "  ✅ index.html" || echo "  ❌ index.html"
[ -f "dist/_headers" ] && echo "  ✅ _headers" || echo "  ❌ _headers"
[ -f "dist/_redirects" ] && echo "  ✅ _redirects" || echo "  ❌ _redirects"
[ -f "dist/manifest.json" ] && echo "  ✅ manifest.json" || echo "  ❌ manifest.json"
[ -f "dist/robots.txt" ] && echo "  ✅ robots.txt" || echo "  ❌ robots.txt"
[ -f "dist/sitemap.xml" ] && echo "  ✅ sitemap.xml" || echo "  ❌ sitemap.xml"
[ -f "dist/sw.js" ] && echo "  ✅ sw.js (Service Worker)" || echo "  ⚠️  sw.js (optional)"

echo ""
echo "=================================="
echo ""
echo -e "${GREEN}🎉 Deployment preparation complete!${NC}"
echo ""
echo "📚 Next Steps:"
echo "   1. Review the dist/ directory"
echo "   2. Commit changes to git"
echo "   3. Push to GitHub"
echo "   4. Netlify will auto-deploy"
echo ""
echo "🔧 Manual deploy options:"
echo "   • Netlify CLI: netlify deploy --prod"
echo "   • Drag & Drop: Drag dist/ folder to Netlify"
echo ""
echo "📖 Documentation:"
echo "   • Quick Start: NETLIFY_QUICK_START.md"
echo "   • Full Guide: NETLIFY_DEPLOYMENT_GUIDE.md"
echo ""

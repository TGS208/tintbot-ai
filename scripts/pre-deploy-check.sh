#!/bin/bash

# Pre-deployment validation script
# Run this before deploying to ensure everything is ready

set -e

echo ""
echo "🔍 Pre-Deployment Validation"
echo "============================"
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if dist exists
if [ ! -d "dist" ]; then
    echo -e "${RED}❌ dist/ directory not found${NC}"
    echo "   Run: npm run build:prod"
    exit 1
fi

echo -e "${GREEN}✅ dist/ directory exists${NC}"

# Check required files
REQUIRED_FILES=(
    "dist/index.html"
    "dist/_redirects"
    "dist/_headers"
    "dist/robots.txt"
    "dist/sitemap.xml"
    "dist/manifest.json"
    "dist/sw.js"
)

echo ""
echo "📋 Checking required files:"
for file in "${REQUIRED_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo -e "   ${GREEN}✅ $file${NC}"
    else
        echo -e "   ${RED}❌ $file${NC}"
        exit 1
    fi
done

# Check index.html size
INDEX_SIZE=$(wc -c < "dist/index.html")
if [ $INDEX_SIZE -lt 10000 ]; then
    echo -e "${RED}❌ index.html seems too small ($INDEX_SIZE bytes)${NC}"
    exit 1
fi
echo -e "${GREEN}✅ index.html size: $INDEX_SIZE bytes${NC}"

# Check if index.html contains React
if grep -q "React" "dist/index.html"; then
    echo -e "${GREEN}✅ React code found in index.html${NC}"
else
    echo -e "${YELLOW}⚠️  Warning: React code not found in index.html${NC}"
fi

# Check netlify.toml
if [ -f "netlify.toml" ]; then
    echo -e "${GREEN}✅ netlify.toml exists${NC}"
    
    # Check build command
    if grep -q "npm run build:prod" "netlify.toml"; then
        echo -e "${GREEN}✅ Build command configured${NC}"
    else
        echo -e "${YELLOW}⚠️  Warning: Build command might not be configured correctly${NC}"
    fi
    
    # Check publish directory
    if grep -q 'publish = "dist"' "netlify.toml"; then
        echo -e "${GREEN}✅ Publish directory configured${NC}"
    else
        echo -e "${RED}❌ Publish directory not set to 'dist'${NC}"
        exit 1
    fi
else
    echo -e "${RED}❌ netlify.toml not found${NC}"
    exit 1
fi

# Check package.json
if [ -f "package.json" ]; then
    echo -e "${GREEN}✅ package.json exists${NC}"
    
    # Check build script
    if grep -q '"build":' "package.json"; then
        echo -e "${GREEN}✅ Build script found${NC}"
    else
        echo -e "${RED}❌ Build script not found in package.json${NC}"
        exit 1
    fi
else
    echo -e "${RED}❌ package.json not found${NC}"
    exit 1
fi

echo ""
echo "============================"
echo -e "${GREEN}✅ All checks passed!${NC}"
echo ""
echo "🚀 Ready for deployment!"
echo ""
echo "Next steps:"
echo "  1. Commit and push to GitHub"
echo "  2. Netlify will automatically deploy"
echo "  3. Check https://app.netlify.com for deployment status"
echo ""

#!/bin/bash

# Install dependencies script for Tintbot.ai
echo "🚀 Installing Tintbot.ai dependencies..."

# Check Node version
echo "🔍 Node version: $(node --version)"
echo "🔍 NPM version: $(npm --version)"

# Verify Node 18+
NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
  echo "❌ Node.js version $NODE_VERSION is not supported. Please use Node.js 18 or higher."
  exit 1
fi

# Clean install
echo "🧹 Cleaning npm cache..."
npm cache clean --force

echo "📦 Installing dependencies..."
npm ci --legacy-peer-deps --silent || npm install --legacy-peer-deps --silent

echo "🔨 Installing esbuild specifically..."
npm install esbuild --save-dev --silent

echo "✅ Dependencies installed successfully!"
echo "🎯 Ready to build!"

#!/bin/bash

# VOLTROLL Website - Quick Deploy Script
# Run this to deploy to Vercel in seconds!

echo "🚀 Deploying VOLTROLL website to Vercel..."

# Check if vercel is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

# Deploy
echo "⚡ Deploying..."
vercel --prod

echo "✅ Deployment complete!"

#!/bin/bash

# Check if commit message is provided
if [ -z "$1" ]; then
    echo "Usage: ./deploy.sh \"commit message\""
    exit 1
fi

MSG="$1"

# Build Hugo site
echo "Building Hugo site..."
hugo

# Deploy public folder
echo "Deploying public..."
cd public
git add .
git commit -m "$MSG"
git push --force

# Update blog repo with new submodule reference
echo "Updating blog repo..."
cd ..
git add .
git commit -m "$MSG"
git push --force

echo "Done!"

#!/bin/bash

# Setup script for Exam Testing Skill
# This script initializes the testing environment for ExamForge

echo "🧪 Setting up Exam Testing environment..."

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
else
    echo "✅ Dependencies already installed"
fi

# Install testing dependencies if not already present
echo "📦 Installing testing libraries..."
npm install --save-dev \
    jest \
    @testing-library/react \
    @testing-library/jest-dom \
    @testing-library/user-event \
    jest-environment-jsdom \
    @playwright/test

echo "✅ Test environment setup complete!"
echo ""
echo "📚 Next steps:"
echo "1. Review the examples/ folder for test patterns"
echo "2. Read references/test-patterns.md for best practices"
echo "3. Run 'npm test' to execute tests"
echo "4. Run 'python3 validate.py' to validate your implementation"

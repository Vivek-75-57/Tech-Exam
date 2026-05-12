#!/bin/bash

# Setup script for Frontend Development Skill
# Configures the development environment for React/Vite development

echo "🎨 Setting up Frontend Development environment..."

# Navigate to frontend directory
cd frontend || { echo "Frontend directory not found"; exit 1; }

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    npm install
else
    echo "✅ Dependencies already installed"
fi

# Install or update dev tools
echo "🛠️  Installing development tools..."
npm install --save-dev \
    eslint \
    prettier \
    vite \
    tailwindcss \
    postcss \
    autoprefixer

# Generate Tailwind config if it doesn't exist
if [ ! -f "tailwind.config.js" ]; then
    echo "⚙️  Generating Tailwind CSS configuration..."
    npx tailwindcss init -p
fi

echo "✅ Frontend development environment ready!"
echo ""
echo "📚 Next steps:"
echo "1. Run 'npm run dev' to start the development server"
echo "2. Review references/component-patterns.md"
echo "3. Check examples/ for component templates"
echo "4. Use 'npm run build' for production builds"

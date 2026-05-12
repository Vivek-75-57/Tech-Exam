#!/usr/bin/env python3
"""
Validation script for Frontend Development skill
Checks project structure, dependencies, and best practices
"""

import os
import json
import re
import sys

def check_project_structure():
    """Verify essential frontend directories exist"""
    required_dirs = [
        'src',
        'src/components',
        'src/pages',
        'src/hooks',
        'src/services',
        'src/store'
    ]
    
    missing = []
    for dir_path in required_dirs:
        if not os.path.exists(dir_path):
            missing.append(dir_path)
    
    return missing

def check_dependencies():
    """Verify required npm packages are installed"""
    required = [
        'react',
        'react-dom',
        'react-router-dom',
        'tailwindcss'
    ]
    
    with open('package.json', 'r') as f:
        package_data = json.load(f)
    
    all_deps = {**package_data.get('dependencies', {}), 
                **package_data.get('devDependencies', {})}
    missing = [p for p in required if p not in all_deps]
    
    return missing

def check_code_quality():
    """Check for code quality in existing components"""
    issues = []
    
    for root, dirs, files in os.walk('src/components'):
        # Skip node_modules
        dirs[:] = [d for d in dirs if d not in ['node_modules', '__tests__']]
        
        for file in files:
            if file.endswith('.jsx'):
                filepath = os.path.join(root, file)
                with open(filepath, 'r') as f:
                    content = f.read()
                
                # Check for console.log in production code
                if 'console.log(' in content:
                    issues.append(f"⚠️  {filepath}: Contains console.log statements")
                
                # Check for var usage (prefer let/const)
                if re.search(r'\bvar\s+', content):
                    issues.append(f"⚠️  {filepath}: Uses 'var' keyword (prefer let/const)")
    
    return issues

def check_accessibility():
    """Check for accessibility best practices"""
    issues = []
    
    for root, dirs, files in os.walk('src/components'):
        dirs[:] = [d for d in dirs if d not in ['node_modules', '__tests__']]
        
        for file in files:
            if file.endswith('.jsx'):
                filepath = os.path.join(root, file)
                with open(filepath, 'r') as f:
                    content = f.read()
                
                # Check for images without alt text
                img_tags = re.findall(r'<img[^>]*>', content)
                for tag in img_tags:
                    if 'alt=' not in tag:
                        issues.append(f"⚠️  {filepath}: Image missing alt attribute")
    
    return issues

def main():
    print("🔍 Validating Frontend Development Setup...\n")
    
    # Check structure
    print("📁 Checking project structure...")
    missing_dirs = check_project_structure()
    if missing_dirs:
        print(f"❌ Missing directories:")
        for d in missing_dirs:
            print(f"   - {d}")
    else:
        print("✅ Project structure looks good")
    
    # Check dependencies
    print("\n📦 Checking dependencies...")
    missing_deps = check_dependencies()
    if missing_deps:
        print(f"❌ Missing packages: {', '.join(missing_deps)}")
        print("   Run: npm install " + " ".join(missing_deps))
    else:
        print("✅ All required packages installed")
    
    # Check code quality
    print("\n✨ Checking code quality...")
    quality_issues = check_code_quality()
    if quality_issues:
        for issue in quality_issues[:5]:  # Show first 5
            print(f"   {issue}")
        if len(quality_issues) > 5:
            print(f"   ... and {len(quality_issues) - 5} more issues")
    else:
        print("✅ Code quality checks passed")
    
    # Check accessibility
    print("\n♿ Checking accessibility...")
    a11y_issues = check_accessibility()
    if a11y_issues:
        for issue in a11y_issues[:5]:
            print(f"   {issue}")
        if len(a11y_issues) > 5:
            print(f"   ... and {len(a11y_issues) - 5} more issues")
    else:
        print("✅ Accessibility checks passed")
    
    print("\n✅ Validation complete!")
    print("\n📚 Resources:")
    print("   - React Best Practices: https://react.dev/learn")
    print("   - Accessibility: https://www.w3.org/WAI/")
    print("   - Tailwind CSS: https://tailwindcss.com/docs")
    
    return len(missing_dirs) == 0 and len(missing_deps) == 0

if __name__ == '__main__':
    success = main()
    sys.exit(0 if success else 1)

#!/usr/bin/env python3
"""
Validation script for Exam Testing skill
Checks if the testing setup is properly configured
"""

import os
import json
import sys
import subprocess

def check_package_dependencies():
    """Verify that all required testing packages are installed"""
    required_packages = [
        'jest',
        '@testing-library/react',
        '@testing-library/jest-dom',
        '@playwright/test'
    ]
    
    with open('package.json', 'r') as f:
        package_data = json.load(f)
    
    installed = package_data.get('devDependencies', {})
    missing = []
    
    for package in required_packages:
        if package not in installed:
            missing.append(package)
    
    return missing

def check_test_files():
    """Check if test files exist in the project"""
    test_patterns = ['*.test.js', '*.test.jsx', '*.spec.js', '*.spec.jsx']
    test_files_found = []
    
    for root, dirs, files in os.walk('.'):
        # Skip node_modules and .github
        dirs[:] = [d for d in dirs if d not in ['node_modules', '.github', '.next']]
        
        for file in files:
            if any(file.endswith(pattern.replace('*', '')) for pattern in test_patterns):
                test_files_found.append(os.path.join(root, file))
    
    return test_files_found

def main():
    print("🔍 Validating Exam Testing Setup...\n")
    
    # Check dependencies
    print("📦 Checking dependencies...")
    missing = check_package_dependencies()
    if missing:
        print(f"❌ Missing packages: {', '.join(missing)}")
        print("   Run: npm install --save-dev " + " ".join(missing))
        return False
    else:
        print("✅ All required packages installed")
    
    # Check test files
    print("\n📝 Checking test files...")
    test_files = check_test_files()
    if test_files:
        print(f"✅ Found {len(test_files)} test files:")
        for f in test_files:
            print(f"   - {f}")
    else:
        print("⚠️  No test files found. Create some in your components/")
    
    # Try to run tests
    print("\n🧪 Running tests...")
    try:
        result = subprocess.run(['npm', 'test', '--', '--passWithNoTests'], 
                              capture_output=True, text=True, timeout=30)
        if result.returncode == 0:
            print("✅ Tests ran successfully")
        else:
            print("⚠️  Tests had issues (this may be expected)")
            print(result.stdout[-500:] if len(result.stdout) > 500 else result.stdout)
    except Exception as e:
        print(f"⚠️  Could not run tests: {e}")
    
    print("\n✅ Validation complete!")
    print("\n📚 Resources:")
    print("   - Jest: https://jestjs.io/")
    print("   - Testing Library: https://testing-library.com/")
    print("   - Playwright: https://playwright.dev/")
    
    return True

if __name__ == '__main__':
    success = main()
    sys.exit(0 if success else 1)

# Tech Exam GitHub Configuration

Professional GitHub Copilot customization and workflow setup for the **Tech Exam** project.

---

# 📁 Project Structure

```bash
.github/
├── copilot-instructions.md
├── prompts/
│   ├── create-api.prompt.md
│   ├── fix-bug.prompt.md
│   └── refactor.prompt.md
└── agents/
```

---

# 📖 Overview

This configuration helps maintain:

- Consistent code quality
- Better GitHub Copilot suggestions
- Standardized backend & frontend architecture
- Clean Git workflows
- Secure development practices

It provides reusable prompts, coding standards, and development guidelines for the entire ExamForge project.

---

# 🧠 Copilot Instructions

The `copilot-instructions.md` file contains the global development standards used across the project.

## Includes

### Code Quality Standards
- ESLint & Prettier compliance
- Clean and readable code
- Meaningful variable/function names
- Small reusable functions
- JSDoc comments where required

### Backend Standards
- Node.js + Express conventions
- async/await usage
- RESTful API structure
- Proper error handling
- Input validation & sanitization

### Frontend Standards
- React functional components
- Hooks-based architecture
- Component reusability
- Performance optimization
- Avoid prop drilling

### Git Standards
- Conventional commit messages
- Atomic commits
- Clean branch workflow

### Security Practices
- No hardcoded secrets
- Environment variable usage
- Dependency management
- Request validation
- Secure API handling

---

# 📝 Reusable Prompt Templates

The `prompts/` directory contains reusable templates for common development tasks.

---

## 1️⃣ create-api.prompt.md

Use this prompt when creating a new API endpoint.

### Covers
- Route creation
- Controller setup
- Validation
- Error handling
- Response structure
- Database integration

### Example Usage

```text
Create a new REST API endpoint for user registration using the ExamForge standards.
```

---

## 2️⃣ fix-bug.prompt.md

Use this prompt while debugging issues.

### Covers
- Root cause analysis
- Error tracing
- Log inspection
- Validation checks
- Regression prevention

### Example Usage

```text
Fix the login API timeout issue using the debugging workflow.
```

---

## 3️⃣ refactor.prompt.md

Use this prompt when improving existing code.

### Covers
- Code cleanup
- Performance improvements
- Readability enhancements
- Reusability
- Test safety

### Example Usage

```text
Refactor the authentication middleware for better readability and scalability.
```

---

# 🎯 Development Workflow

## When Creating APIs

1. Open `create-api.prompt.md`
2. Follow the endpoint template
3. Implement validation
4. Add proper error handling
5. Test all responses
6. Verify API standards

---

## When Fixing Bugs

1. Open `fix-bug.prompt.md`
2. Reproduce the issue
3. Identify root cause
4. Apply minimal safe fix
5. Run tests
6. Prevent regressions

---

## When Refactoring

1. Open `refactor.prompt.md`
2. Understand existing logic
3. Preserve functionality
4. Improve readability/performance
5. Run tests before & after
6. Ensure standards compliance

---

# ✅ Coding Standards

## General Standards

- Use clean architecture principles
- Keep files modular and maintainable
- Avoid duplicate code
- Write reusable utilities
- Use meaningful naming conventions

---

## Backend Standards

- Use async/await only
- Avoid callback-based logic
- Use centralized error handling
- Validate all request inputs
- Follow REST conventions
- Separate routes, controllers, and services

---

## Frontend Standards

- Use functional components
- Prefer hooks over class components
- Keep components under 300 lines
- Use memoization for expensive operations
- Avoid unnecessary re-renders
- Use reusable UI components

---

# 🧪 Testing Standards

- Write unit tests for core logic
- Validate API responses
- Test edge cases
- Ensure backward compatibility
- Run tests before merging PRs

---

# 🔒 Security Guidelines

- Never commit secrets or API keys
- Store configs in `.env`
- Validate and sanitize user input
- Prevent injection vulnerabilities
- Keep dependencies updated
- Use secure authentication flows

---

# 🧾 Git Commit Standards

## Commit Format

```bash
type: short description
```

## Allowed Types

- `feat` → New feature
- `fix` → Bug fix
- `docs` → Documentation changes
- `style` → Formatting/UI changes
- `refactor` → Code restructuring
- `test` → Testing updates

## Examples

```bash
feat: add user authentication API

fix: resolve login token expiration bug

refactor: optimize dashboard rendering
```

---

# 🚀 Recommended Workflow

```bash
1. Pull latest changes
2. Create feature branch
3. Develop using Copilot prompts
4. Run lint & tests
5. Commit using standards
6. Create pull request
```

---

# 📚 References

- GitHub Copilot Documentation
- Node.js Documentation
- React Documentation
- Express.js Documentation

---

# 🤝 Contribution Guidelines

Before contributing:

- Follow all coding standards
- Ensure tests pass
- Keep commits clean and focused
- Update documentation when required
- Review security considerations

---

# 📌 Goal

The purpose of this configuration is to ensure:

- Faster development
- Cleaner architecture
- Better Copilot assistance
- Consistent project standards
- Scalable and maintainable codebase

---

## ⭐ Tech Exam Development Philosophy

> Clean code. Secure systems. Consistent architecture. Faster development.

# GitHub Copilot Customization Files Guide

## Overview
GitHub Copilot supports several markdown file types for customization and automation. These files enable you to create agents, define prompts, document skills, and configure Copilot behavior.

---

## 1. `.agent.md` - Custom Agent Definitions

**Purpose:** Define a custom Copilot agent that can perform autonomous tasks.

**Location:** `.github/agents/` or `.github/copilot-agents/`

**Naming Convention:** `{purpose}.agent.md` (e.g., `api-builder.agent.md`)

### Structure:
```yaml
---
name: API Builder Agent
description: Helps design and implement REST API endpoints
tools: [code_generation, api_documentation]
---

# API Builder Agent

## Overview
This agent specializes in building scalable REST API endpoints.

## Capabilities
- Generate TypeScript/JavaScript API controllers
- Create database schemas
- Generate API documentation
- Setup middleware and authentication

## How to Use
Invoke with: "@api-builder build an endpoint for user management"

## Configuration
- Language: TypeScript
- Framework: Express.js
- Database: MongoDB
```

### Key Components:
- **name**: Agent display name
- **description**: What the agent does
- **tools**: Available tools/capabilities
- Content: Detailed instructions for the agent

---

## 2. `.prompt.md` - Custom Prompt Templates

**Purpose:** Define reusable prompt templates for common tasks.

**Location:** `.github/prompts/` 

**Naming Convention:** `{task}.prompt.md` (e.g., `add-unit-tests.prompt.md`)

### Structure:
```yaml
---
name: Add Unit Tests
description: Generate unit tests for existing code
context: [code, testing_framework]
tags: [testing, quality]
---

# Add Unit Tests Prompt

## Task
Generate comprehensive unit tests for the provided component.

## Instructions
1. Analyze the component's props, state, and methods
2. Create test cases for all user interactions
3. Include edge case testing
4. Ensure 80%+ code coverage
5. Use Jest and React Testing Library

## Template
```
Generate unit tests for this component:

\`\`\`jsx
[COMPONENT_CODE]
\`\`\`

Include tests for:
- Component rendering
- User interactions
- Error states
- Props validation
\`\`\`

## Output Format
- File: `{ComponentName}.test.jsx`
- Use AAA pattern (Arrange, Act, Assert)
- Include JSDoc comments
```

### Key Components:
- **name**: Prompt display name
- **description**: What the prompt does
- **context**: Required code context
- **tags**: Searchable tags
- Content: Instructions and templates

---

## 3. `SKILL.md` - Skill Documentation

**Purpose:** Document a learnable skill or knowledge area.

**Location:** `.github/skills/{skill-name}/`

**Structure Example:**
```markdown
# [Skill Name]

## Overview
Clear description of what this skill teaches.

## Topics Covered
- Topic 1
- Topic 2
- Topic 3

## Learning Objectives
- Objective 1
- Objective 2
- Objective 3

## Prerequisites
- Prerequisite 1
- Prerequisite 2

## Resources
- [Link 1](url)
- [Link 2](url)

## Quick Start
Instructions to get started.

## Validation
How to verify understanding.
```

### Directory Structure:
```
.github/skills/exam-testing/
├── SKILL.md              # Main documentation
├── scripts/
│   ├── setup.sh         # Setup script
│   └── validate.py      # Validation script
├── references/
│   └── patterns.md      # Reference documentation
├── examples/
│   └── sample.test.ts   # Example code
└── assets/              # Templates and resources
```

---

## 4. `copilot-instructions.md` - Global Copilot Configuration

**Purpose:** Set global instructions for Copilot behavior in your repository.

**Location:** Repository root or `.github/`

**Structure:**
```markdown
# Copilot Instructions

## Code Style Guidelines
- Use TypeScript for new features
- Follow ESLint configuration
- Maximum line length: 100 characters

## Naming Conventions
- Components: PascalCase
- Functions: camelCase
- Constants: UPPER_SNAKE_CASE

## Testing Requirements
- Minimum coverage: 80%
- Use Jest and React Testing Library
- Write tests before implementation

## Documentation Standards
- JSDoc for all public APIs
- README for each module
- Architecture decision records

## AI Behavior
- Focus on readability over cleverness
- Prefer explicit over implicit
- Comment complex logic
```

---

## 5. `.prompt.md` (Repository-level)

**Location:** `.github/prompts/` or `prompts/`

**File Examples:**
- `add-unit-tests.prompt.md` - Generate tests
- `create-api-endpoint.prompt.md` - Create API routes
- `migrate-asp-form.prompt.md` - Migration instructions

---

## 6. `AGENTS.md` - Agent Registry

**Purpose:** List and document all available agents.

**Location:** `.github/` or `.github/copilot/`

**Structure:**
```markdown
# Available Agents

## API Builder
- **File:** `.github/agents/api-builder.agent.md`
- **Purpose:** Design REST APIs
- **Invoke:** `@api-builder [request]`

## Test Coverage
- **File:** `.github/agents/test-coverage.agent.md`
- **Purpose:** Improve test coverage
- **Invoke:** `@test-coverage analyze [path]`

## ASP Migrator
- **File:** `.github/agents/asp-migrator.agent.md`
- **Purpose:** Migrate ASP.NET code
- **Invoke:** `@asp-migrator convert [file]`
```

---

## File Naming Conventions

| File Type | Convention | Example |
|-----------|-----------|---------|
| Agents | `{name}.agent.md` | `api-builder.agent.md` |
| Prompts | `{task}.prompt.md` | `add-unit-tests.prompt.md` |
| Skills | `SKILL.md` | In skill directory |
| Instructions | `copilot-instructions.md` | Root level |
| Registry | `AGENTS.md` | `.github/` |

---

## YAML Frontmatter Format

All customization files use YAML frontmatter:

```yaml
---
name: Display Name
description: What this does
version: 1.0
tags: [tag1, tag2]
tools: [tool1, tool2]
context: [context1, context2]
---
```

### Common Frontmatter Fields:
- **name**: Display name
- **description**: Brief description
- **version**: Semantic versioning
- **tags**: Search tags
- **tools**: Available tools
- **context**: Required code context
- **requirements**: Dependencies

---

## Best Practices

### 1. Use Clear Names
```
✅ Good: add-unit-tests.prompt.md
❌ Bad: tests.prompt.md
```

### 2. Document Thoroughly
```
✅ Good: Include examples, prerequisites, expected output
❌ Bad: Just a brief description
```

### 3. Include Examples
```yaml
## Example
Here's how to use this agent/prompt...
```

### 4. Provide Validation
```
## How to Verify
Steps to test/validate the implementation
```

### 5. Organize Files
```
.github/
├── agents/
├── prompts/
├── skills/
├── AGENTS.md
└── copilot-instructions.md
```

---

## Integration with Your Project

For the Tech Exam project, you could create:

### Agents
- `exam-generator.agent.md` - Generate exam questions
- `ui-designer.agent.md` - Design UI components
- `test-writer.agent.md` - Write tests for features

### Prompts
- `create-exam-route.prompt.md`
- `add-ai-chat-feature.prompt.md`
- `generate-api-docs.prompt.md`

### Skills
- `exam-testing/` - Already created
- `frontend-development/` - Already created
- `backend-development/`
- `performance-optimization/`

---

## References
- [GitHub Copilot Agents Documentation](https://github.com/features/copilot)
- [Customizing Copilot](https://docs.github.com/en/copilot/customizing-copilot)
- [Skill Documentation Standards](https://github.com/github/copilot-docs)

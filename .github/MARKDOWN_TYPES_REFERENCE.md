# Markdown File Types Reference - Visual Guide

## 1. .agent.md Files
**Purpose:** Define autonomous Copilot agents for specific tasks
**Location:** `.github/agents/`

### Structure:
```
---
name: Agent Display Name
description: What the agent does
version: 1.0
tools: [tool1, tool2]
tags: [tag1, tag2]
---

# Agent Name

## Overview
Description of what this agent does...

## Capabilities
- Capability 1
- Capability 2

## How to Use
@agent-name [task description]
```

### Your Example:
📄 **exam-generator.agent.md** - Generates exam questions and AI chat integration

---

## 2. .prompt.md Files
**Purpose:** Reusable prompt templates for common tasks
**Location:** `.github/prompts/`

### Structure:
```
---
name: Prompt Display Name
description: What this prompt helps with
version: 1.0
context: [context1, context2]
tags: [tag1, tag2]
---

# Prompt Name

## Task
What needs to be done...

## Instructions
Step-by-step instructions...

## Template
Code template or format...

## Success Criteria
- Criteria 1
- Criteria 2
```

### Your Examples:
📄 **create-exam-endpoint.prompt.md** - Create Express API endpoints
📄 **add-ai-chat.prompt.md** - Add AI chat to components

---

## 3. SKILL.md Files
**Purpose:** Document learnable skills and knowledge areas
**Location:** `.github/skills/{skill-name}/SKILL.md`

### Structure:
```markdown
# Skill Name

## Overview
What this skill teaches...

## Topics Covered
- Topic 1
- Topic 2

## Learning Objectives
- Objective 1
- Objective 2

## Prerequisites
- Prerequisite 1

## Resources
- [Link](url)

## Quick Start
Getting started instructions...

## Validation
How to validate understanding...
```

### Your Examples:
📄 **exam-testing/SKILL.md** - Testing best practices
📄 **frontend-development/SKILL.md** - React component patterns

---

## 4. copilot-instructions.md
**Purpose:** Global configuration for Copilot behavior
**Location:** `.github/` or repository root

### Structure:
```markdown
# Copilot Instructions

## Code Style Guidelines
- Naming conventions
- File structure
- Standards

## Project-Specific Patterns
- Common workflows
- Code examples
- Best practices

## References
- Links to resources
- Related documentation
```

### Your File:
📄 **copilot-instructions.md** - Tech Exam project standards

---

## 5. AGENTS.md
**Purpose:** Registry and documentation of all available agents
**Location:** `.github/AGENTS.md`

### Structure:
```markdown
# Available Copilot Agents

## Agent Name
- **File:** Path to agent file
- **Purpose:** What it does
- **Invoke:** @agent-name [command]

## Status
| Agent | Status | Created |
|-------|--------|---------|
```

### Your File:
📄 **AGENTS.md** - Lists all agents (Exam Generator, API Builder, etc.)

---

## File Organization Diagram

```
.github/
├── agents/
│   ├── exam-generator.agent.md       ← Custom agent
│   ├── api-builder.agent.md          ← (Planned)
│   ├── ui-designer.agent.md          ← (Planned)
│   └── test-writer.agent.md          ← (Planned)
│
├── prompts/
│   ├── create-exam-endpoint.prompt.md   ← Task template
│   ├── add-ai-chat.prompt.md            ← Task template
│   ├── add-unit-tests.prompt.md         ← (Example)
│   └── migrate-asp-form.prompt.md       ← (Example)
│
├── skills/
│   ├── exam-testing/
│   │   ├── SKILL.md                  ← Skill docs
│   │   ├── scripts/
│   │   │   ├── setup.sh
│   │   │   └── validate.py
│   │   ├── references/
│   │   │   └── test-patterns.md
│   │   ├── examples/
│   │   │   └── exam.test.ts
│   │   └── assets/
│   │
│   └── frontend-development/
│       ├── SKILL.md
│       ├── scripts/
│       ├── references/
│       ├── examples/
│       └── assets/
│
├── AGENTS.md                         ← Agent registry
├── copilot-instructions.md           ← Global config
└── FILE_TYPES_GUIDE.md              ← This file!
```

---

## Quick Reference Table

| File Type | Purpose | Location | Example |
|-----------|---------|----------|---------|
| `.agent.md` | Autonomous task agents | `.github/agents/` | exam-generator.agent.md |
| `.prompt.md` | Reusable prompts | `.github/prompts/` | create-exam-endpoint.prompt.md |
| `SKILL.md` | Learning documentation | `.github/skills/{name}/` | SKILL.md |
| `copilot-instructions.md` | Global config | `.github/` | copilot-instructions.md |
| `AGENTS.md` | Agent registry | `.github/` | AGENTS.md |

---

## Usage Examples

### Using an Agent
```
User: @exam-generator create 20 questions about React

Copilot: I'll use the exam-generator agent to...
- Load exam-generator.agent.md configuration
- Read implementation details
- Generate questions with explanations
```

### Using a Prompt
```
User: I need to create a new API endpoint

Copilot: I'll use the create-exam-endpoint.prompt.md template to...
- Follow validation patterns
- Structure request/response
- Add error handling
```

### Learning a Skill
```
User: I want to learn frontend development

Copilot: I'll reference .github/skills/frontend-development/ to...
- Show component patterns
- Run validation script
- Provide examples
```

---

## YAML Frontmatter Reference

All `.md` files use YAML frontmatter (top section between `---`):

```yaml
---
name: Display Name              # Required: shown in UI
description: What it does       # Required: brief description
version: 1.0                    # Semantic versioning
tags: [tag1, tag2]             # Search/category tags
tools: [tool1, tool2]          # For agents: available tools
context: [ctx1, ctx2]          # For prompts: required context
---
```

---

## Your Project Structure Summary

✅ **Agents Created:**
- `exam-generator.agent.md` - Main agent for exam features

✅ **Prompts Created:**
- `create-exam-endpoint.prompt.md` - API endpoint template
- `add-ai-chat.prompt.md` - AI chat integration template

✅ **Skills Created:**
- `exam-testing/` - Complete with scripts, references, examples
- `frontend-development/` - Complete with scripts, references, examples

✅ **Configuration Files:**
- `copilot-instructions.md` - Tech Exam project standards
- `AGENTS.md` - Agent registry and documentation
- `FILE_TYPES_GUIDE.md` - This comprehensive guide

---

## How Copilot Uses These Files

1. **Agent Invocation**
   ```
   @exam-generator [task]
   → Reads exam-generator.agent.md
   → Follows specified capabilities
   → Uses project patterns from copilot-instructions.md
   ```

2. **Prompt Selection**
   ```
   User: create an exam endpoint
   → Copilot finds create-exam-endpoint.prompt.md
   → Uses template structure
   → Fills in project-specific details
   ```

3. **Skill Verification**
   ```
   User: validate my test setup
   → Runs .github/skills/exam-testing/scripts/validate.py
   → Checks against SKILL.md requirements
   → Provides feedback
   ```

4. **Global Standards**
   ```
   Every response
   → References copilot-instructions.md
   → Follows naming conventions
   → Uses specified patterns and best practices
   ```

---

## Next Steps

### Create More Agents
```
1. api-builder.agent.md
2. ui-designer.agent.md
3. test-writer.agent.md
4. documentation.agent.md
```

### Create More Prompts
```
1. setup-backend.prompt.md
2. generate-api-docs.prompt.md
3. optimize-performance.prompt.md
```

### Create More Skills
```
1. backend-development/SKILL.md
2. performance-optimization/SKILL.md
3. deployment/SKILL.md
```

---

## Key Benefits

✨ **Consistency:** All code follows same patterns
🎯 **Automation:** Agents handle repetitive tasks
📚 **Learning:** Skills document best practices
🚀 **Productivity:** Prompts speed up development
🔄 **Scalability:** Easy to add new agents/skills

---

## Resources

- **Official Docs:** https://github.com/features/copilot
- **Customization:** https://docs.github.com/en/copilot/customizing-copilot
- **YAML Syntax:** https://yaml.org/spec/1.2/spec.html
- **Markdown Guide:** https://www.markdownguide.org/

---

**Last Updated:** May 12, 2026
**Project:** Tech Exam Platform

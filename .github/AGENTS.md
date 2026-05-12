# Available Copilot Agents

This document lists all custom Copilot agents available for the Tech Exam project.

## Agents Registry

### 1. Exam Generator Agent
**File:** `.github/agents/exam-generator.agent.md`

**Purpose:** Autonomously generate exam questions, manage exam workflows, and integrate AI chat

**Capabilities:**
- Generate multiple choice questions with explanations
- Create complete exam flows
- Setup exam endpoints and routes
- Integrate AI chat assistant
- Generate result analytics components

**How to Invoke:**
```
@exam-generator create 20 multiple choice questions about React fundamentals
@exam-generator add exam endpoint that accepts questions and returns scores
@exam-generator integrate AI chat assistant into exam results page
```

**Tech Stack:** Express.js, React, Groq API, Tailwind CSS

**Best For:**
- Creating new exam features
- Generating question content
- Setting up exam workflows
- Integrating AI assistance

---

## 2. API Builder Agent
**File:** `.github/agents/api-builder.agent.md` *(Coming Soon)*

**Purpose:** Design and implement REST API endpoints with validation and documentation

**Capabilities:**
- Create Express route handlers
- Setup request validation
- Generate error handling
- Add API documentation
- Create test fixtures

**How to Invoke:**
```
@api-builder create endpoint for user authentication
@api-builder add validation for exam submission
@api-builder setup pagination for exam history
```

---

## 3. UI Designer Agent
**File:** `.github/agents/ui-designer.agent.md` *(Coming Soon)*

**Purpose:** Design and implement React components with Tailwind CSS

**Capabilities:**
- Create responsive layouts
- Setup component hierarchy
- Add animations with Framer Motion
- Ensure accessibility
- Implement dark mode

**How to Invoke:**
```
@ui-designer create dashboard component for exam analytics
@ui-designer build form component with validation feedback
@ui-designer design mobile-responsive navbar
```

---

## 4. Test Writer Agent
**File:** `.github/agents/test-writer.agent.md` *(Coming Soon)*

**Purpose:** Generate comprehensive test suites for components and functions

**Capabilities:**
- Create unit tests with Jest
- Write component tests with React Testing Library
- Generate E2E tests with Playwright
- Setup test fixtures and mocks
- Measure code coverage

**How to Invoke:**
```
@test-writer add unit tests for ExamTakingPage component
@test-writer create integration tests for exam submission flow
@test-writer generate E2E tests for complete exam journey
```

---

## 5. Documentation Agent
**File:** `.github/agents/documentation.agent.md` *(Coming Soon)*

**Purpose:** Generate and maintain project documentation

**Capabilities:**
- Create API documentation
- Write component storybooks
- Generate README files
- Create architecture diagrams
- Maintain changelog

**How to Invoke:**
```
@documentation create API reference for exam endpoints
@documentation write README for exam components
@documentation generate architecture diagram
```

---

## How to Use Agents

### Basic Syntax
```
@agent-name [task or question]
```

### Examples
```
@exam-generator create questions about JavaScript
@api-builder add user profile endpoint
@ui-designer build results dashboard
@test-writer write tests for AiChatAssistant
@documentation create API docs
```

### Getting Help
```
@exam-generator help
@exam-generator show examples
```

---

## Creating New Agents

To create a new agent:

1. **Create Agent File**
   - Location: `.github/agents/{name}.agent.md`
   - Include YAML frontmatter with metadata
   - Add detailed description and capabilities

2. **Define Capabilities**
   - List what the agent can do
   - Include code examples
   - Specify technology stack

3. **Provide Examples**
   - Show how to invoke the agent
   - Include expected outputs
   - Link to related prompts

4. **Document Patterns**
   - Explain code patterns used
   - Reference project standards
   - Link to copilot-instructions.md

5. **Register in AGENTS.md**
   - Add entry to this file
   - Include invocation examples
   - Mark completion status

---

## Agent Status

| Agent | Status | Created | Last Updated |
|-------|--------|---------|--------------|
| Exam Generator | ✅ Complete | May 2026 | May 2026 |
| API Builder | 🔄 Planned | - | - |
| UI Designer | 🔄 Planned | - | - |
| Test Writer | 🔄 Planned | - | - |
| Documentation | 🔄 Planned | - | - |

---

## Combining Multiple Agents

Use multiple agents for complex tasks:

```
Step 1: @api-builder create exam submission endpoint
Step 2: @test-writer add tests for submission endpoint
Step 3: @documentation create API reference
Step 4: @ui-designer add results component
```

---

## Agent Limitations

- Agents generate code suggestions (review required)
- Follow copilot-instructions.md for consistency
- Test all generated code before merging
- Ensure security validations are in place
- Verify API integrations with actual endpoints

---

## Related Documentation

- **Code Guidelines:** [copilot-instructions.md](./copilot-instructions.md)
- **Prompts Library:** [Prompts Directory](./prompts/)
- **Skills & Learning:** [Skills Directory](./skills/)
- **File Types Guide:** [FILE_TYPES_GUIDE.md](./FILE_TYPES_GUIDE.md)

---

## Contributing

To add a new agent or update existing ones:

1. Create agent file in `.github/agents/`
2. Update this AGENTS.md registry
3. Add examples and documentation
4. Test agent with sample inputs
5. Submit for review

---

**Last Updated:** May 2026
**Project:** Tech Exam Platform

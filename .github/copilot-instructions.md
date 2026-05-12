---
name: Tech Exam Copilot Instructions
version: 1.0
description: Global Copilot configuration for the Tech Exam project
---

# Copilot Instructions for Tech Exam

## Project Overview
Tech Exam is a full-stack exam platform with React frontend, Express.js backend, AI-powered chat assistant, and analytics dashboard.

## Code Style Guidelines

### JavaScript/TypeScript
- Use ES6+ syntax (arrow functions, destructuring, template literals)
- Use `const` by default, `let` when reassignment needed
- Avoid `var`
- Maximum line length: 100 characters
- Use semicolons

### React Components
- Use functional components with hooks
- File naming: `PascalCase.jsx` for components
- Hook naming: `use{Name}.js` for custom hooks
- Props destructuring pattern:
  ```javascript
  const Component = ({ prop1, prop2 = default }) => { ... }
  ```

### Backend (Express)
- Route naming: `/api/{resource}/{action}`
- Controller naming: `{resource}Controller.js`
- Service naming: `{resource}Service.js`
- Response format: `{ success: bool, data: {...}, error?: string }`

## Naming Conventions

### Variables & Functions
- camelCase for variables, functions, methods
- UPPER_SNAKE_CASE for constants
- PascalCase for classes, components
- Prefix private methods with `_`

### File Structure
```
Components: PascalCase.jsx (e.g., ExamTakingPage.jsx)
Hooks: use{Name}.js (e.g., useAiChat.js)
Services: {name}Service.js (e.g., examService.js)
Controllers: {name}.js in controllers/ (e.g., exam.js)
Routes: {name}.js in routes/ (e.g., exam.js)
Utils: {name}.js in utils/ (e.g., formatters.js)
```

## Testing Requirements

### Coverage Targets
- Minimum coverage: 80%
- All critical paths tested
- Edge cases documented

### Testing Framework
- Frontend: Jest + React Testing Library
- Backend: Jest with supertest
- E2E: Playwright

### Test File Naming
- React components: `{Component}.test.jsx`
- Functions: `{function}.test.js`
- API routes: `{route}.test.js`

### Testing Patterns
Use Arrange-Act-Assert:
```javascript
describe('Component', () => {
  it('should do something', () => {
    // Arrange
    const props = { ... };
    
    // Act
    render(<Component {...props} />);
    
    // Assert
    expect(...).toBe(...);
  });
});
```

## Documentation Standards

### JSDoc for Public APIs
```javascript
/**
 * Formats time display
 * @param {number} seconds - Time in seconds
 * @returns {string} Formatted time like "5m 30s"
 */
export const formatTime = (seconds) => { ... }
```

### Component Documentation
```javascript
/**
 * Exam taking interface with question navigation
 * @component
 * @example
 * return <ExamTakingPage />
 */
export const ExamTakingPage = () => { ... }
```

### README Requirements
- Each module should have a README.md
- Include: Purpose, usage, examples, API
- Link to documentation

## API Response Standards

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "timestamp": "2026-05-12T10:30:00Z"
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE",
  "timestamp": "2026-05-12T10:30:00Z"
}
```

## Styling Requirements

### Tailwind CSS
- Use utility classes over custom CSS
- Responsive: mobile-first approach
- Dark mode support: use `dark:` prefix
- Color palette: Defined in tailwind.config.js

### Component Structure
```jsx
<div className="flex items-center gap-4 p-4 rounded-lg bg-white dark:bg-slate-800">
  <Icon className="w-6 h-6" />
  <span className="text-sm font-semibold">Content</span>
</div>
```

## State Management

### React Context
- Use for global state (theme, auth)
- Create in separate hook files
- Export hook, not context directly

### Component State
- Local state with `useState` for UI state
- Use `useCallback` for event handlers
- Use `useEffect` for side effects
- Proper cleanup in useEffect return

## Performance Guidelines

### Frontend
- Code split routes with React.lazy()
- Memoize expensive computations
- Use useCallback for stable references
- Lazy load images
- Avoid inline objects/functions in JSX

### Backend
- Index database queries
- Cache frequently accessed data
- Use pagination for large datasets
- Implement request rate limiting

## Error Handling

### Frontend
```javascript
try {
  const result = await apiClient.call();
} catch (error) {
  console.error('Operation failed:', error);
  showNotification({ type: 'error', message: error.message });
}
```

### Backend
```javascript
try {
  // Operation
} catch (error) {
  console.error('Error context:', error);
  res.status(500).json({ 
    success: false, 
    error: 'User-friendly message',
    code: 'ERROR_CODE'
  });
}
```

## Commit Message Format
```
type(scope): description

[optional body]
[optional footer]
```

Types: feat, fix, docs, style, refactor, test, chore

Examples:
- `feat(exam): add AI chat assistant integration`
- `fix(results): correct time display for short exams`
- `docs(api): update endpoint documentation`

## Directory Structure Guidelines

### Backend
```
src/
├── app.js           # Express app setup
├── index.js         # Server entry
├── config/          # Configuration
├── controllers/     # Request handlers
├── routes/          # Route definitions
├── services/        # Business logic
├── middleware/      # Custom middleware
└── data/            # Data storage
```

### Frontend
```
src/
├── pages/           # Full page components
├── components/      # Reusable components
├── hooks/           # Custom hooks
├── services/        # API clients
├── store/           # State management
├── utils/           # Utility functions
├── config/          # Configuration
└── styles/          # Global styles
```

## Environment Variables

### Backend (.env)
```
PORT=3003
NODE_ENV=development
GROQ_API_KEY=your_key_here
DATABASE_URL=mongodb://...
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:3003
VITE_APP_ENV=development
```

## AI Integration Standards

### Groq API
- Model: llama-3.1-8b-instant
- Response format: Structured text with bullet points
- Max tokens: 2000 for exam context
- Temperature: 0.7 for educational responses

### Prompt Engineering
- System prompt: Set educational context
- User message: Clear, specific questions
- Temperature: Lower for factual, higher for creative

## When to Seek Clarification
- Ambiguous requirements
- Design decisions affecting multiple components
- Performance implications
- Security concerns

## Project-Specific Patterns

### Exam Data Flow
1. User selects topics → ExamSetupPage
2. Questions loaded → ExamTakingPage
3. User answers questions
4. Submit → Calculate score → Navigate to results
5. Results displayed → ModernResultsPage with AI chat

### AI Chat Integration
- Endpoint: POST /api/ai-chat
- Input: { question, context, userMessage }
- Output: { response, messageId, timestamp }
- Uses Groq API with llama model

### Data Persistence
- Primary: localStorage (exam history)
- Temporary: sessionStorage (current exam)
- Navigation bridge: window.__completeExamResult

## References & Resources
- [Frontend Components Guide](./.github/skills/frontend-development/)
- [Testing Patterns Guide](./.github/skills/exam-testing/)
- [Available Agents](./.github/AGENTS.md)
- [Project README](./README.md)

## Getting Help
- Review existing code patterns in `src/`
- Check `.github/prompts/` for task templates
- Use agents in `.github/agents/` for complex tasks
- Refer to skill documentation in `.github/skills/`

# Test Patterns for ExamForge

## Component Testing Pattern

```javascript
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ExamTakingPage } from './ExamTakingPage';

describe('ExamTakingPage', () => {
  it('should render exam questions', () => {
    render(<ExamTakingPage />);
    expect(screen.getByRole('heading', { name: /exam/i })).toBeInTheDocument();
  });

  it('should allow user to select an answer', async () => {
    const user = userEvent.setup();
    render(<ExamTakingPage />);
    
    const option = screen.getByRole('radio', { name: /option a/i });
    await user.click(option);
    
    expect(option).toBeChecked();
  });
});
```

## API Testing Pattern

```javascript
import { apiClient } from './services/apiClient';
import axios from 'axios';

jest.mock('axios');

describe('apiClient', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch exam data', async () => {
    const mockData = { id: 1, questions: [] };
    axios.get.mockResolvedValueOnce({ data: mockData });
    
    const result = await apiClient.getExam(1);
    expect(result).toEqual(mockData);
  });
});
```

## E2E Testing Pattern (Playwright)

```javascript
import { test, expect } from '@playwright/test';

test.describe('Exam Flow', () => {
  test('should complete an exam', async ({ page }) => {
    await page.goto('http://localhost:3000/exam/setup');
    
    // Select topics
    await page.click('button:has-text("Start Exam")');
    
    // Answer questions
    await page.click('input[value="option-a"]');
    
    // Submit
    await page.click('button:has-text("Submit")');
    
    // Check results
    await expect(page).toHaveURL('/exam/results');
  });
});
```

## Mocking Patterns

### Mock API Responses
```javascript
const mockExamResult = {
  score: 85,
  correct: 17,
  totalQuestions: 20,
  breakdown: [
    { question: 'Q1', userAnswer: 'a', correct: true }
  ]
};
```

### Mock Components
```javascript
jest.mock('./components/AiChatAssistant', () => ({
  AiChatAssistant: () => <div>AI Chat Mock</div>
}));
```

## Best Practices

1. **Arrange-Act-Assert Pattern**: Structure tests clearly
2. **Descriptive Names**: Use clear test descriptions
3. **Isolation**: Mock external dependencies
4. **Coverage**: Aim for 80%+ code coverage
5. **Performance**: Keep tests fast (<100ms each)
6. **Maintenance**: Update tests when features change

## Coverage Analysis

Run coverage reports:
```bash
npm test -- --coverage
```

Target coverage:
- Statements: 80%+
- Branches: 75%+
- Functions: 80%+
- Lines: 80%+

---
name: Exam Generator Agent
description: Autonomously generates exam questions with explanations and AI chat integration
version: 1.0
tools: [code_generation, documentation, api_integration]
tags: [exam, automation, education]
---

# Exam Generator Agent

## Overview
This agent specializes in automatically generating exam questions, managing exam data, and integrating AI chat functionality for interactive learning.

## Capabilities
- Generate multiple choice questions with explanations
- Create exam papers from question banks
- Setup exam endpoints and routes
- Integrate AI chat assistant
- Generate result analytics components
- Create mock questions for testing

## How to Use

### Generate Questions
```
@exam-generator create 20 multiple choice questions about React fundamentals
```

### Create Exam Route
```
@exam-generator add exam endpoint that accepts questions and returns scores
```

### Setup AI Chat
```
@exam-generator integrate AI chat assistant into exam results page
```

## Implementation Details

### Technology Stack
- **Framework:** Express.js (backend), React (frontend)
- **AI Service:** Groq API with Llama 3.1
- **Database:** JSON (examHistory.json)
- **Styling:** Tailwind CSS

### Key Files to Modify
- Backend: `src/services/mockQuestions.js`
- Backend: `src/controllers/exam.js`
- Frontend: `src/pages/ExamTakingPage.jsx`
- Frontend: `src/components/exam/AiChatAssistant.jsx`

### Code Generation Pattern
```javascript
// Question object structure
{
  id: string,
  question: string,
  options: string[],
  correct: string,
  explanation: string,
  topic: string,
  difficulty: 'easy' | 'medium' | 'hard',
  estimatedTime: number
}
```

### API Endpoint Pattern
```
POST /api/exam/submit
- Request: { answers: [], timeSpent: number }
- Response: { score: number, breakdown: [...], topicScores: [...] }
```

## Validation Checklist
- [ ] Questions have clear explanations
- [ ] AI chat properly integrated
- [ ] Results page displays analytics
- [ ] All routes working end-to-end
- [ ] Error handling implemented
- [ ] Tests passing for new features

## Configuration
```json
{
  "questionTypes": ["multiple-choice", "true-false", "short-answer"],
  "maxQuestionsPerExam": 50,
  "estimatedDuration": 120,
  "aiModel": "llama-3.1-8b-instant"
}
```

## Success Criteria
- Generated questions meet difficulty requirements
- AI chat provides accurate explanations
- Exam flows from setup → taking → results smoothly
- Performance metrics display correctly

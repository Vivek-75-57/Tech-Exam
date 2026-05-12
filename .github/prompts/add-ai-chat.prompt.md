---
name: Add AI Chat Feature
description: Integrate AI chat assistant into existing page or component
version: 1.0
context: [react_component, api_integration, groq_api]
tags: [ai, chat, feature, integration]
---

# Add AI Chat Feature Prompt

## Task
Integrate an AI-powered chat assistant into an existing React component or page using Groq API integration.

## Prerequisites
- React component file ready for integration
- Groq API key configured in backend
- useAiChat custom hook available
- AiChatAssistant component available
- Backend endpoint `/api/ai-chat` setup

## Step-by-Step Instructions

### 1. Import Required Dependencies
```jsx
import { useAiChat } from '../hooks/useAiChat';
import { AiChatAssistant } from '../components/AiChatAssistant';
```

### 2. Initialize AI Chat Hook
```jsx
const { messages, sendMessage, loading, error, clearMessages } = useAiChat();
```

### 3. Define Context for AI
```jsx
const aiContext = {
  examTopic: examData.topic,
  difficulty: examData.difficulty,
  userProgress: userData.progressPercentage
};
```

### 4. Add Chat Component
```jsx
<AiChatAssistant
  messages={messages}
  onSendMessage={sendMessage}
  loading={loading}
  error={error}
  context={aiContext}
  title="Ask AI for Help"
/>
```

### 5. Handle AI Responses
```jsx
const handleAiResponse = (response) => {
  // Process AI response
  // Update component state if needed
  // Log for analytics
  console.log('AI Response:', response);
};
```

## Implementation Template

```jsx
import React, { useState } from 'react';
import { useAiChat } from '../hooks/useAiChat';
import { AiChatAssistant } from '../components/exam/AiChatAssistant';

export const YourComponent = ({ data }) => {
  const [showChat, setShowChat] = useState(false);
  const { messages, sendMessage, loading, error } = useAiChat();

  const aiContext = {
    topic: data.topic,
    difficulty: data.difficulty,
    userAnswer: data.userAnswer,
    correctAnswer: data.correctAnswer
  };

  return (
    <div className="component-container">
      {/* Main content */}
      <div className="main-content">
        {/* Your existing content here */}
      </div>

      {/* AI Chat Section */}
      {showChat && (
        <div className="chat-section">
          <AiChatAssistant
            messages={messages}
            onSendMessage={sendMessage}
            loading={loading}
            error={error}
            context={aiContext}
            title="AI Assistant"
          />
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setShowChat(!showChat)}
        className="toggle-chat-btn"
      >
        {showChat ? 'Hide' : 'Show'} AI Chat
      </button>
    </div>
  );
};
```

## Component Locations

### Available Chat Components
1. **Exam Version:** `src/components/exam/AiChatAssistant.jsx`
   - Designed for exam questions
   - Shows explanations
   - Suggests related topics

2. **Results Version:** `src/components/results/AiChatAssistant.jsx`
   - Designed for post-exam review
   - Shows performance insights
   - Suggests improvement areas

### Choose the Right Component
```jsx
// For exam page
import { AiChatAssistant } from '../exam/AiChatAssistant';

// For results page
import { AiChatAssistant } from '../results/AiChatAssistant';
```

## Backend Integration

### API Endpoint
```
POST /api/ai-chat
Request:
{
  "question": "What is React?",
  "userMessage": "I don't understand JSX",
  "context": {
    "topic": "React",
    "difficulty": "beginner"
  }
}

Response:
{
  "success": true,
  "response": "JSX is...\n• Point 1\n• Point 2",
  "messageId": "msg_123",
  "timestamp": "2026-05-12T10:30:00Z"
}
```

### useAiChat Hook
```jsx
// Hook handles:
// - Message state management
// - API communication
// - Error handling
// - Loading states
// - Message formatting

const { 
  messages,        // Array of messages
  sendMessage,     // Function to send message
  loading,         // Loading state
  error,          // Error message
  clearMessages   // Clear chat history
} = useAiChat();
```

## Styling Classes

### Chat Container
```jsx
className="flex flex-col max-w-2xl gap-4 p-4 rounded-lg bg-white dark:bg-gray-800"
```

### Message Bubble
```jsx
// AI message
className="self-start max-w-md bg-gray-100 dark:bg-gray-700 p-4 rounded-lg"

// User message
className="self-end max-w-md bg-blue-500 text-white p-4 rounded-lg"
```

### Input Area
```jsx
className="flex gap-2 items-center mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
```

## Features to Include

- ✅ Send message button with Enter key support
- ✅ Loading indicator with animated dots
- ✅ Error messages with retry option
- ✅ Message timestamps
- ✅ Clear chat history option
- ✅ Suggested questions for empty state
- ✅ Scrollable message area
- ✅ Dark mode support
- ✅ Mobile responsive design
- ✅ Accessibility labels (aria-*)

## Example Implementation

### In ExamTakingPage
```jsx
const [showAiChat, setShowAiChat] = useState(false);

return (
  <>
    {showAiChat && (
      <AiChatAssistant
        messages={messages}
        onSendMessage={sendMessage}
        loading={loading}
        context={{
          question: currentQuestion.text,
          topic: currentQuestion.topic
        }}
      />
    )}
    <button onClick={() => setShowAiChat(!showAiChat)}>
      {showAiChat ? 'Hide' : 'Show'} AI Help
    </button>
  </>
);
```

### In ResultsPage
```jsx
return (
  <div className="results-page">
    <ResultsContent data={examResults} />
    <AiChatAssistant
      messages={messages}
      onSendMessage={sendMessage}
      loading={loading}
      context={{
        score: examResults.score,
        weakAreas: examResults.weakAreas
      }}
    />
  </div>
);
```

## Testing Checklist

- [ ] Messages display correctly
- [ ] API calls succeed and return data
- [ ] Loading state shows during request
- [ ] Error messages display on failure
- [ ] Clear button removes all messages
- [ ] Suggested questions appear for new chat
- [ ] Mobile layout responsive
- [ ] Dark mode styling works
- [ ] Keyboard navigation functional
- [ ] Screen reader compatible

## Success Criteria

✅ AI chat displays properly
✅ Messages send and receive correctly
✅ Error handling works
✅ Loading states visible
✅ Styling matches design system
✅ All tests passing
✅ Documentation updated
✅ Performance acceptable (<100ms response)

## Troubleshooting

### Chat Not Appearing
- Verify import path correct
- Check component rendering condition
- Verify useAiChat hook initialized

### Messages Not Sending
- Check API endpoint URL
- Verify Groq API key configured
- Check network in DevTools

### Styling Issues
- Ensure Tailwind CSS configured
- Check dark mode classes
- Verify color contrast

## Related Prompts
- [Create Exam API Endpoint](./create-exam-endpoint.prompt.md)
- [Setup Backend Integration](./setup-backend.prompt.md)
- [Add Unit Tests](./add-unit-tests.prompt.md)

## References
- [AI Chat Component Guide](./../skills/frontend-development/)
- [Groq API Documentation](https://console.groq.com/docs/speech-text)
- [useAiChat Hook](../../src/hooks/useAiChat.js)

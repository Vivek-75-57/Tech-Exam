---
name: Create Exam API Endpoint
description: Generate a new exam API endpoint with validation, error handling, and documentation
version: 1.0
context: [existing_api_structure, database_schema, authentication]
tags: [api, backend, express, exam]
---

# Create Exam API Endpoint Prompt

## Task
Generate a new Express.js API endpoint for exam operations with proper validation, error handling, documentation, and integration.

## Prerequisites
- Express.js backend running on port 3003
- Request validation patterns in place
- API client setup in frontend
- Error handling middleware configured

## Instructions
1. **Define Endpoint**
   - Method: GET/POST/PUT/DELETE as appropriate
   - Path: `/api/exam/{resource}`
   - Authentication required: Yes/No

2. **Validation**
   - Validate all incoming parameters
   - Check user authorization
   - Sanitize inputs

3. **Error Handling**
   - Return appropriate HTTP status codes
   - Include error messages
   - Log errors for debugging

4. **Response Format**
   - Follow existing pattern: `{ success: bool, data: {...}, error?: string }`
   - Include timestamps
   - Add metadata if needed

5. **Documentation**
   - JSDoc comments
   - Request/response examples
   - Error scenarios

6. **Testing**
   - Add unit tests
   - Include integration tests
   - Document test cases

## Template

```javascript
/**
 * [OPERATION] exam
 * @route [METHOD] /api/exam/[endpoint]
 * @param {Object} req - Express request
 * @param {Object} res - Express response
 * @returns {Object} { success, data/error }
 */
router.[method]('/exam/[endpoint]', async (req, res) => {
  try {
    // Validation
    const { /* params */ } = req.body;
    if (!/* required field */) {
      return res.status(400).json({ success: false, error: 'Missing required field' });
    }

    // Authorization (if needed)
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ success: false, error: 'Unauthorized' });
    }

    // Process request
    const result = await /* service call */;

    // Success response
    res.status(200).json({
      success: true,
      data: result,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error in [endpoint]:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error.message
    });
  }
});
```

## Common Exam Endpoints

### 1. Get Exam
```
GET /api/exam/:id
Response: { success, data: { id, title, questions, timeLimit } }
```

### 2. Submit Exam
```
POST /api/exam/submit
Body: { examId, answers, timeSpent }
Response: { success, data: { score, breakdown, topicScores } }
```

### 3. Get Exam History
```
GET /api/exam/history
Response: { success, data: [{id, date, score, duration}, ...] }
```

### 4. Create Exam
```
POST /api/exam/create
Body: { title, questions, timeLimit }
Response: { success, data: { examId } }
```

## Integration Checklist
- [ ] Endpoint defined in routes file
- [ ] Validation middleware applied
- [ ] Error handling implemented
- [ ] Database operations complete
- [ ] Response format consistent
- [ ] JSDoc comments added
- [ ] Frontend API client updated
- [ ] Tests written
- [ ] Documentation updated

## Frontend Integration
```javascript
// In frontend apiClient.js
export const getExam = (id) => 
  apiClient.get(`/api/exam/${id}`);

export const submitExam = (payload) => 
  apiClient.post('/api/exam/submit', payload);
```

## Example Use Cases
1. Retrieving exam questions
2. Recording exam submissions
3. Calculating scores
4. Storing exam history
5. Generating analytics

## Validation Examples
```javascript
// Email validation
if (!email.includes('@')) return error;

// Time range validation
if (timeSpent > maxTime) return error;

// Score validation
if (score < 0 || score > 100) return error;
```

## Success Criteria
- Endpoint returns correct data structure
- Error cases handled appropriately
- Performance meets requirements (<100ms)
- Tests passing with high coverage
- Frontend successfully calls endpoint
- Documentation complete

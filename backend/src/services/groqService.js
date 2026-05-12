import Groq from "groq-sdk";
import { config } from "../config/index.js";
import { generateMockQuestions } from "./mockQuestions.js";

/**
 * GroqService - Provides AI-powered exam generation and analysis using Groq API
 * Uses Llama models for cost-effective and high-performance question generation
 * Features: Question generation, explanations, deep-dive analysis, skill gap analysis
 */
class GroqService {
  /**
   * Initialize Groq client with API key from environment
   */
  constructor() {
    if (!config.demoMode && config.groqApiKey) {
      this.client = new Groq({ apiKey: config.groqApiKey });
      console.log("✅ Groq client initialized successfully");
    } else {
      console.log(
        "⚠️  Groq API key not configured. Running in DEMO_MODE with mock questions"
      );
    }
  }

  /**
   * Get experience level and description based on years of experience
   * Used to benchmark difficulty and content appropriateness
   * @param {number} years - Years of professional experience
   * @returns {Object} Experience level details
   */
  getExperienceLevel(years) {
    if (years <= 1) return { label: "Junior", description: "0-1 years" };
    if (years <= 3) return { label: "Mid-Level", description: "2-3 years" };
    if (years <= 6) return { label: "Senior", description: "4-6 years" };
    if (years <= 10) return { label: "Staff/Principal", description: "7-10 years" };
    return { label: "Distinguished/Fellow", description: "10+ years" };
  }

  /**
   * Get difficulty guidance based on experience level
   * Ensures questions are appropriate for candidate skill level
   * @param {number} years - Years of professional experience
   * @returns {string} Difficulty guidance for prompt
   */
  getDifficultyGuidance(years) {
    if (years <= 1)
      return "Focus on fundamental concepts, basic syntax, simple algorithms, and introductory patterns. Avoid trick questions. Include questions about basic data structures and simple problem-solving.";
    if (years <= 3)
      return "Include intermediate concepts: design patterns, common algorithms, debugging techniques, and standard library usage. Test knowledge of best practices and common pitfalls.";
    if (years <= 6)
      return "Cover advanced topics: system design, performance optimization, complex algorithms, architectural trade-offs, and scalability considerations.";
    if (years <= 10)
      return "Expert-level: distributed systems, advanced architecture, scalability, cross-team technical leadership decisions, and enterprise-scale problem solving.";
    return "Cutting-edge: industry trends, emerging paradigms, strategic architectural decisions, cross-org technical influence, and thought leadership topics.";
  }

  /**
   * Build optimized prompt for Groq Llama model
   * Structured for maximum accuracy and JSON compliance
   * @param {Array} topics - Topics to generate questions for
   * @param {number} years - Years of experience
   * @param {number} numQuestions - Number of questions needed
   * @returns {string} Structured prompt for Groq API
   */
  buildPrompt(topics, years, numQuestions) {
    const level = this.getExperienceLevel(years);
    const guidance = this.getDifficultyGuidance(years);
    const topicsStr = topics.join(", ");

    return `You are a senior technical interviewer with 20+ years of experience. Generate exactly ${numQuestions} high-quality MCQ exam questions.

CANDIDATE PROFILE:
- Professional Experience: ${years} years (${level.label} — ${level.description})
- Topics: ${topicsStr}
- Expected Difficulty: ${guidance}

REQUIREMENTS:
1. Generate EXACTLY ${numQuestions} questions (no more, no less)
2. Distribute questions evenly across all topics
3. Each question must have exactly 4 options (A, B, C, D)
4. Distractors must be plausible and educational, not obviously wrong
5. Explanations must be concise (2-3 sentences), educational, and explain why wrong answers are wrong
6. No repeated concepts across questions
7. Vary difficulty within the experience level
8. Include real-world applicability where relevant

CRITICAL: Return ONLY valid JSON array — no markdown, no code fences, no preamble, no trailing text.

Expected JSON structure (MUST follow exactly):
[
  {
    "id": 1,
    "question": "Question text here?",
    "code_snippet": null,
    "options": [
      {"id": "A", "text": "First option"},
      {"id": "B", "text": "Second option"},
      {"id": "C", "text": "Third option"},
      {"id": "D", "text": "Fourth option"}
    ],
    "correct_answer": "B",
    "explanation": "B is correct because [2-3 sentences]. A is wrong because [brief reason]. C is wrong because [brief reason]. D is wrong because [brief reason].",
    "difficulty": "Intermediate",
    "topic": "${topics[0]}",
    "tags": ["keyword1", "keyword2"]
  }
]

IMPORTANT NOTES:
- Use code_snippet field (null or string) for code-related questions
- difficulty must be one of: "Beginner", "Intermediate", "Advanced", "Expert"
- All explanations must be concise and educational
- Ensure question quality and accuracy for professional interviews
- Verify all options are distinct and meaningful`;
  }

  /**
   * Generate MCQ questions using Groq API
   * Falls back to mock questions in demo mode
   * @param {Array} topics - Topics to generate questions about
   * @param {number} experience - Years of professional experience
   * @param {number} count - Number of questions to generate
   * @returns {Promise<Array>} Array of MCQ questions
   * @throws {Error} If question generation fails or returns invalid data
   */
  async generateQuestions(topics, experience, count) {
    try {
      // Use mock questions in demo mode
      if (config.demoMode) {
        console.log("📋 DEMO MODE: Using mock questions");
        const mockQuestions = generateMockQuestions(topics, experience, count);

        // Ensure we return exactly the requested number
        if (mockQuestions.length !== count) {
          console.warn(
            `Mock question generator returned ${mockQuestions.length} questions instead of ${count}.`
          );
          // Pad with additional questions if needed
          while (mockQuestions.length < count) {
            const additional = generateMockQuestions(
              topics,
              experience,
              Math.min(5, count - mockQuestions.length)
            );
            mockQuestions.push(...additional);
          }
        }

        return mockQuestions.slice(0, count);
      }

      console.log(
        `🚀 Generating ${count} questions for topics: ${topics.join(", ")}`
      );

      const prompt = this.buildPrompt(topics, experience, count);

      // Call Groq API with Llama model
      const message = await this.client.chat.completions.create({
        model: "llama-3.1-8b-instant", // Fast, cost-effective model
        messages: [
          {
            role: "system",
            content:
              "You are an expert technical interview question generator. Always respond with valid JSON only — no markdown fences, no explanation. Generate exactly the requested number of high-quality MCQ questions.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 4096,
        temperature: 0.7, // Balanced creativity and consistency
      });

      // Extract and clean response text
      let responseText = message.choices[0]?.message?.content?.trim() || "";

      // Remove any markdown code fences if present
      responseText = responseText.replace(/```json\n?|\n?```/g, "").trim();

      // Parse JSON response
      let questions;
      try {
        questions = JSON.parse(responseText);
      } catch (parseError) {
        console.error("Failed to parse Groq response:", responseText.substring(0, 200));
        throw new Error(
          `Invalid JSON response from Groq API: ${parseError.message}`
        );
      }

      // Validate response structure
      if (!Array.isArray(questions)) {
        throw new Error(
          `Expected array of questions, got ${typeof questions}`
        );
      }

      if (questions.length === 0) {
        throw new Error("Groq API returned empty questions array");
      }

      // Validate question count
      if (questions.length !== count) {
        console.warn(
          `⚠️  Groq returned ${questions.length} questions instead of requested ${count}`
        );

        if (questions.length < count) {
          throw new Error(
            `Groq generated only ${questions.length} questions instead of requested ${count}`
          );
        }

        // If more questions received, trim to exact count
        return questions.slice(0, count);
      }

      console.log(`✅ Successfully generated ${questions.length} questions`);
      return questions;
    } catch (error) {
      console.error("❌ Error generating questions:", error.message);
      throw error;
    }
  }

  /**
   * Generate detailed explanation for a specific question and answer
   * Provides context, reasoning, and learning insights
   * @param {string} question - The question text
   * @param {string} answer - The correct answer
   * @returns {Promise<string>} Detailed explanation string
   * @throws {Error} If explanation generation fails
   */
  async generateExplanation(question, answer) {
    try {
      if (config.demoMode) {
        return this.generateMockExplanation(question, answer);
      }

      console.log("💡 Generating detailed explanation...");

      const prompt = `Provide a clear, concise explanation for why the following answer is correct.

Question: ${question}
Answer: ${answer}

Your explanation should:
1. Explain why this answer is correct (2-3 sentences)
2. Reference key concepts or principles
3. Mention common misconceptions to avoid
4. Be suitable for a senior technical professional

Keep it concise and educational.`;

      const message = await this.client.chat.completions.create({
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content:
              "You are an expert technical educator explaining interview questions. Provide clear, concise, and educational explanations.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 500,
        temperature: 0.5,
      });

      const explanation =
        message.choices[0]?.message?.content?.trim() ||
        "Explanation not available";

      console.log("✅ Explanation generated successfully");
      return explanation;
    } catch (error) {
      console.error("❌ Error generating explanation:", error.message);
      // Return fallback explanation instead of throwing
      return this.generateMockExplanation(question, answer);
    }
  }

  /**
   * Generate AI-powered deep-dive analysis for a question
   * Helps understand why answer was correct and what user missed
   * @param {string} question - The exam question
   * @param {string} correctAnswer - The correct answer
   * @param {string} userAnswer - What the user answered (can be null if not answered)
   * @param {string} topic - The topic/domain of the question
   * @returns {Promise<Object>} Deep dive analysis with structure
   * @throws {Error} If analysis generation fails
   */
  async generateAIDeepDive(question, correctAnswer, userAnswer, topic) {
    try {
      if (config.demoMode) {
        return this.generateMockDeepDive(
          question,
          correctAnswer,
          userAnswer,
          topic
        );
      }

      console.log("🔍 Generating AI deep-dive analysis...");

      const userAnswerText =
        userAnswer && userAnswer !== correctAnswer
          ? `The user selected: "${userAnswer}"`
          : "The user did not answer this question or answered correctly";

      const prompt = `Analyze this interview question and provide a detailed learning explanation.

Topic: ${topic}
Question: ${question}
Correct Answer: ${correctAnswer}
${userAnswerText}

Provide a comprehensive explanation in JSON format:
{
  "whyCorrect": "Clear explanation of why the correct answer is right (2-3 sentences)",
  "conceptExplained": "The core concept this question tests (1 sentence)",
  "commonMistakes": ["Mistake 1 description", "Mistake 2 description"],
  "realWorldApplication": "How this concept applies in production systems",
  "keyInsight": "The most important takeaway",
  "furtherLearning": "Related concepts to study",
  "difficulty_reason": "Why this is at the current difficulty level"
}

Make it educational and actionable.`;

      const message = await this.client.chat.completions.create({
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content:
              "You are an expert technical educator. Provide detailed, educational analysis in valid JSON format only.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 1000,
        temperature: 0.6,
      });

      let responseText = message.choices[0]?.message?.content?.trim() || "";
      responseText = responseText.replace(/```json\n?|\n?```/g, "").trim();

      let analysis;
      try {
        analysis = JSON.parse(responseText);
      } catch (parseError) {
        console.warn("Could not parse deep dive response, using mock");
        return this.generateMockDeepDive(
          question,
          correctAnswer,
          userAnswer,
          topic
        );
      }

      console.log("✅ Deep-dive analysis generated successfully");
      return analysis;
    } catch (error) {
      console.error("❌ Error generating deep-dive analysis:", error.message);
      // Return mock analysis as fallback
      return this.generateMockDeepDive(
        question,
        correctAnswer,
        userAnswer,
        topic
      );
    }
  }

  /**
   * Generate skill gap analysis based on exam results
   * Identifies weak areas and provides learning recommendations
   * @param {Object} examResults - Exam results with scores by topic
   * @returns {Promise<Object>} Analysis with recommendations
   * @throws {Error} If analysis generation fails
   */
  async generateSkillGapAnalysis(examResults) {
    try {
      if (config.demoMode) {
        return this.generateMockSkillGapAnalysis(examResults);
      }

      console.log("📊 Generating skill gap analysis...");

      const {
        topicScores = [],
        overallPercentage = 0,
        strengths = [],
        weaknesses = [],
        totalQuestions = 10,
      } = examResults;

      // Format topic scores for analysis
      const scoresSummary = topicScores
        .map((t) => `${t.topic}: ${t.percentage}%`)
        .join(", ");

      const prompt = `Analyze the following exam performance and provide actionable recommendations.

Overall Performance: ${overallPercentage}%
Total Questions: ${totalQuestions}
Topic Breakdown: ${scoresSummary}
Strong Areas: ${strengths.join(", ") || "None identified"}
Weak Areas: ${weaknesses.join(", ") || "None identified"}

Provide analysis in JSON format:
{
  "overallAssessment": "Summary of overall performance (2-3 sentences)",
  "strengths": ["Strength 1 with explanation", "Strength 2 with explanation"],
  "areasForImprovement": ["Area 1 with actionable advice", "Area 2 with actionable advice"],
  "priorityLearningPath": ["First priority topic and why", "Second priority topic and why"],
  "recommendedResources": ["Resource 1 description", "Resource 2 description"],
  "practiceAreas": ["Practice area 1", "Practice area 2"],
  "estimatedTimeToImprove": "Realistic timeframe for improvement",
  "nextSteps": "Concrete actions to take immediately"
}

Make recommendations specific, actionable, and encouraging.`;

      const message = await this.client.chat.completions.create({
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content:
              "You are an expert career coach and technical educator. Provide insightful, actionable analysis to help professionals improve their skills.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 1200,
        temperature: 0.6,
      });

      let responseText = message.choices[0]?.message?.content?.trim() || "";
      responseText = responseText.replace(/```json\n?|\n?```/g, "").trim();

      let analysis;
      try {
        analysis = JSON.parse(responseText);
      } catch (parseError) {
        console.warn("Could not parse skill gap analysis, using mock");
        return this.generateMockSkillGapAnalysis(examResults);
      }

      console.log("✅ Skill gap analysis generated successfully");
      return analysis;
    } catch (error) {
      console.error("❌ Error generating skill gap analysis:", error.message);
      return this.generateMockSkillGapAnalysis(examResults);
    }
  }

  /**
   * Generate mock explanation (fallback for demo/error cases)
   * @private
   */
  generateMockExplanation(question, answer) {
    return `This answer demonstrates a solid understanding of the core concept. The answer "${answer}" properly reflects best practices and handles the key principles involved. In production systems, this approach ensures reliability and maintainability.`;
  }

  /**
   * Generate mock deep dive analysis (fallback for demo/error cases)
   * @private
   */
  generateMockDeepDive(question, correctAnswer, userAnswer, topic) {
    const userGotWrong = userAnswer && userAnswer !== correctAnswer;

    return {
      whyCorrect: `The correct answer "${correctAnswer}" is right because it accurately reflects the core principles of ${topic}. This answer demonstrates proper understanding of best practices and handles edge cases appropriately.`,
      conceptExplained: `This question tests your understanding of ${topic} and how to apply it correctly.`,
      commonMistakes: [
        `Mistaking syntax details for semantic understanding - focus on the underlying concept instead`,
        `Overlooking edge cases or special conditions that distinguish correct from plausible answers`,
        `Relying on partial memory without understanding the fundamental principles`,
      ],
      realWorldApplication: `In production systems, understanding ${topic} correctly is crucial for writing robust code. It directly impacts system reliability, performance, and scalability.`,
      keyInsight: `The fundamental principle: correct application of ${topic} ensures cleaner, more maintainable, and more reliable code.`,
      furtherLearning: `Study related concepts in ${topic} and practice implementing solutions to deepen your understanding.`,
      difficulty_reason:
        "This question requires understanding both the concept and how it applies in practice.",
    };
  }

  /**
   * Generate mock skill gap analysis (fallback for demo/error cases)
   * @private
   */
  generateMockSkillGapAnalysis(examResults) {
    const { overallPercentage = 50, weaknesses = [] } = examResults;

    const assessment =
      overallPercentage >= 80
        ? "You demonstrate strong technical knowledge with good fundamentals."
        : "You have foundational knowledge with opportunities for targeted improvement.";

    return {
      overallAssessment: assessment,
      strengths: [
        "Strong foundational understanding of core concepts",
        "Ability to apply knowledge to practical scenarios",
      ],
      areasForImprovement: [
        `Focus on ${weaknesses[0] || "advanced concepts"} - practice with real-world scenarios`,
        "Dive deeper into architectural patterns and system design principles",
      ],
      priorityLearningPath: [
        "First: Master the fundamentals of weak areas through targeted practice",
        "Second: Apply knowledge to real-world projects and code reviews",
      ],
      recommendedResources: [
        "Official documentation and technical blogs for your focused area",
        "Hands-on coding projects and open-source contribution",
      ],
      practiceAreas: [
        "Complete coding challenges focusing on weak areas",
        "Review and implement real-world code examples",
      ],
      estimatedTimeToImprove: "2-4 weeks of consistent practice",
      nextSteps:
        "Start by reviewing fundamentals, then practice with real-world scenarios",
    };
  }

  /**
   * Health check - Verify Groq API connectivity
   * @returns {Promise<Object>} Health status
   */
  async healthCheck() {
    try {
      if (config.demoMode) {
        return {
          status: "ok",
          mode: "demo",
          message: "Running in demo mode with mock questions",
        };
      }

      // Simple API call to verify connectivity
      const response = await this.client.chat.completions.create({
        model: "llama-3.1-8b-instant",
        messages: [{ role: "user", content: "Say OK" }],
        max_tokens: 10,
      });

      return {
        status: "ok",
        mode: "production",
        message: "Groq API is operational",
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error("❌ Health check failed:", error.message);
      return {
        status: "error",
        mode: "production",
        message: error.message,
        timestamp: new Date().toISOString(),
      };
    }
  }

  /**
   * Send a chat message to Groq for AI assistance
   * Used for answering questions about exam questions and concepts
   * @param {Array} messages - Chat messages with role and content
   * @returns {Promise<string>} AI response text
   * @throws {Error} If API call fails
   */
  async chat(messages) {
    try {
      console.log(`📡 Groq Chat called (Demo: ${config.demoMode})`);
      
      if (config.demoMode) {
        console.log("📋 Running in DEMO_MODE - returning mock response");
        return "Thanks for your question! This is a demo response. In production, this would be a detailed explanation powered by Groq's Llama models. To enable AI responses, set your GROQ_API_KEY environment variable in the backend .env file.";
      }

      if (!this.client) {
        throw new Error("Groq client not initialized. Check GROQ_API_KEY in .env");
      }

      console.log("🤖 Calling Groq Llama model...");
      
      const response = await this.client.chat.completions.create({
        model: "llama-3.1-8b-instant",
        messages: messages,
        max_tokens: 500,
        temperature: 0.7,
      });

      const content = response.choices[0]?.message?.content;
      
      if (!content) {
        throw new Error("No response content from Groq");
      }
      
      console.log("✅ Groq response received successfully");
      return content;
    } catch (error) {
      console.error("❌ Groq Chat error:", error.message);
      throw new Error(`Failed to get AI response: ${error.message}`);
    }
  }
}

// Export singleton instance
export const groqService = new GroqService();

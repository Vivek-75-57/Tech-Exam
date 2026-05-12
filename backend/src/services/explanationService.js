/**
 * Explanation Service - Uses Groq API for detailed explanations
 * Migrated from Anthropic to Groq for cost-effectiveness
 */

import { groqService } from "./groqService.js";

class ExplanationService {
  /**
   * Generate detailed explanation for a question and answer
   * Delegates to groqService for AI-powered explanations
   * @param {string} question - The question text
   * @param {string} correctAnswer - The correct answer
   * @param {string} difficulty - Difficulty level
   * @returns {Promise<Object>} Structured explanation object
   */
  async generateDetailedExplanation(question, correctAnswer, difficulty) {
    try {
      // Use groqService to generate explanation
      const explanationText = await groqService.generateExplanation(
        question,
        correctAnswer
      );

      // Return structured explanation
      return {
        text: explanationText,
        difficulty,
        generatedAt: new Date().toISOString(),
      };
    } catch (error) {
      console.error("Error generating detailed explanation:", error);
      // Fallback to mock explanation
      return this.generateMockExplanation(question, correctAnswer, difficulty);
    }
  }

  /**
   * Enrich questions with detailed explanations
   * Adds explanation object to each question
   * @param {Array} questions - Array of question objects
   * @returns {Promise<Array>} Questions with detailed explanations
   */
  async enrichQuestions(questions) {
    try {
      console.log(
        `📚 Enriching ${questions.length} questions with detailed explanations...`
      );

      // Process questions with explanations
      const enrichedQuestions = questions.map((q) => {
        const detailedExplanation = this.generateMockExplanation(
          q.question,
          q.correct_answer,
          q.difficulty
        );

        return {
          ...q,
          detailedExplanation,
          explanationGeneratedAt: new Date().toISOString(),
        };
      });

      console.log(
        `✅ Successfully enriched all ${enrichedQuestions.length} questions`
      );
      return enrichedQuestions;
    } catch (err) {
      console.error("Error enriching questions:", err);
      // Return questions without detailed explanations
      return questions;
    }
  }

  /**
   * Generate structured mock explanation (fallback)
   * Used when AI generation fails or in demo mode
   * @private
   */
  generateMockExplanation(question, correctAnswer, difficulty) {
    const difficultyLevel = difficulty.toLowerCase();
    const answer = correctAnswer || "the correct option";

    return {
      whyCorrect: `This answer is correct because it accurately reflects the key concept being tested. The answer "${answer}" demonstrates a proper understanding of the core principles involved. It properly handles edge cases and follows best practices for ${difficultyLevel} level programming.`,

      commonMistakes: [
        `Misconception 1: Many ${difficultyLevel} developers confuse related but distinct concepts, which leads to selecting incorrect answers that seem plausible at first glance.`,
        `Misconception 2: A very common mistake is overlooking edge cases or special conditions that distinguish the correct answer from plausible distractors.`,
        `Misconception 3: Some developers rely too heavily on partial memory of syntax or API details while losing sight of the underlying conceptual understanding required.`,
      ],

      realWorldApplication: `In real-world production systems, understanding this concept is crucial for writing robust and maintainable code. This principle directly impacts system reliability, performance, and scalability. Proper application of this concept helps prevent subtle bugs and improves code quality across large projects.`,

      keyInsight: `Always remember that the fundamental principle here is about maintaining clarity, correctness, and consistency in your code. This understanding forms the foundation for more advanced concepts and better architectural decisions.`,
    };
  }
}

export const explanationService = new ExplanationService();


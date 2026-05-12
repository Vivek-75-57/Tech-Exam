import { llmService } from "./llm.js";
import { vectorStore } from "./vectorStore.js";
import { explanationService } from "./explanationService.js";
import { v4 as uuidv4 } from "uuid";

class ExamService {
  #normalizeAnswerValue(value, options = []) {
    if (value === null || value === undefined) return value;

    if (typeof value === "number" && Number.isInteger(value) && value >= 0) {
      return String.fromCharCode(65 + value);
    }

    if (typeof value === "string") {
      const trimmed = value.trim();

      if (/^\d+$/.test(trimmed)) {
        return String.fromCharCode(65 + Number(trimmed));
      }

      const normalized = trimmed.toUpperCase();
      if (/^[A-D]$/.test(normalized)) {
        return normalized;
      }

      if (options.length > 0) {
        const optionIndex = options.findIndex((option) => {
          const optionText = typeof option === "object" ? option.text : option;
          return String(optionText).trim().toUpperCase() === normalized;
        });

        if (optionIndex >= 0) {
          return String.fromCharCode(65 + optionIndex);
        }
      }

      return normalized;
    }

    return value;
  }

  async generateExam({ topics, years_of_experience, num_questions = 10 }) {
    // 1. Check cache
    let cached = await vectorStore.get(topics, years_of_experience, num_questions);
    if (cached) {
      // Ensure cached questions have detailed explanations
      if (cached.questions && cached.questions.length > 0 && !cached.questions[0].detailedExplanation) {
        console.log("📚 Enriching cached exam with explanations...");
        cached.questions = await explanationService.enrichQuestions(cached.questions);
      }
      return { ...cached, cached: true, examId: uuidv4() };
    }

    // 2. Generate via LLM
    let questions = await llmService.generateQuestions(topics, years_of_experience, num_questions);

    // 3. Enrich questions with detailed AI-powered explanations
    console.log("🤖 Generating AI-powered explanations for exam questions...");
    questions = await explanationService.enrichQuestions(questions);

    // 4. Enrich response
    const level = llmService.getExperienceLevel(years_of_experience);
    const result = {
      examId: uuidv4(),
      questions,
      metadata: {
        exam_level: `${level.label} (${level.description})`,
        years_of_experience,
        topics,
        total_questions: questions.length,
        generated_at: new Date().toISOString(),
        difficulty_distribution: this.#getDifficultyDistribution(questions),
        topic_distribution: this.#getTopicDistribution(questions),
      },
      cached: false,
    };

    // 5. Store in vector DB
    await vectorStore.set(topics, years_of_experience, num_questions, result);

    return result;
  }

  scoreExam(questions, answers) {
    let correct = 0;
    const breakdown = questions.map((q) => {
      const correctAnswer = this.#normalizeAnswerValue(
        q.correct_answer ?? q.correctAnswer,
        q.options
      );
      const userAnswer = this.#normalizeAnswerValue(answers[q.id], q.options);
      const isCorrect = userAnswer === correctAnswer;
      if (isCorrect) correct++;
      return {
        questionId: q.id,
        question: q.question,
        topic: q.topic,
        difficulty: q.difficulty,
        userAnswer,
        correctAnswer,
        isCorrect,
        explanation: q.explanation,
        detailedExplanation: q.detailedExplanation || null,
      };
    });

    const total = questions.length;
    const pct = Math.round((correct / total) * 100);

    return {
      score: { correct, total, percentage: pct },
      grade: this.#getGrade(pct),
      breakdown,
      topicScores: this.#getTopicScores(breakdown),
      weakAreas: breakdown.filter((b) => !b.isCorrect).map((b) => b.topic),
    };
  }

  #getDifficultyDistribution(questions) {
    return questions.reduce((acc, q) => {
      acc[q.difficulty] = (acc[q.difficulty] || 0) + 1;
      return acc;
    }, {});
  }

  #getTopicDistribution(questions) {
    return questions.reduce((acc, q) => {
      acc[q.topic] = (acc[q.topic] || 0) + 1;
      return acc;
    }, {});
  }

  #getGrade(pct) {
    if (pct >= 90) return { label: "Outstanding", color: "#64ffda", emoji: "🏆" };
    if (pct >= 80) return { label: "Excellent", color: "#48bb78", emoji: "🎯" };
    if (pct >= 70) return { label: "Good", color: "#f6e05e", emoji: "👍" };
    return { label: "Satisfactory", color: "#f6ad55", emoji: "📈" };
  }

  #getTopicScores(breakdown) {
    const byTopic = {};
    breakdown.forEach(({ topic, isCorrect }) => {
      if (!byTopic[topic]) byTopic[topic] = { correct: 0, total: 0 };
      byTopic[topic].total++;
      if (isCorrect) byTopic[topic].correct++;
    });
    return Object.entries(byTopic).map(([topic, { correct, total }]) => ({
      topic,
      correct,
      total,
      percentage: Math.round((correct / total) * 100),
    }));
  }
}

export const examService = new ExamService();

import { examService } from "../services/exam.js";
import { vectorStore } from "../services/vectorStore.js";
import { examHistoryService } from "../services/examHistory.js";
import { v4 as uuidv4 } from "uuid";

class ExamController {
  async generateExam(req, res, next) {
    try {
      const { topics, years_of_experience, num_questions } = req.body;

      if (!topics || !Array.isArray(topics) || topics.length === 0) {
        return res.status(400).json({ error: "topics array is required" });
      }

      if (!years_of_experience || years_of_experience < 0) {
        return res.status(400).json({ error: "valid years_of_experience is required" });
      }

      const result = await examService.generateExam({
        topics,
        years_of_experience,
        num_questions: num_questions || 10,
      });

      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  scoreExam(req, res, next) {
    try {
      const { questions, answers, timeSpent = 0, topics = [], difficulty = "Medium" } = req.body;

      if (!questions || !Array.isArray(questions)) {
        return res.status(400).json({ error: "questions array is required" });
      }

      if (!answers || typeof answers !== "object") {
        return res.status(400).json({ error: "answers object is required" });
      }

      const result = examService.scoreExam(questions, answers);

      const totalAnswered = Object.keys(answers).length;
      const scoreEntry = {
        id: uuidv4(),
        date: new Date().toISOString(),
        topics: Array.isArray(topics) && topics.length > 0 ? topics : [questions[0]?.topic || "General"],
        topic: Array.isArray(topics) && topics.length > 0 ? topics[0] : questions[0]?.topic || "General",
        score: result.score.percentage,
        grade: result.grade.label,
        questions: questions.length,
        timeSpent,
        time: `${Math.round(timeSpent / 60)}m`,
        difficulty,
        correctAnswers: result.score.correct,
        totalAnswered,
        timestamp: Date.now(),
      };

      examHistoryService.addEntry(scoreEntry).catch((err) => {
        console.error("Failed to persist exam history entry:", err);
      });

      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  async getStats(req, res, next) {
    try {
      // Return platform statistics instead of cache stats
      const stats = {
        total_users: "50K+",
        total_questions: "10K+",
        total_topics: "60+",
        success_rate: "92%",
      };
      res.json(stats);
    } catch (err) {
      next(err);
    }
  }

  async getHistory(req, res, next) {
    try {
      const exams = await examHistoryService.getHistory();
      res.json({ exams, count: exams.length });
    } catch (err) {
      next(err);
    }
  }
}

export const examController = new ExamController();

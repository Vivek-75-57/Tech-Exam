import axios from "axios";

const API_BASE_URL = "https://tech-exam-production.up.railway.app/api";

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiClient = {
  async generateExam(topics, yearsOfExperience, numQuestions) {
    const response = await client.post("/exams/generate", {
      topics,
      years_of_experience: yearsOfExperience,
      num_questions: numQuestions,
    });
    return response.data;
  },

  async scoreExam(questions, answers) {
    const response = await client.post("/exams/score", {
      questions,
      answers,
    });
    return response.data;
  },

  async getStats() {
    const response = await client.get("/exams/stats");
    return response.data;
  },

  async getHealth() {
    const response = await client.get("/health");
    return response.data;
  },

  async addBookmark(question) {
    const response = await client.post("/bookmarks", { question });
    return response.data;
  },

  async removeBookmark(questionId) {
    const response = await client.delete(`/bookmarks/${questionId}`);
    return response.data;
  },

  async getBookmarks(topic = null) {
    const response = await client.get("/bookmarks", {
      params: { topic },
    });
    return response.data;
  },

  async getBookmarkTopics() {
    const response = await client.get("/bookmarks/topics");
    return response.data;
  },

  async isBookmarked(questionId) {
    const response = await client.get(`/bookmarks/check/${questionId}`);
    return response.data;
  },

  async getBookmarkStats() {
    const response = await client.get("/bookmarks/stats");
    return response.data;
  },

  async clearAllBookmarks() {
    const response = await client.delete("/bookmarks");
    return response.data;
  },

  async downloadReport(examData, answersData, performanceData, format = "pdf") {
    const response = await axios.post(
      `${API_BASE_URL}/export/download`,
      {
        examData,
        answersData,
        performanceData,
        format,
      },
      {
        responseType: "blob",
      }
    );
    return response.data;
  },

  async getReportData(examData, answersData, performanceData) {
    const response = await client.post("/export/report", {
      examData,
      answersData,
      performanceData,
    });
    return response.data;
  },

  async sendAiChatMessage(payload) {
    console.log("🔗 Sending to /ai-chat endpoint:", payload);
    try {
      const response = await client.post("/ai-chat", payload);
      console.log("✅ AI Chat response:", response.data);
      
      if (!response.data.success && response.data.error) {
        throw new Error(response.data.error);
      }
      
      return response.data;
    } catch (error) {
      console.error("❌ AI Chat API error:", error);
      throw error;
    }
  },

  // User endpoints
  async getUserProfile() {
    try {
      const response = await client.get("/users/profile");
      return response.data;
    } catch (error) {
      // Return default profile on error
      return {
        id: "user_1",
        name: "User",
        email: "user@example.com",
        bio: "",
        location: "",
        avatar: "👤",
      };
    }
  },

  async updateUserProfile(userData) {
    const response = await client.put("/users/profile", userData);
    return response.data;
  },

  // Exam history endpoints
  async getExamHistory() {
    try {
      const response = await client.get("/exams/history");
      return response.data;
    } catch (error) {
      return { exams: [] };
    }
  },

  // Leaderboard endpoints
  async getLeaderboard(timeframe = "month") {
    try {
      const response = await client.get("/leaderboard", {
        params: { timeframe },
      });
      return response.data;
    } catch (error) {
      return { leaders: [], userRank: null };
    }
  },

  // Topic mastery endpoints
  async getTopicMastery() {
    try {
      const response = await client.get("/topics/mastery");
      return response.data;
    } catch (error) {
      return { topics: [], overall: {} };
    }
  },
};


import fs from "fs/promises";
import path from "path";

const examHistoryFilePath = path.join(process.cwd(), "data", "examHistory.json");

class ExamHistoryService {
  constructor() {
    this.ensureDataDir();
  }

  async ensureDataDir() {
    try {
      const dataDir = path.dirname(examHistoryFilePath);
      await fs.mkdir(dataDir, { recursive: true });
    } catch (err) {
      console.error("Failed to create exam history data directory:", err);
    }
  }

  async loadHistory() {
    try {
      const data = await fs.readFile(examHistoryFilePath, "utf-8");
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) ? parsed : [];
    } catch (err) {
      if (err.code === "ENOENT") {
        return [];
      }

      console.error("Failed to load exam history:", err);
      throw err;
    }
  }

  async saveHistory(history) {
    try {
      await fs.writeFile(examHistoryFilePath, JSON.stringify(history, null, 2), "utf-8");
    } catch (err) {
      console.error("Failed to save exam history:", err);
      throw err;
    }
  }

  async addEntry(entry) {
    const history = await this.loadHistory();
    const nextHistory = [entry, ...history].slice(0, 50);

    await this.saveHistory(nextHistory);

    return entry;
  }

  async getHistory() {
    return this.loadHistory();
  }
}

export const examHistoryService = new ExamHistoryService();
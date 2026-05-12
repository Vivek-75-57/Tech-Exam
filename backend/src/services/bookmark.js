import fs from "fs/promises";
import path from "path";
import { config } from "../config/index.js";

const bookmarksFilePath = path.join(process.cwd(), "data", "bookmarks.json");

class BookmarkService {
  constructor() {
    this.ensureDataDir();
  }

  async ensureDataDir() {
    try {
      const dataDir = path.dirname(bookmarksFilePath);
      await fs.mkdir(dataDir, { recursive: true });
    } catch (err) {
      console.error("Failed to create data directory:", err);
    }
  }

  async loadBookmarks() {
    try {
      const data = await fs.readFile(bookmarksFilePath, "utf-8");
      return JSON.parse(data);
    } catch (err) {
      if (err.code === "ENOENT") {
        return [];
      }
      console.error("Failed to load bookmarks:", err);
      throw err;
    }
  }

  async saveBookmarks(bookmarks) {
    try {
      await fs.writeFile(
        bookmarksFilePath,
        JSON.stringify(bookmarks, null, 2),
        "utf-8"
      );
    } catch (err) {
      console.error("Failed to save bookmarks:", err);
      throw err;
    }
  }

  async addBookmark(question) {
    const bookmarks = await this.loadBookmarks();

    // Check if already bookmarked
    const exists = bookmarks.some((b) => b.id === question.id);
    if (exists) {
      throw new Error("Question already bookmarked");
    }

    const bookmark = {
      ...question,
      bookmarkedAt: new Date().toISOString(),
    };

    bookmarks.push(bookmark);
    await this.saveBookmarks(bookmarks);

    return bookmark;
  }

  async removeBookmark(questionId) {
    const bookmarks = await this.loadBookmarks();
    const filtered = bookmarks.filter((b) => b.id !== questionId);

    if (filtered.length === bookmarks.length) {
      throw new Error("Bookmark not found");
    }

    await this.saveBookmarks(filtered);
    return { success: true };
  }

  async getBookmarks(topic = null) {
    const bookmarks = await this.loadBookmarks();

    if (topic) {
      return bookmarks.filter((b) => b.topic === topic);
    }

    return bookmarks;
  }

  async getUniqueTopics() {
    const bookmarks = await this.loadBookmarks();
    return [...new Set(bookmarks.map((b) => b.topic))];
  }

  async clearAllBookmarks() {
    await this.saveBookmarks([]);
    return { success: true };
  }

  async isBookmarked(questionId) {
    const bookmarks = await this.loadBookmarks();
    return bookmarks.some((b) => b.id === questionId);
  }

  async getStats() {
    const bookmarks = await this.loadBookmarks();
    const topics = await this.getUniqueTopics();

    return {
      totalBookmarks: bookmarks.length,
      topics: topics.map((topic) => ({
        name: topic,
        count: bookmarks.filter((b) => b.topic === topic).length,
      })),
      lastBookmarked: bookmarks.length > 0 ? bookmarks[bookmarks.length - 1].bookmarkedAt : null,
    };
  }
}

export const bookmarkService = new BookmarkService();

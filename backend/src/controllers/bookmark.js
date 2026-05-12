import { bookmarkService } from "../services/bookmark.js";

class BookmarkController {
  async addBookmark(req, res, next) {
    try {
      const { question } = req.body;

      if (!question || !question.id) {
        return res.status(400).json({ error: "question object with id is required" });
      }

      const bookmark = await bookmarkService.addBookmark(question);
      res.status(201).json(bookmark);
    } catch (err) {
      next(err);
    }
  }

  async removeBookmark(req, res, next) {
    try {
      const { questionId } = req.params;

      if (!questionId) {
        return res.status(400).json({ error: "questionId is required" });
      }

      const result = await bookmarkService.removeBookmark(questionId);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  async getBookmarks(req, res, next) {
    try {
      const { topic } = req.query;

      const bookmarks = await bookmarkService.getBookmarks(topic);
      res.json({
        bookmarks,
        count: bookmarks.length,
        topic: topic || "all",
      });
    } catch (err) {
      next(err);
    }
  }

  async getUniqueTopics(req, res, next) {
    try {
      const topics = await bookmarkService.getUniqueTopics();
      res.json({ topics });
    } catch (err) {
      next(err);
    }
  }

  async isBookmarked(req, res, next) {
    try {
      const { questionId } = req.params;

      if (!questionId) {
        return res.status(400).json({ error: "questionId is required" });
      }

      const bookmarked = await bookmarkService.isBookmarked(questionId);
      res.json({ bookmarked });
    } catch (err) {
      next(err);
    }
  }

  async clearAllBookmarks(req, res, next) {
    try {
      const result = await bookmarkService.clearAllBookmarks();
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  async getStats(req, res, next) {
    try {
      const stats = await bookmarkService.getStats();
      res.json(stats);
    } catch (err) {
      next(err);
    }
  }
}

export const bookmarkController = new BookmarkController();

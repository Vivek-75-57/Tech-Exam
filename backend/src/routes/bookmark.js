import { Router } from "express";
import { bookmarkController } from "../controllers/bookmark.js";

const router = Router();

// Add a new bookmark
router.post("/", bookmarkController.addBookmark);

// Get all bookmarks or filter by topic
router.get("/", bookmarkController.getBookmarks);

// Get unique topics
router.get("/topics", bookmarkController.getUniqueTopics);

// Check if a specific question is bookmarked
router.get("/check/:questionId", bookmarkController.isBookmarked);

// Remove a bookmark
router.delete("/:questionId", bookmarkController.removeBookmark);

// Get bookmark statistics
router.get("/stats", bookmarkController.getStats);

// Clear all bookmarks
router.delete("/", bookmarkController.clearAllBookmarks);

export const bookmarkRoutes = router;

import { useCallback } from "react";
import { useBookmarksStore } from "../store/index.js";

export function useBookmarks() {
  const {
    bookmarks,
    filteredTopic,
    addBookmark,
    removeBookmark,
    isBookmarked,
    getBookmarksByTopic,
    getUniqueTopics,
    setFilteredTopic,
    getFilteredBookmarks,
    clearAllBookmarks,
  } = useBookmarksStore();

  const toggleBookmark = useCallback(
    (question) => {
      if (isBookmarked(question.id)) {
        removeBookmark(question.id);
      } else {
        addBookmark(question);
      }
    },
    [isBookmarked, removeBookmark, addBookmark]
  );

  return {
    bookmarks,
    filteredTopic,
    setFilteredTopic,
    toggleBookmark,
    isBookmarked,
    getBookmarksByTopic,
    getUniqueTopics,
    getFilteredBookmarks,
    clearAllBookmarks,
    totalBookmarks: bookmarks.length,
  };
}

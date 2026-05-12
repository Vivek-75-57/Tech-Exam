import { create } from "zustand";

export const useExamStore = create((set) => ({
  exam: null,
  results: null,
  loading: false,
  error: null,

  setExam: (exam) => set({ exam }),
  setResults: (results) => set({ results }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  reset: () => set({
    exam: null,
    results: null,
    loading: false,
    error: null,
  }),
}));

export const useBookmarksStore = create((set, get) => {
  // Load bookmarks from localStorage on init
  const savedBookmarks = localStorage.getItem("examBookmarks");
  const initialBookmarks = savedBookmarks ? JSON.parse(savedBookmarks) : [];

  return {
    bookmarks: initialBookmarks,
    filteredTopic: null,

    addBookmark: (question) =>
      set((state) => {
        const bookmarkExists = state.bookmarks.some(
          (b) => b.id === question.id
        );
        if (bookmarkExists) return state;

        const newBookmarks = [
          ...state.bookmarks,
          { ...question, bookmarkedAt: new Date().toISOString() },
        ];
        localStorage.setItem("examBookmarks", JSON.stringify(newBookmarks));
        return { bookmarks: newBookmarks };
      }),

    removeBookmark: (questionId) =>
      set((state) => {
        const newBookmarks = state.bookmarks.filter((b) => b.id !== questionId);
        localStorage.setItem("examBookmarks", JSON.stringify(newBookmarks));
        return { bookmarks: newBookmarks };
      }),

    isBookmarked: (questionId) => {
      const { bookmarks } = get();
      return bookmarks.some((b) => b.id === questionId);
    },

    getBookmarksByTopic: (topic) => {
      const { bookmarks } = get();
      return bookmarks.filter((b) => b.topic === topic);
    },

    getUniqueTopics: () => {
      const { bookmarks } = get();
      return [...new Set(bookmarks.map((b) => b.topic))];
    },

    setFilteredTopic: (topic) => set({ filteredTopic: topic }),

    getFilteredBookmarks: () => {
      const { bookmarks, filteredTopic } = get();
      if (!filteredTopic) return bookmarks;
      return bookmarks.filter((b) => b.topic === filteredTopic);
    },

    clearAllBookmarks: () => {
      localStorage.setItem("examBookmarks", JSON.stringify([]));
      set({ bookmarks: [], filteredTopic: null });
    },
  };
});

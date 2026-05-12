import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { HeroCard } from "./sections/HeroCard";
import { StatsCards } from "./sections/StatsCards";
import { ChartsSection } from "./sections/ChartsSection";
import { TimeSection } from "./sections/TimeSection";
import { SkillGapSection } from "./sections/SkillGapSection";
import { AchievementsSection } from "./sections/AchievementsSection";
import { RelatedConceptsExplorer } from "./RelatedConceptsExplorer";
import { CodingChallenge } from "./CodingChallenge";
import { useAiChat } from "../../hooks/useAiChat";

export function EnhancedResultsPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // State management
  const [examResult, setExamResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMobileChat, setIsMobileChat] = useState(false);

  // AI Chat state from hook
  const { messages, isLoading: isChatLoading, sendMessage: sendChatMessage } = useAiChat();

  // Load exam result from navigation state or sessionStorage
  useEffect(() => {
    try {
      setLoading(true);
      console.log("📍 EnhancedResultsPage loading data...");

      // Try 1: Get from location state (passed via navigate)
      let result = location.state?.examResult;
      console.log("1️⃣ Location state result:", result ? "✅ Found" : "❌ Not found");

      // Try 2: Check window.__completeExamResult (set during modal navigation)
      if (!result && window.__completeExamResult) {
        result = window.__completeExamResult;
        console.log("2️⃣ window.__completeExamResult:", "✅ Found");
        // Clear it after use
        window.__completeExamResult = null;
      } else if (!result) {
        console.log("2️⃣ window.__completeExamResult:", "❌ Not found");
      }

      // Try 3: Check sessionStorage (examResults)
      if (!result) {
        const stored = sessionStorage.getItem("examResults");
        if (stored) {
          try {
            result = JSON.parse(stored);
            console.log("3️⃣ sessionStorage examResults:", "✅ Found");
          } catch (e) {
            console.log("3️⃣ sessionStorage examResults: Parse error");
          }
        } else {
          console.log("3️⃣ sessionStorage examResults:", "❌ Not found");
        }
      }

      // Try 4: Check localStorage (examHistory - get last exam)
      if (!result) {
        const historyStored = localStorage.getItem("examHistory");
        if (historyStored) {
          try {
            const history = JSON.parse(historyStored);
            if (history && Array.isArray(history) && history.length > 0) {
              result = history[0];
              console.log("4️⃣ localStorage examHistory:", "✅ Found (last exam)");
            } else {
              console.log("4️⃣ localStorage examHistory: Empty array");
            }
          } catch (e) {
            console.log("4️⃣ localStorage examHistory: Parse error");
          }
        } else {
          console.log("4️⃣ localStorage examHistory:", "❌ Not found");
        }
      }

      if (!result) {
        console.error("❌ No exam results found in any source!");
        setError("No exam results found. Please take an exam first.");
        setExamResult(null);
      } else {
        console.log("✅ Using exam result:", result);
        setExamResult(result);
        setError(null);

        // Clear sessionStorage after loading to prevent stale data
        sessionStorage.removeItem("examResults");
      }
    } catch (err) {
      console.error("Error loading exam results:", err);
      setError("Failed to load exam results. Please try again.");
      setExamResult(null);
    } finally {
      setLoading(false);
    }
  }, [location]);

  // Handle AI chat message
  const handleSendMessage = (userMessage) => {
    sendChatMessage({
      questionId: undefined,
      question: `Exam Result - ${examResult?.grade}`,
      userMessage,
      context: { topic: examResult?.topics?.[0] },
    });
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-slate-900 dark:to-slate-950 flex items-center justify-center">
        <motion.div
          className="text-center space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="text-5xl"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            📊
          </motion.div>
          <p className="text-gray-600 dark:text-gray-400 text-lg font-medium">
            Loading your results...
          </p>
        </motion.div>
      </div>
    );
  }

  // Error state
  if (error || !examResult) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-slate-900 dark:to-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-8 text-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="text-5xl mb-4">😕</div>
            <h2 className="text-2xl font-bold text-red-700 dark:text-red-400 mb-2">
              No Results Found
            </h2>
            <p className="text-red-600 dark:text-red-300 mb-6">
              {error || "No exam results are available. Please take an exam to view your results."}
            </p>
            <button
              onClick={() => navigate("/exam/setup")}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
            >
              Take an Exam
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  // Transform the result data for components
  const stats = {
    grade: examResult?.grade || "Satisfactory",
    percentage: examResult?.score?.percentage || examResult?.score || 0,
    correct: examResult?.score?.correct || examResult?.correctAnswers || 0,
    total: examResult?.score?.total || examResult?.questions || 0,
    incorrect: (examResult?.score?.total || examResult?.questions || 0) - (examResult?.score?.correct || examResult?.correctAnswers || 0),
    accuracy: examResult?.score?.percentage || examResult?.score || 0,
    topicScores: examResult?.topicScores || [],
    weakAreas: examResult?.weakAreas || [],
    breakdown: examResult?.breakdown || [],
    timeSpent: examResult?.timeSpent || examResult?.timeSeconds || 0,
    totalTime: examResult?.timeSeconds || 0,
    avgTime: examResult?.timeSeconds && examResult?.questions ? Math.round(examResult?.timeSeconds / examResult?.questions) : 0,
    fastestTime: examResult?.breakdown && examResult?.breakdown.length > 0 ? Math.min(...examResult.breakdown.map(q => q.timeSpent || 0)) : 0,
    slowestTime: examResult?.breakdown && examResult?.breakdown.length > 0 ? Math.max(...examResult.breakdown.map(q => q.timeSpent || 0)) : 0,
    date: examResult?.date || new Date().toISOString(),
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-slate-900 dark:to-slate-950">
      {/* Header */}
      <motion.div
        className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Exam Results</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {new Date(stats.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
            <button
              onClick={() => navigate("/")}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg font-medium transition-colors"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Results (takes 3 columns on large screens) */}
          <div className="lg:col-span-3 space-y-8">
            {/* Hero Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <HeroCard stats={stats} />
            </motion.div>

            {/* Stats Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <StatsCards stats={stats} />
            </motion.div>

            {/* Charts Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm"
            >
              <ChartsSection stats={stats} />
            </motion.div>

            {/* Time Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <TimeSection timeData={stats} />
            </motion.div>

            {/* Skill Gap Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm"
            >
              <SkillGapSection stats={stats} />
            </motion.div>

            {/* Achievements Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm"
            >
              <AchievementsSection stats={stats} />
            </motion.div>

            {/* Related Concepts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm"
            >
              <RelatedConceptsExplorer concepts={stats.topicScores} />
            </motion.div>

            {/* Coding Challenge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm"
            >
              <CodingChallenge
                topic={examResult?.topics?.[0] || "General"}
                difficulty={examResult?.difficulty || "Medium"}
              />
            </motion.div>
          </div>

          {/* Sidebar - AI Chat (Desktop) */}
          <div className="hidden lg:block">
            <motion.div
              className="sticky top-24 h-fit"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              {isChatOpen ? (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 max-h-[600px] flex flex-col">
                  {/* Chat Header */}
                  <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
                    <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                      <span>🤖</span> AI Tutor
                    </h3>
                    <button
                      onClick={() => setIsChatOpen(false)}
                      className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                    >
                      <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    </button>
                  </div>

                  {/* Chat Content */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {messages.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-full text-center space-y-3">
                        <p className="text-2xl">💡</p>
                        <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                          Ask Me Anything!
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Questions about your results or concepts?
                        </p>
                      </div>
                    ) : (
                      <>
                        {messages.map((msg, idx) => (
                          <div
                            key={idx}
                            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                                msg.role === "user"
                                  ? "bg-blue-600 text-white rounded-br-none"
                                  : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-bl-none"
                              }`}
                            >
                              <p className="break-words">{msg.content}</p>
                            </div>
                          </div>
                        ))}
                        {isChatLoading && (
                          <div className="flex justify-start">
                            <div className="bg-gray-200 dark:bg-gray-700 px-3 py-2 rounded-lg rounded-bl-none">
                              <div className="flex gap-1">
                                <div className="w-2 h-2 bg-gray-600 dark:bg-gray-400 rounded-full animate-bounce" />
                                <div className="w-2 h-2 bg-gray-600 dark:bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                                <div className="w-2 h-2 bg-gray-600 dark:bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {/* Chat Input */}
                  <div className="p-3 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Ask a question..."
                        className="flex-1 px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onKeyPress={(e) => {
                          if (e.key === "Enter" && e.currentTarget.value.trim()) {
                            handleSendMessage(e.currentTarget.value.trim());
                            e.currentTarget.value = "";
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setIsChatOpen(true)}
                  className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-semibold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
                >
                  <MessageCircle className="w-5 h-5" />
                  Ask AI 🤖
                </button>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile AI Chat Button */}
      <AnimatePresence>
        {!isMobileChat && (
          <motion.button
            onClick={() => setIsMobileChat(true)}
            className="lg:hidden fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full shadow-lg flex items-center justify-center z-40"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <MessageCircle className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Mobile AI Chat Drawer */}
      <AnimatePresence>
        {isMobileChat && (
          <motion.div
            className="lg:hidden fixed bottom-0 left-0 right-0 z-50 rounded-t-2xl shadow-2xl max-h-[80vh] overflow-hidden"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="bg-white dark:bg-gray-800 h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
                <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <span>🤖</span> AI Tutor
                </h3>
                <button
                  onClick={() => setIsMobileChat(false)}
                  className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center space-y-3">
                    <p className="text-2xl">💡</p>
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                      Ask Me Anything!
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Questions about your results or concepts?
                    </p>
                  </div>
                ) : (
                  <>
                    {messages.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                            msg.role === "user"
                              ? "bg-blue-600 text-white rounded-br-none"
                              : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-bl-none"
                          }`}
                        >
                          <p className="break-words">{msg.content}</p>
                        </div>
                      </div>
                    ))}
                    {isChatLoading && (
                      <div className="flex justify-start">
                        <div className="bg-gray-200 dark:bg-gray-700 px-3 py-2 rounded-lg rounded-bl-none">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-gray-600 dark:bg-gray-400 rounded-full animate-bounce" />
                            <div className="w-2 h-2 bg-gray-600 dark:bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                            <div className="w-2 h-2 bg-gray-600 dark:bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Input */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Ask a question..."
                    className="flex-1 px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && e.currentTarget.value.trim()) {
                        handleSendMessage(e.currentTarget.value.trim());
                        e.currentTarget.value = "";
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

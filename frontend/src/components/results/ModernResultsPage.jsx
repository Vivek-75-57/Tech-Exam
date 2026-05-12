import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { SummaryCards } from "./modern/SummaryCards";
import { KeyInsights } from "./modern/KeyInsights";
import { TopicPerformance } from "./modern/TopicPerformance";
import { PerformanceAnalytics } from "./modern/PerformanceAnalytics";
import { QuestionReview } from "./modern/QuestionReview";
import { Recommendations } from "./modern/Recommendations";
import { AiChatAssistant } from "../exam/AiChatAssistant";

export function ModernResultsPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [examResult, setExamResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load exam result from navigation state or storage
  useEffect(() => {
    try {
      setLoading(true);
      console.log("📍 ModernResultsPage loading data...");

      let result = location.state?.examResult;

      if (!result && window.__completeExamResult) {
        result = window.__completeExamResult;
        console.log("✅ Using window.__completeExamResult");
        window.__completeExamResult = null;
      }

      if (!result) {
        const stored = sessionStorage.getItem("examResults");
        if (stored) {
          result = JSON.parse(stored);
        }
      }

      if (!result) {
        const historyStored = localStorage.getItem("examHistory");
        if (historyStored) {
          const history = JSON.parse(historyStored);
          if (history && Array.isArray(history) && history.length > 0) {
            result = history[0];
          }
        }
      }

      if (!result) {
        setError("No exam results found. Please take an exam first.");
        setExamResult(null);
      } else {
        setExamResult(result);
        setError(null);
      }
    } catch (err) {
      console.error("Error loading exam results:", err);
      setError("Failed to load exam results.");
      setExamResult(null);
    } finally {
      setLoading(false);
    }
  }, [location]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-4xl mb-3">📊</div>
          <p className="text-slate-600 dark:text-slate-400">Loading your results...</p>
        </motion.div>
      </div>
    );
  }

  if (error || !examResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <motion.div
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-8 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="text-5xl mb-4">😕</div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              No Results Found
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              {error || "Please take an exam to view your results."}
            </p>
            <button
              onClick={() => navigate("/exam/setup")}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              Take an Exam
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      {/* Back Button */}
      <div className="max-w-6xl mx-auto mb-8">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-2"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
            Exam Results
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            {new Date(examResult.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </motion.div>

        {/* 1. Summary Cards */}
        <SummaryCards examResult={examResult} />

        {/* 2. Key Insights */}
        <KeyInsights examResult={examResult} />

        {/* 3. Topic Performance */}
        <TopicPerformance examResult={examResult} />

        {/* 4. Performance Analytics */}
        <PerformanceAnalytics examResult={examResult} />

        {/* 5. Question Review */}
        {examResult.breakdown && examResult.breakdown.length > 0 && (
          <QuestionReview breakdown={examResult.breakdown} />
        )}

        {/* 6. Recommendations */}
        <Recommendations examResult={examResult} />

        {/* 7. AI Chat Assistant */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow h-[500px]">
            <AiChatAssistant 
              question={`Help me understand this exam: I scored ${examResult.score}% on a ${examResult.totalQuestions} question exam`}
              context={{
                topic: "Exam Review",
                difficulty: "Mixed",
                correctAnswer: `${examResult.correct}/${examResult.totalQuestions} correct`,
                score: `${examResult.score}%`,
              }}
            />
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <button
            onClick={() => navigate("/exam/setup")}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            Take Another Exam
          </button>
          <button
            onClick={() => navigate("/exam-history")}
            className="px-6 py-3 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-white rounded-lg font-medium transition-colors"
          >
            View History
          </button>
        </motion.div>
      </div>
    </div>
  );
}

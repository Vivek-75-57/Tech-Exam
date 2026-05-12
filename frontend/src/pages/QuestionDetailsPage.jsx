import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { MessageCircle, Share2, Bookmark, ChevronRight } from "lucide-react";
import { apiClient } from "../services/apiClient";

export function QuestionDetailsPage() {
  const { id: questionId } = useParams();
  const [showComments, setShowComments] = useState(false);
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock question data as fallback
  const mockQuestion = {
    id: questionId || 1,
    topic: "JavaScript",
    difficulty: "Medium",
    question: "What is a closure in JavaScript?",
    userAnswer: "A function with access to variables from its outer scope",
    correctAnswer: "A function with access to variables from its outer scope",
    isCorrect: true,
    explanation:
      "A closure is a function that has access to variables from another function's scope. This is often used in JavaScript to create private variables and functions.",
    detailedExplanation: `
    A closure in JavaScript is created when a function is defined within another function, 
    and the inner function has access to the outer function's variables through the scope chain.
    
    Key characteristics:
    1. Inner function can access outer function's variables
    2. Outer function's variables are preserved even after the outer function returns
    3. Each closure has its own independent copy of outer variables
    
    Common use cases:
    - Creating private variables and methods
    - Function factories
    - Event handlers and callbacks
    - Module pattern
    `,
    codeExample: `
    function outer(x) {
      function inner(y) {
        return x + y;  // 'inner' accesses 'x' from outer scope
      }
      return inner;
    }
    
    const add5 = outer(5);
    console.log(add5(3));  // Output: 8
    `,
    relatedTopics: ["JavaScript Scope", "Higher Order Functions", "Function Declarations"],
    tags: ["closure", "scope", "function", "interview-question"],
    userPerformance: {
      thisQuestionAccuracy: 75,
      topicAccuracy: 82,
      difficulty: "Medium",
      timeSpent: 45,
    },
  };

  // Fetch question data
  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        setLoading(true);
        setError(null);

        // Try to get from exam session first, then API
        const currentExam = JSON.parse(sessionStorage.getItem("currentExam") || "null");
        if (currentExam?.questions) {
          const foundQuestion = currentExam.questions.find((q) => q.id == questionId);
          if (foundQuestion) {
            setQuestion(foundQuestion);
            return;
          }
        }

        // If not found in session, use mock
        setQuestion(mockQuestion);
      } catch (err) {
        console.error("Error fetching question:", err);
        setError(err.message || "Failed to load question details.");
        setQuestion(mockQuestion);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [questionId]);

  const displayQuestion = question || mockQuestion;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-slate-900 dark:to-slate-950 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading && (
          <motion.div
            className="mb-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-gray-600 dark:text-gray-400">Loading question details...</p>
          </motion.div>
        )}

        {error && (
          <motion.div
            className="mb-8 bg-red-50 dark:bg-red-900/20 border border-red-500 rounded-lg p-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-red-700 dark:text-red-400">{error}</p>
          </motion.div>
        )}

        {!loading && !error && (
          <>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-sm font-bold px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                  {displayQuestion.topic}
                </span>
                <span
                  className={`text-sm font-bold px-3 py-1 rounded-full ${
                    displayQuestion.difficulty === "Easy"
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      : displayQuestion.difficulty === "Medium"
                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                  }`}
                >
                  {displayQuestion.difficulty}
                </span>
                {displayQuestion.isCorrect && (
                  <span className="text-sm font-bold px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full">
                    ✓ Correct
                  </span>
                )}
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {displayQuestion.question}
              </h1>
            </div>

            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <Bookmark className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <Share2 className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div className="space-y-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
          {/* Your Answer */}
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border-l-4 border-green-500"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4">
              Your Answer ✓
            </h3>
            <p className="text-gray-700 dark:text-gray-300">{displayQuestion.userAnswer}</p>
          </motion.div>

          {/* Correct Answer */}
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border-l-4 border-blue-500"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4">
              Correct Answer
            </h3>
            <p className="text-gray-700 dark:text-gray-300">{displayQuestion.correctAnswer}</p>
          </motion.div>

          {/* Explanation */}
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4">
              Explanation
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">{displayQuestion.explanation}</p>
            <details className="cursor-pointer">
              <summary className="font-bold text-blue-600 dark:text-blue-400">
                Read more...
              </summary>
              <p className="mt-4 text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                {displayQuestion.detailedExplanation}
              </p>
            </details>
          </motion.div>

          {/* Code Example */}
          <motion.div
            className="bg-gray-900 rounded-lg p-6 shadow-sm overflow-x-auto"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="font-bold text-lg text-white mb-4">Code Example</h3>
            <pre className="text-gray-300 font-mono text-sm">{displayQuestion.codeExample}</pre>
          </motion.div>

          {/* Performance Insights */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-4 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {[
              { label: "This Question", value: `${displayQuestion.userPerformance.thisQuestionAccuracy}%`, icon: "🎯" },
              { label: "Topic Average", value: `${displayQuestion.userPerformance.topicAccuracy}%`, icon: "📊" },
              { label: "Time Spent", value: `${displayQuestion.userPerformance.timeSpent}s`, icon: "⏱️" },
              { label: "Difficulty", value: displayQuestion.difficulty, icon: "📈" },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                className="bg-blue-50 dark:bg-blue-950 rounded-lg p-4 text-center"
                whileHover={{ y: -5 }}
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {stat.value}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Related Topics */}
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4">
              Related Topics
            </h3>
            <div className="flex flex-wrap gap-3">
              {displayQuestion.relatedTopics.map((topic, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-lg font-semibold flex items-center gap-2"
                >
                  {topic} <ChevronRight className="w-4 h-4" />
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Comments */}
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <button
              onClick={() => setShowComments(!showComments)}
              className="font-bold text-lg text-gray-900 dark:text-white flex items-center gap-2 mb-4"
            >
              <MessageCircle className="w-5 h-5" />
              Comments & Discussions (3)
            </button>
            {showComments && (
              <div className="space-y-4 border-t border-gray-200 dark:border-gray-700 pt-4">
                <p className="text-gray-600 dark:text-gray-400 italic">
                  Discussion feature coming soon...
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
          </>
        )}
      </div>
    </div>
  );
}

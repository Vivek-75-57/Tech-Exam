import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export function QuestionReview({ breakdown }) {
  const [expandedIdx, setExpandedIdx] = useState(null);

  if (!breakdown || breakdown.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.35 }}
      className="space-y-4"
    >
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
        Question Review
      </h2>

      <div className="space-y-3">
        {breakdown.map((q, idx) => {
          const isCorrect = q.isCorrect || q.correct;
          const isExpanded = expandedIdx === idx;

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.35 + idx * 0.03 }}
              className={`
                border rounded-xl transition-all overflow-hidden
                ${
                  isCorrect
                    ? "bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800"
                    : "bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800"
                }
              `}
            >
              {/* Header - Always Visible */}
              <button
                onClick={() => setExpandedIdx(isExpanded ? null : idx)}
                className="w-full p-4 flex items-start gap-3 hover:opacity-80 transition-opacity text-left"
              >
                {/* Status Badge */}
                <div className="flex-shrink-0 mt-1">
                  <span className={`text-xl ${isCorrect ? "" : ""}`}>
                    {isCorrect ? "✓" : "✗"}
                  </span>
                </div>

                {/* Question Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    Q{idx + 1}: {q.question || q.title || "Question"}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                    {q.topic || "General"}
                  </p>
                </div>

                {/* Chevron */}
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                </motion.div>
              </button>

              {/* Expanded Content */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-current border-opacity-20 px-4 py-4 space-y-4"
                  >
                    {/* Your Answer */}
                    <div>
                      <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                        Your Answer
                      </p>
                      <div className={`p-3 rounded-lg text-sm ${
                        isCorrect
                          ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                          : "bg-red-100 dark:bg-red-900/30 text-slate-900 dark:text-red-200"
                      }`}>
                        {q.selectedAnswer !== undefined
                          ? q.selectedAnswer !== -1
                            ? `Option ${q.selectedAnswer + 1}`
                            : "Not answered"
                          : q.userAnswer || "Not provided"}
                      </div>
                    </div>

                    {/* Correct Answer */}
                    {!isCorrect && (
                      <div>
                        <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                          Correct Answer
                        </p>
                        <div className="p-3 rounded-lg text-sm bg-green-100 dark:bg-green-900/30 text-slate-900 dark:text-green-200">
                          {q.correctAnswer !== undefined
                            ? `Option ${q.correctAnswer + 1}`
                            : q.explanation || "Check the explanation"}
                        </div>
                      </div>
                    )}

                    {/* Explanation */}
                    {q.explanation && (
                      <div>
                        <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                          Explanation
                        </p>
                        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                          {q.explanation}
                        </p>
                      </div>
                    )}

                    {/* Time Spent */}
                    {q.timeSpent && (
                      <div className="pt-2 border-t border-current border-opacity-20">
                        <p className="text-xs text-slate-600 dark:text-slate-400">
                          ⏱ Time spent: {q.timeSpent}s
                        </p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

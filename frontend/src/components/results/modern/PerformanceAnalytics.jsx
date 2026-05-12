import React from "react";
import { motion } from "framer-motion";

export function PerformanceAnalytics({ examResult }) {
  // Calculate analytics
  const accuracy = examResult.correctAnswers / (examResult.questions || 1);
  const avgTimePerQuestion = examResult.timeSeconds
    ? Math.round(examResult.timeSeconds / (examResult.questions || 1))
    : 0;

  const analytics = [
    {
      label: "Total Questions",
      value: examResult.questions || 0,
      icon: "📋",
    },
    {
      label: "Accuracy Rate",
      value: `${Math.round(accuracy * 100)}%`,
      icon: "🎯",
    },
    {
      label: "Avg Time/Question",
      value: `${avgTimePerQuestion}s`,
      icon: "⏱",
    },
    {
      label: "Questions Answered",
      value: examResult.totalAnswered || 0,
      icon: "✓",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="grid md:grid-cols-2 gap-4"
    >
      {analytics.map((stat, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.3 + idx * 0.05 }}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 transition-all hover:shadow-md hover:border-slate-300 dark:hover:border-slate-600"
        >
          <div className="flex items-center gap-3">
            <span className="text-3xl">{stat.icon}</span>
            <div className="flex-1">
              <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
                {stat.label}
              </p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                {stat.value}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

import React from "react";
import { motion } from "framer-motion";

export function TopicPerformance({ examResult }) {
  const topics = examResult.topicScores || [];

  if (!topics || topics.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.25 }}
      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-6"
    >
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">
        Topic Performance
      </h2>

      <div className="space-y-4">
        {topics.map((topic, idx) => {
          const percentage = topic.percentage || (topic.correct / topic.total) * 100 || 0;
          const topicName = topic.topic || topic.name || `Topic ${idx + 1}`;

          // Color based on performance
          let barColor = "bg-red-500";
          if (percentage >= 80) barColor = "bg-green-500";
          else if (percentage >= 60) barColor = "bg-blue-500";
          else if (percentage >= 40) barColor = "bg-amber-500";

          return (
            <motion.div
              key={topicName}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.25 + idx * 0.05 }}
              className="space-y-2"
            >
              {/* Topic header */}
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-900 dark:text-white">
                  {topicName}
                </p>
                <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                  {Math.round(percentage)}%
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${barColor}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 0.8, delay: 0.3 + idx * 0.05 }}
                />
              </div>

              {/* Stats */}
              {topic.correct !== undefined && topic.total !== undefined && (
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  {topic.correct} of {topic.total} correct
                </p>
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

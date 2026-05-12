import React from "react";
import { motion } from "framer-motion";

export function Recommendations({ examResult }) {
  const recommendations = [];

  // Weak areas recommendation
  if (examResult.weakAreas && examResult.weakAreas.length > 0) {
    recommendations.push({
      type: "focus",
      icon: "📌",
      title: "Focus on Weak Areas",
      description: `Review these topics: ${examResult.weakAreas.slice(0, 3).join(", ")}`,
      action: "View Topic Details",
    });
  }

  // Performance-based recommendation
  if (examResult.score < 60) {
    recommendations.push({
      type: "practice",
      icon: "🔄",
      title: "Practice More",
      description: "Take more exams to improve your understanding and retention.",
      action: "Take Another Exam",
    });
  } else if (examResult.score < 80) {
    recommendations.push({
      type: "improve",
      icon: "📈",
      title: "Keep Improving",
      description: "You're on the right track. Target the topics you missed.",
      action: "Review Weak Areas",
    });
  } else {
    recommendations.push({
      type: "advance",
      icon: "🚀",
      title: "Advanced Topics",
      description: "Ready to level up? Try more difficult exams.",
      action: "Try Advanced Exam",
    });
  }

  // Speed-based recommendation
  if (examResult.timeSeconds) {
    const avgTime = examResult.timeSeconds / (examResult.questions || 1);
    if (avgTime > 180) {
      recommendations.push({
        type: "speed",
        icon: "⚡",
        title: "Improve Speed",
        description: "Try to answer questions faster while maintaining accuracy.",
        action: "Practice Tips",
      });
    }
  }

  // Limit to 3 recommendations
  const displayRecs = recommendations.slice(0, 3);

  if (displayRecs.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="space-y-4"
    >
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
        Recommendations
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        {displayRecs.map((rec, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.4 + idx * 0.05 }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 transition-all hover:shadow-md hover:border-slate-300 dark:hover:border-slate-600"
          >
            <div className="flex items-start gap-3 mb-3">
              <span className="text-2xl">{rec.icon}</span>
              <h3 className="font-semibold text-slate-900 dark:text-white text-sm">
                {rec.title}
              </h3>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              {rec.description}
            </p>

            <button className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
              {rec.action} →
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

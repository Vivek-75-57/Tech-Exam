import React from "react";
import { motion } from "framer-motion";

export function KeyInsights({ examResult }) {
  const insights = [];

  // Strong performance insight
  if (examResult.score >= 80) {
    insights.push({
      type: "success",
      icon: "🎯",
      text: "Excellent performance! You're mastering the material.",
    });
  } else if (examResult.score >= 60) {
    insights.push({
      type: "info",
      icon: "📈",
      text: "Good progress. Focus on weak areas to improve further.",
    });
  } else {
    insights.push({
      type: "warning",
      icon: "⚠️",
      text: "There's room for improvement. Review the explanations below.",
    });
  }

  // Accuracy insight
  const accuracy = examResult.correctAnswers / (examResult.questions || 1);
  if (accuracy >= 0.8) {
    insights.push({
      type: "success",
      icon: "✓",
      text: `Strong accuracy: ${(accuracy * 100).toFixed(0)}% of answers correct.`,
    });
  } else if (accuracy >= 0.5) {
    insights.push({
      type: "info",
      icon: "•",
      text: `Average accuracy: ${(accuracy * 100).toFixed(0)}% of answers correct.`,
    });
  }

  // Speed insight
  if (examResult.timeSeconds) {
    const avgTimePerQuestion = examResult.timeSeconds / (examResult.questions || 1);
    if (avgTimePerQuestion < 30) {
      insights.push({
        type: "success",
        icon: "⚡",
        text: "Fast solving speed. Consider spending more time on difficult questions.",
      });
    } else if (avgTimePerQuestion > 120) {
      insights.push({
        type: "info",
        icon: "⏱",
        text: "Methodical approach. Good for complex topics.",
      });
    }
  }

  // Weak areas insight
  if (examResult.weakAreas && examResult.weakAreas.length > 0) {
    insights.push({
      type: "warning",
      icon: "📌",
      text: `Focus on: ${examResult.weakAreas.slice(0, 2).join(", ")}`,
    });
  }

  // Limit to 4 insights
  const displayInsights = insights.slice(0, 4);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="space-y-3"
    >
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
        Key Insights
      </h2>
      <div className="grid gap-3">
        {displayInsights.map((insight, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 + idx * 0.05 }}
            className={`
              flex gap-3 p-4 rounded-xl border transition-all
              ${
                insight.type === "success"
                  ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                  : insight.type === "warning"
                  ? "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800"
                  : "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
              }
            `}
          >
            <span className="text-lg flex-shrink-0 mt-0.5">{insight.icon}</span>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              {insight.text}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

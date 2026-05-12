import React from "react";
import { motion } from "framer-motion";

export function SummaryCards({ examResult }) {
  const cards = [
    {
      label: "Score",
      value: `${examResult.score || 0}%`,
      icon: "📈",
      color: "bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800",
    },
    {
      label: "Accuracy",
      value: `${examResult.correctAnswers}/${examResult.questions || 0}`,
      icon: "✓",
      color: "bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800",
    },
    {
      label: "Time Taken",
      value: examResult.time || "0s",
      icon: "⏱",
      color: "bg-purple-50 dark:bg-purple-900/30 border-purple-200 dark:border-purple-800",
    },
    {
      label: "Difficulty",
      value: examResult.difficulty || "Medium",
      icon: "📊",
      color: "bg-amber-50 dark:bg-amber-900/30 border-amber-200 dark:border-amber-800",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-4"
    >
      {cards.map((card, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 + idx * 0.05 }}
          className={`${card.color} border rounded-2xl p-4 transition-all hover:shadow-md`}
        >
          <p className="text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
            {card.label}
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl">{card.icon}</span>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">
              {card.value}
            </p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

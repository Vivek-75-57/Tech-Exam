import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, TrendingUp, HelpCircle } from "lucide-react";

const STAT_CONFIG = [
  {
    key: "correct",
    label: "Correct Answers",
    icon: CheckCircle,
    color: "text-green-600 dark:text-green-400",
    bgColor: "bg-green-50 dark:bg-green-950",
    borderColor: "border-l-green-500",
    value: (stats) => stats.correct,
    trend: "up",
  },
  {
    key: "incorrect",
    label: "Incorrect Answers",
    icon: XCircle,
    color: "text-red-600 dark:text-red-400",
    bgColor: "bg-red-50 dark:bg-red-950",
    borderColor: "border-l-red-500",
    value: (stats) => stats.incorrect,
    trend: "down",
  },
  {
    key: "accuracy",
    label: "Accuracy",
    icon: TrendingUp,
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-50 dark:bg-blue-950",
    borderColor: "border-l-blue-500",
    value: (stats) => `${stats.percentage}%`,
    trend: "up",
  },
  {
    key: "total",
    label: "Total Questions",
    icon: HelpCircle,
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-50 dark:bg-purple-950",
    borderColor: "border-l-purple-500",
    value: (stats) => stats.total,
    trend: "neutral",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.1,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

const numberVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

export function StatsCards({ stats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {STAT_CONFIG.map((config, idx) => {
        const Icon = config.icon;
        const value = config.value(stats);

        return (
          <motion.div
            key={config.key}
            custom={idx}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.15)" }}
            className={`${config.bgColor} border-l-4 ${config.borderColor} rounded-lg p-6 shadow-sm transition-all duration-300`}
          >
            <div className="flex items-start justify-between mb-4">
              <motion.div
                className={`p-3 rounded-lg bg-white dark:bg-gray-800`}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <Icon className={`w-6 h-6 ${config.color}`} />
              </motion.div>
            </div>

            <motion.div
              className={`text-3xl font-bold ${config.color} mb-2`}
              variants={numberVariants}
              initial="hidden"
              animate="visible"
            >
              {value}
            </motion.div>

            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium mb-3">
              {config.label}
            </p>

            {/* Trend Indicator */}
            <div className="flex items-center gap-1 text-xs">
              {config.trend === "up" && (
                <span className="text-green-600 dark:text-green-400 font-semibold">↑ On track</span>
              )}
              {config.trend === "down" && (
                <span className="text-orange-600 dark:text-orange-400 font-semibold">↓ Needs focus</span>
              )}
              {config.trend === "neutral" && (
                <span className="text-gray-600 dark:text-gray-400 font-semibold">→ Balanced</span>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

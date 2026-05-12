import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, Trophy, Target, ThumbsUp, TrendingUp } from "lucide-react";

const GRADE_CONFIG = {
  Outstanding: { icon: "Trophy", color: "from-cyan-400 to-blue-500", borderColor: "border-cyan-400" },
  Excellent: { icon: "Target", color: "from-green-400 to-emerald-500", borderColor: "border-green-400" },
  Good: { icon: "ThumbsUp", color: "from-yellow-400 to-orange-400", borderColor: "border-yellow-400" },
  Satisfactory: { icon: "TrendingUp", color: "from-orange-400 to-red-400", borderColor: "border-orange-400" },
};

const getGradeIcon = (grade) => {
  const iconMap = {
    Trophy,
    Target,
    ThumbsUp,
    TrendingUp,
  };
  const iconName = GRADE_CONFIG[grade]?.icon || "TrendingUp";
  return iconMap[iconName];
};

export function ExamSuccessModal({ examResult, onViewResults, onReturnHome }) {
  const gradeConfig = GRADE_CONFIG[examResult?.grade] || GRADE_CONFIG.Satisfactory;
  const timeFormatted = examResult?.time || "0 minutes";

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        {/* Header with gradient */}
        <div className={`bg-gradient-to-r ${gradeConfig.color} p-8 pt-12 pb-8 text-center relative`}>
          {/* Animated background elements */}
          <motion.div
            className="absolute top-0 right-0 w-32 h-32 opacity-20"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-full h-full rounded-full bg-white blur-2xl" />
          </motion.div>

          {/* Checkmark animation */}
          <motion.div
            className="relative z-10 mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 100 }}
          >
            <CheckCircle className="w-16 h-16 mx-auto text-white drop-shadow-lg" />
          </motion.div>

          <motion.h2
            className="text-3xl font-bold text-white mb-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Exam Submitted!
          </motion.h2>

          <motion.p
            className="text-white/90 text-sm font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Your results have been saved
          </motion.p>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          {/* Grade section */}
          <motion.div
            className="text-center space-y-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {React.createElement(getGradeIcon(examResult?.grade), {
              className: "w-16 h-16 mx-auto text-current"
            })}
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{examResult?.grade}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Performance Grade</p>
            </div>
          </motion.div>

          {/* Score cards */}
          <motion.div
            className="grid grid-cols-3 gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {/* Score */}
            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4 text-center border border-blue-200 dark:border-blue-800">
              <motion.div
                className="text-2xl font-bold text-blue-600 dark:text-blue-400"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4, delay: 0.7, type: "spring" }}
              >
                {examResult?.score}%
              </motion.div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Score</p>
            </div>

            {/* Correct answers */}
            <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-4 text-center border border-green-200 dark:border-green-800">
              <motion.div
                className="text-2xl font-bold text-green-600 dark:text-green-400"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4, delay: 0.75, type: "spring" }}
              >
                {examResult?.correctAnswers}
              </motion.div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Correct</p>
            </div>

            {/* Time */}
            <div className="bg-purple-50 dark:bg-purple-900/30 rounded-lg p-4 text-center border border-purple-200 dark:border-purple-800">
              <motion.div
                className="text-2xl font-bold text-purple-600 dark:text-purple-400"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4, delay: 0.8, type: "spring" }}
              >
                {timeFormatted.split(" ")[0]}
                <span className="text-xs">m</span>
              </motion.div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Time Taken</p>
            </div>
          </motion.div>

          {/* Divider */}
          <div className="h-px bg-gray-200 dark:bg-gray-700" />

          {/* Action buttons */}
          <motion.div
            className="space-y-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.85 }}
          >
            <button
              onClick={onViewResults}
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
            >
              View Detailed Results
            </button>

            <button
              onClick={onReturnHome}
              className="w-full py-2 px-4 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-medium rounded-lg transition-all duration-200"
            >
              Return to Home
            </button>
          </motion.div>

          {/* Footer text */}
          <motion.p
            className="text-xs text-center text-gray-500 dark:text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            Your exam has been saved to your history. You can review it anytime.
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
}

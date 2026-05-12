import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";

const GRADE_CONFIG = {
  Outstanding: {
    emoji: "🏆",
    gradient: "from-cyan-400 to-blue-500",
    bgGradient: "bg-gradient-to-r from-cyan-400 to-blue-500",
    message: "Exceptional performance!",
    trend: "up",
    color: "text-cyan-600 dark:text-cyan-400",
  },
  Excellent: {
    emoji: "🎯",
    gradient: "from-green-400 to-emerald-500",
    bgGradient: "bg-gradient-to-r from-green-400 to-emerald-500",
    message: "Great job! Keep it up!",
    trend: "up",
    color: "text-green-600 dark:text-green-400",
  },
  Good: {
    emoji: "👍",
    gradient: "from-yellow-400 to-orange-400",
    bgGradient: "bg-gradient-to-r from-yellow-400 to-orange-400",
    message: "Good effort! On the right track!",
    trend: "up",
    color: "text-yellow-600 dark:text-yellow-400",
  },
  Satisfactory: {
    emoji: "📈",
    gradient: "from-orange-400 to-red-400",
    bgGradient: "bg-gradient-to-r from-orange-400 to-red-400",
    message: "Keep practicing to improve!",
    trend: "neutral",
    color: "text-orange-600 dark:text-orange-400",
  },
};

const progressBarVariants = {
  initial: { scaleX: 0, originX: 0 },
  animate: { scaleX: 1, transition: { duration: 1.5, ease: "easeOut" } },
};

const numberVariants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
};

export function HeroCard({ stats }) {
  const config = GRADE_CONFIG[stats.grade] || GRADE_CONFIG.Satisfactory;
  const improvement = Math.random() * 20 - 5; // Mock improvement percentage

  return (
    <motion.div
      className={`${config.bgGradient} rounded-2xl px-8 py-12 text-white shadow-lg relative overflow-hidden`}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* Animated background elements */}
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 opacity-20"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <div className="w-full h-full rounded-full bg-white blur-3xl" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-2xl mx-auto space-y-6">
        {/* Animated Icon */}
        <motion.div
          className="text-7xl"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {config.emoji}
        </motion.div>

        {/* Grade Label */}
        <motion.h2
          className="text-5xl sm:text-6xl font-bold text-white drop-shadow-lg"
          variants={numberVariants}
          initial="initial"
          animate="animate"
        >
          {stats.grade}
        </motion.h2>

        {/* Score */}
        <motion.div
          className="text-xl font-semibold text-white/90"
          variants={numberVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.1 }}
        >
          {stats.correct} / {stats.total} Correct
        </motion.div>

        {/* Large Percentage */}
        <motion.div className="py-4">
          <motion.div
            className="text-8xl font-black text-white drop-shadow-lg"
            variants={numberVariants}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.2 }}
          >
            {stats.percentage}%
          </motion.div>
        </motion.div>

        {/* Progress Bar */}
        <motion.div className="w-full bg-white/20 rounded-full h-3 overflow-hidden backdrop-blur-sm">
          <motion.div
            className="h-full bg-white/80 rounded-full"
            variants={progressBarVariants}
            initial="initial"
            animate="animate"
            style={{ width: `${stats.percentage}%` }}
          />
        </motion.div>

        {/* Improvement Message */}
        <motion.div
          className="flex items-center justify-center gap-2 text-sm font-semibold"
          variants={numberVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.3 }}
        >
          {improvement > 0 ? (
            <>
              <TrendingUp className="w-5 h-5" />
              <span>{improvement > 0 ? `↑ ${improvement.toFixed(0)}% Better` : `↓ ${Math.abs(improvement).toFixed(0)}% Needs work`}</span>
            </>
          ) : (
            <>
              <TrendingDown className="w-5 h-5" />
              <span>{Math.abs(improvement).toFixed(0)}% Focus on weak areas</span>
            </>
          )}
        </motion.div>

        {/* Message */}
        <motion.p
          className="text-lg text-white/95 font-medium"
          variants={numberVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.4 }}
        >
          {config.message}
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex gap-4 justify-center pt-4 flex-wrap"
          variants={numberVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.5 }}
        >
          <button className="px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/40 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg">
            View Details
          </button>
          <button className="px-6 py-3 bg-white text-blue-600 hover:bg-gray-100 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg">
            Next Exam
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}

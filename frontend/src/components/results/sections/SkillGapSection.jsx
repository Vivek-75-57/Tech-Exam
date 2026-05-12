import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle, Target, BookOpen } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function SkillGapSection({ stats }) {
  const { topicScores, weakAreas } = stats;

  // Separate strong and weak areas
  const strongAreas = topicScores
    ?.filter((t) => t.percentage >= 70)
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 3) || [];

  const needsFocus = topicScores
    ?.filter((t) => t.percentage < 70)
    .sort((a, b) => a.percentage - b.percentage)
    .slice(0, 3) || [];

  // Generate next steps
  const nextSteps = [
    {
      step: 1,
      title: "Focus on Weak Areas",
      description: needsFocus[0]?.topic || "Review fundamentals",
      icon: "🎯",
      color: "from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950",
      borderColor: "border-orange-500",
    },
    {
      step: 2,
      title: "Deepen Strong Topics",
      description: strongAreas[0]?.topic || "Advanced concepts",
      icon: "🚀",
      color: "from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950",
      borderColor: "border-green-500",
    },
    {
      step: 3,
      title: "Take Practice Tests",
      description: "Reinforce all topics",
      icon: "📝",
      color: "from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950",
      borderColor: "border-blue-500",
    },
  ];

  return (
    <motion.div
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Section Title */}
      <div className="flex items-center gap-3">
        <Target className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Skill Gap Analysis</h2>
      </div>

      {/* Weak Areas */}
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border-l-4 border-red-500"
        variants={itemVariants}
      >
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
          Areas Needing Focus
        </h3>

        {needsFocus.length > 0 ? (
          <motion.div className="space-y-4" variants={containerVariants} initial="hidden" animate="visible">
            {needsFocus.map((area, idx) => (
              <motion.div
                key={idx}
                className="bg-red-50 dark:bg-red-950 rounded-lg p-4 border border-red-200 dark:border-red-800"
                variants={itemVariants}
                whileHover={{ x: 5 }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-red-900 dark:text-red-100">
                      {area.topic}
                    </h4>
                    <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                      {area.correct}/{area.total} correct — Only {area.percentage}%
                    </p>
                  </div>
                  <span className="text-2xl font-bold text-red-600 dark:text-red-400">
                    {area.percentage}%
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-red-200 dark:bg-red-900 rounded-full h-2 mb-3 overflow-hidden">
                  <motion.div
                    className="h-full bg-red-600 dark:bg-red-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${area.percentage}%` }}
                    transition={{ duration: 1, delay: idx * 0.1 }}
                  />
                </div>

                {/* Recommendation */}
                <div className="text-xs text-red-700 dark:text-red-300 space-y-1">
                  <p>
                    <span className="font-semibold">📌 Recommendation:</span> Study core
                    concepts
                  </p>
                  <p>
                    <span className="font-semibold">⏱️ Est. Time:</span> 5-7 hours
                  </p>
                  <p>
                    <span className="font-semibold">📚 Resources:</span> Official docs,
                    video tutorials
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <p className="text-gray-600 dark:text-gray-400">Great job! All topics are above 70%</p>
        )}
      </motion.div>

      {/* Strong Areas */}
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border-l-4 border-green-500"
        variants={itemVariants}
      >
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
          Strong Areas
        </h3>

        {strongAreas.length > 0 ? (
          <motion.div className="space-y-4" variants={containerVariants} initial="hidden" animate="visible">
            {strongAreas.map((area, idx) => (
              <motion.div
                key={idx}
                className="bg-green-50 dark:bg-green-950 rounded-lg p-4 border border-green-200 dark:border-green-800"
                variants={itemVariants}
                whileHover={{ x: 5 }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-green-900 dark:text-green-100">
                      {area.topic}
                    </h4>
                    <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                      {area.correct}/{area.total} correct — {area.percentage}% accuracy
                    </p>
                  </div>
                  <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                    ✓
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-green-200 dark:bg-green-900 rounded-full h-2 overflow-hidden">
                  <motion.div
                    className="h-full bg-green-600 dark:bg-green-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${area.percentage}%` }}
                    transition={{ duration: 1, delay: idx * 0.1 }}
                  />
                </div>

                <p className="text-xs text-green-700 dark:text-green-300 mt-3 font-semibold">
                  ⭐ Excellent performance - Keep up the great work!
                </p>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <p className="text-gray-600 dark:text-gray-400">No strong areas yet. Keep studying!</p>
        )}
      </motion.div>

      {/* Next Steps */}
      <motion.div
        className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 rounded-lg p-6 border-l-4 border-blue-500"
        variants={itemVariants}
      >
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          Recommended Next Steps
        </h3>

        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-4" variants={containerVariants} initial="hidden" animate="visible">
          {nextSteps.map((plan, idx) => (
            <motion.div
              key={idx}
              className={`bg-gradient-to-br ${plan.color} rounded-lg p-5 text-center border-b-4 ${plan.borderColor}`}
              variants={itemVariants}
              whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="text-4xl mb-3">{plan.icon}</div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                Step {plan.step}: {plan.title}
              </h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {plan.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Learning Path */}
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
        variants={itemVariants}
      >
        <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <span>🗺️</span> Your Learning Path
        </h4>
        <div className="flex items-center justify-between text-sm">
          {["Weak Topics", "Core Concepts", "Advanced Topics"].map((stage, idx) => (
            <motion.div
              key={idx}
              className="text-center flex-1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
            >
              <div className="text-lg mb-2">{["📌", "📚", "🚀"][idx]}</div>
              <p className="font-medium text-gray-900 dark:text-white text-xs">{stage}</p>
              {idx < 2 && (
                <div className="hidden md:block text-gray-400 text-lg absolute -right-1">
                  →
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

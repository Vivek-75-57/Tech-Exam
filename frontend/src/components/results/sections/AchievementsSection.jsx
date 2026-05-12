import React from "react";
import { motion } from "framer-motion";
import { Award, Star, Zap } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, type: "spring", stiffness: 100 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function AchievementsSection({ stats }) {
  // Generate dynamic achievements based on performance
  const achievements = [
    {
      id: 1,
      title: "Speed Demon",
      description: "Complete exam in under 2 minutes per question",
      icon: "🏃",
      unlocked: stats.percentage > 70,
      color: "from-orange-100 to-red-100 dark:from-orange-950 dark:to-red-950",
    },
    {
      id: 2,
      title: "Accuracy Master",
      description: "Score 80% or higher",
      icon: "🎯",
      unlocked: stats.percentage >= 80,
      color: "from-green-100 to-emerald-100 dark:from-green-950 dark:to-emerald-950",
    },
    {
      id: 3,
      title: "Consistency Champion",
      description: "Take 5+ exams in one week",
      icon: "🔄",
      unlocked: false,
      color: "from-blue-100 to-cyan-100 dark:from-blue-950 dark:to-cyan-950",
    },
    {
      id: 4,
      title: "Knowledge Seeker",
      description: "Master 3+ different topics",
      icon: "📚",
      unlocked: stats.topicScores?.filter((t) => t.percentage > 70).length >= 3,
      color: "from-purple-100 to-pink-100 dark:from-purple-950 dark:to-pink-950",
    },
    {
      id: 5,
      title: "Perfect Streak",
      description: "Get 10 correct answers in a row",
      icon: "⚡",
      unlocked: false,
      color: "from-yellow-100 to-orange-100 dark:from-yellow-950 dark:to-orange-950",
    },
    {
      id: 6,
      title: "Rising Star",
      description: "Improve by 20% from previous exam",
      icon: "⭐",
      unlocked: false,
      color: "from-indigo-100 to-blue-100 dark:from-indigo-950 dark:to-blue-950",
    },
  ];

  // Certification progress
  const certifications = [
    {
      name: "Python Mastery",
      progress: 85,
      topics: 4,
      totalTopics: 5,
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "JavaScript Expert",
      progress: 65,
      topics: 3,
      totalTopics: 5,
      color: "from-yellow-500 to-orange-500",
    },
    {
      name: "System Design",
      progress: 40,
      topics: 2,
      totalTopics: 5,
      color: "from-purple-500 to-pink-500",
    },
  ];

  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <motion.div
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Section Title */}
      <div className="flex items-center gap-3">
        <Award className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Achievements</h2>
        <motion.span
          className="ml-auto text-sm font-semibold text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-950 px-3 py-1 rounded-full"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
        >
          {unlockedCount}/{achievements.length} Unlocked
        </motion.span>
      </div>

      {/* Overview Stats */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950 dark:to-orange-950 rounded-lg p-6 text-center border-b-4 border-yellow-500"
          variants={itemVariants}
          whileHover={{ y: -5 }}
        >
          <div className="text-4xl mb-2">🏆</div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Achievements</p>
          <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
            {unlockedCount}
          </p>
        </motion.div>

        <motion.div
          className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 rounded-lg p-6 text-center border-b-4 border-green-500"
          variants={itemVariants}
          whileHover={{ y: -5 }}
          transition={{ delay: 0.1 }}
        >
          <div className="text-4xl mb-2">📊</div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Current Streak</p>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">5 Days</p>
        </motion.div>

        <motion.div
          className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 rounded-lg p-6 text-center border-b-4 border-blue-500"
          variants={itemVariants}
          whileHover={{ y: -5 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-4xl mb-2">⚡</div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Exams Taken</p>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">12</p>
        </motion.div>
      </motion.div>

      {/* Badges */}
      <motion.div className="space-y-4" variants={containerVariants} initial="hidden" animate="visible">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Star className="w-6 h-6 text-yellow-500" />
          Badges
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((achievement) => (
            <motion.div
              key={achievement.id}
              className={`bg-gradient-to-br ${achievement.color} rounded-lg p-6 transition-all duration-300 ${
                achievement.unlocked
                  ? "border-2 border-yellow-400 shadow-lg"
                  : "border-2 border-gray-300 opacity-60"
              }`}
              variants={badgeVariants}
              whileHover={achievement.unlocked ? { scale: 1.05, rotate: 5 } : {}}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-5xl">{achievement.icon}</div>
                {achievement.unlocked && (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="text-2xl"
                  >
                    ✨
                  </motion.div>
                )}
              </div>

              <h4 className="font-bold text-gray-900 dark:text-white mb-2 text-lg">
                {achievement.title}
              </h4>

              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                {achievement.description}
              </p>

              <div className="flex items-center justify-between text-xs">
                {achievement.unlocked ? (
                  <span className="font-semibold text-green-600 dark:text-green-400 flex items-center gap-1">
                    ✓ Unlocked
                  </span>
                ) : (
                  <span className="text-gray-600 dark:text-gray-400">Locked</span>
                )}
                <span className="text-gray-600 dark:text-gray-400">
                  {achievement.unlocked ? "Completed" : "In progress"}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Certification Progress */}
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
        variants={itemVariants}
      >
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <span>📜</span> Certification Progress
        </h3>

        <motion.div
          className="space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {certifications.map((cert, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  {cert.name}
                </h4>
                <span className="text-sm font-bold text-gray-600 dark:text-gray-400">
                  {cert.topics}/{cert.totalTopics}
                </span>
              </div>

              <div className="relative w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden shadow-inner">
                <motion.div
                  className={`h-full bg-gradient-to-r ${cert.color} rounded-full`}
                  initial={{ width: 0 }}
                  animate={{ width: `${cert.progress}%` }}
                  transition={{ duration: 1, delay: idx * 0.1, ease: "easeOut" }}
                />
              </div>

              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                {cert.progress}% complete
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Next Milestones */}
      <motion.div
        className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 rounded-lg p-6 border-l-4 border-purple-500"
        variants={itemVariants}
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          Next Milestones
        </h3>

        <motion.div className="space-y-3" variants={containerVariants} initial="hidden" animate="visible">
          {[
            "Unlock 8 achievements (2 more to go!)",
            "Complete 5 consecutive days (3 more days!)",
            "Master System Design topic (40% → 70%)",
          ].map((milestone, idx) => (
            <motion.div
              key={idx}
              className="flex items-center gap-3"
              variants={itemVariants}
            >
              <span className="text-lg">🎯</span>
              <span className="text-sm text-gray-700 dark:text-gray-300">{milestone}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

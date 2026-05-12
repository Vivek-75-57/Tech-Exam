import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Award, Target, BookOpen } from "lucide-react";
import { apiClient } from "../services/apiClient";

export function TopicMasteryPage() {
  const [topicsData, setTopicsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMastery = async () => {
      try {
        setLoading(true);
        const data = await apiClient.getTopicMastery();
        setTopicsData(data);
      } catch (err) {
        console.error("Error fetching topic mastery:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMastery();
  }, []);

  const mockTopics = [
    { name: "JavaScript", progress: 85, exams: 12, avgScore: 82, lastExam: "2 days ago" },
    { name: "React", progress: 72, exams: 8, avgScore: 75, lastExam: "5 days ago" },
    { name: "Python", progress: 65, exams: 6, avgScore: 68, lastExam: "1 week ago" },
    { name: "System Design", progress: 45, exams: 3, avgScore: 52, lastExam: "2 weeks ago" },
    { name: "TypeScript", progress: 78, exams: 7, avgScore: 81, lastExam: "3 days ago" },
    { name: "SQL/Databases", progress: 91, exams: 5, avgScore: 89, lastExam: "4 days ago" },
  ];

  const topics = topicsData?.topics || mockTopics;
  const overall = topicsData?.overall || {
    avgProgress: Math.round(mockTopics.reduce((sum, t) => sum + t.progress, 0) / mockTopics.length),
    topicsMastered: mockTopics.filter(t => t.progress >= 80).length,
    totalExams: mockTopics.reduce((sum, t) => sum + t.exams, 0),
  };

  const getColor = (progress) => {
    if (progress >= 80) return "from-green-500 to-emerald-500";
    if (progress >= 60) return "from-yellow-500 to-orange-500";
    if (progress >= 40) return "from-orange-500 to-red-500";
    return "from-red-500 to-pink-500";
  };

  const getMasteryLevel = (progress) => {
    if (progress >= 90) return "Master";
    if (progress >= 75) return "Expert";
    if (progress >= 60) return "Proficient";
    if (progress >= 40) return "Intermediate";
    return "Beginner";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading topic mastery data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-slate-900 dark:to-slate-950 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Topic Mastery Progress
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Track your proficiency in each topic
          </p>
        </motion.div>

        {error && (
          <div className="text-center text-red-500 mb-8">
            <p>Error loading data: {error}</p>
          </div>
        )}

        {/* Topics Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1, delayChildren: 0.3 }}
        >
          {topics.map((topic, idx) => (
            <motion.div
              key={idx}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-lg transition-all"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    {topic.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {getMasteryLevel(topic.progress)}
                  </p>
                </div>
                <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {topic.progress}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                  <motion.div
                    className={`h-full bg-gradient-to-r ${getColor(topic.progress)}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${topic.progress}%` }}
                    transition={{ duration: 1, delay: idx * 0.1 }}
                  />
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                {[
                  { icon: "📋", label: "Exams", value: topic.exams },
                  { icon: "📊", label: "Avg Score", value: `${topic.avgScore}%` },
                  { icon: "⏰", label: "Last Exam", value: topic.lastExam },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <p className="text-2xl mb-1">{stat.icon}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{stat.label}</p>
                    <p className="font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold"
              >
                Take Exam
              </motion.button>
            </motion.div>
          ))}
        </motion.div>

        {/* Roadmap */}
        <motion.div
          className="mt-16 bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-2">
            <Target className="w-6 h-6 text-blue-600" />
            Your Learning Roadmap
          </h2>

          <div className="space-y-4">
            {[
              { step: 1, topic: "SQL/Databases", status: "Mastered", progress: 91 },
              { step: 2, topic: "JavaScript", status: "Expert", progress: 85 },
              { step: 3, topic: "TypeScript", status: "Expert", progress: 78 },
              { step: 4, topic: "React", status: "Proficient", progress: 72 },
              { step: 5, topic: "Python", status: "Proficient", progress: 65 },
              { step: 6, topic: "System Design", status: "In Progress", progress: 45 },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="flex items-center gap-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + idx * 0.05 }}
              >
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  {item.step}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 dark:text-white">{item.topic}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{item.status}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-blue-600">{item.progress}%</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

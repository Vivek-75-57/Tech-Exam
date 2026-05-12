import React from "react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { TrendingUp, PieChart as PieChartIcon } from "lucide-react";

const COLORS = {
  green: "#10b981",
  yellow: "#f59e0b",
  red: "#ef4444",
  blue: "#3b82f6",
  purple: "#8b5cf6",
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const chartVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export function ChartsSection({ stats }) {
  // Transform topic data for chart
  const topicChartData = (stats.topicScores || [])
    .slice(0, 5)
    .map((topic) => ({
      topic: topic.topic || "Unknown",
      percentage: topic.percentage || 0,
      correct: topic.correct || 0,
      total: topic.total || 0,
    }))
    .sort((a, b) => b.percentage - a.percentage);

  // Difficulty distribution (mock data - adjust based on actual data)
  const difficultyData = [
    { name: "Easy", value: 40, color: "#9ca3af" },
    { name: "Medium", value: 40, color: "#3b82f6" },
    { name: "Hard", value: 20, color: "#f097a0" },
  ];

  // Determine bar colors based on percentage
  const getTopicColor = (percentage) => {
    if (percentage >= 80) return COLORS.green;
    if (percentage >= 60) return COLORS.yellow;
    if (percentage >= 40) return COLORS.yellow;
    return COLORS.red;
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-gray-900 text-white px-4 py-3 rounded-lg shadow-lg text-sm">
          <p className="font-semibold">{data.topic}</p>
          <p className="text-blue-400">{data.percentage}% ({data.correct}/{data.total})</p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Title */}
      <div className="flex items-center gap-3">
        <TrendingUp className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Performance Analysis</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Topic Performance Chart (Larger) */}
        <motion.div
          className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
          variants={chartVariants}
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <span>📊</span> Topic Performance
          </h3>

          {topicChartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={350}>
              <BarChart
                data={topicChartData}
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                <XAxis dataKey="topic" stroke="#6b7280" style={{ fontSize: "12px" }} />
                <YAxis stroke="#6b7280" style={{ fontSize: "12px" }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="percentage"
                  radius={[8, 8, 0, 0]}
                  animationDuration={1000}
                >
                  {topicChartData.map((entry, idx) => (
                    <Cell key={`cell-${idx}`} fill={getTopicColor(entry.percentage)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-80 flex items-center justify-center text-gray-500">
              No topic data available
            </div>
          )}

          {/* Topic Details List */}
          <motion.div className="mt-8 space-y-3 border-t border-gray-200 dark:border-gray-700 pt-6">
            <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
              Detailed Breakdown
            </h4>
            {topicChartData.map((topic, idx) => (
              <motion.div
                key={idx}
                className="flex items-center justify-between"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{topic.topic}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                      {topic.percentage}%
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {topic.correct}/{topic.total}
                    </p>
                  </div>
                  <div className="w-8 h-2 rounded-full" style={{ backgroundColor: getTopicColor(topic.percentage) }} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Difficulty Distribution */}
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
          variants={chartVariants}
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <span>📈</span> Difficulty
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={difficultyData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                animationDuration={800}
              >
                {difficultyData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Legend */}
          <motion.div className="mt-6 space-y-3 border-t border-gray-200 dark:border-gray-700 pt-6">
            {difficultyData.map((item, idx) => (
              <motion.div
                key={idx}
                className="flex items-center justify-between"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {item.name}
                  </span>
                </div>
                <span className="text-sm font-bold text-gray-900 dark:text-white">
                  {item.value}%
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Key Insights */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {/* Strength */}
        <div className="bg-green-50 dark:bg-green-950 rounded-lg p-4 border-l-4 border-green-500">
          <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2 flex items-center gap-2">
            <span>⭐</span> Strongest Area
          </h4>
          <p className="text-sm text-green-800 dark:text-green-200">
            {topicChartData[0]?.topic} ({topicChartData[0]?.percentage}%)
          </p>
        </div>

        {/* Growth Area */}
        <div className="bg-orange-50 dark:bg-orange-950 rounded-lg p-4 border-l-4 border-orange-500">
          <h4 className="font-semibold text-orange-900 dark:text-orange-100 mb-2 flex items-center gap-2">
            <span>🎯</span> Focus Area
          </h4>
          <p className="text-sm text-orange-800 dark:text-orange-200">
            {topicChartData[topicChartData.length - 1]?.topic} ({topicChartData[topicChartData.length - 1]?.percentage}%)
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

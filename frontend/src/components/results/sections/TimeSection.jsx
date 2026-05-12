import React from "react";
import { motion } from "framer-motion";
import { Clock, TrendingDown, Zap, AlertCircle } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

const timelineVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
};

export function TimeSection({ timeData }) {
  const { breakdown, totalTime, avgTime, fastestTime, slowestTime } = timeData;

  // Prepare data for chart
  const chartData = breakdown.map((q) => ({
    name: `Q${q.questionNum}`,
    time: q.timeSpent,
    status: q.isCorrect ? "correct" : "incorrect",
  }));

  // Calculate insights
  const timeImprovement = breakdown.length > 1 
    ? Math.round(((breakdown[breakdown.length - 1].timeSpent - breakdown[0].timeSpent) / breakdown[0].timeSpent) * 100)
    : 0;

  const bottleneck = breakdown.reduce((max, q) => (q.timeSpent > max.timeSpent ? q : max));

  return (
    <div className="space-y-8">
      {/* Section Title */}
      <div className="flex items-center gap-3 mb-6">
        <Clock className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Time Breakdown</h2>
      </div>

      {/* Quick Stats */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
        variants={timelineVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={itemVariants}
          className="bg-blue-50 dark:bg-blue-950 rounded-lg p-4 text-center"
        >
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Total</p>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            {formatTime(totalTime)}
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-center"
        >
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Average</p>
          <p className="text-3xl font-bold text-gray-600 dark:text-gray-400">
            {formatTime(avgTime)}
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-green-50 dark:bg-green-950 rounded-lg p-4 text-center"
        >
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Fastest</p>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">
            {formatTime(fastestTime)}
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-orange-50 dark:bg-orange-950 rounded-lg p-4 text-center"
        >
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Slowest</p>
          <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">
            {formatTime(slowestTime)}
          </p>
        </motion.div>
      </motion.div>

      {/* Timeline Visualization */}
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          Question Timeline
        </h3>

        <motion.div className="space-y-4" variants={timelineVariants} initial="hidden" animate="visible">
          {breakdown.map((q, idx) => {
            const barWidth = (q.timeSpent / slowestTime) * 100;
            const barColor = q.isCorrect ? "bg-green-500" : "bg-red-500";

            return (
              <motion.div key={idx} variants={itemVariants} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Q{q.questionNum}: {q.topic}
                  </span>
                  <span className="text-sm font-bold text-gray-600 dark:text-gray-400">
                    {formatTime(q.timeSpent)}
                  </span>
                </div>

                <div className="relative w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${barColor}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${barWidth}%` }}
                    transition={{ duration: 0.8, delay: idx * 0.1 }}
                  />
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500 dark:text-gray-500">
                    {q.isCorrect ? "✓ Correct" : "✗ Incorrect"}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-500">
                    {Math.round(barWidth)}% of slowest
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>

      {/* Line Chart */}
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          Time Trend
        </h3>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937",
                border: "1px solid #4b5563",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "#f3f4f6" }}
              formatter={(value) => formatTime(value)}
            />
            <Line
              type="monotone"
              dataKey="time"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ fill: "#3b82f6", r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Insights Box */}
      <motion.div
        className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 rounded-lg p-6 border-l-4 border-blue-500 space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          Insights & Recommendations
        </h3>

        <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
          <motion.div
            className="flex items-start gap-3"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <span className="text-lg">📌</span>
            <span>
              You spent longest on <span className="font-semibold">Q{bottleneck.questionNum}</span> ({formatTime(bottleneck.timeSpent)}) — {bottleneck.topic}
            </span>
          </motion.div>

          {timeImprovement < 0 && (
            <motion.div
              className="flex items-start gap-3"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <span className="text-lg">⚡</span>
              <span>
                Getting faster! Last question was {Math.abs(timeImprovement)}% quicker than first
              </span>
            </motion.div>
          )}

          <motion.div
            className="flex items-start gap-3"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-lg">💡</span>
            <span>
              Average {formatTime(avgTime)} per question is {"good" /* dynamic based on difficulty */} for your level
            </span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trophy, TrendingUp, Medal } from "lucide-react";
import { apiClient } from "../services/apiClient";

export function LeaderboardPage() {
  const [timeframe, setTimeframe] = React.useState("month");
  const [leaderboardData, setLeaderboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        const data = await apiClient.getLeaderboard(timeframe);
        setLeaderboardData(data);
      } catch (err) {
        console.error("Error fetching leaderboard:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [timeframe]);

  const mockLeaders = [
    {
      rank: 1,
      name: "Alex Chen",
      avatar: "👨‍🎓",
      score: 9850,
      exams: 45,
      avgScore: 95,
      badge: "🥇",
      trending: "up",
    },
    {
      rank: 2,
      name: "Sarah Johnson",
      avatar: "👩‍💻",
      score: 9420,
      exams: 42,
      avgScore: 92,
      badge: "🥈",
      trending: "up",
    },
    {
      rank: 3,
      name: "Mike Davis",
      avatar: "👨‍💼",
      score: 9120,
      exams: 40,
      avgScore: 90,
      badge: "🥉",
      trending: "down",
    },
    {
      rank: 4,
      name: "Emily Wilson",
      avatar: "👩‍🔬",
      score: 8850,
      exams: 38,
      avgScore: 88,
      badge: "4️⃣",
      trending: "up",
    },
    {
      rank: 5,
      name: "John Developer",
      avatar: "👨‍💻",
      score: 8720,
      exams: 42,
      avgScore: 86,
      badge: "5️⃣",
      trending: "up",
    },
    {
      rank: 6,
      name: "Lisa Anderson",
      avatar: "👩‍💻",
      score: 8420,
      exams: 37,
      avgScore: 84,
      badge: "6️⃣",
      trending: "down",
    },
    {
      rank: 7,
      name: "Tom Wilson",
      avatar: "👨‍💻",
      score: 8120,
      exams: 35,
      avgScore: 82,
      badge: "7️⃣",
      trending: "up",
    },
    {
      rank: 8,
      name: "Jessica Brown",
      avatar: "👩‍💼",
      score: 7850,
      exams: 33,
      avgScore: 80,
      badge: "8️⃣",
      trending: "down",
    },
  ];

  const leaders = leaderboardData?.leaders || mockLeaders;
  const userRank = leaderboardData?.userRank || "5";

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-slate-900 dark:to-slate-950 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Trophy className="w-12 h-12 text-yellow-500" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Leaderboard</h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            See how you stack up against others
          </p>
        </motion.div>

        {loading && (
          <div className="text-center text-gray-500 py-8">
            <p>Loading leaderboard...</p>
          </div>
        )}

        {error && (
          <div className="text-center text-red-500 py-8">
            <p>Error loading leaderboard: {error}</p>
          </div>
        )}

        {!loading && !error && (
          <>
            {/* Timeframe Filter */}
            <motion.div
              className="flex justify-center gap-4 mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {["week", "month", "all-time"].map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-6 py-3 rounded-lg font-bold transition-all ${
                    timeframe === tf
                      ? "bg-blue-600 text-white"
                      : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  {tf === "all-time" ? "All Time" : tf.charAt(0).toUpperCase() + tf.slice(1)}
                </button>
              ))}
            </motion.div>

        {/* Top 3 */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, staggerChildren: 0.1 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {leaders.slice(0, 3).map((leader, idx) => (
              <motion.div
                key={leader.rank}
                className={`rounded-lg p-8 shadow-lg text-center relative overflow-hidden ${
                  idx === 0
                    ? "bg-gradient-to-br from-yellow-400 to-orange-500"
                    : idx === 1
                    ? "bg-gradient-to-br from-gray-300 to-gray-400"
                    : "bg-gradient-to-br from-orange-400 to-red-400"
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + idx * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-6xl mb-2">{leader.badge}</div>
                <div className="text-6xl mb-4">{leader.avatar}</div>
                <h3 className="text-2xl font-bold text-white mb-2">{leader.name}</h3>
                <p className="text-4xl font-bold text-white mb-4">{leader.score}</p>
                <div className="text-white text-sm space-y-1">
                  <p>📋 {leader.exams} exams</p>
                  <p>📊 {leader.avgScore}% avg</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Full Leaderboard */}
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">
                    Rank
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">
                    User
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-900 dark:text-white">
                    Score
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-900 dark:text-white">
                    Exams
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-900 dark:text-white">
                    Avg Score
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-gray-900 dark:text-white">
                    Trend
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {leaders.map((leader, idx) => (
                  <motion.tr
                    key={leader.rank}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + idx * 0.05 }}
                  >
                    <td className="px-6 py-4">
                      <div className="text-2xl font-bold text-gradient">
                        {idx + 1 === 1 ? "🥇" : idx + 1 === 2 ? "🥈" : idx + 1 === 3 ? "🥉" : idx + 1}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{leader.avatar}</span>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {leader.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {leader.score}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-gray-900 dark:text-white font-semibold">
                        {leader.exams}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-green-600 dark:text-green-400 font-semibold">
                        {leader.avgScore}%
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-lg">
                        {leader.trending === "up" ? "📈" : "📉"}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Your Ranking */}
        <motion.div
          className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <p className="text-sm opacity-90 mb-2">YOUR RANKING THIS {timeframe.toUpperCase().replace("-", " ")}</p>
          <p className="text-5xl font-bold mb-2">#{userRank}</p>
          <p className="text-lg">You're in the top 10! Keep it up! 🎉</p>
        </motion.div>
          </>
        )}
      </div>
    </div>
  );
}

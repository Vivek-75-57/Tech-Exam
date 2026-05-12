import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, TrendingUp, RotateCcw, ChevronRight } from "lucide-react";
import { apiClient } from "../services/apiClient";

export function ExamHistoryPage() {
  const navigate = useNavigate();
  const [filterTopic, setFilterTopic] = React.useState("all");
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        
        // First, try to load from localStorage
        const localData = JSON.parse(localStorage.getItem("examHistory") || "[]");
        
        if (localData.length > 0) {
          console.log("📊 ExamHistoryPage - Loaded from localStorage:", localData.length, "exams");
          setExams(localData);
          setLoading(false);
          return;
        }
        
        // If no local data, try API
        try {
          const apiData = await apiClient.getExamHistory();
          if (apiData && apiData.exams && apiData.exams.length > 0) {
            console.log("📊 ExamHistoryPage - Loaded from API:", apiData.exams.length, "exams");
            setExams(apiData.exams);
            // Also save to localStorage for offline access
            localStorage.setItem("examHistory", JSON.stringify(apiData.exams));
          } else {
            console.log("📊 ExamHistoryPage - API returned no data, using mock");
            setExams([]);
          }
        } catch (apiErr) {
          console.log("📊 ExamHistoryPage - API failed, using mock:", apiErr.message);
          setExams([]);
        }
      } catch (err) {
        console.error("Error fetching exam history:", err);
        setError(err.message);
        setExams([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
    
    // Listen for real-time updates from other tabs
    const handleStorageChange = (e) => {
      if (e.key === "examHistory") {
        console.log("🔄 ExamHistoryPage - Real-time update from another tab");
        fetchHistory();
      }
    };
    
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const mockExams = [
    {
      id: 1,
      date: "2026-03-17",
      topics: ["JavaScript", "React"],
      score: 85,
      questions: 5,
      timeSpent: 12,
      time: "12m",
      grade: "Excellent",
    },
    {
      id: 2,
      date: "2026-03-15",
      topics: ["Python", "Data Structures"],
      score: 72,
      questions: 8,
      timeSpent: 25,
      time: "25m",
      grade: "Good",
    },
    {
      id: 3,
      date: "2026-03-10",
      topics: ["System Design"],
      score: 60,
      questions: 4,
      timeSpent: 18,
      time: "18m",
      grade: "Satisfactory",
    },
    {
      id: 4,
      date: "2026-03-05",
      topics: ["JavaScript", "TypeScript"],
      score: 92,
      questions: 6,
      timeSpent: 14,
      time: "14m",
      grade: "Outstanding",
    },
  ];

  // Transform exams to ensure consistent format for display
  const transformExamData = (exam) => {
    return {
      id: exam.id,
      date: exam.date || new Date().toISOString(),
      topics: Array.isArray(exam.topics) ? exam.topics : [exam.topic || "General"],
      score: exam.score || 0,
      questions: exam.questions || 0,
      time: exam.time || (exam.timeSpent ? `${exam.timeSpent}m` : "0m"),
      timeSpent: exam.timeSpent || (exam.time ? parseInt(exam.time) : 0),
      grade: exam.grade || getGrade(exam.score || 0),
    };
  };

  const getGrade = (score) => {
    if (score >= 90) return "Outstanding";
    if (score >= 80) return "Excellent";
    if (score >= 70) return "Good";
    if (score >= 60) return "Satisfactory";
    return "Needs Improvement";
  };

  const displayExams = (exams.length > 0 ? exams : mockExams).map(transformExamData);
  const topics = ["all", ...Array.from(new Set(displayExams.flatMap((e) => e.topics)))];

  const filteredExams =
    filterTopic === "all"
      ? displayExams
      : displayExams.filter((exam) => exam.topics.includes(filterTopic));

  const stats = {
    totalExams: displayExams.length,
    avgScore: displayExams.length > 0 ? Math.round(displayExams.reduce((sum, e) => sum + e.score, 0) / displayExams.length) : 0,
    bestScore: displayExams.length > 0 ? Math.max(...displayExams.map((e) => e.score)) : 0,
    totalTime: displayExams.reduce((sum, e) => {
      const timeValue = e.timeSpent || (e.time ? parseInt(e.time) : 0);
      return sum + timeValue;
    }, 0),
  };

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
            Exam History
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Track your past exams and progress
          </p>
        </motion.div>

        {/* Loading/Error States */}
        {loading && (
          <div className="text-center text-gray-500 py-8">
            <p>Loading exam history...</p>
          </div>
        )}
        {error && (
          <div className="text-center text-red-500 py-8">
            <p>Error loading history: {error}</p>
          </div>
        )}

        {!loading && !error && (
          <>
            {/* Stats Grid */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
            >
              {[
                { label: "Total Exams", value: stats.totalExams, icon: "📋" },
                { label: "Avg Score", value: `${stats.avgScore}%`, icon: "📊" },
                { label: "Best Score", value: `${stats.bestScore}%`, icon: "🏆" },
                { label: "Total Time", value: `${stats.totalTime}m`, icon: "⏱️" },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -5 }}
                >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Filter */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="font-bold text-gray-900 dark:text-white mb-4">Filter by Topic</h3>
          <div className="flex flex-wrap gap-2">
            {topics.map((topic) => (
              <button
                key={topic}
                onClick={() => setFilterTopic(topic)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  filterTopic === topic
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300"
                }`}
              >
                {topic === "all" ? "All Exams" : topic}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Exam List */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, staggerChildren: 0.05 }}
        >
          {filteredExams.map((exam, idx) => (
            <motion.div
              key={exam.id}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-lg transition-all cursor-pointer border-l-4 border-blue-500"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ x: 10 }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Calendar className="w-5 h-5" />
                      <span>{new Date(exam.date).toLocaleDateString()}</span>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-bold ${
                        exam.grade === "Outstanding"
                          ? "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200"
                          : exam.grade === "Excellent"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : exam.grade === "Good"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                          : "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
                      }`}
                    >
                      {exam.grade}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {exam.topics.map((topic) => (
                      <span
                        key={topic}
                        className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-6 text-sm text-gray-600 dark:text-gray-400">
                    <span>📝 {exam.questions} questions</span>
                    <span>⏱️ {exam.time}</span>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                    {exam.score}%
                  </p>
                  <motion.button
                    onClick={() => {
                      window.__completeExamResult = exam;
                      navigate("/exam/results", { state: { examResult: exam } });
                    }}
                    whileHover={{ scale: 1.05 }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold flex items-center gap-2"
                  >
                    Review <ChevronRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredExams.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-gray-600 dark:text-gray-400 text-lg">No exams found for this topic</p>
          </motion.div>
        )}
          </>
        )}
      </div>
    </div>
  );
}

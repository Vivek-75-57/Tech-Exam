import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Settings, LogOut, Mail, MapPin, Calendar, LinkIcon, 
  Target, TrendingUp, Clock, Award, BookOpen, Lock 
} from "lucide-react";
import { apiClient } from "../services/apiClient";

export function ProfilePage() {
  const [editing, setEditing] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [examHistory, setExamHistory] = useState([]);
  const [formData, setFormData] = useState({
    name: "John Developer",
    email: "john@example.com",
    bio: "Passionate about learning and mastering technical interviews",
    location: "San Francisco, CA",
    address: "123 Tech Street, Silicon Valley, CA 94025",
  });
  const [activeTab, setActiveTab] = useState("overview");

  // Load exam history from localStorage with real-time updates
  useEffect(() => {
    const loadExamHistory = () => {
      try {
        const savedHistory = localStorage.getItem("examHistory");
        if (savedHistory) {
          const history = JSON.parse(savedHistory);
          setExamHistory(history);
          console.log("📊 Loaded exam history:", history.length, "exams");
        }
      } catch (err) {
        console.error("Error loading exam history:", err);
      }
    };

    // Load immediately
    loadExamHistory();

    // Listen for storage changes (real-time updates from other tabs)
    const handleStorageChange = (e) => {
      if (e.key === "examHistory") {
        loadExamHistory();
        console.log("🔄 Exam history updated in real-time");
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        // Try to fetch profile from API if available
        if (apiClient.getUserProfile) {
          const data = await apiClient.getUserProfile();
          setUser(data);
          setFormData({
            name: data.name || "",
            email: data.email || "",
            bio: data.bio || "",
            location: data.location || "",
          });
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        // Don't set error - just use default user
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const defaultUser = {
    name: "John Developer",
    email: "john@example.com",
    avatar: "👨‍💻",
    joinDate: "2024-01-15",
    location: "San Francisco, CA",
    bio: "Passionate about learning and mastering technical interviews",
    website: "johndeveloper.com",
    stats: {
      examsCompleted: 42,
      totalScore: 3248,
      avgScore: 77,
      longestStreak: 12,
      topicsMastered: 8,
    },
    badges: [
      { name: "Speed Demon", icon: "⚡", unlocked: true },
      { name: "Accuracy Master", icon: "🎯", unlocked: true },
      { name: "Consistency Champion", icon: "🏆", unlocked: false },
      { name: "Century Club", icon: "💯", unlocked: false },
    ],
    // New fields for enhanced profile
    topicPerformance: [
      { topic: "JavaScript", score: 85, exams: 8, lastAttempt: "2024-03-15" },
      { topic: "React", score: 78, exams: 6, lastAttempt: "2024-03-14" },
      { topic: "CSS", score: 82, exams: 5, lastAttempt: "2024-03-10" },
      { topic: "HTML", score: 90, exams: 4, lastAttempt: "2024-03-12" },
      { topic: "Node.js", score: 72, exams: 7, lastAttempt: "2024-03-08" },
      { topic: "Database", score: 75, exams: 5, lastAttempt: "2024-03-09" },
    ],
    recentExams: [
      { id: 1, topic: "JavaScript", score: 82, date: "2024-03-15", questions: 20, time: "25m" },
      { id: 2, topic: "React", score: 75, date: "2024-03-14", questions: 15, time: "18m" },
      { id: 3, topic: "CSS", score: 88, date: "2024-03-10", questions: 20, time: "22m" },
    ],
    studyGoals: [
      { id: 1, topic: "TypeScript", targetScore: 90, currentScore: null, priority: "high" },
      { id: 2, topic: "GraphQL", targetScore: 80, currentScore: null, priority: "medium" },
      { id: 3, topic: "Testing", targetScore: 85, currentScore: 45, priority: "high" },
    ],
    preferences: {
      theme: "light",
      difficulty: "medium",
      emailNotifications: true,
      studyReminders: true,
      publicProfile: true,
      showOnLeaderboard: true,
    }
  };

  // Calculate stats from exam history
  const calculateStats = () => {
    if (examHistory.length === 0) return (user || defaultUser).stats;
    
    const avgScore = Math.round(
      examHistory.reduce((sum, exam) => sum + exam.score, 0) / examHistory.length
    );
    const totalScore = examHistory.reduce((sum, exam) => sum + (exam.score || 0), 0);
    const uniqueTopics = new Set(examHistory.map(e => e.topic)).size;
    
    return {
      examsCompleted: examHistory.length,
      totalScore: totalScore,
      avgScore: avgScore,
      longestStreak: 12, // Keep default for now
      topicsMastered: uniqueTopics,
    };
  };

  // Merge localStorage exam history with user data
  const displayUser = {
    ...(user || defaultUser),
    recentExams: examHistory.length > 0 ? examHistory : (user || defaultUser).recentExams,
    stats: calculateStats(),
  };

  const handleSaveProfile = async () => {
    try {
      const updated = await apiClient.updateUserProfile(formData);
      setUser(updated);
      setEditing(false);
    } catch (err) {
      console.error("Error updating profile:", err);
      setError(err.message);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-slate-900 dark:to-slate-950 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <motion.div
          className="flex items-start justify-between mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-start gap-6">
            <div className="text-6xl">{displayUser.avatar}</div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {displayUser.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{displayUser.bio}</p>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  {displayUser.email}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {displayUser.location}
                </div>
                <div className="flex items-center gap-1">
                  <LinkIcon className="w-4 h-4" />
                  {displayUser.website}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Joined {new Date(displayUser.joinDate).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => {
                if (editing) {
                  handleSaveProfile();
                } else {
                  setEditing(true);
                }
              }}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-bold flex items-center gap-2"
            >
              <Settings className="w-5 h-5" />
              {editing ? "Save" : "Edit"}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-6 py-3 bg-red-600 text-white rounded-lg font-bold flex items-center gap-2"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
        >
          {[
            { label: "Exams Completed", value: displayUser.stats.examsCompleted, icon: "📋" },
            { label: "Average Score", value: `${displayUser.stats.avgScore}%`, icon: "📊" },
            { label: "Topics Mastered", value: displayUser.stats.topicsMastered, icon: "🏆" },
            { label: "Current Streak", value: `${displayUser.stats.longestStreak} days`, icon: "🔥" },
            { label: "Total Points", value: displayUser.stats.totalScore, icon: "⭐" },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ y: -5 }}
            >
              <p className="text-2xl mb-1">{stat.icon}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{stat.label}</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8 border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
          {[
            { id: "overview", label: "Overview", icon: "📊" },
            { id: "performance", label: "Performance", icon: "📈" },
            { id: "goals", label: "Study Goals", icon: "🎯" },
            { id: "settings", label: "Settings", icon: "⚙️" },
          ].map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 font-semibold flex items-center gap-2 border-b-2 transition-all ${
                activeTab === tab.id
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
              whileHover={{ y: -2 }}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </motion.button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="grid lg:grid-cols-3 gap-8">
              <motion.div
                className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Recent Exams
                </h2>

                <div className="space-y-4">
                  {displayUser.recentExams.map((exam, idx) => (
                    <motion.div
                      key={idx}
                      className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 dark:text-white">
                            {exam.topic}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {new Date(exam.date).toLocaleDateString()} • {exam.questions} questions • {exam.time}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className={`text-2xl font-bold ${
                            exam.score >= 80 ? "text-green-600" : 
                            exam.score >= 60 ? "text-yellow-600" : 
                            "text-red-600"
                          }`}>
                            {exam.score}%
                          </p>
                          <p className="text-xs text-gray-500">Score</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Badges</h3>

                <div className="space-y-4">
                  {displayUser.badges.map((badge, idx) => (
                    <motion.div
                      key={idx}
                      className={`p-4 rounded-lg border-2 ${
                        badge.unlocked
                          ? "bg-yellow-50 dark:bg-yellow-950 border-yellow-400"
                          : "bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 opacity-50"
                      }`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 + idx * 0.05 }}
                    >
                      <div className="text-3xl mb-2">{badge.icon}</div>
                      <p className="font-bold text-gray-900 dark:text-white">
                        {badge.name}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {badge.unlocked ? "Unlocked" : "Locked"}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          )}

          {/* Performance Tab */}
          {activeTab === "performance" && (
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Topic-wise Performance
              </h2>

              <div className="space-y-6">
                {displayUser.topicPerformance.map((topic, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-gray-900 dark:text-white">{topic.topic}</h3>
                      <span className={`text-lg font-bold ${
                        topic.score >= 80 ? "text-green-600" : 
                        topic.score >= 60 ? "text-yellow-600" : 
                        "text-red-600"
                      }`}>
                        {topic.score}%
                      </span>
                    </div>
                    <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                      <motion.div
                        className="bg-gradient-to-r from-blue-500 to-blue-600 h-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${topic.score}%` }}
                        transition={{ duration: 0.5, delay: idx * 0.05 }}
                      />
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                      {topic.exams} exams • Last attempt: {new Date(topic.lastAttempt).toLocaleDateString()}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Study Goals Tab */}
          {activeTab === "goals" && (
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Study Goals</h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold text-sm"
                >
                  + Add Goal
                </motion.button>
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                {displayUser.studyGoals.map((goal, idx) => (
                  <motion.div
                    key={idx}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-white">{goal.topic}</h3>
                        <span className={`inline-block mt-2 px-2 py-1 rounded text-xs font-semibold ${
                          goal.priority === "high" 
                            ? "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200"
                            : "bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-200"
                        }`}>
                          {goal.priority.toUpperCase()}
                        </span>
                      </div>
                      <Target className="w-5 h-5 text-blue-600" />
                    </div>

                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600 dark:text-gray-400">Target</span>
                          <span className="font-bold text-gray-900 dark:text-white">{goal.targetScore}%</span>
                        </div>
                        {goal.currentScore && (
                          <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                            <motion.div
                              className="bg-blue-600 h-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${goal.currentScore}%` }}
                              transition={{ duration: 0.5, delay: idx * 0.05 }}
                            />
                          </div>
                        )}
                      </div>
                      {goal.currentScore && (
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Current: {goal.currentScore}% • {goal.targetScore - goal.currentScore}% to go
                        </p>
                      )}
                      {!goal.currentScore && (
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Not started yet
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <div className="grid lg:grid-cols-3 gap-8">
              <motion.div
                className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Profile Settings
                </h2>

                <div className="space-y-6">
                  {[
                    { key: "name", label: "Full Name", value: formData.name },
                    { key: "email", label: "Email", value: formData.email },
                    { key: "location", label: "City/Location", value: formData.location },
                    { key: "address", label: "Address", value: formData.address },
                    { key: "bio", label: "Bio", value: formData.bio },
                  ].map((field, idx) => (
                    <div key={idx}>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                        {field.label}
                      </label>
                      <input
                        type="text"
                        value={field.value || ""}
                        onChange={(e) => handleInputChange(field.key, e.target.value)}
                        disabled={!editing}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white disabled:opacity-50"
                      />
                    </div>
                  ))}

                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-4">Preferences</h3>

                    <div className="space-y-4">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" defaultChecked className="w-4 h-4" />
                        <span className="text-gray-700 dark:text-gray-300">
                          Receive email notifications
                        </span>
                      </label>

                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" defaultChecked className="w-4 h-4" />
                        <span className="text-gray-700 dark:text-gray-300">
                          Send study reminders
                        </span>
                      </label>

                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" defaultChecked className="w-4 h-4" />
                        <span className="text-gray-700 dark:text-gray-300">
                          Show profile on leaderboard
                        </span>
                      </label>

                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" defaultChecked className="w-4 h-4" />
                        <span className="text-gray-700 dark:text-gray-300">
                          Make profile public
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-4">Exam Preferences</h3>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Preferred Difficulty
                        </label>
                        <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white">
                          <option>Easy</option>
                          <option selected>Medium</option>
                          <option>Hard</option>
                          <option>Mixed</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Questions per Exam
                        </label>
                        <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white">
                          <option>10</option>
                          <option selected>15</option>
                          <option>20</option>
                          <option>25</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm h-fit"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <Lock className="w-5 h-5" />
                  Account Security
                </h3>

                <div className="space-y-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
                  >
                    Change Password
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
                  >
                    Enable 2-Factor Auth
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
                  >
                    Download Data
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    className="w-full px-4 py-3 border border-red-500 text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-950 transition-colors font-medium"
                  >
                    Delete Account
                  </motion.button>
                </div>

                <div className="mt-6 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="text-xs text-blue-700 dark:text-blue-300">
                    💡 <strong>Tip:</strong> Keep your password strong and enable 2FA for better security.
                  </p>
                </div>
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

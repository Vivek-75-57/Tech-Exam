import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { BookOpen, Award, TrendingUp } from "lucide-react";
import { apiClient } from "../services/apiClient";

export function ExamSetupPage() {
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [experience, setExperience] = useState("intermediate");
  const [numQuestions, setNumQuestions] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const topics = [
    { id: "js", name: "JavaScript", icon: "🟨" },
    { id: "python", name: "Python", icon: "🐍" },
    { id: "react", name: "React", icon: "⚛️" },
    { id: "typescript", name: "TypeScript", icon: "📘" },
    { id: "node", name: "Node.js", icon: "🟩" },
    { id: "sql", name: "SQL/Databases", icon: "🗄️" },
    { id: "system", name: "System Design", icon: "🏗️" },
    { id: "dsa", name: "Data Structures", icon: "📊" },
    { id: "oop", name: "OOP Concepts", icon: "🎯" },
    { id: "web", name: "Web APIs", icon: "🌐" },
    { id: "git", name: "Git/DevOps", icon: "🔧" },
    { id: "testing", name: "Testing", icon: "✅" },
  ];

  const toggleTopic = (id) => {
    setSelectedTopics((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const handleStartExam = async () => {
    if (selectedTopics.length === 0) {
      alert("Please select at least one topic");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      console.log("🚀 Starting exam generation with topics:", selectedTopics);
      console.log("   Experience:", experience, "Num Questions:", numQuestions);

      // Call API to generate exam
      const rawResponse = await fetch("/api/exams/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topics: selectedTopics,
          years_of_experience: experience === "beginner" ? 1 : experience === "intermediate" ? 3 : 7,
          num_questions: numQuestions,
        }),
      });

      console.log("API Response Status:", rawResponse.status);
      
      if (!rawResponse.ok) {
        const errorText = await rawResponse.text();
        console.error("❌ API Error Response:", errorText);
        throw new Error(`API Error: ${rawResponse.status} - ${errorText}`);
      }

      const examData = await rawResponse.json();
      console.log("✅ Full Response Data:", JSON.stringify(examData, null, 2));
      console.log("   Questions count:", examData.questions?.length);
      console.log("   First question structure:", JSON.stringify(examData.questions?.[0], null, 2));

      if (!examData.questions || examData.questions.length === 0) {
        throw new Error("No questions returned from API");
      }

      // Normalize question structure from backend to frontend format
      const normalizedQuestions = examData.questions.map((q) => ({
        id: q.id,
        question: q.question,
        topic: q.topic,
        difficulty: q.difficulty,
        options: Array.isArray(q.options)
          ? q.options.map((opt) => {
              // If option is an object with text property, extract it
              if (typeof opt === 'object' && opt.text) {
                return opt.text;
              }
              // Otherwise use it as-is
              return opt;
            })
          : q.options,
        correct_answer: q.correct_answer,
        correctAnswer: q.correct_answer || q.correctAnswer,
        explanation: q.explanation,
        detailedExplanation: q.detailedExplanation,
      }));

      console.log("✅ Normalized first question:", JSON.stringify(normalizedQuestions[0], null, 2));

      const normalizedExamData = {
        ...examData,
        questions: normalizedQuestions,
      };

      // Save exam data and navigate to exam page
      sessionStorage.setItem("currentExam", JSON.stringify(normalizedExamData));
      console.log("💾 Saved to sessionStorage, navigating...");
      navigate("/exam/taking", { state: { exam: normalizedExamData } });
    } catch (err) {
      console.error("❌ Error generating exam:", err);
      setError(err.message || "Failed to generate exam. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-slate-900 dark:to-slate-950 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Configure Your Exam
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Select topics, difficulty level, and number of questions
          </p>
        </motion.div>

        {error && (
          <motion.div
            className="max-w-2xl mx-auto mb-8 bg-red-50 dark:bg-red-900/20 border border-red-500 rounded-lg p-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-red-700 dark:text-red-400">{error}</p>
          </motion.div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Experience Level */}
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                Experience Level
              </h3>
              <div className="space-y-3">
                {[
                  { value: "beginner", label: "Beginner" },
                  { value: "intermediate", label: "Intermediate" },
                  { value: "advanced", label: "Advanced" },
                ].map((level) => (
                  <label key={level.value} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="experience"
                      value={level.value}
                      checked={experience === level.value}
                      onChange={(e) => setExperience(e.target.value)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="text-gray-700 dark:text-gray-300">{level.label}</span>
                  </label>
                ))}
              </div>
            </motion.div>

            {/* Number of Questions */}
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-blue-600" />
                Number of Questions
              </h3>
              <input
                type="range"
                min="1"
                max="20"
                value={numQuestions}
                onChange={(e) => setNumQuestions(parseInt(e.target.value))}
                className="w-full"
              />
              <p className="text-center text-2xl font-bold text-blue-600 mt-2">
                {numQuestions}
              </p>
            </motion.div>

            {/* Start Button */}
            <motion.button
              whileHover={{ scale: loading ? 1 : 1.05 }}
              whileTap={{ scale: loading ? 1 : 0.95 }}
              onClick={handleStartExam}
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-bold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Generating Exam..." : "Start Exam"}
            </motion.button>
          </div>

          {/* Topics Grid */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                Select Topics ({selectedTopics.length})
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {topics.map((topic) => (
                  <motion.button
                    key={topic.id}
                    onClick={() => toggleTopic(topic.id)}
                    whileHover={{ scale: 1.02 }}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      selectedTopics.includes(topic.id)
                        ? "border-blue-600 bg-blue-50 dark:bg-blue-950"
                        : "border-gray-200 dark:border-gray-700 hover:border-blue-400"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{topic.icon}</span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {topic.name}
                      </span>
                      {selectedTopics.includes(topic.id) && (
                        <span className="ml-auto text-blue-600 text-lg">✓</span>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

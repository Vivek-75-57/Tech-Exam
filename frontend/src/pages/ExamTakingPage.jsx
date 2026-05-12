import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { Clock, AlertCircle, CheckCircle, XCircle } from "lucide-react";
import { apiClient } from "../services/apiClient";
import { ExamSuccessModal } from "../components/exam/ExamSuccessModal";

export function ExamTakingPage() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successData, setSuccessData] = useState(null);

  // Get exam from state or sessionStorage
  const examData = location.state?.exam || JSON.parse(sessionStorage.getItem("currentExam") || "null");
  
  // Initialize page loading state
  useEffect(() => {
    console.log("📋 ExamTakingPage - examData:", examData);
    if (!examData || !examData.questions || examData.questions.length === 0) {
      console.warn("⚠️ No exam data or questions found!");
    }
    setPageLoading(false);
  }, []);
  
  // Mock questions as fallback
  const mockQuestions = [
    {
      id: 1,
      topic: "JavaScript",
      difficulty: "Medium",
      question: "What is a closure in JavaScript?",
      options: [
        "A function with access to variables from its outer scope",
        "A loop that closes when done",
        "A way to end a function",
        "A built-in JavaScript object",
      ],
      correctAnswer: 0,
    },
    {
      id: 2,
      topic: "JavaScript",
      difficulty: "Medium",
      question: "What does 'this' refer to in JavaScript?",
      options: [
        "The current object",
        "Always the window object",
        "Depends on how function is called",
        "A reference to the previous function",
      ],
      correctAnswer: 2,
    },
  ];

  const questions = examData?.questions || mockQuestions;

  const question = questions[currentQuestion];
  const selectedAnswer = answers[question?.id];
  const progress = question ? ((currentQuestion + 1) / questions.length) * 100 : 0;

  // Timer
  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSelectAnswer = (index) => {
    if (question) {
      setAnswers({ ...answers, [question.id]: index });
    }
  };

  const handleNext = async () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Submit exam and navigate to results
      try {
        setLoading(true);
        setError(null);

        console.log("📤 Submitting exam...");
        console.log("   Total questions:", questions.length);
        console.log("   Answers answered:", Object.keys(answers).length);
        console.log("   Time spent:", 1800 - timeLeft, "seconds");

        const timeSpentSeconds = 1800 - timeLeft;
        const examTopics = Array.isArray(examData?.topics) && examData.topics.length > 0
          ? examData.topics
          : [...new Set(questions.map((q) => q.topic).filter(Boolean))];
        const examDifficulty = examData?.difficulty || questions[0]?.difficulty || "Medium";

        // Prepare exam submission data
        const submissionData = {
          questions: questions.map((q) => ({
            id: q.id,
            topic: q.topic,
            question: q.question,
            selectedAnswer: answers[q.id] || -1,
            correctAnswer: q.correctAnswer || q.correct_answer,
          })),
          answers,
          timeSpent: timeSpentSeconds,
          topics: examTopics,
          difficulty: examDifficulty,
        };

        console.log("📋 Submission data prepared:", JSON.stringify(submissionData, null, 2));

        // Call API to score exam
        console.log("🔄 Calling scoreExam API...");
        
        // Use raw fetch for better error handling
        const scoreResponse = await fetch("/api/exams/score", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            questions: questions.map((q) => ({
              id: q.id,
              question: q.question,
              topic: q.topic,
              difficulty: q.difficulty,
              correct_answer: q.correct_answer || q.correctAnswer,
              options: q.options,
              explanation: q.explanation,
              detailedExplanation: q.detailedExplanation,
            })),
            answers,
            timeSpent: timeSpentSeconds,
            topics: examTopics,
            difficulty: examDifficulty,
          }),
        });

        console.log("📥 Score API Response Status:", scoreResponse.status);

        if (!scoreResponse.ok) {
          const errorText = await scoreResponse.text();
          console.error("❌ Score API Error:", errorText);
          throw new Error(`API Error: ${scoreResponse.status} - ${errorText}`);
        }

        const results = await scoreResponse.json();
        console.log("✅ Score API response:", JSON.stringify(results, null, 2));

        // Prefer backend scoring so numeric answer indexes and option IDs are both handled consistently.
        const backendScore = results?.score?.percentage;
        const scorePercentage = Number.isFinite(backendScore)
          ? backendScore
          : Math.round(
              (Object.keys(answers).filter((qId) => {
                const question = questions.find((q) => q.id === parseInt(qId, 10));
                if (!question) return false;

                const selectedIndex = answers[qId];
                const correctAnswer = question.correct_answer || question.correctAnswer;
                return selectedIndex === correctAnswer;
              }).length /
                questions.length) *
                100
            );
        const correctAnswers = results?.score?.correct ?? 0;
        
        // Format time to display seconds for short exams
        const formatTimeDisplay = (seconds) => {
          const minutes = Math.floor(seconds / 60);
          const secs = seconds % 60;
          if (minutes === 0) {
            return `${secs}s`;
          }
          if (secs === 0) {
            return `${minutes}m`;
          }
          return `${minutes}m ${secs}s`;
        };
        
        const timeDisplay = formatTimeDisplay(timeSpentSeconds);
        
        // Create exam result for exam history
        const examResult = {
          id: Date.now(),
          topic: examTopics[0] || "General",
          topics: examTopics.length > 0 ? examTopics : ["General"],
          score: scorePercentage,
          grade: scorePercentage >= 90 ? "Outstanding" : scorePercentage >= 80 ? "Excellent" : scorePercentage >= 70 ? "Good" : scorePercentage >= 60 ? "Satisfactory" : "Needs Improvement",
          date: new Date().toISOString(),
          questions: questions.length,
          time: timeDisplay,
          timeSeconds: timeSpentSeconds,
          difficulty: examDifficulty,
          correctAnswers,
          totalAnswered: Object.keys(answers).length,
          timestamp: Date.now()
        };
        
        // Get existing exam history from localStorage
        const existingHistory = JSON.parse(localStorage.getItem("examHistory") || "[]");
        
        // Add new exam to beginning of history
        const updatedHistory = [examResult, ...existingHistory];
        
        // Keep only last 50 exams
        const limitedHistory = updatedHistory.slice(0, 50);
        
        // Save to localStorage
        localStorage.setItem("examHistory", JSON.stringify(limitedHistory));
        console.log("💾 Exam saved to localStorage:", examResult);
        console.log("📊 Total exams in history:", limitedHistory.length);

        // Save results to sessionStorage
        sessionStorage.setItem("examResults", JSON.stringify(results));
        console.log("💾 Results saved to sessionStorage");
        
        // Store detailed results separately for results page (DO NOT spread to avoid nested objects)
        const completeResult = {
          id: Date.now(),
          topic: examTopics[0] || "General",
          topics: examTopics.length > 0 ? examTopics : ["General"],
          score: scorePercentage,
          grade: scorePercentage >= 90 ? "Outstanding" : scorePercentage >= 80 ? "Excellent" : scorePercentage >= 70 ? "Good" : scorePercentage >= 60 ? "Satisfactory" : "Needs Improvement",
          date: new Date().toISOString(),
          questions: questions.length,
          time: timeDisplay,
          timeSeconds: timeSpentSeconds,
          difficulty: examDifficulty,
          correctAnswers,
          totalAnswered: Object.keys(answers).length,
          timestamp: Date.now(),
          breakdown: results?.breakdown || [],
          topicScores: results?.topicScores || [],
          weakAreas: results?.weakAreas || [],
        };
        
        console.log("✅ Exam submitted successfully!");
        setError(null);
        
        // Only pass primitive values to modal (no nested objects)
        setSuccessData({
          score: scorePercentage,
          correctAnswers,
          time: timeDisplay,
          grade: scorePercentage >= 90 ? "Outstanding" : scorePercentage >= 80 ? "Excellent" : scorePercentage >= 70 ? "Good" : scorePercentage >= 60 ? "Satisfactory" : "Needs Improvement",
        });
        
        // Store complete result for navigation
        window.__completeExamResult = completeResult;
        setShowSuccessModal(true);
      } catch (err) {
        console.error("❌ Error submitting exam:", err);
        console.error("   Error message:", err.message);
        console.error("   Full error:", err);
        setError(err.message || "Failed to submit exam. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-slate-900 dark:to-slate-950">
      {pageLoading && (
        <div className="flex items-center justify-center h-screen">
          <p className="text-gray-600 dark:text-gray-400">Loading exam data...</p>
        </div>
      )}

      {!pageLoading && (!examData || !examData.questions || examData.questions.length === 0) && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            className="bg-red-50 dark:bg-red-900/20 border border-red-500 rounded-lg p-8 text-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-red-700 dark:text-red-400 mb-4">
              ⚠️ No exam questions found. Please go back and select topics to start an exam.
            </p>
            <button
              onClick={() => navigate("/")}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Go Back to Setup
            </button>
          </motion.div>
        </div>
      )}

      {!pageLoading && examData && examData.questions && examData.questions.length > 0 && (
        <>
      {/* Header */}
      <motion.div
        className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Question {currentQuestion + 1} of {questions.length}
            </h2>
            <div className="flex items-center gap-4">
              <div className={`flex items-center gap-1 text-base font-bold ${
                timeLeft < 300 ? "text-red-600" : "text-blue-600"
              }`}>
                <Clock className="w-4 h-4" />
                {formatTime(timeLeft)}
              </div>
              <span className="text-xs text-gray-600 dark:text-gray-400">
                {question.difficulty}
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-600 to-purple-600"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </motion.div>

      {/* Content with Left Sidebar */}
      <div className="flex gap-3 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 h-[calc(100vh-200px)] overflow-auto">
        {/* Left Sidebar - Question Navigation */}
        <motion.div
          className="w-24 bg-white dark:bg-gray-800 rounded-lg p-2 shadow-sm h-fit sticky top-20"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h4 className="font-bold text-gray-900 dark:text-white mb-2 text-xs">Q Nav</h4>
          <div className="grid grid-cols-3 gap-1">
            {questions.map((_, idx) => (
              <motion.button
                key={idx}
                onClick={() => setCurrentQuestion(idx)}
                whileHover={{ scale: 1.1 }}
                title={`Question ${idx + 1}`}
                className={`w-8 h-8 rounded font-bold transition-all text-xs ${
                  currentQuestion === idx
                    ? "bg-blue-600 text-white"
                    : answers[questions[idx].id] !== undefined
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                }`}
              >
                {idx + 1}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Right Content - Main Question */}
        <div className="flex-1">
          {error && (
            <motion.div
              className="mb-2 bg-red-50 dark:bg-red-900/20 border border-red-500 rounded-lg p-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="text-red-700 dark:text-red-400 text-sm">{error}</p>
            </motion.div>
          )}

          {loading && (
            <motion.div
              className="mb-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-500 rounded-lg p-2 text-center"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="text-blue-700 dark:text-blue-400 text-sm">Submitting exam...</p>
            </motion.div>
          )}

          <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm flex-1 overflow-auto"
            key={currentQuestion}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Question */}
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {question.question}
            </h3>

            {/* Options */}
            <div className="space-y-2 mb-4">
              {question.options.map((option, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => handleSelectAnswer(idx)}
                  whileHover={{ x: 3 }}
                  className={`w-full p-3 rounded-lg border-2 text-left transition-all text-base ${
                    selectedAnswer === idx
                      ? "border-blue-600 bg-blue-50 dark:bg-blue-950"
                      : "border-gray-200 dark:border-gray-700 hover:border-blue-400"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center font-bold text-xs ${
                        selectedAnswer === idx
                          ? "border-blue-600 bg-blue-600 text-white"
                          : "border-gray-300 dark:border-gray-600"
                      }`}
                    >
                      {String.fromCharCode(65 + idx)}
                    </div>
                    <span className="text-gray-900 dark:text-white line-clamp-2">{option}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 mt-auto pt-3 pb-1">
              <button
                disabled={currentQuestion === 0}
                onClick={() => setCurrentQuestion(currentQuestion - 1)}
                className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded font-semibold text-xs disabled:opacity-50"
              >
                Prev
              </button>

              <button
                onClick={handleNext}
                disabled={loading}
                className="flex-1 px-2 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded font-semibold text-sm hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Submitting..." : currentQuestion === questions.length - 1 ? "Submit" : "Next"}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
        </>
      )}
      
      {/* Success Modal */}
      {showSuccessModal && successData && (
        <ExamSuccessModal
          examResult={successData}
          onViewResults={() => {
            console.log("🔄 Navigating to results...");
            console.log("   window.__completeExamResult:", window.__completeExamResult ? "✅ Present" : "❌ Missing");
            setShowSuccessModal(false);
            // Ensure data is available before navigating
            if (window.__completeExamResult) {
              navigate("/exam/results", { state: { examResult: window.__completeExamResult } });
            } else {
              console.error("❌ Complete exam result not found!");
              alert("Error: Exam result data not found. Please try submitting again.");
            }
          }}
          onReturnHome={() => {
            setShowSuccessModal(false);
            navigate("/");
          }}
        />
      )}
    </div>
  );
}

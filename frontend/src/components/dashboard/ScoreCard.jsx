import React, { memo } from "react";

/**
 * Score Card Component
 * Displays circular progress indicator with performance rating
 * 
 * Features:
 * - Animated circular progress (SVG-based)
 * - Dynamic color gradient based on rating
 * - Performance tier display
 * - Smooth animation on mount
 * - Responsive sizing
 */
export const ScoreCard = memo(({
  score = 0,
  accuracy = 0,
  performanceRating = "Fair",
  questionsAnswered = 0,
  totalQuestions = 10,
  ratingColor = "from-yellow-400 to-orange-400",
}) => {
  const circumference = 2 * Math.PI * 100;
  const strokeDashoffset = circumference - (accuracy / 100) * circumference;

  const getPerformanceIcon = (rating) => {
    switch (rating) {
      case "Excellent": return "🌟";
      case "Good": return "⭐";
      case "Fair": return "📊";
      case "Poor": return "⚠️";
      default: return "📈";
    }
  };

  return (
    <div 
      className="w-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-xl"
      role="region"
      aria-label={`Score Card: ${accuracy}% accuracy, ${performanceRating}`}
    >
      {/* Gradient background */}
      <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

      <div className="p-8 md:p-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left: Circular Progress */}
          <div className="flex-shrink-0 flex flex-col items-center">
            <div className="relative w-64 h-64 md:w-72 md:h-72 mb-4">
              {/* Background circle */}
              <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 220 220">
                <circle
                  cx="110"
                  cy="110"
                  r="100"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-gray-200 dark:text-gray-700"
                />
              </svg>

              {/* Animated progress circle */}
              <svg 
                className="absolute inset-0 w-full h-full transform -rotate-90 transition-all duration-500 ease-out"
                viewBox="0 0 220 220"
              >
                <defs>
                  <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgb(59, 130, 246)" />
                    <stop offset="50%" stopColor="rgb(168, 85, 247)" />
                    <stop offset="100%" stopColor="rgb(236, 72, 153)" />
                  </linearGradient>
                </defs>
                <circle
                  cx="110"
                  cy="110"
                  r="100"
                  fill="none"
                  stroke="url(#scoreGradient)"
                  strokeWidth="8"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  style={{ transition: "stroke-dashoffset 1s ease-out" }}
                />
              </svg>

              {/* Center content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <div className="text-6xl md:text-7xl font-bold bg-gradient-to-br from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent animate-pulse">
                  {Math.round(accuracy)}%
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Accuracy</div>
              </div>
            </div>

            {/* Answered count below progress */}
            <div className="text-center">
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                {questionsAnswered} of {totalQuestions} Answered
              </p>
            </div>
          </div>

          {/* Right: Rating and Stats */}
          <div className="flex-1 flex flex-col justify-center items-start space-y-6">
            {/* Performance Rating Badge */}
            <div className="w-full">
              <div className={`bg-gradient-to-r ${ratingColor} p-0.5 rounded-xl`}>
                <div className="bg-white dark:bg-gray-800 rounded-[10px] p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-4xl">{getPerformanceIcon(performanceRating)}</span>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Performance Rating</p>
                      <p className="text-3xl font-bold text-gray-800 dark:text-white">{performanceRating}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
                    {performanceRating === "Excellent" && "Outstanding performance! Keep up the momentum! 🚀"}
                    {performanceRating === "Good" && "Great work! You're on the right track! 💪"}
                    {performanceRating === "Fair" && "Decent progress! There's room for improvement. 📚"}
                    {performanceRating === "Poor" && "Focus on weak areas. Review and practice! 🎯"}
                  </p>
                </div>
              </div>
            </div>

            {/* Mini Stats */}
            <div className="w-full grid grid-cols-2 gap-3">
              <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-4 border border-emerald-200 dark:border-emerald-800">
                <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold uppercase mb-1">Score</p>
                <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">{score}</p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold uppercase mb-1">Progress</p>
                <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{Math.round((questionsAnswered / totalQuestions) * 100)}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

ScoreCard.displayName = "ScoreCard";

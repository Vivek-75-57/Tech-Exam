import React, { useMemo, memo } from "react";
import { ScoreCard } from "./ScoreCard";
import { StatCard } from "./StatCard";
import { TimeTracker } from "./TimeTracker";
import { TopicPerformance } from "./TopicPerformance";
import { DifficultyDistribution } from "./DifficultyDistribution";
import { StreakCounter } from "./StreakCounter";

/**
 * Real-Time Performance Dashboard
 * Displays comprehensive performance metrics during exam
 * 
 * Features:
 * - Live circular progress indicator
 * - Performance stats and ratings
 * - Time tracking
 * - Topic-wise performance
 * - Difficulty distribution
 * - Streak counter
 * - Dark mode support
 * - Full responsiveness
 * - ARIA accessibility labels
 */
export const PerformanceDashboard = memo(({
  currentScore = 0,
  correctAnswers = 0,
  incorrectAnswers = 0,
  accuracy = 0,
  questionsAnswered = 0,
  totalQuestions = 10,
  elapsedTime = 0,
  streakCount = 0,
  topicPerformance = {},
  performanceRating = "Fair",
  difficultyDistribution = { easy: 0, medium: 0, hard: 0 },
}) => {
  // Memoized calculations
  const stats = useMemo(() => ({
    completionPercent: totalQuestions > 0 ? Math.round((questionsAnswered / totalQuestions) * 100) : 0,
    avgTimePerQuestion: questionsAnswered > 0 ? Math.round(elapsedTime / questionsAnswered) : 0,
    trendDirection: accuracy > (correctAnswers > 0 ? (correctAnswers / (correctAnswers + incorrectAnswers)) * 100 : 0) ? "up" : "down",
  }), [questionsAnswered, totalQuestions, elapsedTime, accuracy, correctAnswers, incorrectAnswers]);

  const ratingColors = {
    "Excellent": "from-emerald-400 to-green-500",
    "Good": "from-blue-400 to-cyan-500",
    "Fair": "from-yellow-400 to-orange-400",
    "Poor": "from-red-400 to-orange-500",
  };

  return (
    <div 
      className="w-full max-w-6xl mx-auto p-4 space-y-6"
      role="region"
      aria-label="Performance Dashboard"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-1">
          📊 Performance Dashboard
        </h2>
        <p className="text-gray-600 dark:text-gray-400">Real-time exam performance metrics</p>
      </div>

      {/* Main Score Card - Full Width */}
      <ScoreCard
        score={currentScore}
        accuracy={accuracy}
        performanceRating={performanceRating}
        questionsAnswered={questionsAnswered}
        totalQuestions={totalQuestions}
        ratingColor={ratingColors[performanceRating]}
      />

      {/* Stats Grid - 2x2 on desktop, 1x on mobile */}
      <div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        role="region"
        aria-label="Performance Statistics"
      >
        <StatCard
          icon="✅"
          label="Correct Answers"
          value={correctAnswers}
          subtext={`of ${totalQuestions}`}
          color="emerald"
          trend={correctAnswers > 0 ? "up" : null}
        />

        <StatCard
          icon="❌"
          label="Incorrect Answers"
          value={incorrectAnswers}
          subtext={`of ${totalQuestions}`}
          color="red"
          trend={incorrectAnswers > 0 ? "down" : null}
        />

        <StatCard
          icon="📈"
          label="Accuracy"
          value={`${accuracy}%`}
          subtext={`${questionsAnswered} answered`}
          color="blue"
          trend={stats.trendDirection === "up" ? "up" : "down"}
          isPercentage
        />

        <StatCard
          icon="🎯"
          label="Progress"
          value={questionsAnswered}
          subtext={`${stats.completionPercent}% complete`}
          color="purple"
          trend={questionsAnswered > 0 ? "up" : null}
          showProgress
          progressValue={stats.completionPercent}
        />
      </div>

      {/* Time and Streak Row - Responsive */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Time Tracker */}
        <div className="md:col-span-2">
          <TimeTracker
            elapsedTime={elapsedTime}
            avgTimePerQuestion={stats.avgTimePerQuestion}
          />
        </div>

        {/* Streak Counter */}
        <StreakCounter count={streakCount} />
      </div>

      {/* Topic Performance and Difficulty Distribution - Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Topic Performance - Takes 2 columns on desktop */}
        <div className="lg:col-span-2">
          <TopicPerformance topicData={topicPerformance} />
        </div>

        {/* Difficulty Distribution - Takes 1 column on desktop */}
        <DifficultyDistribution distribution={difficultyDistribution} />
      </div>

      {/* Quick Stats Footer */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm">
          <div>
            <p className="text-gray-600 dark:text-gray-400">Questions Left</p>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {totalQuestions - questionsAnswered}
            </p>
          </div>
          <div>
            <p className="text-gray-600 dark:text-gray-400">Success Rate</p>
            <p className={`text-2xl font-bold ${accuracy >= 70 ? "text-emerald-600 dark:text-emerald-400" : "text-orange-600 dark:text-orange-400"}`}>
              {accuracy >= 70 ? "✓" : "→"} {accuracy}%
            </p>
          </div>
          <div>
            <p className="text-gray-600 dark:text-gray-400">Avg Speed</p>
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {Math.floor(stats.avgTimePerQuestion / 60)}:{String(stats.avgTimePerQuestion % 60).padStart(2, "0")}
            </p>
          </div>
          <div>
            <p className="text-gray-600 dark:text-gray-400">Est. Total Time</p>
            <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
              {Math.floor((elapsedTime / questionsAnswered) * totalQuestions / 60) || 0}:{String(Math.round((elapsedTime / questionsAnswered) * totalQuestions) % 60).padStart(2, "0")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

PerformanceDashboard.displayName = "PerformanceDashboard";

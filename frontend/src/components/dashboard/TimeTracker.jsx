import React, { memo } from "react";

/**
 * Time Tracker Component
 * Displays elapsed time and average time per question
 * 
 * Features:
 * - Real-time elapsed time display
 * - Average time per question calculation
 * - Timer icon with animation
 * - Split view: elapsed vs average
 * - Responsive layout
 */
export const TimeTracker = memo(({ elapsedTime = 0, avgTimePerQuestion = 0 }) => {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div
      className="w-full bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-xl border border-indigo-200 dark:border-indigo-800 p-6 md:p-8"
      role="region"
      aria-label="Time Tracking"
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <span className="text-3xl animate-pulse">⏱️</span>
        <h3 className="text-lg md:text-xl font-bold text-gray-800 dark:text-white">Time Tracking</h3>
      </div>

      {/* Time Display Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Elapsed Time */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-5 border border-indigo-100 dark:border-indigo-700 transform transition-all duration-300 hover:shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">⏰</span>
            <p className="text-xs font-semibold uppercase text-indigo-600 dark:text-indigo-400 tracking-wide">
              Elapsed Time
            </p>
          </div>
          <div className="flex items-baseline gap-1">
            <p className="text-4xl md:text-5xl font-bold text-indigo-700 dark:text-indigo-300 font-mono">
              {formatTime(elapsedTime)}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">min:sec</p>
          </div>
        </div>

        {/* Average Time Per Question */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-5 border border-blue-100 dark:border-blue-700 transform transition-all duration-300 hover:shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">⚡</span>
            <p className="text-xs font-semibold uppercase text-blue-600 dark:text-blue-400 tracking-wide">
              Avg per Q
            </p>
          </div>
          <div className="flex items-baseline gap-1">
            <p className="text-4xl md:text-5xl font-bold text-blue-700 dark:text-blue-300 font-mono">
              {formatTime(avgTimePerQuestion)}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">min:sec</p>
          </div>
        </div>
      </div>

      {/* Progress indicator */}
      <div className="mt-6 p-4 bg-indigo-100/50 dark:bg-indigo-900/30 rounded-lg border border-indigo-200 dark:border-indigo-700">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-semibold text-indigo-700 dark:text-indigo-300">⚙️ Time Efficiency</p>
          <span className="text-xs bg-indigo-600 dark:bg-indigo-500 text-white px-2 py-1 rounded-full">
            Optimized
          </span>
        </div>
        <p className="text-xs text-indigo-600 dark:text-indigo-400">
          You're maintaining a steady pace. {avgTimePerQuestion > 90 ? "Consider speeding up!" : "Great pace!"}
        </p>
      </div>
    </div>
  );
});

TimeTracker.displayName = "TimeTracker";

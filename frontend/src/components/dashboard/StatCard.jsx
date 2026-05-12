import React, { memo } from "react";

/**
 * Stat Card Component
 * Displays individual performance statistics
 * 
 * Features:
 * - Color-coded cards by category
 * - Optional progress bar
 * - Trend indicators (up/down)
 * - Smooth hover effects
 * - Responsive layout
 * - Icon support
 */
export const StatCard = memo(({
  icon = "📊",
  label = "Statistic",
  value = 0,
  subtext = "description",
  color = "blue",
  trend = null,
  showProgress = false,
  progressValue = 0,
  isPercentage = false,
}) => {
  const colorSchemes = {
    emerald: {
      bg: "bg-emerald-50 dark:bg-emerald-900/20",
      border: "border-emerald-200 dark:border-emerald-800",
      text: "text-emerald-700 dark:text-emerald-300",
      label: "text-emerald-600 dark:text-emerald-400",
      progress: "bg-emerald-500",
    },
    red: {
      bg: "bg-red-50 dark:bg-red-900/20",
      border: "border-red-200 dark:border-red-800",
      text: "text-red-700 dark:text-red-300",
      label: "text-red-600 dark:text-red-400",
      progress: "bg-red-500",
    },
    blue: {
      bg: "bg-blue-50 dark:bg-blue-900/20",
      border: "border-blue-200 dark:border-blue-800",
      text: "text-blue-700 dark:text-blue-300",
      label: "text-blue-600 dark:text-blue-400",
      progress: "bg-blue-500",
    },
    purple: {
      bg: "bg-purple-50 dark:bg-purple-900/20",
      border: "border-purple-200 dark:border-purple-800",
      text: "text-purple-700 dark:text-purple-300",
      label: "text-purple-600 dark:text-purple-400",
      progress: "bg-purple-500",
    },
    yellow: {
      bg: "bg-yellow-50 dark:bg-yellow-900/20",
      border: "border-yellow-200 dark:border-yellow-800",
      text: "text-yellow-700 dark:text-yellow-300",
      label: "text-yellow-600 dark:text-yellow-400",
      progress: "bg-yellow-500",
    },
  };

  const scheme = colorSchemes[color] || colorSchemes.blue;

  return (
    <div
      className={`${scheme.bg} ${scheme.border} rounded-xl border p-5 md:p-6 transition-all duration-300 hover:shadow-lg hover:scale-105 transform`}
      role="region"
      aria-label={`${label}: ${value}${isPercentage ? '%' : ''}`}
    >
      {/* Header with icon and label */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl md:text-3xl">{icon}</span>
          <p className={`text-xs font-semibold uppercase tracking-wide ${scheme.label}`}>
            {label}
          </p>
        </div>
        {trend && (
          <span 
            className="text-lg"
            role="img"
            aria-label={trend === "up" ? "increasing" : "decreasing"}
          >
            {trend === "up" ? "📈" : "📉"}
          </span>
        )}
      </div>

      {/* Main value */}
      <div className="mb-3">
        <p className={`text-3xl md:text-4xl font-bold ${scheme.text}`}>
          {typeof value === "number" ? (
            <>
              {Math.round(value)}
              {isPercentage && "%"}
            </>
          ) : (
            value
          )}
        </p>
      </div>

      {/* Subtext */}
      <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">{subtext}</p>

      {/* Progress bar (optional) */}
      {showProgress && (
        <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
          <div
            className={`${scheme.progress} h-full rounded-full transition-all duration-500 ease-out`}
            style={{ width: `${Math.min(progressValue, 100)}%` }}
            role="progressbar"
            aria-valuenow={progressValue}
            aria-valuemin="0"
            aria-valuemax="100"
            aria-label={`Progress: ${progressValue}%`}
          />
        </div>
      )}

      {/* Accent line */}
      <div className={`h-1 w-12 bg-gradient-to-r from-current ${color === "emerald" ? "via-emerald-400 to-emerald-600" : color === "red" ? "via-red-400 to-red-600" : color === "blue" ? "via-blue-400 to-blue-600" : color === "purple" ? "via-purple-400 to-purple-600" : "via-yellow-400 to-yellow-600"} rounded-full mt-4 ${scheme.text}`}></div>
    </div>
  );
});

StatCard.displayName = "StatCard";

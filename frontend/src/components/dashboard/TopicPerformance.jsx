import React, { memo } from "react";

/**
 * Topic Performance Component
 * Displays horizontal progress bars for each topic
 * 
 * Features:
 * - Color-coded performance bars
 * - Multiple topic support
 * - Smooth animations
 * - Performance tier indicators
 * - Responsive layout
 */
export const TopicPerformance = memo(({ topicData = {} }) => {
  // Check if we have topic data
  const hasTopicData = Object.keys(topicData).length > 0;

  const getColorClass = (accuracy) => {
    if (accuracy >= 80) return "from-emerald-400 to-green-500";
    if (accuracy >= 60) return "from-yellow-400 to-orange-400";
    return "from-red-400 to-orange-500";
  };

  const getPerformanceLabel = (accuracy) => {
    if (accuracy >= 80) return "Excellent";
    if (accuracy >= 60) return "Fair";
    return "Needs Work";
  };

  const sortedTopics = Object.entries(topicData)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 6); // Limit to 6 topics for readability

  return (
    <div
      className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 md:p-8 transition-all duration-300"
      role="region"
      aria-label="Topic Performance"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <span className="text-3xl">📚</span>
          <h3 className="text-lg md:text-xl font-bold text-gray-800 dark:text-white">Topic Breakdown</h3>
        </div>
        {hasTopicData && (
          <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full font-semibold">
            {Object.keys(topicData).length} Topics
          </span>
        )}
      </div>

      {/* Topics List */}
      {hasTopicData ? (
        <div className="space-y-4">
          {sortedTopics.map(([topicName, accuracy], index) => (
            <div key={topicName} className="group">
              {/* Topic Header */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">
                    {index === 0 ? "🏆" : index === 1 ? "🥈" : index === 2 ? "🥉" : "✏️"}
                  </span>
                  <p className="font-semibold text-gray-700 dark:text-gray-300 capitalize">
                    {topicName}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <p className={`text-sm font-bold ${
                    accuracy >= 80 ? "text-emerald-600 dark:text-emerald-400" :
                    accuracy >= 60 ? "text-yellow-600 dark:text-yellow-400" :
                    "text-red-600 dark:text-red-400"
                  }`}>
                    {Math.round(accuracy)}%
                  </p>
                  <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded font-semibold">
                    {getPerformanceLabel(accuracy)}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="relative w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                {/* Background gradient bar */}
                <div
                  className={`h-full bg-gradient-to-r ${getColorClass(accuracy)} rounded-full transition-all duration-700 ease-out transform origin-left`}
                  style={{ width: `${accuracy}%` }}
                  role="progressbar"
                  aria-valuenow={accuracy}
                  aria-valuemin="0"
                  aria-valuemax="100"
                  aria-label={`${topicName}: ${accuracy}% accuracy`}
                ></div>

                {/* Shimmer effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div 
                    className="h-full bg-white/20 rounded-full"
                    style={{ width: `${accuracy}%` }}
                  ></div>
                </div>
              </div>

              {/* Performance indicator */}
              <div className="mt-1 flex justify-between items-end">
                <div></div>
                {accuracy >= 80 && (
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                    <span>✓</span> Strong understanding
                  </p>
                )}
                {accuracy >= 60 && accuracy < 80 && (
                  <p className="text-xs text-yellow-600 dark:text-yellow-400 font-semibold flex items-center gap-1">
                    <span>→</span> Room for improvement
                  </p>
                )}
                {accuracy < 60 && (
                  <p className="text-xs text-red-600 dark:text-red-400 font-semibold flex items-center gap-1">
                    <span>⚠️</span> Needs focused review
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <span className="text-6xl mb-4">📖</span>
          <p className="text-gray-600 dark:text-gray-400 font-medium">No topic data yet</p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
            Start answering questions to see topic-wise performance
          </p>
        </div>
      )}

      {/* Legend */}
      {hasTopicData && (
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase mb-3">Performance Scale</p>
          <div className="grid grid-cols-3 gap-3 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-gradient-to-r from-emerald-400 to-green-500"></div>
              <span className="text-gray-700 dark:text-gray-300">80%+ Excellent</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-gradient-to-r from-yellow-400 to-orange-400"></div>
              <span className="text-gray-700 dark:text-gray-300">60-80% Fair</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-gradient-to-r from-red-400 to-orange-500"></div>
              <span className="text-gray-700 dark:text-gray-300">&lt;60% Poor</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

TopicPerformance.displayName = "TopicPerformance";

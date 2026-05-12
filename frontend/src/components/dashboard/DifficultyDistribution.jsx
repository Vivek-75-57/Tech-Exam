import React, { memo } from "react";
import { BarChart3, Target } from "lucide-react";

/**
 * Difficulty Distribution Component
 * Displays pie chart of question difficulty levels
 * 
 * Features:
 * - SVG-based pie chart
 * - Color-coded segments
 * - Animated entrance
 * - Legend with count
 * - Responsive sizing
 */
export const DifficultyDistribution = memo(({
  distribution = { easy: 0, medium: 0, hard: 0 },
}) => {
  const total = distribution.easy + distribution.medium + distribution.hard;
  
  // Calculate percentages
  const easyPercent = total > 0 ? (distribution.easy / total) * 100 : 0;
  const mediumPercent = total > 0 ? (distribution.medium / total) * 100 : 0;
  const hardPercent = total > 0 ? (distribution.hard / total) * 100 : 0;

  // SVG pie chart calculations
  const pieData = [
    { label: "Easy", value: distribution.easy, percent: easyPercent, color: "#10b981", startAngle: 0 },
    { label: "Medium", value: distribution.medium, percent: mediumPercent, color: "#f59e0b", startAngle: easyPercent },
    { label: "Hard", value: distribution.hard, percent: hardPercent, color: "#ef4444", startAngle: easyPercent + mediumPercent },
  ];

  const createPieSlice = (startPercent, endPercent, color) => {
    const startAngle = (startPercent / 100) * 360 - 90;
    const endAngle = (endPercent / 100) * 360 - 90;
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    const x1 = 50 + 40 * Math.cos(startRad);
    const y1 = 50 + 40 * Math.sin(startRad);
    const x2 = 50 + 40 * Math.cos(endRad);
    const y2 = 50 + 40 * Math.sin(endRad);

    const largeArc = endPercent - startPercent > 50 ? 1 : 0;

    const path = `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`;

    return <path d={path} fill={color} className="transition-all duration-300 hover:opacity-80" />;
  };

  return (
    <div
      className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 md:p-8 transition-all duration-300"
      role="region"
      aria-label="Difficulty Distribution"
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        <h3 className="text-lg md:text-xl font-bold text-gray-800 dark:text-white">Difficulty Mix</h3>
      </div>

      {/* Pie Chart */}
      {total > 0 ? (
        <div className="flex flex-col items-center">
          {/* SVG Pie Chart */}
          <svg viewBox="0 0 100 100" className="w-48 h-48 mb-6 filter drop-shadow-lg">
            <defs>
              <linearGradient id="greenGradient">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
              <linearGradient id="amberGradient">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#d97706" />
              </linearGradient>
              <linearGradient id="redGradient">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="#dc2626" />
              </linearGradient>
            </defs>

            {/* Easy (Green) */}
            {easyPercent > 0 && createPieSlice(0, easyPercent, "#10b981")}

            {/* Medium (Amber) */}
            {mediumPercent > 0 &&
              createPieSlice(easyPercent, easyPercent + mediumPercent, "#f59e0b")}

            {/* Hard (Red) */}
            {hardPercent > 0 &&
              createPieSlice(
                easyPercent + mediumPercent,
                100,
                "#ef4444"
              )}

            {/* Center circle for donut effect */}
            <circle
              cx="50"
              cy="50"
              r="25"
              fill="white"
              className="dark:fill-gray-800"
            />

            {/* Center text */}
            <text
              x="50"
              y="50"
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-lg font-bold fill-gray-800 dark:fill-white"
              fontSize="12"
            >
              {total}
            </text>
          </svg>

          {/* Legend */}
          <div className="w-full space-y-2">
            <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-emerald-500"></div>
                <span className="font-semibold text-green-700 dark:text-green-300">Easy</span>
              </div>
              <span className="text-lg font-bold text-green-600 dark:text-green-400">
                {distribution.easy}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-amber-500"></div>
                <span className="font-semibold text-amber-700 dark:text-amber-300">Medium</span>
              </div>
              <span className="text-lg font-bold text-amber-600 dark:text-amber-400">
                {distribution.medium}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-red-500"></div>
                <span className="font-semibold text-red-700 dark:text-red-300">Hard</span>
              </div>
              <span className="text-lg font-bold text-red-600 dark:text-red-400">
                {distribution.hard}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Target className="w-12 h-12 mb-4 text-gray-400 dark:text-gray-600" />
          <p className="text-gray-600 dark:text-gray-400 font-medium">No difficulty data</p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
            Questions will appear here
          </p>
        </div>
      )}

      {/* Stats Footer */}
      {total > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400 font-semibold uppercase">Easy %</p>
              <p className="text-xl font-bold text-green-600 dark:text-green-400">
                {Math.round(easyPercent)}%
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400 font-semibold uppercase">Medium %</p>
              <p className="text-xl font-bold text-amber-600 dark:text-amber-400">
                {Math.round(mediumPercent)}%
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400 font-semibold uppercase">Hard %</p>
              <p className="text-xl font-bold text-red-600 dark:text-red-400">
                {Math.round(hardPercent)}%
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

DifficultyDistribution.displayName = "DifficultyDistribution";

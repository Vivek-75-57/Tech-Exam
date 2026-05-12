import React, { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, AlertCircle, BarChart3, Target, AlertTriangle } from "lucide-react";

export function RelatedConceptsExplorer({ concepts = [] }) {
  const [expandedTopic, setExpandedTopic] = useState(null);

  // Handle empty or undefined data
  if (!concepts || !Array.isArray(concepts) || concepts.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Topic Performance</h2>
        </div>
        <div className="flex items-center justify-center p-8 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <AlertCircle className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600 dark:text-gray-400">No topic data available</p>
          </div>
        </div>
      </div>
    );
  }

  // Filter out invalid entries
  const validConcepts = concepts.filter(concept => concept && typeof concept === 'object');

  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6">
        <TrendingUp className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Topic Performance</h2>
      </div>

      {validConcepts.length === 0 ? (
        <div className="flex items-center justify-center p-8 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <AlertCircle className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600 dark:text-gray-400">No valid topic data available</p>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {validConcepts.map((concept, idx) => {
            // Handle both old format (name, relation) and new format (topic, correct, total, percentage)
            const topicName = concept.name || concept.topic || `Topic ${idx + 1}`;
            const topicDesc = concept.relation || concept.description || "";
            const correct = concept.correct;
            const total = concept.total;
            const percentage = concept.percentage;
            
            // Calculate performance badge color
            let performanceColor = "gray";
            let performanceLevel = "neutral";
            if (typeof percentage === "number") {
              if (percentage >= 80) {
                performanceColor = "green";
                performanceLevel = "excellent";
              } else if (percentage >= 60) {
                performanceColor = "yellow";
                performanceLevel = "good";
              } else {
                performanceColor = "red";
                performanceLevel = "needs-improvement";
              }
            }

            return (
              <motion.div
                key={topicName || idx}
                className="p-4 rounded-lg bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 border-2 border-cyan-200 dark:border-cyan-800 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() =>
                  setExpandedTopic(expandedTopic === idx ? null : idx)
                }
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                {/* Header with topic name and performance */}
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-100">
                      {performanceIcon} {topicName}
                    </h4>
                    {topicDesc && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {topicDesc}
                      </p>
                    )}
                  </div>
                  <span
                    className={`text-2xl transition-transform ${
                      expandedTopic === idx ? "rotate-180" : ""
                    }`}
                  >
                    ▼
                  </span>
                </div>

                {/* Quick stats on first line */}
                {(correct !== undefined || percentage !== undefined) && (
                  <div className="mt-3 flex gap-3 flex-wrap">
                    {typeof percentage === "number" && (
                      <div className="px-3 py-1 bg-white dark:bg-gray-800 rounded-full text-sm font-semibold">
                        <span className={`text-${performanceColor}-600 dark:text-${performanceColor}-400`}>
                          {percentage}%
                        </span>
                      </div>
                    )}
                    {correct !== undefined && total !== undefined && (
                      <div className="px-3 py-1 bg-white dark:bg-gray-800 rounded-full text-sm">
                        <span className="text-gray-700 dark:text-gray-300">
                          {correct} / {total}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* Expanded Details */}
                {expandedTopic === idx && (
                  <motion.div
                    className="mt-4 pt-4 border-t border-cyan-300 dark:border-cyan-700 space-y-3"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Detailed Stats */}
                    <div className="grid grid-cols-2 gap-2">
                      {correct !== undefined && (
                        <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded border border-green-200 dark:border-green-800">
                          <p className="text-xs text-gray-600 dark:text-gray-400">Correct</p>
                          <p className="text-lg font-bold text-green-600 dark:text-green-400">
                            {correct}
                          </p>
                        </div>
                      )}
                      {total !== undefined && (
                        <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800">
                          <p className="text-xs text-gray-600 dark:text-gray-400">Total</p>
                          <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                            {total}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Performance Bar */}
                    {typeof percentage === "number" && (
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <p className="text-xs text-gray-600 dark:text-gray-400 font-semibold">
                            PERFORMANCE
                          </p>
                          <p className="text-sm font-bold text-gray-800 dark:text-gray-100">
                            {percentage}%
                          </p>
                        </div>
                        <div className="w-full h-2 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full rounded-full ${
                              percentage >= 80
                                ? "bg-gradient-to-r from-green-400 to-emerald-500"
                                : percentage >= 60
                                ? "bg-gradient-to-r from-yellow-400 to-orange-500"
                                : "bg-gradient-to-r from-red-400 to-pink-500"
                            }`}
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Alternative content support (for backward compatibility) */}
                    {concept.definition && (
                      <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 font-semibold mb-2">
                          DEFINITION
                        </p>
                        <p className="text-sm text-gray-800 dark:text-gray-100">
                          {concept.definition}
                        </p>
                      </div>
                    )}

                    {concept.example && (
                      <div className="p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                        <p className="text-xs text-gray-600 dark:text-gray-400 font-semibold mb-2">
                          EXAMPLE
                        </p>
                        <p className="text-sm text-gray-800 dark:text-gray-100 whitespace-pre-wrap font-mono">
                          {concept.example}
                        </p>
                      </div>
                    )}
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}

import React, { useState } from "react";
import { Lightbulb, CheckCircle, XCircle, Bot, Target, AlertTriangle, ChevronDown } from "lucide-react";

export function ExplanationPanel({ explanation, isCorrect, basicExplanation }) {
  const [expanded, setExpanded] = useState(false);

  if (!explanation) {
    return (
      <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded p-4">
        <p className="text-sm font-semibold text-blue-800 dark:text-blue-400 mb-2 flex items-center gap-2">
          <Lightbulb className="w-4 h-4" /> Explanation
        </p>
        <p className="text-blue-700 dark:text-blue-300 text-sm">
          {basicExplanation || "No explanation available"}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Basic Explanation */}
      <div className={`border-l-4 rounded p-4 transition-colors ${
        isCorrect
          ? "bg-green-50 dark:bg-green-900/20 border-green-500"
          : "bg-red-50 dark:bg-red-900/20 border-red-500"
      }`}>
        <p className={`text-sm font-semibold mb-2 flex items-center gap-2 ${
          isCorrect
            ? "text-green-800 dark:text-green-400"
            : "text-red-800 dark:text-red-400"
        }`}>
          {isCorrect ? (
            <>
              <CheckCircle className="w-4 h-4" /> Correct Answer
            </>
          ) : (
            <>
              <XCircle className="w-4 h-4" /> Your Answer
            </>
          )}
        </p>
        {basicExplanation && (
          <p className={isCorrect ? "text-green-700 dark:text-green-300" : "text-red-700 dark:text-red-300"}
             style={{ fontSize: "0.9375rem" }}>
            {basicExplanation}
          </p>
        )}
      </div>

      {/* Detailed Explanation Toggle */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 hover:from-blue-100 hover:to-purple-100 dark:hover:from-blue-900/30 dark:hover:to-purple-900/30 border border-blue-200 dark:border-blue-700 transition-colors"
      >
        <span className="flex items-center gap-2 font-semibold text-blue-700 dark:text-blue-300">
          <Bot className="w-4 h-4" /> AI-Powered Deep Dive
          <span className="text-xs px-2 py-1 bg-blue-200 dark:bg-blue-800 rounded-full">NEW</span>
        </span>
        <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} />
      </button>

      {/* Detailed Explanation Content */}
      {expanded && explanation && (
        <div className="space-y-3 animate-in fade-in">
          {/* Why Correct */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-700 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Target className="w-5 h-5 flex-shrink-0 text-green-600 dark:text-green-400" />
              <div>
                <h4 className="font-semibold text-green-800 dark:text-green-300 mb-1">
                  Why This Is Correct
                </h4>
                <p className="text-green-700 dark:text-green-400 text-sm leading-relaxed">
                  {explanation.whyCorrect}
                </p>
              </div>
            </div>
          </div>

          {/* Common Mistakes */}
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 border border-orange-200 dark:border-orange-700 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 flex-shrink-0 text-orange-600 dark:text-orange-400" />
              <div className="flex-1">
                <h4 className="font-semibold text-orange-800 dark:text-orange-300 mb-2">
                  Common Mistakes to Avoid
                </h4>
                <ul className="space-y-2">
                  {explanation.commonMistakes && explanation.commonMistakes.map((mistake, idx) => (
                    <li key={idx} className="text-orange-700 dark:text-orange-400 text-sm leading-relaxed flex gap-2">
                      <span className="font-semibold text-orange-600 dark:text-orange-300 flex-shrink-0">•</span>
                      <span>{mistake}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Real-World Application */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-700 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <span className="text-xl flex-shrink-0">🌍</span>
              <div>
                <h4 className="font-semibold text-purple-800 dark:text-purple-300 mb-1">
                  Real-World Application
                </h4>
                <p className="text-purple-700 dark:text-purple-400 text-sm leading-relaxed">
                  {explanation.realWorldApplication}
                </p>
              </div>
            </div>
          </div>

          {/* Key Insight */}
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 border border-indigo-200 dark:border-indigo-700 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 flex-shrink-0 text-indigo-600 dark:text-indigo-400" />
              <div>
                <h4 className="font-semibold text-indigo-800 dark:text-indigo-300 mb-1">
                  Key Insight
                </h4>
                <p className="text-indigo-700 dark:text-indigo-400 text-sm leading-relaxed">
                  {explanation.keyInsight}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

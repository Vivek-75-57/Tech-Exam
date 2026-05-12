import React, { useState } from "react";
import { Button, Card } from "../ui/index.jsx";

export function CodingChallenge({ question }) {
  const [isOpen, setIsOpen] = useState(false);
  const [code, setCode] = useState(question?.skeleton_code || "");
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState(null);

  const handleRunCode = async () => {
    setIsRunning(true);
    try {
      // Simulate code execution
      // In a real application, this would call a backend endpoint
      const output = await simulateCodeExecution(code);
      setResult(output);
    } catch (error) {
      setResult({
        success: false,
        error: error.message,
      });
    } finally {
      setIsRunning(false);
    }
  };

  const simulateCodeExecution = async (code) => {
    // Placeholder for actual code execution
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          output: "Code executed successfully!",
          testsPassed: 3,
          testsFailed: 0,
        });
      }, 1500);
    });
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-300 dark:border-green-800 hover:shadow-md transition-all cursor-pointer"
      >
        <div className="text-left">
          <h4 className="font-bold text-gray-800 dark:text-gray-100">
            💻 Try It Yourself - Coding Challenge
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Write and test your code solution
          </p>
        </div>
        <span
          className={`text-2xl transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>

      {isOpen && (
        <Card className="mt-4">
          {/* Code Editor */}
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-3">
                Code Editor
              </h4>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full p-4 font-mono text-sm bg-gray-900 dark:bg-gray-950 text-gray-100 border-2 border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                rows={10}
                placeholder="Write your code here..."
              />
            </div>

            {/* Test Cases */}
            {question?.test_cases && (
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-lg">
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">
                  📋 Test Cases
                </h4>
                <div className="space-y-2">
                  {question.test_cases.map((test, idx) => (
                    <div
                      key={idx}
                      className="p-2 bg-white dark:bg-gray-800 rounded border border-blue-200 dark:border-blue-700"
                    >
                      <p className="text-sm font-mono text-gray-800 dark:text-gray-100">
                        Input: {test.input}
                      </p>
                      <p className="text-sm font-mono text-gray-600 dark:text-gray-400">
                        Expected: {test.expected_output}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Run Button */}
            <Button
              onClick={handleRunCode}
              disabled={isRunning}
              className="w-full !bg-green-600 hover:!bg-green-700 !text-white !font-bold !py-3"
            >
              {isRunning ? "Running Code..." : "▶ Run Code"}
            </Button>

            {/* Results */}
            {result && (
              <div
                className={`p-4 rounded-lg border-2 ${
                  result.success
                    ? "bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-800"
                    : "bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-800"
                }`}
              >
                <h4
                  className={`font-bold mb-2 ${
                    result.success
                      ? "text-green-900 dark:text-green-100"
                      : "text-red-900 dark:text-red-100"
                  }`}
                >
                  {result.success ? "✅ All Tests Passed!" : "❌ Test Failed"}
                </h4>

                {result.testsPassed !== undefined && (
                  <p
                    className={`text-sm ${
                      result.success
                        ? "text-green-800 dark:text-green-200"
                        : "text-red-800 dark:text-red-200"
                    }`}
                  >
                    {result.testsPassed} passed, {result.testsFailed} failed
                  </p>
                )}

                {result.output && (
                  <div className="mt-3 p-3 bg-white dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-700">
                    <p className="text-xs text-gray-600 dark:text-gray-400 font-semibold mb-2">
                      OUTPUT
                    </p>
                    <pre className="text-xs text-gray-800 dark:text-gray-100 whitespace-pre-wrap break-words font-mono">
                      {result.output}
                    </pre>
                  </div>
                )}

                {result.error && (
                  <div className="mt-3 p-3 bg-red-100 dark:bg-red-900/30 rounded border border-red-300 dark:border-red-700">
                    <p className="text-xs text-red-700 dark:text-red-200 font-mono">
                      {result.error}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Solution Comparison */}
            {question?.solution && (
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 border-2 border-purple-200 dark:border-purple-800 rounded-lg">
                <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-3">
                  ✓ Expected Solution
                </h4>
                <pre className="text-xs text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-800 p-3 rounded border border-purple-200 dark:border-purple-700 overflow-x-auto font-mono">
                  {question.solution}
                </pre>
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}

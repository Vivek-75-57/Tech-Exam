import React, { useState } from "react";
import { Card, Button, RadioGroup } from "../ui/index.jsx";

// Forward ref component for RetakeQuestionPanel
export const RetakeQuestionPanel = React.forwardRef(
  ({ question, userAnswer, correctAnswer, onSubmit, loading }, ref) => {
    const [selectedAnswer, setSelectedAnswer] = useState("");

    const handleSubmit = () => {
      if (selectedAnswer) {
        onSubmit(selectedAnswer);
      }
    };

    return (
      <div ref={ref} className="relative">
        <div className="mb-8 p-6 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-blue-300 dark:border-blue-800 border-dashed">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">⚡</span>
            <p className="font-bold text-blue-900 dark:text-blue-100">
              Interactive Retake Mode - Try a Different Answer!
            </p>
          </div>
          <p className="text-sm text-blue-800 dark:text-blue-200 ml-11">
            Let's see if you can get it right this time. Select your new answer below.
          </p>
        </div>

        <div className="mb-8">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
            Select your new answer:
          </h4>
          <RadioGroup
            name={`retake-question-${question?.id}`}
            options={
              question?.options?.map((opt) => ({
                value: opt.id,
                label: `${opt.id}. ${opt.text}`,
              })) || []
            }
            value={selectedAnswer}
            onChange={(e) => setSelectedAnswer(e.target.value)}
            disabled={loading}
          />
        </div>

        {/* Previous Answer Reference */}
        <div className="mb-8 p-4 rounded-lg bg-gray-100 dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Your Previous Answer:</p>
          <p className="font-semibold text-gray-800 dark:text-gray-100">
            Option {userAnswer}
          </p>
        </div>

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          disabled={!selectedAnswer || loading}
          className="w-full !bg-blue-600 hover:!bg-blue-700 !text-white !font-bold !py-3"
          variant="primary"
        >
          {loading ? "Checking Answer..." : "Submit New Answer"}
        </Button>

        {/* Correct Answer Reference (subtle) */}
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center italic">
          The correct answer is Option {correctAnswer}
        </p>
      </div>
    );
  }
);

RetakeQuestionPanel.displayName = "RetakeQuestionPanel";

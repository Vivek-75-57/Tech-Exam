import React, { memo, useEffect, useState } from "react";

/**
 * Streak Counter Component
 * Displays current correct answer streak with animation
 * 
 * Features:
 * - Animated fire emoji
 * - Streak count display
 * - Motivational messages
 * - Color gradient based on streak length
 * - Scale animation on streak increase
 * - Responsive sizing
 */
export const StreakCounter = memo(({ count = 0 }) => {
  const [prevCount, setPrevCount] = useState(count);
  const [isAnimating, setIsAnimating] = useState(false);

  // Trigger animation when count increases
  useEffect(() => {
    if (count > prevCount) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 500);
      return () => clearTimeout(timer);
    }
    setPrevCount(count);
  }, [count, prevCount]);

  // Get message based on streak count
  const getStreakMessage = (streakCount) => {
    if (streakCount === 0) return "Keep going! 💪";
    if (streakCount === 1) return "Great start! 🎯";
    if (streakCount === 2) return "Two in a row! ⭐";
    if (streakCount === 3) return "On fire! 🔥";
    if (streakCount === 5) return "Unstoppable! 🚀";
    if (streakCount >= 10) return "Legend status! 👑";
    return "Crushing it! 💯";
  };

  // Get color based on streak count
  const getStreakColor = (streakCount) => {
    if (streakCount === 0) return "from-gray-400 to-gray-500";
    if (streakCount === 1) return "from-blue-400 to-blue-500";
    if (streakCount === 2) return "from-cyan-400 to-cyan-500";
    if (streakCount === 3) return "from-amber-400 to-orange-500";
    if (streakCount >= 5) return "from-red-400 to-pink-500";
    return "from-purple-400 to-purple-500";
  };

  return (
    <div
      className={`w-full bg-gradient-to-br ${getStreakColor(
        count
      )} rounded-xl shadow-lg overflow-hidden border-2 border-yellow-300 dark:border-yellow-600 transition-all duration-300 transform ${
        isAnimating ? "scale-105" : "scale-100"
      }`}
      role="status"
      aria-live="polite"
      aria-label={`Current streak: ${count} correct answers`}
    >
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-2xl transform translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full blur-2xl transform -translate-x-1/3 translate-y-1/3"></div>
      </div>

      <div className="relative p-6 md:p-8 text-center text-white">
        {/* Animated fire emoji */}
        <div className="text-6xl md:text-7xl mb-3 animate-bounce" style={{ animationDuration: "1s" }}>
          🔥
        </div>

        {/* Streak count */}
        <div className="mb-3">
          <p className="text-xs font-bold uppercase tracking-wider opacity-90 mb-1">
            Correct Streak
          </p>
          <p className={`text-5xl md:text-6xl font-black drop-shadow-lg transition-all duration-300 ${
            isAnimating ? "scale-110" : "scale-100"
          }`}>
            {count}
          </p>
        </div>

        {/* Motivational message */}
        <p className="text-sm md:text-base font-semibold opacity-95 mb-4">
          {getStreakMessage(count)}
        </p>

        {/* Progress indicator dots */}
        <div className="flex justify-center gap-2 mb-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i < Math.min(count, 3)
                  ? "bg-white shadow-lg scale-100"
                  : "bg-white/30 scale-75"
              }`}
            ></div>
          ))}
        </div>

        {/* Streak milestone badges */}
        {count > 0 && (
          <div className="pt-3 border-t border-white/30">
            <p className="text-xs font-semibold opacity-75 mb-2">Milestones</p>
            <div className="flex justify-center gap-2 flex-wrap">
              {count >= 1 && (
                <span className="inline-block bg-white/30 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-bold">
                  ✓ Started
                </span>
              )}
              {count >= 3 && (
                <span className="inline-block bg-white/30 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-bold">
                  ⭐ Hot
                </span>
              )}
              {count >= 5 && (
                <span className="inline-block bg-white/30 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-bold">
                  🚀 Blazing
                </span>
              )}
              {count >= 10 && (
                <span className="inline-block bg-white/30 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-bold">
                  👑 Legend
                </span>
              )}
            </div>
          </div>
        )}

        {/* Help text when no streak */}
        {count === 0 && (
          <p className="text-xs opacity-75 pt-3 border-t border-white/30 mt-3">
            Answer 3 questions correctly to start a streak!
          </p>
        )}
      </div>
    </div>
  );
});

StreakCounter.displayName = "StreakCounter";

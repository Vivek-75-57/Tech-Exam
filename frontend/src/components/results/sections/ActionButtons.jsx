import React from "react";
import { motion } from "framer-motion";
import {
  ClipboardList,
  BookOpen,
  RotateCcw,
  Share2,
  FileText,
} from "lucide-react";

const buttonVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.1,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

const hoverVariants = {
  hover: {
    scale: 1.05,
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.15)",
  },
  tap: { scale: 0.95 },
};

const BUTTONS = [
  {
    id: "details",
    label: "View Details",
    icon: ClipboardList,
    color: "from-blue-500 to-cyan-500",
    textColor: "text-white",
    bgColor: "bg-gradient-to-r from-blue-500 to-cyan-500",
    hoverColor: "hover:from-blue-600 hover:to-cyan-600",
  },
  {
    id: "resources",
    label: "Resources",
    icon: BookOpen,
    color: "from-green-500 to-emerald-500",
    textColor: "text-white",
    bgColor: "bg-gradient-to-r from-green-500 to-emerald-500",
    hoverColor: "hover:from-green-600 hover:to-emerald-600",
  },
  {
    id: "retake",
    label: "Retake Exam",
    icon: RotateCcw,
    color: "from-orange-500 to-red-500",
    textColor: "text-white",
    bgColor: "bg-gradient-to-r from-orange-500 to-red-500",
    hoverColor: "hover:from-orange-600 hover:to-red-600",
  },
  {
    id: "share",
    label: "Share Results",
    icon: Share2,
    color: "from-purple-500 to-pink-500",
    textColor: "text-white",
    bgColor: "bg-gradient-to-r from-purple-500 to-pink-500",
    hoverColor: "hover:from-purple-600 hover:to-pink-600",
  },
  {
    id: "report",
    label: "Download Report",
    icon: FileText,
    color: "from-gray-500 to-slate-500",
    textColor: "text-white",
    bgColor: "bg-gradient-to-r from-gray-500 to-slate-500",
    hoverColor: "hover:from-gray-600 hover:to-slate-600",
  },
];

export function ActionButtons({
  onRestart,
  onViewBookmarks,
  onDownloadReport,
}) {
  const handleButtonClick = (buttonId) => {
    switch (buttonId) {
      case "details":
        onViewBookmarks?.();
        break;
      case "resources":
        // Open resources page
        window.open("https://techexam.com/resources", "_blank");
        break;
      case "retake":
        onRestart?.();
        break;
      case "share":
        // Share functionality
        navigator.share?.({
          title: "TechExam Results",
          text: "Check out my exam results!",
          url: window.location.href,
        });
        break;
      case "report":
        onDownloadReport?.();
        break;
    }
  };

  return (
    <motion.div className="space-y-6">
      {/* Button Action Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-5 gap-4"
        initial="hidden"
        animate="visible"
      >
        {BUTTONS.map((button, idx) => {
          const Icon = button.icon;

          return (
            <motion.button
              key={button.id}
              custom={idx}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              initial="hidden"
              animate="visible"
              onClick={() => handleButtonClick(button.id)}
              className={`${button.bgColor} ${button.hoverColor} ${button.textColor} rounded-lg px-6 py-4 font-semibold transition-all duration-300 flex flex-col items-center gap-2 shadow-md`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-sm">{button.label}</span>
            </motion.button>
          );
        })}
      </motion.div>

      {/* Motivational Footer */}
      <motion.div
        className="text-center space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Keep practicing to improve your skills!
        </p>

        <motion.div
          className="flex flex-wrap justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {["🎯 Stay Focused", "📚 Keep Learning", "💪 You Got This"].map(
            (text, idx) => (
              <motion.span
                key={idx}
                className="text-xs bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full font-semibold"
                animate={{ y: [0, -5, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: idx * 0.2,
                }}
              >
                {text}
              </motion.span>
            )
          )}
        </motion.div>
      </motion.div>

      {/* Bottom Stats Bar */}
      <motion.div
        className="grid grid-cols-3 gap-4 md:gap-6 pt-6 border-t border-gray-200 dark:border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <motion.div className="text-center" whileHover={{ scale: 1.05 }}>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">12</p>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Exams Taken</p>
        </motion.div>

        <motion.div className="text-center" whileHover={{ scale: 1.05 }}>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
            72%
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            Average Score
          </p>
        </motion.div>

        <motion.div className="text-center" whileHover={{ scale: 1.05 }}>
          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            5
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            Day Streak
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

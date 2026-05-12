import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Zap } from "lucide-react";
import { Header } from "./components/layout/Header";
import { ThemeProvider } from "./hooks/useTheme.jsx";
import { HomePage } from "./pages/HomePage";
import { ExamSetupPage } from "./pages/ExamSetupPage";
import { ExamTakingPage } from "./pages/ExamTakingPage";
import { ModernResultsPage } from "./components/results/ModernResultsPage";
import { QuestionDetailsPage } from "./pages/QuestionDetailsPage";
import { ExamHistoryPage } from "./pages/ExamHistoryPage";
import { TopicMasteryPage } from "./pages/TopicMasteryPage";
import { ProfilePage } from "./pages/ProfilePage";
import { LeaderboardPage } from "./pages/LeaderboardPage";

function AppContent() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300 flex flex-col">
      <Header />
      
      <main className="flex-1 py-12 px-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/exam/setup" element={<ExamSetupPage />} />
          <Route path="/exam/taking" element={<ExamTakingPage />} />
          <Route path="/exam/results" element={<ModernResultsPage />} />
          <Route path="/questions/:id" element={<QuestionDetailsPage />} />
          <Route path="/exam-history" element={<ExamHistoryPage />} />
          <Route path="/topic-mastery" element={<TopicMasteryPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 py-6 text-center text-gray-600 dark:text-gray-400 text-sm transition-colors duration-300">
        <p className="flex items-center justify-center gap-2">
          Made with <Zap className="w-4 h-4" /> by ExamForge • © 2026
        </p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

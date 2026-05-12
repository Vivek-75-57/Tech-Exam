import { HomePage } from "./pages/HomePage";
import { ExamSetupPage } from "./pages/ExamSetupPage";
import { ExamTakingPage } from "./pages/ExamTakingPage";
import { EnhancedResultsPage } from "../components/results/EnhancedResultsPage";
import { QuestionDetailsPage } from "./pages/QuestionDetailsPage";
import { ExamHistoryPage } from "./pages/ExamHistoryPage";
import { TopicMasteryPage } from "./pages/TopicMasteryPage";
import { ProfilePage } from "./pages/ProfilePage";
import { LeaderboardPage } from "./pages/LeaderboardPage";

export const routes = [
  {
    path: "/",
    element: <HomePage />,
    label: "Home",
  },
  {
    path: "/exam/setup",
    element: <ExamSetupPage />,
    label: "Exam Setup",
  },
  {
    path: "/exam/taking",
    element: <ExamTakingPage />,
    label: "Exam",
  },
  {
    path: "/exam/results",
    element: <EnhancedResultsPage />,
    label: "Results",
  },
  {
    path: "/questions/:id",
    element: <QuestionDetailsPage />,
    label: "Question Details",
  },
  {
    path: "/exam-history",
    element: <ExamHistoryPage />,
    label: "Exam History",
  },
  {
    path: "/topic-mastery",
    element: <TopicMasteryPage />,
    label: "Topic Mastery",
  },
  {
    path: "/profile",
    element: <ProfilePage />,
    label: "Profile",
  },
  {
    path: "/leaderboard",
    element: <LeaderboardPage />,
    label: "Leaderboard",
  },
];

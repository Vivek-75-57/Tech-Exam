import express from "express";
import cors from "cors";
import morgan from "morgan";
import { config } from "./config/index.js";

const app = express();

// Middleware
app.use(morgan("combined"));
app.use(cors(config.cors));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Routes
import { examRoutes } from "./routes/exam.js";
import { healthRoutes } from "./routes/health.js";
import { bookmarkRoutes } from "./routes/bookmark.js";
import exportRoutes from "./routes/exportRoutes.js";
import { aiChatRoutes } from "./routes/aiChat.js";

app.use("/api/exams", examRoutes);
app.use("/api/health", healthRoutes);
app.use("/api/bookmarks", bookmarkRoutes);
app.use("/api/export", exportRoutes);
app.use("/api/ai-chat", aiChatRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    error: err.message || "Internal server error",
    ...(config.nodeEnv === "development" && { stack: err.stack }),
  });
});

export default app;

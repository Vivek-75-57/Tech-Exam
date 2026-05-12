import dotenv from "dotenv";

dotenv.config();

export const config = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: parseInt(process.env.PORT || "3001", 10),
  groqApiKey: process.env.GROQ_API_KEY,
  demoMode: process.env.DEMO_MODE === "true" || !process.env.GROQ_API_KEY,
  chromaDbUrl: process.env.CHROMADB_URL || "http://localhost:8001",
  cors: {
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
  },
  groq: {
    model: process.env.GROQ_MODEL || "llama-3.1-8b-instant",
    maxTokens: parseInt(process.env.GROQ_MAX_TOKENS || "4096", 10),
  },
};

export function validateConfig() {
  if (!config.demoMode && !config.groqApiKey) {
    console.warn("⚠️  GROQ_API_KEY not set. Running in DEMO_MODE");
  } else if (config.demoMode) {
    console.log("📋 Running in DEMO_MODE - using mock questions");
  } else {
    console.log("🚀 Groq API configured - using live question generation");
  }
}

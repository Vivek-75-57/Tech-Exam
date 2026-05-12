import { validateConfig } from "./config/index.js";
import { vectorStore } from "./services/vectorStore.js";
import { config } from "./config/index.js";
import app from "./app.js";

async function bootstrap() {
  try {
    // Validate environment
    validateConfig();

    // Init vector store
    await vectorStore.init();

    // Start server
    app.listen(config.port, () => {
      console.log("\n🚀 ExamForge Backend");
      console.log(`   ENV:    ${config.nodeEnv}`);
      console.log(`   PORT:   ${config.port}`);
      console.log(`   API:    http://localhost:${config.port}/api`);
      console.log(`   Health: http://localhost:${config.port}/api/health\n`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err.message);
    process.exit(1);
  }
}

bootstrap();

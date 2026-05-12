import express from "express";
import { aiChatController } from "../controllers/aiChat.js";

const router = express.Router();

// Send message to AI
router.post("/", aiChatController.sendMessage);

export { router as aiChatRoutes };

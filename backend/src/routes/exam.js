import { Router } from "express";
import { examController } from "../controllers/exam.js";

const router = Router();

router.post("/generate", examController.generateExam);
router.post("/score", examController.scoreExam);
router.get("/stats", examController.getStats);
router.get("/history", examController.getHistory);

export const examRoutes = router;

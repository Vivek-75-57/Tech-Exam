import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.json({
    status: "ok",
    service: "ExamForge Backend",
    timestamp: new Date().toISOString(),
  });
});

export const healthRoutes = router;

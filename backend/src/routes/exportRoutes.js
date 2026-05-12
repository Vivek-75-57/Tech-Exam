/**
 * Export/Download API Routes
 * Handles exam report generation and download
 */

import express from "express";
import { reportService } from "../services/reportService.js";

const router = express.Router();

/**
 * POST /api/export/download
 * Generate downloadable exam report (file download)
 * 
 * Request body:
 * {
 *   examData: { questions, metadata },
 *   answersData: { answers, correctAnswers, accuracy },
 *   performanceData: { rating, topicPerformance, streak },
 *   format: "json" | "csv"
 * }
 */
router.post("/download", (req, res) => {
  try {
    const { examData, answersData, performanceData, format = "json" } = req.body;

    console.log("📥 Export request received:");
    console.log("  - examData:", examData ? "✓ present" : "✗ MISSING");
    console.log("  - answersData:", answersData ? "✓ present" : "✗ MISSING");
    console.log("  - performanceData:", performanceData ? "✓ present" : "✗ MISSING");
    console.log("  - format:", format);

    if (!examData || !answersData || !performanceData) {
      console.error("ERROR: Missing required data in request body");
      return res.status(400).json({ error: "Missing required exam data" });
    }

    // Generate report
    const reportData = reportService.generateExamReport(
      examData,
      answersData,
      performanceData
    );

    // Create downloadable file
    const fileData = reportService.createDownloadFile(
      format,
      reportData,
      examData,
      answersData
    );

    // Send as downloadable file
    res.setHeader("Content-Type", fileData.mimeType);
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${fileData.filename}"`
    );
    res.send(fileData.content);

    console.log(`✅ Successfully exported exam as ${format}`);
  } catch (error) {
    console.error("Export error:", error);
    res.status(500).json({ error: "Failed to generate export", message: error.message });
  }
});

/**
 * POST /api/export/report
 * Get exam report data (JSON response)
 */
router.post("/report", (req, res) => {
  try {
    const { examData, answersData, performanceData } = req.body;

    if (!examData || !answersData || !performanceData) {
      return res.status(400).json({ error: "Missing required exam data" });
    }

    const reportData = reportService.generateExamReport(
      examData,
      answersData,
      performanceData
    );

    res.json({
      success: true,
      report: reportData,
    });

    console.log(`📊 Generated report for exam ${examData.examId || "unknown"}`);
  } catch (error) {
    console.error("Report generation error:", error);
    res.status(500).json({ error: "Failed to generate report", message: error.message });
  }
});

export default router;

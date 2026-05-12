import React, { useState } from "react";
import { apiClient } from "../../services/apiClient";

export const DownloadReport = ({ 
  questions = [], 
  answersData, 
  performanceData 
}) => {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    try {
      setLoading(true);

      const examData = {
        questions,
        examId: `exam-${new Date().getTime()}`,
        metadata: {},
      };

      const blob = await apiClient.downloadReport(
        examData,
        answersData,
        performanceData,
        "pdf"
      );

      // Create download link
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        `exam-report-${new Date().toISOString().split("T")[0]}.pdf`
      );
      link.style.visibility = "hidden";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      className={`p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all ${
        loading ? "opacity-50 cursor-not-allowed" : "hover:scale-110"
      }`}
      title="Download PDF Report"
      aria-label="Download exam report as PDF"
    >
      {loading ? (
        <svg className="w-5 h-5 animate-spin text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      ) : (
        <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
      )}
    </button>
  );
};


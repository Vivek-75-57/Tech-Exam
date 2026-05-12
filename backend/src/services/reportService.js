/**
 * Report Generation Service
 * Creates exam reports in multiple formats (JSON, CSV, TXT)
 */

class ReportService {
  generateExamReport(examData, answersData, performanceData) {
    const {
      examId = "",
      questions = [],
      metadata = {},
    } = examData;

    const {
      correctAnswers = 0,
      incorrectAnswers = 0,
      accuracy = 0,
      questionsAnswered = 0,
      totalTime = 0,
      answers = {},
    } = answersData;

    const {
      rating = "Fair",
      topicPerformance = {},
      difficultyStats = {},
      streakCount = 0,
    } = performanceData;

    return {
      header: {
        title: "Exam Performance Report",
        examId,
        generatedAt: new Date().toISOString(),
        timestamp: new Date().toLocaleString(),
      },
      summary: {
        score: accuracy,
        correct: correctAnswers,
        incorrect: incorrectAnswers,
        rating,
        streak: streakCount,
        timeSpent: this.formatTime(totalTime),
      },
      metadata,
      performance: {
        rating,
        accuracy,
      },
      topicAnalysis: Object.entries(topicPerformance).map(([topic, acc]) => ({
        topic,
        accuracy: acc,
        grade: this.getGrade(acc),
      })),
      questionDetails: questions.map((q, idx) => {
        const userAnswer = answers[q.id];
        const isCorrect = userAnswer === q.correct_answer;

        return {
          number: idx + 1,
          question: q.question,
          topic: q.topic,
          difficulty: q.difficulty,
          userAnswer,
          correctAnswer: q.correct_answer,
          isCorrect,
          explanation: q.explanation || "",
        };
      }),
    };
  }

  formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }

  getGrade(accuracy) {
    if (accuracy >= 90) return "A";
    if (accuracy >= 80) return "B";
    if (accuracy >= 70) return "C";
    if (accuracy >= 60) return "D";
    return "F";
  }

  generateJSON(reportData) {
    return JSON.stringify(reportData, null, 2);
  }

  generateCSV(questions, answers, metadata) {
    let csv = "Question #,Topic,Difficulty,Your Answer,Correct Answer,Result\n";

    questions.forEach((q, idx) => {
      const userAnswer = answers[q.id] || "Not Answered";
      const correctAnswer = q.correct_answer;
      const isCorrect = userAnswer === correctAnswer ? "CORRECT" : "WRONG";

      csv += `${idx + 1},"${q.topic}","${q.difficulty}","${userAnswer}","${correctAnswer}","${isCorrect}"\n`;
    });

    return csv;
  }

  generatePDF(reportData) {
    // Simple text-based PDF generation using escaped newlines
    // For production, use libraries like pdfkit or puppeteer
    let pdfContent = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> >> >> >>
endobj
4 0 obj
<< /Length 1000 >>
stream
BT
/F1 24 Tf
50 750 Td
(Exam Performance Report) Tj
0 -40 Td
/F1 12 Tf
(Exam ID: ${reportData.header.examId}) Tj
0 -20 Td
(Generated: ${reportData.header.timestamp}) Tj
0 -40 Td
/F1 16 Tf
(Summary) Tj
0 -25 Td
/F1 11 Tf
(Score: ${reportData.summary.score}%) Tj
0 -15 Td
(Correct: ${reportData.summary.correct}) Tj
0 -15 Td
(Incorrect: ${reportData.summary.incorrect}) Tj
0 -15 Td
(Rating: ${reportData.summary.rating}) Tj
0 -40 Td
/F1 16 Tf
(Topic Performance) Tj
0 -25 Td
/F1 11 Tf`;

    reportData.topicAnalysis.forEach(t => {
      pdfContent += `(${t.topic}: ${t.accuracy}% - Grade ${t.grade}) Tj\n0 -15 Td\n`;
    });

    pdfContent += `ET
endstream
endobj
xref
0 5
0000000000 65535 f
0000000009 00000 n
0000000074 00000 n
0000000133 00000 n
0000000281 00000 n
trailer
<< /Size 5 /Root 1 0 R >>
startxref
1320
%%EOF`;

    return pdfContent;
  }

  createDownloadFile(format, reportData, examData, answersData) {
    let content, mimeType, filename;

    switch (format.toLowerCase()) {
      case "json":
        content = this.generateJSON(reportData);
        mimeType = "application/json";
        filename = `exam-report-${reportData.header.examId}.json`;
        break;

      case "csv":
        content = this.generateCSV(examData.questions, answersData.answers, examData.metadata);
        mimeType = "text/csv";
        filename = `exam-answers-${reportData.header.examId}.csv`;
        break;

      case "pdf":
        content = this.generatePDF(reportData);
        mimeType = "application/pdf";
        filename = `exam-report-${reportData.header.examId}.pdf`;
        break;

      default:
        throw new Error(`Unsupported format: ${format}`);
    }

    return {
      content,
      mimeType,
      filename,
    };
  }
}

export const reportService = new ReportService();

import { groqService } from "../services/groqService.js";

export const aiChatController = {
  async sendMessage(req, res) {
    try {
      const { questionId, question, userMessage, context = {} } = req.body;

      console.log("📝 AI Chat Request:", { question, userMessage, context });

      if (!question || !userMessage) {
        console.warn("❌ Missing required fields");
        return res.status(400).json({
          error: "Missing required fields: question and userMessage",
        });
      }

      // Build a comprehensive prompt for the AI
      const systemPrompt = `You are an expert educational tutor helping students understand exam questions and concepts.
      
QUESTION: ${question}

${context?.correctAnswer ? `CORRECT ANSWER: ${context.correctAnswer}` : ""}
${context?.topic ? `TOPIC: ${context.topic}` : ""}
${context?.difficulty ? `DIFFICULTY: ${context.difficulty}` : ""}

STUDENT QUESTION: "${userMessage}"

**IMPORTANT**: Format your response as a **bulleted list** with short, concise points. Each bullet should be 1-2 sentences max.

Provide a clear, educational response using bullets that:
• Directly address their question
• Use examples when helpful
• Explain the key concept clearly
• Are concise and easy to scan
• Help them learn, not just answer

Keep the tone friendly and encouraging. Use 5-8 bullet points maximum.`;

      console.log("🔄 Sending to Groq API...");

      // Call Groq to get the response
      const response = await groqService.chat([
        {
          role: "user",
          content: systemPrompt,
        },
      ]);

      console.log("✅ AI Response received:", response.substring(0, 100) + "...");

      res.json({
        success: true,
        response: response,
        questionId,
        messageId: `msg-${Date.now()}`,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error("❌ AI Chat Error:", error);
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : "Failed to get AI response",
        messageId: `msg-error-${Date.now()}`,
      });
    }
  },
};

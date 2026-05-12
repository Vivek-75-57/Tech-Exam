import { useState, useCallback } from "react";
import { apiClient } from "../services/apiClient.js";

export function useAiChat() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = useCallback(
    async (payload) => {
      console.log("🚀 useAiChat.sendMessage called with:", payload);

      // Add user message to chat
      const userMessage = {
        role: "user",
        content: payload.userMessage,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);
      setError(null);

      try {
        console.log("📡 Calling API endpoint...");
        // Call API to get AI response
        const response = await apiClient.sendAiChatMessage(payload);

        console.log("✅ API response received:", response);

        if (!response || !response.response) {
          throw new Error("Invalid response format from server");
        }

        // Add AI response to chat
        const aiMessage = {
          role: "assistant",
          content: response.response,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, aiMessage]);
        setError(null);
      } catch (err) {
        console.error("❌ Error in useAiChat:", err);
        
        const errorMsg = err.response?.data?.error || err.message || "Failed to get AI response";
        setError(errorMsg);

        // Add error message to chat
        const errorMessage = {
          role: "assistant",
          content: `⚠️ ${errorMsg}. Please try again.`,
          timestamp: new Date(),
          isError: true,
        };

        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const clearChat = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearChat,
  };
}

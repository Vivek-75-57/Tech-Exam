import React, { useState, useRef, useEffect } from "react";
import { useAiChat } from "../../hooks/useAiChat.js";
import { Send, AlertCircle, Bot, Lightbulb, Sparkles } from "lucide-react";

export function AiChatAssistant({ question, context = {} }) {
  const [inputValue, setInputValue] = useState("");
  const { messages, loading, error, sendMessage } = useAiChat();
  const messagesEndRef = useRef(null);
  const [isOpen, setIsOpen] = useState(true);

  // Function to format text with bullet points
  const formatWithBullets = (text) => {
    if (!text) return [];
    
    // Split by common bullet patterns or line breaks
    const lines = text.split(/[\n•\-\*]/);
    return lines
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .slice(0, 10); // Limit to 10 bullets
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || loading) return;

    const userInput = inputValue;
    setInputValue("");

    console.log("📤 Sending AI message:", userInput);
    console.log("   Question:", question);
    console.log("   Context:", context);

    await sendMessage({
      userMessage: userInput,
      question: question,
      context: context,
    });
  };

  const suggestedQuestions = [
    "Explain this concept better",
    "Why is this the correct answer?",
    "What are common mistakes?",
    "How does this relate to other topics?",
  ];

  const handleSuggestedQuestion = (suggestedQuestion) => {
    setInputValue(suggestedQuestion);
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 px-4 py-4 flex items-center justify-between flex-shrink-0">
        <div>
          <h3 className="text-white font-bold text-base flex items-center gap-2">
            <Bot className="w-5 h-5" /> AI Tutor
          </h3>
          <p className="text-blue-100 text-xs mt-1">Ask questions about this topic</p>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white text-xl hover:bg-blue-500 p-2 rounded transition-colors"
        >
          {isOpen ? "−" : "+"}
        </button>
      </div>

      {isOpen && (
        <>
          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-800/50">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-slate-500 dark:text-slate-400 py-8">
                <Lightbulb className="w-12 h-12 mb-3 text-blue-400" />
                <p className="text-sm font-medium mb-4">Ask me anything</p>
                <p className="text-xs text-slate-600 dark:text-slate-500 mb-6 max-w-xs">
                  Get instant explanations and clarifications about exam questions
                </p>
                <div className="w-full space-y-2">
                  {suggestedQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSuggestedQuestion(q)}
                      className="w-full text-left px-3 py-2 text-xs bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded border border-slate-200 dark:border-slate-600 transition-colors"
                    >
                      "{q}"
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} px-2`}
                  >
                    <div
                      className={`max-w-2xl w-full sm:w-5/6 px-4 py-3 rounded-xl text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-blue-600 text-white rounded-br-none shadow-md"
                          : msg.isError
                          ? "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border border-red-300 dark:border-red-700 rounded-bl-none flex items-start gap-2 shadow-sm"
                          : "bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-bl-none shadow-md border border-slate-200 dark:border-slate-600"
                      }`}
                    >
                      {msg.isError && <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />}
                      <div className="flex-1">
                        {msg.role === "assistant" && !msg.isError ? (
                          <ul className="space-y-2">
                            {formatWithBullets(msg.content).map((bullet, bidx) => (
                              <li key={bidx} className="flex items-start gap-2">
                                <span className="text-blue-500 font-bold flex-shrink-0 mt-0.5">•</span>
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="break-words">{msg.content}</p>
                        )}
                        <span className="text-xs opacity-60 mt-2 block">
                          {new Date(msg.timestamp).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start px-2">
                    <div className="bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100 px-4 py-3 rounded-xl rounded-bl-none shadow-md border border-slate-200 dark:border-slate-600 max-w-2xl w-full sm:w-5/6">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-blue-500 flex-shrink-0" />
                        <span className="text-sm">AI Tutor is typing...</span>
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Error Message */}
          {error && !loading && (
            <div className="mx-4 mt-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs rounded flex items-start gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Input Box */}
          <form
            onSubmit={handleSendMessage}
            className="border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4 flex-shrink-0"
          >
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask your question..."
                disabled={loading}
                className="flex-1 px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              />
              <button
                type="submit"
                disabled={loading || !inputValue.trim()}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded text-sm font-medium transition-colors flex items-center gap-2"
                title="Send message (Enter)"
              >
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">Send</span>
              </button>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              Press Enter to send
            </p>
          </form>
        </>
      )}
    </div>
  );
}


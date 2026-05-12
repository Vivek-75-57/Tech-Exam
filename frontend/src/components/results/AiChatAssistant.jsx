import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, Bot, X, RotateCw } from "lucide-react";
import { Card, Button } from "../ui/index.jsx";

export function AiChatAssistant({ question, correctAnswer, messages, isLoading, onSendMessage, isMobile, onToggleMobile }) {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput("");

    await onSendMessage({
      questionId: question?.id,
      question: question?.question,
      userMessage,
      context: {
        correctAnswer,
        topic: question?.topic,
        difficulty: question?.difficulty,
      },
    });

    // Focus back to input
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const suggestedQuestions = [
    `Why is ${correctAnswer} the correct answer?`,
    "Can you give me another example?",
    "How does this relate to other concepts?",
    "What's a common mistake with this question?",
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="lg:hidden mb-4">
        <Button
          onClick={() => onToggleMobile(!isMobile)}
          className="w-full !bg-blue-600 hover:!bg-blue-700 !text-white flex items-center justify-center gap-2"
        >
          <MessageCircle className="w-4 h-4" />
          {isMobile ? "Hide AI Chat" : "Show AI Chat"}
        </Button>
      </div>

      {/* Chat Container */}
      <Card
        className={`flex flex-col h-full ${
          isMobile ? "fixed bottom-0 left-0 right-0 z-50 rounded-t-lg m-4 mt-0" : ""
        }`}
        style={isMobile ? { height: "500px" } : {}}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
            <Bot className="w-5 h-5" /> AI Tutor
          </h3>
          <button
            onClick={() => onToggleMobile(false)}
            className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 text-xl font-bold leading-none"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Messages Container */}
        <div
          className={`flex-1 overflow-y-auto space-y-4 mb-4 ${
            isMobile ? "max-h-96" : ""
          }`}
        >
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center pb-4">
              <p className="text-3xl mb-3">💡</p>
              <p className="font-semibold text-gray-800 dark:text-gray-100 mb-2">
                Ask Me Anything!
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                Questions about the answer, concepts, or examples?
              </p>

              {/* Suggested Questions */}
              <div className="space-y-2 w-full">
                {suggestedQuestions.map((question, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setInput(question);
                      setTimeout(() => inputRef.current?.focus(), 0);
                    }}
                    className="w-full text-left p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-sm transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs lg:max-w-sm px-4 py-3 rounded-lg ${
                      msg.role === "user"
                        ? "bg-blue-600 text-white rounded-br-none"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-bl-none"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap break-words">
                      {msg.content}
                    </p>
                    <p
                      className={`text-xs mt-2 ${
                        msg.role === "user"
                          ? "text-blue-100"
                          : "text-gray-600 dark:text-gray-400"
                      }`}
                    >
                      {new Date(msg.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="px-4 py-3 rounded-lg bg-gray-200 dark:bg-gray-700">
                    <div className="flex gap-2 items-center">
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <div className="flex gap-2">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about this question..."
              className="flex-1 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={3}
              disabled={isLoading}
            />
          </div>
          <div className="flex gap-2 mt-3">
            <Button
              onClick={handleSendMessage}
              disabled={!input.trim() || isLoading}
              className="flex-1 !bg-blue-600 hover:!bg-blue-700 !text-white"
            >
              {isLoading ? "..." : "Send"}
            </Button>
            {messages.length > 0 && (
              <Button
                onClick={() => {
                  // Clear chat will be handled by parent, for now just clear input
                }}
                variant="secondary"
                className="!px-3"
              >
                <RotateCw className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </Card>
    </>
  );
}

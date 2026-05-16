"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, User, Bot, Copy, Check, Paperclip, Mic, Smile, X } from "lucide-react";

interface ChatAreaProps {
  onArtifactGenerate: (code: string, language: string, title: string) => void;
}

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  artifact?: {
    code: string;
    language: string;
    title: string;
  };
}

export default function ChatArea({ onArtifactGenerate }: ChatAreaProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      content: "Hey there! 👋 I'm Volt AI, your super enthusiastic coding buddy for Roblox development! 🎮 Ready to build something amazing together? Let's go! 🚀",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const parseCodeBlocks = (content: string) => {
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    const matches: Array<{ language: string; code: string }> = [];
    let match;

    while ((match = codeBlockRegex.exec(content)) !== null) {
      matches.push({
        language: match[1] || "text",
        code: match[2].trim(),
      });
    }

    return matches;
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: messages.map((m) => ({ role: m.role, content: m.content })),
          provider: "groq", // or "openai", "claude", "openrouter"
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to get AI response");
      }

      const aiContent = data.content || "I'll help you with that!";
      const codeBlocks = parseCodeBlocks(aiContent);

      const assistantMessage: Message = {
        id: messages.length + 2,
        role: "assistant",
        content: aiContent,
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);

      // Automatically create artifact if code is detected
      if (codeBlocks.length > 0) {
        const firstCodeBlock = codeBlocks[0];
        const title = `Generated ${firstCodeBlock.language} Code`;
        onArtifactGenerate(firstCodeBlock.code, firstCodeBlock.language, title);
      }
    } catch (error) {
      console.error("Error calling AI API:", error);
      const errorMessage: Message = {
        id: messages.length + 2,
        role: "assistant",
        content: "Sorry, I encountered an error. Please check your API configuration.",
      };
      setMessages((prev) => [...prev, errorMessage]);
      setIsTyping(false);
    }
  };

  const handleCopy = (content: string, id: number) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleEmojiClick = (emoji: string) => {
    setInput((prev) => prev + emoji);
    setShowEmojiPicker(false);
  };

  const handleClearInput = () => {
    setInput("");
  };

  const emojis = ["😀", "😎", "🚀", "🎮", "💻", "🔥", "✨", "🎯", "💪", "🤖", "🌟", "⚡"];

  return (
    <div className="flex-1 flex flex-col bg-transparent">
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto space-y-8">
          <AnimatePresence mode="popLayout">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className={`flex items-start space-x-4 ${
                  message.role === "user" ? "flex-row-reverse space-x-reverse" : ""
                }`}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg ${
                    message.role === "user"
                      ? "bg-gradient-to-br from-purple-600 to-blue-600"
                      : "bg-gradient-to-br from-gray-900 to-gray-700"
                  }`}
                >
                  {message.role === "user" ? (
                    <User className="w-5 h-5 text-white" />
                  ) : (
                    <Sparkles className="w-5 h-5 text-white" />
                  )}
                </motion.div>
                <div
                  className={`flex-1 ${
                    message.role === "user" ? "text-right" : ""
                  }`}
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className={`inline-block px-6 py-4 rounded-3xl shadow-xl ${
                      message.role === "user"
                        ? "bg-gradient-to-br from-purple-600 to-blue-600 text-white"
                        : "bg-white/80 backdrop-blur-xl text-gray-900 border border-white/20"
                    }`}
                  >
                    <p className="text-base leading-relaxed whitespace-pre-wrap">
                      {message.content}
                    </p>
                  </motion.div>
                  {message.artifact && (
                    <div className="mt-3">
                      <button
                        onClick={() => handleCopy(message.artifact!.code, message.id)}
                        className="inline-flex items-center space-x-2 px-4 py-2 bg-white/80 backdrop-blur-xl hover:bg-white/90 rounded-xl transition-all border border-white/20 text-sm text-gray-700 shadow-lg"
                      >
                        {copiedId === message.id ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                        <span>{copiedId === message.id ? "Copied!" : "Copy"}</span>
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start space-x-4"
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center flex-shrink-0 shadow-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="inline-block px-6 py-4 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/20 shadow-xl">
                  <div className="flex space-x-2">
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity }}
                      className="w-2.5 h-2.5 bg-purple-500 rounded-full" 
                    />
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.1 }}
                      className="w-2.5 h-2.5 bg-blue-500 rounded-full" 
                    />
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      className="w-2.5 h-2.5 bg-pink-500 rounded-full" 
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="border-t border-white/20 p-6 bg-white/50 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            whileFocus={{ scale: 1.01 }}
            className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-4 border border-white/20 shadow-2xl focus-within:ring-2 focus-within:ring-purple-500/50 focus-within:border-purple-500/50 transition-all"
          >
            {/* Emoji Picker */}
            <AnimatePresence>
              {showEmojiPicker && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute bottom-full left-0 mb-2 p-3 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 grid grid-cols-6 gap-2"
                >
                  {emojis.map((emoji) => (
                    <motion.button
                      key={emoji}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleEmojiClick(emoji)}
                      className="text-2xl p-2 hover:bg-purple-100 rounded-xl transition-colors"
                    >
                      {emoji}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-end space-x-3">
              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all"
                  title="Attach file"
                >
                  <Paperclip className="w-5 h-5" />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all"
                  title="Add emoji"
                >
                  <Smile className="w-5 h-5" />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-2 rounded-xl transition-all ${isRecording ? 'text-red-500 bg-red-50' : 'text-gray-500 hover:text-purple-600 hover:bg-purple-50'}`}
                  title="Voice input"
                >
                  <Mic className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Text Input */}
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Ask Volt AI anything about Roblox development... 🎮"
                className="flex-1 bg-transparent border-none focus:outline-none resize-none text-base min-h-[32px] max-h-40 text-gray-700 placeholder-gray-400"
                rows={1}
              />

              {/* Clear & Send Buttons */}
              <div className="flex items-center space-x-2">
                {input && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleClearInput}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                    title="Clear"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                )}
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
          <p className="text-xs text-gray-500 mt-3 text-center">
            Volt AI can make mistakes. Consider checking important information. 🎮
          </p>
        </div>
      </div>
    </div>
  );
}

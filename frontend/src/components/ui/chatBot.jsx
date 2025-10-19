import React, { useState } from "react";
import axios from "axios";
import { Bot, Send } from "lucide-react";

const MessageBubble = ({ sender, text }) => {
  const isUser = sender === "user";
  return (
    <div
      className={`max-w-[75%] p-2 rounded-lg ${
        isUser
          ? "bg-blue-600 text-white self-end"
          : "bg-gray-200 text-gray-800 self-start"
      }`}
    >
      {text}
    </div>
  );
};

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(
        "https://job-portal-website-2025-1.onrender.com/api/ai/chat",
        {
          userMessage,
        }
      );
      const botReply = res.data.reply;
      setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Oops! Something went wrong." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!show ? (
        <button
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition"
          onClick={() => setShow(true)}
          aria-label="Open Chatbot"
        >
          <Bot />
        </button>
      ) : (
        <div className="w-80 h-96 bg-white shadow-xl rounded-xl flex flex-col overflow-hidden">
          <div className="bg-blue-600 text-white text-lg font-semibold p-3 flex justify-between items-center">
            AI Assistant
            <button
              onClick={() => setShow(false)}
              className="text-white font-bold text-lg"
              aria-label="Close Chatbot"
            >
              ×
            </button>
          </div>
          <div className="flex-1 p-3 overflow-y-auto space-y-2 flex flex-col">
            {messages.map((msg, idx) => (
              <MessageBubble key={idx} text={msg.text} sender={msg.sender} />
            ))}
            {loading && <p className="text-sm text-gray-500">Typing...</p>}
          </div>
          <div className="p-2 border-t flex items-center gap-2">
            <input
              type="text"
              className="flex-1 border rounded-lg px-3 py-1.5 text-sm outline-none"
              placeholder="Ask something..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              onClick={sendMessage}
              className="text-blue-600 hover:text-blue-800"
              aria-label="Send Message"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;

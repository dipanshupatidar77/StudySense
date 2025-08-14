
import React, { useEffect, useRef, useState } from "react";
import "../styles/ChatWindow.css";

const ChatWindow = () => {
  const [messages, setMessages] = useState(() => {
    const stored = localStorage.getItem("chat_history");
    return stored
      ? JSON.parse(stored)
      : [
          {
            role: "assistant",
            text: `Hi! 👋 I'm your AI assistant. Ask me anything!`,
          },
        ];
  });

  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    localStorage.setItem("chat_history", JSON.stringify(messages));
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:7000/api/chat/custom", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await res.json();
      const botReply = data?.response || "Sorry, I didn't understand that.";

      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: botReply.trim() },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "⚠️ Error connecting to chatbot." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  //  New Chat button
  const handleNewChat = () => {
    const welcome = {
      role: "assistant",
      text: `Hi! 👋 I'm your AI assistant. Ask me anything!`,
    };
    setMessages([welcome]);
    localStorage.setItem("chat_history", JSON.stringify([welcome]));
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <button onClick={handleNewChat} className="new-chat-btn">
          ➕ New Chat
        </button>
      </div>

      <div className="chat-messages">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`chat-message ${msg.role === "user" ? "user" : "assistant"}`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={chatEndRef}></div>
      </div>

      <div className="chat-input-area">
        <textarea
          placeholder="Type your question here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        ></textarea>
        <button onClick={sendMessage} disabled={loading}>
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;


import React from "react";
import ChatWindow from "../components/ChatWindow";
import "../styles/Concept.css";

const Concept = () => {
  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-3xl mx-auto bg-white p-6 shadow-md rounded-xl">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
          Concept Chatbot
        </h2>
        <ChatWindow />
      </div>
    </div>
  );
};

export default Concept;

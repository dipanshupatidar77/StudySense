import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ChatWindow from "./ChatWindow";

const ChatWindowWrapper = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { subject, topic } = location.state || {};

  if (!subject || !topic) {
    
    navigate("/concept");
    return null;
  }

  return <ChatWindow subject={subject} topic={topic} />;
};

export default ChatWindowWrapper;

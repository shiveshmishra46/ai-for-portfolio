import React from 'react';
import ChatbotIcon from './ChatbotIcon';

const ChatMessage = ({ message }) => {
  const { role, text } = message;
  
  if (role === "user") {
    return (
      <div className="message user-message">
        <div className="message-text">{text}</div>
      </div>
    );
  } else {
    return (
      <div className="message bot-message">
        <ChatbotIcon />
        <div className="message-text">{text}</div>
      </div>
    );
  }
};

export default ChatMessage;
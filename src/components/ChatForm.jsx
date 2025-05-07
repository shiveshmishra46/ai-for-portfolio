import React, { useState } from 'react';

const ChatForm = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form className="chat-form" onSubmit={handleSubmit}>
      <input 
        type="text"
        className="message-input"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      />
      <button type="submit">
        <i className="material-symbols-rounded">arrow_upward</i>
      </button>
    </form>
  );
};

export default ChatForm;
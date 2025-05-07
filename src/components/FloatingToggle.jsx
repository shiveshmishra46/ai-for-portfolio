import React from 'react';

const FloatingToggle = ({ isActive, toggleChat }) => {
  return (
    <div 
      className={`floating-toggle-container ${isActive ? 'toggle-active' : ''}`} 
      onClick={toggleChat}
    >
      <span className="toggle-icon">
        {isActive ? "×" : "💬"}
      </span>
    </div>
  );
};

export default FloatingToggle;
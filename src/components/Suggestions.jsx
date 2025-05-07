import { useState } from "react";

const Suggestions = ({ onSuggestionClick }) => {
  const suggestions = [
    "Get profile summary",
    "Skills & expertise",
    "Project highlights",
    "Work experience",
    "Education background"
  ];

  return (
    <div className="suggestions-container">
      <p>Try asking about:</p>
      <div className="suggestions-wrapper">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => onSuggestionClick(suggestion)}
            className="suggestion-btn"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Suggestions;

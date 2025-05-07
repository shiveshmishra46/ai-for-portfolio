import { useEffect, useState, useRef } from "react";
import ChatbotIcon from "./components/ChatbotIcon";
import ChatbotIconHeader from "./components/ChatbotIconHeader";
import ChatForm from "./components/ChatForm";
import ChatMessage from "./components/ChatMessage";
import Suggestions from "./components/Suggestions";
import FloatingToggle from "./components/FloatingToggle";

const App = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [isChatVisible, setIsChatVisible] = useState(false);
  const chatBodyRef = useRef();

  const generateAIResponse = async (history) => {
    // Helper function to update the chat history
    const updateChatHistory = (text) => {
      setChatHistory(prev => [...prev.filter(msg => msg.text !== "Thinking..."), {role: "model", text}]);
    }
    
    history = history.map(({role, text}) => ({role, parts: [{text}]}))
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: history}),
    }
    
    try {
      // Make a request to the API to get the AI's response
      const response = await fetch(import.meta.env.VITE_API_URL, requestOptions);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error.message || "Something went wrong!");
      
      // Clean and update the chat history with the AI's response
      const apiResponseText = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
      updateChatHistory(apiResponseText);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Auto-Scroll whenever chat history updates
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({top: chatBodyRef.current.scrollHeight, behavior:"smooth"})
    }
  }, [chatHistory]);

  const handleSuggestionClick = (suggestion) => {
    // Add user message to chat
    setChatHistory(prev => [...prev, { role: "user", text: suggestion }]);
    
    // Add thinking message
    setChatHistory(prev => [...prev, { role: "model", text: "Thinking..." }]);
    
    // Generate AI response for the suggestion
    setTimeout(() => {
      generateAIResponse([...chatHistory, { role: "user", text: suggestion }]);
    }, 300);
  };

  const toggleChat = () => {
    setIsChatVisible(prev => !prev);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <FloatingToggle isActive={isChatVisible} toggleChat={toggleChat} />
      
      {/* Chatbot Popup */}
      <div className={`sliding-content ${isChatVisible ? 'visible' : ''}`}>
        <div className="chatbot-popup">
          {/* Chatbot Header */}
          <div className="chat-header">
            <div className="header-info">
              <ChatbotIconHeader />
              <span className="logo-text">Shivesh's AI</span>
            </div>
            <button onClick={toggleChat} className="material-symbols-rounded">close</button>
          </div>
          
          {/* Chatbot Body */}
          <div className="chat-body" ref={chatBodyRef}>
            <div className="message bot-message">
              <ChatbotIcon />
              <div className="message-text">
                Hey there 👋🏻<br />
                How can I help you today?
              </div>
            </div>
            
            {/* Show suggestions if chat history is empty */}
            {chatHistory.length === 0 && (
              <Suggestions onSuggestionClick={handleSuggestionClick} />
            )}
            
            {/* Render the chat history dynamically */}
            {chatHistory.map((chat, index) => (
              <ChatMessage key={index} message={chat} />
            ))}
          </div>
          
          {/* Chatbot Footer */}
          <div className="chat-footer">
            <ChatForm onSendMessage={(message) => {
              // Add user message to chat
              setChatHistory(prev => [...prev, { role: "user", text: message }]);
              
              // Add thinking message
              setChatHistory(prev => [...prev, { role: "model", text: "Thinking..." }]);
              
              // Generate AI response
              setTimeout(() => {
                generateAIResponse([...chatHistory, { role: "user", text: message }]);
              }, 300);
            }} />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
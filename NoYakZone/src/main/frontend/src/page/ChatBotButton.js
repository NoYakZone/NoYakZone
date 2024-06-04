import React from 'react';
import '../CSS/ChatBot.css'

const ChatBotButton = ({ onClick }) => {
    return (
        <button className="chatbot-button" onClick={onClick}>
          챗봇
        </button>
      );
};

export default ChatBotButton;

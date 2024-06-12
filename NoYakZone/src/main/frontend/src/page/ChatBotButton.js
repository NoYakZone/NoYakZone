import React from 'react';
import { RiRobot2Line } from "react-icons/ri";
import '../CSS/ChatBot.css'

const ChatBotButton = ({ onClick }) => {
    return (
        <button className="chatbot-button" onClick={onClick}>
          <RiRobot2Line size="45"/>
        </button>
      );
};

export default ChatBotButton;

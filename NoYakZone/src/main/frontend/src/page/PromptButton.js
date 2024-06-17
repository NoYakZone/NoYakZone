import React from 'react';
import { RiRobot2Line } from "react-icons/ri";
import '../CSS/Prompt.css'

const PromptButton = ({ onClick }) => {
    return (
        <button className="prompt-button" onClick={onClick}>
          <RiRobot2Line size="45"/>
        </button>
      );
};

export default PromptButton;

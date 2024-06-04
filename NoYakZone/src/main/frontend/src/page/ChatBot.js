import React, { useState } from 'react';
import '../CSS/ChatBot.css';
import ChatBotButton from './ChatBotButton';

const ChatBot = ({ children }) => {
    const [isChatbotOpen, setIsChatbotOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const toggleChatbot = () => {//버튼 보이게 하기
        setIsChatbotOpen(!isChatbotOpen);
    };

    const handleInputChange = (e) => {//사용자가 입력할 때마다 input 문자열에 입력
        setInput(e.target.value);
    };

    const handleSendMessage = () => {//사용자가 메세지를 입력했을 때
        if (input.trim()) {
            setMessages([...messages, { text: input, sender: 'user' }]);
            setInput('');
        }
    };

    const handleKeyPress = (e) => {//엔터키 입력 시 실행
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <div>
            {children}
            {!isChatbotOpen && <ChatBotButton onClick={toggleChatbot} />}
            {isChatbotOpen && (
                <div className="chatbot-window">
                    <div className="chatbot-header">
                        마약 상담 챗봇
                        <button className="close-button" onClick={toggleChatbot}>X</button>
                        </div>
                    <div className="chatbot-messages">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`chatbot-message ${message.sender}`}
                            >
                                {message.text}
                            </div>
                        ))}
                    </div>
                    <div className="chatbot-input">
                        <input
                            type="text"
                            value={input}
                            onChange={handleInputChange}
                            onKeyPress={handleKeyPress}
                            placeholder="메시지를 입력하세요..."
                        />
                        <button onClick={handleSendMessage}>전송</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatBot;

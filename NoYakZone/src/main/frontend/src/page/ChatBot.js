import React, { useState, useEffect, useRef } from 'react';
import '../CSS/ChatBot.css';
import ChatBotButton from './ChatBotButton';
import { LuSendHorizonal } from "react-icons/lu";
import { IoArrowForwardOutline } from "react-icons/io5";
import axios from 'axios';

const ChatBot = ({ id, children }) => {
    const [isChatbotOpen, setIsChatbotOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const messageEndRef = useRef(null);//메세지창 맨 아래로 스크롤 내리기
    const [isChatbotClosing, setIsChatbotClosing] = useState(false);//챗봇 버튼 닫을 때

    useEffect(() => {
        chatHistory();
    }, []);

    const toggleChatbot = () => {//버튼 보이게 하기
        if (isChatbotOpen) {//메세지창이 닫힐 때
            setIsChatbotClosing(true);
            setTimeout(() => {
                setIsChatbotOpen(false);
                setIsChatbotClosing(false);
            }, 500); // 0.5초 후에 챗봇 창 상태를 업데이트
        }
        else{//메세지창이 열릴 때
            setIsChatbotOpen(true);
            setTimeout(() => {//0.1초 뒤 스크롤 아래로
                if (messageEndRef.current) {
                    messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        }
    };

    const handleInputChange = (e) => {//사용자가 입력할 때마다 input 문자열에 입력
        setInput(e.target.value);
    };

    const handleSendMessage = () => {//사용자가 메세지를 입력했을 때
        if(input.trim()==='') return;//아무런 메세지를 넣지 않았을 때

        const chat = {
            id: id,
            message: input.trim()
        };

        axios.post('http://localhost:7890/chatbot/chat', chat)//채팅 입력 후 gpt 응답
            .then(response => {
                const newMessages = response.data;
                setMessages(prevMessages => [...prevMessages, ...newMessages]);
            })
            .catch(error => {
                console.error('서버 또는 GPT에게 응답을 받지 못했습니다.', error);
            });

        setInput('');
    };

    const handleKeyPress = (e) => {//엔터키 입력 시 실행
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    const chatHistory = () => {//채팅 기록 불러오기
        axios.get(`http://localhost:7890/chatbot?id=${id}`)
            .then(response => {
                if (response.data) {
                    setMessages(response.data);
                }
            })
            .catch(error => {
                console.error('실패... 서버 또는 아이디를 확인해주세요', error);
                alert('채팅 기록을 불러오지 못했습니다.');
            });
    };

    return (
        <div>
            {children}
            {!isChatbotOpen && <ChatBotButton onClick={toggleChatbot} />}
            {isChatbotOpen && (
                <div className={`chatbot-window ${isChatbotClosing ? 'chatbot-window-hidden' : isChatbotOpen ? 'chatbot-window-visible' : ''}`}>
                    <div className="chatbot-header">
                        마약 상담 챗봇
                        <button className="close-button" onClick={toggleChatbot}>
                            <IoArrowForwardOutline size="30"/>
                        </button>
                        </div>
                    <div className="chatbot-messages">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`chatbot-message ${message.bot ? 'bot-message' : 'user-message'}`}
                            >
                                <div className="message-box">
                                    {message.text}
                                </div>
                            </div>
                        ))}
                        <div ref={messageEndRef}></div>
                    </div>
                    <div className="chatbot-input">
                        <input
                            type="text"
                            value={input}
                            onChange={handleInputChange}
                            onKeyPress={handleKeyPress}
                            placeholder="메시지를 입력하세요..."
                        />
                        <button className="send-button" onClick={handleSendMessage}>
                            <LuSendHorizonal size="27"/>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatBot;

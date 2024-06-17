import React, { useState, useEffect, useRef } from 'react';
import '../CSS/Prompt.css';
import PromptButton from './PromptButton';
import { LuSendHorizonal } from "react-icons/lu";
import { IoArrowForwardOutline } from "react-icons/io5";
import axios from 'axios';

const Prompt = ({ children }) => {
    const [isPromptOpen, setIsPromptOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messageEndRef = useRef(null);//메세지창 맨 아래로 스크롤 내리기
    const [isPromptClosing, setIsPromptClosing] = useState(false);//챗봇 버튼 닫을 때
    const [selectedPrompt, setSelectedPrompt] = useState(null); // 선택된 버튼 0:은어, 1:아이디, 2:특정단어

    useEffect(() => {
        
    }, []);

    const togglePrompt = () => {//버튼 보이게 하기
        if (isPromptOpen) {//메세지창이 닫힐 때
            setIsPromptClosing(true);
            setTimeout(() => {
                setIsPromptOpen(false);
                setIsPromptClosing(false);
            }, 500); // 0.5초 후에 챗봇 창 상태를 업데이트
        }
        else{//메세지창이 열릴 때
            setIsPromptOpen(true);
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

    const scrollToBottom = () => {// 즉시 아래로 스크롤
        setTimeout(() => {//0.1초 뒤 스크롤 아래로
            if (messageEndRef.current) {
                messageEndRef.current.scrollIntoView({ behavior: 'auto' });
            }
        }, 50);
    };

    const handleSendMessage = () => {//사용자가 메세지를 입력했을 때
        if(input.trim()==='') return;//아무런 메세지를 넣지 않았을 때
        setLoading(true);//로딩화면
        
        // input 값에서 {} 괄호 안의 문자열을 추출
        const regex = /\{([^}]+)\}/; // {} 괄호 안의 문자열을 추출하는 정규식
        const match = input.match(regex);
        let extractedString = '';

        if (match) {
            extractedString = match[1]; // 괄호 안의 문자열
        } else {
            console.log("괄호 안의 문자열을 찾을 수 없습니다.");
        }

        if (selectedPrompt === 0) {//은어
            axios.get(`http://localhost:7890/prompt/searchPatterByWord?word=${extractedString}`)
            .then(response => {
                if (response.data) {
                    console.log(response.data);
                }
                scrollToBottom();
                setLoading(false);//로딩화면
            })
            .catch(error => {
                console.error('실패... 서버 또는 아이디를 확인해주세요', error);
                alert('채팅 기록을 불러오지 못했습니다.');
            });
        }
        else if(selectedPrompt===1){//아이디
            
        }
        else if(selectedPrompt===2){//특정단어
            
        }

        
        setInput('');
    };

    const handleKeyPress = (e) => {//엔터키 입력 시 실행
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    const handleButtonClick = (text, index) => {
        setInput(text);
        setSelectedPrompt(index);
    };

    return (
        <div>
            {children}
            {!isPromptOpen && <PromptButton onClick={togglePrompt} />}
            {isPromptOpen && (
                <div className={`prompt-window ${isPromptClosing ? 'prompt-window-hidden' : isPromptOpen ? 'prompt-window-visible' : ''}`}>
                    <div className="prompt-header">
                        <div className="prompt-title">
                            마약 상담 챗봇
                        </div>
                        <button className="close-button" onClick={togglePrompt}>
                            <IoArrowForwardOutline size="35"/>
                        </button>
                    </div>
                    <div className="prompt-messages">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`prompt-message ${message.bot ? 'bot-message' : 'user-message'}`}
                            >
                                <div className="message-box">
                                    {message.text}
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className="loading-dots">
                                <div className="dot"></div>
                                <div className="dot"></div>
                                <div className="dot"></div>
                            </div>
                        )}
                        <div ref={messageEndRef}></div>
                    </div>
                    <div className="prompt-quick-buttons">
                        <text>Prompt를 입력해주세요</text>
                        {['{은어}의 뜻을 알려줘', '{텔레그램 id or sns 아이디}가 올린 게시물 알려줘', '{특정 단어}가 포함된 게시물 알려줘'].map((text, index) => (
                            <button
                                key={index}
                                onClick={() => handleButtonClick(text, index)}
                                className={selectedPrompt === index ? 'selected' : ''}
                            >
                                {selectedPrompt === index && '✔'} {text}
                            </button>
                        ))}
                    </div>
                    <div className="prompt-input">
                        <input
                            type="text"
                            value={input}
                            onChange={handleInputChange}
                            onKeyPress={handleKeyPress}
                            placeholder="선택하세요..."
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

export default Prompt;
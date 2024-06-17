import React, { useState, useEffect, useRef } from 'react';
import '../CSS/Prompt.css';
import PromptButton from './PromptButton';
import { LuSendHorizonal } from "react-icons/lu";
import { IoArrowForwardOutline } from "react-icons/io5";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";
import axios from 'axios';

const Prompt = ({ children }) => {
    const [isPromptOpen, setIsPromptOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messageEndRef = useRef(null);//메세지창 맨 아래로 스크롤 내리기
    const [isPromptClosing, setIsPromptClosing] = useState(false);//챗봇 버튼 닫을 때
    const [selectedPrompt, setSelectedPrompt] = useState(null); // 선택된 버튼 0:은어, 1:아이디, 2:특정단어
    const [showQuickButtons, setShowQuickButtons] = useState(true);//프롬프트 보이기
    const [boardResult, setBoardResult] = useState([]);//선택된 버튼 2:특정단어 결과

    useEffect(() => {
        const storedItems = localStorage.getItem("promptchat"); //수사기록 불러오기
        if (storedItems) {
            setMessages(JSON.parse(storedItems));
        }
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

    const toggleQuickButtons = () => { //프롬프트 보이게 하기
        setShowQuickButtons(!showQuickButtons);
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

    const getLastMessageIndex = () => { //메세지 인덱스 구하기
        if (messages.length === 0) return 1;
        return messages[messages.length - 1].index + 1;
    };

    const addMessage = (msg, bot) => {//메세지 추가
        const basicMessage = {
            index: getLastMessageIndex(),
            userId: "",
            date: new Date().toISOString(),
            text: msg,
            bot: bot,
        };
        setMessages((prevMessages) => [...prevMessages, basicMessage]);
        localStorage.setItem("promptchat", JSON.stringify(messages));//수사기록 저장
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
            alert("괄호 안의 문자열을 찾을 수 없습니다.");
            setLoading(false);//로딩화면
            return;
        }

        addMessage(input.trim(), false);//사용자 메세지 추가
        scrollToBottom();
        setShowQuickButtons(false);

        if (selectedPrompt === 0) {//은어
            axios.get(`http://localhost:7890/prompt/searchPatterByWord?word=${extractedString}`)
            .then(response => {
                addMessage(`${extractedString} (이)란? ${response.data[0].detail}`, true);//응답 메세지 추가
                scrollToBottom();
                setLoading(false);//로딩화면
            })
            .catch(error => {
                addMessage(`${extractedString} (이)라는 단어를 찾을 수 없습니다...`, true);//응답 메세지 추가
                scrollToBottom();
                setLoading(false);//로딩화면
            });
        }
        else if(selectedPrompt===1){//아이디
            /*
            axios.get(`http://localhost:7890/prompt/searchBoardsByUserId?userId=${extractedString}`)
            .then(response => {
                addMessage(`${extractedString} 아이디의 게시물`, true);//응답 메세지 추가
                scrollToBottom();
                setLoading(false);//로딩화면
            })
            .catch(error => {
                addMessage(`${extractedString} 아이디를 찾을 수 없습니다...`, true);//응답 메세지 추가
                scrollToBottom();
                setLoading(false);//로딩화면
            });
            */
        }
        else if(selectedPrompt===2){//특정단어 http://localhost:7890/prompt/searchBoardsByText?text=아이스작대기
            axios.get(`http://localhost:7890/prompt/searchBoardsByText?text=${extractedString}`)
            .then(response => {
                addMessage(`${extractedString} 단어가 포함된 게시물 검색 결과`, true);//응답 메세지 추가
                setBoardResult(response.data);//배열로 응답 결과 저장
                scrollToBottom();
                setLoading(false);//로딩화면
            })
            .catch(error => {
                addMessage(`${extractedString} (이)라는 단어를 찾을 수 없습니다...`, true);//응답 메세지 추가
                scrollToBottom();
                setLoading(false);//로딩화면
            });
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
                            마약 수사 도우미
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
                    {showQuickButtons && (
                    <div className="prompt-quick-buttons">
                        <text>프롬프트를 선택해주세요</text>
                        {['{은어}의 뜻을 알려줘', '{텔레그램 id or sns 아이디}가 올린 게시물 알려줘', '{특정 단어}가 포함된 게시물 알려줘'].map((text, index) => (
                            <button
                                key={index}
                                onClick={() => handleButtonClick(text, index)}
                                className={selectedPrompt === index ? 'selected' : 'btn'}
                            >
                                {selectedPrompt === index && '✔'} {text}
                            </button>
                        ))}
                    </div>
                    )}
                    <div className="prompt-input">
                        <button className="support-button" onClick={toggleQuickButtons}>
                            {showQuickButtons ? <IoMdArrowDropdown size="27"/> : <IoMdArrowDropup size="27"/>}
                        </button>
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
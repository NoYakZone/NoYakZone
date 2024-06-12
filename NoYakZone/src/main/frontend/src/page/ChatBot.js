import React, { useState, useEffect, useRef } from 'react';
import '../CSS/ChatBot.css';
import ChatBotButton from './ChatBotButton';
import { LuSendHorizonal } from "react-icons/lu";
import { IoArrowForwardOutline } from "react-icons/io5";
import axios from 'axios';

const ChatBot = ({ children }) => {
    const [isChatbotOpen, setIsChatbotOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const messageEndRef = useRef(null);//메세지창 맨 아래로 스크롤 내리기
    const [isChatbotClosing, setIsChatbotClosing] = useState(false);//챗봇 버튼 닫을 때
    const [loginUser, setLoginUser] = useState(false);//로그인한 사용자인지 확인

    useEffect(() => {
        const message = {
            index: 0,
            userId: "",
            date: new Date().toISOString(),
            text: "마약과 관련된 모든 상담을 할 수 있습니다. 편하게 말걸어주세요~",
            bot: true
        };
        setMessages(prevMessages => [...prevMessages, message]);

        if(localStorage.getItem("username")===null){//비로그인
            setLoginUser(false);
            if(localStorage.getItem("chatcount")===null) localStorage.getItem("chatcount", 0);//무료 횟수

            const storedItems = localStorage.getItem('freechat');//무료채팅기록 불러오기
            if (storedItems) {
                setMessages(JSON.parse(storedItems));
            }
        }
        else {//로그인
            setLoginUser(true);
            chatHistory();
        }
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

    const getLastMessageIndex = () => {//사용자 메세지 인덱스 구하기
        if (messages.length === 0) return 1;
        return messages[messages.length - 1].index+1;
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


        const userMessage = {//배열에 먼저 사용자 메세지 추가
            index: getLastMessageIndex(),
            userId: "",
            date: new Date().toISOString(),
            text: input.trim(),
            bot: false
        };

        setMessages(prevMessages => [...prevMessages, userMessage]);// 사용자 메시지를 먼저 추가합니다.
        scrollToBottom();

        if(loginUser){/*****************************************************로그인했을 때***************************************************************/
            const chat = {
                id: localStorage.getItem("username"),
                message: input.trim()
            };
    
            axios.post('http://localhost:7890/chatbot/chat', chat)//채팅 입력 후 gpt 응답
                .then(response => {
                    const newMessage = response.data;
                    setMessages(prevMessages => [...prevMessages, newMessage]);
                    scrollToBottom();
                })
                .catch(error => {
                    console.error('서버 또는 GPT에게 응답을 받지 못했습니다.', error);
                });
        }
        else{/*****************************************************비로그인***************************************************************/
            const currentCount = parseInt(localStorage.getItem("chatcount"), 10);
            if(currentCount>4){//무료 챗봇 질문 횟수 : 5번
                const stopMessage = {//차단 메세지
                    index: getLastMessageIndex(),
                    userId: "",
                    date: new Date().toISOString(),
                    text: "추가로 이용하시려면 로그인을 해주세요^^",
                    bot: true
                };
                setMessages(prevMessages => [...prevMessages, stopMessage]);
                scrollToBottom();
            }
            else{//무료 횟수가 소진되기 전 gpt 응답 가능
                const chat = [...messages, userMessage].map(msg => ({//지금까지 대화내용 + 자신의 내용을 임시 배열로
                    text: msg.text,
                    bot: msg.bot
                }));
    
                axios.post('http://localhost:7890/chatbot/getchat', chat)//채팅 입력 후 gpt 응답
                    .then(response => {
                        const botMessage = {//배열에 먼저 봇 메세지 추가
                            index: getLastMessageIndex(),
                            userId: "",
                            date: new Date().toISOString(),
                            text: response.data,
                            bot: true
                        };
                        setMessages(prevMessages => [...prevMessages, botMessage]);
                        scrollToBottom();
                    })
                    .catch(error => {
                        console.error('서버 또는 GPT에게 응답을 받지 못했습니다.', error);
                    });
            }
            localStorage.setItem('freechat', JSON.stringify(messages));//무료채팅기록 저장
            localStorage.setItem("chatcount", currentCount+1);//사용횟수 +1
        }

        setInput('');
    };

    const handleKeyPress = (e) => {//엔터키 입력 시 실행
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    const chatHistory = () => {//채팅 기록 불러오기
        axios.get(`http://localhost:7890/chatbot?id=${localStorage.getItem("username")}`)
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

import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Modal from '../modals/InvestigationDetailModal';
import '../CSS/Investigation.css';

function Investigation() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isOfficial, setIsOfficial] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [chatBotVisible, setChatBotVisible] = useState(false);
    const [messages, setMessages] = useState([]);
    const [chatInput, setChatInput] = useState('');
    const [posts, setPosts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const history = useHistory();

    useEffect(() => {
        const officialStatus = localStorage.getItem('official');
        setIsOfficial(officialStatus === 'true');
    }, []);

    useEffect(() => {
        if (isOfficial) {
            fetch('/api/endpoint') // Replace with your API endpoint
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    const filteredData = data.filter(item => item.official);
                    setData(filteredData);
                    setSearchResults(filteredData);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    setLoading(false);
                });

            fetch('http://localhost:7890/board') // API endpoint for fetching posts
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => setPosts(data))
                .catch(error => console.error('Error fetching posts:', error));
        }
    }, [isOfficial]);

    const handleSearch = () => {
        console.log(searchTerm);
    };

    const sendMessage = () => {
        if (chatInput.trim()) {
            const newMessages = [...messages, { sender: 'user', text: chatInput }, { sender: 'bot', text: 'This is a response.' }];
            setMessages(newMessages);
            setChatInput('');
        }
    };

    const openModal = (item) => {
        setModalContent(item);
        setModalOpen(true);
    };

    if (!isOfficial) {
        return (
            <div className="access-denied">
                <h1>Access Denied</h1>
                <p>You do not have the required permissions to view this page.</p>
                <button onClick={() => history.push('/')}>Go to Home</button>
            </div>
        );
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="investigation-container">
            <h1>Official Items</h1>
            <div className="search-bar">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search..."
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            <ul>
                {searchResults.map(item => (
                    <li key={item.id} onClick={() => openModal(item)}>
                        {item.name}
                    </li>
                ))}
            </ul>
            <div className="posts-container">
                <h2>Posts</h2>
                <ul>
                    {posts.map(post => (
                        <li key={post.index}>
                            <div><strong>{post.text}</strong></div>
                            <div>{post.place}</div>
                            <div>{new Date(post.date).toLocaleString()}</div>
                            {post.url && <div><a href={post.url} target="_blank" rel="noopener noreferrer">Link</a></div>}
                            {post.picture && <div><img src={post.picture} alt={post.text} /></div>}
                        </li>
                    ))}
                </ul>
            </div>
            <button className="chatbot-toggle" onClick={() => setChatBotVisible(!chatBotVisible)}>
                Chat
            </button>
            {chatBotVisible && (
                <div className="chat-bot">
                    <div className="chat-window">
                        {messages.map((msg, index) => (
                            <div key={index} className={`message ${msg.sender}`}>
                                {msg.text}
                            </div>
                        ))}
                    </div>
                    <input
                        type="text"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder="Type a message..."
                    />
                    <button onClick={sendMessage}>Send</button>
                </div>
            )}
            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
                {modalContent && (
                    <div>
                        <h2>{modalContent.name}</h2>
                        <p>{modalContent.description}</p>
                        {/* Add more details as needed */}
                    </div>
                )}
            </Modal>
        </div>
    );
}

export default Investigation;

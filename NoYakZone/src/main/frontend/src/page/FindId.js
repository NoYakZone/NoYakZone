// FindId.js
import React, { useState } from 'react';
import '../CSS/FindId.css'; // 스타일링을 위한 CSS 파일 생성

const FindId = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        // 아이디 찾기를 위한 백엔드 API 호출
        try {
            const response = await fetch('/api/recover-id', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });
            const data = await response.json();
            setMessage(data.message);
        } catch (error) {
            setMessage('오류가 발생했습니다. 나중에 다시 시도해주세요.');
        }
    };

    return (
        <div className="find-id-container">
            <h2>아이디 찾기</h2>
            <form onSubmit={handleSubmit}>
                <label>이메일:</label>
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
                <button type="submit">제출</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default FindId;

import React, { useState } from 'react';
import '../CSS/SignUpPage.css';

const SignUpPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // 회원가입 처리 로직을 여기에 추가합니다.
        console.log('회원가입 정보:', formData);
    };

    return (
        <div className="SignUpContainer">
            <h2>회원가입</h2>
            <form onSubmit={handleSubmit} className="SignUpForm">
                <label htmlFor="username">
                    사용자 이름:
                    <input 
                        type="text" 
                        id="username" 
                        name="username" 
                        value={formData.username} 
                        onChange={handleChange} 
                    />
                </label>
                <label htmlFor="email">
                    이메일:
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                    />
                </label>
                <label htmlFor="password">
                    비밀번호:
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        value={formData.password} 
                        onChange={handleChange} 
                    />
                </label>
                <button type="submit">
                    회원가입
                </button>
            </form>
        </div>
    );
};

export default SignUpPage;

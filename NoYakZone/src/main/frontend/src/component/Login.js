// Login.js
import React, { useState } from 'react';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = () => {
        // 아이디와 비밀번호의 형식을 검증합니다.
        const usernameRegex = /^[a-zA-Z0-9]{5,10}$/;
        const passwordRegex = /^[a-zA-Z0-9]{1,15}$/;

        if (!usernameRegex.test(username)) {
            setErrorMessage('아이디는 5글자 이상 10글자 이내의 영어와 숫자로 이루어져야 합니다.');
            return;
        }

        if (!passwordRegex.test(password)) {
            setErrorMessage('비밀번호는 영어와 숫자로 이루어진 15글자 이내여야 합니다.');
            return;
        }

        // 검증에 성공하면 로그인 시도
        onLogin(username);
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
            {errorMessage && <p>{errorMessage}</p>}
        </div>
    );
};

export default Login;

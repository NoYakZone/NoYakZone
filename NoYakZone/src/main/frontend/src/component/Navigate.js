import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import '../App.css';

import Login from "./Login";

function Navigate() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');



    const handleLogin = (username) => {
        // 로그인 처리 로직
        setIsLoggedIn(true);
        setUsername(username);
    };

    const handleLogout = () => {
        // 로그아웃 처리 로직
        setIsLoggedIn(false);
        setUsername('');
    };

    return (
        <div>
            <div className='navbar'>
                <Link className='navbarMenu' to={'/'}>Main</Link>
                <Link className='navbarMenu' to={'/About'}>About</Link>
                <Link className='navbarMenu' to={'/Community'}>Contact</Link>

                   {/* 로그인*/}
                   {isLoggedIn ? (
                    <button onClick={handleLogout}>Logout</button>
                ) : (
                    <Login onLogin={handleLogin} />
                )}
                <div className='join'>
                    <Link className='navbarMenu' to={'/signUp'}>회원가입</Link>
                </div>
            </div>
        </div>
    );
}

export default Navigate;

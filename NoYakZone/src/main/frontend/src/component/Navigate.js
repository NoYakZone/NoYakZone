import { Link, useHistory } from 'react-router-dom';
import React, { useState } from 'react';
import '../CSS/Navigate.css';
import Logo from '../image/Logo.png';

import Login from "./Login";

function Navigate() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const history = useHistory();

    const handleLogin = (username) => {
        setIsLoggedIn(true);
        setUsername(username);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUsername('');
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const gotoMain = () => {
        history.push('/');
    }

    return (
        <div>
            <div className='navbar'>
                <button className='menuButton' onClick={toggleMenu}>☰</button>
                <img src={Logo} alt='Logo' className='navbarLogo' onClick={gotoMain}/>
                <div className={isMenuOpen ? 'navbarLinks active' : 'navbarLinks'}>
                    <Link className='navbarMenu' to={'/'}>Main</Link>
                    <Link className='navbarMenu' to={'/About'}>About</Link>
                    <Link className='navbarMenu' to={'/Community'}>Community</Link>
                    <Link className='navbarMenu' to={'/ChatBot'}>ChatBot</Link>
                </div>

                {/* 로그인 */}
                {isLoggedIn ? (
                    <button onClick={handleLogout}>Logout</button>
                ) : (
                    <Login onLogin={handleLogin} />
                )}
                <div className='join'>
                    <Link className='navbarMenu' to={'/MemberChoice'}>회원가입</Link>
                </div>
            </div>
        </div>
    );
}

export default Navigate;

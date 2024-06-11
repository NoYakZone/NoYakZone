import { Link, useHistory } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import '../CSS/Navigate.css';
import Logo from '../image/Logo.png';
import Login from "./Login";

function Navigate() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isOfficial, setIsOfficial] = useState(false);

    const history = useHistory();

    useEffect(() => {
        const loggedInStatus = localStorage.getItem('isLoggedIn');
        const storedUsername = localStorage.getItem('username');
        const officialStatus = localStorage.getItem('official');

        if (loggedInStatus === 'true' && storedUsername) {
            setIsLoggedIn(true);
            setUsername(storedUsername);
            setIsOfficial(officialStatus === 'true');
        }
    }, []);

    const handleLogin = (username) => {
        setIsLoggedIn(true);
        setUsername(username);
        setIsOfficial(localStorage.getItem('official') === 'true');
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUsername('');
        setIsOfficial(false);
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('username');
        localStorage.removeItem('official');
        history.push('/'); // 로그아웃 후 메인 페이지로 이동
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const gotoMain = () => {
        history.push('/');
    }
    const goToFindPassword = () => {
        history.push('/findPassword');
    };

    const goToFindId = () => {
        history.push('/findId');
    };

    return (
        <div>
            <div className='navbar'>
                <button className='menuButton' onClick={toggleMenu}>☰</button>
                <img src={Logo} alt='Logo' className='navbarLogo' onClick={gotoMain}/>
                <div className={isMenuOpen ? 'navbarLinks active' : 'navbarLinks'}>
                    <Link className='navbarMenu' to={'/'}>Main</Link>
                    <Link className='navbarMenu' to={'/About'}>About</Link>
                    <Link className='navbarMenu' to={'/Community'}>Community</Link>
                    <Link className='navbarMenu' to={'/Report'}>Report</Link> {/* Report 링크 추가 */}
                    <Link className='navbarMenu' to={'/CheckList'}>CheckList</Link>
                    {isOfficial && <Link className='navbarMenu' to={'/Investigation'}>Investigation</Link>}
                </div>

                {/* 로그인 */}
                {isLoggedIn ? (
                    <div>
                        <span>{username}</span>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                ) : (
                    <Login onLogin={handleLogin} />
                )}
                <div className='join'>
                    <Link className='navbarMenu' to={'/MemberChoice'}>회원가입</Link>
                </div>
                <div className='FindPasswordLink' onClick={goToFindPassword}>
                    <p>비밀번호 찾기</p>
                </div>
            </div>
        </div>
    );
}

export default Navigate;

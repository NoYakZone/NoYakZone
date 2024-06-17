import { Link, useHistory } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { FaBars } from 'react-icons/fa';  // react-icons에서 FaBars 아이콘을 가져옵니다.
import '../CSS/Navigate.css';
import Logo from '../image/Logo.png';
import Login from "./Login";

function Navigate() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isOfficial, setIsOfficial] = useState(false);
    const [visibleLinks, setVisibleLinks] = useState(5); // 처음에는 모든 링크가 보이도록 설정

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

        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setVisibleLinks(2); // 작은 화면에서는 두 개의 링크만 보이도록 설정
            } else if (window.innerWidth <= 1024) {
                setVisibleLinks(3); // 중간 크기 화면에서는 세 개의 링크만 보이도록 설정
            } else {
                setVisibleLinks(5); // 큰 화면에서는 모든 링크가 보이도록 설정
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // 초기 로드 시에도 실행

        return () => {
            window.removeEventListener('resize', handleResize);
        };
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
        window.location.reload(); // 페이지 새로고침
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const gotoMain = () => {
        history.push('/');
    };
    const goToFindPassword = () => {
        history.push('/findPassword');
    };
    const goToFindId = () => {
        history.push('/findId');
    };

    return (
        <div className='navbarContainer'>
            <div className='navbar'>
                <FaBars className='menuButton' onClick={toggleMenu} />
                <img src={Logo} alt='Logo' className='navbarLogo' onClick={gotoMain} />
                <div className={isMenuOpen ? 'navbarLinks active' : 'navbarLinks'}>
                    {visibleLinks >= 1 && <Link className='navbarMenu' to={'/'}>Main</Link>}
                    {visibleLinks >= 2 && <Link className='navbarMenu' to={'/About'}>About</Link>}
                    {visibleLinks >= 3 && <Link className='navbarMenu' to={'/Community'}>Community</Link>}
                    {visibleLinks >= 4 && <Link className='navbarMenu' to={'/Report'}>Report</Link>}
                    {visibleLinks >= 5 && <Link className='navbarMenu' to={'/CheckList'}>CheckList</Link>}
                    {isOfficial && <Link className='navbarMenu' to={'/Investigation'}>Investigation</Link>}
                </div>

                <div className='loginbar'>
                    {isLoggedIn ? (
                        <div className='loginInfo'>
                            <span className='username'>{username}</span>
                            <button className='logoutButton' onClick={handleLogout}>Logout</button>
                        </div>
                    ) : (
                        <Login onLogin={handleLogin} />
                    )}
                    <div className='join'>
                        <Link className='navbarMenu' to={'/MemberChoice'}>회원가입</Link>
                    </div>
                    <div className='findPasswordLink' onClick={goToFindPassword}>
                        <Link className='navbarMenu' to={'/findPassword'}>아이디/비밀번호 찾기</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navigate;

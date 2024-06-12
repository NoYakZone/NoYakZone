import React from 'react';
import '../CSS/Footer.css'; // Import your footer CSS

const Footer = () => {
    return (
        <footer className='footer'>
            <div className='footer-container'>
                <div className='footer-content'>
                    <h2 className='footer-title'>NoYakZone</h2>
                    <p className='footer-description'>
                        <p>NoYakZone은 마약 중독 예방과 상담을 위한 서비스를 제공합니다.</p>
                        <p>여러분의 건강한 삶을 위해 최선을 다하겠습니다.</p>
                    </p>
                </div>
                <div className='footer-links'>
                    <ul>
                        <li><a href='/about'>About Us</a></li>
                        <li><a href='/contact'>Contact</a></li>
                        <li><a href='/privacy'>Privacy Policy</a></li>
                    </ul>
                </div>
                <div className='footer-contact'>
                    <p>Contact us: info@noyakzone.com</p>
                    <p>&copy; 2024 NoYakZone. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;

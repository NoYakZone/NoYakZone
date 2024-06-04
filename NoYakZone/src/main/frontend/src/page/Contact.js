import React from 'react';
import '../CSS/Contact.css';

const Contact = () => {
    return (
        <div className="contact-container">
            <h2>문의하기</h2>
            <p>문의 사항이 있으시면 아래 정보를 통해 연락해 주세요:</p>
            <div className="contact-details">
                <p>이메일: info@noyakzone.com</p>
                <p>전화: 123-456-7890</p>
                <p>주소: 서울특별시 강남구 테헤란로 123, 노약존 빌딩</p>
            </div>
            <form className="contact-form">
                <div className="form-group">
                    <label htmlFor="name">이름:</label>
                    <input type="text" id="name" name="name" required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">이메일:</label>
                    <input type="email" id="email" name="email" required />
                </div>
                <div className="form-group">
                    <label htmlFor="message">메시지:</label>
                    <textarea id="message" name="message" rows="4" required></textarea>
                </div>
                <button type="submit">제출</button>
            </form>
        </div>
    );
};

export default Contact;

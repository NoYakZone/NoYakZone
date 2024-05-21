import React, { useState } from 'react';
import '../CSS/SignUp.css'; // CSS 파일 임포트
import { useHistory } from 'react-router-dom';

const SignUpGeneral = () => {
    const [formData, setFormData] = useState({
        userId: '',
        name: '',
        password: '',
        birthDate: '',
        phoneNumber: '',
        email: '',
        address: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('General User Registration Data:', formData);
        
        // 이곳에서 회원가입 데이터를 처리합니다. (예: API 호출)
        // 데이터 처리가 성공하면 메인 페이지로 리디렉션
        history.push('/'); // 메인 페이지로 사용자를 리디렉션합니다.
    };

    const validateInputs = () => {
        const userIdRegex = /^[a-zA-Z0-9]{4,15}$/;
        if (!userIdRegex.test(formData.userId) || !userIdRegex.test(formData.name)) {
            alert("아이디와 이름은 영어와 숫자만 포함하여 4~15 글자 사이여야 합니다.");
        } else {
            alert("입력이 유효합니다.");
        }
    };

    return (
        <div className="SignUpContainer">
            <h2>일반인 회원가입</h2>
            <form onSubmit={handleSubmit} className="SignUpForm">
                <label htmlFor="userId">
                    아이디:
                    <div className="flex-row">
                        <input type="text" id="userId" name="userId" value={formData.userId} onChange={handleChange} />
                        <button type="button" onClick={validateInputs}>입력 검증</button>
                    </div>
                </label>
                <label htmlFor="name">
                    이름:
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
                </label>
                <label htmlFor="password">
                    비밀번호:
                    <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
                </label>
                <label htmlFor="birthDate">
                    생년월일:
                    <input type="date" id="birthDate" name="birthDate" value={formData.birthDate} onChange={handleChange} />
                </label>
                <label htmlFor="phoneNumber">
                    전화번호:
                    <input type="text" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
                </label>
                <label htmlFor="email">
                    이메일:
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
                </label>
                <label htmlFor="address">
                    주소:
                    <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} />
                </label>

                <button type="submit">회원가입</button>
            </form>
        </div>
    );
};

export default SignUpGeneral;

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../CSS/SignUp.css'; // CSS 파일 임포트

const SignUpPolice = () => {
    const [formData, setFormData] = useState({
        name: '',
        password: '',
        email: '',
        address: '',
        isInvestigator: false,
        organization: ''
    });
    const [showModal, setShowModal] = useState(false);
    const [tempOrganization, setTempOrganization] = useState('');
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('General User Registration Data:', formData);
        
        // 이곳에서 회원가입 데이터를 처리합니다. (예: API 호출)
        // 데이터 처리가 성공하면 메인 페이지로 리디렉션
        history.push('/'); // 메인 페이지로 사용자를 리디렉션합니다.
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleOrganizationChange = (e) => {
        setTempOrganization(e.target.value);
    };

    const handleModalSubmit = () => {
        setFormData({ ...formData, organization: tempOrganization });
        setShowModal(false);
    };

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    return (
        <div className="SignUpContainer">
            <h2>경찰 회원가입</h2>
            <form onSubmit={handleSubmit} className="SignUpForm">
                <label htmlFor="name">
                    이름:
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
                </label>
                <label htmlFor="password">
                    비밀번호:
                    <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
                </label>
                <label htmlFor="email">
                    이메일:
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
                </label>
                <label htmlFor="address">
                    주소:
                    <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} />
                </label>
                <label>
                    수사자:
                    <input type="checkbox" name="isInvestigator" checked={formData.isInvestigator} onChange={handleChange} />
                </label>
                {formData.isInvestigator && (
                    <>
                        <button type="button" onClick={toggleModal}>소속 기관 입력</button>
                        <input type="text" name="organization" value={formData.organization} readOnly />
                    </>
                )}
                <button type="submit">회원가입</button>
            </form>
            {showModal && (
                <div className="modal">
                    <h3>소속 기관 입력</h3>
                    <input type="text" value={tempOrganization} onChange={handleOrganizationChange} />
                    <button onClick={handleModalSubmit}>확인</button>
                    <button onClick={toggleModal}>취소</button>
                </div>
            )}
        </div>
    );
};

export default SignUpPolice;

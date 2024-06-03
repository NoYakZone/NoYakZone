import React, { useState } from 'react';
import SignUpGeneral from './SignUpGeneral';
import SignUpPolice from './SignUpPolice';
import '../CSS/MemberChoice.css';

const MemberChoice = () => {
    const [selectedForm, setSelectedForm] = useState('general');

    const handleButtonClick = (form) => {
        setSelectedForm(form);
    };

    return (
        <div className="page-container">
            <div className="content-wrap">
                <h2>MemberChoice Page</h2>
                <div className="login-options">
                    <button
                        className={`login-button ${selectedForm === 'general' ? 'selected' : ''}`}
                        onClick={() => handleButtonClick('general')}
                    >
                        일반인
                    </button>
                    <button
                        className={`login-button ${selectedForm === 'police' ? 'selected' : ''}`}
                        onClick={() => handleButtonClick('police')}
                    >
                        경찰
                    </button>
                </div>
                <div className="form-container">
                    {selectedForm === 'general' && <SignUpGeneral />}
                    {selectedForm === 'police' && <SignUpPolice />}
                </div>
            </div>
        </div>
    );
};

export default MemberChoice;

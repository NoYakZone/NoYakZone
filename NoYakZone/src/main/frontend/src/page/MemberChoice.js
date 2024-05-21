import React from 'react';
import { Link } from 'react-router-dom';

import '../CSS/MemberChoice.css';

const MemberChoice = () => {
    return (
        <div className="page-container">
            <div className="content-wrap">
                <h2>MemberChoice Page</h2>
                <div className="login-options">
                    <Link to="/signUpGeneral">
                        <button className="login-button">일반인</button>
                    </Link>
                    <Link to="/signUpPolice">
                        <button className="login-button">경찰</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MemberChoice;

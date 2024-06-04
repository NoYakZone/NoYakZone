import React from 'react';
import '../CSS/PrivacyPolicy.css';

const PrivacyPolicy = () => {
    return (
        <div className="privacy-policy-container">
            <h2>개인정보 처리방침</h2>
            <p>저희는 여러분의 개인정보를 소중히 여기며, 이를 보호하기 위해 최선을 다하고 있습니다.</p>
            <h3>정보 수집</h3>
            <p>저희는 더 나은 서비스를 제공하기 위해 다음과 같은 정보를 수집합니다:</p>
            <ul>
                <li>개인 식별 정보 (이름, 이메일 주소, 전화번호 등)</li>
                <li>사용 데이터 (서비스 이용 방법)</li>
            </ul>
            <h3>정보 이용</h3>
            <p>저희가 수집한 정보는 다음과 같은 목적으로 사용됩니다:</p>
            <ul>
                <li>서비스 제공 및 유지</li>
                <li>서비스 변경 사항 통지</li>
                <li>고객 지원 제공</li>
                <li>서비스 사용 분석</li>
            </ul>
            <h3>문의하기</h3>
            <p>이 개인정보 처리방침에 대한 문의 사항이 있으시면, 아래 이메일로 연락해 주세요:</p>
            <p>이메일: info@noyakzone.com</p>
        </div>
    );
};

export default PrivacyPolicy;

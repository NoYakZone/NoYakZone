import React, { useState } from 'react';
import '../CSS/About.css';
import drug from '../image/drug.png';
import fentanyl from '../image/펜타닐.png'; 
import ketamine from '../image/케타민.png';
import searchImg from '../image/검색.png';
import KPIC from '../image/약학정보원.png';
import ChatBot from './ChatBot';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const getChosung = (text) => {
    const chosung = [
        'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
    ];
    return text
        .split('')
        .map(char => {
            const code = char.charCodeAt(0) - 44032;
            if (code < 0 || code > 11171) return char;
            return chosung[Math.floor(code / 588)];
        })
        .join('');
};

const About = () => {
    const [keyword, setKeyword] = useState('');
    const [results, setResults] = useState([]);
    const [initial, setInitial] = useState('');

    const handleSearch = (event) => {
        event.preventDefault();
        const exampleResults = [
            { id: 1, name: '펜타닐(Fentanyl)', imageUrl: fentanyl, link: 'http://www.health.kr/Menu.PharmReview/_uploadfiles/펜타닐(fentanyl).pdf' },
            { id: 2, name: '케타민(Ketamine)', imageUrl: ketamine, link: 'http://www.health.kr/Menu.PharmReview/_uploadfiles/케타민(ketamine).pdf' },
        ];
        const filteredResults = exampleResults.filter(result => result.name.includes(keyword));
        setResults(filteredResults);
    };

    const handleInitialSearch = (initial) => {
        setInitial(initial);
        const exampleResults = [
            { id: 1, name: '펜타닐(Fentanyl)', imageUrl: fentanyl, link: 'http://www.health.kr/Menu.PharmReview/_uploadfiles/펜타닐(fentanyl).pdf' },
            { id: 2, name: '케타민(Ketamine)', imageUrl: ketamine, link: 'http://www.health.kr/Menu.PharmReview/_uploadfiles/케타민(ketamine).pdf' },
        ];
        const filteredResults = exampleResults.filter(result => getChosung(result.name).startsWith(initial));
        setResults(filteredResults);
    };

    return (
        <div>
            <div>
                <h2>약 소개</h2>
            </div>
            <div className='drugImg'>
                <div><img src={drug} alt="drug" /></div>
            </div>
            <div className="about-description">
                <p>
                    우리의 사명은 마약 사용을 줄이고, 이를 통해 사회의 안전과 건강을 증진하는 것입니다. 우리는 다양한 대상들에게 맞춤형 서비스를 제공하여 이 목표를 달성하고자 합니다.
                </p>
                <ul>
                    <li><strong>챗봇 상담 서비스</strong>: 일반 사람들은 우리의 챗봇을 통해 익명으로 상담을 받을 수 있습니다. 이 서비스는 마약 사용 문제를 겪고 있거나, 이를 예방하고 싶은 사람들에게 유용한 정보를 제공하고, 필요한 경우 전문 상담사와의 연결을 돕습니다.</li>
                    <li><strong>마약 은어 정보 제공</strong>: 일반인들은 마약과 관련된 다양한 은어와 용어에 대한 정보를 제공받을 수 있습니다. 이를 통해 마약 문제를 보다 쉽게 인식하고 예방할 수 있도록 돕습니다.</li>
                    <li><strong>데이터 제공</strong>: 경찰에게는 마약과 관련된 데이터를 제공합니다. 이를 통해 마약 범죄를 보다 효과적으로 추적하고 대응할 수 있도록 지원합니다.</li>
                </ul>
            </div>
            <div className="search-page">
                <div className="innerwrap">
                    <form name="smartSearchForm" id="smartSearchForm" onSubmit={handleSearch}>
                        <div className="searchwrap">
                            <div className="innerwrap">
                                <h4 className="title1">검색어 검색</h4>
                                <div className="text_search">
                                    <div>
                                        <input 
                                            type="text" 
                                            name="keyword" 
                                            value={keyword} 
                                            onChange={(e) => setKeyword(e.target.value)} 
                                            placeholder="제품명, 성분, 효능/효과로 검색이 가능해요." 
                                        />
                                        <button className="searchImg" type="submit"><img src={searchImg} alt="검색" /></button>
                                    </div>
                                    <button type="button" onClick={() => window.open('https://www.health.kr/searchIdentity/search.asp')}>
                                        약학정보원(약물백과) <img src={KPIC} alt="링크" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className="initial_search">
                        <h4 className="title1">초성 검색</h4>
                        <div className="initial_buttons">
                            {['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'].map(initial => (
                                <button key={initial} onClick={() => handleInitialSearch(initial)}>{initial}</button>
                            ))}
                        </div>
                    </div>
                    <TransitionGroup className="search_results">
                        {results.length > 0 && (
                            <CSSTransition timeout={300} classNames="fade">
                                <div className="innerwrap">
                                    <div className="result"> 총 <span className="num">{results.length}</span>개의 결과가 있습니다.</div>
                                    <ul>
                                        {results.map(result => (
                                            <li key={result.id}>
                                                <a href={result.link} target="_blank" rel="noopener noreferrer">
                                                    <div className="thumb"><img src={result.imageUrl} alt={result.name} /></div>
                                                    <div className="tit">{result.name}</div>
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </CSSTransition>
                        )}
                    </TransitionGroup>
                </div>
            </div>
            <ChatBot />
        </div>
    );
};

export default About;

import React, { useState } from 'react';
import '../CSS/About.css';
import drug from '../image/drug.png';
import fentanyl from '../image/펜타닐.png'; 
import ketamine from '../image/케타민.png';
import searchImg from '../image/검색.png';
import KPIC from '../image/약학정보원.png'; // 약학정보원 이미지 import


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

    const handleSearch = (event) => {
        event.preventDefault();
        // 예시 결과 데이터 (실제 구현에서는 API 호출 등을 통해 데이터 가져옴)
        const exampleResults = [
            { id: 1, name: '펜타닐(Fentanyl)', imageUrl: fentanyl, link: 'http://www.health.kr/Menu.PharmReview/_uploadfiles/펜타닐(fentanyl).pdf' },
            { id: 2, name: '케타민(Ketamine)', imageUrl: ketamine, link: 'http://www.health.kr/Menu.PharmReview/_uploadfiles/케타민(ketamine).pdf' },
            { id: 3, name: '케타민(Ketamine)', imageUrl: ketamine, link: 'http://www.health.kr/Menu.PharmReview/_uploadfiles/케타민(ketamine).pdf' },
            { id: 4, name: '케타민(Ketamine)', imageUrl: ketamine, link: 'http://www.health.kr/Menu.PharmReview/_uploadfiles/케타민(ketamine).pdf' },
            { id: 5, name: '케타민(Ketamine)', imageUrl: ketamine, link: 'http://www.health.kr/Menu.PharmReview/_uploadfiles/케타민(ketamine).pdf' },
        ];
        const filteredResults = exampleResults.filter(result => result.name.includes(keyword));
        setResults(filteredResults);
    };

    const handleInitialSearch = (initial) => {
        setInitial(initial);
        // 예시로 초성에 따른 결과 필터링 로직
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
            <div>slide2</div>
            <div>slide3</div>
            <div className="search-page">
                <div className="innerwrap">
                    <h3 className="page_title1">통합검색</h3>
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
                    <div className="search_results">
                        {results.length > 0 && (
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
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;

import React, { useState, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Fade } from "react-awesome-reveal";
import "../CSS/About.css";

import drug from "../image/drug.png";
import fentanyl from "../image/펜타닐.png";
import ketamine from "../image/케타민.png";
import cocaine from "../image/코카인.png";
import methylphenidate from "../image/페니드.png";
import noImage from "../image/이미지 없음.png";
import searchImg from "../image/검색.png";
import KPIC from "../image/약학정보원.png";
import cannabis from "../image/대마초.png";
import dextromethorphan from "../image/덱스트로메토르판.png";
import codeine from "../image/코데인.png";
import garsinia from "../image/가르시니아.png";
import betamethasone from "../image/베타메타손.png";
import ativan from "../image/아티반.png";

import ChatBot from "./ChatBot";

const getChosung = (text) => {
  const chosung = [
    "ㄱ",
    "ㄲ",
    "ㄴ",
    "ㄷ",
    "ㄸ",
    "ㄹ",
    "ㅁ",
    "ㅂ",
    "ㅃ",
    "ㅅ",
    "ㅆ",
    "ㅇ",
    "ㅈ",
    "ㅉ",
    "ㅊ",
    "ㅋ",
    "ㅌ",
    "ㅍ",
    "ㅎ",
  ];
  return text
    .split("")
    .map((char) => {
      const code = char.charCodeAt(0) - 44032;
      if (code < 0 || code > 11171) return char;
      return chosung[Math.floor(code / 588)];
    })
    .join("");
};

const exampleData = [
  {
    id: 1,
    name: "펜타닐(Fentanyl)",
    imageUrl: fentanyl,
    link: "http://www.health.kr/Menu.PharmReview/_uploadfiles/펜타닐(fentanyl).pdf",
  },
  {
    id: 2,
    name: "케타민(Ketamine)",
    imageUrl: ketamine,
    link: "http://www.health.kr/Menu.PharmReview/_uploadfiles/케타민(ketamine).pdf",
  },
  {
    id: 3,
    name: "코카인(Cocaine)",
    imageUrl: cocaine,
    link: "https://www.msdmanuals.com/ko-kr/home/특별-주제/불법-약물-및-중독성-물질/코카인",
  },
  {
    id: 4,
    name: "메틸페니데이트(Methylphenidate)",
    imageUrl: methylphenidate,
    link: "https://www.health.kr/Menu.PharmReview/_uploadfiles/메틸페니데이트.pdf",
  },
  {
    id: 5,
    name: "디히드로코데인(Dihydrocodeine)",
    imageUrl: noImage,
    link: "https://www.health.kr/Menu.PharmReview/View.asp?PharmReview_IDX=8677",
  },
  {
    id: 6,
    name: "대마초(Cannabis)",
    imageUrl: cannabis,
    link: "https://www.health.kr/Menu.PharmReview/View.asp?PharmReview_IDX=8609",
  },
  {
    id: 7,
    name: "필로폰",
    imageUrl:
      "https://dimg.donga.com/wps/NEWS/IMAGE/2021/07/19/108030287.2.jpg",
    link: "https://www.health.kr/Menu.PharmReview/View.asp?PharmReview_IDX=8535",
  },
  {
    id: 8,
    name: "마약",
    imageUrl:
      "https://www.nhis.or.kr/magazin/151/html/style/images/sub3_img1.jpg",
    link: "https://www.health.kr/Menu.PharmReview/View.asp?PharmReview_IDX=8501",
  },
  {
    id: 9,
    name: "덱스트로메토르판(Dextromethorphan)",
    imageUrl: dextromethorphan,
    link: "https://www.health.kr/Menu.PharmReview/View.asp?PharmReview_IDX=8436",
  },
  {
    id: 10,
    name: "수면개선 일반의약품: 불면증의 개선이 필요할 때",
    imageUrl:
      "https://jhealthfile.joins.com/photo/2018/03/30/133ed6a2823f2.jpg",
    link: "http://www.health.kr/Menu.PharmReview/View.asp?PharmReview_IDX=8689",
  },
  {
    id: 11,
    name: "베타메타손(betamethasone): 아토피, 접촉피부염, 관절염 등의 치료가 필요할 때",
    imageUrl: betamethasone,
    link: "http://www.health.kr/Menu.PharmReview/View.asp?PharmReview_IDX=8686",
  },
  {
    id: 12,
    name: "모기기피제 : 모기, 진드기, 벼룩 등 벌레 퇴치가 필요할 때",
    imageUrl:
      "https://www.gangnam.go.kr/upload/editor/2022/06/14/8c5be9e9-a370-48df-8ef7-f2180026a34e.png",
    link: "http://www.health.kr/Menu.PharmReview/View.asp?PharmReview_IDX=8683",
  },
  {
    id: 13,
    name: "락티톨(lactitol) : 변비, 간성혼수(문맥계 뇌병증)의 치료가 필요할 때",
    imageUrl: noImage,
    link: "http://www.health.kr/Menu.PharmReview/View.asp?PharmReview_IDX=8681",
  },
  {
    id: 14,
    name: "헤르페스 치료제 : 수포, 물집, 발열, 피로감 등의 증상이 나타날 때",
    imageUrl: noImage,
    link: "http://www.health.kr/Menu.PharmReview/View.asp?PharmReview_IDX=8679",
  },
  {
    id: 15,
    name: "남성 갱년기 증후군약 : 40대 이후 남성에게 근육량 감소, 무기력증, 집중력 저하 등이 나타날 때",
    imageUrl: noImage,
    link: "http://www.health.kr/Menu.PharmReview/View.asp?PharmReview_IDX=8675",
  },
  {
    id: 16,
    name: "스코폴라민(scopolamine): 구역, 구토 등 멀미 예방이 필요할 때",
    imageUrl: noImage,
    link: "http://www.health.kr/Menu.PharmReview/View.asp?PharmReview_IDX=8674",
  },
  {
    id: 17,
    name: "알레르기 상비약 : 곤충 교상, 결막염, 천식발작, 아나필락시스 등이 나타날 때",
    imageUrl: noImage,
    link: "http://www.health.kr/Menu.PharmReview/View.asp?PharmReview_IDX=8670",
  },
  {
    id: 18,
    name: "탐스로신(tamsulosin) : 전립선비대증으로 지연뇨, 절박뇨, 빈뇨 등의 증상이 나타날 때",
    imageUrl: noImage,
    link: "http://www.health.kr/Menu.PharmReview/View.asp?PharmReview_IDX=8669",
  },
  {
    id: 19,
    name: "다래끼약 : 눈꺼풀에 염증이 나타날 때",
    imageUrl: noImage,
    link: "http://www.health.kr/Menu.PharmReview/View.asp?PharmReview_IDX=8667",
  },
  {
    id: 20,
    name: "가르시니아 캄보지아 추출물 : 체지방 감소에 도움이 필요할 때",
    imageUrl: garsinia,
    link: "http://www.health.kr/Menu.PharmReview/View.asp?PharmReview_IDX=8660",
  },
  {
    id: 21,
    name: "임산부 비염약 : 임부/수유부에게 콧물, 가려움증, 코막힘 등의 증상이 나타날 때",
    imageUrl: noImage,
    link: "http://www.health.kr/Menu.PharmReview/View.asp?PharmReview_IDX=8641",
  },
  {
    id: 22,
    name: "테오브로민(theobromine) : 후비루, 기침 등의 증상이 나타날 때",
    imageUrl: noImage,
    link: "http://www.health.kr/Menu.PharmReview/View.asp?PharmReview_IDX=8640",
  },
  {
    id: 23,
    name: "여성 탈모치료제 : 모발이 가늘어지거나 정수리 가르마 부위가 넓어지는 증상이 나타날 때",
    imageUrl: noImage,
    link: "http://www.health.kr/Menu.PharmReview/View.asp?PharmReview_IDX=8639",
  },
  {
    id: 24,
    name: "플루나리진(flunarizine) : 급성 편두통, 어지러움 등의 증상이 나타날 때",
    imageUrl: noImage,
    link: "http://www.health.kr/Menu.PharmReview/View.asp?PharmReview_IDX=8638",
  },
  {
    id: 25,
    name: "CAR-T 세포 치료제 : B 세포 림프종 백혈병 치료가 필요할 때",
    imageUrl: noImage,
    link: "http://www.health.kr/Menu.PharmReview/View.asp?PharmReview_IDX=8636",
  },
  {
    id: 26,
    name: "판토프라졸(pantoprazole): 역류성 식도염, 헬리코박터균 등의 치료가 필요할 때",
    imageUrl: noImage,
    link: "http://www.health.kr/Menu.PharmReview/View.asp?PharmReview_IDX=8635",
  },
  {
    id: 27,
    name: "아티반",
    imageUrl: ativan,
    link: "https://www.health.kr/searchDrug/result_drug.asp?drug_cd=A11ABBBBB0914",
  },
  {
    id: 28,
    name: "페라미비르(peramivir)",
    imageUrl: noImage,
    link: "http://www.health.kr/Menu.PharmReview/View.asp?PharmReview_IDX=8631",
  },
  {
    id: 29,
    name: "코데인(Codeine)",
    imageUrl: codeine,
    link: "https://www.health.kr/searchIngredient/detail.asp?ingd_code=I005965",
  },
];

const About = () => {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState(exampleData);
  const [initial, setInitial] = useState("");

  useEffect(() => {
    setResults(exampleData);
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    const filteredResults = exampleData.filter((result) =>
      result.name.includes(keyword)
    );
    setResults(filteredResults);
  };

  const handleInitialSearch = (initial) => {
    setInitial(initial);
    const filteredResults = exampleData.filter((result) =>
      getChosung(result.name).startsWith(initial)
    );
    setResults(filteredResults);
  };

    return (
        <div>
            <Fade>
                <div>
                    {/* <h1>약 소개</h1> */}
                </div>
                <div className='drugImg'>
                    <img src={drug} alt="drug" />
                </div>
                <div className="about-description">
                    <div className='serviceGoal1'>
                        <h4>우리의 사명은 마약 사용을 줄이고, 이를 통해 사회의 안전과 건강을 증진하는 것입니다.</h4>
                        <h4>우리는 다양한 대상들에게 맞춤형 서비스를 제공하여 이 목표를 달성하고자 합니다.</h4>
                    </div>
                    <ul>
                        <li>
                            <strong>챗봇 상담 서비스</strong> 일반 사람들은 우리의 챗봇을 통해 익명으로 상담을 받을 수 있습니다.
                            <p>이 서비스는 마약 사용 문제를 겪고 있는 사람에겐 상담을, 이를 예방하고 싶은 사람들에게 유용한 정보를 제공하는 도움을 주려고 합니다</p>

                        </li>
                        <li>
                            <strong>마약 은어 정보 제공</strong> 일반인들은 마약과 관련된 다양한 은어와 용어에 대한 정보를 제공받을 수 있습니다.
                            <p>이를 통해 마약 문제를 보다 쉽게 인식하고 예방할 수 있도록 돕습니다.</p>
                        </li>
                        <li>
                            <strong>데이터 제공</strong> 경찰에게는 마약과 관련된 데이터를 제공합니다.
                            <p>이를 통해 마약 범죄를 보다 효과적으로 추적하고 대응할 수 있도록 지원합니다.</p>
                        </li>
                    </ul>
                </div>
            </Fade>
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
                                    <button className="searchImg" type="button" onClick={() => window.open('https://www.health.kr/searchIdentity/search.asp')}>
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
                                                <Fade>
                                                    <a href={result.link} target="_blank" rel="noopener noreferrer">
                                                        <div className="thumb"><img src={result.imageUrl || noImage} alt={result.name} /></div>
                                                        <div className="tit">{result.name}</div>
                                                    </a>
                                                </Fade>
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

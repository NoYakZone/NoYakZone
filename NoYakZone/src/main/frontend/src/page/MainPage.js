import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useHistory } from 'react-router-dom';
import '../CSS/MainPage.css';
import ChatBot from './ChatBot';

import poster1 from '../image/마약포스터1.png';
import poster2 from '../image/마약포스터2.png';
import poster3 from '../image/마약포스터3.png';
import poster4 from '../image/마약포스터4.png';
import poster5 from '../image/마약포스터5.png';

//마약 데이터
import fentanyl from '../image/펜타닐.png';
import ketamine from '../image/케타민.png';
import cocaine from '../image/코카인.png';
import methylphenidate from '../image/페니드.png';
import noImage from '../image/이미지 없음.png';
import cannabis from '../image/대마초.png'
import pethidine from '../image/페치딘.png'

const exampleData = [
    { id: 1, name: '펜타닐(Fentanyl)', imageUrl: fentanyl, link: 'http://www.health.kr/Menu.PharmReview/_uploadfiles/펜타닐(fentanyl).pdf' },
    { id: 2, name: '케타민(Ketamine)', imageUrl: ketamine, link: 'http://www.health.kr/Menu.PharmReview/_uploadfiles/케타민(ketamine).pdf' },
    { id: 3, name: '코카인(Cocaine)', imageUrl: cocaine, link: 'https://www.msdmanuals.com/ko-kr/home/특별-주제/불법-약물-및-중독성-물질/코카인' },
    { id: 4, name: '메틸페니데이트(Methylphenidate)', imageUrl: methylphenidate, link: 'https://www.health.kr/Menu.PharmReview/_uploadfiles/메틸페니데이트.pdf' },
    { id: 5, name: '페치딘(Pethidine)', imageUrl: pethidine, link: 'https://www.health.kr/searchDrug/result_drug.asp?drug_cd=A11ABBBBB0169' },
    { id: 6, name: '대마초(Cannabis)', imageUrl: cannabis, link: 'https://www.health.kr/Menu.PharmReview/View.asp?PharmReview_IDX=8609' },
];

const MainPage = () => {
    const history = useHistory();

    const goToAboutPage = () => {
        history.push('/About');
    };

    const goToDrugInfo = () => {
        history.push('/Community');
    };

    const goToChatBot = () => {
        history.push('/ChatBot');
    };

    const handleSlideClick = (link) => {
        window.open(link, '_blank');
    };

    return (
        <div className='MainContainer'>
            <div className='Content'>
                <div className='ServiceInfo'>
                    <h1 className='Maintitle'>서비스 소개</h1>
                    <h4 className='serviceGoal' onClick={goToAboutPage}>
                        우리의 사명은 마약 사용을 줄이고, 이를 통해 사회의 안전과 건강을 증진하는 것입니다.
                        <h4>다양한 대상들에게 맞춤형 서비스를 제공하여 이 목표를 달성하고자 합니다.
                        </h4>
                    </h4>

                    <div className="slideContent">
                        <div className="slideText">
                            <h2 className='slogan'>Making Tomorrow Better</h2>
                            <p>
                                <p>저희 NoYakZone은 마약이 없는 대한민국을 꿈꾸고 있습니다.</p>
                               
                            </p>
                        </div>
                        <Swiper 
                            navigation={true} 
                            pagination={{ clickable: true }}
                            modules={[Navigation, Pagination, Autoplay]} 
                            className="mySwiper"
                            autoplay={{ delay: 3000, disableOnInteraction: false }}
                            speed={3000}
                            loop={true}
                        >
                            <SwiperSlide><img src={poster1} alt="Poster 1" className="poster-image" /></SwiperSlide>
                            <SwiperSlide><img src={poster2} alt="Poster 2" className="poster-image" /></SwiperSlide>
                            <SwiperSlide><img src={poster3} alt="Poster 3" className="poster-image" /></SwiperSlide>
                            <SwiperSlide><img src={poster4} alt="Poster 4" className="poster-image" /></SwiperSlide>
                            <SwiperSlide><img src={poster5} alt="Poster 5" className="poster-image" /></SwiperSlide>
                        </Swiper>
                    </div>
                </div>

                <div className='GoAboutUsPage' onClick={goToAboutPage}>
                    <h2>약 소개 페이지</h2>
                </div>

                <div className='DrugInfo drugInfoContent'>
                    <Swiper 
                        navigation={true} 
                        pagination={{ clickable: true }}
                        modules={[Navigation, Pagination, Autoplay]} 
                        className="mySwiper"
                        autoplay={{ delay: 4000, disableOnInteraction: false }}
                        speed={4000}
                        loop={true}
                    >
                        {exampleData.slice(0, 6).map((item) => (
                            <SwiperSlide key={item.id} onClick={() => handleSlideClick(item.link)}>
                                <div>
                                    <img src={item.imageUrl} alt={item.name} className="drug-image" />
                                    <div className="slideTitle">{item.name}</div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                <div className='Community' onClick={goToDrugInfo}>
                    <h2>커뮤니티</h2>
                </div>

                {/* <div className='ChatBot' onClick={goToChatBot}>
                    <p>상담 챗봇 페이지</p>
                </div> */}
            </div>
            <ChatBot />
        </div>
    );
};

export default MainPage;

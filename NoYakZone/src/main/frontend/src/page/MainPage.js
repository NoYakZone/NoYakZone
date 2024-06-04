import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useHistory } from 'react-router-dom';
import '../CSS/MainPage.css';

import poster1 from '../image/마약포스터1.jpg';
import poster2 from '../image/마약포스터2.png';

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

    return (
        <div className='MainContainer'>
            <div className='Content'>
                <div className='ServiceInfo'>
                    <h2>서비스 소개</h2>
                    <p className='serviceGoal'>
                        우리의 사명은 마약 사용을 줄이고, 이를 통해 사회의 안전과 건강을 증진하는 것입니다.
                    </p>
                    <p className='autoPlay'>
                        다양한 대상들에게 맞춤형 서비스를 제공하여 이 목표를 달성하고자 합니다.
                    </p>

                    <div className="slideContent">
                        <div className="slideText">
                            <h3>Making Tomorrow Better</h3>
                            <p>저희 NoYakZone은 마약이 없는 대한민국을 꿈꾸고 있습니다.</p>
                        </div>
                        <Swiper 
                            navigation={true} 
                            pagination={{ clickable: true }}
                            modules={[Navigation, Pagination, Autoplay]} 
                            className="mySwiper"
                            autoplay={{ delay: 3000, disableOnInteraction: false }}
                        >
                            <SwiperSlide><img src={poster1} alt="Poster 1" className="poster-image" /></SwiperSlide>
                            <SwiperSlide><img src={poster2} alt="Poster 2" className="poster-image" /></SwiperSlide>
                        </Swiper>
                    </div>
                </div>

                <div className='GoAboutUsPage' onClick={goToAboutPage}>
                    <h2>약 소개 페이지</h2>
                </div>

                <div className='DrugInfo'>
                    <Swiper 
                        navigation={true} 
                        pagination={{ clickable: true }}
                        modules={[Navigation, Pagination]} 
                        className="mySwiper"
                    >
                        <SwiperSlide>Slide 1</SwiperSlide>
                        <SwiperSlide>Slide 2</SwiperSlide>
                        <SwiperSlide>Slide 3</SwiperSlide>
                        <SwiperSlide>Slide 4</SwiperSlide>
                        <SwiperSlide>Slide 5</SwiperSlide>
                        <SwiperSlide>Slide 6</SwiperSlide>
                        <SwiperSlide>Slide 7</SwiperSlide>
                        <SwiperSlide>Slide 8</SwiperSlide>
                        <SwiperSlide>Slide 9</SwiperSlide>
                    </Swiper>
                </div>

                <div className='Community' onClick={goToDrugInfo}>
                    <h2>커뮤니티</h2>
                </div>

                <div className='ChatBot' onClick={goToChatBot}>
                    <p>상담 챗봇 페이지</p>
                </div>
            </div>
        </div>
    );
};

export default MainPage;
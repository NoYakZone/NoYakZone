import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { useHistory } from 'react-router-dom';
import '../CSS/MainPage.css'


const MainPage = () => {
    const history = useHistory();

    const goToAboutPage = () => {
        history.push('/about');
    };

    const goToDrugInfo = () =>(
        history.push('/Community')
    )

    return (
        <div className='MainContainer'>
            <div className='Content'>
                <div className='ServiceInfo'>
                    <h2>서비스 소개</h2>
                    <p className='serviceGoal'>
                        슬라이드로 서비스 목표 쓰고 설명.
                    </p>
                    <p className='autoPlay'>
                        AutoPlay도 가능하면 쓸수있게
                    </p>

                    <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                        <SwiperSlide>Slide 1</SwiperSlide>
                        <SwiperSlide>Slide 2</SwiperSlide>
                        <SwiperSlide>Slide 3</SwiperSlide>
                    </Swiper>
                </div>

                <div className='GoAboutUsPage' onClick={goToAboutPage}>
                    <h2>약 소개 페이지</h2>
                </div>

                <div className='DrugInfo' onClick={goToAboutPage}>
                    <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
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

                <div className='Community'onClick={goToDrugInfo}>
                    <h2>커뮤니티</h2>
                </div>

                <div className='ChatBot'>
                    <p>상담 챗봇 페이지</p>
                </div>
            </div>


        </div>
    );
};

export default MainPage;

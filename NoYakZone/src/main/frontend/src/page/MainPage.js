import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { useHistory } from 'react-router-dom';

import Navigate from '../component/Navigate';
import Footer from '../component/Footer';

const MainPage = () => {
    const history = useHistory();

    const goToAboutPage = () => {
        history.push('/about');
    };

    return (
        <div className='MainContainer'>
            <Navigate />

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
                        <SwiperSlide>이거</SwiperSlide>
                        <SwiperSlide>Slide 2</SwiperSlide>
                        <SwiperSlide>Slide 3</SwiperSlide>
                    </Swiper>
                </div>

                <div className='GoAboutUsPage' onClick={goToAboutPage}>
                    <h2>About</h2>
                </div>

                <div className='DrugInfo'>
                    <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                        <SwiperSlide>저거</SwiperSlide>
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

                <div className='fisrtPic'>
                    <h2>두번쨰 내용</h2>
                </div>

                <div className='btn_Menu'>
                    <p>세번째</p>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default MainPage;

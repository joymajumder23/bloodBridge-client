// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import img1 from '../../../assets/images/1.jpg';
import img2 from '../../../assets/images/2.jpg';
import img3 from '../../../assets/images/3.jpg';
// import required modules
import { EffectFade, Navigation, Pagination } from 'swiper/modules';
const Slider = () => {
    return (
        <div>
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                effect={'fade'}
                navigation={true}
                loop={true}
                pagination={{
                    clickable: true,
                }}
                modules={[EffectFade, Navigation, Pagination]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <img src={img1} />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={img2} />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={img3} />
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Slider;
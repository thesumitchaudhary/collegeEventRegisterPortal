// src/components/MySwiper.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

// Import images
import Img1 from "../assets/stock/1.jpeg";
import Img2 from "../assets/stock/2.jpeg";
import Img3 from "../assets/stock/3.jpeg";
import Img4 from "../assets/stock/4.jpeg";
import Img5 from "../assets/stock/5.jpeg";
import Img6 from "../assets/stock/6.jpeg";
import Img7 from "../assets/stock/7.jpeg";
import Img8 from "../assets/stock/8.jpeg";
import Img9 from "../assets/stock/9.jpeg";
import Img10 from "../assets/stock/10.jpeg";
import Img11 from "../assets/stock/11.jpeg";
import Img12 from "../assets/stock/12.jpeg";
import Img13 from "../assets/stock/13.jpeg";
import Img14 from "../assets/stock/14.jpeg";
import Img15 from "../assets/stock/15.jpeg";
import Img16 from "../assets/stock/16.jpeg";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const MySwiper = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={30}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      loop={true}
    >
      <SwiperSlide>
        <div className="h-64 flex items-center justify-center">
          <img src={Img1} alt="Slide 1" className="h-full object-cover" />
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="h-64 flex items-center justify-center">
          <img src={Img2} alt="Slide 2" className="h-full object-cover" />
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="h-64 flex items-center justify-center">
          <img src={Img3} alt="Slide 3" className="h-full object-cover" />
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="h-64 flex items-center justify-center">
          <img src={Img4} alt="Slide 4" className="h-full object-cover" />
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default MySwiper;

import React from "react";
import useFetchData from "../../HOC/useFetchData";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import MainGridProduct from "../Products/MainGridProduct";
const SalesProducts = () => {
  const [data, error, isLoading] = useFetchData(
    "http://localhost:3001/getSales"
  );
  return (
    <div className="w-11/12 h-[500px] relative left-24  ">
      <Swiper
        slidesPerView={4}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        loop={true}
        navigation={true}
        modules={[Autoplay]}
        className="mySwiper"
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
      >
        {data.map((item) => (
          <SwiperSlide key={item.id}>
            <MainGridProduct key={item.id} props={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SalesProducts;

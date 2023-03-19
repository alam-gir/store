// Import Swiper React components
import {Swiper, SwiperSlide} from "swiper/react";

// import required modules
import {FreeMode} from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
// import "swiper/css/navigation";

import ProductCard from "./ProductCard";

export default function MoreRelatedProduct({products}) {
  return (
    <>
      <Swiper
        style={{
          "--swiper-navigation-color": "#888",
          "--swiper-pagination-color": "#888",
        }}
        loop={false}
        navigation={false}
        freeMode={true}
        slidesPerView={2}
        spaceBetween={10}
        modules={[FreeMode]}
        breakpoints={{
          375: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          425: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          610: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          720: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          850: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          950: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          1100: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
        }}
        className="mySwiper">
        {products?.map((product) => {
          return (
            <div className="relatedProductSlider">
              <SwiperSlide>
                <div key={product._id} className="pt-8 pb-4 w-full">
                  <ProductCard
                    product={product}
                    defaultImgHeight={"h-[120px]"}
                  />
                </div>
              </SwiperSlide>
            </div>
          );
        })}
      </Swiper>
    </>
  );
}

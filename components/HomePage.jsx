import React from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { Pagination, Autoplay } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

// My Custom Component
import Product from "./Product";
import HomeSliderCard from "./HomeSliderCard";

function HomePage() {
  return (
    <>
      <div className="wrapper">
        <header className="home-slider">
          <Swiper
            loop={true}
            spaceBetween={30}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Pagination, Autoplay]}
            className="mySwiper">
            <SwiperSlide>
              <HomeSliderCard />
            </SwiperSlide>
            <SwiperSlide>
              <HomeSliderCard />
            </SwiperSlide>
            <SwiperSlide>
              <HomeSliderCard />
            </SwiperSlide>
            <SwiperSlide>
              <HomeSliderCard />
            </SwiperSlide>
          </Swiper>
        </header>
        <section className="product-container">
          <header className="product-header">
            <h2>Popular</h2>
            <span>
              <a href="#">View All</a>
            </span>
          </header>
          <main className="product-wrapper">
            <Product imgHeight="h-[150px]" />
            <Product imgHeight="h-[150px]" bgColor="bg-green-100" />
            <Product imgHeight="h-[150px]" bgColor="bg-blue-100" />
            <Product imgHeight="h-[150px]" bgColor="bg-amber-100" />
          </main>
        </section>
      </div>
    </>
  );
}

export default HomePage;

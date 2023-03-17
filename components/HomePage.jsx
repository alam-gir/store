// Import Swiper React components
import {Swiper, SwiperSlide} from "swiper/react";

// import required modules
import {Pagination, Autoplay} from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

// My Custom Component
import HomeSliderCard from "./HomeSliderCard";
import ProductCard from "./ProductCard";

function HomePage({products}) {
  return (
    <section className="homeContainer">
      <div className="wrapper">
        <header className="home-slider">
          <Swiper
            loop={true}
            spaceBetween={30}
            pagination={{clickable: true}}
            autoplay={{
              delay: 5000,
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
          <main className="productsGroup">
            {/* products card  */}
            {products.map((product) => {
              return (
                <div key={product._id} className="productCard">
                  <ProductCard product={product} />
                </div>
              );
            })}

            {/* <Product bgColor="bg-green-100" />
            <Product bgColor="bg-blue-100" />
            <Product bgColor="bg-amber-100" /> */}
          </main>
        </section>
      </div>
    </section>
  );
}

export default HomePage;

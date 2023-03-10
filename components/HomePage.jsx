import React, {useState, useEffect} from "react";

// Import Swiper React components
import {Swiper, SwiperSlide} from "swiper/react";

// import required modules
import {Pagination, Autoplay} from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

// My Custom Component
import Product from "./Product";
import HomeSliderCard from "./HomeSliderCard";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/api/db/products")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setProducts(data.products);
        console.log(data.products);
        setIsLoading(false);
      });
  }, []);

  const productElement =
    products &&
    products.map((product) => {
      return (
        <Product
          productId={product._id}
          productImg={product.images[0]}
          productName={product.name}
          productWeight={product.weight}
          productPrice={product.price}
        />
      );
    });

  return (
    <section className="bg-[#F8F8F8]">
      <div className="wrapper">
        <header className="home-slider">
          <Swiper
            loop={true}
            spaceBetween={30}
            pagination={{clickable: true}}
            autoplay={{
              delay: 3000,
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
            {isLoading && <h2>Loading...</h2>}

            {productElement}

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

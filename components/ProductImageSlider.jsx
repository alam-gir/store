// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper";
import ProductViewSlide from "./ProductViewSlide";

const ProductImageSlider = ({ product }) => {
  return (
    <div>
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        {/* render all slider */}
        {product.images.map((image) => {
          return (
            <SwiperSlide key={product._id}>
              <div>
                <ProductViewSlide image={image}/>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default ProductImageSlider;

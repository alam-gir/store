import Slider from "react-slick";
import ProductCard from "../ProductCard";

const ProductsCardSlider = ({ products }) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="">
      <Slider {...settings} >
          {products?.map((product) => {
            return (
              <div key={product._id} className="py-4">
                <ProductCard product={product} imgHeight={"h-24"} />
              </div>
            );
          })}
      </Slider>
    </div>
  );
};

export default ProductsCardSlider;

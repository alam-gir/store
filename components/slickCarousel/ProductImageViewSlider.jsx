import Slider from "react-slick";

const ProductImageViewSlider = ({product}) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const productDefaultImg =
    "https://i.ibb.co/P9fVhj6/pngfind-com-lemon-tea-png-6661129.png";
  return (
    <div className="p-4">
      <Slider {...settings}>
        {product?.images?.map((image, index) => {
          return (
            <div key={index} className="w-full">
              <img src="https://i.ibb.co/P9fVhj6/pngfind-com-lemon-tea-png-6661129.png" alt="" className="w-full"/>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default ProductImageViewSlider;

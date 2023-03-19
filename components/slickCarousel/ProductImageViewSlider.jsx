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
      <Slider {...settings} className="">
        {product?.images?.map((image, index) => {
          return (
            <div key={index} className="">
              <div className=""></div>
              <img src={product?.images?.length > 0 ? image  : productDefaultImg} alt="" className=""/>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default ProductImageViewSlider;

import Slider from "react-slick";

const ProductImageViewSlider = ({ product }) => {
    console.log(product?.images)
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="p-4">
      <Slider {...settings}>
        {product?.images.map((image, index) => {
          return (
            <div key={index} className="">
              <img src={image} alt="" className=""/>

            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default ProductImageViewSlider;

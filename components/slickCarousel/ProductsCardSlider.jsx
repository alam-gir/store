import { useEffect, useState } from "react";
import Slider from "react-slick";

const ProductsCardSlider = () => {
  const [products, setProducts] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const fetchProducts = async () => {
    const res = await fetch("/api/db/products");
    const data = await res.json();
    console.log({data})
    setProducts(data?.products);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();

  },[])

  console.log("loged");
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
          slidesToShow: 4,
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
  console.log(products)
  return (
    <Slider {...settings}>
      {products?.map((product) => {
        return (
          <div key={product._id}>
            <h3>{product.name}</h3>
          </div>
        );
      })}
    </Slider>
  );
};

export default ProductsCardSlider;

import { useRouter } from "next/router";
import Button from "./Button";
import { useState, useEffect } from "react";
import MoreRelatedProduct from "./MoreRelatedProduct";
import { useRecoilState, useRecoilValue } from "recoil";
import { cartState } from "@/lib/atom/cartState";
import { cartProductsIdState } from "@/lib/atom/cartProductsIdState";
import { handleAddToCart } from "@/lib/cart/cartFunctions";

// Carousel
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

const ProductView = ({ products }) => {
  const [cartProductsId, setCartProductsId] =
    useRecoilState(cartProductsIdState);

  const [currentProduct, setCurrentProduct] = useState(null);

  // user router for get params
  const router = useRouter();
  const productId = router.query.productId;

  // whenever change productId set currentProduct
  useEffect(() => {
    // setting current product and prices
    setCurrentProduct(() => {
      const product = products?.filter(
        (product) => product._id === productId
      )[0];
      const price = calculateOfferPrice(
        product?.price,
        product?.discountPercentage
      );
      return { product, price };
    });
  }, [productId]);

  const productDefaultImg =
    "https://i.ibb.co/P9fVhj6/pngfind-com-lemon-tea-png-6661129.png";

  return (
    <div className="productViewContainer">
      <div className="productViewGrid">
        {/* product image sliderrrrrrr */}
        <div className="productCarousel">
          <div className="productCarouselWrapper">
            <Carousel
              dynamicHeight={true}
              showArrows={true}
              showThumbs={true}
              infiniteLoop={true}
              stopOnHover={true}
              swipeable={true}
              emulateTouch={true}
              showIndicators={false}
              thumbWidth={60}>
              {currentProduct?.product?.images?.map((image, index) => {
                return (
                  <div key={index} className="carouselImgWrapper">
                    <img
                      src={
                        currentProduct?.product?.images?.length > 0
                          ? currentProduct?.product?.image
                          : productDefaultImg
                      }
                      className="h-full w-full object-contain"
                    />
                  </div>
                );
              })}

              {/* This is for testing purpose --static design */}
              {/* <div className="carouselImgWrapper">
                <img
                  src={productDefaultImg}
                  className="h-full w-full object-contain"
                />
              </div> */}
            </Carousel>
          </div>
        </div>
        {/* Product Details */}
        <div className="productDetails">
          <div className="productDetailsWrapper">
            <div className="productNamePrice">
              <div className="productName">
                <h2>
                  {currentProduct?.product?.name}{" "}
                  <span className="text-zinc-500 text-base">
                    ({currentProduct?.product?.weight})
                  </span>
                </h2>
                <p>{currentProduct?.product?.category}</p>
              </div>
              <div className="productPrice">
                <h1>${currentProduct?.product?.priceAfterDiscount}</h1>
                <p>
                  <span className="line-through">
                    ${currentProduct?.product?.regularPrice}{" "}
                  </span>
                  - {currentProduct?.product?.discountPercentage}%
                </p>
              </div>
            </div>
            <div className="productDesc">
              <h2>Description</h2>
              <p>{currentProduct?.product?.description}</p>
            </div>
            <div className="orderBtns">
              <Button text="Buy Now" />
              <Button
                text={
                  isCarted(currentProduct?.product?._id, cartProductsId)
                    ? "in cart"
                    : "add to cart"
                }
                bgColor={"bg-red-600"}
                textColor={"text-white"}
                handleClick={() =>
                  handleAddToCart(
                    currentProduct?.product?._id,
                    setCartProductsId
                  )
                }
              />
            </div>
            <div className="moreRelatedProducts">
              <h2>Related Products</h2>
              {/* productSlider  */}
              <div className="w-full m-auto">
                <MoreRelatedProduct products={products} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;

import {useRouter} from "next/router";
import React from "react";
import Button from "./Button";
import {useState, useEffect} from "react";
import MoreRelatedProduct from "./MoreRelatedProduct";
import {useRecoilState, useRecoilValue} from "recoil";
import {cartState} from "@/lib/atom/cartState";
import {cartProductsIdState} from "@/lib/atom/cartProductsIdState";
import {handleAddToCart} from "@/lib/cart/cartFunctions";

// Carousel
import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

const ProductView = ({
  allProducts,
  price: {offer, offerPrice, regularPrice},
}) => {
  const [cartProductsId, setCartProductsId] =
    useRecoilState(cartProductsIdState);
  const [currentProduct, setCurrentProduct] = useState(null);
  const router = useRouter();
  const queryProductId = router.query.productId;
  const queryProduct = allProducts.filter(
    (product) => product._id === queryProductId
  );
  const cart = useRecoilValue(cartState);

  // whenever change queryProduct set query product to current product
  useEffect(() => {
    setCurrentProduct(queryProduct[0]);
  }, [queryProduct]);

  const cartBtnText = (id) => {
    const cartProductsIds = cart?.products?.map((product) => product._id);
    if (cartProductsIds?.includes(id)) return "product added";

    // initially
    return "add to cart";
  };

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
              {currentProduct?.images?.map((image, index) => {
                return (
                  <div key={index} className="carouselImgWrapper">
                    <img
                      src={
                        currentProduct?.images?.length > 0
                          ? currentProduct?.images[0]
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
                  {currentProduct?.name}{" "}
                  <span className="text-zinc-500 text-base">
                    ({currentProduct?.weight && `${currentProduct?.weight}`})
                  </span>
                </h2>
                <p>{currentProduct?.category}</p>
              </div>
              <div className="productPrice">
                <h1>${offerPrice}</h1>
                <p>
                  <span className="line-through">${regularPrice} </span>-{" "}
                  {currentProduct?.discountPercentage}%
                </p>
              </div>
            </div>
            <div className="productDesc">
              <h2>Description</h2>
              <p>{currentProduct?.description}</p>
            </div>
            <div className="orderBtns">
              <Button text="Buy Now" />
              <Button
                text={cartBtnText(currentProduct?._id)}
                bgColor={"bg-red-600"}
                textColor={"text-white"}
                handleClick={() =>
                  handleAddToCart(currentProduct?._id, setCartProductsId)
                }
              />
            </div>
            <div className="moreRelatedProducts">
              <h2>Related Products</h2>
              {/* productSlider  */}
              <div className="w-full m-auto">
                <MoreRelatedProduct products={allProducts} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;

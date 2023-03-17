import { useRouter } from "next/router";
import Button from "./Button";
import { useState, useEffect } from "react";
import ProductImageViewSlider from "./slickCarousel/ProductImageViewSlider";
import ProductsCardSlider from "./slickCarousel/ProductsCardSlider";
import { useRecoilState } from "recoil";
import { cartProductsIdState } from "@/lib/atom/cartProductsIdState";
import { handleAddToCart } from "@/lib/cart/cartFunctions";
import { calculateOfferPrice } from "@/lib/product/calculateOfferPrice";
import { isCarted } from "@/lib/cart/checkStatus";

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

  return (

    //style provides in /styles/product-view.css
    <div className="container">
      <div className="wrapper">
        {/* product image sliderrrrrrr */}
        <div className="image-slider-container">
          <div className="image-slider-wrapper">
            <ProductImageViewSlider product={currentProduct?.product} />
          </div>
        </div>

        {/* product details  */}
        <div className="details-container">
          {/* header  */}
          <div className="details-header">
            {/* left */}
            <div className="details-header-left ">
              <div className="details-header-left-top">
                <h2 className="name">{currentProduct?.product?.name}</h2>
                <h2 className="weight">
                  {currentProduct?.product?.weight &&
                    `- ${currentProduct?.product?.weight}`}
                </h2>
              </div>
              <h2 className="category">{currentProduct?.product?.category}</h2>
            </div>

            {/* right */}
            <div className="details-header-right">
              <h2 className="price">
                ${currentProduct?.price?.priceAfterDiscount}
              </h2>
              {currentProduct?.price?.discountPercentage > 0 && (
                <h2 className="regular-price">
                  <span className="line-through text-[#9C9C9C]">
                    ${currentProduct?.price?.regularPrice}
                  </span>
                  <span className="text-[#9C9C9C]">
                    - {currentProduct?.price?.discountPercentage}%
                  </span>
                </h2>
              )}
            </div>
          </div>

          {/* description */}
          <div className="description-container">
            {/* //header */}
            <h1 className="description-header">description</h1>
            <p className="description-text">
              {currentProduct?.product?.description}
            </p>
          </div>

          {/*  action buttons */}
          <div className="action-btn-container">
            <Button
              text={"order now"}
              textColor={"text-gray-900"}
              bgColor={"bg-[#D9D9D9]"}
              textSize={"text-[16px]"}
              px={"px-12"}
            />
            <Button
              text={
                isCarted(currentProduct?.product?._id, cartProductsId)
                  ? "in cart"
                  : "add to cart"
              }
              textColor={"text-white"}
              bgColor={"bg-[#227C70]"}
              textSize={"text-[16px]"}
              px={"px-12"}
              handleClick={() =>
                handleAddToCart(currentProduct?.product?._id, setCartProductsId)
              }
            />
          </div>

          {/* productSlider  */}
          <div className="w-[100%] mt-24">
            <h2 className="capitalize py-2 text-gray-500">you might like also</h2>
            <div className="w-[95%] m-auto">
              <ProductsCardSlider products={products} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;

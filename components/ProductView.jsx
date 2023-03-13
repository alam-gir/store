import { useRouter } from "next/router";
import React from "react";
import Button from "./Button";
import { useState, useEffect } from "react";
import ProductImageViewSlider from "./slickCarousel/ProductImageViewSlider";
import ProductsCardSlider from "./slickCarousel/ProductsCardSlider";
import { useRecoilValue } from "recoil";
import { cartState } from "@/utils/atom/cartState";

const ProductView = ({
  allProducts,
  price: { offer, offerPrice, regularPrice },
  handleAddToCart,
}) => {
  const [currentProduct, setCurrentProduct] = useState(null);
  const router = useRouter();
  const queryProductId = router.query.productId;
  const queryProduct = allProducts.filter(
    (product) => product._id === queryProductId
  );
  const cart = useRecoilValue(cartState)

  useEffect(() => {
    // whenever change queryProduct set query product to current product 
    setCurrentProduct(queryProduct[0])
  }, [queryProduct])
  
  const cartBtnText = (id) => {
    const cartProductsIds = cart?.products?.map(product => product._id)
    if(cartProductsIds?.includes(id)) return 'product added in cart'

    // initially 
    return "add to cart"
  }

  return (
    <div className="relative w-full">
      <div className="md:flex w-full md:w-[80%] md:m-auto">
        {/* product image sliderrrrrrr */}
        <div className="sticky md:top-8 top-0 left-0 md:block md:w-[35%] md:max-h-[calc(100vh-4rem)] mad:mx-4 md:mt-8 px-4 py-6 md:rounded-lg md:shadow-[0_-2px_10px_rgba(0,0,0,0.15)] backdrop-blur-2xl bg-gradient-to-b from-gray-200">
          <div className="w-full h-full">
            <ProductImageViewSlider product={currentProduct}/>
          </div>
        </div>

        {/* product details  */}
        <div className=" z-30 mx-4 mt-8 px-4 py-6 md:w-[65%] rounded-lg shadow-[0_-2px_10px_rgba(0,0,0,0.15)] backdrop-blur-2xl">
          {/* header  */}
          <div className=" grid grid-cols-4 items-center">
            {/* left */}
            <div className=" col-span-3 flex flex-col">
              <div className="flex gap-1 items-center">
                <h2 className="text-gray-700 capitalize tracking-wide text-[18px] md:text-[22px] font-bold">
                  {currentProduct?.name}
                </h2>
                <h2 className="text-gray-400 text-[18px] md:text-[22px] ">
                  {currentProduct?.weight && `- ${currentProduct?.weight}`}
                </h2>
              </div>
              <h2 className="text-[14px] md:text-[16px] text-[#67771E] tracking-wide font-bold capitalize">
                {currentProduct?.category}
              </h2>
            </div>

            {/* right */}
            <div className={`col-span-1 text-end flex flex-col`}>
              <h2 className="text-[#227C70] text-[18px] md:text-[22px] text-xl font-bold">
                ${offerPrice}
              </h2>
              {offer > 0 && (
                <h2 className="text-[12px]">
                  <span className="line-through text-[#9C9C9C]">
                    ${regularPrice}
                  </span>{" "}
                  <span className="text-[#9C9C9C]">
                    - {currentProduct?.discountPercentage}%
                  </span>
                </h2>
              )}
            </div>
          </div>

          {/* description */}
          <div className="mt-6">
            {/* //header */}
            <h1 className=" capitalize font-bold text-gray-600  tracking-wide text-[18px] md:text-[22px]">
              description
            </h1>
            <p className="text-[14px] md:text-[18px] text-gray-700 tracking-wide text-justify py-2">
              {currentProduct?.description}
            </p>
          </div>

          {/*  action buttons */}
          <div className="flex justify-end md:justify-start gap-4 mt-8">
            <Button
              text={"order now"}
              textColor={"text-gray-900"}
              bgColor={"bg-[#D9D9D9]"}
              textSize={"text-[16px]"}
              px={"px-12"}
            />
            <Button
              text={cartBtnText(currentProduct?._id)}
              textColor={"text-white"}
              bgColor={"bg-[#227C70]"}
              textSize={"text-[16px]"}
              px={"px-12"}
              handleClick={() => handleAddToCart(currentProduct?._id)}
            />
          </div>

          {/* productSlider  */}
          <div className="w-[100%] mt-24">
            <div className="w-[95%] m-auto">
              <ProductsCardSlider products={allProducts} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;

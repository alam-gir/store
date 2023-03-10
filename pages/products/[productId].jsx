import Button from "@/components/Button";
import ProductSlider from "@/components/ProductSlider";
import ProductSliderThumb from "@/components/ProductSliderThumb";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

const View = () => {
  const [product, setProduct] = useState();
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  const id = router.query.productId;
  //fetch signle product
  const fetchProduct = async (id) => {
    //start loading
    setLoading(true);

    const res = await fetch(`/api/db/products/${id}`);
    const data = await res.json();
    setProduct(data.product);
    if (!data.success) {
      router.push("/products/404/404");
    }

    //stop loading
    setLoading(false);
  };

  useEffect(() => {
    // return if id not available
    if (!id) return;
    //fetch
    fetchProduct(id);
  }, [router]);

  // price calculations
  const regularPrice = product?.price;
  const offerPrice = (product?.price / 100) * product?.discountPercentage;

  console.log({ regularPrice, offerPrice });
  return (
    <div className="relative">
      <div className="md:flex">
        {/* sliderrrrrrr small device*/}
        <div className="sticky top-8 left-0 md:block md:max-w-[35%] md:max-h-[calc(100vh-4rem)] mx-4 mt-8 px-4 py-6 md:rounded-lg md:shadow-[0_-2px_10px_rgba(0,0,0,0.15)] backdrop-blur-2xl">
          <div className="">
            <ProductSlider product={product} />
          </div>
        </div>
        
        {/* sliderrrrrrr large device*/}
        {/* <div className="hidden md:block md:max-w-[35%] z-30 mx-4 mt-8 px-4 py-6 rounded-lg shadow-[0_-2px_10px_rgba(0,0,0,0.15)] backdrop-blur-2xl">
          <div className="max-w-[100%]">
            <ProductSliderThumb />
          </div>
        </div> */}

        {/* prduct details  */}
        <div className=" z-30 mx-4 mt-8 px-4 py-6 md:max-w-[65%] rounded-lg shadow-[0_-2px_10px_rgba(0,0,0,0.15)] backdrop-blur-2xl">
          <div className=" grid grid-cols-4 items-center">

            {/* left */}
            <div className=" col-span-3">
              <div className="flex gap-1 items-center leading-7">
                <h1 className="text-gray-700 capitalize tracking-wide text-[18px] font-bold">
                  {product?.name}
                </h1>
                <span className="text-gray-400">-</span>
                <h1 className="text-gray-400">{product?.weight}</h1>
              </div>
              <h1 className="text-[12px] text-[#67771E] tracking-wide font-bold capitalize">
                {product?.category}
              </h1>
            </div>

            {/* right */}
            <div className={`col-span-1 leading-5 text-end`}>
              <h1 className="text-[#227C70] text-xl font-bold">
                ${regularPrice - offerPrice}
              </h1>
              {offerPrice > 0 && (
                <h2 className="text-[12px]">
                  <span className="line-through text-[#9C9C9C]">
                    ${regularPrice}
                  </span>{" "}
                  <span className="text-[#9C9C9C]">
                    - {product?.discountPercentage}%
                  </span>
                </h2>
              )}
            </div>
          </div>

          {/* description */}
          <div className="mt-6">
            {/* //header */}
            <h1 className=" capitalize font-bold text-gray-600  tracking-wide text-[18px]">
              description
            </h1>
            <p className="text-[14px] text-gray-500 tracking-wide text-justify py-1">
              {product?.description}
            </p>
          </div>

          {/* buttons action  */}
          <div className="flex justify-between md:justify-start md:gap-4 mt-8">
            <Button
              text={"Add To Cart"}
              textColor={"text-gray-900"}
              bgColor={"bg-[#D9D9D9]"}
              textSize={"text-[16px]"}
              px={"px-12"}
            />
            <Button
              text={"Add To Cart"}
              textColor={"text-white"}
              bgColor={"bg-[#227C70]"}
              textSize={"text-[16px]"}
              px={"px-11"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;

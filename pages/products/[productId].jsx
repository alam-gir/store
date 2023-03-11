import Button from "@/components/Button";
import LoaderSVG from "@/components/LoaderSVG";
import ProductsCardSlider from "@/components/slickCarousel/ProductsCardSlider";
import ProductSlider from "@/components/ProductSlider";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

const View = ({product}) => {
  // const [product, setProduct] = useState();
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

  // useEffect(() => {
  //   // return if id not available
  //   if (!id) return;
  //   //fetch
  //   fetchProduct(id);
  // }, [router]);

  // price calculations
  const regularPrice = product?.price;
  const offerPrice = (product?.price / 100) * product?.discountPercentage;

  return (
    <div className="relative w-full">
      <div className="md:flex w-full md:w-[80%] md:m-auto">
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
        {isLoading ? (
          <div className="flex justify-center items-center">
            <LoaderSVG color={"fill-gray-700"} />
          </div>
        ) : (
          <div className=" z-30 mx-4 mt-8 px-4 py-6 md:w-[100%] rounded-lg shadow-[0_-2px_10px_rgba(0,0,0,0.15)] backdrop-blur-2xl">
            {/* Header  */}
            <div className=" grid grid-cols-4 items-center">
              {/* left */}
              <div className=" col-span-3">
                <div className="flex gap-1 items-center leading-3">
                  <h1 className="text-gray-700 capitalize tracking-wide text-[18px] md:text-[22px] font-bold">
                    {product?.name}
                  </h1>
                  <h1 className="text-gray-400 text-[18px] md:text-[22px] ">
                    {" "}
                    {product?.weight && `- ${product?.weight}`}
                  </h1>
                </div>
                <h1 className="text-[12px] md:text-[16px] text-[#67771E] tracking-wide font-bold capitalize leading-3">
                  {product?.category}
                </h1>
              </div>

              {/* right */}
              <div className={`col-span-1 leading-5 text-end`}>
                <h1 className="text-[#227C70] text-[18px] md:text-[22px] text-xl font-bold">
                  ${regularPrice - offerPrice}
                </h1>
                {offerPrice > 0 && (
                  <h2 className="text-[12px] leading-4">
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
              <h1 className=" capitalize font-bold text-gray-600  tracking-wide text-[18px] md:text-[22px]">
                description
              </h1>
              <p className="text-[14px] md:text-[18px] text-gray-500 tracking-wide text-justify py-2">
                {product?.description}
              </p>
            </div>

            {/* buttons action  */}
            <div className="flex justify-end md:justify-start gap-4 mt-8">
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
                px={"px-12"}
              />
            </div>
            <div>
              <ProductsCardSlider />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default View;


export const getServerSideProps = async (context) => {
  const productId = context.query.productId
  const res = await fetch(`http://localhost:3000/api/db/products/${productId}`)
  const data = await res.json()

  return {
    props: {
      product: data.product
    }
  }
}
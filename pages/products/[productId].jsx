import Button from "@/components/Button";
import ProductsCardSlider from "@/components/slickCarousel/ProductsCardSlider";
import ProductImageSlider from "@/components/ProductImageSlider";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { addToLocalstorage } from "@/utils/addToLocalstorage";
import { cartProductsIdState } from "@/utils/atom/cartProductsIdState";

const View = ({ singleProduct, allProducts }) => {
  const [cartProductsId, setCartProductsId] =
    useRecoilState(cartProductsIdState);

  // add to cart
  const handleAddToCart = (id) => {
    //set item id to state
    setCartProductsId((prev) => {
      // take an temporary container
      const temp = [...prev];

      // if no prouducts in cart
      if (temp.length < 0) {
        temp.push({ id, quantity: 1 });
        return temp;
      }

      // else
      const isCarted = temp.some((product) => product.id === id);
      if (!isCarted) {
        temp.push({ id, quantity: 1 });
      }
      return temp;
    });
  };

  // get cart items from local storage if previously had
  useEffect(() => {
    const data =
      JSON.parse(localStorage.getItem("ramzansStoreCartProductsId")) || [];
    if (data.length > 0) {
      setCartProductsId(data);
    }
  }, []);

  // set car to local storage
  useEffect(() => {
    addToLocalstorage("ramzansStoreCartProductsId", cartProductsId);
  }, [cartProductsId]);

  console.log("productIds", cartProductsId);
  // price calculations
  const regularPrice = singleProduct.price;
  const offer = (singleProduct.price / 100) * singleProduct.discountPercentage;
  const offerPrice = regularPrice - offer;

  return (
    <div className="relative w-full">
      <div className="md:flex w-full md:w-[80%] md:m-auto">
        {/* sliderrrrrrr small device*/}
        <div className="sticky top-8 left-0 md:block md:w-[35%] md:max-h-[calc(100vh-4rem)] mx-4 mt-8 px-4 py-6 md:rounded-lg md:shadow-[0_-2px_10px_rgba(0,0,0,0.15)] backdrop-blur-2xl">
          <div className="">
            <ProductImageSlider product={singleProduct} />
          </div>
        </div>

        {/* prduct details  */}
        <div className=" z-30 mx-4 mt-8 px-4 py-6 md:w-[65%] rounded-lg shadow-[0_-2px_10px_rgba(0,0,0,0.15)] backdrop-blur-2xl">
          {/* Header  */}
          <div className=" grid grid-cols-4 items-center">
            {/* left */}
            <div className=" col-span-3 flex flex-col">
              <div className="flex gap-1 items-center">
                <h2 className="text-gray-700 capitalize tracking-wide text-[18px] md:text-[22px] font-bold">
                  {singleProduct.name}
                </h2>
                <h2 className="text-gray-400 text-[18px] md:text-[22px] ">
                  {singleProduct.weight && `- ${singleProduct.weight}`}
                </h2>
              </div>
              <h2 className="text-[14px] md:text-[16px] text-[#67771E] tracking-wide font-bold capitalize">
                {singleProduct.category}
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
                    - {singleProduct.discountPercentage}%
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
              {singleProduct.description}
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
              handleClick={() => handleAddToCart(singleProduct._id)}
            />
          </div>
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

export default View;

export const getServerSideProps = async (context) => {
  const productId = context.query.productId;

  const [singleProduct, allProducts] = await Promise.all([
    fetch(`http://localhost:3000/api/db/products/${productId}`).then((res) =>
      res.json()
    ),
    fetch("http://localhost:3000/api/db/products").then((res) => res.json()),
  ]);
  return {
    props: {
      singleProduct: singleProduct.product,
      allProducts: allProducts.products,
    },
  };
};

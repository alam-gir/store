import { calculateOfferPrice } from "@/lib/product/calculateOfferPrice";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const ProductCard = ({
  product: { _id, images, name, weight, price, discountPercentage },
  bgColor,
  imgHeight,
  nameTextSize,
  priceTextSize,
}) => {
  const [productPrice, setProductPrice] = useState(null)
  
  useEffect(()=>{
    setProductPrice(calculateOfferPrice(price,discountPercentage))
  },[_id])
  //bg color
  const productDefaultImg =
    "https://i.ibb.co/P9fVhj6/pngfind-com-lemon-tea-png-6661129.png";

  const productCardBg = bgColor ? bgColor : "bg-white";

  return (
    <Link href={`/products/${_id}`}>
      <div className={`productCardBg ${productCardBg}`}>
        <div className={`img-wrapper`}>
          <img
            src={images?.length > 0 ? images[0] : productDefaultImg}
            alt="productImg"
            loading="lazy"
            className={`product-img ${imgHeight}`}
          />
        </div>
        <div className="product-details">
          <h3 className={`product-name`}>
            {name.slice(0, 10)}
            {weight && <span className="text-sm"> - {weight}</span>}
          </h3>
          <span className="flex items-center gap-1">
            <strong className={`product-price`}>${productPrice?.priceAfterDiscount}</strong>
            <spnan className=" text-gray-400 text-sm"> - <span className="line-through">${productPrice?.regularPrice}</span></spnan>
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

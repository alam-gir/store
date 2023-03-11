import Link from "next/link";
import React from "react";
export default function ProductCard({product:{_id, images, name, weight, price}, bgColor, imgHeight, nameTextSize,priceTextSize}) {
  const productDefaultImg = 
    "https://i.ibb.co/P9fVhj6/pngfind-com-lemon-tea-png-6661129.png";

  return (
    <Link href={`/products/${_id}`}>
      <div className={`product-card ${bgColor}`}>
        <div className={`img-wrapper h-[8rem] w-auto object-contain`}>
          <img
            src={images.length > 0 ? images[0] : productDefaultImg}
            alt="productImg"
            loading="lazy"
            className={`product-img h-full ${imgHeight}`}
          />
        </div>
        <div className="product-details">
          <h3 className={`product-name ${nameTextSize}`}>
            {name.slice(0,10)}
            {weight && <span className="text-sm"> - {weight}</span>}
          </h3>
          <strong className={`product-price ${priceTextSize} text-sm text-gray-600`}>
            ${price}
          </strong>
        </div>
      </div>
    </Link>
  );
}

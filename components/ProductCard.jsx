import Link from "next/link";
import React from "react";
export default function ProductCard({product:{_id, images, name, weight, price}, bgColor, imgHeight, nameTextSize,priceTextSize}) {
  const productDefaultImg = 
    "https://i.ibb.co/P9fVhj6/pngfind-com-lemon-tea-png-6661129.png";

  return (
    <Link href={`/products/${_id}`}>
      <div className={`product ${bgColor}`}>
        <div className={`img-wrapper`}>
          <img
            src={images.length ? images[0] : productDefaultImg}
            alt="productImg"
            loading="lazy"
            className={`product-img ${imgHeight}`}
          />
        </div>
        <div className="product-details">
          <h3 className={`product-name ${nameTextSize}`}>
            {name}
            {weight && <span> - {weight}</span>}
          </h3>
          <strong className={`product-price ${priceTextSize}`}>
            ${price}
          </strong>
        </div>
      </div>
    </Link>
  );
}

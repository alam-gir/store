import Link from "next/link";
import React from "react";

export default function ProductCard({
  product: {_id, images, name, weight, price},
  bgColor,
  imgHeight,
  nameTextSize,
  priceTextSize,
}) {
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
          <strong className={`product-price`}>${price}</strong>
        </div>
      </div>
    </Link>
  );
}

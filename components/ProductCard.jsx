import Link from "next/link";
import React from "react";

export default function ProductCard({
  product: {_id, images, name, weight, price},
  bgColor,
  defaultImgHeight,
  desktopImgHeight,
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
            className={`product-img ${defaultImgHeight}`}
          />
        </div>
        <div className="product-details">
          <h3 className={`product-name`}>
            {name.slice(0, 10)}
            {weight && <span className="text-sm"> - {weight}</span>}
          </h3>
          <div className={`product-price`}>
            ${price}{" "}
            <span className="text-zinc-500 text-base font-normal">
              <span className="line-through">$100 </span>(5%)
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

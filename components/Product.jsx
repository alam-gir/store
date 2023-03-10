import Link from "next/link";
import React from "react";

export default function Product(props) {
  const productDefaultImg =
    "https://i.ibb.co/P9fVhj6/pngfind-com-lemon-tea-png-6661129.png";

  return (
    <Link href={`/products/${props.productId}`}>
      <div className={`product ${props.bgColor}`}>
        <div className={`img-wrapper`}>
          <img
            src={props.productImg ? props.productImg : productDefaultImg}
            alt="productImg"
            loading="lazy"
            className={`product-img ${props.imgHeight}`}
          />
        </div>
        <div className="product-details">
          <h3 className={`product-name ${props.nameTextSize}`}>
            {props.productName}{" "}
            {props.productWeight && <span> - {props.productWeight}</span>}
          </h3>
          <strong className={`product-price ${props.priceTextSize}`}>
            ${props.productPrice}
          </strong>
        </div>
      </div>
    </Link>
  );
}

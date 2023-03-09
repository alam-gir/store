import React from "react";

export default function Product(props) {
  return (
    <>
      <div className={`product ${props.bgColor}`}>
        <div className={`img-wrapper ${props.imgHeight}`}>
          <img
            src="https://i.ibb.co/P9fVhj6/pngfind-com-lemon-tea-png-6661129.png"
            alt="productImg"
            className={`product-img ${props.imgHeight}`}
          />
        </div>
        <div className="product-details">
          <h3 className={`product-name ${props.nameTextSize}`}>
            Green Tea <span> - 20g</span>
          </h3>
          <strong className={`product-price ${props.priceTextSize}`}>
            $40.00
          </strong>
        </div>
      </div>
    </>
  );
}

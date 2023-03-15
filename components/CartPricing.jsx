import React from "react";

const CartPricing = ({cart: {priceDetails}}) => {
  return (
    <div className="bg-white my-4 rounded-lg px-4 py-4 drop-shadow">
      <div className="capitalize flex flex-col gap-4">
        {/* Title Text */}
        <h2 className="font-semibold text-black">price details</h2>

        {/* Pricing List */}
        <ul className="totalPricingList">
          <li>
            <span>total amount</span>
            <span className="text-right">
              ${priceDetails?.totalAmount?.toFixed(2)}
            </span>
          </li>
          <li>
            <span>bag discount</span>
            <span className="text-right">
              ${priceDetails?.bagDiscount?.toFixed(2)}
            </span>
          </li>
          <li>
            <span>estimated tax</span>{" "}
            <span className="text-right">
              ${priceDetails?.estimatedTax?.toFixed(2)}
            </span>
          </li>
          <li>
            <span>delivery charge</span>{" "}
            <span className="text-right">
              ${priceDetails?.deliveryCharge?.toFixed(2)}
            </span>
          </li>
          <li className="subTotalAmount">
            <h3>sub total</h3>
            <h3 className="text-red-500">
              ${priceDetails?.subTotal?.toFixed(2)}
            </h3>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CartPricing;

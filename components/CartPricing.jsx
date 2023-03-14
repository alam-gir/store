import Link from "next/link";
import React from "react";

const CartPricing = ({ cart: { priceDetails } }) => {
  return (
    <div className="">
      <div className="capitalize flex flex-col gap-4">
        <div>
          <h2 className="font-semibold text-gray-700">price details</h2>
        </div>
        <div className="">
          <div className="grid grid-cols-2">
            <span>total amount</span>{" "}
            <span className="text-right">
              ${priceDetails?.totalAmount?.toFixed(2)}
            </span>
          </div>
          <div className="grid grid-cols-2">
            <span>bag discount</span>{" "}
            <span className="text-right">
              ${priceDetails?.bagDiscount?.toFixed(2)}
            </span>
          </div>
          <div className="grid grid-cols-2">
            <span>estimated tax</span>{" "}
            <span className="text-right">
              ${priceDetails?.estimatedTax?.toFixed(2)}
            </span>
          </div>
          <div className="grid grid-cols-2">
            <span>delivery charge</span>{" "}
            <span className="text-right">
              ${priceDetails?.deliveryCharge?.toFixed(2)}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2">
          <h3>sub total</h3>
          <h3 className="text-right text-[#FF4C4C]">
            ${priceDetails?.subTotal?.toFixed(2)}
          </h3>
        </div>
        <div className="">
          <Link href="/placeorder">
            <button className="text-center w-full bg-[#FF4C4C] text-white capitalize font-semibold py-1 tracking-wide hover:brightness-90 rounded">
              order now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPricing;

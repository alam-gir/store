import { toggleCartState } from "@/utils/atom/cartRecoil";
import React from "react";
import { useRecoilState } from "recoil";
import { XCircleIcon } from "@heroicons/react/24/outline";
import CartItem from "./CartItem";
import CartPricing from "./CartPricing";

const CartModal = () => {
  const [isOpenCart, setOpenCart] = useRecoilState(toggleCartState);
  const stopP = (event) => event.stopPropagation();
  const handleExit = (e) => {
    stopP(e);
    setOpenCart(!isOpenCart);
  };
  return (
    <>
      {isOpenCart && (
        // <div onClick={e => handleExit(e)} className="cart-modal-container">
        <div onClick={(e) => stopP(e)} className="cart-modal-wrapper h-screen">
          <div className="h-full">
            {/* header  */}
            <div className="flex justify-between h-12 items-center px-4 sm:p-2 shadow-[0_-2px_10px_rgba(0,0,0,0.20)]">
              <h2 className="font-semibold text-gray-1700 capitalize">cart</h2>
              <XCircleIcon
                onClick={handleExit}
                className="h-7 text-gray-700 hover:text-[#e50914]"
              />
            </div>

            {/* body  */}
            <div className="flex flex-col justify-between space-y-2 h-[calc(100vh-3rem)] p-4 sm:p-2">
              {/* cart items  */}
              <div className="max-h-full overflow-y-scroll px-2 py-4 flex flex-col gap-6 customScrollbar">
                <div className="h-20">
                  <CartItem />
                </div>
                <div className="h-20">
                  <CartItem />
                </div>
                <div className="h-20">
                  <CartItem />
                </div>
                <div className="h-20">
                  <CartItem />
                </div>
                <div className="h-20">
                  <CartItem />
                </div>
                <div className="h-20">
                  <CartItem />
                </div>
                <div className="h-20">
                  <CartItem />
                </div>
              </div>

              {/* pricing section  */}
              <div className="h-fit rounded-md shadow-[0_-2px_10px_rgba(0,0,0,0.1)] px-2 py-4">
                <CartPricing /> 
              </div>
            </div>
          </div>
        </div>
        // </div>
      )}
    </>
  );
};

export default CartModal;

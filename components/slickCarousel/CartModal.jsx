import { toggleCartState } from "@/utils/atom/cartRecoil";
import React from "react";
import { useRecoilState } from "recoil";
import {XCircleIcon} from '@heroicons/react/24/outline'

const CartModal = () => {
  const [isOpenCart, setOpenCart] = useRecoilState(toggleCartState);

  const handleExit = () => setOpenCart(!isOpenCart)
  return (
    <>
      {isOpenCart && (
        <div className="cart-modal-container">
          <div>
            <div className="flex justify-end p-2"><XCircleIcon onClick={handleExit} className="h-7 hover:brightness-75"/></div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartModal;

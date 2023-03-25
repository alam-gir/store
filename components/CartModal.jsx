import { toggleCartState } from "@/lib/atom/cartRecoil";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { XMarkIcon } from "@heroicons/react/24/outline";
import CartItem from "./CartItem";
import { cartChangesState, cartState } from "@/lib/atom/cartState";
import {
  fetchCartProducts,
} from "@/lib/cart/cartFunctions";
import Link from "next/link";
import LoaderSVG from "./LoaderSVG";

export default function CartModal() {
  const [isOpenCart, setOpenCart] = useRecoilState(toggleCartState);
  const cartChanges = useRecoilValue(cartChangesState);

  const [cart, setCart] = useRecoilState(cartState);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    fetchCartProducts(setCart, setLoading);
  }, [cartChanges]);

  const handleClose = () => {
    setOpenCart(!isOpenCart);
  };

  const closeCart = () => setOpenCart(false);

  return (
    <>
      {isOpenCart && (
        <>
          <div className="cartModalOverlay" onClick={handleClose}></div>
          <div className="cartModal">
            {/* header  */}
            <header className="cartModalHeader">
              <div className="wrapper">
                <h2 className="font-semibold text-black capitalize">My Cart</h2>
                <XMarkIcon onClick={handleClose} className="modalCloseBtn" />
              </div>
            </header>
            {/* body  */}
            {/* isLoading ? "loading" : isCartItems ? cartitems : 'noitems' */}
            {isLoading ? (
              <div className="h-full w-full flex justify-center items-center">
                <LoaderSVG color={"fill-gray-400"} />
              </div>
            ) : cart?.products?.length > 0 ? (
              <>
                {/* Product Items  */}
                <div className="cartItemContainer customScrollbar px-4 my-4">
                  {cart?.products?.map((product) => (
                    <div key={product._id}>
                      <CartItem
                        product={product}
                        handleCloseCart={closeCart}
                      />
                    </div>
                  ))}
                </div>

                {/* Check Out Button  */}
                <div className="checkOutBtnSection">
                  <div className="wrapper">
                    <div className="checkOutWrapper">
                      <ul className="w-3/5">
                        <li>
                          <span>Total: </span>
                          <span className="text-red-600 font-semibold">
                            ${cart.priceDetails.totalAmount}
                          </span>
                        </li>
                        <li>
                          <span>Delivery: </span>
                          <span className="text-red-600 font-semibold">
                            ${cart.priceDetails.deliveryCharge}
                          </span>
                        </li>
                      </ul>
                      <Link href="/placeorder" className="w-2/5">
                        <button onClick={closeCart} className="checkOutBtn">
                          Check Out
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <h2 className="capitalize text-gray-700 text-center mt-[50%]">
                no products in cart!
              </h2>
            )}
          </div>
        </>
      )}
    </>
  );
}

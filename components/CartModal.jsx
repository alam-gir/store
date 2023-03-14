import { toggleCartState } from "@/utils/atom/cartRecoil";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { XCircleIcon } from "@heroicons/react/24/outline";
import CartItem from "./CartItem";
import CartPricing from "./CartPricing";
import { cartProductsIdState } from "@/utils/atom/cartProductsIdState";
import { cartState } from "@/utils/atom/cartState";
import {
  handleDecrease,
  handleDelete,
  handleIncrease,
} from "@/utils/cart/cartFunctions";
import Link from "next/link";

const CartModal = () => {
  const [isOpenCart, setOpenCart] = useRecoilState(toggleCartState);
  const [cartProductsId, setCartProductsId] =
    useRecoilState(cartProductsIdState);
  const [cart, setCart] = useRecoilState(cartState);

  //fetch documents by id
  const fetchProducts = async (cartProductsDetails) => {
    const res = await fetch("/api/db/products/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(cartProductsDetails),
    });
    const data = await res.json();
    if (data.success) {
      setCart(data.cart);
    }
    if (!data.success) {
      setCart([]);
    }
  };

  useEffect(() => {
    fetchProducts(cartProductsId);
  }, [cartProductsId]);

  const handleClose = () => {
    setOpenCart(!isOpenCart);
  };

  return (
    <>
      {isOpenCart && (
        <div className="cart-modal-wrapper h-screen">
          <div className="h-full min-w-[22rem]">
            {/* header  */}
            <div className="flex justify-between h-12 items-center px-4 sm:p-2 shadow-[0_-2px_10px_rgba(0,0,0,0.20)]">
              <h2 className="font-semibold text-gray-1700 capitalize">cart</h2>
              <XCircleIcon
                onClick={handleClose}
                className="h-7 text-gray-700 hover:text-[#e50914]"
              />
            </div>

            {/* body  */}
            {cart?.products?.length > 0 ? (
              <div className="flex flex-col justify-between space-y-2 h-[calc(100vh-3rem)] p-4 sm:p-2">
                {/* cart items  */}
                <div className="max-h-full overflow-y-scroll px-2 py-4 flex flex-col gap-6 customScrollbar">
                  {cart?.products?.map((product) => (
                    <div className="h-20" key={product._id}>
                      <CartItem
                        product={product}
                        handleIncrease={() =>
                          handleIncrease(product, setCartProductsId)
                        }
                        handleDecrease={() =>
                          handleDecrease(product, setCartProductsId)
                        }
                        handleDelete={() =>
                          handleDelete(product, setCartProductsId)
                        }
                      />
                    </div>
                  ))}
                </div>

                {/* pricing section  */}
                <div className="h-fit rounded-md shadow-[0_-2px_10px_rgba(0,0,0,0.1)] px-2 py-4">
                  <CartPricing cart={cart} />
                  <div className="">
              <Link href="/placeorder">
                <button className="text-center w-full bg-[#FF4C4C] text-white capitalize font-semibold py-1 tracking-wide hover:brightness-90 rounded">
                  order now
                </button>
              </Link>
            </div>
                </div>
              </div>
            ) : (
              <h2 className="capitalize text-gray-700 text-center mt-[50%]">
                no products in cart!
              </h2>
            )}
            
          </div>
        </div>
      )}
    </>
  );
};

export default CartModal;

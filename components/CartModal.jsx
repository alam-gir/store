import { toggleCartState } from "@/lib/atom/cartRecoil";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { XMarkIcon } from "@heroicons/react/24/outline";
import CartItem from "./CartItem";
import CartPricing from "./CartPricing";
import { cartProductsIdState } from "@/lib/atom/cartProductsIdState";
import { cartState } from "@/lib/atom/cartState";
import {
  handleDecrease,
  handleDelete,
  handleIncrease,
} from "@/lib/cart/cartFunctions";
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
        <div className="cartModal">
          <div className="cartModalWrapper">
            <div className="wrapper">
              {/* header  */}
              <header className="cartModalHeader">
                <div className="wrapper">
                  <h2 className="font-semibold text-gray-1700 capitalize">
                    My Cart
                  </h2>
                  <XMarkIcon onClick={handleClose} className="modalCloseBtn" />
                </div>
              </header>
              {/* body  */}
              {cart?.products?.length > 0 ? (
                <div className="cartInnerWrapper">
                  {/* Product Items  */}
                  <div className="cartItemContainer">
                    {cart?.products?.map((product) => (
                      <div key={product._id}>
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

                  {/* Pricing Section  */}
                  <CartPricing cart={cart} isSubTotalAmount />
                  <div className="">
                    <Link href="/placeorder">
                      <button className="checkOutBtn">Check Out</button>
                    </Link>
                  </div>
                </div>
              ) : (
                <h2 className="capitalize text-gray-700 text-center mt-[50%]">
                  no products in cart!
                </h2>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartModal;

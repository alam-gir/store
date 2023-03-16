import {toggleCartState} from "@/lib/atom/cartRecoil";
import {useEffect} from "react";
import {useRecoilState} from "recoil";
import {XMarkIcon} from "@heroicons/react/24/outline";
import CartItem from "./CartItem";
import CartPricing from "./CartPricing";
import {cartProductsIdState} from "@/lib/atom/cartProductsIdState";
import {cartState} from "@/lib/atom/cartState";
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

  console.log(cart);

  return (
    <>
      {isOpenCart && (
        <>
          <div className="cartModalOverlay" onClick={handleClose}></div>
          <div className="cartModal customScrollbar">
            {/* header  */}
            <header className="cartModalHeader">
              <div className="wrapper">
                <h2 className="font-semibold text-black capitalize">My Cart</h2>
                <XMarkIcon onClick={handleClose} className="modalCloseBtn" />
              </div>
            </header>
            {/* body  */}
            {cart?.products?.length > 0 ? (
              <>
                <div className="wrapper">
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
                </div>

                {/* Check Out Button  */}
                <div className="checkOutSection">
                  <div className="wrapper">
                    <div className="checkOutWrapper">
                      <ul className="w-3/5">
                        <li>
                          <span>Total: </span>
                          <span className="text-red-500 font-semibold">
                            ${cart.priceDetails.totalAmount}
                          </span>
                        </li>
                        <li>
                          <span>Delivery: </span>
                          <span className="text-red-500 font-semibold">
                            ${cart.priceDetails.deliveryCharge}
                          </span>
                        </li>
                      </ul>
                      <Link href="/placeorder" className="w-2/5">
                        <button className="checkOutBtn">Check Out</button>
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
};

export default CartModal;

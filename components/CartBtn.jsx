import {useEffect} from "react";
import {toggleCartState} from "@/lib/atom/cartRecoil";
import {cartState} from "@/lib/atom/cartState";
import {ShoppingBagIcon} from "@heroicons/react/24/solid";
import {useRecoilState} from "recoil";
import {cartProductsIdState} from "@/lib/atom/cartProductsIdState";

const CartBtn = () => {
  const [isOpenCart, setOpenCart] = useRecoilState(toggleCartState);
  const [cart, setCart] = useRecoilState(cartState);
  const openCart = () => setOpenCart(!isOpenCart);
  const [cartProductsId, setCartProductsId] =
    useRecoilState(cartProductsIdState);

  // get cart items from local storage if previously had
  useEffect(() => {
    const data =
      JSON.parse(localStorage.getItem("ramzansStoreCartProductsId")) || [];
    if (data.length > 0) {
      setCartProductsId(data);
    }
  }, []);

  return (
    <>
      <div className="relative">
        <button onClick={openCart}>
          <ShoppingBagIcon className="h-8 w-8 bg-[#227C70] rounded-md p-1 text-white hover:brightness-75" />
        </button>
        {cart?.products?.length > 0 && (
          <span className="absolute z-10 bg-[#e50914] shadow-[0_-2px_10px_rgba(0,0,0,0.15)] translate-x-[-50%] translate-y-[-50%] h-6 w-6 rounded-full text-white text-center text-sm leading-6">
            {cart?.products?.length}
          </span>
        )}
      </div>
    </>
  );
};

export default CartBtn;

import { toggleCartState } from "@/utils/atom/cartRecoil";
import { cartState } from "@/utils/atom/cartState";
import { ShoppingBagIcon } from "@heroicons/react/24/solid";
import { useRecoilState, useRecoilValue } from "recoil";

const CartBtn = () => {
  const [isOpenCart, setOpenCart] = useRecoilState(toggleCartState);
  const cart = useRecoilValue(cartState);
  const handleClick = () => setOpenCart(!isOpenCart);
  return (
    <>
      <div className="relative">
        <button onClick={handleClick}>
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

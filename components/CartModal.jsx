import { toggleCartState } from "@/utils/atom/cartRecoil";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { XCircleIcon } from "@heroicons/react/24/outline";
import CartItem from "./CartItem";
import CartPricing from "./CartPricing";
import { cartProductsIdState } from "@/utils/atom/cartProductsIdState";
import { cartState } from "@/utils/atom/cartState";

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
    if(!data.success){
      console.log('cleared alhamdulillah')
      setCart([])
    }
  };

  useEffect(() => {
    fetchProducts(cartProductsId);
  }, [cartProductsId]);

  const handleClose = () => {
    setOpenCart(!isOpenCart);
  };

  const handleIncrease = (serverProduct) => {
    // update cartProductsId quantity
    setCartProductsId((prev) => {
      return prev.map((product) => {
        return {
          ...product,
          quantity:
            serverProduct._id === product.id &&
            product.quantity <= serverProduct.stock
              ? product.quantity + 1
              : product.quantity,
        };
      });
    });
  };
  const handleDecrease = (serverProduct) => {
    // update cartProductsId quantity
    setCartProductsId((prev) => {
      return prev.map((product) => {
        return {
          ...product,
          quantity:
            serverProduct._id === product.id && product.quantity > 1
              ? product.quantity - 1
              : product.quantity,
        };
      });
    });
  };

  const handleDelete = (serverProduct) => {
    // filter cart
    setCartProductsId(prev => {
      const temp = prev.filter(product => product.id !== serverProduct._id)
      return temp
    })
  }

  console.log({ cart });
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
            <div className="flex flex-col justify-between space-y-2 h-[calc(100vh-3rem)] p-4 sm:p-2">
              {/* cart items  */}
              <div className="max-h-full overflow-y-scroll px-2 py-4 flex flex-col gap-6 customScrollbar">
                {cart?.products?.map((product) => (
                  <div className="h-20" key={product._id}>
                    <CartItem
                      product={product}
                      handleIncrease={() => handleIncrease(product)}
                      handleDecrease={() => handleDecrease(product)}
                      handleDelete={() => handleDelete(product)}
                    />
                  </div>
                ))}
              </div>

              {/* pricing section  */}
              <div className="h-fit rounded-md shadow-[0_-2px_10px_rgba(0,0,0,0.1)] px-2 py-4">
                <CartPricing cart={cart}/>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartModal;

import { TrashIcon, PlusIcon, MinusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { calculateOfferPrice } from "@/lib/product/calculateOfferPrice";
import { handleAddToCart, removeFromCart } from "@/lib/cart/cartFunctions";
import { cartChangesState } from "@/lib/atom/cartState";

const CartItem = ({
  handleCloseCart,
  product: { _id, name, images, price, discountPercentage, weight, quantity },
}) => {
  const [cartChanges, setCartChanges] = useRecoilState(cartChangesState);
  const [productPrice, setProductPrice] = useState(null);

  // set cart to local storage whenver changes cartProductsId
  useEffect(() => {
    setProductPrice(calculateOfferPrice(price, discountPercentage));
  }, [cartChanges]);

  return (
    <div className="cartItem">
      {/* Product Image */}
      <Link href={`/products/${_id}`} className="cartItemImgContainer">
        <img src={images[0]} className="cartItemImg" />
      </Link>

      {/* Product Details */}
      <div className="cartItemDetails">
        <div className="flex flex-col gap-2 justify-center">
          <div className="cartItemNamePrice">
            <Link href={`/products/${_id}`}>
              <h2 onClick={handleCloseCart} className="cartItemName">
                {name.length > 18 ? name.slice(0, 18) + "..." : name}
                <span>{weight && ` (${weight})`}</span>
              </h2>
            </Link>
            <h1 className="cartItemPrice">
              ${productPrice?.regularPrice}
              <span>
                <strong>${productPrice?.priceAfterDiscount}</strong>
                {discountPercentage && ` ${discountPercentage}%`}
              </span>
            </h1>
          </div>
          <div className="cartItemQuantity">
            <span>Quantity</span>
            <div className="quantityController">
              <button
                onClick={() => {
                  handleAddToCart(_id, true);
                  setCartChanges((prev) => !prev);
                }}
                className="minusIconBtn"
              >
                <MinusIcon className="minusIcon" />
              </button>
              <span>{quantity}</span>
              <button
                onClick={() => {
                  handleAddToCart(_id);
                  setCartChanges((prev) => !prev);
                }}
                className="plusIconBtn"
              >
                <PlusIcon className="plusIcon" />
              </button>
            </div>
          </div>
        </div>

        {/* delete btn */}
        <div
          className="cartItemRemoveBtn"
          onClick={() => {
            removeFromCart(_id);
            setCartChanges(prev => !prev)
          }}
        >
          <TrashIcon className="trashIcon" />
        </div>
      </div>
    </div>
  );
};

export default CartItem;

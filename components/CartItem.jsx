import {TrashIcon, PlusIcon, MinusIcon} from "@heroicons/react/24/outline";
import Link from "next/link";

const CartItem = ({
  handleIncrease,
  handleDecrease,
  handleDelete,
  localCartProduct,
  product: {_id, name, images, price, discountPercentage, weight, quantity},
}) => {
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
              <h2 className="cartItemName">
                {name.length > 18 ? name.slice(0, 18) + "..." : name}
                <span>{weight && ` (${weight})`}</span>
              </h2>
            </Link>
            <h1 className="cartItemPrice">
              ${price}
              <span>
                <strong>$73</strong>
                {discountPercentage && ` ${discountPercentage}%`}
              </span>
            </h1>
          </div>
          <div className="cartItemQuantity">
            <span>Quantity</span>
            <div className="quantityController">
              <button onClick={handleDecrease} className="minusIconBtn">
                <MinusIcon className="minusIcon" />
              </button>
              <span>{quantity}</span>
              <button onClick={handleIncrease} className="plusIconBtn">
                <PlusIcon className="plusIcon" />
              </button>
            </div>
          </div>
        </div>

        {/* delete btn */}
        <div className="cartItemRemoveBtn" onClick={handleDelete}>
          <TrashIcon className="trashIcon" />
        </div>
      </div>
    </div>
  );
};

export default CartItem;

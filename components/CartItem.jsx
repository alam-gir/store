import { TrashIcon } from "@heroicons/react/24/outline";
const CartItem = ({handleIncrease, handleDecrease, product:{name, images, price, discountPercentage, weight, quantity}}) => {
  return (
    <div className="rounded-md h-full shadow-[0_-2px_10px_rgba(0,0,0,0.1)] capitalize">
      <div className="w-full grid grid-cols-12 h-full gap-2">
        {/* image */}
        <div className=" col-span-4 h-full rounded-md overflow-hidden">
          <img
            src={images[0]}
            alt=""
            className="h-full w-full object-contain border border-t-0 border-b-0 border-l-0 border-gray-200"
          />
        </div>
        {/* details */}
        <div className="col-span-7 flex flex-col gap-2 justify-center">
          <div className="flex gap-1.5">
            <h2 className="text-[14px] sm:text-[16px] text-gray-700 font-light leading-3">
              {name.length > 18 ? name.slice(0,18)+".." : name}
            </h2>
            <h2 className="text-[14px] sm:text-[16px] text-gray-500 font-light  leading-3"> {weight && `- ${weight}`}</h2>
          </div>
          <div className="flex gap-2">
            <h1 className="text-[15px] sm:text-[16px] text-gray-800 font-semibold leading-3-0">$ {price}</h1>
            <h1 className="text-[14px] sm:text-[16px]"> <span className=" line-through text-gray-300">$ 73</span> <span className="text-gray-300">{discountPercentage && `- ${discountPercentage}%`}</span></h1>
          </div>
          <div className="flex gap-2">
            <span className="text-[14px] text-gray-700 leading-3  flex items-center">quantity</span>
            <div className="">
              <button onClick={handleDecrease} className="font-semibold">-</button> <span className="text-gray-500">{quantity}</span> <button onClick={handleIncrease} className="font-semibold">+</button>
            </div>
          </div>
        </div>
        {/* delete btn */}
        <div className="col-span-1 p-2 relative">
          <TrashIcon className="h-4 w-4 absolute left-0 hover:text-[#e05914]"/>
        </div>
      </div>
    </div>
  );
};

export default CartItem;

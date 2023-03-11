import { TrashIcon } from "@heroicons/react/24/outline";
const CartItem = () => {
  return (
    <div className="rounded-md h-full shadow-[0_-2px_10px_rgba(0,0,0,0.1)] capitalize">
      <div className="w-full grid grid-cols-12 h-full gap-2">
        {/* image */}
        <div className=" col-span-4 h-full rounded-md overflow-hidden">
          <img
            src="https://cdn.shopify.com/s/files/1/0420/2001/products/GreenGoo_ProductPosts_FaceWash_20003_800x.jpg?v=1614277864"
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        {/* details */}
        <div className="col-span-7 flex flex-col justify-evenly">
          <div className="flex gap-1.5">
            <h2 className="text-[16px] text-gray-700 font-light">
              faceddddddddd Wash..
            </h2>
            <h2 className="text-[16px] text-gray-500 font-light"> - 36g</h2>
          </div>
          <div className="flex gap-2">
            <h1 className="text-[16px] text-gray-800 font-semibold">$ 65</h1>
            <h1 className="text-[16px]"> <span className=" line-through text-gray-300">$ 73</span> <span className="text-gray-300">- 5%</span></h1>
          </div>
          <div className="flex gap-2">
            <span className="text-gray-700">quantity</span>
            <div>
              <button className="font-semibold">-</button> <span className="text-gray-500">1</span> <button className="font-semibold">+</button>
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

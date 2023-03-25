import { getFromLocalStorage } from "../localStorage/getFromLocalStorage";

const isCartedStatus = (id) => {
 const cartItems = getFromLocalStorage("ramzansStoreCartProductsId")
 const cartItemids = cartItems.map(item => item.id)
  return cartItemids.includes(id) ? true : false;
};

export { isCartedStatus };

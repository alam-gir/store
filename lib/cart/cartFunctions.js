import { fetchPOST } from "../fetch/fetch";
import { addToLocalstorage } from "../localStorage/addToLocalstorage";
import { getFromLocalStorage } from "../localStorage/getFromLocalStorage";

const handleAddToCart = (id, decrease) => {
  //get item from LC
  const prevItems = getFromLocalStorage("ramzansStoreCartProductsId") || [];

  //map ids for check is carted
  const itemIds = prevItems.map((item) => item.id);
  const isCarted = itemIds.includes(id);

  let modifiedItems;
  // isCarted ? add quantity : add item
  if (isCarted) {
    //add quantity
    modifiedItems = prevItems.map((item) => {
      return item.id === id
        ? {
            ...item,
            quantity: decrease
              ? item.quantity > 1
                ? item.quantity - 1
                : item.quantity
              : item.quantity + 1,
          }
        : item;
    });
  }
  if (!isCarted) {
    // add item
    modifiedItems = [...prevItems, { id, quantity: 1 }];
  }

  // set item to LC
  addToLocalstorage("ramzansStoreCartProductsId", modifiedItems);
};

// fetch cartProducts
const fetchCartProducts = async (setCartState, setLoading, setLocalCart) => {
  // start loading
  setLoading(true);
  // at first get carts ids from local storage
  const cartIds =
    (await JSON.parse(localStorage.getItem("ramzansStoreCartProductsId"))) ||
    [];
    // if set cartLocal is available for geting Local cart
    if(setLocalCart) setLocalCart(cartIds)
  
  const data = await fetchPOST("/api/db/products/cart", cartIds);
  if (data.success) {
    setCartState(data.cart);
    setLoading(false);
  }
  if (!data.success) {
    setCartState([]);
    setLoading(false);
  }
};

const removeFromCart = (id) => {
  //get item from LC
  const prevItems = getFromLocalStorage("ramzansStoreCartProductsId") || [];

  let modifiedItems = prevItems.filter((items) => items.id !== id);

  // set item to LC
  addToLocalstorage("ramzansStoreCartProductsId", modifiedItems);
};

export { handleAddToCart, fetchCartProducts, removeFromCart };

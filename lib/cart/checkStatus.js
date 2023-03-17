const isCarted = (currentProductId, cartProducts) => {
  const cartedProductIds = cartProducts.map((product) => product.id);
  return cartedProductIds.includes(currentProductId) ? true : false;
};

export { isCarted };

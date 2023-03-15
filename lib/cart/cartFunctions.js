const handleAddToCart = (id, setState) => {
  //set item id to state
  setState((prev) => {
    // take an temporary container
    const temp = [...prev];

    // if no prouducts in cart
    if (temp.length < 0) {
      temp.push({ id, quantity: 1 });
      return temp;
    }

    // else
    const isCarted = temp.some((product) => product.id === id);
    if (!isCarted) {
      temp.push({ id, quantity: 1 });
    }
    return temp;
  });
};

const handleIncrease = (serverProduct,setState) => {
    // update cartProductsId quantity
    setState((prev) => {
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

const handleDecrease = (serverProduct, setState) => {
    // update cartProductsId quantity
    setState((prev) => {
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

const handleDelete = (serverProduct, setState) => {
    // filter cart
    setState((prev) => {
      const temp = prev.filter((product) => product.id !== serverProduct._id);
      return temp;
    });
  };


  export {handleAddToCart, handleIncrease, handleDecrease, handleDelete}
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


  export {handleIncrease, handleDecrease, handleDelete}
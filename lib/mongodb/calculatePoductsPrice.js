 // calculate price
 const getPriceDetails = (productsFromDb) =>{
     
     const priceDetails = productsFromDb.reduce(
         (prevValue, currentValue) => {
             // calculate a product price
             const productPrice = parseInt(currentValue.quantity) * parseInt(currentValue.price)
             
             //sum product price
             prevValue.totalAmount += productPrice 
             prevValue.bagDiscount = prevValue.bagDiscount = 0; // implement will later
      prevValue.estimatedTax = prevValue.estimatedTax = 0; // implement will later
      prevValue.deliveryCharge = prevValue.deliveryCharge;
      prevValue.subTotal =
      prevValue.totalAmount +
      prevValue.estimatedTax +
      prevValue.deliveryCharge -
      prevValue.bagDiscount;
      return prevValue;
    },
    {
        totalAmount: 0,
        bagDiscount: 0,
        estimatedTax: 0,
        deliveryCharge: 60,
      subTotal: 0,
    }
    );

    return priceDetails
}


export { getPriceDetails }
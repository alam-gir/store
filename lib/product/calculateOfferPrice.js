
const calculateOfferPrice = (regularPrice, discountPercentage) => {
    const discountTotal = (regularPrice / 100) * discountPercentage;
    const priceAfterDiscount = regularPrice - discountTotal;
    
    return {
        regularPrice,
        discountTotal,
        priceAfterDiscount,
        discountPercentage
    }
    
}

export {calculateOfferPrice}
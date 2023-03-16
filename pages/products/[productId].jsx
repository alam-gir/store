import ProductView from "@/components/ProductView";
import {handleAddToCart} from "@/lib/cart/cartFunctions";

const View = ({singleProduct, allProducts}) => {

  // price calculations
  const regularPrice = singleProduct.price;
  const offer = (singleProduct.price / 100) * singleProduct.discountPercentage;
  const offerPrice = regularPrice - offer;

  return (
    <div>
      <ProductView
        allProducts={allProducts}
        price={{offer, offerPrice, regularPrice}}
        handleAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default View;

export const getServerSideProps = async (context) => {
  const productId = context.query.productId;

  const [singleProduct, allProducts] = await Promise.all([
    fetch(`http://localhost:3000/api/db/products/${productId}`).then((res) =>
      res.json()
    ),
    fetch("http://localhost:3000/api/db/products").then((res) => res.json()),
  ]);
  return {
    props: {
      singleProduct: singleProduct.product,
      allProducts: allProducts.products,
    },
  };
};

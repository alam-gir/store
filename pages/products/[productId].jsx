import {useEffect} from "react";
import {useRecoilState} from "recoil";
import {addToLocalstorage} from "@/lib/localStorage/addToLocalstorage";
import {cartProductsIdState} from "@/lib/atom/cartProductsIdState";
import ProductView from "@/components/ProductView";
import {handleAddToCart} from "@/lib/cart/cartFunctions";

const View = ({singleProduct, allProducts}) => {
  const [cartProductsId, setCartProductsId] =
    useRecoilState(cartProductsIdState);

  // item get from local storage in cartbtn component
  // set cart to local storage
  useEffect(() => {
    addToLocalstorage("ramzansStoreCartProductsId", cartProductsId);
  }, [cartProductsId]);

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

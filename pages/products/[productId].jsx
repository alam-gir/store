import {useEffect} from "react";
import {useRecoilState} from "recoil";
import {addToLocalstorage} from "@/utils/addToLocalstorage";
import {cartProductsIdState} from "@/utils/atom/cartProductsIdState";
import ProductView from "@/components/ProductView";

const View = ({singleProduct, allProducts}) => {
  const [cartProductsId, setCartProductsId] =
    useRecoilState(cartProductsIdState);

  // add to cart
  const handleAddToCart = (id) => {
    //set item id to state
    setCartProductsId((prev) => {
      // take an temporary container
      const temp = [...prev];

      // if no prouducts in cart
      if (temp.length < 0) {
        temp.push({id, quantity: 1});
        return temp;
      }

      // else
      const isCarted = temp.some((product) => product.id === id);
      if (!isCarted) {
        temp.push({id, quantity: 1});
      }
      return temp;
    });
  };

  // Item get from local storage in cartbtn component
  // Set card id to local storage
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
        singleProduct={singleProduct}
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

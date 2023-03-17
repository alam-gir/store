import ProductView from "@/components/ProductView";
import {handleAddToCart} from "@/lib/cart/cartFunctions";
const View = ({products}) => {
  return (
    <div>
      <ProductView
        products={products}
        handleAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default View;

export const getServerSideProps = async () => {

  const res = await fetch("http://localhost:3000/api/db/products")
  const data = await res.json()
  return {
    props: {
      products: data?.products
    },
  };
};

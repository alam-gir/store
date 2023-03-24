import CartBtn from "@/components/CartBtn";
import ProductView from "@/components/ProductView";
import { handleAddToCart } from "@/lib/cart/cartFunctions";
const View = ({ products }) => {
  return (
    <div>
      <div className="cart-btn">
        <CartBtn />
      </div>
      <ProductView products={products} handleAddToCart={handleAddToCart} />
    </div>
  );
};

export default View;

export const getServerSideProps = async () => {
  const res = await fetch("https://store-alam-gir.vercel.app/api/db/products");
  const data = await res.json();
  return {
    props: {
      products: data?.products,
    },
  };
};

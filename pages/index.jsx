import CartBtn from "@/components/CartBtn";
import HomePage from "@/components/HomePage";
import customerTemplate from "@/lib/mail/sellerTemplate";

export default function Home({ products }) {
  return (
    <div>
      <div className="cart-btn">
        <CartBtn />
      </div>
      <HomePage products={products} />
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const res = await fetch("https://store-alam-gir.vercel.app/api/db/products");
  const data = await res.json();
  return {
    props: {
      products: data?.products,
    },
  };
};

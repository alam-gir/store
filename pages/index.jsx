import HomePage from "@/components/HomePage";

export default function Home({products}) {
  return (
    <div>
      <HomePage products={products}/>
    </div>
  );
}


export const getServerSideProps = async (context) => {
  const res = await fetch("https://store-alam-gir.vercel.app/api/db/products")
  const data = await res.json()
  return {
    props:{
      products: data?.products
    }
  }
}
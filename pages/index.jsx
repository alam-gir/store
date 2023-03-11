import HomePage from "@/components/HomePage";

export default function Home({products}) {
  return (
    <div>
      <HomePage products={products}/>
    </div>
  );
}


export const getServerSideProps = async (context) => {
  const res = await fetch("http://localhost:3000/api/db/products")
  const data = await res.json()
  return {
    props:{
      products: data?.products
    }
  }
}
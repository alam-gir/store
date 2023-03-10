import Button from "@/components/Button";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

const View = () => {
  const [product, setProduct] = useState();
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  const id = router.query.productId;
  //fetch signle product
  const fetchProduct = async (id) => {
    //start loading
    setLoading(true)

    const res = await fetch(`/api/db/products/${id}`);
    const data = await res.json();
    setProduct(data.product);
    if(!data.success){
      router.push("/404/404                        ")
    }

    //stop loading
    setLoading(false)
  };

  useEffect(() => {
    // return if id not available
    if (!id) return;
    //fetch
    fetchProduct(id);
  }, [router]);
  return (
    <div>
      <img src={product?.images[0]} alt="" />
      <div><Button text={'Add To Cart'} textColor={"text-white"} bgColor={"bg-[#227C70]"} textSize={"text-[16px]"}/></div>
    </div>
  );
};

export default View;

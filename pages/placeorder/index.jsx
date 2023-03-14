import { cartProductsIdState } from "@/utils/atom/cartProductsIdState";
import { cartState } from "@/utils/atom/cartState";
import React from "react";
import { useRecoilState } from "recoil";
import CheckoutPage from "../../components/CheckoutPage";

export default function Checkout() {
  
  return (
    <>
      <CheckoutPage />
    </>
  );
}

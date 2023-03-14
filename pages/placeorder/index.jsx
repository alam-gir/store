import React from "react";
import CheckoutPage from "../../components/CheckoutPage";

export default function Checkout() {
  return (
    <>
      <CheckoutPage />
    </>
  );
}

Checkout.getLayout = function pageLayout(page) {
  return <>{page}</>;
};

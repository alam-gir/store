import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "./Button";
import CartItem from "./CartItem";
import { fetchCartProducts } from "@/lib/cart/cartFunctions";
import { useRecoilState, useRecoilValue } from "recoil";
import { cartChangesState, cartState } from "@/lib/atom/cartState";
import CartPricing from "./CartPricing";
import ReactModal from "react-modal";
import { fetchPOST } from "@/lib/fetch/fetch";
import OrderPlacedAlert from "./confirmation/OrderPlacedAlert";
import LoaderSVG from "./LoaderSVG";
import { addToLocalstorage } from "@/lib/localStorage/addToLocalstorage";
import { useRouter } from "next/router";

const userInputValidation = Yup.object({
  fullName: Yup.string()
    .min(3, "Too Short!")
    .max(30, "Too Long!")
    .required("Required"),
  mobileNum: Yup.string()
    .min(10, "Minimum 10 Character")
    .max(10, "Minimum 10 Character")
    .required("Required"),
  email: Yup.string().email("Enter a valid E-mail").required("Required"),
  cityName: Yup.string().required("Required"),
  userAddress: Yup.string().required("Required"),
  userDistrict: Yup.string().required("Required"),
});
const initialOrderReq = {
  isLoading: false,
  success: false,
  orderId: "",
};
export default function CheckoutPage() {
  const cartChanges = useRecoilValue(cartChangesState);
  const [cart, setCart] = useRecoilState(cartState);
  const [localCart, setLocalCart] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [orderReq, setOrderReq] = useState(initialOrderReq);
  const router = useRouter();

  //* formik---------
  const formik = useFormik({
    initialValues: {
      fullName: "",
      mobileNum: "",
      email: "",
      cityName: "",
      userAddress: "",
      userDistrict: "",
    },
    validationSchema: userInputValidation,
    onSubmit: async (values, { resetForm }) => {
      //start loading
      setOrderReq({ ...initialOrderReq, isLoading: true });
      // send data to sever for place order
      const data = await fetchPOST("/api/db/orders/placeorder", {
        customer: values,
        localCart,
      });

      //if order placed
      if (data.success) {
        // set order reqst
        setOrderReq((prev) => ({
          ...prev,
          isLoading: false,
          success: true,
          orderId: data.orderId,
        }));

        //reset order forms
        resetForm({ values: "" });

        // cart empty
        addToLocalstorage("ramzansStoreCartProductsId", []);
      } else setOrderReq(initialOrderReq);
    },
  });

  // fetch cart products
  useEffect(() => {
    fetchCartProducts(setCart, setLoading, setLocalCart);
  }, [cartChanges]);

  return (
    <>
      <div className="wrapper">
        <section className="checkoutSection customScrollbar">
          {/* Pricing Details & Checkout Form */}
          <section className="cartItemAndPricing">
            {/* Cart Product Section */}
            <section className="cartItemContainer">
              {cart?.products?.map((product) => (
                <div className="" key={product._id}>
                  <CartItem product={product} />
                </div>
              ))}
            </section>

            {/* Pricing Details Section */}
            {cart?.products?.length > 0 ? (
              <CartPricing
                cart={cart}
                isHeader
                isTotalAmount
                isDeliveryCharge
                isBagDiscount
                isEstimatedTax
                isSubTotalAmount
              />
            ) : (
              <div className="flex justify-center items-center">
                <LoaderSVG color={"fill-gray-400"} />
              </div>
            )}
          </section>

          {/* Checkout Form Section */}
          <section className="userContactForm">
            <form onSubmit={formik.handleSubmit}>
              <div className="inputForm">
                <label htmlFor="userName">
                  Full Name <span title="Information must be provided">*</span>
                </label>
                <input
                  type="text"
                  id="userName"
                  name="fullName"
                  placeholder="Type Your Name"
                  onChange={formik.handleChange}
                  value={formik.values.fullName}
                />
                {formik.touched.fullName && formik.touched.fullName && (
                  <span className="text-red-600 text-sm">
                    {formik.errors.fullName}
                  </span>
                )}
              </div>
              <div className="inputForm">
                <label htmlFor="userMobile">
                  Mobile Number
                  <span title="Information must be provided">*</span>
                </label>
                <div className="userMobileNum">
                  <button>+880</button>
                  <input
                    type="number"
                    maxLength={11}
                    id="userMobile"
                    name="mobileNum"
                    placeholder="+88 01*******"
                    onChange={formik.handleChange}
                    value={formik.values.mobileNum}
                  />
                </div>
                {formik.touched.mobileNum && formik.touched.mobileNum && (
                  <span className="text-red-600 text-sm">
                    {formik.errors.mobileNum}
                  </span>
                )}
              </div>
              <div className="inputForm">
                <label htmlFor="userEmail">
                  E-mail <span title="Information must be provided">*</span>
                </label>
                <input
                  type="email"
                  id="userEmail"
                  name="email"
                  placeholder="example@xyz.com"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.touched.email && (
                  <span className="text-red-600 text-sm">
                    {formik.errors.email}
                  </span>
                )}
              </div>
              <div className="selectForm">
                <div className="inputForm">
                  <label htmlFor="userDistrict">
                    District <span title="Information must be provided">*</span>
                  </label>
                  <select
                    className="select"
                    id="userDistrict"
                    name="userDistrict"
                    onChange={formik.handleChange}
                    value={formik.values.userDistrict}
                  >
                    <option value="">Select One</option>
                    <option value="Chattogram">Chattogram</option>
                    <option value="Dhaka">Dhaka</option>
                  </select>
                  {formik.touched.userDistrict &&
                    formik.touched.userDistrict && (
                      <span className="text-red-600 text-sm">
                        {formik.errors.userDistrict}
                      </span>
                    )}
                </div>
                {/* City name input Box */}
                <div className="inputForm">
                  <label htmlFor="userCity">
                    City name{" "}
                    <span title="Information must be provided">*</span>
                  </label>
                  <input
                    type="text"
                    id="userCity"
                    name="cityName"
                    placeholder="Type here..."
                    onChange={formik.handleChange}
                    value={formik.values.cityName}
                  />
                  {formik.touched.cityName && formik.touched.cityName && (
                    <span className="text-red-600 text-sm">
                      {formik.errors.cityName}
                    </span>
                  )}
                </div>
              </div>
              <div className="inputForm selectArea">
                <label htmlFor="userAddress">
                  Details Address
                  <span title="Information must be provided">*</span>
                </label>
                <textarea
                  className="textarea"
                  id="userAddress"
                  name="userAddress"
                  placeholder="Type here..."
                  onChange={formik.handleChange}
                  value={formik.values.userAddress}
                />
                {formik.touched.userAddress && formik.touched.userAddress && (
                  <span className="text-red-600 text-sm">
                    {formik.errors.userAddress}
                  </span>
                )}
              </div>
              <Button
                isLoading={orderReq.isLoading}
                disable={orderReq.isLoading}
                type={"submit"}
                text="Confirm Order"
              />
            </form>
          </section>
        </section>
      </div>
      <ReactModal
        isOpen={orderReq.success}
        onRequestClose={() =>
          setOrderReq((prev) => ({ ...prev, success: false, orderId: "" }))
        }
        onAfterClose={() => router.push(`${window.origin}/myorders`)}
        className="h-auto w-auto"
      >
        <OrderPlacedAlert
          handleClose={() =>
            setOrderReq((prev) => ({ ...prev, success: false, orderId: "" }))
          }
          orderId={orderReq.orderId}
        />
      </ReactModal>
    </>
  );
}

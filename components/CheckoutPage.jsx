import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "./Button";
import CartItem from "./CartItem";
import {
  handleDecrease,
  handleDelete,
  handleIncrease,
} from "@/utils/cart/cartFunctions";
import { useRecoilState } from "recoil";
import { cartState } from "@/utils/atom/cartState";
import { cartProductsIdState } from "@/utils/atom/cartProductsIdState";
import CartPricing from "./CartPricing";

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
});

export default function CheckoutPage() {
  const [cartProductsId, setCartProductsId] =
    useRecoilState(cartProductsIdState);
  const [cart, setCart] = useRecoilState(cartState);
  const formik = useFormik({
    initialValues: {
      fullName: "",
      mobileNum: "",
      email: "",
      cityName: "",
    },
    validationSchema: userInputValidation,
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      resetForm({ values: "" });
    },
  });

  return (
    <>
      <div className="max-h-full overflow-y-scroll px-2 py-4 flex flex-col gap-6 customScrollbar">
        {cart?.products?.map((product) => (
          <div className="h-20" key={product._id}>
            <CartItem
              product={product}
              handleIncrease={() => handleIncrease(product, setCartProductsId)}
              handleDecrease={() => handleDecrease(product, setCartProductsId)}
              handleDelete={() => handleDelete(product, setCartProductsId)}
            />
          </div>
        ))}
      </div>

      <div className="wrapper">
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
                Mobile Number{" "}
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
                <select className="select" id="userDistrict">
                  <option>Select One</option>
                  <option value="Chattogram">Chattogram</option>
                  <option value="Dhaka">Dhaka</option>
                </select>
              </div>
              {/* City name input Box */}
              <div className="inputForm">
                <label htmlFor="userCity">
                  City name <span title="Information must be provided">*</span>
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
                Details Address{" "}
                <span title="Information must be provided">*</span>
              </label>
              <textarea
                className="textarea"
                id="userAddress"
                placeholder="Type here..."
              ></textarea>
            </div>

            <Button type="submit" text="Confirm Order" />
          </form>
        </section>
      </div>
      <div>
        <CartPricing cart={cart}/>
      </div>
    </>
  );
}

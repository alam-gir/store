import Confirmation from "@/components/confirmation/Confirmation";
import { productFormConfirmationState } from "@/lib/atom/modalOpenState";
import { compareTwoObjByPrimaryObjKeys } from "@/lib/compare/caompareTwoObj";
import { PlusCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useFormik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import ReactModal from "react-modal";
import { useRecoilState } from "recoil";

const Form = ({ givenInitial, actionText, messageText, handleConfirm }) => {
  const fileInput = useRef();
  const submitBtn = useRef();
  const [selectedImages, setImages] = useState([]);
  const [isOpenConfirmation, setOpenConfirmation] = useRecoilState(
    productFormConfirmationState
  );
  const [errors, setErrors] = useState({ form: true, image: true });
  const [isValueSame, setValueSame] = useState(null);

  // initail value for formik
  const initialValues = givenInitial
    ? givenInitial
    : {
        id: "",
        name: "",
        description: "",
        weight: "",
        price: "",
        discountPercentage: 0,
        brand: "",
        category: "",
        stock: "",
        images: [],
      };
  // formik validation
  const validate = (values) => {
    let errors = {};
    // errors logic
    if (!values.id.trim()) errors.id = "Required";
    if (!values.name.trim()) errors.name = "Required";
    if (!values.price) errors.price = "Required";
    if (!values.description.trim()) errors.description = "Required";
    if (!values.weight.trim()) errors.weight = "Required";
    // if (!values.discountPercentage) errors.discountPercentage = "Required";
    if (!values.brand.trim()) errors.brand = "Required";
    if (!values.category.trim()) errors.category = "Required";
    if (!values.stock) errors.stock = "Required";
    //return errors
    return errors;
  };
  const formik = useFormik({
    initialValues,
    validate,
    onSubmit: (values) => {
      handleConfirm({ ...values, images: selectedImages });
    },
  });

  //get images on change
  const handleChangeImage = (e) => {
    const data = e.target.files;
    if (data.length) {
      for (let file of data) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (ev) => {
          const data = ev?.target?.result;
          setImages((prev) => {
            let temp = [...prev];
            if (!temp.includes(data)) {
              temp.push(data);
            }
            return temp;
          });
        };
      }
    }
  };

  // delete image from selected images
  const handleDeleteImage = (image) => {
    setImages((prev) => prev.filter((item) => item !== image));
    //make file input null for taking same photo again
    fileInput.current.value = null;
  };

  //open confirmation
  const openConfirmation = () => {
    //disable body scroll
    document.body.style.overflow = "hidden";
    //set open confirmation
    setOpenConfirmation(true);
  };
  //close confirmation
  const closeConfirmation = () => {
    //enable body scroll
    document.body.style.overflow = "unset";
    //set close confirmation
    setOpenConfirmation(false);
  };

  const storeErrors = (formik, imagesState, setErrors) => {
    // check every value of formik
    const formError = Object.values(formik.errors).length > 0;
    const imageError = imagesState.length < 1;
    setErrors((prev) => ({ ...prev, form: formError, image: imageError }));
  };

  //* use effects
  useEffect(() => {
    storeErrors(formik, selectedImages, setErrors);
  }, [formik.errors, selectedImages]);

  //if given images available set in selected Images
  useEffect(() => {
    if (!givenInitial) return;
    setImages(givenInitial.images);
  }, []);
  //if given values and formik values are same update button shoul disable
  useEffect(() => {
    if (!givenInitial) return;
    setValueSame(compareTwoObjByPrimaryObjKeys(formik.values, givenInitial));
  }, [givenInitial, formik.values]);

  // disable submit btn
  const disableSubmitBtn = () => {
    // errors.form || errors.image ? true : false || isValueSame
    if(givenInitial){
      if(givenInitial.images.length !== selectedImages.length) return false
    }
    if (errors.form) return true;
    if (errors.image) return true;
    if (isValueSame) return true;
    return false;
  };
  console.log("bugggggggggggg re rendaring");
  return (
    // all design will provided from /styles/dashboard.css
    <div className="formik-container">
      <div className="formik-wrapper">
        {/* formik form  */}
        <form onSubmit={formik.handleSubmit} className="formik">
          <div className="input-container date">
            <div className="input-wrapper">
              <label htmlFor="" className="label">
                post date:
              </label>
              <span>
                {givenInitial?.createdAt
                  ? givenInitial?.createdAt
                  : new Date().toString().slice(4, 15)}
              </span>
            </div>
          </div>
          <div className="input-container id">
            <div className="input-wrapper"></div>
            <div className="input-wrapper">
              <label className="label" htmlFor="id">
                id
              </label>
              <input
                className="input-field"
                id="id"
                name="id"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.id}
              />
            </div>
            {formik.touched.id && formik.errors.id ? (
              <div>{formik.errors.id}</div>
            ) : null}
          </div>
          {/* ------------------------------ */}
          {/* ------------------------------ */}
          <div className="input-container name">
            <div className="input-wrapper">
              <label className="label" htmlFor="name">
                name
              </label>
              <input
                className="input-field"
                id="name"
                name="name"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.name}
              />
            </div>
            {formik.touched.name && formik.errors.name ? (
              <div>{formik.errors.name}</div>
            ) : null}
          </div>
          {/* ------------------------------ */}
          {/* ------------------------------ */}
          <div className="input-container price">
            <div className="input-wrapper">
              <label className="label" htmlFor="price">
                price
              </label>
              <input
                className="input-field"
                id="price"
                name="price"
                type="number"
                onChange={formik.handleChange}
                value={formik.values.price}
              />
            </div>
            {formik.touched.price && formik.errors.price ? (
              <div>{formik.errors.price}</div>
            ) : null}
          </div>
          {/* ------------------------------ */}
          {/* ------------------------------ */}
          <div className="input-container weight">
            <div className="input-wrapper">
              <label className="label" htmlFor="weight">
                weight
              </label>
              <input
                className="input-field"
                id="weight"
                name="weight"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.weight}
              />
            </div>
            {formik.touched.weight && formik.errors.weight ? (
              <div>{formik.errors.weight}</div>
            ) : null}
          </div>
          {/* ------------------------------ */}
          {/* ------------------------------ */}
          <div className="input-container stock">
            <div className="input-wrapper">
              <label className="label" htmlFor="stock">
                stock
              </label>
              <input
                className="input-field"
                id="stock"
                name="stock"
                type="number"
                onChange={formik.handleChange}
                value={formik.values.stock}
              />
            </div>
            {formik.touched.stock && formik.errors.stock ? (
              <div>{formik.errors.stock}</div>
            ) : null}
          </div>
          {/* ------------------------------ */}
          {/* ------------------------------ */}
          <div className="input-container discountPercentage">
            <div className="input-wrapper">
              <label className="label" htmlFor="discountPercentage">
                discount%
              </label>
              <input
                className="input-field"
                id="discountPercentage"
                name="discountPercentage"
                type="number"
                onChange={formik.handleChange}
                value={formik.values.discountPercentage}
              />
            </div>
            {/* {formik.errors.discountPercentage ? (
              <div>{formik.errors.discountPercentage}</div>
            ) : null} */}
          </div>
          {/* ------------------------------ */}
          {/* ------------------------------ */}
          <div className="input-container brand">
            <div className="input-wrapper">
              <label className="label" htmlFor="brand">
                brand
              </label>
              <input
                className="input-field"
                id="brand"
                name="brand"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.brand}
              />
            </div>
            {formik.touched.brand && formik.errors.brand ? (
              <div>{formik.errors.brand}</div>
            ) : null}
          </div>
          {/* ------------------------------ */}
          {/* ------------------------------ */}
          <div className="input-container category">
            <div className="input-wrapper">
              <label className="label" htmlFor="category">
                category
              </label>
              <input
                className="input-field"
                id="category"
                name="category"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.category}
              />
            </div>
            {formik.touched.category && formik.errors.category ? (
              <div>{formik.errors.category}</div>
            ) : null}
          </div>
          {/* ------------------------------ */}
          {/* ------------------------------ */}
          <div className="textarea-container description">
            <div className="input-wrapper">
              <label className="label" htmlFor="description">
                description
              </label>
              <textarea
                className="textarea-field"
                rows="4"
                id="description"
                name="description"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.description}
              />
            </div>
            {formik.touched.description && formik.errors.description ? (
              <div>{formik.errors.description}</div>
            ) : null}
          </div>
          {/* ------------------------------ */}
          {/* file picker input  */}
          {/* ------------------------------ */}
          <input
            ref={fileInput}
            className="hidden"
            rows="4"
            id="images"
            name="images"
            type="file"
            onChange={handleChangeImage}
            multiple
          />
          {/* ------------------------------ */}
          {/* images section */}
          {/* ------------------------------ */}
          <div className="image-section">
            <div className="header">
              <h4 className="text">photos</h4>
            </div>
            <div className="body">
              {selectedImages.length > 0
                ? selectedImages.map((image) => (
                    <div className="image-container">
                      <button className="remove-btn">
                        <TrashIcon
                          onClick={() => handleDeleteImage(image)}
                          className="icon"
                        />
                      </button>
                      <img src={image} alt="" />
                    </div>
                  ))
                : null}
              <button
                type="button"
                onClick={() => fileInput.current.click()}
                className="add-btn group"
              >
                <PlusCircleIcon className="icon group-hover:!p-1" />{" "}
                <span className="text">add new photo</span>
              </button>
            </div>
          </div>

          {/* submit button hidden for confirmation  */}
          <button ref={submitBtn} type="submit" className="hidden" />
          {/* fake submit button for popup confirmation only  */}
          <button
            onClick={openConfirmation}
            type="button"
            disabled={disableSubmitBtn()}
            className="submit-btn"
          >
            {"ready to " + actionText + "?"}
          </button>
        </form>
      </div>
      <ReactModal
        isOpen={isOpenConfirmation}
        onRequestClose={closeConfirmation}
        className="h-auto w-auto"
      >
        <Confirmation
          handleConfirm={() => {
            setOpenConfirmation(false);
            submitBtn.current.click();
          }}
          handleClose={closeConfirmation}
          actionText={actionText}
          message={messageText}
        />
      </ReactModal>
    </div>
  );
};

export default Form;

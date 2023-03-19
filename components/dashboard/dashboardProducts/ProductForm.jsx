import AddProductPreviewImg from "@/components/AddProductPreviewImg";
import Button from "@/components/Button";
import { productUpdateConfirmationModalState } from "@/lib/atom/modalOpenState";
import { fetchPUT } from "@/lib/fetch/fetch";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/solid";
import React, { useRef, useState, useEffect } from "react";
import ReactModal from "react-modal";
import { toast, ToastContainer } from "react-toastify";
import { useRecoilState } from "recoil";
import Confirmation from "./Confirmation";

const ProductForm = ({ data, handleClose }) => {
  const initialInput = {
    id: data?.id ? data.id : "",
    name: data?.name ? data?.name : "",
    description: data?.description ? data?.description : "",
    weight: data?.weight ? data?.weight : "",
    price: data?.price ? data?.price : "",
    discountPercentage: data?.discountPercentage
      ? data?.discountPercentage
      : "",
    brand: data?.brand ? data?.brand : "",
    category: data?.category ? data?.category : "",
    stock: data?.stock ? data?.stock : "",
    images: data?.images ? data?.images : [],
  };
  const initialImages = data?.images;

  const pickImage = useRef(null);
  const [images, setImages] = useState([]);
  const [input, setInput] = useState(initialInput);
  const [errorEmpty, setErrorEmpty] = useState(null);
  const [updateBtnStatus, setUpdateBtnStatus] = useState(true); // initailly should disable
  const [isOpenConfirmationModal, setOpenConfirmationModal] = useRecoilState(
    productUpdateConfirmationModalState
  );

  // check image
  useEffect(() => {
    if (data?.images?.length > 0) {
      setImages((prev) => data?.images);
    }
  }, []);

  // change update btn status
  const changeUpdateBtnStatus = () => {
    if (initialInput !== input || initialImages !== images)
      setUpdateBtnStatus(false);
  };
  // image pick handler
  const handlePickImage = async (e) => {
    const data = e.target.files;
    if (data.length > 0) {
      for (let file of data) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (readerEvent) => {
          const data = readerEvent?.target?.result;
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

    //if change any pick check update btn status
    changeUpdateBtnStatus();
  };

  //input box onchange data set
  const handleChange = (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
      images: [],
    }));

    // check error empty
    setErrorEmpty((prev) => ({
      ...prev,
      [e.target.name]: e.target.value.trim() ? false : true,
    }));
    //if change any input check update btn status
    changeUpdateBtnStatus();
  };

  //handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    // condition for submit form
    // const submitCondition =
    //   input.id.trim() &&
    //   input.name.trim() &&
    //   input.description.trim() &&
    //   input.weight.trim() &&
    //   input.price.trim() &&
    //   input.discountPercentage.trim() &&
    //   input.brand.trim() &&
    //   input.category.trim() &&
    //   input.stock.trim();

    // condition applied in backend ****

    setErrorEmpty((prev) => ({
      ...prev,
      id: input.id.trim() ? false : true,
      name: input.name.trim() ? false : true,
      description: input.description.trim() ? false : true,
      weight: input.weight.trim() ? false : true,
      price: input.price.trim() ? false : true,
      discountPercentage: input.discountPercentage.trim() ? false : true,
      brand: input.brand.trim() ? false : true,
      category: input.category.trim() ? false : true,
      stock: input.stock.trim() ? false : true,
    }));

    //post req...
    const res = await fetch("api/db/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ productInfo: input, productImages: images }),
    });
    const data = await res.json();
    if (data.success) {
      // make alert
      window.alert(data.message);
      // clean field data and image
      setInput(initialInput);
      setImages([]);
    }
    if (data.status === "empty") {
      //  make alert
      window.alert(data.message);
    }
  };

  // remove image
  const handleRemove = (image) => {
    setImages((prev) => prev.filter((item) => item !== image));
    //if change any pick check update btn status
    changeUpdateBtnStatus();
  };

  // popup handle confirm
  const handleConfirm = async () => {
    const productUpdateServerUrl = "http://localhost:3000/api/db/products";
    const productUpdateInfo = {
      productDocId: data?._id,
      newProductInfo: input,
      newProductImages: images !== initialImages ? images : null,
    };
    console.log(productUpdateInfo);
    // close confirmation modal when get clicked
    setOpenConfirmationModal(false),
      //start an toast when fetching start
      await toast.promise(
        fetchPUT(productUpdateServerUrl, productUpdateInfo).then((res) =>
          console.log(res)
        ),
        {
          pending: "Product is Updating...",
          success: "Product Updated",
          error: "Something Error! Please Try Again",
        }
      );
  };

  // console debuggg
  return (
    <div className="product-form-container max-h-full relative">
      <XMarkIcon
        onClick={handleClose}
        className="product-form-close-icon"
      />
      <div className="product-form-wrapper">
        <div className="product-form-header">
          <h1 className="product-form-header-text">Edit Products</h1>
        </div>
        <div className="product-form-body">
          <form className="product-form">
            {/* id */}
            <div className="product-form-input">
              <label className="product-form-input-label" htmlFor="id">
                Id
              </label>
              <input
                onChange={handleChange}
                type="text"
                name="id"
                id="id"
                value={input.id}
                className={`product-form-input-field ${
                  errorEmpty?.id ? "border border-red-500" : ""
                }`}
              />
            </div>

            {/* name */}
            <div className="product-form-input">
              <label className="product-form-input-label" htmlFor="name">
                Name
              </label>
              <input
                onChange={handleChange}
                type="text"
                name="name"
                id="name"
                value={input.name}
                className={`product-form-input-field ${
                  errorEmpty?.name ? "border border-red-500" : ""
                }`}
              />
            </div>

            {/* weight */}
            <div className="product-form-input">
              <label className="product-form-input-label" htmlFor="weight">
                Weight
              </label>
              <input
                onChange={handleChange}
                type="text"
                name="weight"
                id="weight"
                value={input.weight}
                className={`product-form-input-field ${
                  errorEmpty?.weight ? "border border-red-500" : ""
                }`}
              />
            </div>

            {/* price */}
            <div className="product-form-input">
              <label className="product-form-input-label" htmlFor="price">
                Price
              </label>
              <input
                onChange={handleChange}
                type="number"
                name="price"
                id="price"
                value={input.price}
                className={`product-form-input-field ${
                  errorEmpty?.price ? "border border-red-500" : ""
                }`}
              />
            </div>

            {/* discount percentage */}
            <div className="product-form-input">
              <label
                className="product-form-input-label"
                htmlFor="discountPercentage"
              >
                Discount %
              </label>
              <input
                onChange={handleChange}
                type="number"
                name="discountPercentage"
                id="discountPercentage"
                value={input.discountPercentage}
                className={`product-form-input-field ${
                  errorEmpty?.discountPercentage ? "border border-red-500" : ""
                }`}
              />
            </div>

            {/* brand */}
            <div className="product-form-input">
              <label className="product-form-input-label" htmlFor="brand">
                Brand
              </label>
              <input
                onChange={handleChange}
                type="text"
                name="brand"
                id="brand"
                value={input.brand}
                className={`product-form-input-field ${
                  errorEmpty?.brand ? "border border-red-500" : ""
                }`}
              />
            </div>

            {/* category */}
            <div className="product-form-input">
              <label className="product-form-input-label" htmlFor="category">
                Category
              </label>
              <input
                onChange={handleChange}
                type="text"
                name="category"
                id="category"
                value={input.category}
                className={`product-form-input-field ${
                  errorEmpty?.category ? "border border-red-500" : ""
                }`}
              />
            </div>

            {/* stock */}
            <div className="product-form-input">
              <label className="product-form-input-label" htmlFor="stock">
                stock
              </label>
              <input
                onChange={handleChange}
                type="number"
                name="stock"
                id="stock"
                value={input.stock}
                className={`product-form-input-field ${
                  errorEmpty?.stock ? "border border-red-500" : ""
                }`}
              />
            </div>

            {/* description */}
            <div className="product-form-textarea">
              <label className="product-form-input-label" htmlFor="description">
                Description
              </label>
              <textarea
                onChange={handleChange}
                type="text"
                name="description"
                id="description"
                value={input.description}
                className={`product-form-textarea-field customScrollbar ${
                  errorEmpty?.description ? "border border-red-500" : ""
                }`}
              />
            </div>

            <div className="product-form-image-pick-wrapper">
              <div className="product-form-input">
                <label className="product-form-input-label" htmlFor="stock">
                  pick image
                </label>
                <PhotoIcon
                  onClick={() => {
                    pickImage.current.click();
                  }}
                  className="product-form-image-pic-icon"
                />
                <input
                  ref={pickImage}
                  type="file"
                  name="stock"
                  id="stock"
                  multiple
                  className="hidden product-form-input-field"
                  onChange={handlePickImage}
                />
              </div>
              {/* image preview */}
              <div className="product-form-image-preview-area">
                {images.length > 0 &&
                  images.map((image, index) => (
                    <AddProductPreviewImg
                      key={index}
                      image={image}
                      handleRemove={() => handleRemove(image)}
                    />
                  ))}
              </div>
            </div>
          </form>
          {/* submit button */}
          <Button
            text={"update product"}
            handleClick={() => setOpenConfirmationModal(true)}
            textColor={"text-white"}
            bgColor={"bg-[#e50914]"}
            px={"w-full sm:w-1/2 m-auto"}
            disable={updateBtnStatus}
          />
        </div>
      </div>
      {/* confirmation modal  */}
      <div>
        <ReactModal
          isOpen={isOpenConfirmationModal}
          onRequestClose={() => setOpenConfirmationModal(false)}
          className="product-update-confirmation-modal"
        >
          <Confirmation handleConfirm={handleConfirm} handleClose={() => setOpenConfirmationModal(false)}/>
        </ReactModal>

        {/* <ReactModal>

          isOpen={isOpenConfirmationModal}
          handleClose={}
          Component={ConfirmationModal}
          handleConfirm={handleConfirm}
        </ReactModal> */}
      </div>

      <ToastContainer />
    </div>
  );
};

export default ProductForm;

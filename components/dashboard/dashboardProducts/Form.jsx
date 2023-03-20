import { MinusIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { useFormik } from "formik";
import React, { useRef, useState } from "react";

const Form = ({ givenInitial }) => {
    const fileInput = useRef(null)
  const [selectedImages, setImages] = useState("");
  const initialValues = givenInitial
    ? givenInitial
    : {
        id: "",
        name: "",
        description: "",
        weight: "",
        price: "",
        dicountPercentage: "",
        brand: "",
        category: "",
        stock: "",
        images: "",
        lastModified: "",
        createdAt: "",
      };
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  console.log(fileInput)
  const handleChangeImage = (e) => {};
  return (
    // all design will provided from /styles/dashboard.css
    <div className="formik-container">
      <div className="formik-wrapper">
        {/* formik form  */}
        <form onSubmit={formik.handleSubmit} className="formik">
          <div className="input-container date">
            <label htmlFor="" className="label">
              post date:
            </label>
            <span>31/12/2000</span>
          </div>
          <div className="input-container id">
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
            {formik.errors.id ? <div>{formik.errors.id}</div> : null}
          </div>
          {/* ------------------------------ */}
          {/* ------------------------------ */}
          <div className="input-container name">
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
            {formik.errors.name ? <div>{formik.errors.name}</div> : null}
          </div>
          {/* ------------------------------ */}
          {/* ------------------------------ */}
          <div className="input-container price">
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
            {formik.errors.price ? <div>{formik.errors.price}</div> : null}
          </div>
          {/* ------------------------------ */}
          {/* ------------------------------ */}
          <div className="input-container weight">
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
            {formik.errors.weight ? <div>{formik.errors.weight}</div> : null}
          </div>
          {/* ------------------------------ */}
          {/* ------------------------------ */}
          <div className="input-container stock">
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
            {formik.errors.stock ? <div>{formik.errors.stock}</div> : null}
          </div>
          {/* ------------------------------ */}
          {/* ------------------------------ */}
          <div className="input-container brand">
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
            {formik.errors.brand ? <div>{formik.errors.brand}</div> : null}
          </div>
          {/* ------------------------------ */}
          {/* ------------------------------ */}
          <div className="input-container category">
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
            {formik.errors.category ? (
              <div>{formik.errors.category}</div>
            ) : null}
          </div>
          {/* ------------------------------ */}
          {/* ------------------------------ */}
          <div className="textarea-container description">
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
            {formik.errors.description ? (
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
            onChange={(e) => handleChangeImage(e)}
            value={selectedImages}
          />
          {/* ------------------------------ */}
          {/* images section */}
          {/* ------------------------------ */}
          <div className="image-section">
            <div className="header">
              <h4 className="text">photos</h4>
            </div>
            <div className="body">
              <div className="image-container">
                <button className="remove-btn">
                  <MinusIcon className="icon" />
                </button>
                <img
                  src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHw%3D&w=1000&q=80"
                  alt=""
                />
              </div>
              <button className="add-btn group">
                <PlusCircleIcon className="icon group-hover:!p-1" />{" "}
                <span className="text">add new photo</span>
              </button>
            </div>
          </div>

          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;

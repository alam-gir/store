import React, { useRef, useState, useEffect } from "react";
import AddProductPreviewImg from "./AddProductPreviewImg";

const AddProductForm = () => {
  const initialInput = {
    id: "",
    name: "",
    description: "",
    weight: "",
    price: "",
    discountPercentage: "",
    brand: "",
    category: "",
    stock: "",
    images: "",
  };
  const pickImage = useRef(null);
  const [images, setImages] = useState([]);
  const [input, setInput] = useState(initialInput);
  const [errorEmpty, setErrorEmpty] = useState(null);

  // useeffect for set image in input whenever change images data
  useEffect(() => {
    setInput((prev) => ({
      ...prev,
      images: images.length > 0 ? images : "",
    }));
  }, [images]);

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
  };

  //input box onchange data set
  const handleChange = (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    // check error empty
    setErrorEmpty((prev) => ({
      ...prev,
      [e.target.name]: e.target.value.trim() ? false : true,
    }));
  };

  //handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    // condition for submit form
    const submitCondition =
      input.id.trim() &&
      input.name.trim() &&
      input.description.trim() &&
      input.weight.trim() &&
      input.price.trim() &&
      input.discountPercentage.trim() &&
      input.brand.trim() &&
      input.category.trim() &&
      input.stock.trim();

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
    console.log("submitted");
    const res = await fetch("api/db/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(input),
    });
    const data = await res.json();
    console.log(data);
    if (data.success) {
        // make alert
      window.alert(data.message);
      // clean field data and image
      setInput(initialInput)
      setImages([])
    }
    if(data.status === 'empty'){
        //  make alert
        window.alert(data.message)
    }
  };

  // remove image
  const handleRemove = (image) => {
    setImages((prev) => prev.filter((item) => item !== image));
  };

  return (
    <div>
      <h1>add products from component.</h1>
      <div>
        <form className="flex flex-col gap-4 max-w-[30rem]">
          {/* id */}
          <div className="addProductInputBox">
            <label className=" col-span-1" htmlFor="id">
              Id
            </label>
            <input
              onChange={handleChange}
              type="text"
              name="id"
              id="id"
              value={input.id}
              className={`addProductInputField outline-none ${
                errorEmpty?.id ? "border border-red-500" : ""
              }`}
            />
          </div>

          {/* name */}
          <div className="addProductInputBox">
            <label className=" col-span-1" htmlFor="name">
              Name
            </label>
            <input
              onChange={handleChange}
              type="text"
              name="name"
              id="name"
              value={input.name}
              className={`addProductInputField outline-none ${
                errorEmpty?.name ? "border border-red-500" : ""
              }`}
            />
          </div>

          {/* description */}
          <div className="addProductInputBox">
            <label className=" col-span-1" htmlFor="description">
              Description
            </label>
            <textarea
              onChange={handleChange}
              type="text"
              name="description"
              id="description"
              value={input.description}
              className={`addProductInputField outline-none ${
                errorEmpty?.description ? "border border-red-500" : ""
              }`}
            />
          </div>

          {/* weight */}
          <div className="addProductInputBox">
            <label className=" col-span-1" htmlFor="weight">
              Weight
            </label>
            <input
              onChange={handleChange}
              type="text"
              name="weight"
              id="weight"
              value={input.weight}
              className={`addProductInputField outline-none ${
                errorEmpty?.weight ? "border border-red-500" : ""
              }`}
            />
          </div>

          {/* price */}
          <div className="addProductInputBox">
            <label className=" col-span-1" htmlFor="price">
              Price
            </label>
            <input
              onChange={handleChange}
              type="number"
              name="price"
              id="price"
              value={input.price}
              className={`addProductInputField outline-none ${
                errorEmpty?.price ? "border border-red-500" : ""
              }`}
            />
          </div>

          {/* discount percentage */}
          <div className="addProductInputBox">
            <label className=" col-span-1" htmlFor="discountPercentage">
              Discount %
            </label>
            <input
              onChange={handleChange}
              type="number"
              name="discountPercentage"
              id="discountPercentage"
              value={input.discountPercentage}
              className={`addProductInputField outline-none ${
                errorEmpty?.discountPercentage ? "border border-red-500" : ""
              }`}
            />
          </div>

          {/* brand */}
          <div className="addProductInputBox">
            <label className=" col-span-1" htmlFor="brand">
              Brand
            </label>
            <input
              onChange={handleChange}
              type="text"
              name="brand"
              id="brand"
              value={input.brand}
              className={`addProductInputField outline-none ${
                errorEmpty?.brand ? "border border-red-500" : ""
              }`}
            />
          </div>

          {/* category */}
          <div className="addProductInputBox">
            <label className=" col-span-1" htmlFor="category">
              Category
            </label>
            <input
              onChange={handleChange}
              type="text"
              name="category"
              id="category"
              value={input.category}
              className={`addProductInputField outline-none ${
                errorEmpty?.category ? "border border-red-500" : ""
              }`}
            />
          </div>

          {/* stock */}
          <div className="addProductInputBox">
            <label className=" col-span-1" htmlFor="stock">
              stock
            </label>
            <input
              onChange={handleChange}
              type="number"
              name="stock"
              id="stock"
              value={input.stock}
              className={`addProductInputField outline-none ${
                errorEmpty?.stock ? "border border-red-500" : ""
              }`}
            />
          </div>

          {/* image preview */}
          <div className="flex flex-wrap gap-1 justify-center">
            {images.length > 0 &&
              images.map((image, index) => (
                <AddProductPreviewImg
                  key={index}
                  image={image}
                  handleRemove={() => handleRemove(image)}
                />
              ))}
          </div>
          <div className="addProductInputBox">
            <label className=" col-span-1" htmlFor="stock">
              pick image
            </label>
            <span
              onClick={() => {
                pickImage.current.click();
              }}
              className="col-span-2 cursor-pointer hover:brightness-75 border"
            >
              📸 choose image. . . 📸
            </span>
            <input
              ref={pickImage}
              type="file"
              name="stock"
              id="stock"
              multiple
              className="hidden addProductInputField outline-none"
              onChange={handlePickImage}
            />
          </div>

          {/* submit button */}
          <button onClick={handleSubmit} className="btn-red">
            add product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductForm;

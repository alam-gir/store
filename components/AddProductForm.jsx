import React, { useRef, useState } from "react";
import AddProductPreviewImg from "./AddProductPreviewImg";

const AddProductForm = () => {
  const pickImage = useRef(null);
  const [images, setImages] = useState([]);

  // image pick handler
  const handlePickImage = async (e) => {
    const data = e.target.files;
    if (data.length > 0) {

      for (let file of data) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (readerEvent) => {
          const data  = readerEvent?.target?.result;
          console.log(data)
          setImages(prev => {
            let temp = [...prev]
            if(!temp.includes(data)){
                temp.push(data)
            }
            return temp
          })
        };
      }
    }
  };

  // remove image
  const handleRemove = (image) => {
    setImages(prev => (
        prev.filter( item => item !== image )
    ))
  }

  console.log(images);
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
              type="text"
              name="id"
              id="id"
              className="addProductInputField"
            />
          </div>

          {/* name */}
          <div className="addProductInputBox">
            <label className=" col-span-1" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="addProductInputField"
            />
          </div>

          {/* description */}
          <div className="addProductInputBox">
            <label className=" col-span-1" htmlFor="description">
              Description
            </label>
            <textarea
              type="text"
              name="description"
              id="description"
              className="addProductInputField"
            />
          </div>

          {/* price */}
          <div className="addProductInputBox">
            <label className=" col-span-1" htmlFor="price">
              Price
            </label>
            <input
              type="number"
              name="price"
              id="price"
              className="addProductInputField"
            />
          </div>

          {/* discount percentage */}
          <div className="addProductInputBox">
            <label className=" col-span-1" htmlFor="discountPercentage">
              Discount %
            </label>
            <input
              type="number"
              name="discountPercentage"
              id="discountPercentage"
              className="addProductInputField"
            />
          </div>

          {/* brand */}
          <div className="addProductInputBox">
            <label className=" col-span-1" htmlFor="brand">
              Brand
            </label>
            <input
              type="text"
              name="brand"
              id="brand"
              className="addProductInputField"
            />
          </div>

          {/* category */}
          <div className="addProductInputBox">
            <label className=" col-span-1" htmlFor="category">
              Category
            </label>
            <input
              type="text"
              name="category"
              id="category"
              className="addProductInputField"
            />
          </div>

          {/* stock */}
          <div className="addProductInputBox">
            <label className=" col-span-1" htmlFor="stock">
              stock
            </label>
            <input
              type="number"
              name="stock"
              id="stock"
              className="addProductInputField"
            />
          </div>
          
          {/* image preview */}
          <div className="flex flex-wrap gap-1 justify-center">
            {images.length > 0 &&
            images.map((image,index) => (
                <AddProductPreviewImg key={index} image={image} handleRemove={() => handleRemove(image)}/>
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
              className="cursor-pointer hover:brightness-75"
            >
              📸
            </span>
            <input
              ref={pickImage}
              type="file"
              name="stock"
              id="stock"
              multiple
              className="hidden addProductInputField"
              onChange={handlePickImage}
            />
          </div>

          {/* submit button */}
          <button className="btn-red">add product</button>
        </form>
      </div>
    </div>
  );
};

export default AddProductForm;

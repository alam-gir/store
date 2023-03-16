import React from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

const AddProductPreviewImg = ({ image, handleRemove }) => {
  return (
    <div className="previewImg h-[7rem] relative">
      <img src={image} alt="" className="h-full w-full object-cover" />
        <XMarkIcon onClick={handleRemove} className="h-6 text-[#e50914] rounded-full hover:brightness-50 cursor-pointer absolute z-10 top-1 left-1"/>
    </div>
  );
};

export default AddProductPreviewImg;

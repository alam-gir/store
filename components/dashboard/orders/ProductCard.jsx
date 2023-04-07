import {
  ChevronDownIcon,
  ChevronUpIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";
const ProductCard = ({product}) => {
  const [disbleEdit, setEditStatus] = useState(true);
  return (
    <div className="wrapper">
      <div className="image-container">
        <img
          src={product.images[0]}
          alt=""
        />
      </div>
      <div className="details-container">
        <div className="top">
          <h1 className="name">{product.name}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            {/* action buttons */}
            {!disbleEdit ? (
              <div className="quantity-btn-container">
                <button>
                  <ChevronUpIcon className="h-3" />
                </button>
                <button>
                  <ChevronDownIcon className="h-3" />
                </button>
              </div>
            ) : null}
            <div className="details">
              <h2 className="quantity-text">x{product.quantity}</h2>
              <h2 className="price-text">
                tk {product.quantity * product.price}
              </h2>
            </div>
          </div>
          <div className="action-btn-container">
            <button
            onClick={() => setEditStatus(prev => !prev)}>
              {disbleEdit ? (
                <PencilIcon className="h-5" />
              ) : (
                <span>cancel</span>
              )}
            </button>
            {/* remove button */}
            {!disbleEdit ? (
              <button>
                <TrashIcon className="h-5 text-[#e50914]" />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

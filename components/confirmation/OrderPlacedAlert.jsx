import { CheckCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import React from "react";

const OrderPlacedAlert = ({ orderId, handleClose }) => {
  return (
    <div
      onClick={handleClose}
      className="orderPlaceAlert-container"
    >
      <div onClick={e=> e.stopPropagation()} className="orderPlaceAlert-wrapper">
        <XMarkIcon onClick={handleClose} className="close-icon" />
        <div className="orderPlaceAlert-header">
          <CheckCircleIcon className="icon" />
          <h2 className="greetings">congratulation!</h2>
        </div>
        <div className="orderPlaceAlert-body">
          <h3 className="message">your order is placed.</h3>
          <h3 className="order-id">order id - <span>{orderId}</span></h3>
        </div>
        <div className="orderPlaceAlert-footer">
          <h4 className="message">We will contact with you.</h4>
        </div>
      </div>
    </div>
  );
};

export default OrderPlacedAlert;

import Button from "@/components/Button";
import Searchbar from "@/components/searchbar/Searchbar";
import { productAddModalState } from "@/lib/atom/modalOpenState";
import { addProduct } from "@/lib/product/productCRUD";
import { FunnelIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import ReactModal from "react-modal";
import { useRecoilState } from "recoil";
import DashboardProductsTable from "./DashboardProductsTable";
import Form from "./Form";

const DashboardProducts = () => {
  //* states
  const [isOpenAddProductModal, setOpenAddProductModal] =
    useRecoilState(productAddModalState);
  const [searchValue, setSearchValue] = useState("");
  const handleChangeSearch = (e) => {
    setSearchValue(e.target.value);
  };

  //* functions

  const handleOpenAddProductForm = () => {
    //disable body scrolling
    document.body.style.overflow = "hidden";
    //true open add product form state for open form
    setOpenAddProductModal(true);
  };
  const handleCloseAddProductForm = () => {
    //enable body scrolling
    document.body.style.overflow = "unset";
    //true open add product form state for open form
    setOpenAddProductModal(false);
  };

  return (
    <div>
      <div className="dashboard-product-wrapper">
        <div className="dashboard-product-header">
          <div className="left">
            <div className="btn-container add-products">
              {/* add products btn  */}
              <Button
                handleClick={handleOpenAddProductForm}
                text={"add Products"}
                Icon={PlusIcon}
                customStyle="btn"
                iconCustomStyle="icon"
              />
            </div>
            <h1 className="text">
              results: <span>{"all products"}</span>
            </h1>
          </div>
          <div className="right">
            {/* filter btn container  */}
            <div className="searchbar-container search">
              <Searchbar
                handleChange={handleChangeSearch}
                value={searchValue}
                placeholder={"search products..."}
              />
            </div>
            {/* search btn container  */}
            <div className="btn-container filter">
              {/* add products btn  */}
              <Button
                handleClick={handleOpenAddProductForm}
                text={"filter"}
                Icon={FunnelIcon}
                customStyle="btn"
                iconCustomStyle="icon"
              />
            </div>
          </div>
        </div>
        <div className="dashboard-product-body">
          <DashboardProductsTable />
        </div>
      </div>
      <ReactModal
        isOpen={isOpenAddProductModal}
        onRequestClose={handleCloseAddProductForm}
        className="product-modal"
      >
        <XMarkIcon
          onClick={handleCloseAddProductForm}
          className="product-modal-close-icon"
        />
        <div className="product-modal-body">
          <Form
            handleConfirm={
              (data) => addProduct(data, handleCloseAddProductForm) // addProduct function from lib/product/productCRUD.js
            }
            actionText={"add product"}
            messageText="to add a product click 'Add Product'. for cancel procces click 'Cancel'"
          />
        </div>
      </ReactModal>
    </div>
  );
};

export default DashboardProducts;

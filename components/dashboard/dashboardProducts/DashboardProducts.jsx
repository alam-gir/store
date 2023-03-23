import { productAddModalState } from "@/lib/atom/modalOpenState";
import { fetchGET } from "@/lib/fetch/fetch";
import { addProduct } from "@/lib/product/productCRUD";
import { XMarkIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { useRecoilState } from "recoil";
import DashboardProductHeader from "./DashboardProductHeader";
import DashboardProductsTable from "./DashboardProductsTable";
import Form from "./Form";
import { crudState } from "@/lib/atom/crudState";

const DashboardProducts = () => {
  //* states
  const [isOpenAddProductModal, setOpenAddProductModal] =
    useRecoilState(productAddModalState);
  const [searchValue, setSearchValue] = useState("");
  const handleChangeSearch = (e) => {
    setSearchValue(e.target.value);
  };
  const [products, setProducts] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState(null);
  const [crudAction, setCrudAction]= useRecoilState(crudState)

  //* functions
  //fetch products
  useEffect(() => {
    fetchGET("http://localhost:3000/api/db/products").then((data) =>
      setProducts(data.products)
    );
  },[crudAction]);

  // search product
  useEffect(() => {
    if (searchValue.trim()) {
      setFilteredProducts(
        products?.filter(
          (product) =>
            product.name
              .toLocaleLowerCase()
              .includes(searchValue.toLocaleLowerCase()) ||
            product.category
              .toLocaleLowerCase()
              .includes(searchValue.toLocaleLowerCase()) ||
            product.brand
              .toLocaleLowerCase()
              .includes(searchValue.toLocaleLowerCase())
        )
      );
    }
  }, [searchValue]);

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
        <DashboardProductHeader
          handleOpenAddProductForm={handleOpenAddProductForm}
          handleChangeSearch={handleChangeSearch}
          searchValue={searchValue}
        />

        <div className="dashboard-product-body">
          <DashboardProductsTable
            products={searchValue.length > 0 ? filteredProducts : products}
          />
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
              (data) => addProduct(data, ()=>{
                handleCloseAddProductForm()
                setCrudAction(prev => !prev)
              }) // addProduct function from lib/product/productCRUD.js
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

import ModalPopup from "@/components/reactModal/ModalPopup";
import { dashboardProductModalState } from "@/lib/atom/dashboardProductModalState";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import DashboardProductList from "./DashboardProductList";
import ProductForm from "./ProductForm";

const DashboardProductsTable = ({products}) => {
  const [isOpenProductModal, setOpenProductModal] = useRecoilState(dashboardProductModalState)
  const [currentProduct, setCurrentProduct] = useState(null)
  const hadnleCloseProductModal = () => {
    setOpenProductModal(false)
    // start body scrolling
    document.body.style.overflow = 'unset'
  }
  const handleClick = (_id) => {
    // stop body scrolling
    document.body.style.overflow = 'hidden'
    //set current product 
    setCurrentProduct(() => {
      return products.filter(product => product._id === _id)[0]
    })

    //open modal
    setOpenProductModal(true)

  }
  return (
    <div className="product-table-container">
      <div className="product-table-wrapper">
        {/* header  */}
        <div className="product-table-header">
          <h2 className="product-table-head">id</h2>
          <h2 className="product-table-head">name</h2>
          <h2 className="product-table-head">price</h2>
          <h2 className="product-table-head">brand</h2>
          <h2 className="product-table-head hidden md:inline">category</h2>
          <h2 className="product-table-head hidden md:inline">weight</h2>
          <h2 className="product-table-head hidden md:inline">date</h2>
          <h2 className="product-table-head">Delete</h2>
        </div>
      {/* body  */}
      <div>
        {products?.map(product => (
          <DashboardProductList key={product?._id} product={product} handleClick={() => handleClick(product?._id)}/>
        ))}
      </div>
    
      </div>
      <div>
        <ModalPopup Component={ProductForm} data={currentProduct} hadnleOpen={isOpenProductModal} hadnleClose={hadnleCloseProductModal} style={"dashboard-product-modal"}/>
      </div>
    </div>
  );
};

export default DashboardProductsTable;

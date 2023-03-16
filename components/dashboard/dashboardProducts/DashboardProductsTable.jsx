import ModalPopup from "@/components/reactModal/ModalPopup";
import { dashboardProductModalState } from "@/lib/atom/dashboardProductModalState";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import DashboardProductTableRow from "./DashboardProductTableRow";

const DashboardProductsTable = ({products}) => {
  const [isOpenProductModal, setOpenProductModal] = useRecoilState(dashboardProductModalState)
  const [currentProduct, setCurrentProduct] = useState(null)
  console.log(products)
  const hadnleCloseProductModal = () => {
    setOpenProductModal(false)
  }
  const handleClick = (_id) => {
    //open modal
    setOpenProductModal(true)

  }
  return (
    <div className="product-table-container">
      <div className="product-table-wrapper">
        <table className="product-table">
          {/* header */}
          <thead className="product-table-header">
            <tr>
              <th scope="col" className="product-table-head">id</th>
              <th scope="col" className="product-table-head">name</th>
              <th scope="col" className="product-table-head">price</th>
              <th scope="col" className="product-table-head">brand</th>
              <th scope="col" className="product-table-head">category</th>
              <th scope="col" className="product-table-head">stock</th>
              <th scope="col" className="product-table-head">created date</th>
              <th scope="col" className="product-table-head">action</th>
            </tr>
          </thead>
          {/* body */}
          <tbody className="product-table-body">
            {products?.map(product => (
              <DashboardProductTableRow handleClick={() => handleClick(product._id)} key={product._id} product={product}/>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <ModalPopup isOpen={isOpenProductModal} hadnleCloseProductModal={hadnleCloseProductModal}/>
      </div>
    </div>
  );
};

export default DashboardProductsTable;

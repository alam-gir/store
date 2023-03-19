import LoaderSVG from "@/components/LoaderSVG";
import { productUpdatemodalState } from "@/lib/atom/modalOpenState";
import { fetchGET } from "@/lib/fetch/fetch";
import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { useRecoilState } from "recoil";
import DashboardProductList from "./DashboardProductList";
import ProductForm from "./ProductForm";

const DashboardProductsTable = () => {
  const [products, setProducts] = useState(null);
  const [isOpenProductUpdateModal, setOpenProductUpdateModal] = useRecoilState(
    productUpdatemodalState
  );
  const [currentProduct, setCurrentProduct] = useState(null);

  useEffect(() => {
    fetchGET("http://localhost:3000/api/db/products").then((data) =>
      setProducts(data.products)
    );
  });

  const handleCloseProductModal = () => {
    setOpenProductModal(false);
    // start body scrolling
    document.body.style.overflow = "unset";
  };
  const handleClick = (_id) => {
    // stop body scrolling
    document.body.style.overflow = "hidden";
    //set current product
    setCurrentProduct(() => {
      return products.filter((product) => product._id === _id)[0];
    });

    //open modal
    setOpenProductUpdateModal(true);
  };
  return (
    <div className="product-table-container">
      <div className="product-table-wrapper">
        {/* header  */}
        <div className="product-table-header">
          <h2 className="product-table-head px-4">id</h2>
          <h2 className="product-table-head">name</h2>
          <h2 className="product-table-head">price</h2>
          <h2 className="product-table-head">brand</h2>
          <h2 className="product-table-head hidden md:inline">category</h2>
          <h2 className="product-table-head hidden md:inline">weight</h2>
          <h2 className="product-table-head hidden md:inline">date</h2>
          <h2 className="product-table-head">action</h2>
        </div>
        {/* body  */}
        <div>
          {!products ? (
            <div className="w-full h-28 flex justify-center items-center">
              <LoaderSVG color={"fill-gray-400"} />
            </div>
          ) : (
            products.map((product) => (
              <DashboardProductList
                key={product?._id}
                product={product}
                handleClick={() => handleClick(product?._id)}
              />
            ))
          )}
        </div>
      </div>
      <div>
        <ReactModal
          isOpen={isOpenProductUpdateModal}
          onRequestClose={() => setOpenProductUpdateModal(false)}
          className="dashboard-product-update-modal"
        >
          <ProductForm
            data={currentProduct}
            handleClose={() => setOpenProductUpdateModal(false)}
          />
        </ReactModal>
      </div>
    </div>
  );
};

export default DashboardProductsTable;

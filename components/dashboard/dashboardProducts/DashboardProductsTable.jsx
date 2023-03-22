import Confirmation from "@/components/confirmation/Confirmation";
import LoaderSVG from "@/components/LoaderSVG";
import {
  productDeleteConfirmationModalState,
  productUpdatemodalState,
} from "@/lib/atom/modalOpenState";
import { fetchGET } from "@/lib/fetch/fetch";
import { updateProduct, deleteProduct } from "@/lib/product/productCRUD";
import { XMarkIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { useRecoilState } from "recoil";
import DashboardProductList from "./DashboardProductList";
import Form from "./Form";

const DashboardProductsTable = () => {
  const [products, setProducts] = useState(null);
  const [isOpenProductUpdateModal, setOpenProductUpdateModal] = useRecoilState(
    productUpdatemodalState
  );
  const [isOpenDeleteConfirmationModal, setOpenDeleteConfirmationModal] =
    useRecoilState(productDeleteConfirmationModalState);
  const [currentProduct, setCurrentProduct] = useState(null);

  useEffect(() => {
    fetchGET("http://localhost:3000/api/db/products").then((data) =>
      setProducts(data.products)
    );
  });

  const changeCurrentProduct = (_id) => {
    setCurrentProduct(() => {
      return products?.filter((product) => product._id === _id)[0];
    });
  };

  const openProductUpdateModal = (_id) => {
    // stop body scrolling
    document.body.style.overflow = "hidden";
    changeCurrentProduct(_id);
    //open modal
    setOpenProductUpdateModal(true);
  };

  const closeProductUpdateModal = () => {
    setOpenProductUpdateModal(false);
    // start body scrolling
    document.body.style.overflow = "unset";
  };
  const openDeleteConfirmationModal = (_id) => {
    // stop body scrolling
    document.body.style.overflow = "hidden";
    changeCurrentProduct(_id);
    //open modal
    setOpenDeleteConfirmationModal(true);
  };

  const closeDeleteConfirmationModal = () => {
    setOpenDeleteConfirmationModal(false);
    // start body scrolling
    document.body.style.overflow = "unset";
  };

  const handleDelete = async (_id) => {
    // close the confirmation modal when clicked
    setOpenDeleteConfirmationModal(false);
    const productDocId = _id;
    //start an toast when fetching start
    deleteProduct(productDocId);
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
            products?.map((product) => (
              <DashboardProductList
                key={product?._id}
                product={product}
                openProductUpdateModal={() =>
                  openProductUpdateModal(product?._id)
                }
                openDeleteConfirmationModal={() =>
                  openDeleteConfirmationModal(product?._id)
                }
              />
            ))
          )}
        </div>
      </div>
      {/* modals  */}
      <div>

        {/* update modal  */}
        <ReactModal
          isOpen={isOpenProductUpdateModal}
          onRequestClose={closeProductUpdateModal}
          className="product-modal"
        >
          <XMarkIcon
            onClick={closeProductUpdateModal}
            className="product-modal-close-icon"
          />
          <div className="product-modal-body">
            <Form
              givenInitial={currentProduct}
              handleConfirm={(data) => updateProduct(data)}
              actionText={"update product"}
              messageText="to update this product click 'update Product'. For cancel procces click 'Cancel'"
            />
          </div>
        </ReactModal>

        {/* delete confirmation modal  */}
        <ReactModal
          isOpen={isOpenDeleteConfirmationModal}
          onRequestClose={closeDeleteConfirmationModal}
          className="h-auto w-auto relative"
        >
          <XMarkIcon
            onClick={closeDeleteConfirmationModal}
            className="product-modal-close-icon"
          />
          <div className="product-modal-body">
            <Confirmation
              actionText={"delete"}
              message={"can't undo the deleted file!"}
              handleClose={closeDeleteConfirmationModal}
              handleConfirm={()=>handleDelete(currentProduct._id)}
            />
          </div>
        </ReactModal>
      </div>
    </div>
  );
};

export default DashboardProductsTable;

import Confirmation from "@/components/confirmation/Confirmation";
import LoaderSVG from "@/components/LoaderSVG";
import { crudState } from "@/lib/atom/crudState";
import {
  productDeleteConfirmationModalState,
  productUpdatemodalState,
} from "@/lib/atom/modalOpenState";
import { updateProduct, deleteProduct } from "@/lib/product/productCRUD";
import { XMarkIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import ReactModal from "react-modal";
import { useRecoilState } from "recoil";
import DashboardProductList from "./DashboardProductList";
import Form from "./Form";

const DashboardProductsTable = ({ products }) => {
  //* state -------------
  const [isOpenProductUpdateModal, setOpenProductUpdateModal] = useRecoilState(
    productUpdatemodalState
  );
  const [isOpenDeleteConfirmationModal, setOpenDeleteConfirmationModal] =
    useRecoilState(productDeleteConfirmationModalState);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [crudAction, setCrudAction] = useRecoilState(crudState);

  //* function ------------

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
  return (
    <div className="product-table-container">
      <div className="product-table-wrapper">
        {/* header  */}
        <div className="product-table-header">
          <h2 className="product-table-head px-4 hidden md:inline">id</h2>
          <h2 className="product-table-head col-span-3 sm:col-span-2">name</h2>
          <h2 className="product-table-head hidden md:inline">price</h2>
          <h2 className="product-table-head hidden sm:inline">brand</h2>
          <h2 className="product-table-head">category</h2>
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
          className="h-auto w-auto"
        >
          <div>
            <Confirmation
              actionText={"delete"}
              message={"can't undo the deleted file!"}
              handleClose={closeDeleteConfirmationModal}
              handleConfirm={() => {
                // close the confirmation modal when clicked
                setOpenDeleteConfirmationModal(false);
                deleteProduct(currentProduct._id).then(() => {
                  setCrudAction((prev) => !prev);
                });
                // handleDelete(currentProduct._id, setCrudAction);
              }}
            />
          </div>
        </ReactModal>
      </div>
    </div>
  );
};

export default DashboardProductsTable;

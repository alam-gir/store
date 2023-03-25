import { toast } from "react-toastify";
import { fetchDELETE, fetchPOST, fetchPUT } from "../fetch/fetch";

const addProduct = async (data, functionForAfterAdd) => {
  const resData = await toast.promise(fetchPOST("/api/db/products", data), {
    pending: "Product adding...",
    success: "Product added successfully",
    error: "Something wrong! please try again.",
  });
  if (resData.success) {
    //after added product successFully run any function
    if (functionForAfterAdd) functionForAfterAdd();
  }
};

//update
const updateProduct = async (data, functionForAfterUpdate) => {
  const resData = await toast.promise(fetchPUT("/api/db/products", data), {
    pending: "Product updating...",
    success: "Product updated successfully",
    error: "Something wrong! please try again.",
  });
  if (resData.success) {
    // aftr updated product successfully run any function
    if (functionForAfterUpdate) functionForAfterUpdate();
  }
};
//delete
const deleteProduct = async (docId, functionForAfterDelete) => {
  const resData = await toast.promise(fetchDELETE("/api/db/products", docId), {
    pending: "Product Deleting...",
    success: "Product deleted successfully",
    error: "Something wrong! please try again.",
  });
  if (resData.success) {
    // aftr updated product successfully run any function
    if (functionForAfterDelete) functionForAfterDelete();
  }
};


export { addProduct, updateProduct, deleteProduct };

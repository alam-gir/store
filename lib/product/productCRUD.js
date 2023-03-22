import { toast } from "react-toastify";
import { fetchDELETE, fetchPOST, fetchPUT } from "../fetch/fetch";

const addProduct = async (data, runFunction) => {
  const resData = await toast.promise(fetchPOST("/api/db/products", data), {
    pending: "Product adding...",
    success: "Product added successfully",
    error: "Something wrong! please try again.",
  });
  if (resData.success) {
    //after added product successFully run any function
    if (runFunction) runFunction();
  }
};

//update
const updateProduct = async (data, runFunction) => {
  const resData = await toast.promise(fetchPUT("/api/db/products", data), {
    pending: "Product updating...",
    success: "Product updated successfully",
    error: "Something wrong! please try again.",
  });
  if (resData.success) {
    // aftr updated product successfully run any function
    if (runFunction) runFunction();
  }
};
//delete
const deleteProduct = async (data, runFunction) => {
  const resData = await toast.promise(fetchDELETE("/api/db/products", data), {
    pending: "Product Deleting...",
    success: "Product deleted successfully",
    error: "Something wrong! please try again.",
  });
  if (resData.success) {
    // aftr updated product successfully run any function
    if (runFunction) runFunction();
  }
};


export { addProduct, updateProduct, deleteProduct };

import { toast } from "react-toastify";
import { fetchPOST, fetchPUT } from "../fetch/fetch";

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
  console.log(resData);
  if (resData.success) {
    // aftr updated product successfully run any function
    if (runFunction) runFunction();
  }
};

export { addProduct, updateProduct };

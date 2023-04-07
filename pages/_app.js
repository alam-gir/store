import "@/styles/globals.css";
import "@/styles/dashboard.css";
import "@/styles/orders.css";
import "@/styles/orders/viewOrdersModal.css"
import "@/styles/orders/productCard.css";
import "@/styles/orderplacedAlert.css"
import "react-toastify/dist/ReactToastify.css";
import { RecoilRoot } from "recoil";
import CartModal from "@/components/CartModal";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }) {

  return (
    <>
      <RecoilRoot>
        <div>
          <CartModal />
        </div>
        <Component {...pageProps} />

        <ToastContainer /> 
      </RecoilRoot>
    </>
  );
}

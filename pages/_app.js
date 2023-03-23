import "@/styles/globals.css";
import "@/styles/dashboard.css";
import "react-toastify/dist/ReactToastify.css";
import CartBtn from "@/components/CartBtn";
import { RecoilRoot } from "recoil";
import CartModal from "@/components/CartModal";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }) {

  return (
    <>
      <RecoilRoot>
        <div className="cart-btn">
          <CartBtn />
        </div>
        <div>
          <CartModal />
        </div>
        <Component {...pageProps} />

        <ToastContainer /> 
      </RecoilRoot>
    </>
  );
}

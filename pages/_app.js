import "@/styles/globals.css";
import "./../components/slickCarousel/slick.css";
import "./../components/slickCarousel/slick-theme.css";
import CartBtn from "@/components/CartBtn";
import {RecoilRoot} from "recoil";
import CartModal from "@/components/CartModal";

export default function App({Component, pageProps}) {
  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />);
  }

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
      </RecoilRoot>
    </>
  );
}

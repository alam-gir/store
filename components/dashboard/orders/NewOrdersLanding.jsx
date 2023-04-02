import OrderCard from "./OrderCard";
import useSWR, { useSWRConfig } from "swr";
import { fetcher } from "@/lib/fetcher/fetcher";
import { useRecoilState } from "recoil";
import { crudOrderState } from "@/lib/atom/dashboard/crudOrder";
import { useEffect, useState } from "react";
import LoaderSVG from "@/components/LoaderSVG";
import { useRouter } from "next/router";
import ReactModal from "react-modal";
import ViewOrders from "./ViewOrders";

const NewOrdersLanding = () => {
  // * states
  const [crudOrderAction, setCrudOrderAction] = useRecoilState(crudOrderState);
  const [queryOrderId, setOrderId] = useState(null);
  const router = useRouter();

  const { data, error, isLoading } = useSWR(
    "/api/db/orders/placeorder",
    fetcher
  );
  //for revalidating / refetching...
  const { mutate } = useSWRConfig();

  // * arrow functions
  const openOrderModal = (id) => {
    //stop body scroll 
    document.body.style.overflow = 'hidden'
    //set new order id
    router.push(
        `/dashboard/orders/new?orderId=${id}`,
        undefined,
        {
          scroll: false,
        }
    )
  }
  const closeOrderModal = () => {
    //start body scroll 
    document.body.style.overflow = 'unset'
    //set Order id to null
    setOrderId(null)
    // back to previous page on router for close modal
    router.push(
        `/dashboard/orders/new`,
        undefined,
        {
          scroll: false,
        }
    )
  }

  // * effects
  useEffect(() => {
    mutate("/api/db/orders/placeorder");
  }, [crudOrderAction]);

  useEffect(() => {
    setOrderId(router.query.orderId);
  }, [router.query.orderId]);

  // * functions

  const orderCards = data?.newOrders?.map((order, index) => {
    return (
      <OrderCard
        key={index}
        typeText="ordered at"
        date={order.orderedAt.toString()}
        id={order._id.toString()}
        name={order.customer.fullName.toString()}
        email={order.customer.email.toString()}
        phone={order.customer.mobileNum.toString()}
        city={order.customer.cityName.toString()}
        division={order.customer.userDistrict.toString()}
        clickHandler={() => openOrderModal(order.orderId)}
      />
    );
  });
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-2 p-2 md:flex-row md:flex-wrap md:p-4">
        {isLoading ? <LoaderSVG color={"fill-gray-400"} /> : orderCards}
      </div>
      <ReactModal
        isOpen={!!queryOrderId}
        onRequestClose={() => closeOrderModal()}
      >
        <ViewOrders order={queryOrderId} />
      </ReactModal>
    </>
  );
};

export default NewOrdersLanding;

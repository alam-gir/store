import OrderCard from "./OrderCard";
import useSWR, { useSWRConfig } from "swr";
import { fetcher } from "@/lib/fetcher/fetcher";
import { useRecoilState } from "recoil";
import { crudOrderState } from "@/lib/atom/dashboard/crudOrder";
import { useEffect } from "react";
import LoaderSVG from "@/components/LoaderSVG";

const NewOrdersLanding = () => {
  const [crudOrderAction, setCrudOrderAction] = useRecoilState(crudOrderState);

  const { data, error, isLoading } = useSWR(
    "/api/db/orders/placeorder",
    fetcher
  );
  console.log({data, isLoading})
  //for revalidating / refetching...
  const { mutate } = useSWRConfig();

  useEffect(() => {
    mutate("/api/db/orders/placeorder");
  }, [crudOrderAction]);

  const orderCards = data?.newOrders?.map((order, index) => {
    return (
      <OrderCard
        key={index}
        date={order.orderedAt.toString()}
        id={order._id.toString()}
        name={order.customer.fullName.toString()}
        email={order.customer.email.toString()}
        phone={order.customer.mobileNum.toString()}
        city={order.customer.cityName.toString()}
        division={order.customer.userDistrict.toString()}
      />
    );
  });
  return (
    <div className="flex flex-col items-center justify-center gap-2 p-2 md:flex-row md:flex-wrap md:p-4">
      {isLoading ? <LoaderSVG color={"fill-gray-400"} /> : orderCards}
    </div>
  );
};

export default NewOrdersLanding;

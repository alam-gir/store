import LoaderSVG from "@/components/LoaderSVG";
import { crudOrderState } from "@/lib/atom/dashboard/crudOrder";
import { fetcher } from "@/lib/fetcher/fetcher";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import useSWR, { useSWRConfig } from "swr";
import InputField from "./InputField";

const ViewOrder = () => {
  const [crudOrderAction, setCrudOrderAction] = useRecoilState(crudOrderState);
  const router = useRouter();
  const orderId = router.query.orderId;
  const { mutate } = useSWRConfig();
  const { data, isLoading, error } = useSWR(
    `/api/db/orders/neworders/${orderId}`,
    fetcher
  );

  // * effetcts
  useEffect(() => {
    mutate(`/api/db/orders/neworders/${orderId}`);
  }, [crudOrderAction]);

  // * elements
  let CustomerDetails;
  if (data) {
    const customerKeys = Object.keys(data?.order?.customer);
    CustomerDetails = customerKeys?.map((key) => {
      const value = data?.order?.customer[key];
      const inputType =
        key === "mobileNum" ? "number" : key === "email" ? "email" : "text";
      return (
        <div className={key}>
          <InputField
            type={inputType}
            name={key}
            placeholder={"your name"}
            value={value}
          />
        </div>
      );
    });
  }

  // if error to fetch order redirect to 404 not found
  if (error) return router.push("/404");
  if (isLoading)
    return (
      <div className="loader-container">
        <LoaderSVG color={"fill-gray-400"} />;
      </div>
    );

  return (
    <div className="view-order">
      <div className="view-order-wrapper">
        {/* date section  */}
        <section className="section date-container">
          <div className="date">
            <label htmlFor="label">ordered at</label>
            <h3 className="value">12/23/20023 09:08 AM</h3>
          </div>
          <div className="date">
            <label htmlFor="date">ordered at</label>
            <h3 className="value">12/23/20023 09:08 AM</h3>
          </div>
          <div className="date">
            <label htmlFor="label">ordered at</label>
            <h3 className="value">12/23/20023 09:08 AM</h3>
          </div>
          <div className="date">
            <label htmlFor="date">ordered at</label>
            <h3 className="value">12/23/20023 09:08 AM</h3>
          </div>
        </section>
        {/* delivery details section  */}
        <section className="section delivery-details">
          <div className="field-container">
            {/* <div className="name">
              <InputField
                type={"text"}
                name={"name"}
                placeholder={"your name"}
                value={"name of customer"}
              />
            </div> */}
            {CustomerDetails}
          </div>
        </section>
        {/* price section  */}
        <section className="section">price section </section>
        {/* action button section  */}
        <section className="section">buttons section </section>
      </div>
    </div>
  );
};

export default ViewOrder;

import { ArrowRightIcon, HomeIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";

const OrdersRoute = () => {
  return (
    <div className="routing-wrapper">
      <Link href={"/dashboard"} className="group routing-link">
        <span className="routing-label">dashboard</span>
        <HomeIcon className="routing-icon" />
      </Link>
      <span>
        <ArrowRightIcon className="h-3" />
      </span>
      <Link href={""} className="group routing-link">
        <span className="routing-label">orders</span>
        <ShoppingBagIcon className="routing-icon" />
      </Link>
    </div>
  );
};

export default OrdersRoute;

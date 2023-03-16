import { ArrowRightIcon, HomeIcon, BriefcaseIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";

const DashboardProductsRoute = () => {
  return (
    <div className="routing-wrapper">
      <Link href={"/dashboard"} className="group routing-link">
        <span className="routing-label">dashboard</span>
        <HomeIcon className="routing-icon" />
      </Link>
      <span>
        <ArrowRightIcon className="h-3" />
      </span>
      <Link href={"/dashboard/products"} className="group routing-link">
        <span className="routing-label">products</span>
        <BriefcaseIcon className="routing-icon" />
      </Link>
    </div>
  );
};

export default DashboardProductsRoute;

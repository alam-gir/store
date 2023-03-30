import DashboardFooter from "@/components/dashboard/DashboardFooter";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardMenu from "@/components/dashboard/DashboardMenu";
import Routes from "@/components/dashboard/routing/Routes";
import {
  ArrowUturnRightIcon,
  CheckIcon,
  DocumentCheckIcon,
  HomeIcon,
  PlusIcon,
  ShoppingBagIcon,
  TruckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";

const Orders = () => {
  const routes = [
    { name: "dashboard", link: "/dashboard", Icon: HomeIcon },
    { name: "orders", link: "", Icon: ShoppingBagIcon },
  ];
  return (
    <div>
      <div>
        <DashboardHeader />
      </div>
      {/* //dashboard routing... */}
      <div className="routing-container">
        <Routes details={routes} />
      </div>
      <div className="landing">
        <div className="landing-wrapper">
          {/* dashboard menu's  */}
          <div className="landing-menu-container">
            <div className="landing-menu">
              <Link href="/dashboard/orders/new">
                <DashboardMenu
                  Icon={PlusIcon}
                  IconCustomStyle={""}
                  quantity={15}
                  tagline={"new orders"}
                  status={25.42}
                />
              </Link>
            </div>
            <div className="landing-menu">
              <Link href="/dashboard/orders/accepted">
                <DashboardMenu
                  Icon={CheckIcon}
                  IconCustomStyle={""}
                  quantity={9}
                  tagline={"accepted orders"}
                  status={40.25}
                />
              </Link>
            </div>

            <div className="landing-menu">
              <Link href="/dashboard/orders/ontheway">
                <DashboardMenu
                  Icon={TruckIcon}
                  IconCustomStyle={""}
                  quantity={"7"}
                  tagline={"on the way"}
                  status={69.12}
                />
              </Link>
            </div>
            <div className="landing-menu">
              <Link href="/dashboard/orders/completed">
                <DashboardMenu
                  Icon={DocumentCheckIcon}
                  IconCustomStyle={""}
                  quantity={1201}
                  tagline={"completed orders"}
                  status={17.47}
                />
              </Link>
            </div>
            <div className="landing-menu">
              <Link href="/dashboard/orders/return">
                <DashboardMenu
                  Icon={ArrowUturnRightIcon}
                  IconCustomStyle={""}
                  quantity={17}
                  tagline={"return orders"}
                  status={3.47}
                />
              </Link>
            </div>
            <div className="landing-menu">
              <Link href="/dashboard/orders/rejected">
                <DashboardMenu
                  Icon={XMarkIcon}
                  IconCustomStyle={""}
                  quantity={17}
                  tagline={"rejected orders"}
                  status={4.86}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div>
        <DashboardFooter />
      </div>
    </div>
  );
};

export default Orders;

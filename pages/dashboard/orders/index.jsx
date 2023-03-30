import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardMenu from "@/components/dashboard/DashboardMenu";
import OrdersRoute from "@/components/dashboard/routing/OrdersRoute";
import {
    ArrowUturnRightIcon,
  BriefcaseIcon,
  CheckIcon,
  CurrencyBangladeshiIcon,
  DocumentCheckIcon,
  PlusIcon,
  ShoppingCartIcon,
  TruckIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";

const Orders = () => {
  return (
    <div>
      <div>
        <DashboardHeader />
      </div>
      {/* //dashboard routing... */}
      <div className="routing-container">
        <OrdersRoute />
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
    </div>
  );
};

export default Orders;

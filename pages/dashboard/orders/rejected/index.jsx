import DashboardFooter from '@/components/dashboard/DashboardFooter';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import Routes from '@/components/dashboard/routing/Routes';
import { HomeIcon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline';
import React from 'react'

const Rejected = () => {
    const routes = [
        { name: "dashboard", link: "/dashboard", Icon: HomeIcon },
        { name: "orders", link: "/dashboard/orders", Icon: ShoppingBagIcon },
        { name: "rejected", link: "", Icon: XMarkIcon },
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
          <div>
            {/* <DashboardLanding /> */}
          </div>
          <div>
            <DashboardFooter />
          </div>
        </div>
      );
}

export default Rejected
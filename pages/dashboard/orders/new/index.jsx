import DashboardFooter from "@/components/dashboard/DashboardFooter";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import NewOrdersLanding from "@/components/dashboard/orders/NewOrdersLanding";
import Routes from "@/components/dashboard/routing/Routes";
import { HomeIcon, PlusIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";

const New = () => {

  const routes = [
    { name: "dashboard", link: "/dashboard", Icon: HomeIcon },
    { name: "orders", link: "/dashboard/orders", Icon: ShoppingBagIcon },
    { name: "new", link: "", Icon: PlusIcon },
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
        <NewOrdersLanding />
      </div>
      <div>
        <DashboardFooter />
      </div>
    </div>
  );
}

export default New
import DashboardFooter from "@/components/dashboard/DashboardFooter";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardLanding from "@/components/dashboard/DashboardLanding";
import Routes from "@/components/dashboard/routing/Routes";
import { HomeIcon } from "@heroicons/react/24/outline";
const Dashboard = () => {

  const routes = [
    { name: "dashboard", link: "", Icon: HomeIcon },
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
        <DashboardLanding />
      </div>
      <div>
        <DashboardFooter />
      </div>
    </div>
  );
};

export default Dashboard;
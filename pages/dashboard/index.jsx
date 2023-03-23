import DashboardFooter from "@/components/dashboard/DashboardFooter";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardLanding from "@/components/dashboard/DashboardLanding";
import DashboardRoute from "@/components/dashboard/routing/DashboardRoute";
const Dashboard = () => {
  return (
    <div>
      <div>
        <DashboardHeader />
      </div>
      {/* //dashboard routing... */}
      <div className="routing-container">
        <DashboardRoute />
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
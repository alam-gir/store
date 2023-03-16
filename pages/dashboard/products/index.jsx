import DashboardFooter from "@/components/dashboard/DashboardFooter";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardProducts from "@/components/dashboard/DashboardProducts";
import DashboardProductsRoute from "@/components/dashboard/routing/DashboardProductsRoute";

const index = () => {
  return (
    <div>
      <div>
        <DashboardHeader />
      </div>
      {/* //dashboard routing... */}
      <div className="routing-container">
        <DashboardProductsRoute />
      </div>
      <div>
        <DashboardProducts />
      </div>
      <div>
        <DashboardFooter />
      </div>
    </div>
  );
};

export default index;

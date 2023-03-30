import DashboardFooter from "@/components/dashboard/DashboardFooter";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardProducts from "@/components/dashboard/dashboardProducts/DashboardProducts";
import Routes from "@/components/dashboard/routing/Routes";
import { BriefcaseIcon, HomeIcon } from "@heroicons/react/24/outline";

const index = () => {

  const routes = [
    { name: "dashboard", link: "/dashboard", Icon: HomeIcon },
    { name: "products", link: "", Icon: BriefcaseIcon },
  ];
  return (
    <div>
      <div>
        <DashboardHeader />
      </div>
      {/* //dashboard routing... */}
      <div className="routing-container">
        <Routes details={routes}/>
      </div>
      <div>
        <DashboardProducts/>
      </div>
      <div>
        <DashboardFooter />
      </div>
    </div>
  );
};

export default index;

// export const getServerSideProps = async () => {
//   const res = await fetch("http://localhost:3000/api/db/products")
//   const data = await res.json()
//   return {
//     props:{
//       products: data?.products
//     }
//   }
// }

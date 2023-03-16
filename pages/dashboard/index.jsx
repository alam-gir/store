import AddProductForm from "@/components/AddProductForm";
import Button from "@/components/Button";
import DashboardFooter from "@/components/dashboard/DashboardFooter";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardLanding from "@/components/dashboard/DashboardLanding";
import DashboardRoute from "@/components/dashboard/routing/DashboardRoute";
import { verifyUser } from "@/lib/jwt/jwtVerify";
import { textEncode } from "@/lib/textEncoder/encodeText";
import { ArrowRightIcon, HomeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";
const Dashboard = ({ admin }) => {
  const router = useRouter();
  const handleSignout = async () => {
    const res = await fetch("/api/auth/dashboard/signout"); //for remove token
    const data = await res.json();
    if (data.success) {
      // redirect to signin page
      router.push("http://localhost:3000/auth/dashboard/signin");
    } else {
      console.log(data);
    }
  };
  return (
    <div>
      <div>
        <DashboardHeader />
      </div>
      {/* //dashboard routing... */}
      <div className="routing-container">
        <DashboardRoute />
        {/* <div className="routing-wrapper">
          <Link href={"/dashboard"} className="group routing-link">
            <span className="routing-label">dashboard</span>
            <HomeIcon className="routing-icon" />
          </Link>
        </div> */}
      </div>
      <div>
        <DashboardLanding />
      </div>
      <div>
        <DashboardFooter />
      </div>
      <div className="px-20">
        <div className="flex justify-between py-2">
          <h1>Dashboard</h1>
          <div>
            <h1>{admin.email}</h1>
            <div>
              <Button
                text={"sign out"}
                bgColor={"bg-[#e50914]"}
                textColor={"text-white"}
                textSize={"text-sm"}
                handleClick={handleSignout}
              />
            </div>
          </div>
        </div>
        <div className="p-4">
          <AddProductForm />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

//define layout
Dashboard.getLayout = function PageLayout(page) {
  return <>{page}</>;
};

export const getServerSideProps = async (context) => {
  const secret = textEncode(process.env.SECRET_JWT);
  const adminJWT = context.req.cookies.adminJWT;
  const verifiedAdmin = await verifyUser(adminJWT, secret);
  const admin = verifiedAdmin.payload;
  return {
    props: {
      admin,
    },
  };
};

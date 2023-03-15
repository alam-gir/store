import AddProductForm from "@/components/AddProductForm";
import Button from "@/components/Button";
import { verifyUser } from "@/lib/jwt/jwtVerify";
import { textEncode } from "@/lib/textEncoder/encodeText";
import { useRouter } from "next/router";
const Dashboard = ({ admin }) => {
  const router = useRouter()
  const handleSignout = async () => {
    const res = await fetch('/api/auth/dashboard/signout') //for remove token
    const data = await res.json()
    if(data.success){
      console.log(data)
      // redirect to signin page
      router.push('http://localhost:3000/auth/dashboard/signin')
    }else{
      console.log(data)
    }
  };
  return (
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

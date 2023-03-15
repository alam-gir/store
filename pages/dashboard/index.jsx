import AddProductForm from "@/components/AddProductForm";
import { verifyUser } from "@/lib/jwt/jwtVerify";
import { textEncode } from "@/lib/textEncoder/encodeText";
const Dashboard = ({admin}) => {
  return (
    <div className="px-20">
      <div className="flex justify-between py-2">
        <h1>Dashboard</h1>
        <h1>{admin.email}</h1>
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
  const secret = textEncode(process.env.SECRET_JWT)
  const adminJWT = context.req.cookies.adminJWT
  const verifiedAdmin = await verifyUser(adminJWT,secret)
  const admin = verifiedAdmin.payload
  return {
    props : {
      admin
    }
  }
}
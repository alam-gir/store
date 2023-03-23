import { verifyUser } from "@/lib/jwt/jwtVerify";
import { textEncode } from "@/lib/textEncoder/encodeText";

const user = async (req, res) => {
  try {
    const secret = textEncode(process.env.SECRET_JWT);
    const adminJWT = req.cookies.adminJWT;
    const user = await verifyUser(adminJWT, secret);

    return res.status(200).json({ success: true, user: user.payload });
  } catch (error) {
    return res.status(404).json({ success: false, user: "not logged in" });
  }
};

export default user;

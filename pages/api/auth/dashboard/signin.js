import { connectMongoDB } from "@/lib/mongodb/connectDB";
import { textEncode } from "@/lib/textEncoder/encodeText";
import { serialize } from "cookie";
import { SignJWT } from "jose";

const secret = textEncode(process.env.SECRET_JWT);
const signin = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;
    try {
      // connect db
      const { db } = await connectMongoDB();
      // find user with email and password
      const user = await db
        .collection("admins")
        .findOne({ email: data.email, password: data.password });
      if (user) {
        // create token,
        const JWT = await new SignJWT(user)
          .setProtectedHeader({ alg: "HS256" })
          .setExpirationTime("1d")
          .setJti()
          .sign(secret);

        //serialize for set cookie
        const serialized = serialize("adminJWT", JWT, {
          httpOnly: true,
          sameSite: true,
          secure: true,
          maxAge: 60 * 60 * 24, // 1 day
          path: "/",
        });

        res.setHeader("Set-Cookie", serialized);
        // set cookies
        return res
          .status(200)
          .json({
            success: true,
            status: "success",
            message: "user logged in",
          });
      } else {
        return res
          .status(404)
          .json({
            success: false,
            status: "notFound",
            message: "user not found.",
          });
      }
    } catch (error) {
      console.log(error.message);
      return res.send({
        success: false,
        status: "error",
        error: error.message,
      });
    }
  }
  return res
    .status(500)
    .json({
      success: false,
      status: "error",
      message: "Internal server error!",
    });
};

export default signin;

import { connectMongoDB } from "@/lib/mongodb/connectDB";

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
        // set cookies 
        return res.status(200).json({ success: true, message: 'user finded.' });
      } else {
        return res.status(404).json({ success: false, message: 'user not found.' });
      }
    } catch (error) {
      console.log(error.message);
      return res.send(error.message);
    }
  }
  return res
    .status(500)
    .json({ success: false, message: "Internal server error!" });
};

export default signin;

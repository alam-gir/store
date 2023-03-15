// if someone try to do any admin action he have to pass this verification.

import { connectMongoDB } from "@/lib/mongodb/connectDB";

const passwordVerify = async (req, res) => {
  if (req.method === "POST") {
    try {
      //grab client data
      const givenAdmin = req.body; // admin should send {email:...., password:....}
      // connect db
      const { db } = await connectMongoDB();
      if (req.body.email?.trim() && req.body.password?.trim()) {
        // get admin from server
        const admin = (
          await db
            .collection("admins")
            .find({ email: givenAdmin.email })
            .toArray()
        )[0];

        if (admin?.password === givenAdmin.password) {
          return res
            .status(200)
            .json({ success: true, message: "password matched." });
        } else {
          return res.send({ success: false, message: "wrong password." });
        }
      } else{
        return res.send({ success: false, message: "empty credentials." });
      }
    } catch (error) {
      return res.send({ success: false, message: error.message });
    }
  }
  return res.status(200).json({ success: true, message: "No Data." });
};

export default passwordVerify;

import { connectMongoDB } from "@/lib/mongodb/connectDB";

const handler = async (req, res) => {
  const orderId = req.query.orderId;
  try {
    //connect db
    const { db } = await connectMongoDB();
    // get order
    const order = await db
      .collection("neworders")
      .findOne({ orderId: orderId });
    if (!order) {
      res
        .status(404)
        .json({
          success: false,
          message: "order id is not valid!, order not found!",
        });
    }
    return res.status(200).json({ success: true, order });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export default handler;

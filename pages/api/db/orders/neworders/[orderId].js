import { connectMongoDB } from "@/lib/mongodb/connectDB";

const handler = async (req, res) => {
  if (req.method === "GET") {
    const orderId = req.query.orderId;
    try {
      //connect db
      const { db } = await connectMongoDB();
      // get order
      const order = await db
        .collection("neworders")
        .findOne({ orderId: orderId });
      if (!order) {
        res.status(404).json({
          success: false,
          message: "order id is not valid!, order not found!",
        });
      }
      return res.status(200).json({ success: true, order });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  if (req.method === "POST") {
    const data = req.query; // {orderId: '1111', newValue:{name:value}}
    const field = `customer.${data.field}`;
    try {
      // connect db
      const { db } = await connectMongoDB();
      // update document
      const updateRes = await db
        .collection("neworders")
        .updateOne(
          { orderId: data.orderId },
          { $set: { [field]: data.value } }
        );

      return res.status(200).json({ success: true, updateRes });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
};

export default handler;

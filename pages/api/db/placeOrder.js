import { connectMongoDB } from "@/lib/mongodb/connectDB";

const placeOrder = async (req, res) => {
  if (req.method === "POST") {
    // grab data
    const data = req.body;
    //set data to db in order collection
    try {
      // connect db
      const { db } = await connectMongoDB();
      // store data
      const order = await db
        .collection("orders")
        .insertOne({ ...data, orderDate: new Date()});
        return res.status(201).json({success: true, message: 'order placed.'})
    } catch (error) {
      return res.send({ success: false, message: error.message });
    }
  }
  return res.status(200).json({ success: true, message: "No Data." });
};

export default placeOrder;

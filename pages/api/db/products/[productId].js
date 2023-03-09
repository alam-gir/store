import { connectMongoDB } from "@/lib/mongodb/connectDB";

const signleProduct = async (req, res) => {
  const productId = req.query.productId
  try {
    // connect db
    const { db } = await connectMongoDB();
    // find single data by query
    const product = await db.collection("products").findOne({ id: productId });
    if (product) {
        return res.status(200).json({success: true, product})
    } else {
      return res.send({ success: false, message: "No Product Founds." });
    }
  } catch (error) {
    return res.send({ success: false, message: error.message });
  }
};

export default signleProduct;

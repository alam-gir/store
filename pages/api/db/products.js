import { connectMongoDB } from "@/lib/mongodb/connectDB";

const handler = async (req, res) => {
  if (req.method === "POST") {
    //grab data from client side

    const data = req.body;
    // before try, check that data has not any undefined value***
    const submitCondition =
      data.id.trim() &&
      data.name.trim() &&
      data.description.trim() &&
      data.weight.trim() &&
      data.price.trim() &&
      data.discountPercentage.trim() &&
      data.brand.trim() &&
      data.category.trim() &&
      data.stock.trim();

    if (submitCondition) {
      try {
        //connect db
        const { db } = await connectMongoDB();

        // then we will store client data in our data base
        const product = await db
          .collection("products")
          .insertOne({ ...data, createdAt: new Date() });
        console.log(product);
        // then we will send a response that data added.
        return res
          .status(201)
          .json({ success: true, message: "product added." });
      } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
      }
    } else{
      return res.status(404).json({success: false, message: 'Some field maybe empty. please fill required fieled!'})
    }
  }
  return res.status(500).json({ message: "internal server error" });
};

export default handler;

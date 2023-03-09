import { connectMongoDB } from "@/lib/mongodb/connectDB";

const handler = async (req, res) => {
  if(req.method === "GET"){
    try {
      // connect db
      const { db } = await connectMongoDB()      
      // find all products
      const products = await db.collection('products').find().toArray()

      return res.status(200).json({success: true, products})
    } catch (error) {
      return res.status(200).json({success: true, message: 'No Data For Get.'})
    }
  }

  // add products to db
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
          .insertOne({ ...data, createdAt: new Date().toLocaleString() });
        console.log(product);
        // then we will send a response that data added.
        return res
          .status(201)
          .json({ success: true, message: "Product added." });
      } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
      }
    } else{
      return res.send({success: false, status: 'empty', message: 'Please fill required fieled!'})
    }
  }
  if(req.method === "PUT"){
    // update the post
  }
  if(req.method === "DELETE"){
    // delete the post
  }
  return res.status(500).json({ message: "internal server error" });
};

export default handler;

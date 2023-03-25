import { getPriceDetails } from "@/lib/mongodb/calculatePoductsPrice";
import { connectMongoDB } from "@/lib/mongodb/connectDB";
import { findDocumentsWithObjectIds } from "@/lib/mongodb/queryFunctions";
import { ObjectId } from "mongodb";

const placeorder = async (req, res) => {
  if (req.method === "POST") {
    const { customer, localCart } = req.body;
    if (customer && localCart) {
      //execute if customer and porducts id available.......
      try {
        // convert ids to ObjectIds
        const localCartObjectIds = localCart.map(
          (product) => new ObjectId(product.id)
        );

        // connect db
        const { db } = await connectMongoDB();

        // find products
        const products = await findDocumentsWithObjectIds(
          db,
          "products",
          localCartObjectIds
        );

        // modify products with quantity
        const modifiedProducts = products.map((product) => {
          let temp;
          for (let item of localCart) {
            if (item.id === product._id.toString()) {
              temp = {
                ...product,
                quantity: item.quantity,
                orderedAt: new Date().toLocaleString(),
              };
            }
          }
          return temp;
        });

        //priceDetails get
        const priceDetails = getPriceDetails(modifiedProducts);
        // create an object of orders....
        const newOrderObj = {
          customer,
          order: { products: modifiedProducts, priceDetails },
        };
        // set order to db
        const newOrder = await db
          .collection("neworders")
          .insertOne(newOrderObj);

        // update order with orderId
        await db
          .collection("neworders")
          .updateOne(
            { _id: newOrder.insertedId },
            { $set: { orderId: newOrder.insertedId } }
          );

        if (newOrder.acknowledged) {
          return res
            .status(201)
            .json({
              success: true,
              message: "order placed",
              orderId: newOrder.insertedId,
            });
        } else {
          return res.send({ success: false, message: "order dosent placed." });
        }
      } catch (error) {
        console.log(error.message);
        return res.send({ success: false, message: error.message });
      }
    } else {
      return res
        .status(404)
        .json({ success: false, message: "customer or products not founds." });
    }
  }
  return res.status(200).json({ success: false, message: "No Data." });
};

export default placeorder;

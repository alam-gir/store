import { connectMongoDB } from "@/lib/mongodb/connectDB";
import { ObjectId } from "mongodb";

const cart = async (req, res) => {
  if (req.method === "GET") {
  }
  if (req.method === "POST") {
    // get an array of products id
    const localCartProducts = req.body; // [{id:..., quantity:..},{id:..., quantity:..}]

    if (localCartProducts.length > 0) {
      try {
        // convert ids to ObjectIds
        const objectedIds = localCartProducts.map(
          (product) => new ObjectId(product.id)
        );

        //connect db
        const { db } = await connectMongoDB();

        // find products
        const products = await db
          .collection("products")
          .find({
            _id: {
              $in: objectedIds,
            },
          })
          .toArray();

        // modify products with quantity
        const modifiedProducts = products.map((product) => {
          // console.log(product._id.toString())
          let temp;
          for (let item of localCartProducts) {
            console.log(item.id === product._id.toString());
            if (item.id === product._id.toString()) {
              temp = { ...product, quantity: item.quantity };
            }
          }
          return temp;
        });
        console.log({ modifiedProducts });
        // calculate price
        const priceDetails = modifiedProducts.reduce(
          (prevValue, currentValue, index) => {
            let totalAmount = (prevValue.totalAmount += parseInt(
              currentValue.price
            ));
            let bagDiscount = (prevValue.bagDiscount = 0); // implement will later
            let estimatedText = (prevValue.estimatedText = 0); // implement will later
            let devlivaryCharge = prevValue.devlivaryCharge;
            prevValue.subTotal =
              totalAmount + estimatedText + devlivaryCharge - bagDiscount;
            return prevValue;
          },
          {
            totalAmount: 0,
            bagDiscount: 0,
            estimatedText: 0,
            devlivaryCharge: 60,
            subTotal: 0,
          }
        );

        //response
        return res
          .status(200)
          .json({
            success: true,
            cart: { products: modifiedProducts, priceDetails },
          });
      } catch (error) {
        console.log(error.message);
        return res.send({ success: false, message: error.message });
      }
    } else {
      return res.send({ success: false, message: "not founds" });
    }
  }

  return res
    .status(500)
    .json({ success: false, message: "internal server error" });
};

export default cart;

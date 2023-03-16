import { getPriceDetails } from "@/lib/mongodb/calculatePoductsPrice";
import { connectMongoDB } from "@/lib/mongodb/connectDB";
import { findDocumentsWithObjectIds } from "@/lib/mongodb/queryFunctions";
import { ObjectId } from "mongodb";

const cart = async (req, res) => {
  if (req.method === "GET") {
  }
  if (req.method === "POST") {
    // get an array of products id
    const localCartProductsId = req.body; // [{id:..., quantity:..},{id:..., quantity:..}]

    if (localCartProductsId.length > 0) {
      try {
        // convert ids to ObjectIds
        const cartProductObjectdIds = localCartProductsId.map(
          (product) => new ObjectId(product.id)
        );

        //connect db
        const { db } = await connectMongoDB();

        // find products
        const products = await findDocumentsWithObjectIds(db,"products", cartProductObjectdIds)
        // const products = await db
        //   .collection("products")
        //   .find({
        //     _id: {
        //       $in: cartProductObjectedIds,
        //     },
        //   })
        //   .toArray();

        // modify products with quantity
        const modifiedProducts = products.map((product) => {
          let temp;
          for (let item of localCartProductsId) {
            if (item.id === product._id.toString()) {
              temp = { ...product, quantity: item.quantity };
            }
          }
          return temp;
        });

        // calculate price
        const priceDetails = getPriceDetails(modifiedProducts)
        // const priceDetails = modifiedProducts.reduce(
        //   (prevValue, currentValue) => {
        //     // calculate a product price
        //     const productPrice = parseInt(currentValue.quantity) * parseInt(currentValue.price)

        //     //sum product price
        //     prevValue.totalAmount += productPrice 
        //     prevValue.bagDiscount = prevValue.bagDiscount = 0; // implement will later
        //     prevValue.estimatedTax = prevValue.estimatedTax = 0; // implement will later
        //     prevValue.deliveryCharge = prevValue.deliveryCharge;
        //     prevValue.subTotal =
        //       prevValue.totalAmount +
        //       prevValue.estimatedTax +
        //       prevValue.deliveryCharge -
        //       prevValue.bagDiscount;
        //     return prevValue;
        //   },
        //   {
        //     totalAmount: 0,
        //     bagDiscount: 0,
        //     estimatedTax: 0,
        //     deliveryCharge: 60,
        //     subTotal: 0,
        //   }
        // );

        //response
        return res.status(200).json({
          success: true,
          cart: { products: modifiedProducts, priceDetails },
        });
      } catch (error) {
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

import { customerTemplate, sellerTemplate } from "@/lib/mail/sellerTemplate";
import { sendMailThroughNodemailer } from "@/lib/mail/sendMail";
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
            if (item.id === product._id.toLocaleString()) {
              temp = {
                ...product,
                quantity: item.quantity,
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
        await db.collection("neworders").updateOne(
          { _id: newOrder.insertedId },
          {
            $set: {
              orderId: newOrder.insertedId.toLocaleString(),
              orderedAt: new Date().toLocaleString(),
            },
          }
        );

        if (newOrder.acknowledged) {
          // find product for getting new order data for email design
          const finalOrder = await db
            .collection("neworders")
            .findOne({ _id: newOrder.insertedId });

          // send email
          const sellerMail = `"RamzanStore" <${process.env.GMAIL}>`;
          const subjectForSeller = "alhamdulillah. a new order request";
          const htmlForSeller = sellerTemplate(finalOrder); // "<b>alhamdulillah. a new order request. from html.</b>"
          const customerMail = `"${customer.fullName}" <${customer.email}>`;
          const subjectForCustomer =
            "jazakumullah for your order! Stay with us..";
          const htmlForCustomer =
            "<b>jazakumullah for your order! Stay with us. from html.</b>";

          // to customer
          await sendMailThroughNodemailer(
            sellerMail,
            customerMail,
            subjectForCustomer,
            "",
            htmlForCustomer
          );
          // to seller
          await sendMailThroughNodemailer(
            customerMail,
            sellerMail,
            subjectForSeller,
            "",
            htmlForSeller
          );

          //return response
          return res.status(201).json({
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

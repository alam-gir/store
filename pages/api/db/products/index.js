import { connectMongoDB } from "@/lib/mongodb/connectDB";
import { firebaseStorage } from "@/lib/firebase/firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      // connect db
      const { db } = await connectMongoDB();
      // find all products
      const products = await db.collection("products").find().toArray();

      return res.status(200).json({ success: true, products });
    } catch (error) {
      return res
        .status(200)
        .json({ success: true, message: "No Data For Get." });
    }
  }

  // add products to db
  if (req.method === "POST") {
    //grab data from client side
    const productInfo = req.body.productInfo;
    const productImages = req.body.productImages;

    // before try, check that productInfo has not any undefined value***
    const submitCondition =
      productInfo.id.trim() &&
      productInfo.name.trim() &&
      productInfo.description.trim() &&
      productInfo.weight.trim() &&
      productInfo.price.trim() &&
      productInfo.discountPercentage.trim() &&
      productInfo.brand.trim() &&
      productInfo.category.trim() &&
      productInfo.stock.trim();

    const errorMessage = () => {
      return productImages.length <= 0
        ? "need image"
        : "fill the required fieled!";
    };

    if (submitCondition && productImages?.length) {
      try {
        //connect db
        const { db } = await connectMongoDB();

        // then we will store client productInfo in mongodb
        const productDoc = await db
          .collection("products")
          .insertOne({
            ...productInfo,
            createdAt: new Date().toLocaleString(),
          });

        // grab the productDoc inserted id from mongodb
        const productDocId = productDoc.insertedId;

        //  store the images in firebase storage
        await Promise.all(productImages.map((image,index) => {
          const imageRef = ref(firebaseStorage, `productImages/${productDocId}/images${index}`)
          uploadString(imageRef, image, 'data_url').then(async()=>{
            const downloadUrl = await getDownloadURL(imageRef)
            // update the document with dwonloadurl
            db.collection('products').updateOne({_id:productDocId},{ $push: {images: downloadUrl}})
          })
        }))

        // then we will send a response that productInfo added.
        return res
          .status(201)
          .json({ success: true, message: "Product added." });
      } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
      }
    } else {
      return res.send({
        success: false,
        status: "empty",
        message: errorMessage(),
      });
    }
  }
  if (req.method === "PUT") {
    // update the post
  }
  if (req.method === "DELETE") {
    // delete the post
  }
  return res.status(500).json({ message: "internal server error" });
};

export default handler;
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '4mb',
    },
  },
}

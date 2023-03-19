import { connectMongoDB } from "@/lib/mongodb/connectDB";
import { firebaseStorage } from "@/lib/firebase/firebase";
import {
  deleteObject,
  getDownloadURL,
  listAll,
  ref,
  uploadString,
} from "firebase/storage";
import { ObjectId } from "mongodb";
import { checkURLProtocol } from "@/lib/checkURLProtocol/checkURLProtocal";
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
    const { productInfo, productImages } = req.body;

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
        const productDoc = await db.collection("products").insertOne({
          ...productInfo,
          createdAt: new Date().toLocaleString(),
        });

        // grab the productDoc inserted id from mongodb
        const productDocId = productDoc.insertedId;

        //  store the images in fire storage
        await Promise.all(
          productImages.map((image) => {
            const imageRef = ref(
              firebaseStorage,
              `productImages/${productDocId}/images${Date.now()}`
            );
            uploadString(imageRef, image, "data_url").then(async () => {
              const downloadUrl = await getDownloadURL(imageRef);
              // update the document with dwonloadurl
              db.collection("products").updateOne(
                { _id: productDocId },
                { $push: { images: downloadUrl } }
              );
            });
          })
        );

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
    //grab data from client side
    const { productDocId, newProductInfo, newProductImages } = req.body;

    // before try, check that productInfo has not any undefined value***
    // const submitCondition =
    //   newProductInfo.id.trim() &&
    //   newProductInfo.name.trim() &&
    //   newProductInfo.description.trim() &&
    //   newProductInfo.weight.trim() &&
    //   newProductInfo.price.trim() &&
    //   newProductInfo.discountPercentage.trim() &&
    //   newProductInfo.brand.trim() &&
    //   newProductInfo.category.trim() &&
    //   newProductInfo.stock.trim();

    const errorMessage = () => {
      return newProductImages.length <= 0
        ? "need image"
        : "fill the required fieled!";
    };
    if (productDocId) {
      try {
        //connect db
        const { db } = await connectMongoDB();
        // update the document
        const documentUpdateResponse = await db
          .collection("products")
          .updateOne(
            { _id: new ObjectId(productDocId) },
            {
              $set: newProductInfo,
              $currentDate: { lastModified: true },
            }
          );

        if (newProductImages) {
          console.log(newProductImages);
          // image can two types. can http link and can data_url. data_url based images means new image. and http link image means old image. they already has in fire storage thats why links available.
          const dataUrlImages = newProductImages.filter(
            (image) => checkURLProtocol(image) === "data"
          );
          const httpurlImages = newProductImages.filter(
            (image) =>
              checkURLProtocol(image) === "http" ||
              checkURLProtocol(image) === "https"
          );
          console.log({
            dataImg: dataUrlImages.length,
            httpImg: httpurlImages.length,
          });

          // **** notes step
          // at firts check that any old image missing or if missing then remove from storage and database also
          // if new image then put them in storage and get link and set in database

          // if old image missing from newProductImages then delete from storage and db
          // get list from storage
          let imagesFolderRef = ref(
            firebaseStorage,
            `productImages/${productDocId}`
          );
          listAll(imagesFolderRef).then((res) => {
            res.items.forEach(async (item, index) => {
              const imageRef = ref(firebaseStorage, item.fullPath);
              const imageLink = await getDownloadURL(imageRef);
              if (!httpurlImages.includes(imageLink)) {
                //delete from database
                db.collection("products").updateOne(
                  { _id: new ObjectId(productDocId) },
                  {
                    $pull: { images: imageLink },
                    $currentDate: { lastModified: true },
                  }
                );
                // delete from storage
                deleteObject(imageRef)
                  .then((res) => console.log("deleted"))
                  .catch((err) => console.log(err.message));
                console.log("deleted", imageLink);
              }
            });
          });
          // if new image is available then store then in storage and get downloadlink then set the download link in database

          if (dataUrlImages.length) {
            await Promise.all(
              dataUrlImages.map((image) => {
                const imageRef = ref(
                  firebaseStorage,
                  `productImages/${productDocId}/images${Date.now()}`
                );
                uploadString(imageRef, image, "data_url").then(async () => {
                  const downloadUrl = await getDownloadURL(imageRef);
                  // update the document with newProductsImage dwonloadurl
                  await db
                    .collection("products")
                    .updateOne(
                      { _id: new ObjectId(productDocId) },
                      { $push: { images: downloadUrl } }
                    );
                });
              })
            );
          }
        }
        // then we will send a response that productInfo added.
        return res.status(201).json({
          success: true,
          message: "Product updated.....",
          res: documentUpdateResponse,
        });
      } catch (error) {
        console.log(error.message);
        return res.send({ success: false, message: error.message });
      }
    } else {
      return res.send({ sucess: false, message: "no data founds" });
    }
  }

  if (req.method === "DELETE") {
    const productDocId = req.body._id;
    try {
      //connect db
      const { db } = await connectMongoDB();
      // delete product
      const res = await db
        .collection("products")
        .deleteOne({ _id: new ObjectId(productDocId) });
      console.log("delete response", res);
      return res
        .status(200)
        .json({
          success: true,
          message: `successfully deleted product _id: ${productDocId}`,
        });
    } catch (error) {
      return res.send({ success: false, message: error.message });
    }
    console.log(id);
    return res.status(200).json({ success: true, id });
  }
  return res.status(500).json({ message: "internal server error" });
};

export default handler;
export const config = {
  api: {
    bodyParser: {
      sizeLimit: "4mb",
    },
  },
};

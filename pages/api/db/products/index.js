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

  // add
  if (req.method === "POST") {
    //grab data from client side
    const product = req.body;

    const errorMessage = () => {
      return product.images.length <= 0
        ? "need image"
        : "fill the required fieled!";
    };

    if (product?.images?.length) {
      try {
        //connect db
        const { db } = await connectMongoDB();

        // then we will store client productInfo in mongodb
        const productDoc = await db.collection("products").insertOne({
          ...product,
          images: [], //because images will push from fireStorage
          createdAt: new Date().toLocaleString(),
        });

        // grab the productDoc inserted id from mongodb
        const productDocId = productDoc.insertedId;

        //  store the images in fire storage
        await Promise.all(
          product.images.map((image) => {
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

  // update
  if (req.method === "PUT") {
    //grab data from client request

    const product = req.body;
    const productDocId = product._id;
    let productImages = product.images;
    const { _id, lastModified, images, ...productWithoutImages } = product;

    try {
      // connect db
      const { db } = await connectMongoDB();
      // update the document without image
      await db.collection("products").updateOne(
        { _id: new ObjectId(productDocId) },
        {
          $set: productWithoutImages,
          $currentDate: { lastModified: true },
        }
      );
      // removed old images clean from storage **must run in all request
      const refImagesFolder = ref(
        firebaseStorage,
        `productImages/${productDocId}`
      );
      // get list all images from folder
      listAll(refImagesFolder).then(async (res) => {
        res.items.forEach(async (item) => {
          // get images ref
          const refImage = ref(firebaseStorage, item.fullPath);
          //get the download link of this image
          const dUrl = await getDownloadURL(refImage);
          // if not includes in productImages, then remove from storage
          if (!productImages.includes(dUrl)) {
            //remove from storage
            await deleteObject(refImage);
            // remove from db
            await db.collection("products").updateOne(
              {
                _id: new ObjectId(productDocId)
              },
              { $pull: { images: dUrl } }
            );
          }
        });
      });

      // check images , if any data images
      await Promise.all(
        productImages.forEach((image) => {
          if (checkURLProtocol(image) === "data") {
            // store in storage
            const refImage = ref(
              firebaseStorage,
              `productImages/${productDocId}/images${Date.now()}`
            );
            uploadString(refImage, image, "data_url").then(async (res) => {
              const dUrl = await getDownloadURL(refImage);
              // push this image link in db
              await db.collection("products").updateOne(
                { _id: new ObjectId(productDocId) },
                {
                  $push: { images: dUrl },
                }
              );
            });
            //remove data image from productImages
          }
        })
      );

      // then we will send a response that productInfo added.
      return res.status(201).json({
        success: true,
        message: "Product updated.....",
        res: documentUpdateResponse,
      });
    } catch (error) {
      return res.send({ success: false, message: error.message });
    }

    // const errorMessage = () => {
    //   return updatedProduct.images.length <= 0
    //     ? "need image"
    //     : "fill the required fieled!";
    // };
    // if (productDocId) {
    //   try {
    //     //connect db
    //     const { db } = await connectMongoDB();
    //     // update the document
    //     const documentUpdateResponse = await db
    //       .collection("products")
    //       .updateOne(
    //         { _id: new ObjectId(productDocId) },
    //         {
    //           $set: updatedProduct,
    //           $currentDate: { lastModified: true },
    //         }
    //       );

    //     if (updatedProduct.images) {
    //       // image can two types. can http link and can data_url. data_url based images means new image. and http link image means old image. they already has in fire storage thats why links available.
    //       const dataUrlImages = updatedProduct?.images?.filter(
    //         (image) => checkURLProtocol(image) === "data"
    //       );
    //       const httpurlImages = updatedProduct?.images?.filter(
    //         (image) =>
    //           checkURLProtocol(image) === "http" ||
    //           checkURLProtocol(image) === "https"
    //       );

    //       // **** notes step
    //       // at firts check that any old image missing or if missing then remove from storage and database also
    //       // if new image then put them in storage and get link and set in database

    //       // if old image missing from newProductImages then delete from storage and db
    //       // get list from storage
    //       let imagesFolderRef = ref(
    //         firebaseStorage,
    //         `productImages/${productDocId}`
    //       );
    //       listAll(imagesFolderRef).then((res) => {
    //         res.items.forEach(async (item, index) => {
    //           const imageRef = ref(firebaseStorage, item.fullPath);
    //           const imageLink = await getDownloadURL(imageRef);
    //           if (!httpurlImages.includes(imageLink)) {
    //             //delete from database
    //             db.collection("products").updateOne(
    //               { _id: new ObjectId(productDocId) },
    //               {
    //                 $pull: { images: imageLink },
    //                 $currentDate: { lastModified: true },
    //               }
    //             );
    //             // delete from storage
    //             deleteObject(imageRef).catch((err) => console.log(err.message));
    //           }
    //         });
    //       });
    //       // if new image is available then store in storage and get downloadlink then set the download link in database

    //       if (dataUrlImages.length) {
    //         await Promise.all(
    //           dataUrlImages.map((image) => {
    //             const imageRef = ref(
    //               firebaseStorage,
    //               `productImages/${productDocId}/images${Date.now()}`
    //             );
    //             uploadString(imageRef, image, "data_url").then(async () => {
    //               const downloadUrl = await getDownloadURL(imageRef);
    //               // update the document with newProductsImage dwonloadurl
    //               await db
    //                 .collection("products")
    //                 .updateOne(
    //                   { _id: new ObjectId(productDocId) },
    //                   { $push: { images: downloadUrl } }
    //                 );
    //             });
    //           })
    //         );
    //       }
    //     }
    //     // then we will send a response that productInfo added.
    //     return res.status(201).json({
    //       success: true,
    //       message: "Product updated.....",
    //       res: documentUpdateResponse,
    //     });
    //   } catch (error) {
    //     return res.send({ success: false, message: error.message });
    //   }
    // } else {
    //   return res.send({ sucess: false, message: "no data founds" });
    // }
  }

  if (req.method === "DELETE") {
    const productDocId = req.body;
    try {
      //connect db
      const { db } = await connectMongoDB();
      // delete product
      const res = await db
        .collection("products")
        .deleteOne({ _id: new ObjectId(productDocId) });
      return res.status(200).json({
        success: true,
        message: `successfully deleted product _id: ${productDocId}`,
      });
    } catch (error) {
      return res.send({ success: false, message: error.message });
    }
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

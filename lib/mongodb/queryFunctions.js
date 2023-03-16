
// find documents with objects ids
const findDocumentsWithObjectIds = async (database,collectionName, ObjectIdsArray) => {
  const products = await database
    .collection(collectionName)
    .find({
      _id: {
        $in: ObjectIdsArray,
      },
    })
    .toArray();

    return products
};


export {findDocumentsWithObjectIds}
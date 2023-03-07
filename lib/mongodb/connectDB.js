import { MongoClient, ServerApiVersion } from 'mongodb'
const URI = process.env.MONGODB_URI
const DBName = 'store'
const client = new MongoClient(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

export const connectMongoDB = async () => {
    //connect
    await client.connect()
    //selectDb
    return {db: client.db(DBName)}
}


// client.connect((err) => {
//   const collection = client.db(DBName).collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { connectMongoDB } from "@/lib/mongodb/connectDB"

export default async function handler(req, res) {
  // try {
  //   const { db } = await connectMongoDB()
  //   const data = await db.collection('products').find().toArray()
  //   return res.status(200).json({success: true, data })
  // } catch (error) {
  //   return res.status(400).json({message: error.message})
  // }
  res.status(200).json({ name: 'John Doe' })
}

import mongoose from "mongoose";
import Product from "../../models/Product";
import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";

export async function GET(request) {

  
 
  // const client = await mongoose.connect(process.env.MONGODB_URI)
await connectDB();
  
  const product = await Product.find({}).sort({ _id: -1 }).limit(4);
  return NextResponse.json(product)
}

// app/api/products/route.js




export async function POST(request) {
  try {
    // Connect to the database
    await connectDB();

    // Parse the request body to get the array of product IDs
    const { ids } = await request.json();
    const productIds = ids;

    

    // Fetch products from the database whose _id is in the productIds array
    const products = await Product.find({ _id: { $in: productIds } });

    // Return the fetched products as JSON
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Internal cart-IDs fetching Error' },
      { status: 500 }
    );
  }
}

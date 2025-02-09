import connectDB from "@/app/lib/mongodb";
import Product from "@/app/models/Product";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await connectDB();

    const products = await Product.find({});

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
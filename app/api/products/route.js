import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/app/lib/mongodb";
import Product from "@/app/models/Product";

export async function GET(req) {
  try {
    await connectDB(); // Ensure connection
    const products = await Product.find({}); // Fetch all products
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const { ids } = await req.json(); // Parse ids from request body
    const products = await Product.find({ _id: { $in: ids } }); // Fetch products by ids
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Error fetching products by ids:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

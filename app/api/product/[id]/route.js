import connectDB from "@/app/lib/mongodb";
import Product from "@/app/models/Product";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const { id } = params; // No need to await params since it's an object
    await connectDB();
    
    // findById accepts an ID string directly
    const product = await Product.findById(id);
    
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    
    return NextResponse.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

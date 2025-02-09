import connectDB from "@/app/lib/mongodb";
import Product from "@/app/models/Product";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    try {
        const { id } = await params;
        await connectDB();
        const product = await Product.findById({_id: id});
        if (!product) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }
        return NextResponse.json(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
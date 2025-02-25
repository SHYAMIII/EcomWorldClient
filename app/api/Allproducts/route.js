import connectDB from "@/app/lib/mongodb";
import Product from "@/app/models/Product";

export async function GET(request) {
  try {
    await connectDB();
    const products = await Product.find({});
    return new Response(JSON.stringify(products), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
}

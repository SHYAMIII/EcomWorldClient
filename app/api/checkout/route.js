import connectDB from "@/app/lib/mongodb";
import Order from "@/app/models/Order";
import Product from "@/app/models/Product";
import { NextResponse } from "next/server";

export async function POST(request) {
    const { name, email, phone, address, postel, cartProducts,utr } = await request.json();
    await connectDB();
    const productIds = cartProducts;
    const uniqueProductIds = [...new Set(productIds)];
    const productInfos = await Product.find({ _id: { $in: uniqueProductIds } });

    let line_items = [];
    for (const id of uniqueProductIds) {
        const productInfo = productInfos.find((p) => p._id.toString() === id);
        const quantity = cartProducts.filter((p) => p === id).length || 0;
        if (quantity > 0) {
            line_items.push({
                quantity: quantity,
                price_data: {
                    currency: 'usd',
                    product_data: {name: productInfo.tittle},
                    unit_amount: productInfo.price * quantity,
                },
            })
        }
    }



    const order = new Order({
        name,
        email,
        phone,
        address,
        postel,
        line_items,
        utr: utr,
        paid: false
    }).save();
    return NextResponse.json(order);

}
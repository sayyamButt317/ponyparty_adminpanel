import dbConnect from "@/db/dbConnect";
import {product} from "@/Model/product.model";
import { NextResponse } from "next/server";

export async function POST(request,{ params }) {

await dbConnect();
const {id} = params;
const {Description,ProductName,ActualPrice,DiscountedPrice,ProductInStock,Category} = await request.json();
try {
    await product.findByIdandpdate(id,{Description,ProductName,ActualPrice,DiscountedPrice,ProductInStock,Category})
return NextResponse.json({message: 'Product updated successfully'},{status:200})
} catch (error) {
    console.log("Error in uploading Product details", error)
    return Response.json({
        success: false,
        message: "Unauthorized"
    }, { status:  401})
}


}
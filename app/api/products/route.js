import { connectDB } from "@/lib/db";
import { getServerSession } from "next-auth";

import Product from "@/models/Product";
import options from "@/auth.config";
export async function GET(){
    await connectDB()
    const products = await Product.find().sort({createdAt: -1})
    return Response.json(products)
}

export async function POST(req){
    await connectDB()
        const session = await getServerSession(options);
        if(!session || session.user.role !== "admin"){
            return Response.json({ error: "Not authorized" }, { status: 401 })
        }
        const body = await req.json()
        const product = await Product.create(body)
        return Response.json(product,{status: 201})
}   

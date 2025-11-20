import options from "@/auth.config";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import { getServerSession } from "next-auth";

export async  function GET(req,{params}){
    try{
        await connectDB()
        const {id} = params;
        const product = await Product.findById(id)
        if(!product){
            return Response.json({error: "Product Not Found"},{status: 404})
        }
        return Response.json(product,{status: 200})
    }catch(err){
return Response.json({error: "Faild to Fetch Product"},{status: 500})
    }
}

export async function PUT(req,{params}){
    try{
        await connectDB()
        const {id} = params;
       const session = await getServerSession(options)
       if(!session || session.user.role !== "admin"){
        return Response.json({error: "Not Authorized"},{status: 401})
       }
       const body = await req.json()
       const updated = await Product.findByIdAndUpdate(id,body,{
        new: true,
        runValidators: true
       })
       if(!updated){
        return Response.json({error: "Product Not Found"})
       }
       return Response.json(updated,{status: 200})

    }catch(err){
return Response.json(
    {error: "Faled to Update Product"},
    {status: 500}
)
    }
}



export async function DELETE(req,{params}){
    try{
        await connectDB()
        const session = await getServerSession(options)

        if(!session || session.user.role !== "admin"){
            return Response.json({error: "unauthorized Persone"},{status: 401})
        }
        const {id} = params
        const deleted = await Product.findByIdAndDelete(id)
        if(!deleted){
            return Response.json(
                {errpr: "product Nor Found"},
                {status: 404}
            )
        }
        return Response.json({message: "Product Deleted Successfuly"},{status: 201})
    }catch(err){
        return Response.json({error: "Product Not Fetch"},{status: 500})
    }
}
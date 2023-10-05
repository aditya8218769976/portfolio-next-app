import connectToDB from "@/database";
import { NextResponse } from "next/server";
import Home from "../../../../models/Home";

export const dynamic = "force-dynamic"

export async function POST(req){
    try {
        await connectToDB();
        const extractData = await req.json();
        const saveData = await Home.create(extractData);

        if (saveData) {
            return NextResponse.json({
                success: true,
                message: "Data Saved Successfully"
            })
        }else{
            return NextResponse.json({
                success: false,
                message: "Something went Wrong !please try again"
            })
        }

        
    } catch (error) {
        console.log(error);

        return NextResponse.json({
            success: false,
            message: "Something went Wrong !please try again"
        })
    }
}
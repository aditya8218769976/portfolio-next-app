import connectToDB from "@/database";
import { NextResponse } from "next/server";
import About from "../../../../models/About";

export const dynamic = "force-dynamic"

export async function POST(req){
    console.log(req);
    try {
        await connectToDB();
        const extractData = await req.json();
        console.log(extractData,"extractData");
        const saveData = await About.create(extractData);

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
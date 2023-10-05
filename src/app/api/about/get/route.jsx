import { NextResponse } from "next/server";
import connectToDB from "../../../../database";
import About from "../../../../models/About";


export const dynamic = "force-dynamic"

export async function GET(req){
  try {
    await connectToDB();
    const extractData = await About.find({})

    if (extractData) {
        return NextResponse.json({
            success: true,
            data: extractData,
        });
    }else{
        return NextResponse.json({
            success: false,
            message: "Something Went Wrong !Please try again!"
        })
    }
  } catch (error) {
    console.log(error);

    return NextResponse.json({
        success: false,
        message: "Something Went Wrong !Please try again!"
    })
  }
}
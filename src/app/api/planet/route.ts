import { connectDB } from "@/app/_lib/database";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const db = (await connectDB).db("sample_guides");
    let result = await db.collection("planets").find().toArray();
    console.log(result);
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json(err);
  }
}

import dbConnect from "@/app/_lib/dbConnect";
import PostAPI from "@/app/model/Posts";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const postList = await PostAPI.find();
    console.log(postList);
    return NextResponse.json(postList);
  } catch (err) {
    console.error(err);
    return NextResponse.error();
  }
}

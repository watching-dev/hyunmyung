import dbConnect from "@/app/_lib/dbConnect";
import PostsAPI from "@/app/model/Posts";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    console.log("req", req.url);
    // await dbConnect();
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q");
    console.log("q", q);
    const postList = await PostsAPI.find({ content: { $regex: q } });
    return NextResponse.json(postList);
  } catch (err) {
    console.error(err);
    return NextResponse.error();
  }
}

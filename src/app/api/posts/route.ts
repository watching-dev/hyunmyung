import dbConnect from "@/app/_lib/dbConnect";
import PostAPI from "@/app/model/Posts";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await dbConnect();
    const postList = await PostAPI.find();
    // const { searchParams } = new URL(req.url);
    // const page = Number(searchParams.get("cursor")) || 0;
    // console.log("sp", searchParams);
    // console.log("page", page);
    // console.log("req.url", req.url);
    // console.log("list", postList);
    // const cursorList = postList[page - 1];
    // if (page === 0) {
    //   return NextResponse.json(postList);
    // }
    // if (page > postList.length) {
    //   return NextResponse.json(null);
    // } else {
    //   return NextResponse.json(cursorList);
    // }
    return NextResponse.json(postList);
  } catch (err) {
    console.error(err);
    return NextResponse.error();
  }
}

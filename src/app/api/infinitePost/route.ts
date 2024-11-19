import dbConnect from "@/app/_lib/dbConnect";
import PostingAPIS from "@/app/model/posting";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    console.log("search params:", searchParams);
    const page = parseInt(searchParams.get("page") || "1", 10);
    console.log("get page: ", page);
    const limit = 10;
    const posts = await PostingAPIS.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    console.log("count:", posts.length);
    console.log("posts", posts);
    // console.log("posts json", posts.json());

    return NextResponse.json(posts);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { message: "게시글을 가져오는 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

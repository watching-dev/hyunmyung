import dbConnect from "@/app/_lib/dbConnect";
import PostingAPIS from "@/app/model/posting";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    // console.log("req", req.url);
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q");
    // console.log("q", q);
    const postList = await PostingAPIS.find().or([
      { content: { $regex: q } },
      { title: { $regex: q } },
    ]);

    // console.log("q length:", q?.length);

    // if (q === "p") {
    if (q?.length === 1) {
      // console.log("search is p:", q);
      const postList = await PostingAPIS.find({ title: { $regex: q } });
      return NextResponse.json(postList.reverse());
    }
    // console.log("search list", postList);
    return NextResponse.json(postList.reverse());
  } catch (err) {
    console.error(err);
    return NextResponse.error();
  }
}

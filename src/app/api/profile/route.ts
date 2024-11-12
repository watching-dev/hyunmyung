import dbConnect from "@/app/_lib/dbConnect";
import ProfileAPIS from "@/app/model/Profile";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await dbConnect();
    const userName = "HyunMyung";
    const profile = await ProfileAPIS.findOne({ "User.userName": userName });
    console.log("pf", profile);
    return NextResponse.json(profile);
  } catch (err) {
    console.error(err);
    return NextResponse.error();
  }
}

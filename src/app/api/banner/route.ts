import dbConnect from "@/app/_lib/dbConnect";
import BannerAPIS from "@/app/model/Banner";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await dbConnect();
    const banner = await BannerAPIS.findOne().sort({ createdAt: -1 });
    // 1: 가장 오래, -1: 가장 최신
    // console.log(banner);
    return NextResponse.json(banner);
  } catch (err) {
    console.error(err);
    return NextResponse.error();
  }
}

export async function POST(req: Request, res: Response) {
  try {
    await dbConnect();

    const data = await req.json();
    // console.log(data);

    const current = new Date();
    const utc = current.getTime() + current.getTimezoneOffset() * 60 * 1000;
    const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
    // const kr_current = new Date(utc + KR_TIME_DIFF) === Date.now() 똑같음_9시간 부족하니까 2배 해줘야 맞음;
    const kr_current = new Date(utc + KR_TIME_DIFF * 2);
    // console.log("time:", kr_current);

    const banner = new BannerAPIS({
      bannerURL: data.url,
      createdAt: kr_current,
      updatedAt: kr_current,
    });
    // console.log(banner);
    await banner.save();

    return Response.json({ message: "Save Success" });
  } catch (error) {
    console.log("err===>", error);
    return Response.error();
  }
}

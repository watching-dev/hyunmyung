import dbConnect from "@/app/_lib/dbConnect";
import PostingAPIS from "@/app/model/posting";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";
import { NextResponse } from "next/server";

dayjs.locale("ko");
dayjs.extend(relativeTime);

export async function GET() {
  try {
    await dbConnect();
    const current = new Date();
    const utc = current.getTime() + current.getTimezoneOffset() * 60 * 1000;
    const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
    // const kr_current = new Date(utc + KR_TIME_DIFF) === Date.now() 똑같음_9시간 부족하니까 2배 해줘야 맞음;
    const kr_current = new Date(utc + KR_TIME_DIFF * 2);
    // console.log(
    //   "kr",
    //   kr_current,
    //   "year",
    //   kr_current.getFullYear(),
    //   "mon",
    //   kr_current.getMonth() + 1, // month는 0부터 시작하기 때문에 1 더해줘야 함
    //   "next",
    //   kr_current.getMonth() + 2
    // );
    // console.log("------------");
    // console.log(
    //   "gte:",
    //   `${kr_current.getFullYear()}-${kr_current.getMonth() + 1}-01`
    // );
    // console.log(
    //   "lt:",
    //   `${kr_current.getFullYear()}-${kr_current.getMonth() + 2}-01`
    // );

    // console.log(
    //   "dayjs",
    //   dayjs(
    //     `${kr_current.getFullYear()}-${kr_current.getMonth() + 1}-01`
    //   ).toDate()
    // );
    const allPost = await PostingAPIS.find({
      createdAt: {
        $gte: `${kr_current.getFullYear()}-${kr_current.getMonth() + 1}-01`,
        $lt: `${kr_current.getFullYear()}-${kr_current.getMonth() + 2}-01`,
      },
    }).sort({ createdAt: -1 });
    // console.log(">>>>>>>>");
    // console.log("count:", allPost.length, "allPost", allPost);
    return NextResponse.json(allPost);
  } catch (error) {
    console.error(error);
  }
}

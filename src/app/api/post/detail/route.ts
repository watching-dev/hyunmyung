import dbConnect from "@/app/_lib/dbConnect";
import PostingAPIS from "@/app/model/posting";

export async function POST(req: Request, res: Response) {
  try {
    await dbConnect();

    // 입력한 데이터
    const data = await req.json();
    console.log("data==>>", data);

    const postedData = await PostingAPIS.findOne({
      postId: data.originPostId,
      title: data.slug,
    });
    console.log("postedData", postedData);
    return Response.json(postedData);
  } catch (error) {
    console.log("err===>", error);
    return Response.error();
  }
}

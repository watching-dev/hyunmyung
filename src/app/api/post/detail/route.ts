import dbConnect from "@/app/_lib/dbConnect";
import PostingAPIS from "@/app/model/posting";
import ProfileAPIS from "@/app/model/Profile";
import { auth } from "@/auth";

export async function POST(req: Request, res: Response) {
  try {
    await dbConnect();

    // 입력한 데이터
    const postId = await req.json();
    console.log("data==>>", postId);

    const postedData = await PostingAPIS.findOne({
      postId: postId.originPostId,
    });
    console.log("postedData", postedData);
    return Response.json(postedData);
  } catch (error) {
    console.log("err===>", error);
    return Response.error();
  }
}

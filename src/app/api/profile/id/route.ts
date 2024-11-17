import dbConnect from "@/app/_lib/dbConnect";
import ProfileAPIS from "@/app/model/Profile";

export async function POST(req: Request, res: Response) {
  try {
    await dbConnect();

    // 입력한 데이터
    const data = await req.json();
    console.log("data==>>", data);

    const profileData = await ProfileAPIS.findOne({
      "User.userId": data,
    }).sort({ createdAt: -1 });
    console.log("profileData", profileData);

    return Response.json(profileData);
  } catch (error) {
    console.log("err===>", error);
    return Response.error();
  }
}

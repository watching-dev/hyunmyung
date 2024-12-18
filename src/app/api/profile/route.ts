import dbConnect from "@/app/_lib/dbConnect";
import ProfileAPIS from "@/app/model/Profile";

export async function POST(req: Request, __res: Response) {
  try {
    await dbConnect();

    // 입력한 데이터
    const data = await req.json();
    // console.log("data==>>", data);

    const profileData = await ProfileAPIS.findOne({
      "User.userId": data.userInfo,
    }).sort({ createdAt: -1 });
    // console.log("profileData", profileData);

    // const ProfileSchema = new Schema({
    //   //   _id: Schema.Types.ObjectId,- 이거 하니까 updatedAt, _id 생성이 안되네

    const current = new Date();
    const utc = current.getTime() + current.getTimezoneOffset() * 60 * 1000;
    const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
    // const kr_current = new Date(utc + KR_TIME_DIFF) === Date.now() 똑같음_9시간 부족하니까 2배 해줘야 맞음;
    const kr_current = new Date(utc + KR_TIME_DIFF * 2);
    // console.log("time:", kr_current);

    const profile = new ProfileAPIS({
      User: {
        user_id: profileData.User.user_id,
        userName: profileData.User.userName,
        userId: profileData.User.userId,
      },
      description: profileData.description,
      profileImage: data.profileUrl,
      backgroundImage: data.backgroundUrl,
      createdAt: kr_current,
      updatedAt: kr_current,
    });
    // console.log("save profile", profile);
    await profile.save();
    return Response.json(profile);
  } catch (error) {
    console.log("err===>", error);
    return Response.error();
  }
}

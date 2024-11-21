import dbConnect from "@/app/_lib/dbConnect";
import JoinAPIS from "@/app/model/join";
import ProfileAPIS from "@/app/model/Profile";
import bcrypt from "bcrypt";

const saltRounds = 10;

export async function POST(req: Request, res: Response) {
  try {
    await dbConnect();

    const data = await req.json();
    console.log(data);
    const userPassword: string = data.userPw;
    // bcrypt.genSalt(saltRounds, function (err, salt) {
    //   bcrypt.hash(userPassword as string, salt, function (err, hash) {
    //     // Store hash in your password DB.
    //     console.log("hash:", hash);
    //   });
    // });
    const hashPassword: string = await bcrypt.hash(
      userPassword as string,
      saltRounds
    );
    console.log("hashp:", hashPassword);

    const current = new Date();
    const utc = current.getTime() + current.getTimezoneOffset() * 60 * 1000;
    const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
    // const kr_current = new Date(utc + KR_TIME_DIFF) === Date.now() 똑같음_9시간 부족하니까 2배 해줘야 맞음;
    const kr_current = new Date(utc + KR_TIME_DIFF * 2);
    console.log("time:", kr_current);

    const user = new JoinAPIS(
      {
        userId: data.userId,
        userPw: hashPassword,
        userName: data.name,
        createdAt: kr_current,
        // updatedAt: kr_current,
      }
      // {
      //   timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
      // } 자동화는 나중에 해보자
    ); // 모델을 생성하고 나서 여기에서 뭐라도 수정하고 저장 -> post 하면 중복 생성했다고  에러 뜸, 서버 재시작 해야함
    // 다른 에러거나 unique 설정했는데 안먹는다면 디비 컬렉션 삭제후 다시 생성_디비 컬렉션 지우고 그냥 다시 하면 자동 생성됨

    console.log(user);
    await user.save();

    // profile 데이터도 저장
    const profile = new ProfileAPIS({
      User: { user_id: user._id, userId: user.userId, userName: user.userName },
      description: data.description,
      profileImage: data.profileImage,
      backgroundImage: data.backgroundImage,
      createdAt: kr_current,
      updatedAt: kr_current,
    });

    console.log(profile);
    await profile.save();

    return Response.json({ message: "Save Success" });
  } catch (error) {
    console.log("err===>", error);
    return Response.error();
  }
}

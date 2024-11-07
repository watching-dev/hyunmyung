import dbConnect from "@/app/_lib/dbConnect";
import JoinAPIS from "@/app/model/join";
import bcrypt from "bcrypt";

const saltRounds = 10;

export async function POST(req: Request, res: Response) {
  try {
    await dbConnect();

    const data = await req.json();
    console.log(data);
    const userPassword: String = data.userPw;
    // bcrypt.genSalt(saltRounds, function (err, salt) {
    //   bcrypt.hash(userPassword as string, salt, function (err, hash) {
    //     // Store hash in your password DB.
    //     console.log("hash:", hash);
    //   });
    // });
    const hashPassword: String = await bcrypt.hash(
      userPassword as string,
      saltRounds
    );
    console.log("hashp:", hashPassword);
    // const userJ = JoinAPIS2;
    // console.log(userJ);

    const current = new Date();
    const utc = current.getTime() + current.getTimezoneOffset() * 60 * 1000;
    const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
    // const kr_current = new Date(utc + KR_TIME_DIFF) === Date.now() 똑같음_9시간 부족하니까 2배 해줘야 맞음;
    const kr_current = new Date(utc + KR_TIME_DIFF * 2);
    console.log("time:", kr_current);

    const user = new JoinAPIS({
      userId: data.userId,
      userPw: hashPassword,
      name: data.name,
      createdAt: kr_current,
    }); // 모델을 생성하고 나서 여기에서 뭐라도 수정하고 저장 -> post 하면 중복 생성했다고  에러 뜸, 서버 재시작 해야함
    // 다른 에러거나 unique 설정했는데 안먹는다면 디비 컬렉션 삭제후 다시 생성
    // const u = await JoinAPIS2.create({
    //   userId: 23,
    //   userPw: 333,
    //   name: "name",
    //   createdAt: Date.now(),
    // });
    console.log(user);
    await user.save();
    // const userInfo = new UserJoin({
    //   userId: data.userId,
    //   userPw: hashPassword,
    //   name: data.name,
    // });

    // 계정 추가
    // await userInfo.save();

    return Response.json({ message: "Save Success" });
  } catch (error) {
    console.log("err===>", error);
    return Response.error();
  }
}

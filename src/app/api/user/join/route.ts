import dbConnect from "@/app/_lib/dbConnect";
import JoinAPIS from "@/app/model/join";

const saltRounds = 10;

export async function POST(req: Request, res: Response) {
  try {
    await dbConnect();

    const data = await req.json();
    console.log(data);
    const hashPassword: String = data.userPw;
    // const hashPassword: String = await bcrypt.hash(userPassword, saltRounds);
    // const userJ = JoinAPIS2;
    // console.log(userJ);
    const userr = new JoinAPIS({
      userId: data.userId,
      userPw: 33,
      name: data.name,
      createdAt: Date.now(),
    }); // 모델을 생성하고 나서 여기에서 뭐라도 수정하고 저장 -> post 하면 중복 생성하라고 에러 뜸, 서버 재시작 해야함
    // 다른 에러거나 unique 설정했는데 안먹는다면 디비 컬렉션 삭제후 다시 생성
    // const u = await JoinAPIS2.create({
    //   userId: 23,
    //   userPw: 333,
    //   name: "name",
    //   createdAt: Date.now(),
    // });
    console.log(userr);
    await userr.save();
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

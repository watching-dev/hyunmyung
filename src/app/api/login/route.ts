import dbConnect from "@/app/_lib/dbConnect";
import JoinAPIS from "@/app/model/join";
import bcrypt from "bcrypt";

export async function POST(req: Request, res: Response) {
  try {
    await dbConnect();

    const data = await req.json();
    console.log(data);
    const loginPw: String = data.userPw;
    const userInfo = await JoinAPIS.findOne({ userId: data.userId }).exec();

    console.log(loginPw);
    console.log(userInfo.userPw);
    console.log(userInfo);
    if (userInfo == null) {
      return Response.json({ message: "계정이 존재하지 않습니다", result: "" });
    }

    const isMatched: boolean = await bcrypt.compare(
      loginPw as string,
      userInfo.userPw
    );

    console.log("isMatch", isMatched);

    return Response.json({
      message: isMatched ? "OK" : "아이디 혹은 비밀번호를 확인해주세요.",
      result: isMatched,
    });
  } catch (error) {
    console.log("err==", error);
    return Response.error();
  }
}

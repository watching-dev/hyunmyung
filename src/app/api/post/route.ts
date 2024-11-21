import dbConnect from "@/app/_lib/dbConnect";
import PostingAPIS from "@/app/model/posting";
import ProfileAPIS from "@/app/model/Profile";
import { auth } from "@/auth";

export async function POST(req: Request, res: Response) {
  try {
    await dbConnect();

    // 입력한 데이터
    const data = await req.json();
    // console.log("data==", data);

    // 로그인 정보 가져오기(id, name)
    const session = await auth();
    // console.log("auth sesion", session);

    // 로그인된 정보의 프로필 가져오기
    const profile = await ProfileAPIS.findOne({
      "User.userId": session?.user?.email,
    }).sort({ createdAt: -1 });
    // console.log("pf", profile);

    // 포스팅 갯수 가쟈와서 postId 계산하기
    const count = await PostingAPIS.find({
      "Profile.User.userId": session?.user?.email,
    }); //.countDocuments
    // console.log("count:", count, "length:", count.length);

    // 전체 포스팅 개수
    const countAll = (await PostingAPIS.find()).length;
    // console.log("countAll", countAll);

    const current = new Date();
    const utc = current.getTime() + current.getTimezoneOffset() * 60 * 1000;
    const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
    // const kr_current = new Date(utc + KR_TIME_DIFF) === Date.now() 똑같음_9시간 부족하니까 2배 해줘야 맞음;
    const kr_current = new Date(utc + KR_TIME_DIFF * 2);
    // console.log("time:", kr_current);

    // 나중에 id를 base64든 뭐든 암호화 해서 저장
    const base64ID = btoa(session?.user?.email as string);
    const originID = atob(base64ID);
    // console.log("64: ", base64ID, "origin: ", originID);
    const postId = `(${countAll})${session?.user?.email}_${count.length + 1}`;
    const postId2 = `${countAll}_${base64ID}_${count.length + 1}`;
    // postId니까 어차피 겹치지만 않으면 되는데 postId2 전체를 base64할까..

    // console.log(">> postID:", postId, "userId", profile.User.userName);
    // console.log(">> postID2:", postId2);

    // console.log("-------");
    const post = new PostingAPIS({
      postId: postId2,
      title: data.title,
      Profile: {
        User: {
          userName: profile.User.userName,
          user_id: profile.User.user_id,
        },
        description: profile.description,
        profileImage: profile.profileImage,
      },
      postImage: data.thumbURL,
      content: data.content,
      recommended: data.recommended,
      createdAt: kr_current,
      updatedAt: kr_current,
    });
    // name하고 email(아이디) 이걸로 데이터 조회해서 값을 가져온다음 그 사람에 맞는 정보를 먼저 가져오고 글 작성 후 저장하면 그 정보까지 같이 해서 하면될듯  / 임시저장도 만들어야 겠네
    // console.log(post);
    await post.save();
    return Response.json({ message: "Save Success" });
  } catch (error) {
    console.log("err===>", error);
    return Response.error();
  }
}

import dbConnect from "@/app/_lib/dbConnect";

export async function POST(req: Request, res: Response) {
  try {
    await dbConnect();

    const data = await req.json();
    console.log(data);

    const current = new Date();
    const utc = current.getTime() + current.getTimezoneOffset() * 60 * 1000;
    const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
    // const kr_current = new Date(utc + KR_TIME_DIFF) === Date.now() 똑같음_9시간 부족하니까 2배 해줘야 맞음;
    const kr_current = new Date(utc + KR_TIME_DIFF * 2);
    console.log("time:", kr_current);

    // const user = new UserAPIS({
    //   _id: data._id,
    //   userId: data.userId,
    //   name: data.name,
    //   description: data.description,
    //   profileImage: data.profileImage,
    //   backgroundImage: data.backgroundImage,
    //   createdAt: data.createdAt,
    //   updatedAt: kr_current,
    // });
    // console.log(user);
    // await user.save();

    return Response.json({ message: "Save Success" });
  } catch (error) {
    console.log("err===>", error);
    return Response.error();
  }
}

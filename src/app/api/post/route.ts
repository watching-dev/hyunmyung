import dbConnect from "@/app/_lib/dbConnect";
import PostingAPIS from "@/app/model/posting";
import { auth } from "@/auth";

export async function POST(req: Request, res: Response) {
  try {
    await dbConnect();

    const data = await req.json();
    console.log(data);
    const session = await auth();
    console.log("sesion", session);

    const post = new PostingAPIS({
      userName: session?.user?.name,
      email: session?.user?.email,
      content: data,
    });
    console.log(post);
    await post.save();
    return Response.json({ message: "Save Success" });
  } catch (error) {
    console.log("err===>", error);
    return Response.error();
  }
}

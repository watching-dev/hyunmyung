import dbConnect from "@/app/_lib/dbConnect";
import PostingAPIS from "@/app/model/posting";
import { NextResponse } from "next/server";

export interface IList {
  title: string;
  postId: string;
  Profile: {
    User: {
      userId: string;
      userName: string;
    };
    description: string;
    profileImage: string;
  };
  recommended: boolean;
  postImage: string;
  createdAt: Date;
  updatedAt: Date;
}
export async function GET(__req: Request) {
  try {
    await dbConnect();
    const allPost = await PostingAPIS.find();

    // console.log("posting:", allPost);

    const postList = allPost.map((post) => {
      const list = {
        title: post.title,
        postId: post.postId,
        Profile: {
          User: {
            userId: post.Profile.User.userId,
            userName: post.Profile.User.userName,
          },
          description: post.Profile.description,
          profileImage: post.Profile.profileImage,
        },
        recommended: post.recommended,
        postImage: post.postImage,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      };

      return list;
    });

    // console.log("postList:", postList);

    return NextResponse.json(postList);
  } catch (err) {
    console.error(err);
    return NextResponse.error();
  }
}

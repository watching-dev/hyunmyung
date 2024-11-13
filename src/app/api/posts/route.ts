import dbConnect from "@/app/_lib/dbConnect";
import PostingAPIS from "@/app/model/posting";
import PostsAPI from "@/app/model/Posts";
import { StringModule } from "@faker-js/faker";
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
  postImage: string;
  createdAt: Date;
  updatedAt: Date;
}
export async function GET(req: Request) {
  try {
    await dbConnect();
    const allPost = await PostingAPIS.find(/*{ sort: { createdAt: -1 } }*/);
    // const { searchParams } = new URL(req.url);
    // const page = Number(searchParams.get("cursor")) || 0;
    // console.log("sp", searchParams);
    // console.log("page", page);
    // console.log("req.url", req.url);
    // console.log("list", postList);
    // const cursorList = postList[page - 1];
    // if (page === 0) {
    //   return NextResponse.json(postList);
    // }
    // if (page > postList.length) {
    //   return NextResponse.json(null);
    // } else {
    //   return NextResponse.json(cursorList);
    // }
    console.log("posting:", allPost);

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
        postImage: post.postImage,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      };

      return list;
    });

    console.log("postList:", postList);

    return NextResponse.json(postList);
  } catch (err) {
    console.error(err);
    return NextResponse.error();
  }
}

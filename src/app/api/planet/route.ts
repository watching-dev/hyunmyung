import { connectDB } from "@/app/_lib/database";
import dbConnect from "@/app/_lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";

import Planet from "@/app/model/planet";

// export async function GET(req: NextRequest) {
//   try {
//     const db = (await connectDB).db("sample_guides");
//     let result = await db.collection("planets").find().toArray();
//     console.log(result);
//     return NextResponse.json(result);
//   } catch (err) {
//     return NextResponse.json(err);
//   }
// }

async function connectToDatabase() {
  try {
    // 데이터베이스와 연결합니다.
    await dbConnect();

    // 연결을 성공하면 model을 반환합니다.

    return Planet;
  } catch (error) {
    console.error("DB 연결 에러 : " + error);
  }
}

export async function GET(req: Request) {
  try {
    await dbConnect();
    // const planet = connectToDatabase;

    // 데이터 조회
    // const planetList = Planets.find().then((data) => {
    //   console.log(data);
    // });
    const planetList = await Planet.find();
    console.log(planetList);

    // console.log(planetList);
    // const data = (await IntroductionPosts?.find({})
    // .populate('author', 'name profileImage')
    // .select(
    //   'introductionPostId author title thumbnail summary content category tags views timestamps createdAt'
    // )
    // .exec()) as TypeIntroductionPost[] | undefined;

    // console.log(planet);

    // return Response.json({ data: planetList });

    // 타입스크립트가 유추한 Omit<any, never>타입 대신, 타입 단언 as 사용
    // const data = (await planet).exec() as TypeIntroductionPost[] | undefined;

    // 프론트엔드 인터페이스에 맞게 데이터 가공
    // const modifiedData = data?.map((post) => ({
    //   id: post._id,
    //   introductionPostId: post.introductionPostId,
    //   authorId: post.author._id,
    //   authorName: post.author.name,
    //   authorImage: post.author.profileImage,
    //   title: post.title,
    //   thumbnail: post.thumbnail,
    //   content: post.content,
    //   summary: post.summary,
    //   category: post.category,
    //   tags: post.tags,
    //   views: post.views,
    //   timestamps: post.createdAt,
    // }));

    // return NextResponse.json(modifiedData);
    return Response.json(planetList);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    return Response.error();
  }
}

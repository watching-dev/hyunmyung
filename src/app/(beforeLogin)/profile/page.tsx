import ProfileView from "../_components/homeSection/homeMainSection/tab/profileView";
import { auth } from "@/auth";
export const dynamic = "force-dynamic";

export default async function Profile() {
  try {
    const session = await auth();

    // defaultId에 사용할 아이디 작성
    const defaultId = process.env.NEXT_PUBLIC_DEFAULT_ID; // id checker 함수 만들기

    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_SITE_URL ??
        process.env.NEXT_PUBLIC_VERCEL_URL ??
        process.env.NEXT_PUBLIC_BASE
      }/api/profile/id`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        next: {
          // revalidate: 0, 리액트 쿼리로 재수정 필요
        },

        // cache: "no-store",
        body: JSON.stringify(
          session?.user?.email === null || session?.user?.email === undefined
            ? defaultId === null || defaultId === undefined
              ? "default"
              : defaultId
            : session?.user?.email
          // 이름 변경 했는데 여러개 동시에 다 변경해야 하잔하 이거 잘 생각 join 만 바꿨는데 profile도 바꿔줘야 다 글자 반영되네
        ),
      }
    );

    const data = await response.json();

    // revalidatePath("/profile");

    return (
      <>
        {/* <HydrationBoundary state={dehydrateState}> */}
        <ProfileView
          name={data.User.userName}
          description={data.description}
          backgroundImage={data.backgroundImage}
          profileImage={data.profileImage}
        />
        {/*</HydrationBoundary> */}
      </>
    );
  } catch (error) {
    console.error(error);
  }
}

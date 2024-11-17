// "use server";

import { revalidatePath } from "next/cache";
import ProfileView from "../_components/homeSection/homeMainSection/tab/profileView";
import styles from "./profile.module.css";

export default async function Profile() {
  try {
    console.log("fetch profile====");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE}/api/profile`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: {
          revalidate: 0,
        },

        // cache: "no-store",
        // body: JSON.stringify(params),
      }
    );

    const data = await response.json();
    console.log("==>", data);
    console.log("data.backgroundImg", data.backgroundImage);
    console.log("data.profileImg", data.profileImage);
    console.log("data.description", data.description);
    console.log("data.name", data.User.userName);

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

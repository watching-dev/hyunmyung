import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  useQuery,
} from "@tanstack/react-query";
import HomeLeftSection from "../_components/homeSection/HomeLeftSection";

import styles from "./profile.module.css";
import { getUser } from "../[username]/_lib/getUsers";
import Image from "next/image";
import lqip from "lqip-modern";

type Props = {
  params: { username: string };
};

export interface IProfile {
  User: {
    user_id: String;
    userId: String;
    userName: String;
  };

  description: String;
  profileImage: String;
  backgroundImage: String;
  createdAt: Date;
  updatedAt: Date;
}
export default async function Profile({ params }: Props) {
  const { username } = params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    // queryKey: ["users", username],

    queryKey: ["user", "hyunmyung"],
    // queryFn: getUser,
  });
  const dehydrateState = dehydrate(queryClient);

  // const { data } = useQuery<IPost[]>({
  //   queryKey: ["posts", "all"],
  //   queryFn: getPostAll,
  //   staleTime: 60 * 1000,
  // });
  // return data?.map((post) => <Post key={post.postId} post={post} />);

  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE}/api/profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      revalidate: 3,
    },
    // body: JSON.stringify(params),
  });

  const data = await response.json();
  console.log("==>", data);

  const url =
    "https://pbs.twimg.com/profile_images/1849727333617573888/HBgPUrjG_400x400.jpg";
  const imgData = await fetch(url, {
    next: {
      revalidate: 3,
    },
  });
  const arrayBufferData = await imgData.arrayBuffer();
  const lqipData = await lqip(Buffer.from(arrayBufferData));

  return (
    <HydrationBoundary state={dehydrateState}>
      <div className={styles.tabFixed}>
        <div className={styles.title}>프로필</div>
      </div>
      <div className={styles.backgroundImage}>background image</div>
      <div className={styles.profileBackground}>
        <div className={styles.profileImage}>
          {/* <svg viewBox="0 0 24 24" aria-hidden="true">
            <g>
              <path d="M5.651 19h12.698c-.337-1.8-1.023-3.21-1.945-4.19C15.318 13.65 13.838 13 12 13s-3.317.65-4.404 1.81c-.922.98-1.608 2.39-1.945 4.19zm.486-5.56C7.627 11.85 9.648 11 12 11s4.373.85 5.863 2.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H3.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46zM12 4c-1.105 0-2 .9-2 2s.895 2 2 2 2-.9 2-2-.895-2-2-2zM8 6c0-2.21 1.791-4 4-4s4 1.79 4 4-1.791 4-4 4-4-1.79-4-4z"></path>
            </g>
          </svg> */}
          <Image
            src={url}
            alt="ellon"
            width={100}
            height={100}
            sizes="100vw"
            placeholder="blur"
            blurDataURL={lqipData.metadata.dataURIBase64}
          />
        </div>
      </div>
      <div className={styles.name}>
        {data === null ? "HyunMyung" : data.User.userName}
      </div>
      <div className={styles.description}>
        {data === null
          ? "지금까지 알게된 모든 것을 공유합니다."
          : data.description}
      </div>
    </HydrationBoundary>
  );
}

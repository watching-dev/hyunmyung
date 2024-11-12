import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  useQuery,
} from "@tanstack/react-query";
import HomeLeftSection from "../_components/homeSection/HomeLeftSection";

import styles from "./profile.module.css";
import { getUser } from "../[username]/_lib/getUsers";

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
    // body: JSON.stringify(params),
  });

  const data = await response.json();
  console.log("==>", data);

  return (
    <HydrationBoundary state={dehydrateState}>
      <div className={styles.tabFixed}>
        <div className={styles.title}>프로필</div>
      </div>
      <div className={styles.backgroundImage}>background image</div>
      <div className={styles.profileBackground}>
        <div className={styles.profileImage} />
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

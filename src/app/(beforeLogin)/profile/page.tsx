import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import HomeLeftSection from "../_components/homeSection/HomeLeftSection";

import styles from "./profile.module.css";
import { getUser } from "../[username]/_lib/getUsers";

type Props = {
  params: { username: string };
};
export default async function Profile({ params }: Props) {
  const { username } = params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["users", username],
    queryFn: getUser,
  });
  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>
      <div className={styles.tabFixed}>
        <div className={styles.title}>프로필</div>
      </div>
      <div className={styles.backgroundImage}>background image</div>
      <div className={styles.profileBackground}>
        <div className={styles.profileImage}></div>
      </div>
      <div className={styles.name}>HyunMyung</div>
      <div className={styles.description}>
        지금까지 알게된 모든 것을 공유합니다.
      </div>
    </HydrationBoundary>
  );
}

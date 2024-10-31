import styles from "./rightSectionMain.module.css";
import Post from "./_components/homeSection/homeMainSection/tab/Post";
import PostForm from "./_components/homeSection/homeMainSection/tab/PostForm";
import Tab from "./_components/homeSection/homeMainSection/tab/Tab";
import TabProvider from "./_components/homeSection/homeMainSection/tab/TabProvider";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import PostRecommends from "./_components/homeSection/homeMainSection/tab/PostRecommends";
import { getPostRecommends } from "../(afterLogin)/_lib/getPostRecommends";
import TabDecider from "./_components/homeSection/homeMainSection/tab/TabDecider";

export default async function RightSectionMain() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["posts", "recommends"],
    queryFn: getPostRecommends,
  });
  const dehydrateState = dehydrate(queryClient);

  return (
    <div className={styles.main}>
      <HydrationBoundary state={dehydrateState}>
        <TabProvider>
          <Tab />
          <PostForm />
          {/* <Banner /> */}
          <TabDecider />
        </TabProvider>
      </HydrationBoundary>
    </div>
  );
}

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

import PostRecommends from "./_components/homeSection/homeMainSection/tab/PostAll";
import { getPostRecommends } from "../(afterLogin)/_lib/getPostAll";
import TabDecider from "./_components/homeSection/homeMainSection/tab/TabDecider";
import Banner from "./_components/homeSection/homeMainSection/tab/Banner";

export default async function RightSectionMain() {
  const queryClient = new QueryClient();
  // await queryClient.prefetchInfiniteQuery({
  //   queryKey: ["posts", "recommends"],
  //   queryFn: getPostRecommends,
  //   initialPageParam: 1,
  // });
  await queryClient.prefetchQuery({
    queryKey: ["posts", "all"],
  });
  const dehydrateState = dehydrate(queryClient);

  return (
    <div className={styles.main}>
      <HydrationBoundary state={dehydrateState}>
        <TabProvider>
          <Tab />
          {/* <PostForm /> */}
          <Banner />
          <TabDecider />
        </TabProvider>
      </HydrationBoundary>
    </div>
  );
}

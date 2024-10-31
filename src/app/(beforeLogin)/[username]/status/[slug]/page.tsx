import Post from "@/app/(beforeLogin)/_components/homeSection/homeMainSection/tab/Post";

import styles from "./singlePost.module.css";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getSinglePostServer } from "./_lib/getSinglePostServer";
import SinglePost from "./_component/SinglePost";

type Props = {
  params: { id: string; username: string };
};
export default async function SinglePostPage({ params }: Props) {
  const { id } = params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["posts", id],
    queryFn: getSinglePostServer,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <>
      <div className={styles.tabFixed}>
        <div className={styles.title}>게시글</div>
        <HydrationBoundary state={dehydratedState}>
          <SinglePost id={id} />
        </HydrationBoundary>
      </div>
    </>
  );
}

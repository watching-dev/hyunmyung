"use client";

import {
  InfiniteData,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import Post from "./Post";
import { Post as IPost } from "@/app/model/Post";
import { getPostAll } from "@/app/(afterLogin)/_lib/getPostAll";
import { Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { IList } from "@/app/api/posts/route";

export default function PostAll() {
  // const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery<
  //   IPost[],
  //   Object,
  //   InfiniteData<IPost[]>,
  //   [_1: string, _2: string],
  //   number
  // >({
  //   queryKey: ["posts", "recommends"],
  //   queryFn: getPostRecommends,
  //   initialPageParam: 1,
  //   getNextPageParam: (lastPage, allpages) => {
  //     // lastPage.at(-1)?.postId;

  //     console.log("last", lastPage.at(-1));
  //     console.log("all", allpages);
  //     const nextPage = lastPage.length + 1;
  //     // return lastPage.length === 0 ? undefined : nextPage;
  //     // return undefined;
  //     return lastPage.at(-1)?.postId;
  //   },
  //   staleTime: 60 * 1000,
  // });
  // console.log("daata", data);
  // console.log("isfetching", isFetching);
  // console.log("hasnextpage", hasNextPage);
  // console.log("fetchNextPage", fetchNextPage);

  // const { ref, inView } = useInView({ threshold: 0, delay: 0 });

  // useEffect(() => {
  //   if (inView) {
  //     !isFetching && hasNextPage && fetchNextPage();
  //   }
  // }, [inView, isFetching, hasNextPage, fetchNextPage]);
  // console.log(data);
  // return (
  //   <>
  //     {
  //       data?.pages.map((page, i) => (
  //         <Fragment key={i}>
  //           {page.map((post) => (
  //             <Post key={post.postId} post={post} />
  //           ))}
  //         </Fragment>
  //       ))
  //       //   data?.pages.map((post) => (
  //       //     <Post key={post.postId} post={post} />
  //       //   ))
  //     }
  //     <div ref={ref} style={{ height: 50 }} />
  //   </>
  // );
  const { data } = useQuery<IList[]>({
    queryKey: ["posts", "all"],
    queryFn: getPostAll,
    staleTime: 60 * 1000,
  });
  console.log("qq==", data);
  return data?.map((post) => <Post key={post.postId} post={post} />);
}

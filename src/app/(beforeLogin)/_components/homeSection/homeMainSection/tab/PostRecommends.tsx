"use client";

import { useQuery } from "@tanstack/react-query";
import Post from "./Post";
import { Post as IPost } from "@/app/model/Post";
import { getPostRecommends } from "@/app/(afterLogin)/_lib/getPostRecommends";
import { IList } from "@/app/api/posts/route";
import { HashLoader } from "react-spinners";
import { useInView } from "react-intersection-observer";

export default function PostRecommends() {
  const { ref, inView } = useInView({ threshold: 0, delay: 0 });
  const { data, isFetching, isLoading, isPending } = useQuery<IList[]>({
    queryKey: ["posts", "recommends"],
    queryFn: getPostRecommends,
    staleTime: 60 * 1000,
  });
  // useEffect(() => { 나중에 여기도 무한 스크롤하면 적용
  //   if (inView) fetchNextPage();
  // }, [inView, fetchNextPage]);
  console.log(
    "recommend==",
    "isLoading",
    isLoading,
    "isPending",
    isPending,
    "isFetching",
    isFetching,
    "data ==",
    data
  );
  return (
    <>
      {isPending ? (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "150px 0px",
            }}
          >
            <HashLoader color="orange" />
          </div>
        </>
      ) : (
        <>
          {data
            ?.filter((post) => post.recommended === true)
            .map((post) => (
              <Post key={post.postId} post={post} />
            ))}
          <div ref={ref} /*style={{ height: 50 }}*/ />
          <div>
            {isFetching ? (
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "150px 0px",
                  }}
                >
                  <HashLoader color="orange" />
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </>
      )}
    </>
  );
}

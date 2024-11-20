"use client";

import { Post as IPost } from "@/app/model/Post";
import { useQuery } from "@tanstack/react-query";
import Post from "../../_components/homeSection/homeMainSection/tab/Post";
import { getSearchResult } from "../_lib/GetSearchResult";
import { HashLoader } from "react-spinners";
import { useInView } from "react-intersection-observer";

type Props = {
  searchParams: { q: string; f?: string; pf?: string };
};
export default function SearchResult({ searchParams }: Props) {
  const { ref, inView } = useInView({ threshold: 0, delay: 0 });
  const { data, isFetching, isPending } = useQuery<
    IPost[],
    Object,
    IPost[],
    [_1: string, _2: string, Props["searchParams"]]
  >({
    queryKey: ["posts", "search", searchParams],
    queryFn: getSearchResult,
    staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
    gcTime: 300 * 1000,
  });

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
          {data?.map((post) => (
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

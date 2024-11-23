"use client";

import { useQuery } from "@tanstack/react-query";
import Post from "../../_components/homeSection/homeMainSection/tab/Post";
import { getSearchResult } from "../_lib/GetSearchResult";
import { HashLoader } from "react-spinners";
import { useInView } from "react-intersection-observer";
import { IList } from "@/app/api/posts/route";

interface Props {
  searchParams: { q: string; f?: string; pf?: string };
}
export default function SearchResult({ searchParams }: Props) {
  const { ref } = useInView({ threshold: 0, delay: 0 });
  const { data, isFetching, isPending } = useQuery<
    IList[],
    object,
    IList[],
    [_1: string, _2: string, Props["searchParams"]]
    // 아직도 여긴 왜 이렇게 타입을 지정하는 건지 모르겠네
  >({
    queryKey: ["posts", "search", searchParams],
    queryFn: getSearchResult,
    staleTime: 1000 * 30,
    gcTime: 1000 * 10 * 60 * 60 * 24 * 1,
  });

  // 나중에 무한스크롤 적용

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

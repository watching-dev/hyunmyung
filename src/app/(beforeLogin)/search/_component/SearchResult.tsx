"use client";

import { Post as IPost } from "@/app/model/Post";
import { useQuery } from "@tanstack/react-query";
import Post from "../../_components/homeSection/homeMainSection/tab/Post";
import { getSearchResult } from "../_lib/GetSearchResult";

type Props = {
  searchParams: { q: string; f?: string; pf?: string };
};
export default function SearchResult({ searchParams }: Props) {
  const { data } = useQuery<
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

  return data?.map((post) => <Post key={post.postId} post={post} />);
}

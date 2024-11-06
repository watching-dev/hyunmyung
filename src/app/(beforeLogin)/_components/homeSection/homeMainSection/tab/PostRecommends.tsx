"use client";

import { useQuery } from "@tanstack/react-query";
import Post from "./Post";
import { Post as IPost } from "@/app/model/Post";
import { getPostRecommends } from "@/app/(afterLogin)/_lib/getPostRecommends";

export default function PostRecommends() {
  const { data } = useQuery<IPost[]>({
    queryKey: ["posts", "recommends"],
    queryFn: getPostRecommends,
    staleTime: 60 * 1000,
  });
  return data?.map((post) => <Post key={post.postId} post={post} />);
}

"use client";

import { useQuery } from "@tanstack/react-query";
import Post from "./Post";
import { Post as IPost } from "@/app/model/Post";
import { getPostfollowings } from "@/app/(afterLogin)/_lib/getPostFollowings";

export default function PostFollowings() {
  const { data } = useQuery<IPost[]>({
    queryKey: ["posts", "followings"],
    queryFn: getPostfollowings,
    staleTime: 60 * 1000,
  });
  return data?.map((post) => <Post key={post.postID} post={post} />);
}

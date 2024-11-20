"use client";

import { useQuery } from "@tanstack/react-query";
import Post from "./Post";
import { Post as IPost } from "@/app/model/Post";
import { getPostRecommends } from "@/app/(afterLogin)/_lib/getPostRecommends";
import { IList } from "@/app/api/posts/route";
import { HashLoader } from "react-spinners";

export default function PostRecommends() {
  const { data, isFetching } = useQuery<IList[]>({
    queryKey: ["posts", "recommends"],
    queryFn: getPostRecommends,
    staleTime: 60 * 1000,
  });
  return (
    <>
      {isFetching ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "200px",
          }}
        >
          <HashLoader color="orange" />
        </div>
      ) : (
        <>
          {data
            ?.filter((post) => post.recommended === true)
            .map((post) => (
              <Post key={post.postId} post={post} />
            ))}
        </>
      )}
    </>
  );
}

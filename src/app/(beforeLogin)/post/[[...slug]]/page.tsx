// "use client";

import { useQuery } from "@tanstack/react-query";
import {
  usePathname,
  useSearchParams,
  useSelectedLayoutSegments,
} from "next/navigation";
import PostDetail from "../../_components/homeSection/homeMainSection/tab/PostDetail";

type Props = {
  // param: { id: string };
  post: {
    title: string;
    postId: string;
    Profile: {
      User: {
        userId: string;
        userName: string;
      };
      description: string;
      profileImage: string;
    };
    postImage: string;
    createdAt: Date;
    updatedAt: Date;
  };
};
export default async function PostSlug(props: any) {
  console.log("props slug", props.params.slug); // 이렇게 해야 url 값을 가져오네
  const originPostId = atob(props.params.slug[0]);
  console.log("origin:", originPostId);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE}/api/post/detail`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ originPostId }),
      next: { revalidate: 3 },
    }
  );

  const res = await response.json();
  console.log(res);

  return (
    <div>
      post slug
      <div>{res.content}</div>
    </div>
  );
}

// export default function PostSlug() {
//   const search = useSearchParams();
//   console.log("search", search);
//   const post: any = search.get("post");
//   console.log("post", post);
//   return <div>post slug</div>;
// }

// const PostSlug: React.FC<Props> = () => {
//   const search = useSearchParams();
//   console.log("search", search);
//   const post: any = search.get("post");
//   console.log("post", post);
//   return <div>post slug</div>;
// };

// export default PostSlug;

// "use client";

import { useQuery } from "@tanstack/react-query";
import {
  usePathname,
  useSearchParams,
  useSelectedLayoutSegments,
} from "next/navigation";
import PostDetail from "../../_components/homeSection/homeMainSection/tab/PostDetail";
import styles from "./postSlug.module.css";
import BackButton from "../../_components/homeSection/homeMainSection/tab/BackButton";
import sanitizeHtml from "../../_lib/sanitizeHTML";

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
  try {
    console.log("props slug", props.params.slug); // 이렇게 해야 url 값을 가져오네
    const originPostId = atob(props.params.slug[0]); // 디코딩이 실패하면 에러남_인코딩 글자를 임의로 수정했을 경우처럼
    console.log("origin:", originPostId);
    const slug = props.params.slug[1].replace(/-/gi, " "); // -를 공백으로 치환
    console.log("slug==", slug);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE}/api/post/detail`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ originPostId, slug }),
        next: { revalidate: 3 },
      }
    );

    const res = await response.json();
    console.log(res);

    const cleanContent = sanitizeHtml(res.content);

    return (
      <>
        <div className={styles.tabFixed}>
          <BackButton page="/" />
          <div className={styles.title}>Title</div>
        </div>
        <div className={styles.postWrapper}>
          <div className={styles.postBoundary}>
            <span dangerouslySetInnerHTML={{ __html: cleanContent }} />
          </div>
        </div>
      </>
    );

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
  } catch (error) {
    console.error(error);
    return <div>not found</div>;
  }
}

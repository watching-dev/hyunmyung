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
export default function PostSlug(props: any) {
  console.log("props id", props.params.id);
  console.log("props slug", props.params.slug); // 이렇게 해야 url 값을 가져오네
  // const { [...slug] } = param;
  // console.log("ppp==", slug);
  // const pathName = usePathname();

  // const pathNames = useSelectedLayoutSegments();
  // console.log("name:", pathName);
  // console.log("names", pathNames); // 이건 왜 여기서만 못잡냐..
  // const split = pathName.split("/"); // /로 구분해서 각 배열에 담음
  // console.log("split:", split);
  // const originPostId = atob(split[2]);
  // console.log("origin:", originPostId);

  return <div>post slug</div>;
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

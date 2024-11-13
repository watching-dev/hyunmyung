"use client";

import { ReactNode } from "react";
import styles from "./post.module.css";
import { useRouter } from "next/navigation";
import { PostImage } from "@/app/model/PostImage";

type Props = {
  children: ReactNode;
  post: {
    title: string;
    postId: string;
    Profile: {
      User: {
        userId: string;
        userName: string;
      };
      description: String;
      profileImage: String;
    };
    postImage: String;
    createdAt: Date;
    updatedAt: Date;
  };
};

export default function PostArticle({ children, post }: Props) {
  const router = useRouter();
  const slug = post.title.replace(/(\s*)/g, ""); // 공백제거
  console.log("slug:", slug);
  console.log("postId", post.postId);
  const flag = post.postId.replace(/[\D]/gi, ""); // 문자 아닌것 제거
  console.log("flag", flag);
  const split = post.postId.split("_"); // _로 구분해서 각 배열에 담음
  console.log("split:", split);

  const onClick = () => {
    // router.push(`/${post.User.id}/status/${post.postId}`);
    // 가운데를 전체 포스팅 글 갯수(split[0]) 으로 할 것이냐
    // 전체 + 문자 아닌것 제거에서 숫자만 남은것(없을 수도 있음) + 글 작성자 포스팅한 글 갯수로 할것이냐 고민이네
    // 일단 섞어서 해보자, 그리고 flag를 @hm 이렇게 태그로 가는것도 생각
    router.push(`/post/${flag}/${slug}`);
  };

  return (
    <article onClickCapture={onClick} className={styles.post}>
      {children}
    </article>
  );
}

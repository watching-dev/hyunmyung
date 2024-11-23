"use client";

import { ReactNode } from "react";
import styles from "./post.module.css";
import { useRouter } from "next/navigation";

interface Props {
  children: ReactNode;
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
}

export default function PostArticle({ children, post }: Props) {
  const router = useRouter();
  // const slug2 = post.title.replace(/(\s*)/g, ""); // 공백제거
  const slug = post.title.replace(/ /gi, "-"); // 공백을 -로 치환
  // const flag = post.postId.replace(/[\D]/gi, ""); // 문자 아닌것 제거
  // const split = post.postId.split("_"); // _로 구분해서 각 배열에 담음
  const base64Flag = btoa(post.postId); // bas64로 인코딩

  const onClick = () => {
    // router.push(`/${post.User.id}/status/${post.postId}`);
    // 가운데를 전체 포스팅 글 갯수(split[0]) 으로 할 것이냐
    // 전체 + 문자 아닌것 제거에서 숫자만 남은것(없을 수도 있음) + 글 작성자 포스팅한 글 갯수로 할것이냐 고민이네
    // 일단 섞어서 해보자, 그리고 flag를 @hm 이렇게 태그로 가는것도 생각
    // router.push(`/post/${flag}/${slug}`);
    // router.push 에서 쿼리 날리는게 불가능해 져서 포스트아이디를 인코딩한 값으로 사용하기로 결정
    router.push(`/post/${base64Flag}/${slug}`, { scroll: false });
  };

  return (
    <article onClickCapture={onClick} className={styles.post}>
      {children}
    </article>
  );
}

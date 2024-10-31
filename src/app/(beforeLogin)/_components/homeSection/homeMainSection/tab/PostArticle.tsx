"use client";

import { ReactNode } from "react";
import styles from "./post.module.css";
import { useRouter } from "next/navigation";
import { PostImage } from "@/app/model/PostImage";

type Props = {
  children: ReactNode;
  post: {
    postID: number;
    content: string;
    User: {
      id: string;
      nickname: string;
      image: string;
    };
    createdAt: Date;
    Images: PostImage[];
  };
};

export default function PostArticle({ children, post }: Props) {
  const router = useRouter();
  const onClick = () => {
    router.push(`/${post.User.id}/status/${post.postID}`);
  };

  return (
    <article onClickCapture={onClick} className={styles.post}>
      {children}
    </article>
  );
}

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
  const onClick = () => {
    // router.push(`/${post.User.id}/status/${post.postId}`);
    router.push(`/post/${post.postId}`);
  };

  return (
    <article onClickCapture={onClick} className={styles.post}>
      {children}
    </article>
  );
}

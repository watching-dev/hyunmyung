"use client";

import { ReactNode } from "react";
import styles from "./post.module.css";
import { useRouter } from "next/navigation";

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
    createAt: Date;
    Images: any[];
  };
};

export default function PostArticle({ children, post }: Props) {
  const router = useRouter();
  const onClick = () => {
    router.push(`/${post.User.id}/status/${post.postID}`);
  };

  return (
    <article onClick={onClick} className={styles.post}>
      {children}
    </article>
  );
}

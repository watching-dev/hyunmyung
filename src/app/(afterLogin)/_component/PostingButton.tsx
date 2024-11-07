"use client";

import { Session } from "next-auth";
import Link from "next/link";

import styles from "./postingButton.module.css";

type Props = {
  me: Session | null;
};

export default function PostingButton({ me }: Props) {
  if (!me?.user) {
    return null;
  }
  return (
    <li>
      <Link href="/posting">
        <div className={styles.postingButton}>작성하기</div>
      </Link>
    </li>
  );
}

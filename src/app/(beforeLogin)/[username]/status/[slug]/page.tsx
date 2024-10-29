import Post from "@/app/(beforeLogin)/_components/homeSection/homeMainSection/tab/Post";

import styles from "./singlePost.module.css";

export default function SinglePost() {
  return (
    <>
      <div className={styles.tabFixed}>
        <div className={styles.title}>게시글</div>
        <Post />
      </div>
    </>
  );
}

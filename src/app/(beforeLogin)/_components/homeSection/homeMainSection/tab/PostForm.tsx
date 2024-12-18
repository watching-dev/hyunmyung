"use client";

import styles from "./postForm.module.css";
import TextareaAutosize from "react-textarea-autosize";

export default function PostForm() {
  return (
    <form className={styles.postForm}>
      <div className={styles.postUserSection}>
        <div className={styles.postUserImage}></div>
      </div>
      <div className={styles.postInputSection}>
        <TextareaAutosize placeholder="아무거나 작성해 보세요!" />
        <div className={styles.postButtonSection}>
          <div className={styles.footerButtons}>
            <div className={styles.footerButtonLeft}></div>
            <button className={styles.actionButton}>게시하기</button>
          </div>
        </div>
      </div>
    </form>
  );
}

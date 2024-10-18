import styles from "./postForm.module.css";

export default function PostForm() {
  return (
    <form className={styles.postForm}>
      <div className={styles.postUserSection}>
        <div className={styles.postUserImage}></div>
      </div>
      <div className={styles.postInputSection}>
        <textarea placeholder="무슨일이 일어나고 있나요?" />
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

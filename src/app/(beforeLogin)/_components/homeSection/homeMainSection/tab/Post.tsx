import styles from "./post.module.css";

export default function Post() {
  return (
    <article className={styles.post}>
      <div className={styles.postWrapper}>
        <div className={styles.postUserSection}>post</div>
        <div className={styles.postBody}>
          <div className={styles.postMeta}>
            <div className={styles.postUserName}>userName</div>
            &nbsp;
            <div className={styles.postUserId}>userId</div>
            &nbsp; · &nbsp;
            <div className={styles.postDate}>date</div>
          </div>
          <div>content</div>
          <div className={styles.postImageSection}></div>
        </div>
      </div>
    </article>
  );
}
